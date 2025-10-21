/*
  # Add tracking_id field to waitlist_emails table

  1. Schema Changes
    - Add `tracking_id` column to `waitlist_emails` table
    - Set default value to 'A' for existing records
    - Add index for faster tracking queries

  2. Purpose
    - Dedicated field for tracking user signup sources
    - Better analytics and reporting capabilities
    - Maintains backward compatibility with existing data
*/

-- Add tracking_id column to waitlist_emails table
ALTER TABLE waitlist_emails 
ADD COLUMN tracking_id text DEFAULT 'A';

-- Update existing records to have tracking_id 'A' if they don't have one
UPDATE waitlist_emails 
SET tracking_id = 'A' 
WHERE tracking_id IS NULL;

-- Make tracking_id NOT NULL after setting defaults
ALTER TABLE waitlist_emails 
ALTER COLUMN tracking_id SET NOT NULL;

-- Create index for faster tracking queries
CREATE INDEX IF NOT EXISTS idx_waitlist_emails_tracking_id ON waitlist_emails(tracking_id);

-- Create index for combined source and tracking queries
CREATE INDEX IF NOT EXISTS idx_waitlist_emails_source_tracking ON waitlist_emails(source, tracking_id);
