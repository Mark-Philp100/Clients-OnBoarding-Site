import { ArrowLeft, Check, Eye, Printer } from 'lucide-react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Brand } from '../components/Brand'
import { serviceName } from '../data'
import type { OnboardingData } from '../types'

export function SuccessPage({ data, reference }: { data: OnboardingData | null; reference: string }) {
  const navigate = useNavigate()
  if (!data) return <Navigate to="/" replace />
  return <div className="success-page"><header><Brand/></header><main className="success-card">
    <div className="success-icon"><Check size={34}/></div><span className="eyebrow">Demonstration complete</span><h1>Your onboarding is complete.</h1><p>Thanks, {data.business.fullName.split(' ')[0]}. Your brief is ready to demonstrate, but has not been sent to stackEnd or stored in a database.</p>
    <div className="reference-card"><span>Mock reference</span><strong>{reference}</strong><small>Keep this only for your prototype walkthrough.</small></div>
    <div className="success-summary"><h2>Selected services</h2>{data.services.map((id) => <div key={id}><Check size={15}/>{serviceName(id)}</div>)}</div>
    <div className="next-steps"><span>What would happen next</span><p>With a connected backend, stackEnd would review your brief, confirm any open questions and arrange the project discovery session.</p></div>
    <div className="success-actions"><button className="btn btn--outline" type="button" onClick={() => window.print()}><Printer size={17}/> Print summary</button><button className="btn btn--primary" type="button" onClick={() => navigate('/onboarding', { state: { review: true } })}><Eye size={17}/> View summary</button></div>
    <Link className="back-home" to="/"><ArrowLeft size={16}/> Return to welcome page</Link>
  </main></div>
}
