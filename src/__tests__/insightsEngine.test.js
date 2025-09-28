import { computeCommitFrequency } from '../services/insightsEngine.js'
import { sampleData } from '../mock/sampleData.js'

describe('computeCommitFrequency', () => {
  test('computes frequency correctly', () => {
    const commits = sampleData.repos[0].commits.slice(0, 10)
    const result = computeCommitFrequency(commits)
    expect(result).toBeInstanceOf(Array)
    expect(result.length).toBeGreaterThan(0)
    expect(result[0]).toHaveProperty('date')
    expect(result[0]).toHaveProperty('count')
  })
})