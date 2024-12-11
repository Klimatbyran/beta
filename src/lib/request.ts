const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api'
    : 'https://api.klimatkollen.se/api'

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

  console.log('Making request to', `${BASE_URL}${endpoint}`)
  return fetch(`${BASE_URL}${endpoint}`, config).then(async (response) => {
    if (response.ok) {
      return response.json()
    } else {
      const errorMessage = await response.text()
      return Promise.reject(new Error(errorMessage))
    }
  })
}
