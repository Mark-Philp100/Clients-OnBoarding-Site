import { CircleHelp } from 'lucide-react'
import type { ReactNode } from 'react'
import { ChoiceGroup, Field, SectionHeading, Select, Textarea } from '../components/Fields'
import { FileUpload } from '../components/FileUpload'
import type { ServiceAnswers, ServiceId, UploadFile } from '../types'

const lists: Record<string, string[]> = {
  platforms: ['Instagram', 'Facebook', 'TikTok', 'LinkedIn', 'X', 'YouTube', 'Other'],
  socialGoals: ['Brand awareness', 'Audience growth', 'Engagement', 'Leads', 'Sales', 'Community building', 'Other'],
  contentTypes: ['Short-form videos', 'Photography', 'Graphics', 'Carousels', 'Stories', 'Educational posts', 'Promotional posts', 'Other'],
  tones: ['Professional', 'Friendly', 'Educational', 'Entertaining', 'Luxury', 'Bold', 'Other'],
  formats: ['Short-form video', 'Long-form video', 'Photography', 'Graphics', 'Written content', 'Email', 'Other'],
  websiteTypes: ['Business website', 'Portfolio', 'E-commerce', 'Booking platform', 'Landing page', 'Web application', 'Other'],
  pages: ['Home', 'About', 'Services', 'Products', 'Portfolio', 'Blog', 'Contact', 'FAQ', 'Other'],
  features: ['Contact forms', 'WhatsApp integration', 'Appointment booking', 'Online payments', 'User accounts', 'Product catalog', 'Search', 'Blog', 'Analytics', 'Other'],
  softwareTypes: ['Web application', 'Mobile application', 'SaaS platform', 'Internal business system', 'Automation', 'Dashboard', 'Other'],
  platforms2: ['Web', 'iOS', 'Android', 'Windows', 'macOS', 'Cross-platform', 'Not sure yet']
}

const titles = {
  social: ['Social media management', 'Help us understand your current presence, audience and the content rhythm you need.'],
  content: ['Content creation & marketing', 'Share the scope, creative direction and production details for your content.'],
  website: ['Website development', 'Define the experience, content and capabilities your new website should have.'],
  software: ['Software & custom solutions', 'Describe the problem, users and key workflows—technical details can come later.']
} satisfies Record<ServiceId, string[]>

export function ServiceStep({ service, value, error, onChange }: { service: ServiceId; value: ServiceAnswers; error?: string; onChange: (next: ServiceAnswers) => void }) {
  const set = (field: string, next: string | string[] | boolean | UploadFile[]) => onChange({ ...value, [field]: next })
  const str = (field: string) => String(value[field] ?? '')
  const arr = (field: string) => Array.isArray(value[field]) ? value[field] as string[] : []
  const files = (field: string) => Array.isArray(value[field]) ? value[field] as UploadFile[] : []
  const [title, description] = titles[service]

  return <>
    <SectionHeading eyebrow="Your project details" title={title}>{description}</SectionHeading>
    {error && <div className="inline-error" role="alert">{error}</div>}
    {service === 'social' && <>
      <Card number="01" title="Presence & goals" subtitle="Where you are today and where you want to go.">
        <ChoiceGroup label="Existing social platforms" name="platforms" options={lists.platforms} value={arr('platforms')} onChange={(v) => set('platforms', v)} required />
        <Textarea label="Account links and usernames" name="accounts" value={str('accounts')} onChange={(e) => set('accounts', e.target.value)} placeholder="One account per line is perfect." />
        <Textarea label="Current social media challenges" name="challenges" required value={str('challenges')} onChange={(e) => set('challenges', e.target.value)} placeholder="What isn't working as well as you'd like?" />
        <ChoiceGroup label="Do you have a social media manager?" name="manager" options={['Yes', 'No', 'Occasionally']} value={arr('manager')} onChange={(v) => set('manager', v)} single />
        <ChoiceGroup label="Primary goals" name="socialGoals" options={lists.socialGoals} value={arr('socialGoals')} onChange={(v) => set('socialGoals', v)} required />
        <Textarea label="Target audience & geographic market" name="audience" required value={str('audience')} onChange={(e) => set('audience', e.target.value)} placeholder="Who should we reach, and where?" />
        <Textarea label="Competitors or brands you admire" name="references" value={str('references')} onChange={(e) => set('references', e.target.value)} />
      </Card>
      <Card number="02" title="Content strategy" subtitle="Your ideal output, tone and guardrails.">
        <ChoiceGroup label="Preferred content types" name="contentTypes" options={lists.contentTypes} value={arr('contentTypes')} onChange={(v) => set('contentTypes', v)} />
        <Select label="Preferred posting frequency" name="frequency" value={str('frequency')} onChange={(e) => set('frequency', e.target.value)}><option value="">Choose frequency</option><option>2–3 times per week</option><option>4–5 times per week</option><option>Daily</option><option>Campaign-based</option><option>Not sure yet</option></Select>
        <ChoiceGroup label="Desired brand tone" name="tone" options={lists.tones} value={arr('tone')} onChange={(v) => set('tone', v)} />
        <Textarea label="Upcoming campaigns, events or promotions" name="campaigns" value={str('campaigns')} onChange={(e) => set('campaigns', e.target.value)} />
        <Textarea label="Content or topics to avoid" name="avoid" value={str('avoid')} onChange={(e) => set('avoid', e.target.value)} />
      </Card>
      <Card number="03" title="Brand assets & access" subtitle="Reference material helps us stay true to your brand.">
        <Field label="Brand colours" name="colors" value={str('colors')} onChange={(e) => set('colors', e.target.value)} placeholder="Names or hex codes" />
        <FileUpload label="Logo, brand guidelines and sample content" value={files('files')} onChange={(v) => set('files', v)} />
        <ChoiceGroup label="Can you provide platform-approved account access?" name="access" options={['Yes', 'I need guidance', 'Not yet']} value={arr('access')} onChange={(v) => set('access', v)} single hint="Never enter passwords here. We’ll guide you through secure role-based access." />
        <Textarea label="Additional instructions" name="notes" value={str('notes')} onChange={(e) => set('notes', e.target.value)} />
      </Card>
    </>}
    {service === 'content' && <>
      <Card number="01" title="Creative scope" subtitle="Tell us what needs to be made.">
        <ChoiceGroup label="Engagement type" name="engagement" options={['Ongoing content', 'One-time campaign']} value={arr('engagement')} onChange={(v) => set('engagement', v)} single required />
        <ChoiceGroup label="Required content formats" name="formats" options={lists.formats} value={arr('formats')} onChange={(v) => set('formats', v)} required />
        <Textarea label="Photography requirements" name="photo" value={str('photo')} onChange={(e) => set('photo', e.target.value)} />
        <Textarea label="Videography requirements" name="video" value={str('video')} onChange={(e) => set('video', e.target.value)} />
        <Field label="Requested quantities" name="quantity" required value={str('quantity')} onChange={(e) => set('quantity', e.target.value)} placeholder="e.g. 8 videos, 20 photos, 12 graphics" />
      </Card>
      <Card number="02" title="Production details" subtitle="Location, people, timing and facilities.">
        <ChoiceGroup label="Production setting" name="setting" options={["Client's premises", 'Another location', 'Remote / supplied assets', 'To be decided']} value={arr('setting')} onChange={(v) => set('setting', v)} single />
        <Field label="Preferred production location" name="location" value={str('location')} onChange={(e) => set('location', e.target.value)} />
        <Textarea label="Available equipment or facilities" name="equipment" value={str('equipment')} onChange={(e) => set('equipment', e.target.value)} />
        <Textarea label="Talent, presenters or staff involved" name="talent" value={str('talent')} onChange={(e) => set('talent', e.target.value)} />
        <Field label="Important production dates" name="dates" value={str('dates')} onChange={(e) => set('dates', e.target.value)} placeholder="Dates or a preferred timeframe" />
      </Card>
      <Card number="03" title="Campaign direction" subtitle="The purpose and creative references behind the work.">
        <Textarea label="Campaign objectives" name="objectives" required value={str('objectives')} onChange={(e) => set('objectives', e.target.value)} />
        <Textarea label="Creative reference links" name="references" value={str('references')} onChange={(e) => set('references', e.target.value)} />
        <FileUpload label="Brand guidelines and creative references" value={files('files')} onChange={(v) => set('files', v)} />
        <Textarea label="Additional production notes" name="notes" value={str('notes')} onChange={(e) => set('notes', e.target.value)} />
      </Card>
    </>}
    {service === 'website' && <>
      <Card number="01" title="Project overview" subtitle="The audience and purpose behind the experience.">
        <ChoiceGroup label="Website type" name="websiteType" options={lists.websiteTypes} value={arr('websiteType')} onChange={(v) => set('websiteType', v)} single required />
        <Textarea label="Project description" name="project" required value={str('project')} onChange={(e) => set('project', e.target.value)} />
        <Textarea label="Primary purpose and target audience" name="purpose" required value={str('purpose')} onChange={(e) => set('purpose', e.target.value)} />
        <Textarea label="Websites you like" name="references" value={str('references')} onChange={(e) => set('references', e.target.value)} placeholder="Links and what you like about them" />
        <Field label="Existing website URL" name="existingUrl" type="url" value={str('existingUrl')} onChange={(e) => set('existingUrl', e.target.value)} placeholder="https://" />
      </Card>
      <Card number="02" title="Pages & capabilities" subtitle="Map out what visitors need to see and do.">
        <ChoiceGroup label="Required pages" name="pages" options={lists.pages} value={arr('pages')} onChange={(v) => set('pages', v)} required />
        <ChoiceGroup label="Required features" name="features" options={lists.features} value={arr('features')} onChange={(v) => set('features', v)} />
        <Field label="Preferred languages" name="languages" value={str('languages')} onChange={(e) => set('languages', e.target.value)} placeholder="e.g. English, Luganda" />
        <ChoiceGroup label="Mobile responsiveness" name="responsive" options={['Required', 'Not sure']} value={arr('responsive')} onChange={(v) => set('responsive', v)} single />
        <Textarea label="SEO requirements and third-party integrations" name="integrations" value={str('integrations')} onChange={(e) => set('integrations', e.target.value)} />
      </Card>
      <Card number="03" title="Branding, content & infrastructure" subtitle="What is ready now, and where you need help.">
        <FileUpload label="Logo and brand assets" value={files('files')} onChange={(v) => set('files', v)} />
        <Field label="Brand colours and typography" name="brand" value={str('brand')} onChange={(e) => set('brand', e.target.value)} />
        <ChoiceGroup label="Content readiness" name="contentReady" options={['Copy is ready', 'Photos/graphics are ready', 'Need copywriting help', 'Need photography help']} value={arr('contentReady')} onChange={(v) => set('contentReady', v)} />
        <ChoiceGroup label="Do you own a domain?" name="domainOwned" options={['Yes', 'No', 'Not sure']} value={arr('domainOwned')} onChange={(v) => set('domainOwned', v)} single />
        <Field label="Domain name" name="domain" value={str('domain')} onChange={(e) => set('domain', e.target.value)} />
        <ChoiceGroup label="Hosting status" name="hosting" options={['Already available', 'Need stackEnd assistance', 'Not sure']} value={arr('hosting')} onChange={(v) => set('hosting', v)} single />
        <Field label="Existing hosting provider" name="provider" value={str('provider')} onChange={(e) => set('provider', e.target.value)} hint="Provider name only—never share passwords or secrets here." />
        <Field label="Preferred launch date" name="launch" type="date" value={str('launch')} onChange={(e) => set('launch', e.target.value)} />
        <Textarea label="Additional requirements or special instructions" name="notes" value={str('notes')} onChange={(e) => set('notes', e.target.value)} />
      </Card>
    </>}
    {service === 'software' && <>
      <div className="discovery-note"><CircleHelp size={20}/><p><strong>You don’t need all the technical answers.</strong> Architecture, technology choices and implementation details will be established with stackEnd during project discovery.</p></div>
      <Card number="01" title="Problem & product" subtitle="Start with the business need and the people affected.">
        <ChoiceGroup label="Type of software" name="softwareType" options={lists.softwareTypes} value={arr('softwareType')} onChange={(v) => set('softwareType', v)} single required />
        <Textarea label="Business problem to solve" name="problem" required value={str('problem')} onChange={(e) => set('problem', e.target.value)} />
        <Textarea label="Intended users" name="users" required value={str('users')} onChange={(e) => set('users', e.target.value)} />
        <Textarea label="Main features and workflows" name="features" required value={str('features')} onChange={(e) => set('features', e.target.value)} />
        <Textarea label="Existing process or software being replaced" name="replaced" value={str('replaced')} onChange={(e) => set('replaced', e.target.value)} />
      </Card>
      <Card number="02" title="Operations & expectations" subtitle="Connections, access, reporting and delivery context.">
        <Textarea label="Systems that may need integration" name="integrations" value={str('integrations')} onChange={(e) => set('integrations', e.target.value)} hint="Names only—do not include API keys or credentials." />
        <Textarea label="Reporting and analytics requirements" name="reporting" value={str('reporting')} onChange={(e) => set('reporting', e.target.value)} />
        <Textarea label="User roles and permissions" name="roles" value={str('roles')} onChange={(e) => set('roles', e.target.value)} />
        <Textarea label="Reference products or competitor links" name="references" value={str('references')} onChange={(e) => set('references', e.target.value)} />
        <ChoiceGroup label="Preferred platforms" name="platforms" options={lists.platforms2} value={arr('platforms')} onChange={(v) => set('platforms', v)} />
        <Field label="Expected project timeline" name="timeline" value={str('timeline')} onChange={(e) => set('timeline', e.target.value)} placeholder="Preferred launch window or milestone" />
        <Textarea label="Additional requirements" name="notes" value={str('notes')} onChange={(e) => set('notes', e.target.value)} />
      </Card>
    </>}
  </>
}

function Card({ number, title, subtitle, children }: { number: string; title: string; subtitle: string; children: ReactNode }) {
  return <div className="form-card"><div className="form-section-title"><span>{number}</span><div><h3>{title}</h3><p>{subtitle}</p></div></div><div className="form-grid">{children}</div></div>
}
