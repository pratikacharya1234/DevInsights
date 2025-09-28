import { getRepoCommits, getRepoPRs, getRepoContributors, getRepoLanguages } from '../lib/githubApi.js'

export const computeCommitFrequency = (commits) => {
  const frequency = {}
  commits.forEach(commit => {
    const date = new Date(commit.commit.author.date).toISOString().split('T')[0]
    frequency[date] = (frequency[date] || 0) + 1
  })
  return Object.entries(frequency).map(([date, count]) => ({ date, count }))
}

export const computePRCycleTimes = (prs) => {
  return prs
    .filter(pr => pr.merged_at || pr.closed_at)
    .map(pr => {
      const created = new Date(pr.created_at)
      const closed = new Date(pr.merged_at || pr.closed_at)
      return (closed - created) / (1000 * 60 * 60 * 24) // days
    })
}

export const computeLanguageTrends = (languages) => {
  const total = Object.values(languages).reduce((sum, val) => sum + val, 0)
  return Object.entries(languages).map(([lang, bytes]) => ({
    language: lang,
    percentage: (bytes / total) * 100
  }))
}

export const computeAchievements = (commits, prs, contributors, languages) => {
  const achievements = [
    {
      id: 'first-commit',
      name: 'First Steps',
      description: 'Made your first commit',
      unlocked: commits.length > 0,
      icon: '🚀'
    },
    {
      id: 'ten-commits',
      name: 'Getting Started',
      description: 'Made 10 commits',
      unlocked: commits.length >= 10,
      icon: '📝'
    },
    {
      id: 'hundred-commits',
      name: 'Dedicated Developer',
      description: 'Made 100 commits',
      unlocked: commits.length >= 100,
      icon: '💻'
    },
    {
      id: 'first-pr',
      name: 'Collaborator',
      description: 'Created your first pull request',
      unlocked: prs.length > 0,
      icon: '🤝'
    },
    {
      id: 'ten-prs',
      name: 'Team Player',
      description: 'Created 10 pull requests',
      unlocked: prs.length >= 10,
      icon: '👥'
    },
    {
      id: 'polyglot',
      name: 'Polyglot Programmer',
      description: 'Used 3 or more programming languages',
      unlocked: Object.keys(languages).length >= 3,
      icon: '🌍'
    },
    {
      id: 'popular-repo',
      name: 'Popular Repository',
      description: 'Repository has 10 or more contributors',
      unlocked: contributors >= 10,
      icon: '⭐'
    }
  ]

  return achievements
}

export const fetchInsights = async (owner, repo, token) => {
  try {
    const [commits, prs, contributors, languages] = await Promise.all([
      getRepoCommits(owner, repo, token),
      getRepoPRs(owner, repo, token),
      getRepoContributors(owner, repo, token),
      getRepoLanguages(owner, repo, token)
    ])

    return {
      commitFrequency: computeCommitFrequency(commits),
      prCycleTimes: computePRCycleTimes(prs),
      contributors: contributors.length,
      languageTrends: computeLanguageTrends(languages),
      achievements: computeAchievements(commits, prs, contributors.length, languages)
    }
  } catch (error) {
    console.error('Failed to fetch insights:', error)
    return null
  }
}