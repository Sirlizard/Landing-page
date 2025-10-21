// Google-Specific UTM Tracking
// Enhanced tracking for Google Ads, Google Analytics, and Google Search campaigns

export interface GoogleUTMParameters {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string; // Google Click ID for Google Ads
  referrer?: string;
  landing_page?: string;
  google_campaign_type?: 'search' | 'display' | 'video' | 'shopping' | 'app';
  google_ad_group?: string;
  google_keyword?: string;
  google_placement?: string;
}

// Google-specific UTM source values
export const GOOGLE_UTM_SOURCES = {
  GOOGLE_ADS: 'google_ads',
  GOOGLE_SEARCH: 'google_search', 
  GOOGLE_DISPLAY: 'google_display',
  GOOGLE_VIDEO: 'google_video',
  GOOGLE_SHOPPING: 'google_shopping',
  GOOGLE_ANALYTICS: 'google_analytics'
} as const;

// Google-specific UTM medium values
export const GOOGLE_UTM_MEDIUMS = {
  CPC: 'cpc', // Cost Per Click (Google Ads)
  ORGANIC: 'organic', // Organic Google Search
  DISPLAY: 'display', // Google Display Network
  VIDEO: 'video', // YouTube Ads
  SHOPPING: 'shopping', // Google Shopping
  SOCIAL: 'social' // Google+ (if still used)
} as const;

/**
 * Extract Google-specific UTM parameters
 */
export function extractGoogleUTMParameters(url?: string): GoogleUTMParameters | null {
  const targetUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const urlObj = new URL(targetUrl);
  const params = new URLSearchParams(urlObj.search);
  
  // Check if this is a Google-related visit
  const utmSource = params.get('utm_source');
  const gclid = params.get('gclid');
  const referrer = typeof window !== 'undefined' ? document.referrer : '';
  
  // Determine if this is Google traffic
  const isGoogleTraffic = 
    utmSource?.includes('google') || 
    gclid || 
    referrer.includes('google.com') ||
    referrer.includes('googleads') ||
    referrer.includes('googlesyndication');

  if (!isGoogleTraffic) return null;

  const googleUTM: GoogleUTMParameters = {
    utm_source: utmSource || 'google_ads',
    utm_medium: params.get('utm_medium') || 'cpc',
    utm_campaign: params.get('utm_campaign') || 'unknown_campaign',
    utm_term: params.get('utm_term'),
    utm_content: params.get('utm_content'),
    gclid: gclid,
    referrer: referrer,
    landing_page: targetUrl,
    google_campaign_type: determineGoogleCampaignType(params.get('utm_medium'), referrer),
    google_ad_group: params.get('utm_content'), // Often used for ad group in Google Ads
    google_keyword: params.get('utm_term'),
    google_placement: params.get('utm_content') // For display campaigns
  };

  return googleUTM;
}

/**
 * Determine Google campaign type based on medium and referrer
 */
function determineGoogleCampaignType(medium: string | null, referrer: string): 'search' | 'display' | 'video' | 'shopping' | 'app' {
  if (medium === 'cpc') return 'search';
  if (medium === 'display') return 'display';
  if (medium === 'video') return 'video';
  if (medium === 'shopping') return 'shopping';
  if (referrer.includes('youtube.com')) return 'video';
  if (referrer.includes('google.com/shopping')) return 'shopping';
  return 'search'; // Default to search
}

/**
 * Create Google Ads UTM URL
 */
export function createGoogleAdsUTMUrl(
  baseUrl: string,
  campaign: string,
  adGroup?: string,
  keyword?: string,
  content?: string
): string {
  const url = new URL(baseUrl);
  
  url.searchParams.set('utm_source', 'google_ads');
  url.searchParams.set('utm_medium', 'cpc');
  url.searchParams.set('utm_campaign', campaign);
  
  if (adGroup) url.searchParams.set('utm_content', adGroup);
  if (keyword) url.searchParams.set('utm_term', keyword);
  if (content) url.searchParams.set('utm_content', content);
  
  return url.toString();
}

/**
 * Create Google Display UTM URL
 */
export function createGoogleDisplayUTMUrl(
  baseUrl: string,
  campaign: string,
  placement?: string,
  content?: string
): string {
  const url = new URL(baseUrl);
  
  url.searchParams.set('utm_source', 'google_display');
  url.searchParams.set('utm_medium', 'display');
  url.searchParams.set('utm_campaign', campaign);
  
  if (placement) url.searchParams.set('utm_content', placement);
  if (content) url.searchParams.set('utm_content', content);
  
  return url.toString();
}

/**
 * Create Google Video (YouTube) UTM URL
 */
export function createGoogleVideoUTMUrl(
  baseUrl: string,
  campaign: string,
  video?: string,
  content?: string
): string {
  const url = new URL(baseUrl);
  
  url.searchParams.set('utm_source', 'google_video');
  url.searchParams.set('utm_medium', 'video');
  url.searchParams.set('utm_campaign', campaign);
  
  if (video) url.searchParams.set('utm_content', video);
  if (content) url.searchParams.set('utm_content', content);
  
  return url.toString();
}

/**
 * Create Google Shopping UTM URL
 */
export function createGoogleShoppingUTMUrl(
  baseUrl: string,
  campaign: string,
  product?: string,
  content?: string
): string {
  const url = new URL(baseUrl);
  
  url.searchParams.set('utm_source', 'google_shopping');
  url.searchParams.set('utm_medium', 'shopping');
  url.searchParams.set('utm_campaign', campaign);
  
  if (product) url.searchParams.set('utm_term', product);
  if (content) url.searchParams.set('utm_content', content);
  
  return url.toString();
}

/**
 * Store Google UTM parameters with enhanced tracking
 */
export function storeGoogleUTMParameters(googleUTM: GoogleUTMParameters): void {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.setItem('google_utm_tracking', JSON.stringify(googleUTM));
    
    // Also store in regular UTM storage for compatibility
    const regularUTM = {
      utm_source: googleUTM.utm_source,
      utm_medium: googleUTM.utm_medium,
      utm_campaign: googleUTM.utm_campaign,
      utm_term: googleUTM.utm_term,
      utm_content: googleUTM.utm_content,
      referrer: googleUTM.referrer,
      landing_page: googleUTM.landing_page
    };
    sessionStorage.setItem('utm_tracking_data', JSON.stringify(regularUTM));
  } catch (error) {
    console.warn('Failed to store Google UTM parameters:', error);
  }
}

/**
 * Get stored Google UTM parameters
 */
export function getStoredGoogleUTMParameters(): GoogleUTMParameters | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = sessionStorage.getItem('google_utm_tracking');
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn('Failed to retrieve Google UTM parameters:', error);
    return null;
  }
}

/**
 * Initialize Google UTM tracking
 */
export function initializeGoogleUTMTracking(): GoogleUTMParameters | null {
  const googleUTM = extractGoogleUTMParameters();
  
  if (googleUTM) {
    storeGoogleUTMParameters(googleUTM);
    console.log('Google UTM tracking initialized:', googleUTM);
  }
  
  return googleUTM;
}

/**
 * Get Google UTM parameters for form submission
 */
export function getGoogleUTMForSubmission(): GoogleUTMParameters | null {
  const stored = getStoredGoogleUTMParameters();
  if (stored) return stored;
  
  // Fallback to current URL extraction
  return extractGoogleUTMParameters();
}

/**
 * Example Google UTM URLs for different campaign types:
 * 
 * Google Ads Search:
 * https://yoursite.com?utm_source=google_ads&utm_medium=cpc&utm_campaign=relationship_tools&utm_term=friend_reminder&utm_content=ad_group_1
 * 
 * Google Display:
 * https://yoursite.com?utm_source=google_display&utm_medium=display&utm_campaign=brand_awareness&utm_content=news_site_placement
 * 
 * YouTube Video:
 * https://yoursite.com?utm_source=google_video&utm_medium=video&utm_campaign=product_demo&utm_content=demo_video_1
 * 
 * Google Shopping:
 * https://yoursite.com?utm_source=google_shopping&utm_medium=shopping&utm_campaign=product_launch&utm_term=relationship_app
 */
