import { request } from '@/lib/request'
import type { Municipality } from './municipalityData'

export async function getMunicipalities(): Promise<Municipality[]> {
  return request('/municipalities')
}

export async function getMunicipality(name: string): Promise<Municipality> {
  return request(`/municipalities/${name}`)
}
