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
  year: string | null
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
  name: Name
}

export enum Email {
  HejKlimatkollenSE = 'hej@klimatkollen.se',
}

export enum Name {
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
  emissions: Emissions | null
  metadata: Metadata
}

export type Emissions = {
  scope1: Scope1
  scope2: Scope2
  scope3: Scope3
}

export type Scope1 = {
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
  other: number | null
  unit: Unit
  metadata: Metadata
}

export function getCompanyURL(company: CompanyData) {
  return `${slugifyURL(company.name)}-${company.wikidataId}`
}

export function getLatestYearWithEmissionsData(company: CompanyData) {
  return company.reportingPeriods[0].startDate.getFullYear()
}

export function getWikidataEmissionsYear(
  wikidata: CompanyData['wikidata'],
  year: number | string,
) {
  const formattedYear = String(year)
  const wantedYear = Array.isArray(wikidata?.emissions)
    ? wikidata.emissions.findLast((entry) => entry.year === formattedYear)
    : wikidata?.emissions?.[formattedYear]

  return wantedYear
}
