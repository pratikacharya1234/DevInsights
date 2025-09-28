import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

const CreateAccount = () => {
  const { user, loading, signInWithGitHub } = useAuth()
  const [authLoading, setAuthLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (user && !loading) {
      navigate('/dashboard')
    }
  }, [user, loading, navigate])

  const handleCreateAccount = async () => {
    try {
      setAuthLoading(true)
      setError(null)
      await signInWithGitHub()
    } catch (err) {
      console.error('Account creation error:', err)
      setError('Failed to create account with GitHub. Please try again.')
    } finally {
      setAuthLoading(false)
    }
  }

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

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '50%',
          margin: '0 auto 30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '36px'
        }}>
          ✨
        </div>

        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#1F2937',
          marginBottom: '10px'
        }}>
          Create Your Account
        </h1>

        <p style={{
          color: '#6B7280',
          marginBottom: '30px',
          fontSize: '16px',
          lineHeight: '1.5'
        }}>
          Join DevInsights and unlock powerful insights into your development workflow with GitHub analytics
        </p>

        {error && (
          <div style={{
            background: '#FEE2E2',
            border: '1px solid #FECACA',
            borderRadius: '8px',
            padding: '12px',
            color: '#DC2626',
            fontSize: '14px',
            marginBottom: '20px'
          }}>
            {error}
          </div>
        )}

        <button
          onClick={handleCreateAccount}
          disabled={authLoading}
          style={{
            width: '100%',
            padding: '14px 24px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: authLoading ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            opacity: authLoading ? 0.7 : 1
          }}
          onMouseOver={(e) => !authLoading && (e.target.style.transform = 'translateY(-2px)')}
          onMouseOut={(e) => !authLoading && (e.target.style.transform = 'translateY(0)')}
        >
          {authLoading ? (
            <>
              <div style={{
                width: '16px',
                height: '16px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderTop: '2px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              Creating Account...
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Create Account with GitHub
            </>
          )}
        </button>

        <div style={{
          marginTop: '20px',
          padding: '20px',
          background: '#F8FAFC',
          borderRadius: '12px',
          border: '1px solid #E5E7EB'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#1F2937',
            marginBottom: '10px'
          }}>
            What you&apos;ll get:
          </h3>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            textAlign: 'left'
          }}>
            <li style={{
              fontSize: '14px',
              color: '#6B7280',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ color: '#10B981', fontSize: '16px' }}>✓</span>
              Comprehensive GitHub analytics
            </li>
            <li style={{
              fontSize: '14px',
              color: '#6B7280',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ color: '#10B981', fontSize: '16px' }}>✓</span>
              Commit frequency insights
            </li>
            <li style={{
              fontSize: '14px',
              color: '#6B7280',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ color: '#10B981', fontSize: '16px' }}>✓</span>
              PR cycle time analysis
            </li>
            <li style={{
              fontSize: '14px',
              color: '#6B7280',
              marginBottom: '0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ color: '#10B981', fontSize: '16px' }}>✓</span>
              Achievement tracking
            </li>
          </ul>
        </div>

        <p style={{
          marginTop: '20px',
          fontSize: '14px',
          color: '#9CA3AF'
        }}>
          Already have an account?{' '}
          <Link
            to="/"
            style={{
              color: '#667eea',
              textDecoration: 'none',
              fontWeight: '500'
            }}
            onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
            onMouseOut={(e) => e.target.style.textDecoration = 'none'}
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default CreateAccount