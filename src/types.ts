export type ServiceId = 'social' | 'content' | 'website' | 'software'

export type UploadFile = {
  id: string
  name: string
  size: number
  type: string
  progress: number
}

export type BusinessInfo = {
  fullName: string
  businessName: string
  email: string
  phone: string
  location: string
  industry: string
  website: string
  description: string
  targetAudience: string
  goals: string
  communication: string
}

export type ServiceAnswers = Record<string, string | string[] | boolean | UploadFile[]>

export type OnboardingData = {
  business: BusinessInfo
  services: ServiceId[]
  answers: Record<ServiceId, ServiceAnswers>
  confirmed: boolean
  updatedAt?: string
}

export type StepId = 'business' | 'services' | ServiceId | 'review'

export type Step = { id: StepId; label: string; eyebrow: string }
