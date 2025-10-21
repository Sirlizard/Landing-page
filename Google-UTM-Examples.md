# Google UTM Tracking Examples & Templates

## 🎯 **Google Ads Campaign UTM Examples**

### **Google Search Ads**
```
Campaign: "Relationship Tools Launch"
Ad Group: "Friend Reminder Tools"
Keyword: "friend reminder app"

UTM URL:
https://yoursite.com?utm_source=site A&utm_medium=cpc&utm_campaign=relationship_tools_launch&utm_term=friend_reminder_app&utm_content=ad_group_friend_reminders
```

### **Google Display Ads**
```
Campaign: "Brand Awareness"
Placement: "News Website"
Creative: "Banner Ad 1"

UTM URL:
https://yoursite.com?utm_source=site A&utm_medium=display&utm_campaign=brand_awareness&utm_content=news_website_banner_1
```

### **YouTube Video Ads**
```
Campaign: "Product Demo"
Video: "Demo Video 1"
Content: "Video Description Link"

UTM URL:
https://yoursite.com?utm_source=site A&utm_medium=video&utm_campaign=product_demo&utm_content=demo_video_1
```

### **Google Shopping Ads**
```
Campaign: "Product Launch"
Product: "Relationship Manager App"
Content: "Shopping Ad 1"

UTM URL:
https://yoursite.com?utm_source=site A&utm_medium=shopping&utm_campaign=product_launch&utm_term=relationship_manager_app&utm_content=shopping_ad_1
```

## 📊 **Google Campaign Types & Tracking**

### **1. Google Search Campaigns**
- **Purpose**: Target users searching for relationship management
- **Keywords**: "friend reminder", "relationship manager", "stay in touch"
- **UTM Medium**: `cpc`
- **UTM Source**: `site A`

**Example Campaign Structure:**
```
Campaign: "Relationship Management Tools"
├── Ad Group: "Friend Reminders"
│   ├── Keyword: "friend reminder app"
│   ├── Keyword: "remind me to call friends"
│   └── Keyword: "friend contact manager"
├── Ad Group: "Relationship Tools"
│   ├── Keyword: "relationship manager"
│   ├── Keyword: "stay connected with friends"
│   └── Keyword: "friend relationship tracker"
```

### **2. Google Display Campaigns**
- **Purpose**: Build brand awareness on websites
- **Targeting**: Interest-based, demographic, or placement targeting
- **UTM Medium**: `display`
- **UTM Source**: `site A`

**Example Placements:**
- News websites
- Lifestyle blogs
- Social media sites
- Tech websites

### **3. YouTube Video Campaigns**
- **Purpose**: Show product demos and testimonials
- **Content**: Product videos, tutorials, testimonials
- **UTM Medium**: `video`
- **UTM Source**: `site A`

**Example Video Types:**
- Product demonstration videos
- Customer testimonial videos
- How-to tutorial videos
- Brand story videos

### **4. Google Shopping Campaigns**
- **Purpose**: Showcase your app in Google Shopping
- **Products**: Your relationship management app
- **UTM Medium**: `shopping`
- **UTM Source**: `site A`

## 🔧 **Google UTM URL Builder Functions**

### **For Google Search Ads:**
```typescript
const searchUTM = createGoogleAdsUTMUrl(
  'https://yoursite.com',
  'relationship_tools_launch',
  'friend_reminder_tools',
  'friend_reminder_app',
  'ad_group_friend_reminders'
);
```

### **For Google Display Ads:**
```typescript
const displayUTM = createGoogleDisplayUTMUrl(
  'https://yoursite.com',
  'brand_awareness',
  'news_website_placement',
  'banner_ad_1'
);
```

### **For YouTube Video Ads:**
```typescript
const videoUTM = createGoogleVideoUTMUrl(
  'https://yoursite.com',
  'product_demo',
  'demo_video_1',
  'video_description_link'
);
```

### **For Google Shopping Ads:**
```typescript
const shoppingUTM = createGoogleShoppingUTMUrl(
  'https://yoursite.com',
  'product_launch',
  'relationship_manager_app',
  'shopping_ad_1'
);
```

## 📈 **Google Analytics Integration**

### **Enhanced Tracking with Google Analytics:**
```javascript
// Track Google Ads conversions
gtag('event', 'conversion', {
  'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
  'value': 1.0,
  'currency': 'USD'
});

// Track UTM parameters
gtag('config', 'GA_MEASUREMENT_ID', {
  'custom_map': {
    'custom_parameter_1': 'utm_source',
    'custom_parameter_2': 'utm_campaign'
  }
});
```

## 🎯 **Campaign Performance Tracking**

### **What You Can Track:**

1. **Google Campaign Type Performance:**
   - Search vs Display vs Video vs Shopping
   - Which campaign types convert best
   - Cost per acquisition by type

2. **Google Ad Group Performance:**
   - Which ad groups drive most signups
   - Ad group conversion rates
   - Keyword performance within ad groups

3. **Google Keyword Performance:**
   - Which keywords convert best
   - Keyword cost per acquisition
   - Search term analysis

4. **Google Click ID (gclid) Attribution:**
   - Track individual ad clicks
   - Measure Google Ads ROI
   - Attribution modeling

### **Example Analytics Queries:**

```typescript
// Get Google Search campaign performance
const searchPerformance = await getSignupsByGoogleCampaignType('search');

// Get specific ad group performance
const adGroupPerformance = await getSignupsByGoogleAdGroup('friend_reminder_tools');

// Get keyword performance
const keywordPerformance = await getSignupsByGoogleKeyword('friend_reminder_app');

// Get overall Google Ads performance
const googleAdsPerformance = await getGoogleAdsPerformance();
```

## 🚀 **Implementation Steps**

### **1. Set Up Google Ads Campaigns:**
1. Create campaigns in Google Ads
2. Use the UTM URL templates above
3. Set up conversion tracking
4. Monitor performance in your analytics dashboard

### **2. Test Your UTM Tracking:**
```
Test URL: https://yoursite.com?utm_source=google_ads&utm_medium=cpc&utm_campaign=test_campaign&utm_term=test_keyword&utm_content=test_ad_group
```

### **3. Monitor Performance:**
- Check your analytics dashboard for Google campaign data
- Track which campaigns drive the most signups
- Optimize based on performance data

## 📊 **Expected Analytics Data**

Your analytics dashboard will show:

**Google Campaign Performance:**
- Search Campaign: 25 signups
- Display Campaign: 8 signups
- Video Campaign: 12 signups
- Shopping Campaign: 5 signups

**Google Ad Group Performance:**
- Friend Reminder Tools: 15 signups
- Relationship Manager: 10 signups
- Stay Connected: 8 signups

**Google Keyword Performance:**
- "friend reminder app": 8 signups
- "relationship manager": 6 signups
- "stay in touch app": 4 signups

This gives you detailed insights into which Google campaigns, ad groups, and keywords are most effective at driving signups! 🎯
