import { request } from '@/lib/request'
import type { CompanyData, Goal, Initiative } from './companyData'

export async function getCompanies(): Promise<CompanyData[]> {
  return request('/companies')
}

export async function getCompany(wikidataId: string): Promise<CompanyData> {
  return request(`/companies/${wikidataId}`)
}

export async function saveBasicInfo(wikidataId: string, data: Partial<CompanyData>): Promise<void> {
  await request(`/companies/${wikidataId}/basic`, {
    method: 'PUT',
    body: JSON.stringify(data)
  })
}

export async function saveEmissions(wikidataId: string, periodId: string, emissions: CompanyData['reportingPeriods'][0]['emissions']): Promise<void> {
  await request(`/companies/${wikidataId}/periods/${periodId}/emissions`, {
    method: 'PUT',
    body: JSON.stringify(emissions)
  })
}

export async function saveGoals(wikidataId: string, goals: Goal[]): Promise<void> {
  await request(`/companies/${wikidataId}/goals`, {
    method: 'PUT',
    body: JSON.stringify(goals)
  })
}

export async function saveInitiatives(wikidataId: string, initiatives: Initiative[]): Promise<void> {
  await request(`/companies/${wikidataId}/initiatives`, {
    method: 'PUT',
    body: JSON.stringify(initiatives)
  })
}
