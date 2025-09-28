import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

const Signup = () => {
  const { user, loading, signInWithGitHub, signUpWithEmail } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  })
  const [authLoading, setAuthLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (user && !loading) {
      navigate('/dashboard')
    }
  }, [user, loading, navigate])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleEmailSignup = async (e) => {
    e.preventDefault()
    try {
      setAuthLoading(true)
      setError(null)
      setSuccess(false)
      setSuccessMessage('')

      // Basic validation
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match')
      }

      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long')
      }

      if (!formData.firstName || !formData.lastName) {
        throw new Error('Please fill in all required fields')
      }

      const result = await signUpWithEmail(formData.email, formData.password, formData.firstName, formData.lastName)

      if (result.success) {
        if (result.needsConfirmation) {
          // User created but needs email confirmation
          setSuccess(true)
          setSuccessMessage('Account created successfully! Please check your email and click the confirmation link to complete your registration.')
          // Clear form
          setFormData({
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: ''
          })
          // Redirect to dashboard immediately after showing success message
          navigate('/dashboard')
        } else {
          // User is automatically signed in
          console.log('User signed up and automatically signed in')
          // Redirect will happen via useEffect when user state changes
        }
      }
    } catch (err) {
      console.error('Signup error:', err)
      setError(err.message || 'Failed to create account. Please try again.')
    } finally {
      setAuthLoading(false)
    }
  }

  const handleGitHubSignup = async () => {
    try {
      setAuthLoading(true)
      setError(null)
      await signInWithGitHub()
    } catch (err) {
      console.error('GitHub sign up error:', err)
      setError('Failed to sign up with GitHub. Please try again.')
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
          👤
        </div>

        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#1F2937',
          marginBottom: '10px'
        }}>
          Create Account
        </h1>

        <p style={{
          color: '#6B7280',
          marginBottom: '30px',
          fontSize: '16px',
          lineHeight: '1.5'
        }}>
          Join DevInsights and start tracking your development insights
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

        {success && (
          <div style={{
            background: '#D1FAE5',
            border: '1px solid #A7F3D0',
            borderRadius: '8px',
            padding: '12px',
            color: '#065F46',
            fontSize: '14px',
            marginBottom: '20px'
          }}>
            {successMessage}
          </div>
        )}

        {/* Email/Password Signup Form */}
        <form onSubmit={handleEmailSignup} style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First name"
              required
              style={{
                flex: 1,
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px',
                color: '#1f2937',
                background: 'white',
                outline: 'none',
                transition: 'border-color 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last name"
              required
              style={{
                flex: 1,
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px',
                color: '#1f2937',
                background: 'white',
                outline: 'none',
                transition: 'border-color 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email address"
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px',
                color: '#1f2937',
                background: 'white',
                outline: 'none',
                transition: 'border-color 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password (min. 6 characters)"
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px',
                color: '#1f2937',
                background: 'white',
                outline: 'none',
                transition: 'border-color 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm password"
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px',
                color: '#1f2937',
                background: 'white',
                outline: 'none',
                transition: 'border-color 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <button
            type="submit"
            disabled={authLoading}
            style={{
              width: '100%',
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: authLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              marginBottom: '15px',
              opacity: authLoading ? 0.7 : 1
            }}
            onMouseOver={(e) => !authLoading && (e.target.style.transform = 'translateY(-1px)')}
            onMouseOut={(e) => !authLoading && (e.target.style.transform = 'translateY(0)')}
          >
            {authLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          margin: '20px 0',
          color: '#9CA3AF',
          fontSize: '14px'
        }}>
          <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }}></div>
          <span style={{ padding: '0 16px' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }}></div>
        </div>

        {/* GitHub Signup */}
        <button
          onClick={handleGitHubSignup}
          disabled={authLoading}
          style={{
            width: '100%',
            padding: '12px 24px',
            background: '#24292e',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
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
          onMouseOver={(e) => !authLoading && (e.target.style.transform = 'translateY(-1px)')}
          onMouseOut={(e) => !authLoading && (e.target.style.transform = 'translateY(0)')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          Continue with GitHub
        </button>

        <p style={{
          marginTop: '20px',
          fontSize: '14px',
          color: '#9CA3AF'
        }}>
          Already have an account?{' '}
          <Link
            to="/login"
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

export default Signup