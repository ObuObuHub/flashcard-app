-- Add tags and extras columns to flashcards table for the new format
-- tags: array of text tags (e.g., ["BIOCHIMIE", "Scris", "Enzime"])
-- extras: JSONB with keyConcepts and mnemonic

-- Add tags column (text array, default empty)
ALTER TABLE public.flashcards
ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';

-- Add extras column (JSONB for keyConcepts and mnemonic)
ALTER TABLE public.flashcards
ADD COLUMN IF NOT EXISTS extras jsonb DEFAULT NULL;

-- Create index for tags array (for filtering by tag)
CREATE INDEX IF NOT EXISTS idx_flashcards_tags ON public.flashcards USING GIN (tags);

-- Drop the trigger that auto-creates card_stats (we don't need SRS anymore)
DROP TRIGGER IF EXISTS on_flashcard_created ON public.flashcards;
DROP FUNCTION IF EXISTS public.handle_new_flashcard();

-- Note: We're keeping card_stats and reviews tables for now
-- They can be dropped later if needed:
-- DROP TABLE IF EXISTS public.reviews;
-- DROP TABLE IF EXISTS public.card_stats;
