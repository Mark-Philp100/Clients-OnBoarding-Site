import { ArrowRight, CheckCircle2, Clock3, LockKeyhole, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Brand } from '../components/Brand'

export function WelcomePage() {
  return <div className="welcome-page">
    <nav className="welcome-nav"><Brand/><div><span>Already started?</span><Link to="/onboarding" className="btn btn--small btn--outline">Resume onboarding</Link></div></nav>
    <main className="hero">
      <div className="hero__copy">
        <span className="eyebrow"><Sparkles size={14}/> A thoughtful start to our partnership</span>
        <h1>Let’s build something <em>great</em> together.</h1>
        <p>Share the context behind your business and project so our team can turn the first conversation into meaningful progress.</p>
        <div className="hero__actions"><Link to="/onboarding" className="btn btn--primary btn--large">Get started <ArrowRight size={18}/></Link><span><Clock3 size={17}/> Usually takes about 8–12 minutes</span></div>
        <div className="trust-line"><ShieldCheck size={18}/><p><strong>Designed with your privacy in mind.</strong> This prototype keeps your responses in your browser and does not transmit them.</p></div>
      </div>
      <div className="hero__visual" aria-label="Onboarding process preview">
        <div className="visual-glow"/><div className="floating-pill pill-one"><CheckCircle2 size={16}/> Progress saved</div>
        <div className="preview-card"><div className="preview-card__top"><span>Client onboarding</span><small>01 / 03</small></div><h2>A clear brief makes<br/>better work possible.</h2>
          <div className="mini-step active"><span>1</span><div><strong>Choose your services</strong><i/></div></div>
          <div className="mini-step"><span>2</span><div><strong>Share your context</strong><i/></div></div>
          <div className="mini-step"><span>3</span><div><strong>Review your brief</strong><i/></div></div>
          <div className="preview-card__button">Continue <ArrowRight size={16}/></div>
        </div><div className="floating-pill pill-two"><LockKeyhole size={16}/> Private by design</div>
      </div>
    </main>
    <section className="process-section"><div className="process-intro"><span>Simple by design</span><h2>Three steps. One strong foundation.</h2><p>No technical knowledge needed. Answer in your own words and we’ll handle the complexity later.</p></div><div className="process-grid">
      <article><span>01</span><h3>Choose your services</h3><p>Select everything included in your stackEnd engagement.</p></article>
      <article><span>02</span><h3>Tell us about your business</h3><p>Share your goals, audience, requirements and references.</p></article>
      <article><span>03</span><h3>Review your information</h3><p>Make changes, confirm the details and complete the demo.</p></article>
    </div></section>
    <footer className="welcome-footer"><Brand inverse/><p>Technology that moves your business forward.</p><div><a href="mailto:hello@stackend.example">hello@stackend.example</a><span>© 2026 stackEnd Technological Solutions</span><Link to="/internal-preview">Prototype preview</Link></div></footer>
    <a className="chat-fab" href="mailto:hello@stackend.example" aria-label="Contact stackEnd"><MessageCircle size={20}/></a>
  </div>
}
