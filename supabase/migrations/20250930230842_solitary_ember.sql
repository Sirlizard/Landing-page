/*
  # Create waitlist table for email collection

  1. New Tables
    - `waitlist_emails`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)
      - `source` (text, optional - to track where signup came from)

  2. Security
    - Enable RLS on `waitlist_emails` table
    - Add policy for inserting new emails (public access for signups)
    - Add policy for reading emails (authenticated users only)
*/

CREATE TABLE IF NOT EXISTS waitlist_emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  source text DEFAULT 'landing_page',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE waitlist_emails ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert emails (for public signups)
CREATE POLICY "Anyone can insert waitlist emails"
  ON waitlist_emails
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users can read emails (for admin purposes)
CREATE POLICY "Authenticated users can read waitlist emails"
  ON waitlist_emails
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_emails_email ON waitlist_emails(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_emails_created_at ON waitlist_emails(created_at DESC);