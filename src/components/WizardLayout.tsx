import { Check, Clock3, LockKeyhole, RotateCcw } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Step } from '../types'
import { Brand } from './Brand'

export function WizardLayout({ steps, current, saved, onRestart, children }: { steps: Step[]; current: number; saved: boolean; onRestart: () => void; children: ReactNode }) {
  return (
    <div className="wizard-shell">
      <aside className="wizard-sidebar">
        <Brand inverse />
        <div className="wizard-sidebar__intro"><span>Client onboarding</span><h1>Tell us what you're building.</h1><p>Your answers help our team prepare a more focused discovery process.</p></div>
        <ol className="stepper">
          {steps.map((step, index) => <li key={step.id} className={index === current ? 'active' : index < current ? 'complete' : ''}>
            <span className="stepper__dot">{index < current ? <Check size={14} /> : index + 1}</span><div><strong>{step.label}</strong><small>{step.eyebrow}</small></div>
          </li>)}
        </ol>
        <div className="sidebar-foot"><LockKeyhole size={16} /><span>Local prototype<br/><small>No data is transmitted</small></span></div>
      </aside>
      <main className="wizard-main">
        <header className="mobile-wizard-header"><Brand /><span>{current + 1} / {steps.length}</span></header>
        <div className="mobile-progress"><i style={{ width: `${((current + 1) / steps.length) * 100}%` }} /></div>
        <div className="wizard-toolbar"><span><Clock3 size={15} /> {saved ? 'Progress saved locally' : 'Saving changes…'}</span><button type="button" onClick={onRestart}><RotateCcw size={15} /> Restart</button></div>
        <div className="wizard-content">{children}</div>
      </main>
    </div>
  )
}

export function StepActions({ onBack, onNext, nextLabel = 'Continue', hideBack = false, disabled = false }: { onBack: () => void; onNext: () => void; nextLabel?: string; hideBack?: boolean; disabled?: boolean }) {
  return <div className="step-actions"><button className="btn btn--ghost" type="button" onClick={onBack} style={{ visibility: hideBack ? 'hidden' : 'visible' }}>Back</button><button className="btn btn--primary" type="button" onClick={onNext} disabled={disabled}>{nextLabel}<span aria-hidden="true">→</span></button></div>
}

