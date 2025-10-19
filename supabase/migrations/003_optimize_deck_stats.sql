-- Create optimized view for deck statistics
-- This avoids the N+1 query problem by using SQL aggregation

CREATE OR REPLACE VIEW public.deck_stats_view AS
SELECT
  d.id AS deck_id,
  d.user_id,
  COUNT(f.id) AS total_cards,
  COUNT(CASE
    WHEN cs.next_review IS NULL OR cs.next_review <= NOW()
    THEN 1
  END) AS cards_due,
  COUNT(CASE
    WHEN cs.repetitions >= 5
    THEN 1
  END) AS mastered_cards
FROM public.decks d
LEFT JOIN public.flashcards f ON f.deck_id = d.id
LEFT JOIN public.card_stats cs ON cs.card_id = f.id
GROUP BY d.id, d.user_id;

-- Grant select permission to authenticated users
GRANT SELECT ON public.deck_stats_view TO authenticated;

-- Add RLS policy for the view
ALTER VIEW public.deck_stats_view SET (security_invoker = on);

-- Add comment
COMMENT ON VIEW public.deck_stats_view IS
'Optimized view for deck statistics. Avoids N+1 queries by using SQL aggregation.';

-- Create function to get decks with progress (optional, can also query view directly)
CREATE OR REPLACE FUNCTION public.get_decks_with_progress(p_user_id uuid)
RETURNS TABLE (
  id uuid,
  user_id uuid,
  name text,
  description text,
  created_at timestamp with time zone,
  total_cards bigint,
  cards_due bigint,
  mastered_cards bigint
)
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT
    d.id,
    d.user_id,
    d.name,
    d.description,
    d.created_at,
    COALESCE(ds.total_cards, 0) AS total_cards,
    COALESCE(ds.cards_due, 0) AS cards_due,
    COALESCE(ds.mastered_cards, 0) AS mastered_cards
  FROM public.decks d
  LEFT JOIN public.deck_stats_view ds ON ds.deck_id = d.id
  WHERE d.user_id = p_user_id
  ORDER BY d.created_at DESC;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.get_decks_with_progress TO authenticated;

-- Add comment
COMMENT ON FUNCTION public.get_decks_with_progress IS
'Efficiently retrieves all decks with statistics for a user. Uses aggregation view to avoid N+1 queries.';
