import { slugifyURL } from '@/lib/slugifyURL'

export type CompanyData = {
  wikidataId: string
  name: string
  description: string
  reportingPeriods: ReportingPeriod[]
  industry?: Industry
  goals: Goal[]
  initiatives: Initiative[]
}

export type Goal = {
  description: string
  year: null | string
  baseYear: null | string
  target: number | null
  metadata: Metadata
}

export type Metadata = {
  comment: string
  updatedAt: Date
  user: User
  verifiedBy?: User | null
  source: string
}

export type User = {
  name: string
}

export enum CurrencyName {
  Eur = 'EUR',
  Gbp = 'GBP',
  Isk = 'ISK',
  Sek = 'SEK',
  Usd = 'USD',
}

export enum EmissionUnit {
  TCO2E = 'tCO2e',
}

export type Currency = {
  name: CurrencyName
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
  year: null | string
  scope: null | string
  metadata: Metadata
}

export type ReportingPeriod = {
  startDate: Date
  endDate: Date
  reportURL: string | null
  economy: Economy
  emissions: Emissions
  metadata: Metadata
}

export type Economy = {
  turnover: Turnover | null
  employees: Employees | null
  metadata: Metadata
}

export type Turnover = {
  value: number | null
  currency: Currency | null
  metadata: Metadata
}

export type Employees = {
  value: number | null
  unit: string | null
  metadata: Metadata
}

export type Emissions = {
  scope1?: Scope1
  scope2?: Scope2
  scope3?: Scope3
  biogenicEmissions?: Scope1 | null
  calculatedTotalEmissions?: number | null
  statedTotalEmissions?: StatedTotalEmissions | null
}

export type StatedTotalEmissions = {
  total?: number | null
  unit: EmissionUnit
  metadata: Metadata
}

export type Scope1 = {
  total: number | null
  unit: EmissionUnit
  metadata: Metadata
}

export type Scope2 = {
  lb: number | null
  mb: number | null
  unknown: number | null
  unit: EmissionUnit
  metadata: Metadata
  calculatedTotalEmissions?: number | null
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
  unit: EmissionUnit
}

export type Scope3 = {
  statedTotalEmissions: StatedTotalEmissions
  metadata: Metadata
  calculatedTotalEmissions: number
  scope3Categories?: Scope3Category[]
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
