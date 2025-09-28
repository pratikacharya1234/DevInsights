import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import PropTypes from 'prop-types'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const PRCycleTimeChart = ({ data }) => {
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
        No PR data available
      </div>
    )
  }

  const chartData = {
    labels: data.map((_, i) => `PR ${i + 1}`),
    datasets: [{
      label: 'Cycle Time (days)',
      data: data,
      backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderColor: '#667eea',
      borderWidth: 1,
      borderRadius: 4,
      borderSkipped: false,
      hoverBackgroundColor: '#764ba2',
      hoverBorderColor: '#5a4fcf',
      hoverBorderWidth: 2
    }]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 14,
            weight: '600',
            family: 'Inter, sans-serif'
          },
          color: '#374151'
        }
      },
      title: {
        display: true,
        text: 'Pull Request Cycle Times',
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
        displayColors: false,
        callbacks: {
          label: (context) => `${context.parsed.y} days`
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
            family: 'Inter, sans-serif'
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
            family: 'Inter, sans-serif'
          }
        },
        title: {
          display: true,
          text: 'Days',
          color: '#6B7280',
          font: {
            size: 14,
            weight: '600',
            family: 'Inter, sans-serif'
          }
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
      <Bar data={chartData} options={options} />
    </div>
  )
}

export default PRCycleTimeChart

PRCycleTimeChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired
}