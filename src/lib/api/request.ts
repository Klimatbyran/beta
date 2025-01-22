import createClient from "openapi-fetch";
import type { paths } from "@/lib/api/v1";
import apiConfig from '@/config/api'

export const client = createClient<paths>({ baseUrl: apiConfig.BASE_URL });

export async function request(
  endpoint: string,
  { body, ...customConfig }: RequestInit = {},
) {
  const headers = { 'Content-Type': 'application/json' }
  const config: RequestInit = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }
  if (body) {
    config.body = JSON.stringify(body)
  }

  console.log('Making request to', `${apiConfig.BASE_URL}${endpoint}`)
  return fetch(`${apiConfig.BASE_URL}${endpoint}`, config).then(async (response) => {
    if (response.ok) {
      return response.json()
    } else {
      const errorMessage = await response.text()
      return Promise.reject(new Error(errorMessage))
    }
  })
}
