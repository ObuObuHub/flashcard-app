-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Decks table
create table public.decks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Flashcards table
create table public.flashcards (
  id uuid default uuid_generate_v4() primary key,
  deck_id uuid references public.decks(id) on delete cascade not null,
  front text not null,
  back text not null,
  mnemonic text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Card statistics for SRS
create table public.card_stats (
  id uuid default uuid_generate_v4() primary key,
  card_id uuid references public.flashcards(id) on delete cascade not null unique,
  user_id uuid references auth.users(id) on delete cascade not null,
  easiness_factor real default 2.5 not null,
  interval integer default 0 not null,
  repetitions integer default 0 not null,
  next_review timestamp with time zone default timezone('utc'::text, now()) not null,
  last_reviewed timestamp with time zone
);

-- Review history
create table public.reviews (
  id uuid default uuid_generate_v4() primary key,
  card_id uuid references public.flashcards(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  rating integer not null check (rating >= 1 and rating <= 4),
  reviewed_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tags
create table public.tags (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  unique(name, user_id)
);

-- Card tags (many-to-many)
create table public.card_tags (
  card_id uuid references public.flashcards(id) on delete cascade not null,
  tag_id uuid references public.tags(id) on delete cascade not null,
  primary key (card_id, tag_id)
);

-- Indexes for performance
create index idx_decks_user_id on public.decks(user_id);
create index idx_flashcards_deck_id on public.flashcards(deck_id);
create index idx_card_stats_user_id on public.card_stats(user_id);
create index idx_card_stats_next_review on public.card_stats(next_review);
create index idx_reviews_user_id on public.reviews(user_id);
create index idx_reviews_card_id on public.reviews(card_id);
create index idx_tags_user_id on public.tags(user_id);

-- Row Level Security (RLS) policies

-- Enable RLS
alter table public.decks enable row level security;
alter table public.flashcards enable row level security;
alter table public.card_stats enable row level security;
alter table public.reviews enable row level security;
alter table public.tags enable row level security;
alter table public.card_tags enable row level security;

-- Decks policies
create policy "Users can view their own decks"
  on public.decks for select
  using (auth.uid() = user_id);

create policy "Users can insert their own decks"
  on public.decks for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own decks"
  on public.decks for update
  using (auth.uid() = user_id);

create policy "Users can delete their own decks"
  on public.decks for delete
  using (auth.uid() = user_id);

-- Flashcards policies
create policy "Users can view flashcards in their decks"
  on public.flashcards for select
  using (exists (
    select 1 from public.decks
    where decks.id = flashcards.deck_id
    and decks.user_id = auth.uid()
  ));

create policy "Users can insert flashcards in their decks"
  on public.flashcards for insert
  with check (exists (
    select 1 from public.decks
    where decks.id = flashcards.deck_id
    and decks.user_id = auth.uid()
  ));

create policy "Users can update flashcards in their decks"
  on public.flashcards for update
  using (exists (
    select 1 from public.decks
    where decks.id = flashcards.deck_id
    and decks.user_id = auth.uid()
  ));

create policy "Users can delete flashcards in their decks"
  on public.flashcards for delete
  using (exists (
    select 1 from public.decks
    where decks.id = flashcards.deck_id
    and decks.user_id = auth.uid()
  ));

-- Card stats policies
create policy "Users can view their own card stats"
  on public.card_stats for select
  using (auth.uid() = user_id);

create policy "Users can insert their own card stats"
  on public.card_stats for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own card stats"
  on public.card_stats for update
  using (auth.uid() = user_id);

create policy "Users can delete their own card stats"
  on public.card_stats for delete
  using (auth.uid() = user_id);

-- Reviews policies
create policy "Users can view their own reviews"
  on public.reviews for select
  using (auth.uid() = user_id);

create policy "Users can insert their own reviews"
  on public.reviews for insert
  with check (auth.uid() = user_id);

-- Tags policies
create policy "Users can view their own tags"
  on public.tags for select
  using (auth.uid() = user_id);

create policy "Users can insert their own tags"
  on public.tags for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own tags"
  on public.tags for update
  using (auth.uid() = user_id);

create policy "Users can delete their own tags"
  on public.tags for delete
  using (auth.uid() = user_id);

-- Card tags policies
create policy "Users can view card tags for their cards"
  on public.card_tags for select
  using (exists (
    select 1 from public.flashcards
    join public.decks on flashcards.deck_id = decks.id
    where flashcards.id = card_tags.card_id
    and decks.user_id = auth.uid()
  ));

create policy "Users can insert card tags for their cards"
  on public.card_tags for insert
  with check (exists (
    select 1 from public.flashcards
    join public.decks on flashcards.deck_id = decks.id
    where flashcards.id = card_tags.card_id
    and decks.user_id = auth.uid()
  ));

create policy "Users can delete card tags for their cards"
  on public.card_tags for delete
  using (exists (
    select 1 from public.flashcards
    join public.decks on flashcards.deck_id = decks.id
    where flashcards.id = card_tags.card_id
    and decks.user_id = auth.uid()
  ));

-- Function to automatically create card stats when a flashcard is created
create or replace function public.handle_new_flashcard()
returns trigger as $$
begin
  insert into public.card_stats (card_id, user_id)
  select new.id, decks.user_id
  from public.decks
  where decks.id = new.deck_id;
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create card stats automatically
create trigger on_flashcard_created
  after insert on public.flashcards
  for each row execute procedure public.handle_new_flashcard();
