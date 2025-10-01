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
  created_at: string
}

// Function to add email to waitlist
export async function addToWaitlist(email: string, source: string = 'landing_page') {
  // Return mock response if Supabase is not configured
  if (!supabase) {
    console.warn('Supabase not configured. Email would be:', email)
    return { 
      success: true, 
      message: 'Demo mode: Email captured! (Configure Supabase to save emails)', 
      data: null 
    }
  }

  try {
    const { data, error } = await supabase
      .from('waitlist_emails')
      .insert([{ email, source }])
      .select()
      .single()

    if (error) {
      // Handle duplicate email error gracefully
      if (error.code === '23505') {
        return { success: true, message: 'Email already registered!', data: null }
      }
      throw error
    }

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