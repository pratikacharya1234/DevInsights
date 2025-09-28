import { useState, useEffect } from 'react'
import { fetchInsights } from '../services/insightsEngine.js'

export const useFetchGitHub = (owner, repo, token) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!owner || !repo) return

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const insights = await fetchInsights(owner, repo, token)
        setData(insights)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [owner, repo, token])

  return { data, loading, error }
}