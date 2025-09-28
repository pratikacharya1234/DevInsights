import { render, screen } from '@testing-library/react'
import CommitFrequencyChart from '../components/Charts/CommitFrequencyChart.jsx'
import { sampleData } from '../mock/sampleData.js'

describe('CommitFrequencyChart', () => {
  test('renders chart with data', () => {
    render(<CommitFrequencyChart data={sampleData.insights.commitFrequency} />)
    expect(screen.getByText('Commit Frequency Over Time')).toBeInTheDocument()
  })
})