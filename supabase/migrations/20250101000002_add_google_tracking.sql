/*
  # Add Google-specific tracking fields to waitlist_emails table

  1. Schema Changes
    - Add Google-specific tracking columns
    - Add Google Click ID (gclid) tracking
    - Add Google campaign type tracking
    - Add Google ad group and keyword tracking

  2. Google-Specific Fields Added
    - gclid: Google Click ID for Google Ads attribution
    - google_campaign_type: Type of Google campaign (search, display, video, shopping, app)
    - google_ad_group: Google Ads ad group name
    - google_keyword: Google Ads keyword that triggered the ad
    - google_placement: Google Display Network placement
    - google_creative: Google Ads creative identifier

  3. Purpose
    - Enhanced Google Ads attribution
    - Track Google campaign performance
    - Measure Google keyword effectiveness
    - Analyze Google ad group performance
*/

-- Add Google-specific tracking columns
ALTER TABLE waitlist_emails 
ADD COLUMN gclid text,
ADD COLUMN google_campaign_type text,
ADD COLUMN google_ad_group text,
ADD COLUMN google_keyword text,
ADD COLUMN google_placement text,
ADD COLUMN google_creative text;

-- Create indexes for Google analytics queries
CREATE INDEX IF NOT EXISTS idx_waitlist_emails_gclid ON waitlist_emails(gclid);
CREATE INDEX IF NOT EXISTS idx_waitlist_emails_google_campaign_type ON waitlist_emails(google_campaign_type);
CREATE INDEX IF NOT EXISTS idx_waitlist_emails_google_ad_group ON waitlist_emails(google_ad_group);
CREATE INDEX IF NOT EXISTS idx_waitlist_emails_google_keyword ON waitlist_emails(google_keyword);

-- Create composite index for Google campaign analysis
CREATE INDEX IF NOT EXISTS idx_waitlist_emails_google_campaign_analysis ON waitlist_emails(google_campaign_type, google_ad_group, google_keyword);

-- Create index for Google Click ID tracking
CREATE INDEX IF NOT EXISTS idx_waitlist_emails_google_attribution ON waitlist_emails(gclid, utm_source, utm_campaign);
