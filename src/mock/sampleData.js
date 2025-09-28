export const sampleData = {
  user: {
    id: 'sample-user-id',
    email: 'user@example.com',
    name: 'Sample User'
  },
  githubProfile: {
    login: 'octocat',
    name: 'The Octocat',
    avatar_url: 'https://github.com/images/error/octocat_happy.gif',
    bio: 'A demo GitHub profile for testing purposes',
    public_repos: 8,
    followers: 3938,
    following: 9,
    html_url: 'https://github.com/octocat'
  },
  repos: [
    {
      owner: 'octocat',
      repo: 'Hello-World',
      commits: Array.from({ length: 100 }, (_, i) => ({
        sha: `commit${i}`,
        commit: {
          author: {
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString()
          }
        }
      })),
      prs: Array.from({ length: 20 }, (_, i) => ({
        number: i + 1,
        created_at: new Date(Date.now() - i * 2 * 24 * 60 * 60 * 1000).toISOString(),
        merged_at: Math.random() > 0.5 ? new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString() : null,
        closed_at: Math.random() > 0.5 ? new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString() : null
      })),
      contributors: Array.from({ length: 5 }, (_, i) => ({ login: `contributor${i}` })),
      languages: { JavaScript: 50000, HTML: 20000, CSS: 10000 }
    },
    {
      owner: 'octocat',
      repo: 'Spoon-Knife',
      commits: Array.from({ length: 100 }, (_, i) => ({
        sha: `commit${i + 100}`,
        commit: {
          author: {
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString()
          }
        }
      })),
      prs: Array.from({ length: 20 }, (_, i) => ({
        number: i + 21,
        created_at: new Date(Date.now() - i * 2 * 24 * 60 * 60 * 1000).toISOString(),
        merged_at: Math.random() > 0.5 ? new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString() : null,
        closed_at: Math.random() > 0.5 ? new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString() : null
      })),
      contributors: Array.from({ length: 3 }, (_, i) => ({ login: `user${i}` })),
      languages: { Python: 60000, JavaScript: 30000 }
    }
  ],
  insights: {
    commitFrequency: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      count: Math.floor(Math.random() * 10) + 1
    })),
    prCycleTimes: Array.from({ length: 20 }, () => Math.random() * 14 + 1),
    contributors: 5,
    languageTrends: [
      { language: 'JavaScript', percentage: 50 },
      { language: 'Python', percentage: 30 },
      { language: 'HTML', percentage: 20 }
    ]
  },
  achievements: [
    { id: '1', name: 'First Commit', description: 'Made your first commit', unlocked: true },
    { id: '2', name: 'PR Master', description: 'Merged 10 PRs', unlocked: false }
  ]
}