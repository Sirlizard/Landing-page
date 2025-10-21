// UTM Tracking Utility
// Captures and manages UTM parameters for marketing attribution

export interface UTMParameters {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing_page?: string;
}

// UTM parameter names to track
const UTM_PARAMS = [
  'utm_source',
  'utm_medium', 
  'utm_campaign',
  'utm_term',
  'utm_content'
] as const;

// Session storage key for UTM data
const UTM_STORAGE_KEY = 'utm_tracking_data';

/**
 * Extract UTM parameters from URL
 */
export function extractUTMParameters(url?: string): UTMParameters {
  const targetUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const urlObj = new URL(targetUrl);
  const params = new URLSearchParams(urlObj.search);
  
  const utmData: UTMParameters = {};
  
  // Extract UTM parameters
  UTM_PARAMS.forEach(param => {
    const value = params.get(param);
    if (value) {
      utmData[param] = value;
    }
  });
  
  // Extract referrer
  if (typeof window !== 'undefined' && document.referrer) {
    utmData.referrer = document.referrer;
  }
  
  // Set landing page
  utmData.landing_page = targetUrl;
  
  return utmData;
}

/**
 * Store UTM parameters in session storage
 */
export function storeUTMParameters(utmData: UTMParameters): void {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmData));
  } catch (error) {
    console.warn('Failed to store UTM parameters:', error);
  }
}

/**
 * Retrieve UTM parameters from session storage
 */
export function getStoredUTMParameters(): UTMParameters | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn('Failed to retrieve UTM parameters:', error);
    return null;
  }
}

/**
 * Initialize UTM tracking on page load
 */
export function initializeUTMTracking(): UTMParameters {
  const utmData = extractUTMParameters();
  
  // Only store if we have UTM parameters
  if (Object.keys(utmData).length > 0) {
    storeUTMParameters(utmData);
  }
  
  return utmData;
}

/**
 * Clear stored UTM parameters
 */
export function clearUTMParameters(): void {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.removeItem(UTM_STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear UTM parameters:', error);
  }
}

/**
 * Get UTM parameters for form submission
 * Returns stored UTM data or current URL data
 */
export function getUTMForSubmission(): UTMParameters {
  const stored = getStoredUTMParameters();
  if (stored && Object.keys(stored).length > 0) {
    return stored;
  }
  
  // Fallback to current URL if no stored data
  return extractUTMParameters();
}

/**
 * Create UTM tracking URL
 * Helper function to generate URLs with UTM parameters
 */
export function createUTMUrl(baseUrl: string, utmParams: Partial<UTMParameters>): string {
  const url = new URL(baseUrl);
  
  Object.entries(utmParams).forEach(([key, value]) => {
    if (value && key.startsWith('utm_')) {
      url.searchParams.set(key, value);
    }
  });
  
  return url.toString();
}

/**
 * Example UTM URLs you can use for marketing:
 * 
 * Google Ads: https://yoursite.com?utm_source=google&utm_medium=cpc&utm_campaign=summer_launch
 * Facebook: https://yoursite.com?utm_source=facebook&utm_medium=social&utm_campaign=product_announcement
 * Email: https://yoursite.com?utm_source=newsletter&utm_medium=email&utm_campaign=weekly_update
 * Twitter: https://yoursite.com?utm_source=twitter&utm_medium=social&utm_campaign=launch_tweet
 */
