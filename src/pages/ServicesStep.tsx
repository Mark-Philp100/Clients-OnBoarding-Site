import { Check } from 'lucide-react'
import { SectionHeading } from '../components/Fields'
import { services } from '../data'
import type { ServiceId } from '../types'

export function ServicesStep({ value, onChange, error }: { value: ServiceId[]; onChange: (next: ServiceId[]) => void; error?: string }) {
  const toggle = (id: ServiceId) => onChange(value.includes(id) ? value.filter((item) => item !== id) : [...value, id])
  return <>
    <SectionHeading eyebrow="Step 2 · Services" title="What can we help you with?">Select every service included in your engagement. We’ll tailor the next steps to your choices.</SectionHeading>
    <div className="service-grid">
      {services.map(({ id, name, description, icon: Icon }, index) => {
        const selected = value.includes(id)
        return <button type="button" key={id} className={`service-card ${selected ? 'service-card--selected' : ''}`} onClick={() => toggle(id)} aria-pressed={selected}>
          <span className="service-card__index">0{index + 1}</span><span className="service-card__icon"><Icon size={25} /></span>
          <h3>{name}</h3><p>{description}</p><span className="service-card__select">{selected ? <><Check size={15}/> Selected</> : 'Select service'}</span>
        </button>
      })}
    </div>
    {error && <div className="inline-error" role="alert">{error}</div>}
    <div className="info-strip"><strong>Choose more than one</strong><span>Your onboarding path will update automatically. Any answers you’ve already entered will be kept.</span></div>
  </>
}
