import { YouTubeConfigError } from './youtube'

export type SafeResult<T> =
  | { ok: true; data: T }
  | { ok: false; missingKey: boolean; message: string }

export async function safe<T>(promise: Promise<T>): Promise<SafeResult<T>> {
  try {
    return { ok: true, data: await promise }
  } catch (err) {
    const missingKey = err instanceof YouTubeConfigError
    if (!missingKey) console.error('[hamara-baheri] YouTube request failed:', err)
    return {
      ok: false,
      missingKey,
      message: err instanceof Error ? err.message : 'Unknown error',
    }
  }
}
