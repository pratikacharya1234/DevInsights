const GITHUB_API_BASE = 'https://api.github.com'

export const fetchGitHubData = async (endpoint, token = null) => {
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
  }
  if (token) {
    headers['Authorization'] = `token ${token}`
  }

  let response = await fetch(`${GITHUB_API_BASE}${endpoint}`, { headers })
  if (response.status === 403 && response.headers.get('x-ratelimit-remaining') === '0') {
    const resetTime = response.headers.get('x-ratelimit-reset')
    const waitTime = (resetTime * 1000) - Date.now()
    await new Promise(resolve => setTimeout(resolve, Math.min(waitTime, 60000)))
    response = await fetch(`${GITHUB_API_BASE}${endpoint}`, { headers })
  }

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`)
  }

  return response.json()
}

export const getRepoCommits = (owner, repo, token) => fetchGitHubData(`/repos/${owner}/${repo}/commits`, token)
export const getRepoPRs = (owner, repo, token) => fetchGitHubData(`/repos/${owner}/${repo}/pulls?state=all`, token)
export const getRepoContributors = (owner, repo, token) => fetchGitHubData(`/repos/${owner}/${repo}/contributors`, token)
export const getRepoLanguages = (owner, repo, token) => fetchGitHubData(`/repos/${owner}/${repo}/languages`, token)
export const getUserProfile = (username, token) => fetchGitHubData(`/users/${username}`, token)
export const getUserRepos = (username, token) => fetchGitHubData(`/users/${username}/repos?sort=updated&per_page=10`, token)