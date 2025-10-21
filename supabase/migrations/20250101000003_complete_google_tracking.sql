/*
  # Complete Google UTM Tracking Migration
  # Apply all Google tracking columns and indexes to waitlist_emails table

  This migration adds comprehensive Google Ads tracking capabilities:
  - Google Click ID (gclid) tracking
  - Google campaign type tracking  
  - Google ad group and keyword tracking
  - Google placement and creative tracking
  - Optimized indexes for Google analytics queries
*/

-- Add Google-specific tracking columns to waitlist_emails table
ALTER TABLE waitlist_emails 
ADD COLUMN IF NOT EXISTS gclid text,
ADD COLUMN IF NOT EXISTS google_campaign_type text,
ADD COLUMN IF NOT EXISTS google_ad_group text,
ADD COLUMN IF NOT EXISTS google_keyword text,
ADD COLUMN IF NOT EXISTS google_placement text,
ADD COLUMN IF NOT EXISTS google_creative text;

-- Create indexes for Google analytics queries
CREATE INDEX IF NOT EXISTS idx_waitlist_emails_gclid ON waitlist_emails(gclid);
CREATE INDEX IF NOT EXISTS idx_waitlist_emails_google_campaign_type ON waitlist_emails(google_campaign_type);
CREATE INDEX IF NOT EXISTS idx_waitlist_emails_google_ad_group ON waitlist_emails(google_ad_group);
CREATE INDEX IF NOT EXISTS idx_waitlist_emails_google_keyword ON waitlist_emails(google_keyword);
CREATE INDEX IF NOT EXISTS idx_waitlist_emails_google_placement ON waitlist_emails(google_placement);

-- Create composite index for Google campaign analysis
CREATE INDEX IF NOT EXISTS idx_waitlist_emails_google_campaign_analysis ON waitlist_emails(google_campaign_type, google_ad_group, google_keyword);

-- Create index for Google Click ID tracking and attribution
CREATE INDEX IF NOT EXISTS idx_waitlist_emails_google_attribution ON waitlist_emails(gclid, utm_source, utm_campaign);

-- Create index for Google placement analysis
CREATE INDEX IF NOT EXISTS idx_waitlist_emails_google_placement_analysis ON waitlist_emails(google_placement, google_campaign_type);

-- Add comments to document the new columns
COMMENT ON COLUMN waitlist_emails.gclid IS 'Google Click ID for Google Ads attribution tracking';
COMMENT ON COLUMN waitlist_emails.google_campaign_type IS 'Type of Google campaign: search, display, video, shopping, app';
COMMENT ON COLUMN waitlist_emails.google_ad_group IS 'Google Ads ad group name';
COMMENT ON COLUMN waitlist_emails.google_keyword IS 'Google Ads keyword that triggered the ad';
COMMENT ON COLUMN waitlist_emails.google_placement IS 'Google Display Network placement';
COMMENT ON COLUMN waitlist_emails.google_creative IS 'Google Ads creative identifier';
