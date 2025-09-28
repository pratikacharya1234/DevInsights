import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import PropTypes from 'prop-types'

ChartJS.register(ArcElement, Tooltip, Legend)

const LanguageTrendChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '400px',
        color: '#6B7280',
        fontSize: '16px'
      }}>
        No language data available
      </div>
    )
  }

  const colors = [
    '#667eea', '#764ba2', '#f093fb', '#f5576c',
    '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
    '#fa709a', '#fee140', '#a8edea', '#fed6e3'
  ]

  const chartData = {
    labels: data.map(d => d.language),
    datasets: [{
      data: data.map(d => d.percentage),
      backgroundColor: colors.slice(0, data.length),
      borderColor: colors.slice(0, data.length).map(color => color + 'dd'),
      borderWidth: 2,
      hoverBorderWidth: 3,
      hoverOffset: 8
    }]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
            weight: '500',
            family: 'Inter, sans-serif'
          },
          color: '#374151'
        }
      },
      title: {
        display: true,
        text: 'Language Distribution',
        font: {
          size: 18,
          weight: 'bold',
          family: 'Inter, sans-serif'
        },
        color: '#1F2937',
        padding: { bottom: 20 }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1F2937',
        bodyColor: '#374151',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: (context) => `${context.label}: ${context.parsed}%`
        }
      }
    }
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '30px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      border: '1px solid rgba(255, 255, 255, 0.8)',
      height: '400px'
    }}>
      <Pie data={chartData} options={options} />
    </div>
  )
}

export default LanguageTrendChart

LanguageTrendChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      language: PropTypes.string.isRequired,
      percentage: PropTypes.number.isRequired
    })
  ).isRequired
}