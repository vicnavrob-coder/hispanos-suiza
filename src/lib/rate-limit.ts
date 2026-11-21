/**
 * Simple rate limiting for API routes.
 * Uses in-memory storage with sliding window algorithm.
 * Works in serverless environments with reasonable accuracy.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

class RateLimiter {
  private requests: Map<string, RateLimitEntry> = new Map();

  /**
   * Check if a request should be rate limited.
   * @param identifier Unique identifier (usually IP address or user ID)
   * @param limit Maximum number of requests
   * @param windowMs Time window in milliseconds
   * @returns Object with { limited: boolean, remaining: number, resetAt: number }
   */
  check(
    identifier: string,
    limit: number,
    windowMs: number
  ): { limited: boolean; remaining: number; resetAt: number; retryAfter?: number } {
    const now = Date.now();
    const entry = this.requests.get(identifier);

    // No previous requests or window expired
    if (!entry || now > entry.resetAt) {
      const resetAt = now + windowMs;
      this.requests.set(identifier, { count: 1, resetAt });
      return { limited: false, remaining: limit - 1, resetAt };
    }

    // Within the window
    if (entry.count >= limit) {
      const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
      return {
        limited: true,
        remaining: 0,
        resetAt: entry.resetAt,
        retryAfter,
      };
    }

    // Increment count
    entry.count++;
    this.requests.set(identifier, entry);

    return {
      limited: false,
      remaining: limit - entry.count,
      resetAt: entry.resetAt,
    };
  }

  /**
   * Reset rate limit for a specific identifier.
   */
  reset(identifier: string): void {
    this.requests.delete(identifier);
  }

  /**
   * Clean up expired entries to prevent memory leaks.
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.requests.entries()) {
      if (now > entry.resetAt) {
        this.requests.delete(key);
      }
    }
  }

  /**
   * Get current status for an identifier without incrementing.
   */
  status(identifier: string, limit: number): { used: number; remaining: number; resetAt?: number } {
    const entry = this.requests.get(identifier);
    const now = Date.now();

    if (!entry || now > entry.resetAt) {
      return { used: 0, remaining: limit };
    }

    return {
      used: entry.count,
      remaining: Math.max(0, limit - entry.count),
      resetAt: entry.resetAt,
    };
  }
}

// Singleton instance
export const rateLimiter = new RateLimiter();

// Auto cleanup every 10 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => rateLimiter.cleanup(), 10 * 60 * 1000);
}

/**
 * Helper to extract client IP from Next.js request.
 */
export function getClientIp(headers: Headers): string {
  // Try various headers in order of preference
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  const cfConnectingIp = headers.get("cf-connecting-ip");
  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  // Fallback
  return "unknown";
}

/**
 * Preset rate limit configurations.
 */
export const RATE_LIMITS = {
  // Strict: for sensitive operations (login, register, password reset)
  STRICT: { limit: 5, windowMs: 15 * 60 * 1000 }, // 5 requests per 15 minutes

  // Standard: for general API endpoints
  STANDARD: { limit: 30, windowMs: 60 * 1000 }, // 30 requests per minute

  // Generous: for public read-only endpoints
  GENEROUS: { limit: 100, windowMs: 60 * 1000 }, // 100 requests per minute

  // Newsletter: for newsletter signups
  NEWSLETTER: { limit: 3, windowMs: 60 * 60 * 1000 }, // 3 requests per hour
} as const;
