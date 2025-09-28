import PropTypes from 'prop-types'

const TeamShareModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const shareUrl = `${window.location.origin}/shared/dashboard-token-here`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
    alert('Link copied to clipboard!')
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '20px',
        width: '90%',
        maxWidth: '500px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid rgba(255, 255, 255, 0.8)',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '32px',
            height: '32px',
            border: 'none',
            borderRadius: '50%',
            background: '#F3F4F6',
            color: '#6B7280',
            fontSize: '18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.background = '#E5E7EB'}
          onMouseOut={(e) => e.target.style.background = '#F3F4F6'}
        >
          ×
        </button>

        <h3 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#1F2937',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{
            width: '12px',
            height: '12px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%'
          }}></span>
          Share Dashboard
        </h3>

        <p style={{
          fontSize: '16px',
          color: '#6B7280',
          marginBottom: '30px',
          lineHeight: '1.5'
        }}>
          Share this link with your team members to give them access to this dashboard.
        </p>

        <div style={{ marginBottom: '30px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '8px'
          }}>
            Share Link
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={shareUrl}
              readOnly
              style={{
                flex: 1,
                padding: '12px 16px',
                border: '2px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#374151',
                background: '#F9FAFB',
                outline: 'none'
              }}
            />
            <button
              onClick={copyToClipboard}
              style={{
                padding: '12px 20px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Copy
            </button>
          </div>
        </div>

        <div style={{
          padding: '20px',
          background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
          borderRadius: '12px',
          border: '1px solid #BAE6FD'
        }}>
          <div style={{
            fontSize: '14px',
            color: '#0369A1',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>ℹ️</span>
            <span>This link provides read-only access to the dashboard data.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamShareModal

TeamShareModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}