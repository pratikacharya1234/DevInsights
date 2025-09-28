import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

const NavBar = ({ githubProfile, signOut, isSigningOut }) => {
  return (
    <nav style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <Link to="/dashboard" style={{
        textDecoration: 'none',
        color: 'white',
        fontSize: '24px',
        fontWeight: 'bold',
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '8px 16px',
        borderRadius: '8px',
        backdropFilter: 'blur(10px)'
      }}>
        DevInsights
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link
          to="/dashboard"
          style={{
            color: 'white',
            textDecoration: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            transition: 'all 0.3s ease',
            fontWeight: '500'
          }}
          onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
          onMouseOut={(e) => e.target.style.background = 'transparent'}
        >
          Dashboard
        </Link>
        <Link
          to="/profile"
          style={{
            color: 'white',
            textDecoration: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            transition: 'all 0.3s ease',
            fontWeight: '500'
          }}
          onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
          onMouseOut={(e) => e.target.style.background = 'transparent'}
        >
          Profile
        </Link>
        {githubProfile?.avatar_url && (
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.8)'}
          onMouseOut={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
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
            background: isSigningOut ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '6px',
            cursor: isSigningOut ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            fontWeight: '500',
            backdropFilter: 'blur(10px)',
            opacity: isSigningOut ? 0.6 : 1
          }}
          onMouseOver={(e) => {
            if (!isSigningOut) {
              e.target.style.background = 'rgba(255, 255, 255, 0.3)';
              e.target.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseOut={(e) => {
            if (!isSigningOut) {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
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