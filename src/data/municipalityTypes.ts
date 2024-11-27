export type Image = {
  ImageUrl: string
  Description: string
}

export type EmissionPerYear = {
  Year: number
  CO2Equivalent: number
}

export type Emission = {
  EmissionPerYear: Array<EmissionPerYear>
  HistoricalEmissionChangePercent: number
  HistoricalEmissionChangeRank?: number | null
}

export type ApproximatedEmission = {
  EmissionPerYear: Array<EmissionPerYear>
  TotalCO2Emission: number | null
}

export type Budget = {
  CO2Equivalent: number
  BudgetPerYear: Array<EmissionPerYear>
}

export type Trend = {
  TrendPerYear: Array<EmissionPerYear>
  TrendCO2Emission: number
}

export type ClimatePlan = {
  Link: string
  YearAdapted: string
  Comment: string
}

export type Municipality = {
  County: string
  Name: string
  CoatOfArmsImage: Image | null
  Population: number | null
  Image: Image | null
  Budget: Budget
  HistoricalEmission: Emission
  PoliticalRule: string
  ApproximatedHistoricalEmission: ApproximatedEmission
  EmissionTrend: Trend
  NeededEmissionChangePercent: number
  HitNetZero: number | string
  BudgetRunsOut: string
  ElectricCars: number
  ElectricCarChangePercent: number
  ElectricCarChangeYearly: Array<number>
  ClimatePlan: ClimatePlan
  BicycleMetrePerCapita: number
  TotalConsumptionEmission: number
  ElectricVehiclePerChargePoints: number
  ProcurementScore: number
  ProcurementLink: string
}
