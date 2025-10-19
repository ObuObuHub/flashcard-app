-- Create mock user for development (auth disabled)
-- This allows testing flashcard functionality without authentication

-- Insert dev user into auth.users (if it doesn't exist)
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role,
  aud,
  confirmation_token,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid,
  '00000000-0000-0000-0000-000000000000'::uuid,
  'dev@flashcard.app',
  '$2a$10$mockhashedpassword000000000000000000000000000000000', -- Mock password hash
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}'::jsonb,
  '{}'::jsonb,
  FALSE,
  'authenticated',
  'authenticated',
  '',
  ''
)
ON CONFLICT (id) DO NOTHING;

-- Note: This is a development-only user
-- Remove this migration before going to production!
