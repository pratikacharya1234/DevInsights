import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

const NavBar = ({ githubProfile, signOut, isSigningOut }) => {
  return (
    <nav style={{
      background: '#FFFFFF',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderBottom: '1px solid #E5E7EB'
    }}>
      <Link to="/dashboard" style={{
        textDecoration: 'none',
        color: '#2563EB',
        fontSize: '24px',
        fontWeight: 'bold',
        padding: '8px 16px',
        borderRadius: '8px',
        transition: 'all 0.3s ease'
      }}
      onMouseOver={(e) => e.target.style.background = '#F9FAFB'}
      onMouseOut={(e) => e.target.style.background = 'transparent'}
      >
        DevInsights
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link
          to="/dashboard"
          style={{
            color: '#111827',
            textDecoration: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            transition: 'all 0.3s ease',
            fontWeight: '500'
          }}
          onMouseOver={(e) => {
            e.target.style.background = '#2563EB';
            e.target.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = '#111827';
          }}
        >
          Dashboard
        </Link>
        <Link
          to="/profile"
          style={{
            color: '#111827',
            textDecoration: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            transition: 'all 0.3s ease',
            fontWeight: '500'
          }}
          onMouseOver={(e) => {
            e.target.style.background = '#2563EB';
            e.target.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = '#111827';
          }}
        >
          Profile
        </Link>
        {githubProfile?.avatar_url && (
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid #E5E7EB',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.borderColor = '#2563EB'}
          onMouseOut={(e) => e.target.style.borderColor = '#E5E7EB'}
          onClick={() => window.open(githubProfile.html_url, '_blank')}
          title={`${githubProfile.name || githubProfile.login} (@${githubProfile.login})`}
          >
            <img 
              src={githubProfile.avatar_url} 
              alt="GitHub Avatar"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}
        <button
          onClick={async () => {
            if (isSigningOut) return
            try {
              await signOut()
            } catch (error) {
              console.error('Sign out failed in NavBar:', error)
            }
          }}
          disabled={isSigningOut}
          style={{
            padding: '8px 16px',
            background: isSigningOut ? '#9CA3AF' : '#2563EB',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: isSigningOut ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            fontWeight: '500',
            opacity: isSigningOut ? 0.6 : 1
          }}
          onMouseOver={(e) => {
            if (!isSigningOut) {
              e.target.style.background = '#1D4ED8';
              e.target.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseOut={(e) => {
            if (!isSigningOut) {
              e.target.style.background = '#2563EB';
              e.target.style.transform = 'translateY(0)';
            }
          }}
        >
          {isSigningOut ? 'Signing Out...' : 'Sign Out'}
        </button>
      </div>
    </nav>
  )
}

export default NavBar

NavBar.propTypes = {
  githubProfile: PropTypes.shape({
    login: PropTypes.string,
    name: PropTypes.string,
    avatar_url: PropTypes.string,
    html_url: PropTypes.string
  }),
  signOut: PropTypes.func.isRequired,
  isSigningOut: PropTypes.bool
}