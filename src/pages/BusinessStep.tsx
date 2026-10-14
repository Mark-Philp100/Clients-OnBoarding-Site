import { Field, SectionHeading, Select, Textarea } from '../components/Fields'
import type { BusinessInfo } from '../types'

export function BusinessStep({ value, errors, onChange }: { value: BusinessInfo; errors: Record<string, string>; onChange: (next: BusinessInfo) => void }) {
  const set = (field: keyof BusinessInfo, next: string) => onChange({ ...value, [field]: next })
  return <>
    <SectionHeading eyebrow="Step 1 · About you" title="Let’s start with the essentials">Tell us who we’re working with and give us a little context about your business.</SectionHeading>
    <div className="form-card">
      <div className="form-section-title"><span>01</span><div><h3>Contact information</h3><p>We’ll use these details for onboarding communication only.</p></div></div>
      <div className="form-grid">
        <Field label="Your full name" name="fullName" required value={value.fullName} error={errors.fullName} onChange={(e) => set('fullName', e.target.value)} placeholder="e.g. Amina Nansubuga" autoComplete="name" />
        <Field label="Business or organization" name="businessName" required value={value.businessName} error={errors.businessName} onChange={(e) => set('businessName', e.target.value)} placeholder="e.g. Kawa Studio" autoComplete="organization" />
        <Field label="Email address" name="email" type="email" required value={value.email} error={errors.email} onChange={(e) => set('email', e.target.value)} placeholder="you@business.com" autoComplete="email" />
        <Field label="Phone number" name="phone" type="tel" required value={value.phone} error={errors.phone} onChange={(e) => set('phone', e.target.value)} hint="Uganda numbers can use the +256 country code." autoComplete="tel" />
        <Field label="Business location" name="location" required value={value.location} error={errors.location} onChange={(e) => set('location', e.target.value)} placeholder="City, country" autoComplete="address-level2" />
        <Select label="Preferred communication" name="communication" required value={value.communication} error={errors.communication} onChange={(e) => set('communication', e.target.value)}>
          <option value="">Choose a channel</option><option>Email</option><option>Phone call</option><option>WhatsApp</option><option>Video call</option>
        </Select>
      </div>
    </div>
    <div className="form-card">
      <div className="form-section-title"><span>02</span><div><h3>Business snapshot</h3><p>A concise overview helps us arrive prepared.</p></div></div>
      <div className="form-grid">
        <Field label="Industry or category" name="industry" required value={value.industry} error={errors.industry} onChange={(e) => set('industry', e.target.value)} placeholder="e.g. Hospitality, retail, non-profit" />
        <Field label="Website URL" name="website" type="url" value={value.website} error={errors.website} onChange={(e) => set('website', e.target.value)} placeholder="https://" />
        <Textarea className="field--full" label="What does your business do?" name="description" required value={value.description} error={errors.description} onChange={(e) => set('description', e.target.value)} placeholder="Describe your products, services and what makes the business distinct." />
        <Textarea label="Who is your target audience?" name="targetAudience" required value={value.targetAudience} error={errors.targetAudience} onChange={(e) => set('targetAudience', e.target.value)} placeholder="Customer segments, locations, needs…" />
        <Textarea label="What are your main goals?" name="goals" required value={value.goals} error={errors.goals} onChange={(e) => set('goals', e.target.value)} placeholder="The outcomes you want to achieve…" />
      </div>
    </div>
  </>
}
