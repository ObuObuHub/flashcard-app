-- Create atomic function for recording reviews
-- This ensures card_stats update and review insert happen together or not at all

CREATE OR REPLACE FUNCTION public.record_flashcard_review(
  p_card_id uuid,
  p_user_id uuid,
  p_rating integer,
  p_easiness_factor real,
  p_interval integer,
  p_repetitions integer,
  p_next_review timestamp with time zone
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_result json;
BEGIN
  -- Update card stats
  UPDATE public.card_stats
  SET
    easiness_factor = p_easiness_factor,
    interval = p_interval,
    repetitions = p_repetitions,
    next_review = p_next_review,
    last_reviewed = NOW()
  WHERE card_id = p_card_id
    AND user_id = p_user_id;

  -- Check if update succeeded
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Card stats not found for card_id % and user_id %', p_card_id, p_user_id;
  END IF;

  -- Insert review record
  INSERT INTO public.reviews (card_id, user_id, rating)
  VALUES (p_card_id, p_user_id, p_rating);

  -- Return success
  v_result := json_build_object(
    'success', true,
    'easiness_factor', p_easiness_factor,
    'interval', p_interval,
    'repetitions', p_repetitions,
    'next_review', p_next_review
  );

  RETURN v_result;
EXCEPTION
  WHEN OTHERS THEN
    -- Rollback happens automatically
    RAISE;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.record_flashcard_review TO authenticated;

-- Add comment
COMMENT ON FUNCTION public.record_flashcard_review IS
'Atomically updates card stats and inserts review record. Ensures data consistency.';
