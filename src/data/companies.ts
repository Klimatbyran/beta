import { request } from '@/lib/request'
import type { CompanyData } from './companyData'

export async function getCompanies(): Promise<CompanyData[]> {
  return request('/companies')
}

export async function getCompany(wikidataId: string): Promise<CompanyData> {
  return request(`/companies/${wikidataId}`)
}
