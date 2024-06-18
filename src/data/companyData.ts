export interface IndustryGics {
  name: string
  sector: {
    code: string
    name: string
  }
  group: {
    code: string
    name: string
  }
  industry: {
    code: string
    name: string
  }
  subIndustry: {
    code: string
    name: string
  }
}

export interface IndustryNace {
  section: {
    code: string
    name: string
  }
  division: {
    code: string
    name: string
  }
}

export interface EmissionsScope {
  emissions: number | null
  verified: string
  unit: string
  biogenic?: number
  mb?: number
  lb?: number
  categories?: {
    '1_purchasedGoods': number | null
    '2_capitalGoods': number | null
    '3_fuelAndEnergyRelatedActivities': number | null
    '4_upstreamTransportationAndDistribution': number | null
    '5_wasteGeneratedInOperations': number | null
    '6_businessTravel': number | null
    '7_employeeCommuting': number | null
    '8_upstreamLeasedAssets': number | null
    '9_downstreamTransportationAndDistribution': number | null
    '10_processingOfSoldProducts': number | null
    '11_useOfSoldProducts': number | null
    '12_endOfLifeTreatmentOfSoldProducts': number | null
    '13_downstreamLeasedAssets': number | null
    '14_franchises': number | null
    '15_investments': number | null
    '16_other': number | null
  }
}

export type Scope3Category = keyof Omit<
  Exclude<EmissionsScope['categories'], undefined>,
  '16_other'
>

export interface Emissions {
  [year: string]: {
    year: string
    scope1: EmissionsScope
    scope2: EmissionsScope
    scope3: EmissionsScope
  }
}

export interface BaseFacts {
  [year: string]: {
    turnover: number
    employees: number
    unit: string
  }
}

export interface Factors {
  product: string
  description: string
  value: number
  unit: string
}

export interface Contact {
  name: string
  role: string
  email: string
  phone: string
}

export interface Goal {
  description: string
  year: number
  reductionPercent: number
  baseYear: string
}

export interface Initiative {
  title: string
  description: string
  year: number
  reductionPercent: number
  scope: string
}

export type WikidataEmissionsEntry = {
  year: string
  scope1: EmissionsScope
  scope2: EmissionsScope
  scope3: EmissionsScope
  reference: string
}

export type WikidataEmissions =
  | {
      [year: string]: WikidataEmissionsEntry
    }
  | WikidataEmissionsEntry[]

export interface Wikidata {
  node: string
  url: string
  logo: string
  label: string
  description: string
  emissions: WikidataEmissions
}

/**
 * Gregorian calendar months, where 1 is January and 12 is December
 */
export type FiscalYear = {
  startMonth: number
  endMonth: number
}

// TODO: EmissionScope actually doesn't include `vefrified` for facit.
// Update the type for EmissionScope and omit the verified field, but only when used as part of Facit.
export type Facit = {
  companyName: string
  url: string
  emissions: Emissions
}

export interface CompanyData {
  companyName: string
  description: string
  wikidataId: string
  industryGics: IndustryGics
  industryNace: IndustryNace
  baseYear: string
  url: string
  emissions: Emissions
  baseFacts: BaseFacts
  factors: Factors[]
  contacts: Contact[]
  goals: Goal[]
  initiatives: Initiative[]
  reliability: string
  wikidata?: Wikidata
  facit?: Facit
  needsReview: boolean
  publicComment: string
  reviewComment: string
  fiscalYear?: FiscalYear
}

export function getCompanyName(company: CompanyData) {
  return (
    company.facit?.companyName || company.wikidata?.label || company.companyName
  )
}

export function getCompanyURL(company: CompanyData) {
  return `${company.companyName.toLowerCase().replaceAll(' ', '-')}-${company.wikidataId}`
}

export const latestYearWithData = 2023

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
