-- Create mock user for development (auth disabled)
-- This allows testing flashcard functionality without authentication

-- Insert dev user into auth.users (if it doesn't exist)
DO $$
BEGIN
  -- Check if user exists in auth.users, if not create it
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = 'dev-user-123') THEN
    -- Create user in auth.users table
    INSERT INTO auth.users (
      id,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin,
      role
    ) VALUES (
      'dev-user-123'::uuid,
      'dev@flashcard.app',
      crypt('dev-password-123', gen_salt('bf')), -- Encrypted password
      NOW(),
      NOW(),
      NOW(),
      '{"provider": "email", "providers": ["email"]}'::jsonb,
      '{}'::jsonb,
      FALSE,
      'authenticated'
    );
  END IF;
END $$;

-- Note: This is a development-only user
-- Remove this migration before going to production!
