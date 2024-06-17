/**
 * Simple in-memory cache to reduce API requests while still keeping data reasonably fresh
 */
export function createCache<K, V>({ maxAge }: { maxAge: number }) {
  const cache = new Map<
    K,
    { data: V; cachedAt: ReturnType<(typeof Date)['now']> }
  >()
  return {
    set(key: K, value: V) {
      cache.set(key, { data: value, cachedAt: Date.now() })
    },
    /**
     * Verify that the value both exists and that it's newer than `maxAge`
     */
    has(key: K) {
      const value = cache.get(key)
      if (value && Date.now() - value.cachedAt < maxAge) {
        return true
      }
      return false
    },
    get(key: K) {
      const value = cache.get(key)
      if (value && Date.now() - value.cachedAt < maxAge) {
        return value.data
      }
    },
  }
}
