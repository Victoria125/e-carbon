import { use } from 'react'
import { PatientContext } from '@/context/PatientContext'

export function usePatient() {
  const context = use(PatientContext)
  if (context === undefined) {
    throw new Error('usePatient must be used within a PatientProvider')
  }
  return context
}
