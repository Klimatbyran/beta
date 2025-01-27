import type {
    CompanyDetails,
    UpdateReportingPeriods,
  } from '@/lib/api/types'


class Editor {
    updatedReportingPeriods: UpdateReportingPeriods['reportingPeriods']

    constructor(company: CompanyDetails) {
        this.updatedReportingPeriods = $state<
        UpdateReportingPeriods['reportingPeriods']
      >(
        company.reportingPeriods.map((reportingPeriod) => {
          const economy = reportingPeriod.economy
          const emissions = reportingPeriod.emissions
          return {
            ...reportingPeriod,
            reportURL: reportingPeriod.reportURL ?? undefined,
            emissions: emissions
              ? {
                  scope1: emissions.scope1
                    ? { total: emissions.scope1.total }
                    : undefined,
                  scope2: emissions.scope2
                    ? {
                        mb: emissions.scope2.mb ?? undefined,
                        lb: emissions.scope2.lb ?? undefined,
                        unknown: emissions.scope2.unknown ?? undefined,
                      }
                    : undefined,
                  scope3: emissions.scope3
                    ? {
                        categories: emissions.scope3.categories.map(
                          ({ total, category }) => ({ category, total }),
                        ),
                        statedTotalEmissions: emissions.scope3.statedTotalEmissions
                          ? { total: emissions.scope3.statedTotalEmissions.total }
                          : undefined,
                      }
                    : undefined,
                  biogenic: emissions.biogenicEmissions
                    ? { total: emissions.biogenicEmissions.total }
                    : undefined,
                  statedTotalEmissions: emissions.statedTotalEmissions
                    ? { total: emissions.statedTotalEmissions.total }
                    : undefined,
                }
              : undefined,
            economy: economy
              ? {
                  employees: economy.employees
                    ? {
                        value: economy.employees.value ?? 0,
                        unit: economy.employees.unit ?? undefined,
                      }
                    : undefined,
                  turnover: economy.turnover
                    ? {
                        value: economy.turnover.value ?? undefined,
                        currency: economy.turnover.currency ?? undefined,
                      }
                    : undefined,
                }
              : undefined,
          }
        }),
      )
    }

    // selectedPeriod
    // selectedYear
    //updatedReportingPeriods
}