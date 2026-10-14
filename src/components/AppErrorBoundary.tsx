import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'
import { clearOnboardingState } from '../storage'

type Props = { children: ReactNode }
type State = { failed: boolean }

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Onboarding portal render failed', error, info)
  }

  private reset = () => {
    clearOnboardingState()
    window.location.assign('/')
  }

  render() {
    if (!this.state.failed) return this.props.children

    return <main className="app-error" role="alert">
      <span><AlertTriangle size={28} /></span>
      <p className="eyebrow">Something interrupted the page</p>
      <h1>Let’s get your onboarding back.</h1>
      <p>The saved browser draft could not be opened. Reset the local draft to return to a clean onboarding form.</p>
      <button className="btn btn--primary" type="button" onClick={this.reset}><RotateCcw size={17} /> Reset local draft</button>
    </main>
  }
}
