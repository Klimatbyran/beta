/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from 'fs'
import * as path from 'path'
import type {
  Municipality,
  EmissionPerYear,
  Budget,
  Emission,
  Trend,
  ClimatePlan,
  ApproximatedEmission,
} from './municipalityTypes'
import jsonData from './municipalityData.json'

export class MunicipalityDataService {
  public getMunicipality(name: string): Municipality | undefined {
    const data = jsonData.find(
      (m: any) => m.kommun.toLowerCase() === name.toLowerCase(),
    )
    if (!data) {
      return
    }

    return this.processMunicipalityData(data)
  }

  public getAllMunicipalityNames(): string[] {
    return jsonData.map((m: any) => m.kommun)
  }

  private processMunicipalityData(data: any): Municipality {
    const emissions = Object.entries(data.emissions).map(
      ([year, emission]) =>
        ({
          Year: Number(year),
          CO2Equivalent: emission,
        }) as EmissionPerYear,
    )

    const emission: Emission = {
      EmissionPerYear: emissions,
      LargestEmissionSectors: [], // Process this if available
      HistoricalEmissionChangePercent: data.historicalEmissionChangePercent,
    }

    const approximatedEmission: ApproximatedEmission = {
      TotalCO2Emission: data.totalApproximatedHistoricalEmission,
      EmissionPerYear: Object.entries(data.approximatedHistoricalEmission).map(
        ([year, co2equivalent]) => ({
          Year: Number(year),
          CO2Equivalent: Number(co2equivalent),
        }),
      ),
    }

    const trend: Trend = {
      TrendCO2Emission: data.trendEmission,
      TrendPerYear: Object.entries(data.trend).map(([year, emissionTrend]) => ({
        Year: Number(year),
        CO2Equivalent: Number(emissionTrend),
      })),
    }

    const budget: Budget = {
      CO2Equivalent: data.budget,
      BudgetPerYear: Object.entries(data.emissionBudget).map(
        ([year, emissionBudget]) => ({
          Year: Number(year),
          CO2Equivalent: Number(emissionBudget),
        }),
      ),
    }

    const climatePlan: ClimatePlan = {
      Link: data.climatePlanLink,
      YearAdapted: data.climatePlanYear,
      Comment: data.climatePlanComment,
    }

    return {
      Name: data.kommun,
      County: data.län,
      HistoricalEmission: emission,
      ApproximatedHistoricalEmission: approximatedEmission,
      EmissionTrend: trend,
      Budget: budget,
      NeededEmissionChangePercent: data.neededEmissionChangePercent,
      HitNetZero: data.hitNetZero,
      BudgetRunsOut: data.budgetRunsOut,
      ElectricCarChangePercent: data.electricCarChangePercent,
      ElectricCarChangeYearly: data.electricCarChangeYearly,
      ClimatePlan: climatePlan,
      BicycleMetrePerCapita: data.bicycleMetrePerCapita,
      TotalConsumptionEmission: data.totalConsumptionEmission / 1000,
      ElectricVehiclePerChargePoints: data.electricVehiclePerChargePoints,
      ProcurementScore: data.procurementScore,
      ProcurementLink: data.procurementLink,
    } as Municipality
  }
}
