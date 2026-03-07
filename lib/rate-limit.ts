// Simple in-memory rate limiter for Vercel Hobby plan
// Note: This resets on each cold start, but provides basic protection

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < now) {
      delete store[key]
    }
  })
}, 5 * 60 * 1000)

export interface RateLimitOptions {
  interval: number // Time window in milliseconds
  maxRequests: number // Maximum requests per interval
}

export function rateLimit(options: RateLimitOptions) {
  const { interval, maxRequests } = options

  return {
    check: (identifier: string): { success: boolean; remaining: number; resetTime: number } => {
      const now = Date.now()
      const key = `${identifier}`

      // Initialize or reset if expired
      if (!store[key] || store[key].resetTime < now) {
        store[key] = {
          count: 0,
          resetTime: now + interval,
        }
      }

      // Increment count
      store[key].count += 1

      const remaining = Math.max(0, maxRequests - store[key].count)
      const success = store[key].count <= maxRequests

      return {
        success,
        remaining,
        resetTime: store[key].resetTime,
      }
    },
  }
}

// Rate limiters for different endpoints
export const checkoutLimiter = rateLimit({
  interval: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // 5 checkout attempts per 15 minutes
})

export const apiLimiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  maxRequests: 30, // 30 requests per minute
})
