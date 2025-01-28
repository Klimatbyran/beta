import type { CompanyDetails, UpdateReportingPeriods } from '@/lib/api/types'
import { client } from '@/lib/api/request'

export class ReportingPeriodsEditor {
  /**
   * Editor state for updated reporting periods.
   */
  reportingPeriods = $state<UpdateReportingPeriods['reportingPeriods']>([])

  /**
   * Setting derived state for reporting years
   */
  reportingYears = $derived(
    this.reportingPeriods.map((period) =>
      new Date(period.endDate).getFullYear(),
    ),
  )

  /**
   * The selected year, used to focus a specific reporting period in the editor
   */
  selectedYear = $state<number | undefined>(undefined)

  /**
   * Derived state for the selected period/year
   */
  selectedPeriod = $derived(
    this.selectedYear
      ? this.reportingPeriods.find(
          (period) =>
            new Date(period.startDate).getFullYear() === this.selectedYear &&
            period.emissions,
        )
      : undefined,
  )

  /**
   * Derived state for the emissions data
   */
  emissions = $derived(this.selectedPeriod?.emissions)
  scope1 = $derived(this.emissions?.scope1)
  scope2 = $derived(this.emissions?.scope2)
  scope3 = $derived(this.emissions?.scope3)

  scope2Total = $derived(
    this.scope2?.mb ?? this.scope2?.lb ?? this.scope2?.unknown ?? 0,
  )

  scope3Total = $derived(
    this.scope3?.categories?.length
      ? this.scope3.categories.reduce(
          (sum, category) => sum + category.total,
          0,
        )
      : (this.scope3?.statedTotalEmissions?.total ?? 0),
  )

  biogenic = $derived(this.emissions?.biogenic)

  /**
   * Change which company to edit
   */
  setCompany(company: CompanyDetails) {
    this.reportingPeriods = this.getEditableReportingPeriods(company)
    this.selectedYear = this.reportingYears.at(0)
  }

  private getEditableReportingPeriods(
    company: CompanyDetails,
  ): UpdateReportingPeriods['reportingPeriods'] {
    return company.reportingPeriods.map((reportingPeriod) => {
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
                      ({ total, category }) => ({
                        category,
                        total,
                      }),
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
    })
  }
}

export const editByReportingPeriod = new ReportingPeriodsEditor()

// /**
//  * Add API call to save reporting data changes below
//  */
// export async function saveReportingPeriods (
//     data: emissionsData, error: emissionsError
// ){
//       await client.POST('/companies/{wikidataId}/reporting-periods', {
//         params: { path: { wikidataId: company.wikidataId }, },
//         body: {
//           reportingPeriods: updatedReportingPeriods,
//         },
//       })

//     if (!emissionsData?.ok || !emissionsData || emissionsError) {
//       throw new Error('Ogiltig data från API')
//     }
//     console.log('Saved emissions data') // Debug logging
//   }
