import { slugifyURL } from '@/lib/slugifyURL'

export type CompanyData = {
  wikidataId: string
  name: string
  description: string
  reportingPeriods: ReportingPeriod[]
  industryGics?: IndustryGics
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
  comment: MetadataComment
  updatedAt: Date
  user: User
  source: Source
}

export enum MetadataComment {
  InitialImport = 'Initial import',
}

export type Source = {
  url: string
  comment: SourceComment
}

export enum SourceComment {
  GarboImport = 'Garbo import',
}

export type User = {
  email: Email
  name: UserName
}

export enum Email {
  HejKlimatkollenSE = 'hej@klimatkollen.se',
}

export enum UserName {
  Klimatkollen = 'Klimatkollen',
}

export type IndustryGics = {
  sv: En
  en: En
}

export type En = {
  sectorName: string
  groupName: string
  industryName: string
  subIndustryCode: string
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
  economy: Economy
  emissions: Emissions
}

export type Economy = {
  turnover: number | null
  employees: number | null
  currency: Currency | null
  metadata: Metadata
}

export type Currency = {
  name: CurrencyName
}

export enum CurrencyName {
  Eur = 'EUR',
  Gbp = 'GBP',
  Isk = 'ISK',
  Sek = 'SEK',
  Usd = 'USD',
}

export type Emissions = {
  scope1?: BiogenicEmissions
  scope2?: Scope2
  scope3?: Scope3
  biogenicEmissions?: BiogenicEmissions
  calculatedTotalEmissions: number | null
}

export type BiogenicEmissions = {
  total: number | null
  unit: Unit
  metadata: Metadata
}

export enum Unit {
  TCO2E = 'tCO2e',
}

export type Scope2 = {
  lb: number | null
  mb: number | null
  unknown: number | null
  unit: Unit
  metadata: Metadata
  calculatedTotalEmissions: number | null
}

export type Scope3 = {
  c1_purchasedGoods: number | null
  c2_capitalGoods: number | null
  c3_fuelAndEnergyRelatedActivities: number | null
  c4_upstreamTransportationAndDistribution: number | null
  c5_wasteGeneratedInOperations: number | null
  c6_businessTravel: number | null
  c7_employeeCommuting: number | null
  c8_upstreamLeasedAssets: number | null
  c9_downstreamTransportationAndDistribution: number | null
  c10_processingOfSoldProducts: number | null
  c11_useOfSoldProducts: number | null
  c12_endOfLifeTreatmentOfSoldProducts: number | null
  c13_downstreamLeasedAssets: number | null
  c14_franchises: number | null
  c15_investments: number | null
  statedTotalEmissions: null
  other: number | null
  unit: Unit
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
