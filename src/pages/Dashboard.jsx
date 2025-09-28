import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../hooks/useAuth.js'
import { useFetchGitHub } from '../hooks/useFetchGitHub.js'
import { supabase } from '../lib/supabaseClient.js'
import NavBar from '../components/NavBar.jsx'
import RepoConnector from '../components/RepoConnector.jsx'
import CommitFrequencyChart from '../components/Charts/CommitFrequencyChart.jsx'
import PRCycleTimeChart from '../components/Charts/PRCycleTimeChart.jsx'
import LanguageTrendChart from '../components/Charts/LanguageTrendChart.jsx'
import AchievementsList from '../components/AchievementsList.jsx'

const Dashboard = () => {
  const { user, loading, signOut, githubProfile, isSigningOut, needsEmailConfirmation } = useAuth()
  const [selectedRepo, setSelectedRepo] = useState(null)
  const [defaultOwner, setDefaultOwner] = useState('')
  const { data, loading: fetchLoading, error } = useFetchGitHub(selectedRepo?.owner, selectedRepo?.repo, null) // No token for demo

  const fetchUserProfile = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('github_username')
        .eq('id', user.id)
        .single()

      if (error) throw error

      if (data.github_username) {
        setDefaultOwner(data.github_username)
      }
    } catch (err) {
      console.error('Failed to fetch user profile:', err)
    }
  }, [user])

  useEffect(() => {
    if (user) {
      fetchUserProfile()
    }
  }, [user, fetchUserProfile])

  if (loading) return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid rgba(255, 255, 255, 0.3)',
        borderTop: '4px solid white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )

  if (!user && !needsEmailConfirmation) {
    window.location.href = '/'
    return null
  }

  const insights = data

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <NavBar signOut={signOut} githubProfile={githubProfile} isSigningOut={isSigningOut} />
      {needsEmailConfirmation && (
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '20px',
          textAlign: 'center',
          margin: '0 30px 30px 30px',
          borderRadius: '16px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>📧 Check Your Email!</h2>
          <p style={{ margin: '0', fontSize: '16px' }}>
            We&apos;ve sent you a confirmation link. Please check your email and click the link to activate your account and start using DevInsights.
          </p>
        </div>
      )}
      <div style={{ padding: '30px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.8)'
        }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#1F2937',
            marginBottom: '10px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Developer Analytics Dashboard
          </h1>
          <p style={{
            color: '#6B7280',
            fontSize: '18px',
            marginBottom: '0'
          }}>
            Gain insights into your development workflow and productivity
          </p>
        </div>

        <RepoConnector onRepoSelect={setSelectedRepo} defaultOwner={defaultOwner} />

        {selectedRepo && (
          <div style={{ marginTop: '30px' }}>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '30px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.8)'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1F2937',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '50%'
                }}></span>
                {selectedRepo.owner}/{selectedRepo.repo}
              </h2>
              {fetchLoading && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#6B7280',
                  fontSize: '16px'
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid #E5E7EB',
                    borderTop: '2px solid #667eea',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Loading insights...
                </div>
              )}
              {error && (
                <div style={{
                  background: '#FEF2F2',
                  border: '1px solid #FECACA',
                  borderRadius: '8px',
                  padding: '12px',
                  color: '#DC2626',
                  fontSize: '14px'
                }}>
                  Error: {error}
                </div>
              )}
            </div>

            {insights && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
                gap: '30px',
                marginBottom: '30px'
              }}>
                <div style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.8)'
                }}>
                  <CommitFrequencyChart data={insights.commitFrequency} />
                </div>
                <div style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.8)'
                }}>
                  <PRCycleTimeChart data={insights.prCycleTimes} />
                </div>
                <div style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.8)'
                }}>
                  <LanguageTrendChart data={insights.languageTrends} />
                </div>
              </div>
            )}

            {insights && (
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.8)'
              }}>
                <AchievementsList achievements={insights.achievements || []} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard