import type {
  CompanyList,
  CompanyDetails,
  Emissions,
  ReportingPeriod,
} from '@/lib/api/types'
import { slugifyURL } from '@/lib/slugifyURL'

// NOTE: Types generated with https://app.quicktype.io/ based on the raw JSON response from `GET /companies` and modified to fix errors and simplify.

export function getCompanyURL(
  company: Pick<CompanyList[number], 'name' | 'wikidataId'>,
) {
  return `${slugifyURL(company.name)}-${company.wikidataId}`
}

export function getLatestReportingPeriodWithEmissions(company: CompanyDetails) {
  return company.reportingPeriods.find(({ emissions }) => Boolean(emissions))
}

export function getLatestReportingPeriodWithEconomy(company: CompanyDetails) {
  return company.reportingPeriods.find(({ economy }) => Boolean(economy))
}

export function hasVerifiedScope3(
  emissions: Emissions | null | undefined,
): boolean {
  // Early return for invalid/missing scope 3 emissions OR if neither statedTotalEmissions nor categories are present
  if (
    !emissions?.scope3 ||
    (!emissions.scope3.categories && !emissions.scope3.statedTotalEmissions)
  ) {
    return false
  }

  const categories = emissions.scope3.categories ?? []
  const statedTotalEmissions = emissions.scope3.statedTotalEmissions

  const hasReportedCategories = categories.some(
    (category) => category.total != null,
  )
  const isStatedTotalEmissionsVerified =
    statedTotalEmissions?.total != null &&
    statedTotalEmissions?.metadata.verifiedBy != null

  // If all categories are null and statedTotalEmissions is invalid or unverified then scope 3 is unverified
  if (!hasReportedCategories && !isStatedTotalEmissionsVerified) {
    return false
  }

  // If all categories are null BUT statedTotalEmissions is verified then scope 3 is verified
  if (!hasReportedCategories && isStatedTotalEmissionsVerified) {
    return true
  }

  // Check if all reported categories are verified
  return categories
    .filter((category) => category.total != null)
    .every((category) => category.metadata.verifiedBy != null)
}

export function getFormattedReportingPeriod({
  startDate,
  endDate,
}: ReportingPeriod) {
  const startYear = new Date(startDate).getFullYear()
  const endYear = new Date(endDate).getFullYear()

  if (startYear === endYear) {
    return startYear
  }

  return `${startYear}/${endYear}`
}
