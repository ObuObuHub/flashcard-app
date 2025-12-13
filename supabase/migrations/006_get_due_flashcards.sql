-- Create optimized RPC function for fetching due flashcards
-- This replaces the N+1 query pattern where we fetch all cards and filter in JavaScript

CREATE OR REPLACE FUNCTION get_due_flashcards(p_deck_id UUID, p_user_id UUID)
RETURNS TABLE (
  id UUID,
  deck_id UUID,
  front TEXT,
  back TEXT,
  mnemonic TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ,
  stats_id UUID,
  easiness_factor NUMERIC,
  interval INTEGER,
  repetitions INTEGER,
  next_review TIMESTAMPTZ,
  last_reviewed TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    f.id,
    f.deck_id,
    f.front,
    f.back,
    f.mnemonic,
    f.image_url,
    f.created_at,
    cs.id AS stats_id,
    cs.easiness_factor,
    cs.interval,
    cs.repetitions,
    cs.next_review,
    cs.last_reviewed
  FROM flashcards f
  LEFT JOIN card_stats cs ON cs.card_id = f.id AND cs.user_id = p_user_id
  WHERE f.deck_id = p_deck_id
  AND (
    cs.next_review IS NULL           -- New cards (no stats yet)
    OR cs.repetitions = 0            -- Cards that were reset
    OR cs.next_review <= NOW()       -- Cards due for review
  )
  ORDER BY
    -- New/unrated cards first (shuffled by created_at for variety)
    CASE WHEN cs.repetitions IS NULL OR cs.repetitions = 0 THEN 0 ELSE 1 END,
    -- Then by next_review for rated cards
    cs.next_review ASC NULLS FIRST;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION get_due_flashcards(UUID, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_due_flashcards(UUID, UUID) TO anon;
