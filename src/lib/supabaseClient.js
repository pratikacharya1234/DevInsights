import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const mockSupabase = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithOAuth: () => Promise.resolve({}),
    signOut: () => {
      console.log('Mock signOut called - this should not happen in production!')
      return Promise.resolve({})
    }
  }
}

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : mockSupabase

// Log if using mock client (for debugging deployment issues)
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Using mock Supabase client. Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in production.')
}