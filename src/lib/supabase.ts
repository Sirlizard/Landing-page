import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface WaitlistEmail {
  id: string
  email: string
  source: string
  created_at: string
}

// Function to add email to waitlist
export async function addToWaitlist(email: string, source: string = 'landing_page') {
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