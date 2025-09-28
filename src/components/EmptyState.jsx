import PropTypes from 'prop-types'

const EmptyState = ({ message }) => (
  <div style={{
    textAlign: 'center',
    padding: '60px 40px',
    color: '#6B7280',
    background: 'white',
    borderRadius: '16px',
    border: '2px dashed #E5E7EB'
  }}>
    <div style={{
      width: '80px',
      height: '80px',
      margin: '0 auto 20px',
      background: 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '36px'
    }}>
      📊
    </div>
    <h3 style={{
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1F2937',
      margin: '0 0 10px 0'
    }}>
      No Data Available
    </h3>
    <p style={{
      fontSize: '16px',
      color: '#6B7280',
      margin: '0',
      lineHeight: '1.5'
    }}>
      {message}
    </p>
  </div>
)

export default EmptyState

EmptyState.propTypes = {
  message: PropTypes.string.isRequired
}