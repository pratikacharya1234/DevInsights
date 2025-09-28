import PropTypes from 'prop-types'

const ErrorBox = ({ message }) => (
  <div style={{
    background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    color: 'white',
    padding: '20px',
    borderRadius: '12px',
    margin: '20px 0',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  }}>
    <div style={{
      width: '24px',
      height: '24px',
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      flexShrink: 0
    }}>
      ⚠️
    </div>
    <div>
      <strong style={{ fontSize: '16px', display: 'block', marginBottom: '4px' }}>Error</strong>
      <span style={{ fontSize: '14px', opacity: 0.9 }}>{message}</span>
    </div>
  </div>
)

export default ErrorBox

ErrorBox.propTypes = {
  message: PropTypes.string.isRequired
}