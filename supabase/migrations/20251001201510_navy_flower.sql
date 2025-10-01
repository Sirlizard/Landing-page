/*
  # Fix RLS policy for waitlist emails

  1. Security Changes
    - Drop existing restrictive INSERT policy
    - Create new policy allowing anonymous users to insert emails
    - Maintain read restrictions for authenticated users only

  This allows the waitlist form to work for anonymous visitors while keeping data secure.
*/

-- Drop the existing INSERT policy that's blocking anonymous users
DROP POLICY IF EXISTS "Anyone can insert waitlist emails" ON waitlist_emails;

-- Create a new policy that explicitly allows anonymous (anon) role to insert
CREATE POLICY "Allow anonymous email insertion" 
  ON waitlist_emails 
  FOR INSERT 
  TO anon 
  WITH CHECK (true);

-- Ensure the existing SELECT policy remains for authenticated users
-- (This should already exist, but we'll recreate it to be safe)
DROP POLICY IF EXISTS "Authenticated users can read waitlist emails" ON waitlist_emails;

CREATE POLICY "Authenticated users can read waitlist emails"
  ON waitlist_emails
  FOR SELECT
  TO authenticated
  USING (true);