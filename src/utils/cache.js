export const cache = {
  get: (key) => {
    const item = localStorage.getItem(key)
    if (!item) return null
    const { value, expiry } = JSON.parse(item)
    if (Date.now() > expiry) {
      localStorage.removeItem(key)
      return null
    }
    return value
  },
  set: (key, value, ttl = 3600000) => { // 1 hour default
    const expiry = Date.now() + ttl
    localStorage.setItem(key, JSON.stringify({ value, expiry }))
  }
}