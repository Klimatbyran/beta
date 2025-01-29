export type Municipality = {
  name: string
  region: string
  emissions: Emissions
  budget: number
  emissionBudget: BudgetEmissions
  approximatedHistoricalEmission: ApproximatedEmissions
  totalApproximatedHistoricalEmission: number
  trend: TrendEmissions
  trendEmission: number
  historicalEmissionChangePercent: number
  neededEmissionChangePercent: number
  hitNetZero: Date
  budgetRunsOut: string
  electricCarChangePercent: number
  electricCarChangeYearly: Array<number>
  climatePlanLink: string
  climatePlanYear: number | string
  climatePlanComment: string
  bicycleMetrePerCapita: number
  totalConsumptionEmission: number
  electricVehiclePerChargePoints: number
  procurementScore: number
  procurementLink: number
}

export type EmissionPerYear = {
  year: number
  co2Equivalent: number
}

export type Emissions = {
  emissionPerYear: Array<EmissionPerYear>
  historicalEmissionChangePercent: number
  historicalEmissionChangeRank?: number | null
}

export type ApproximatedEmissions = {
  emissionPerYear: Array<EmissionPerYear>
  totalCO2Emission: number | null
}

export type BudgetEmissions = {
  co2Equivalent: number
  budgetPerYear: Array<EmissionPerYear>
}

export type TrendEmissions = {
  trendPerYear: Array<EmissionPerYear>
  trendCO2Emission: number
}

export type ClimatePlan = {
  link: string
  yearAdapted: string
  comment: string
}
