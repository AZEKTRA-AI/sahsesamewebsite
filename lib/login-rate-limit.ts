/**
 * Best-effort in-memory brute-force throttle for admin login.
 *
 * This is per-serverless-instance, not shared across regions/instances like a
 * Redis-backed limiter would be — Vercel functions are ephemeral and can run
 * on multiple instances. It still meaningfully raises the cost of a
 * password-guessing script against a single warm instance, which is the gap
 * that mattered here: there was no throttle at all before this.
 */
const WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 5

const attempts = new Map<string, { count: number; firstAttemptAt: number }>()

function keyFor(email: string) {
  return email.trim().toLowerCase()
}

export function isLockedOut(email: string): boolean {
  const entry = attempts.get(keyFor(email))
  if (!entry) return false
  if (Date.now() - entry.firstAttemptAt > WINDOW_MS) {
    attempts.delete(keyFor(email))
    return false
  }
  return entry.count >= MAX_ATTEMPTS
}

export function recordFailedAttempt(email: string): void {
  const key = keyFor(email)
  const entry = attempts.get(key)
  const now = Date.now()
  if (!entry || now - entry.firstAttemptAt > WINDOW_MS) {
    attempts.set(key, { count: 1, firstAttemptAt: now })
    return
  }
  entry.count += 1
}

export function clearAttempts(email: string): void {
  attempts.delete(keyFor(email))
}
