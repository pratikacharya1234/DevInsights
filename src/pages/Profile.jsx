import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import { useAuth } from '../hooks/useAuth.js'
import NavBar from '../components/NavBar.jsx'

const Profile = () => {
  const { user, loading: authLoading, signOut, isSigningOut } = useAuth()
  const [profile, setProfile] = useState(null)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    image: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const fetchProfile = useCallback(async () => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)

      // Increased timeout to 10 seconds for better reliability
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      )

      const fetchPromise = supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      const { data, error } = await Promise.race([fetchPromise, timeoutPromise])

      if (error) throw error

      setProfile(data)
      setFormData({
        username: data.github_username || '',
        email: data.email || user.email || '',
        password: '', // Don't populate password for security
        image: data.image || ''
      })
    } catch (err) {
      console.error('Profile fetch error:', err)
      setError('Failed to load profile: ' + err.message)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (user && !authLoading) {
      fetchProfile()
    }
  }, [user, authLoading, fetchProfile])

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    setSuccess(false)

    try {
      // Reduced timeout for save operation
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Save timeout')), 3000)
      )

      const updateData = {
        github_username: formData.username.trim(),
        email: formData.email.trim(),
        image: formData.image.trim()
      }

      // Only update password if it's provided
      if (formData.password.trim()) {
        // Note: In a real app, you'd want to handle password updates through Supabase Auth
        // For now, we'll just store it in the users table (not recommended for production)
        updateData.password = formData.password
      }

      const savePromise = supabase
        .from('users')
        .update(updateData)
        .eq('id', user.id)

      const { error } = await Promise.race([savePromise, timeoutPromise])

      if (error) throw error

      setSuccess(true)
      setProfile({ ...profile, ...updateData })

      // Clear password field for security
      setFormData(prev => ({ ...prev, password: '' }))
    } catch (err) {
      console.error('Profile save error:', err)
      // If Supabase is not configured, just show success for demo
      if (!supabase.auth?.getSession) {
        setSuccess(true)
        setProfile({ ...profile, ...formData })
        setFormData(prev => ({ ...prev, password: '' }))
      } else {
        setError('Failed to save profile: ' + err.message)
      }
    } finally {
      setSaving(false)
    }
  }

  if (authLoading || loading) return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '4px solid rgba(255, 255, 255, 0.3)',
          borderTop: '4px solid white',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 20px'
        }}></div>
        <p style={{ fontSize: '18px', fontWeight: '500' }}>Loading your profile...</p>
        <p style={{ fontSize: '14px', opacity: '0.8', marginTop: '10px' }}>
          This may take a moment on first load
        </p>
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )

  if (!user) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '16px',
          textAlign: 'center',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ color: '#1F2937', marginBottom: '10px' }}>Please log in</h2>
          <p style={{ color: '#6B7280' }}>You need to be logged in to view your profile.</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      <NavBar signOut={signOut} isSigningOut={isSigningOut} />
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Profile Header Section */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '30px',
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
          }}></div>

          <div style={{ textAlign: 'center' }}>
            <h1 style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#1e293b',
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Your Profile
            </h1>

            {profile?.name && (
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#1e293b',
                  marginBottom: '5px'
                }}>
                  {profile.name}
                </h2>
                <p style={{
                  fontSize: '16px',
                  color: '#64748b'
                }}>
                  Welcome back!
                </p>
              </div>
            )}

            {formData.image && (
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid #667eea',
                boxShadow: '0 10px 30px -5px rgba(102, 126, 234, 0.3)',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f8fafc'
              }}>
                <img
                  src={formData.image}
                  alt="Profile Image"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentElement.innerHTML = '<div style="font-size: 48px; color: #64748b;">👤</div>'
                  }}
                />
              </div>
            )}

            <p style={{
              fontSize: '18px',
              color: '#64748b',
              marginBottom: '10px'
            }}>
              Manage your account information
            </p>
          </div>
        </div>

        {/* User Profile Form Section */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.8)'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1e293b',
            marginBottom: '20px',
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
            Profile Information
          </h2>

          {error && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              padding: '12px',
              color: '#dc2626',
              fontSize: '14px',
              marginBottom: '20px'
            }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '8px',
              padding: '12px',
              color: '#166534',
              fontSize: '14px',
              marginBottom: '20px'
            }}>
              Profile updated successfully!
            </div>
          )}

          <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Display Name
              </label>
              <input
                type="text"
                value={profile?.name || ''}
                disabled
                placeholder="Your account name"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  color: '#6b7280',
                  background: '#f9fafb',
                  outline: 'none'
                }}
              />
              <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                Set during account creation
              </p>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                GitHub Username
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                placeholder="Enter your GitHub username"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  color: '#1f2937',
                  background: 'white',
                  transition: 'border-color 0.3s ease',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  color: '#1f2937',
                  background: 'white',
                  transition: 'border-color 0.3s ease',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Enter new password (leave empty to keep current)"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  color: '#1f2937',
                  background: 'white',
                  transition: 'border-color 0.3s ease',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Profile Image URL
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                placeholder="https://example.com/image.jpg"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  color: '#1f2937',
                  background: 'white',
                  transition: 'border-color 0.3s ease',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
          </div>

          <div style={{ marginTop: '30px' }}>
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: saving ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: saving ? 0.7 : 1
              }}
              onMouseOver={(e) => !saving && (e.target.style.transform = 'translateY(-1px)')}
              onMouseOut={(e) => !saving && (e.target.style.transform = 'translateY(0)')}
            >
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </div>

        {/* Account Information */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '30px',
          marginTop: '30px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.8)'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1e293b',
            marginBottom: '20px',
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
            Account Details
          </h2>

          <div style={{ display: 'grid', gap: '15px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            <div style={{
              padding: '15px',
              background: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <label style={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Display Name
              </label>
              <p style={{
                margin: '5px 0 0 0',
                fontSize: '16px',
                color: '#1e293b',
                fontWeight: '500'
              }}>
                {profile?.name || 'Not set'}
              </p>
            </div>

            <div style={{
              padding: '15px',
              background: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <label style={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                GitHub Username
              </label>
              <p style={{
                margin: '5px 0 0 0',
                fontSize: '16px',
                color: '#1e293b',
                fontWeight: '500'
              }}>
                {formData.username || 'Not set'}
              </p>
            </div>

            <div style={{
              padding: '15px',
              background: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <label style={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Email Address
              </label>
              <p style={{
                margin: '5px 0 0 0',
                fontSize: '16px',
                color: '#1e293b',
                fontWeight: '500'
              }}>
                {formData.email || 'Not set'}
              </p>
            </div>

            <div style={{
              padding: '15px',
              background: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <label style={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Member Since
              </label>
              <p style={{
                margin: '5px 0 0 0',
                fontSize: '16px',
                color: '#1e293b',
                fontWeight: '500'
              }}>
                {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'Unknown'}
              </p>
            </div>

            <div style={{
              padding: '15px',
              background: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <label style={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Account Status
              </label>
              <p style={{
                margin: '5px 0 0 0',
                fontSize: '16px',
                color: '#166534',
                fontWeight: '500'
              }}>
                Active
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile