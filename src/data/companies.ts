import { request } from '@/lib/request'
import type { CompanyData, Goal, Initiative } from './companyData'

export async function getCompanies(): Promise<CompanyData[]> {
  return request('/companies')
}

export async function getCompany(wikidataId: string): Promise<CompanyData> {
  return request(`/companies/${wikidataId}`)
}

export async function saveBasicInfo(wikidataId: string, data: Partial<CompanyData>): Promise<void> {
  await request(`/companies`, {
    method: 'POST',
    body: JSON.stringify({ 
      wikidataId,
      ...data
    })
  })
}

export async function saveEmissions(wikidataId: string, periodId: string, emissions: CompanyData['reportingPeriods'][0]['emissions']): Promise<void> {
  await request(`/companies/${wikidataId}/reporting-periods`, {
    method: 'POST',
    body: JSON.stringify({
      reportingPeriods: [{
        id: periodId,
        emissions
      }]
    })
  })
}

export async function saveGoals(wikidataId: string, goals: Goal[]): Promise<void> {
  await request(`/companies/${wikidataId}/goals`, {
    method: 'POST',
    body: JSON.stringify({ goals })
  })
}

export async function saveInitiatives(wikidataId: string, initiatives: Initiative[]): Promise<void> {
  await request(`/companies/${wikidataId}/initiatives`, {
    method: 'POST',
    body: JSON.stringify({ initiatives })
  })
}
