# UTM Tracking Implementation Guide

## ✅ UTM Tracking Features Added

Your landing page now has comprehensive UTM (Urchin Tracking Module) tracking capabilities for marketing attribution and analytics.

### **Database Schema Updates**

New fields added to `waitlist_emails` table:
- `utm_source` - Traffic source (e.g., google, facebook, newsletter)
- `utm_medium` - Traffic medium (e.g., cpc, email, social)
- `utm_campaign` - Campaign name (e.g., summer_sale, product_launch)
- `utm_term` - Keyword (for paid search)
- `utm_content` - Content identifier (for A/B testing)
- `referrer` - Referring website URL
- `landing_page` - Page where user first landed

### **New Features**

1. **Automatic UTM Capture**: UTM parameters are automatically captured from URL and stored in session
2. **Analytics Dashboard**: Real-time analytics showing campaign performance
3. **Campaign Tracking**: Track which marketing campaigns drive the most signups
4. **Source Attribution**: See which traffic sources convert best

## **How to Apply Database Changes**

### **Option 1: Supabase Dashboard (Recommended)**

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste this SQL:

```sql
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
```

4. Click **Run** to execute

## **UTM URL Examples for Marketing**

### **Google Ads**
```
https://yoursite.com?utm_source=google&utm_medium=cpc&utm_campaign=summer_launch&utm_term=relationship_manager
```

### **Facebook Ads**
```
https://yoursite.com?utm_source=facebook&utm_medium=social&utm_campaign=product_announcement&utm_content=video_ad
```

### **Email Newsletter**
```
https://yoursite.com?utm_source=newsletter&utm_medium=email&utm_campaign=weekly_update&utm_content=header_link
```

### **Twitter/X**
```
https://yoursite.com?utm_source=twitter&utm_medium=social&utm_campaign=launch_tweet&utm_content=thread
```

### **LinkedIn**
```
https://yoursite.com?utm_source=linkedin&utm_medium=social&utm_campaign=professional_network&utm_content=sponsored_post
```

### **YouTube**
```
https://yoursite.com?utm_source=youtube&utm_medium=video&utm_campaign=product_demo&utm_content=description_link
```

## **Analytics Dashboard Features**

### **Campaign Performance**
- View signup counts by campaign
- Track conversion rates by source
- Monitor campaign effectiveness over time

### **Traffic Sources**
- See which sources drive the most signups
- Compare organic vs paid traffic
- Track referrer performance

### **Traffic Mediums**
- Analyze email vs social vs search performance
- Track which channels convert best
- Optimize marketing spend

## **New Functions Available**

```typescript
// Get signups by UTM source
const googleSignups = await getSignupsByUTMSource('google');

// Get signups by campaign
const campaignSignups = await getSignupsByUTMCampaign('summer_launch');

// Get full UTM analytics
const analytics = await getUTMAnalytics();

// Get campaign performance summary
const performance = await getCampaignPerformance();
```

## **How It Works**

1. **User visits with UTM parameters**: `yoursite.com?utm_source=google&utm_medium=cpc&utm_campaign=launch`
2. **UTM parameters are captured** and stored in browser session
3. **User signs up**: UTM data is automatically attached to their signup
4. **Analytics dashboard** shows real-time campaign performance
5. **Marketing attribution** helps optimize ad spend and campaigns

## **Testing UTM Tracking**

1. **Test URL**: Visit your site with UTM parameters
   ```
   http://localhost:3000?utm_source=test&utm_medium=email&utm_campaign=testing
   ```

2. **Sign up**: Create an account and join the waitlist

3. **Check analytics**: Click the "Analytics" button in the top-right (when logged in)

4. **Verify data**: Confirm UTM parameters are captured and displayed

## **Benefits**

- ✅ **Campaign Attribution**: Know which ads/campaigns work
- ✅ **ROI Tracking**: Measure marketing spend effectiveness  
- ✅ **Source Optimization**: Focus budget on best-performing channels
- ✅ **A/B Testing**: Test different campaign messages and content
- ✅ **Conversion Tracking**: See complete user journey from source to signup

Your landing page now has enterprise-level marketing attribution and analytics capabilities!
