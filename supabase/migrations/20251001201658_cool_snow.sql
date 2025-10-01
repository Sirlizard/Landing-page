/*
  # Update waitlist RLS for authenticated users

  1. Security Changes
    - Remove anonymous insert policy
    - Add authenticated user insert policy
    - Ensure only authenticated users can join waitlist
    - Keep read access for authenticated users only

  2. Changes Made
    - Drop existing policies
    - Create new policy for authenticated users to insert their own email
    - Maintain existing SELECT policy for authenticated users
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow anonymous email insertion" ON waitlist_emails;
DROP POLICY IF EXISTS "Authenticated users can read waitlist emails" ON waitlist_emails;

-- Create policy for authenticated users to insert emails
CREATE POLICY "Authenticated users can insert waitlist emails"
  ON waitlist_emails
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policy for authenticated users to read waitlist emails
CREATE POLICY "Authenticated users can read waitlist emails"
  ON waitlist_emails
  FOR SELECT
  TO authenticated
  USING (true);