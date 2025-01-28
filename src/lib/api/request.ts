import createClient from 'openapi-fetch'
import type { paths } from '@/lib/api/v1'
import apiConfig from '@/config/api'

export const client = createClient<paths>({
  baseUrl: apiConfig.BASE_URL,
  headers: typeof window !== 'undefined' ? { Authorization: `Bearer ${localStorage.editToken}` } : undefined,
})
