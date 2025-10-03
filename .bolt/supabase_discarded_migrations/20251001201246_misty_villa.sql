/*
  # Fix Row Level Security for waitlist emails

  1. Security Updates
    - Update RLS policy to allow anonymous users to insert emails
    - Keep existing policy for authenticated users to read data
    - Ensure anonymous users can only insert, not read or update

  This fixes the "new row violates row-level security policy" error
  by allowing the anon role to insert new waitlist emails.
*/

-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Anyone can insert waitlist emails" ON waitlist_emails;

-- Create a new policy that explicitly allows anonymous users to insert
CREATE POLICY "Allow anonymous email signup"
  ON waitlist_emails
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Ensure authenticated users can still read the data
CREATE POLICY IF NOT EXISTS "Authenticated users can read waitlist emails"
  ON waitlist_emails
  FOR SELECT
  TO authenticated
  USING (true);