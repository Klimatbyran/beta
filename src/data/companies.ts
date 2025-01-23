import { request, client } from '@/lib/api/request'

export type ValidationError = {
  error: string
  details: Array<{
    field: string
    message: string
    code: string
  }>
  help: string
}

function isValidationError(error: unknown): error is ValidationError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'error' in error &&
    'details' in error &&
    'help' in error
  )
}

export async function getCompanies(params: Parameters<typeof client.GET>) {
  return client.GET('/companies/')
}



