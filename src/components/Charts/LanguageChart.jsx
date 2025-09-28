import PropTypes from 'prop-types'
import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, Filler)

const LanguageChart = ({ data }) => {
  // Aggregate language data from repositories
  const languageStats = {}

  data.forEach(repo => {
    if (repo.language) {
      languageStats[repo.language] = (languageStats[repo.language] || 0) + 1
    }
  })

  const languages = Object.keys(languageStats)
  const counts = Object.values(languageStats)

  const chartData = {
    labels: languages,
    datasets: [{
      data: counts,
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40',
        '#FF6384',
        '#C9CBCF'
      ],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const total = context.dataset.data.reduce((a, b) => a + b, 0)
            const percentage = ((context.parsed / total) * 100).toFixed(1)
            return `${context.label}: ${context.parsed} repos (${percentage}%)`
          }
        }
      }
    }
  }

  if (languages.length === 0) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '200px',
        color: '#64748b',
        fontSize: '16px'
      }}>
        No language data available
      </div>
    )
  }

  return (
    <div style={{ height: '300px' }}>
      <Pie data={chartData} options={options} />
    </div>
  )
}

export { LanguageChart }

LanguageChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
}