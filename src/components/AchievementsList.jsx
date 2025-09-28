import PropTypes from 'prop-types'

const AchievementsList = ({ achievements }) => {
  if (!achievements || achievements.length === 0) {
    return (
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '30px',
        marginTop: '30px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        color: '#6B7280',
        fontSize: '16px'
      }}>
        No achievements data available
      </div>
    )
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '30px',
      marginTop: '30px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      border: '1px solid rgba(255, 255, 255, 0.8)'
    }}>
      <h3 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#1F2937',
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
        Achievements
      </h3>

      <div style={{ display: 'grid', gap: '15px' }}>
        {achievements.map(achievement => (
          <div
            key={achievement.id}
            style={{
              padding: '20px',
              borderRadius: '12px',
              border: achievement.unlocked ? '2px solid #10B981' : '2px solid #E5E7EB',
              background: achievement.unlocked
                ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)'
                : 'rgba(229, 231, 235, 0.3)',
              opacity: achievement.unlocked ? 1 : 0.7,
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {achievement.unlocked && (
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                width: '20px',
                height: '20px',
                background: '#10B981',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                color: 'white',
                fontWeight: 'bold'
              }}>
                ✓
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: achievement.unlocked
                  ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                  : 'linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                color: 'white',
                flexShrink: 0
              }}>
                {achievement.icon || '🏆'}
              </div>

              <div style={{ flex: 1 }}>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: achievement.unlocked ? '#1F2937' : '#6B7280',
                  margin: '0 0 5px 0'
                }}>
                  {achievement.name}
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: achievement.unlocked ? '#374151' : '#9CA3AF',
                  margin: '0',
                  lineHeight: '1.4'
                }}>
                  {achievement.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AchievementsList

AchievementsList.propTypes = {
  achievements: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      unlocked: PropTypes.bool.isRequired,
      icon: PropTypes.string
    })
  )
}