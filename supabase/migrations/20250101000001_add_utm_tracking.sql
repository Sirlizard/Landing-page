/*
  # Add UTM tracking fields to waitlist_emails table

  1. Schema Changes
    - Add UTM parameter columns to `waitlist_emails` table
    - Add referrer tracking
    - Add campaign tracking fields

  2. UTM Parameters Added
    - utm_source: The source of the traffic (e.g., google, facebook, newsletter)
    - utm_medium: The medium of the traffic (e.g., cpc, email, social)
    - utm_campaign: The campaign name (e.g., summer_sale, product_launch)
    - utm_term: The keyword (for paid search)
    - utm_content: The content identifier (for A/B testing)
    - referrer: The referring website URL
    - landing_page: The page where the user first landed

  3. Purpose
    - Track marketing campaign effectiveness
    - Analyze traffic sources and conversion rates
    - Enable detailed attribution reporting
*/

-- Add UTM tracking columns to waitlist_emails table
ALTER TABLE waitlist_emails 
ADD COLUMN utm_source text,
ADD COLUMN utm_medium text,
ADD COLUMN utm_campaign text,
ADD COLUMN utm_term text,
ADD COLUMN utm_content text,
ADD COLUMN referrer text,
ADD COLUMN landing_page text;

-- Create indexes for UTM analytics queries
CREATE INDEX IF NOT EXISTS idx_waitlist_emails_utm_source ON waitlist_emails(utm_source);
CREATE INDEX IF NOT EXISTS idx_waitlist_emails_utm_medium ON waitlist_emails(utm_medium);
CREATE INDEX IF NOT EXISTS idx_waitlist_emails_utm_campaign ON waitlist_emails(utm_campaign);
CREATE INDEX IF NOT EXISTS idx_waitlist_emails_referrer ON waitlist_emails(referrer);

-- Create composite index for campaign analysis
CREATE INDEX IF NOT EXISTS idx_waitlist_emails_campaign_analysis ON waitlist_emails(utm_source, utm_medium, utm_campaign);
