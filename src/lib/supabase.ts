import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a mock client if environment variables are not set
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Database types
export interface WaitlistEmail {
  id: string
  email: string
  source: string
  tracking_id: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  referrer?: string
  landing_page?: string
  // Google-specific tracking fields
  gclid?: string
  google_campaign_type?: string
  google_ad_group?: string
  google_keyword?: string
  google_placement?: string
  google_creative?: string
  created_at: string
}

// Function to add email to waitlist
export async function addToWaitlist(
  email: string, 
  source: string = 'landing_page', 
  trackingId: string = 'A',
  utmParams?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
    referrer?: string;
    landing_page?: string;
  }
) {
  // Return mock response if Supabase is not configured
  if (!supabase) {
    console.warn('Supabase not configured. Email would be:', email)
    return { 
      success: true, 
      message: 'Demo mode: Email captured! (Configure Supabase to save emails)', 
      data: null 
    }
  }

  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { 
      success: false, 
      message: 'Please sign in to join the waitlist', 
      data: null 
    }
  }

  try {
    const insertData: any = { 
      email, 
      source, 
      tracking_id: trackingId 
    };

    // Add UTM parameters if provided
    if (utmParams) {
      Object.assign(insertData, utmParams);
    }

    const { data, error } = await supabase
      .from('waitlist_emails')
      .insert([insertData])
      .select()
      .single()

    if (error) {
      // Handle duplicate email error gracefully
      if (error.code === '23505') {
        return { success: false, message: 'Email already registered!', data: null }
      }
      throw error
    }

    // Log tracking information
    console.log(`Waitlist signup tracked with ID: ${trackingId}`, { 
      email, 
      source, 
      tracking_id: trackingId,
      utm_params: utmParams 
    })

    return { success: true, message: 'Successfully joined waitlist!', data }
  } catch (error) {
    console.error('Error adding to waitlist:', error)
    return { 
      success: false, 
      message: 'Failed to join waitlist. Please try again.', 
      data: null 
    }
  }
}

// Authentication functions
export async function signUp(email: string, password: string, trackingId: string = 'A') {
  if (!supabase) {
    return { success: false, message: 'Supabase not configured' }
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) throw error

    // Track the signup with the provided tracking ID
    console.log(`User signup tracked with ID: ${trackingId}`, { email, trackingId })
    
    return { success: true, message: 'Account created successfully!', data }
  } catch (error: any) {
    console.error('Error signing up:', error)
    return { 
      success: false, 
      message: error.message || 'Failed to create account', 
      data: null 
    }
  }
}

export async function signIn(email: string, password: string) {
  if (!supabase) {
    return { success: false, message: 'Supabase not configured' }
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    return { success: true, message: 'Signed in successfully!', data }
  } catch (error: any) {
    console.error('Error signing in:', error)
    return { 
      success: false, 
      message: error.message || 'Failed to sign in', 
      data: null 
    }
  }
}

export async function signOut() {
  if (!supabase) {
    return { success: false, message: 'Supabase not configured' }
  }

  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error

    return { success: true, message: 'Signed out successfully!' }
  } catch (error: any) {
    console.error('Error signing out:', error)
    return { 
      success: false, 
      message: error.message || 'Failed to sign out'
    }
  }
}

export async function getCurrentUser() {
  if (!supabase) {
    return { user: null }
  }

  try {
    const { data: { user } } = await supabase.auth.getUser()
    return { user }
  } catch (error) {
    console.error('Error getting current user:', error)
    return { user: null }
  }
}
// Function to get waitlist count (for displaying metrics)
export async function getWaitlistCount() {
  // Return mock count if Supabase is not configured
  if (!supabase) {
    return { success: true, count: 15000 }
  }

  try {
    const { count, error } = await supabase
      .from('waitlist_emails')
      .select('*', { count: 'exact', head: true })

    if (error) throw error

    return { success: true, count: count || 0 }
  } catch (error) {
    console.error('Error getting waitlist count:', error)
    return { success: false, count: 0 }
  }
}

// Function to get waitlist count by tracking ID
export async function getWaitlistCountByTracking(trackingId: string) {
  // Return mock count if Supabase is not configured
  if (!supabase) {
    return { success: true, count: 15000 }
  }

  try {
    const { count, error } = await supabase
      .from('waitlist_emails')
      .select('*', { count: 'exact', head: true })
      .eq('tracking_id', trackingId)

    if (error) throw error

    return { success: true, count: count || 0 }
  } catch (error) {
    console.error('Error getting waitlist count by tracking:', error)
    return { success: false, count: 0 }
  }
}

// Function to get all waitlist entries by tracking ID
export async function getWaitlistByTracking(trackingId: string) {
  if (!supabase) {
    return { success: false, data: null, message: 'Supabase not configured' }
  }

  try {
    const { data, error } = await supabase
      .from('waitlist_emails')
      .select('*')
      .eq('tracking_id', trackingId)
      .order('created_at', { ascending: false })

    if (error) throw error

    return { success: true, data, message: 'Successfully retrieved waitlist data' }
  } catch (error) {
    console.error('Error getting waitlist by tracking:', error)
    return { success: false, data: null, message: 'Failed to retrieve waitlist data' }
  }
}

// UTM Analytics Functions

// Get signups by UTM source
export async function getSignupsByUTMSource(utmSource: string) {
  if (!supabase) {
    return { success: false, data: null, message: 'Supabase not configured' }
  }

  try {
    const { data, error } = await supabase
      .from('waitlist_emails')
      .select('*')
      .eq('utm_source', utmSource)
      .order('created_at', { ascending: false })

    if (error) throw error

    return { success: true, data, message: `Successfully retrieved signups for UTM source: ${utmSource}` }
  } catch (error) {
    console.error('Error getting signups by UTM source:', error)
    return { success: false, data: null, message: 'Failed to retrieve UTM source data' }
  }
}

// Get signups by UTM campaign
export async function getSignupsByUTMCampaign(utmCampaign: string) {
  if (!supabase) {
    return { success: false, data: null, message: 'Supabase not configured' }
  }

  try {
    const { data, error } = await supabase
      .from('waitlist_emails')
      .select('*')
      .eq('utm_campaign', utmCampaign)
      .order('created_at', { ascending: false })

    if (error) throw error

    return { success: true, data, message: `Successfully retrieved signups for UTM campaign: ${utmCampaign}` }
  } catch (error) {
    console.error('Error getting signups by UTM campaign:', error)
    return { success: false, data: null, message: 'Failed to retrieve UTM campaign data' }
  }
}

// Get UTM analytics summary
export async function getUTMAnalytics() {
  if (!supabase) {
    return { success: false, data: null, message: 'Supabase not configured' }
  }

  try {
    const { data, error } = await supabase
      .from('waitlist_emails')
      .select('utm_source, utm_medium, utm_campaign, utm_term, utm_content, referrer, landing_page, created_at')
      .not('utm_source', 'is', null)
      .order('created_at', { ascending: false })

    if (error) throw error

    return { success: true, data, message: 'Successfully retrieved UTM analytics' }
  } catch (error) {
    console.error('Error getting UTM analytics:', error)
    return { success: false, data: null, message: 'Failed to retrieve UTM analytics' }
  }
}

// Get campaign performance summary
export async function getCampaignPerformance() {
  if (!supabase) {
    return { success: false, data: null, message: 'Supabase not configured' }
  }

  try {
    const { data, error } = await supabase
      .from('waitlist_emails')
      .select('utm_source, utm_medium, utm_campaign, created_at')
      .not('utm_source', 'is', null)
      .order('created_at', { ascending: false })

    if (error) throw error

    // Group by campaign for summary
    const campaignSummary = data?.reduce((acc: any, item: any) => {
      const key = `${item.utm_source}_${item.utm_medium}_${item.utm_campaign}`;
      if (!acc[key]) {
        acc[key] = {
          utm_source: item.utm_source,
          utm_medium: item.utm_medium,
          utm_campaign: item.utm_campaign,
          count: 0,
          latest_signup: item.created_at
        };
      }
      acc[key].count++;
      if (new Date(item.created_at) > new Date(acc[key].latest_signup)) {
        acc[key].latest_signup = item.created_at;
      }
      return acc;
    }, {});

    return { 
      success: true, 
      data: Object.values(campaignSummary || {}), 
      message: 'Successfully retrieved campaign performance' 
    }
  } catch (error) {
    console.error('Error getting campaign performance:', error)
    return { success: false, data: null, message: 'Failed to retrieve campaign performance' }
  }
}

// Google-Specific Analytics Functions

// Get signups by Google campaign type
export async function getSignupsByGoogleCampaignType(campaignType: string) {
  if (!supabase) {
    return { success: false, data: null, message: 'Supabase not configured' }
  }

  try {
    const { data, error } = await supabase
      .from('waitlist_emails')
      .select('*')
      .eq('google_campaign_type', campaignType)
      .order('created_at', { ascending: false })

    if (error) throw error

    return { success: true, data, message: `Successfully retrieved signups for Google campaign type: ${campaignType}` }
  } catch (error) {
    console.error('Error getting signups by Google campaign type:', error)
    return { success: false, data: null, message: 'Failed to retrieve Google campaign type data' }
  }
}

// Get signups by Google ad group
export async function getSignupsByGoogleAdGroup(adGroup: string) {
  if (!supabase) {
    return { success: false, data: null, message: 'Supabase not configured' }
  }

  try {
    const { data, error } = await supabase
      .from('waitlist_emails')
      .select('*')
      .eq('google_ad_group', adGroup)
      .order('created_at', { ascending: false })

    if (error) throw error

    return { success: true, data, message: `Successfully retrieved signups for Google ad group: ${adGroup}` }
  } catch (error) {
    console.error('Error getting signups by Google ad group:', error)
    return { success: false, data: null, message: 'Failed to retrieve Google ad group data' }
  }
}

// Get signups by Google keyword
export async function getSignupsByGoogleKeyword(keyword: string) {
  if (!supabase) {
    return { success: false, data: null, message: 'Supabase not configured' }
  }

  try {
    const { data, error } = await supabase
      .from('waitlist_emails')
      .select('*')
      .eq('google_keyword', keyword)
      .order('created_at', { ascending: false })

    if (error) throw error

    return { success: true, data, message: `Successfully retrieved signups for Google keyword: ${keyword}` }
  } catch (error) {
    console.error('Error getting signups by Google keyword:', error)
    return { success: false, data: null, message: 'Failed to retrieve Google keyword data' }
  }
}

// Get Google Ads performance summary
export async function getGoogleAdsPerformance() {
  if (!supabase) {
    return { success: false, data: null, message: 'Supabase not configured' }
  }

  try {
    const { data, error } = await supabase
      .from('waitlist_emails')
      .select('google_campaign_type, google_ad_group, google_keyword, utm_campaign, created_at')
      .not('google_campaign_type', 'is', null)
      .order('created_at', { ascending: false })

    if (error) throw error

    // Group by Google campaign for summary
    const googleSummary = data?.reduce((acc: any, item: any) => {
      const key = `${item.google_campaign_type}_${item.google_ad_group}_${item.utm_campaign}`;
      if (!acc[key]) {
        acc[key] = {
          google_campaign_type: item.google_campaign_type,
          google_ad_group: item.google_ad_group,
          utm_campaign: item.utm_campaign,
          count: 0,
          latest_signup: item.created_at,
          keywords: new Set()
        };
      }
      acc[key].count++;
      if (item.google_keyword) {
        acc[key].keywords.add(item.google_keyword);
      }
      if (new Date(item.created_at) > new Date(acc[key].latest_signup)) {
        acc[key].latest_signup = item.created_at;
      }
      return acc;
    }, {});

    // Convert Set to Array for keywords
    Object.values(googleSummary || {}).forEach((campaign: any) => {
      campaign.keywords = Array.from(campaign.keywords);
    });

    return { 
      success: true, 
      data: Object.values(googleSummary || {}), 
      message: 'Successfully retrieved Google Ads performance' 
    }
  } catch (error) {
    console.error('Error getting Google Ads performance:', error)
    return { success: false, data: null, message: 'Failed to retrieve Google Ads performance' }
  }
}

// Get Google Click ID (gclid) attribution data
export async function getGoogleClickAttribution() {
  if (!supabase) {
    return { success: false, data: null, message: 'Supabase not configured' }
  }

  try {
    const { data, error } = await supabase
      .from('waitlist_emails')
      .select('gclid, utm_source, utm_campaign, utm_medium, created_at')
      .not('gclid', 'is', null)
      .order('created_at', { ascending: false })

    if (error) throw error

    return { success: true, data, message: 'Successfully retrieved Google Click ID attribution data' }
  } catch (error) {
    console.error('Error getting Google Click ID attribution:', error)
    return { success: false, data: null, message: 'Failed to retrieve Google Click ID attribution' }
  }
}