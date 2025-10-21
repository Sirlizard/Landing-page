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
  created_at: string
}

// Function to add email to waitlist
export async function addToWaitlist(email: string, source: string = 'landing_page', trackingId: string = 'A') {
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
    const { data, error } = await supabase
      .from('waitlist_emails')
      .insert([{ 
        email, 
        source, 
        tracking_id: trackingId 
      }])
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
    console.log(`Waitlist signup tracked with ID: ${trackingId}`, { email, source, tracking_id: trackingId })

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