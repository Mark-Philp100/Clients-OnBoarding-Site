import { useEffect, useMemo, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'
import { WizardLayout, StepActions } from './components/WizardLayout'
import { emptyData, serviceName } from './data'
import { BusinessStep } from './pages/BusinessStep'
import { InternalPreview } from './pages/InternalPreview'
import { ReviewStep } from './pages/ReviewStep'
import { ServiceStep } from './pages/ServiceStep'
import { ServicesStep } from './pages/ServicesStep'
import { SuccessPage } from './pages/SuccessPage'
import { WelcomePage } from './pages/WelcomePage'
import { readLocal, readSession, removeLocal, removeSession, STORAGE_KEY, STORAGE_STEP_KEY, SUBMISSION_KEY, writeLocal, writeSession } from './storage'
import type { BusinessInfo, OnboardingData, ServiceId, Step, StepId } from './types'

function readDraft(): OnboardingData {
  try {
    const saved = readLocal(STORAGE_KEY)
    if (!saved) return structuredClone(emptyData)
    const parsed = JSON.parse(saved) as Partial<OnboardingData>
    return {
      ...structuredClone(emptyData),
      ...parsed,
      business: { ...emptyData.business, ...parsed.business },
      answers: {
        social: { ...emptyData.answers.social, ...parsed.answers?.social },
        content: { ...emptyData.answers.content, ...parsed.answers?.content },
        website: { ...emptyData.answers.website, ...parsed.answers?.website },
        software: { ...emptyData.answers.software, ...parsed.answers?.software }
      },
      services: Array.isArray(parsed.services) ? parsed.services.filter((id): id is ServiceId => ['social', 'content', 'website', 'software'].includes(id)) : []
    }
  }
  catch { return structuredClone(emptyData) }
}

function readSavedStep(): StepId {
  const saved = readLocal(STORAGE_STEP_KEY)
  return ['business', 'services', 'social', 'content', 'website', 'software', 'review'].includes(saved ?? '') ? saved as StepId : 'business'
}

const getStepIndex = (steps: Step[], id: StepId) => Math.max(0, steps.findIndex((step) => step.id === id))

const requiredByService: Record<ServiceId, string[]> = {
  social: ['platforms', 'challenges', 'socialGoals', 'audience'],
  content: ['engagement', 'formats', 'quantity', 'objectives'],
  website: ['websiteType', 'project', 'purpose', 'pages'],
  software: ['softwareType', 'problem', 'users', 'features']
}

function validateBusiness(value: BusinessInfo) {
  const errors: Record<string, string> = {}
  const required: (keyof BusinessInfo)[] = ['fullName', 'businessName', 'email', 'phone', 'location', 'industry', 'description', 'targetAudience', 'goals', 'communication']
  required.forEach((field) => { if (!value[field].trim()) errors[field] = 'Please complete this field.' })
  if (value.email && !/^\S+@\S+\.\S+$/.test(value.email)) errors.email = 'Enter a valid email address.'
  if (value.phone && value.phone.replace(/\D/g, '').length < 9) errors.phone = 'Enter a valid phone number.'
  if (value.website && !/^https?:\/\//i.test(value.website)) errors.website = 'Include https:// at the start.'
  return errors
}

function isMissing(value: unknown) { return value === undefined || value === '' || (Array.isArray(value) && value.length === 0) }

function Wizard({ data, setData, onSubmit }: { data: OnboardingData; setData: React.Dispatch<React.SetStateAction<OnboardingData>>; onSubmit: () => void }) {
  const navigate = useNavigate(); const location = useLocation()
  const steps = useMemo<Step[]>(() => [
    { id: 'business', label: 'Business details', eyebrow: 'The essentials' },
    { id: 'services', label: 'Select services', eyebrow: 'Choose your path' },
    ...data.services.map((id) => ({ id, label: serviceName(id), eyebrow: 'Project requirements' })),
    { id: 'review', label: 'Review & confirm', eyebrow: 'Final check' }
  ], [data.services])
  const [currentId, setCurrentId] = useState<StepId>(() => (location.state as { review?: boolean } | null)?.review ? 'review' : readSavedStep())
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saved, setSaved] = useState(true); const [restartOpen, setRestartOpen] = useState(false)
  const safeCurrentId = steps.some((step) => step.id === currentId) ? currentId : 'services'
  const current = getStepIndex(steps, safeCurrentId)

  useEffect(() => {
    const timer = window.setTimeout(() => { writeLocal(STORAGE_KEY, JSON.stringify({ ...data, updatedAt: new Date().toISOString() })); setSaved(true) }, 350)
    return () => window.clearTimeout(timer)
  }, [data])

  useEffect(() => { writeLocal(STORAGE_STEP_KEY, safeCurrentId) }, [safeCurrentId])

  const updateData = (updater: React.SetStateAction<OnboardingData>) => { setSaved(false); setData(updater) }

  const next = () => {
    const active = steps[current]
    if (active.id === 'business') { const nextErrors = validateBusiness(data.business); setErrors(nextErrors); if (Object.keys(nextErrors).length) { window.scrollTo({ top: 0, behavior: 'smooth' }); return } }
    if (active.id === 'services' && data.services.length === 0) { setErrors({ services: 'Select at least one service to continue.' }); return }
    if (['social', 'content', 'website', 'software'].includes(active.id)) {
      const id = active.id as ServiceId; const missing = requiredByService[id].filter((key) => isMissing(data.answers[id][key]))
      if (missing.length) { setErrors({ [id]: `Please complete the required fields before continuing (${missing.length} remaining).` }); window.scrollTo({ top: 0, behavior: 'smooth' }); return }
    }
    if (active.id === 'review') { if (!data.confirmed) { setErrors({ review: 'Confirm that the information is accurate before completing.' }); return }; onSubmit(); navigate('/success'); return }
    setErrors({}); setCurrentId(steps[current + 1].id); window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const back = () => { if (current === 0) navigate('/'); else { setErrors({}); setCurrentId(steps[current - 1].id); window.scrollTo({ top: 0, behavior: 'smooth' }) } }
  const restart = () => { setData(structuredClone(emptyData)); removeLocal(STORAGE_KEY); removeLocal(STORAGE_STEP_KEY); removeSession(SUBMISSION_KEY); setCurrentId('business'); setErrors({}); setRestartOpen(false) }
  const active = steps[current]
  return <WizardLayout steps={steps} current={current} saved={saved} onRestart={() => setRestartOpen(true)}>
    {active.id === 'business' && <BusinessStep value={data.business} errors={errors} onChange={(business) => updateData((old) => ({ ...old, business }))}/>} 
    {active.id === 'services' && <ServicesStep value={data.services} error={errors.services} onChange={(services) => updateData((old) => ({ ...old, services, confirmed: false }))}/>} 
    {['social', 'content', 'website', 'software'].includes(active.id) && <ServiceStep service={active.id as ServiceId} value={data.answers[active.id as ServiceId]} error={errors[active.id]} onChange={(value) => updateData((old) => ({ ...old, answers: { ...old.answers, [active.id]: value }, confirmed: false }))}/>} 
    {active.id === 'review' && <ReviewStep data={data} onEdit={(id) => { setCurrentId(id); window.scrollTo({ top: 0, behavior: 'smooth' }) }} onConfirm={(confirmed) => { updateData((old) => ({ ...old, confirmed })); setErrors({}) }}/>} 
    {errors.review && <div className="inline-error" role="alert">{errors.review}</div>}
    <StepActions onBack={back} onNext={next} nextLabel={active.id === 'review' ? 'Complete demo onboarding' : 'Save & continue'} />
    {restartOpen && <div className="modal-backdrop" role="presentation" onMouseDown={() => setRestartOpen(false)}><div className="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="restart-title" onMouseDown={(e) => e.stopPropagation()}><span><AlertTriangle size={23}/></span><h2 id="restart-title">Restart onboarding?</h2><p>This will clear all locally saved answers and file references. This action can’t be undone.</p><div><button className="btn btn--ghost" onClick={() => setRestartOpen(false)}>Keep my progress</button><button className="btn btn--danger" onClick={restart}>Clear and restart</button></div></div></div>}
  </WizardLayout>
}

export default function App() {
  const [data, setData] = useState<OnboardingData>(readDraft)
  const [submission, setSubmission] = useState<OnboardingData | null>(() => { try { const saved = readSession(SUBMISSION_KEY); return saved ? JSON.parse(saved) : null } catch { return null } })
  const [reference, setReference] = useState(() => `STK-DEMO-${String(Math.floor(1000 + Math.random() * 9000))}`)
  const submit = () => { const completed = { ...data, updatedAt: new Date().toISOString() }; setData(completed); setSubmission(completed); writeLocal(STORAGE_KEY, JSON.stringify(completed)); writeLocal(STORAGE_STEP_KEY, 'review'); writeSession(SUBMISSION_KEY, JSON.stringify(completed)); setReference(`STK-DEMO-${String(Math.floor(1000 + Math.random() * 9000))}`) }
  return <Routes><Route path="/" element={<WelcomePage/>}/><Route path="/onboarding" element={<Wizard data={data} setData={setData} onSubmit={submit}/>}/><Route path="/success" element={<SuccessPage data={submission} reference={reference}/>}/><Route path="/internal-preview" element={<InternalPreview/>}/><Route path="*" element={<WelcomePage/>}/></Routes>
}
