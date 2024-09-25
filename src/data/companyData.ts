import { slugifyURL } from '@/lib/slugifyURL'

// NOTE: Types generated with https://app.quicktype.io/ based on the raw JSON response from `GET /companies` and modified to fix errors and simplify.

export type CompanyData = {
  wikidataId: string
  name: string
  description: string | null
  reportingPeriods: ReportingPeriod[]
  industry?: Industry
  goals: Goal[]
  initiatives: Initiative[]
}

export type Goal = {
  description: string
  year: string | null
  baseYear: string | null
  target: number | null
  metadata: Metadata
}

export type Metadata = {
  comment: string | null
  source: string | null
  updatedAt: Date
  user: User
  verifiedBy: User | null
  dataOrigin: string | null
}

export type User = {
  name: string
}

export type Industry = {
  industryGics: IndustryGics
  metadata: Metadata
}

export type IndustryGics = {
  sectorCode: string
  groupCode: string
  industryCode: string
  subIndustryCode: string
  sv: IndustryGicsStrings
  en: IndustryGicsStrings
}

export type IndustryGicsStrings = {
  sectorName: string
  groupName: string
  industryName: string
  subIndustryName: string
  subIndustryDescription: string
}

export type Initiative = {
  title: string
  description: string
  year: string | null
  scope: string | null
  metadata: Metadata
}

export type ReportingPeriod = {
  startDate: Date
  endDate: Date
  reportURL: string | null
  economy: Economy | null
  emissions: Emissions | null
}

export type Economy = {
  turnover: Turnover | null
  employees: Employees | null
}

export type Employees = {
  value: number | null
  unit: string | null
  metadata: Metadata
}

export type Turnover = {
  value: number | null
  currency: string | null
  metadata: Metadata
}

export type Emissions = {
  scope1?: Scope1 | null
  scope2?: Scope2 | null
  scope3?: Scope3 | null
  biogenicEmissions?: BiogenicEmissions | null
  statedTotalEmissions?: BiogenicEmissions | null
  calculatedTotalEmissions: number | null
}

export type StatedTotalEmissions = {
  total?: number | null
  unit: string
  metadata: Metadata
}

export type Scope1 = {
  total: number | null
  unit: string
  metadata: Metadata
}

export type BiogenicEmissions = {
  total: number | null
  unit: string
  metadata: Metadata
}

export type Scope2 = {
  lb: number | null
  mb: number | null
  unknown: number | null
  unit: string
  metadata: Metadata
  calculatedTotalEmissions: number
}

export enum Scope3CategoryNumber {
  purchasedGoods = 1,
  capitalGoods = 2,
  fuelAndEnergyRelatedActivities = 3,
  upstreamTransportationAndDistribution = 4,
  wasteGeneratedInOperations = 5,
  businessTravel = 6,
  employeeCommuting = 7,
  upstreamLeasedAssets = 8,
  downstreamTransportationAndDistribution = 9,
  processingOfSoldProducts = 10,
  useOfSoldProducts = 11,
  endOfLifeTreatmentOfSoldProducts = 12,
  downstreamLeasedAssets = 13,
  franchises = 14,
  investments = 15,
  other = 16,
}

export type Scope3Category = {
  category: Scope3CategoryNumber
  total?: number | null
  metadata: Metadata
  unit: string
}

export type Scope3 = {
  statedTotalEmissions: StatedTotalEmissions | null
  scope3Categories: Scope3Category[]
  metadata: Metadata
  calculatedTotalEmissions: number
}

export function getCompanyURL(company: CompanyData) {
  return `${slugifyURL(company.name)}-${company.wikidataId}`
}

export function getLatestReportingPeriodWithEmissions(company: CompanyData) {
  return company.reportingPeriods.find(({ emissions }) => Boolean(emissions))
}

export function getLatestReportingPeriodWithEconomy(company: CompanyData) {
  return company.reportingPeriods.find(({ economy }) => Boolean(economy))
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
