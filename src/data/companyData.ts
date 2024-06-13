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

/*
{
    "node": "Q123456",
    "url": "https://www.wikidata.org/wiki/Q123456",
    "logo": "https://commons.wikimedia.org/wiki/File:Example.jpg",
    "label": "Company Name",
    "description": "Company Description",
    "url": "https://example.com",
    "emissions": [
      {
        "year": "2019",
        "reference": "https://example.com",
        "scope1": {
          "emissions": 1234,
          "biogenic": 123,
          "unit": "tCO2e"
        },
        "scope2": {
          "emissions": 1235,
          "unit": "tCO2e",
          "mb": 1235,
          "lb": 125
        },
        "scope3": {
          "emissions": null,
          "unit": "tCO2e",
          "categories": {
            "1_purchasedGoods": 100000000,
            "2_capitalGoods": 100000000,
            "3_fuelAndEnergyRelatedActivities": 100000000,
            "4_upstreamTransportationAndDistribution": 100000000,
            "5_wasteGeneratedInOperations": 100000000,
            "6_businessTravel": 100000000,
            "7_employeeCommuting": 100000000,
            "8_upstreamLeasedAssets": 100000000,
            "9_downstreamTransportationAndDistribution": 100000000,
            "10_processingOfSoldProducts": 100000000,
            "11_useOfSoldProducts": 100000000,
            "12_endOfLifeTreatmentOfSoldProducts": 100000000,
            "13_downstreamLeasedAssets": 100000000,
            "14_franchises": 100000000,
            "15_investments": 100000000,
            "16_other": 100000000
          }
        }
      }
*/
export interface Wikidata {
  node: string
  url: string
  logo: string
  label: string
  description: string
  emissions: Emissions
}

/**
 * Gregorian calendar months, where 1 is January and 12 is December
 */
export type FiscalYear = {
  startMonth: number
  endMonth: number
}

export interface CompanyData {
  companyName: string
  description: string
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
  wikidata: Wikidata
  needsReview: boolean
  publicComment: string
  reviewComment: string
  fiscalYear?: FiscalYear
}

export function getCompanyName(company: CompanyData) {
  return company.wikidata?.label ?? company.companyName
}

export function getCompanyURL(company: CompanyData) {
  return company.companyName.toLowerCase().replaceAll(' ', '-')
}

export const latestYearWithData = 2023

export const isCompany = (value: CompanyData): value is CompanyData => {
  // console.log(
  //   'isCompany',
  //   !!value.companyName,
  //   !!value.description,
  //   !!value.industryGics,
  //   !!value.industryNace,
  //   !!value.url,
  //   !!value.emissions,
  //   !!value.baseFacts,
  // )
  if (
    value.companyName &&
    value.industryGics &&
    value.industryNace &&
    value.url &&
    value.emissions &&
    value.emissions[latestYearWithData] &&
    value.baseFacts
  )
    return true
  else return false
}
