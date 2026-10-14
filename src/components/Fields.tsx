import type { ReactNode } from 'react'

type CommonProps = { label: string; name: string; hint?: string; error?: string; required?: boolean; className?: string }

export function Field({ label, name, hint, error, required, className = '', ...props }: CommonProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`field ${className}`} htmlFor={name}>
      <span className="field__label">{label} {required ? <em>Required</em> : <small>Optional</small>}</span>
      <input id={name} name={name} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : hint ? `${name}-hint` : undefined} {...props} />
      {hint && !error && <span className="field__hint" id={`${name}-hint`}>{hint}</span>}
      {error && <span className="field__error" id={`${name}-error`} role="alert">{error}</span>}
    </label>
  )
}

export function Textarea({ label, name, hint, error, required, className = '', ...props }: CommonProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className={`field ${className}`} htmlFor={name}>
      <span className="field__label">{label} {required ? <em>Required</em> : <small>Optional</small>}</span>
      <textarea id={name} name={name} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : hint ? `${name}-hint` : undefined} {...props} />
      {hint && !error && <span className="field__hint" id={`${name}-hint`}>{hint}</span>}
      {error && <span className="field__error" id={`${name}-error`} role="alert">{error}</span>}
    </label>
  )
}

export function Select({ label, name, hint, error, required, children, className = '', ...props }: CommonProps & React.SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <label className={`field ${className}`} htmlFor={name}>
      <span className="field__label">{label} {required ? <em>Required</em> : <small>Optional</small>}</span>
      <select id={name} name={name} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : hint ? `${name}-hint` : undefined} {...props}>{children}</select>
      {hint && !error && <span className="field__hint" id={`${name}-hint`}>{hint}</span>}
      {error && <span className="field__error" id={`${name}-error`} role="alert">{error}</span>}
    </label>
  )
}

export function ChoiceGroup({ label, name, options, value = [], onChange, single = false, hint, required }: {
  label: string; name: string; options: string[]; value?: string[]; onChange: (next: string[]) => void; single?: boolean; hint?: string; required?: boolean
}) {
  const toggle = (option: string) => single ? onChange([option]) : onChange(value.includes(option) ? value.filter((item) => item !== option) : [...value, option])
  return (
    <fieldset className="choice-group">
      <legend className="field__label">{label} {required ? <em>Required</em> : <small>Optional</small>}</legend>
      {hint && <p className="field__hint">{hint}</p>}
      <div className="chips">
        {options.map((option) => (
          <label className={`chip ${value.includes(option) ? 'chip--selected' : ''}`} key={option}>
            <input type={single ? 'radio' : 'checkbox'} name={name} value={option} checked={value.includes(option)} onChange={() => toggle(option)} />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export function SectionHeading({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return <div className="section-heading">{eyebrow && <span>{eyebrow}</span>}<h2>{title}</h2>{children && <p>{children}</p>}</div>
}
