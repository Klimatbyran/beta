import type { paths } from '@/lib/api-types'

// Base municipality type from API
export type Municipality = NonNullable<
  paths['/municipalities/']['get']['responses'][200]['content']['application/json']
>[0]

// Detailed municipality type from API
export type MunicipalityDetails = NonNullable<
  paths['/municipalities/{id}']['get']['responses'][200]['content']['application/json']
>

// Helper type for emissions data by year
export type EmissionsByYear = Record<
  string,
  {
    total: number
    historical: number
    target: number
  }
>

// Helper type for metrics data by year
export type MetricsByYear = Record<
  string,
  {
    rank: string
    targetDate: string
    yearlyReduction: number
  }
>

// Helper function to get latest year's data
export function getLatestYearData<T>(
  data: Record<string, T> | undefined,
): T | undefined {
  if (!data || typeof data !== 'object') return undefined

  const years = Object.keys(data)
    .map(Number)
    .filter((year) => !isNaN(year))
    .sort((a, b) => b - a)

  return years.length > 0 ? data[years[0].toString()] : undefined
}

// Helper function to get all years from data
export function getAvailableYears(
  data: Record<string, unknown> | undefined,
): number[] {
  if (!data || typeof data !== 'object') return []

  return Object.keys(data)
    .map(Number)
    .filter((year) => !isNaN(year))
    .sort((a, b) => b - a)
}
