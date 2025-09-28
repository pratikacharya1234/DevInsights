import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const RepoConnector = ({ onRepoSelect, defaultOwner = '' }) => {
  const [owner, setOwner] = useState(defaultOwner)
  const [repo, setRepo] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    setOwner(defaultOwner)
  }, [defaultOwner])

  const showNotification = (message, type = 'error') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000) // Auto-hide after 5 seconds
  }

  const handleConnect = () => {
    let trimmedOwner = owner.trim()
    let trimmedRepo = repo.trim()
    
    // Parse GitHub URLs if full URLs are provided
    const parseGitHubUrl = (url) => {
      // Handle full GitHub URLs like https://github.com/owner/repo
      const githubUrlRegex = /github\.com\/([^/]+)\/([^/]+)/i
      const match = url.match(githubUrlRegex)
      if (match) {
        return { owner: match[1], repo: match[2] }
      }
      return null
    }
    
    // Check if owner field contains a full URL
    const ownerUrlParse = parseGitHubUrl(trimmedOwner)
    if (ownerUrlParse) {
      trimmedOwner = ownerUrlParse.owner
      trimmedRepo = ownerUrlParse.repo
    }
    
    // Check if repo field contains a full URL
    const repoUrlParse = parseGitHubUrl(trimmedRepo)
    if (repoUrlParse) {
      trimmedOwner = repoUrlParse.owner
      trimmedRepo = repoUrlParse.repo
    }
    
    if (!trimmedOwner || !trimmedRepo) {
      showNotification('Please fill in both Owner and Repository fields first.')
      return
    }
    
    if (trimmedOwner.includes(' ') || trimmedRepo.includes(' ')) {
      showNotification('GitHub usernames and repo names cannot contain spaces. Please use the correct GitHub username (e.g., PratikAcharya instead of Pratik Acharya).', 'error')
      return
    }
    
    onRepoSelect({ owner: trimmedOwner, repo: trimmedRepo })
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '30px',
      marginBottom: '30px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      border: '1px solid rgba(255, 255, 255, 0.8)'
    }}>
      <h3 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: '15px',
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
        Connect Repository
      </h3>

      {notification && (
        <div style={{
          padding: '12px 16px',
          marginBottom: '20px',
          borderRadius: '8px',
          border: `1px solid ${notification.type === 'error' ? '#FECACA' : '#D1FAE5'}`,
          backgroundColor: notification.type === 'error' ? '#FEF2F2' : '#F0FDF4',
          color: notification.type === 'error' ? '#DC2626' : '#16A34A',
          fontSize: '14px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          animation: 'slideIn 0.3s ease-out'
        }}>
          <span style={{
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            backgroundColor: notification.type === 'error' ? '#DC2626' : '#16A34A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            color: 'white',
            fontWeight: 'bold',
            flexShrink: 0
          }}>
            {notification.type === 'error' ? '!' : '✓'}
          </span>
          {notification.message}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '15px', alignItems: 'end', marginBottom: '20px' }}>
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '8px'
          }}>
            Owner
          </label>
          <input
            type="text"
            placeholder="e.g., octocat or https://github.com/octocat/Hello-World"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '16px',
              color: '#1F2937',
              background: 'white',
              transition: 'border-color 0.3s ease',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
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
            Repository
          </label>
          <input
            type="text"
            placeholder="e.g., Hello-World or https://github.com/octocat/Hello-World"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '16px',
              color: '#1F2937',
              background: 'white',
              transition: 'border-color 0.3s ease',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
          />
        </div>

        <button
          onClick={handleConnect}
          style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            height: '48px'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          Connect
        </button>
      </div>

      <p style={{
        margin: '0',
        color: '#6B7280',
        fontSize: '14px',
        lineHeight: '1.4'
      }}>
        <strong>Tip:</strong> Enter a GitHub username and repository name, or paste a full GitHub URL. Make sure to use your actual GitHub username (not display name) for real repositories.
      </p>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default RepoConnector

RepoConnector.propTypes = {
  onRepoSelect: PropTypes.func.isRequired,
  defaultOwner: PropTypes.string
}