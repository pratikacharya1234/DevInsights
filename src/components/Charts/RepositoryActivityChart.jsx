import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import PropTypes from 'prop-types'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const RepositoryActivityChart = ({ data }) => {
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
        No repository data available
      </div>
    )
  }

  // Sort repositories by stars (descending) and take top 6
  const sortedRepos = data
    .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
    .slice(0, 6)

  const chartData = {
    labels: sortedRepos.map(repo => repo.name.length > 15 ? repo.name.substring(0, 15) + '...' : repo.name),
    datasets: [
      {
        label: 'Stars',
        data: sortedRepos.map(repo => repo.stargazers_count || 0),
        backgroundColor: 'rgba(102, 126, 234, 0.8)',
        borderColor: '#667eea',
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      },
      {
        label: 'Forks',
        data: sortedRepos.map(repo => repo.forks_count || 0),
        backgroundColor: 'rgba(108, 92, 231, 0.8)',
        borderColor: '#6c5ce7',
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      }
    ]
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
        text: 'Repository Popularity',
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
          title: (context) => {
            const repoName = sortedRepos[context[0].dataIndex].name
            return repoName
          },
          label: (context) => {
            return `${context.dataset.label}: ${context.parsed.y}`
          }
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
          },
          maxRotation: 45,
          minRotation: 45
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
      <Bar data={chartData} options={options} />
    </div>
  )
}

export default RepositoryActivityChart

RepositoryActivityChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
}