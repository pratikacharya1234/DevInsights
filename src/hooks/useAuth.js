import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import { getUserProfile } from '../lib/githubApi.js'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [githubProfile, setGithubProfile] = useState(null)
  const [isSigningOut, setIsSigningOut] = useState(false)

  const preloadGithubData = async (githubUsername) => {
    if (!githubUsername) return

    try {
      const profile = await getUserProfile(githubUsername)
      setGithubProfile(profile)
    } catch (err) {
      console.warn('Failed to preload GitHub profile:', err)
      // Don't set error, just don't show GitHub data
    }
  }

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) {
          console.error('Error getting session:', error)
          setLoading(false)
          return
        }

        const user = session?.user ?? null
        setUser(user)
        setLoading(false)

        if (user) {
          // Extract GitHub username from OAuth metadata
          const githubUsername = user.user_metadata?.user_name || user.user_metadata?.preferred_username || user.user_metadata?.login

          // Upsert user profile with GitHub username
          const { error: upsertError } = await supabase
            .from('users')
            .upsert({
              id: user.id,
              email: user.email,
              name: user.user_metadata?.full_name || user.user_metadata?.name || null,
              github_username: githubUsername || null
            }, { onConflict: 'id' })

          if (upsertError) console.error('Error upserting user:', upsertError)

          // Preload GitHub profile data
          if (githubUsername) {
            preloadGithubData(githubUsername)
          }
        }
      } catch (err) {
        console.error('Error in getSession:', err)
        setLoading(false)
      }
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email, !!session?.user)

      const user = session?.user ?? null
      setUser(user)
      setLoading(false)

      if (event === 'SIGNED_OUT' || !user) {
        console.log('User signed out, clearing state')
        setUser(null)
        setGithubProfile(null)
        setIsSigningOut(false)
        // Don't redirect here - let the signOut function handle navigation
        return
      }

      if (user) {
        // Extract GitHub username from OAuth metadata
        const githubUsername = user.user_metadata?.user_name || user.user_metadata?.preferred_username || user.user_metadata?.login

        // For GitHub users, get name from auth metadata
        const fullName = user.user_metadata?.full_name || user.user_metadata?.name ||
                        (user.user_metadata?.given_name && user.user_metadata?.family_name ?
                         `${user.user_metadata.given_name} ${user.user_metadata.family_name}` : null)

        // Upsert user profile with account creation info
        const { error } = await supabase
          .from('users')
          .upsert({
            id: user.id,
            email: user.email,
            name: fullName,
            github_username: githubUsername || null
          }, { onConflict: 'id' })

        if (error) console.error('Error upserting user:', error)

        // Preload GitHub profile data only for GitHub users
        if (githubUsername) {
          preloadGithubData(githubUsername)
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signInWithGitHub = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      })
      if (error) {
        console.error('Error signing in with GitHub:', error)
        throw error
      }
    } catch (err) {
      console.error('GitHub sign in failed:', err)
      throw err
    }
  }

  const signOut = async () => {
    // Prevent multiple simultaneous sign out attempts
    if (isSigningOut) {
      console.log('Sign out already in progress, ignoring duplicate call')
      return
    }

    setIsSigningOut(true)
    console.log('Starting sign out process...')

    try {
      // Clear local state immediately to provide instant UI feedback
      setUser(null)
      setGithubProfile(null)
      setLoading(false) // Ensure loading is false so UI doesn't show loading state

      // Sign out from Supabase
      console.log('Calling supabase.auth.signOut()...')
      const { error } = await supabase.auth.signOut()

      if (error) {
        console.error('Supabase sign out error:', error)
        // Don't throw here - we still want to clear local state and redirect
      } else {
        console.log('Supabase sign out successful')
      }

      console.log('Redirecting to login page...')

      // Redirect immediately to login page
      window.location.href = '/login?signed_out=true'

    } catch (err) {
      console.error('Sign out process failed:', err)

      // Ensure state is cleared even if there's an error
      setUser(null)
      setGithubProfile(null)
      setLoading(false)
      setIsSigningOut(false)

      // Still redirect to login on error
      window.location.href = '/login?signed_out=true'
    }

    // Note: We don't set isSigningOut to false here because we're redirecting
    // The page will reload, so this state won't persist anyway
  }

  return { 
    user, 
    loading, 
    githubProfile, 
    signInWithGitHub, 
    signOut, 
    isSigningOut 
  }
}