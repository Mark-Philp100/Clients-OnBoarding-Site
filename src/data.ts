import { BarChart3, Code2, Megaphone, PanelsTopLeft } from 'lucide-react'
import type { OnboardingData, ServiceId } from './types'

export const services = [
  { id: 'social' as ServiceId, name: 'Social Media Management', short: 'Social media', description: 'Strategy, publishing and community growth across the platforms that matter.', icon: Megaphone },
  { id: 'content' as ServiceId, name: 'Content & Digital Marketing', short: 'Content', description: 'Campaign-ready video, photography, graphics and digital storytelling.', icon: BarChart3 },
  { id: 'website' as ServiceId, name: 'Website Development', short: 'Website', description: 'Responsive, conversion-focused websites and web experiences.', icon: PanelsTopLeft },
  { id: 'software' as ServiceId, name: 'Software & Custom Solutions', short: 'Software', description: 'Purpose-built applications, automation and business systems.', icon: Code2 }
]

export const serviceName = (id: ServiceId) => services.find((service) => service.id === id)?.name ?? id

export const emptyData: OnboardingData = {
  business: { fullName: '', businessName: '', email: '', phone: '+256 ', location: '', industry: '', website: '', description: '', targetAudience: '', goals: '', communication: '' },
  services: [],
  answers: { social: {}, content: {}, website: {}, software: {} },
  confirmed: false
}

export const mockSubmissions = [
  { id: 'STK-1048', name: 'Amina Nansubuga', business: 'Kawa Studio', services: ['Website', 'Content'], date: '12 Oct 2026', status: 'Under Review' },
  { id: 'STK-1047', name: 'Daniel Okello', business: 'Northline Logistics', services: ['Software'], date: '11 Oct 2026', status: 'Submitted' },
  { id: 'STK-1046', name: 'Ruth Akello', business: 'Moyo Botanics', services: ['Social media'], date: '09 Oct 2026', status: 'Onboarding Complete' },
  { id: 'STK-1045', name: 'Peter Kato', business: 'Kato & Co.', services: ['Website'], date: '08 Oct 2026', status: 'Draft' }
]
