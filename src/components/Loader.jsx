const Loader = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
    gap: '20px'
  }}>
    <div style={{
      width: '50px',
      height: '50px',
      border: '4px solid #E5E7EB',
      borderTop: '4px solid #667eea',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
    <div style={{
      fontSize: '16px',
      color: '#6B7280',
      fontWeight: '500'
    }}>
      Loading data...
    </div>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
)

export default Loader