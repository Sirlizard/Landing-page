# 🗄️ Supabase Database Update Guide

## ✅ **Apply Google UTM Tracking Columns**

### **Step 1: Go to Supabase Dashboard**
1. Open your Supabase project dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **"New Query"**

### **Step 2: Copy and Paste This SQL**

```sql
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
```

### **Step 3: Execute the SQL**
1. Click **"Run"** button
2. Wait for the query to complete
3. You should see "Success" message

### **Step 4: Verify the Changes**
1. Go to **Table Editor** in Supabase
2. Select **`waitlist_emails`** table
3. You should see the new columns:
   - `gclid`
   - `google_campaign_type`
   - `google_ad_group`
   - `google_keyword`
   - `google_placement`
   - `google_creative`

## 🎯 **What These Columns Track**

### **`gclid` (Google Click ID)**
- Unique identifier for each Google Ads click
- Enables precise attribution tracking
- Links Google Ads clicks to conversions

### **`google_campaign_type`**
- Type of Google campaign: `search`, `display`, `video`, `shopping`, `app`
- Helps analyze which campaign types perform best

### **`google_ad_group`**
- Google Ads ad group name
- Tracks which ad groups drive most signups
- Enables ad group optimization

### **`google_keyword`**
- Google Ads keyword that triggered the ad
- Shows which keywords convert best
- Enables keyword optimization

### **`google_placement`**
- Google Display Network placement
- Tracks which websites/sites perform best
- Enables placement optimization

### **`google_creative`**
- Google Ads creative identifier
- Tracks which ad creatives perform best
- Enables creative optimization

## 📊 **Database Schema After Update**

```sql
waitlist_emails:
├── id (uuid, primary key)
├── email (text, unique)
├── source (text)
├── tracking_id (text, default 'A')
├── utm_source (text)
├── utm_medium (text)
├── utm_campaign (text)
├── utm_term (text)
├── utm_content (text)
├── referrer (text)
├── landing_page (text)
├── gclid (text) -- NEW: Google Click ID
├── google_campaign_type (text) -- NEW: Campaign type
├── google_ad_group (text) -- NEW: Ad group name
├── google_keyword (text) -- NEW: Keyword
├── google_placement (text) -- NEW: Placement
├── google_creative (text) -- NEW: Creative ID
└── created_at (timestamptz)
```

## 🚀 **After Database Update**

Your application will now:
- ✅ Automatically capture Google UTM parameters
- ✅ Store Google Click IDs for attribution
- ✅ Track Google campaign performance
- ✅ Analyze Google ad group effectiveness
- ✅ Monitor Google keyword performance
- ✅ Provide detailed Google analytics in dashboard

## 🧪 **Test the Update**

1. **Test with Google UTM URL:**
   ```
   http://localhost:3000?utm_source=google_ads&utm_medium=cpc&utm_campaign=test_campaign&utm_term=test_keyword&utm_content=test_ad_group&gclid=test123
   ```

2. **Sign up and check database:**
   - Go to Supabase Table Editor
   - View `waitlist_emails` table
   - Verify new columns are populated

3. **Check analytics dashboard:**
   - Sign in to your app
   - Click "Analytics" button
   - Verify Google campaign data appears

Your database is now ready for comprehensive Google Ads tracking! 🎯
