export const STORAGE_KEY = 'stackend-onboarding-draft-v1'
export const STORAGE_STEP_KEY = 'stackend-onboarding-step-v1'
export const SUBMISSION_KEY = 'stackend-onboarding-submission-v1'

export function readLocal(key: string) {
  try { return window.localStorage.getItem(key) } catch { return null }
}

export function writeLocal(key: string, value: string) {
  try { window.localStorage.setItem(key, value); return true } catch { return false }
}

export function removeLocal(key: string) {
  try { window.localStorage.removeItem(key) } catch { /* Storage may be unavailable. */ }
}

export function readSession(key: string) {
  try { return window.sessionStorage.getItem(key) } catch { return null }
}

export function writeSession(key: string, value: string) {
  try { window.sessionStorage.setItem(key, value) } catch { /* Storage may be unavailable. */ }
}

export function removeSession(key: string) {
  try { window.sessionStorage.removeItem(key) } catch { /* Storage may be unavailable. */ }
}

export function clearOnboardingState() {
  removeLocal(STORAGE_KEY)
  removeLocal(STORAGE_STEP_KEY)
  removeSession(SUBMISSION_KEY)
}
