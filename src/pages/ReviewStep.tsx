import { CheckCircle2, Edit3, ShieldCheck } from 'lucide-react'
import type { ReactNode } from 'react'
import { SectionHeading } from '../components/Fields'
import { serviceName } from '../data'
import type { OnboardingData, ServiceAnswers, StepId, UploadFile } from '../types'

const labels: Record<string, string> = {
  fullName: 'Full name', businessName: 'Business', email: 'Email', phone: 'Phone', location: 'Location', industry: 'Industry', website: 'Website', description: 'Business description', targetAudience: 'Target audience', goals: 'Business goals', communication: 'Preferred communication'
}

const prettify = (key: string) => labels[key] ?? key.replace(/([A-Z])/g, ' $1').replace(/^./, (letter) => letter.toUpperCase())
const display = (value: string | string[] | boolean | UploadFile[]) => {
  if (Array.isArray(value)) {
    if (!value.length) return ''
    if (typeof value[0] === 'object') return `${(value as UploadFile[]).length} file(s): ${(value as UploadFile[]).map((file) => file.name).join(', ')}`
    return (value as string[]).join(', ')
  }
  return typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value
}

function Details({ values }: { values: Record<string, string> | ServiceAnswers }) {
  const entries = Object.entries(values).filter(([, value]) => display(value as never))
  return <dl className="review-details">{entries.length ? entries.map(([key, value]) => <div key={key}><dt>{prettify(key)}</dt><dd>{display(value as never)}</dd></div>) : <div><dt>Details</dt><dd>No optional details supplied.</dd></div>}</dl>
}

export function ReviewStep({ data, onEdit, onConfirm }: { data: OnboardingData; onEdit: (id: StepId) => void; onConfirm: (confirmed: boolean) => void }) {
  return <>
    <SectionHeading eyebrow="Final step · Review" title="Check everything looks right">Review your answers before completing this demonstration onboarding.</SectionHeading>
    <div className="review-stack">
      <ReviewCard title="Client & business information" onEdit={() => onEdit('business')}><Details values={data.business} /></ReviewCard>
      <ReviewCard title="Selected services" onEdit={() => onEdit('services')}><div className="review-services">{data.services.map((id) => <span key={id}><CheckCircle2 size={15}/>{serviceName(id)}</span>)}</div></ReviewCard>
      {data.services.map((id) => <ReviewCard key={id} title={serviceName(id)} onEdit={() => onEdit(id)}><Details values={data.answers[id]} /></ReviewCard>)}
    </div>
    <div className="confirmation-box">
      <ShieldCheck size={24}/><label><input type="checkbox" checked={data.confirmed} onChange={(e) => onConfirm(e.target.checked)} /><span><strong>I confirm that this information is accurate.</strong><small>Your information remains in this browser for this frontend demonstration. Nothing is sent to stackEnd or stored in a database.</small></span></label>
    </div>
  </>
}

function ReviewCard({ title, onEdit, children }: { title: string; onEdit: () => void; children: ReactNode }) {
  return <section className="review-card"><header><h3>{title}</h3><button type="button" onClick={onEdit}><Edit3 size={15}/> Edit</button></header>{children}</section>
}
