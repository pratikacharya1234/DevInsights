import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import PropTypes from 'prop-types'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const CommitFrequencyChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '300px',
        color: '#6B7280',
        fontSize: '16px'
      }}>
        No commit data available
      </div>
    )
  }

  const chartData = {
    labels: data.map(d => d.date),
    datasets: [{
      label: 'Commits',
      data: data.map(d => d.count),
      borderColor: '#667eea',
      backgroundColor: 'rgba(102, 126, 234, 0.1)',
      borderWidth: 3,
      pointBackgroundColor: '#667eea',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7,
      tension: 0.4,
      fill: true
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
        text: 'Repository Activity',
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
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 }
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
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  }

  return (
    <div style={{ height: '300px' }}>
      <Line data={chartData} options={options} />
    </div>
  )
}

export default CommitFrequencyChart

CommitFrequencyChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired
    })
  ).isRequired
}