import type { CompanyDetails, UpdateReportingPeriods } from '@/lib/api/types'
import { client } from '@/lib/api/request'

type Scope3Category = {
  category: number
  total: number
}

type ReportingPeriod = {
  startDate: string
  endDate: string
  reportURL?: string
  emissions?: {
    scope1?: {
      total: number
    }
    scope2?: {
      mb?: number
      lb?: number
      unknown?: number
    }
    scope3?: {
      categories?: Record<string, Scope3Category>
      statedTotalEmissions?: {
        total: number
      }
    }
    biogenic?: {
      total: number
    }
    statedTotalEmissions?: {
      total: number
    }
    scope1And2?: {
      total: number
    }
  }
  economy?: {
    turnover?: {
      value?: number
      currency?: string
    }
    employees?: {
      value?: number
      unit?: string
    }
  }
}

type ReportingPeriodsEditorState = Record<string, ReportingPeriod>

export class ReportingPeriodsEditor {
  /**
   * Editor state for updated reporting periods.
   */
  reportingPeriods = $state<ReportingPeriodsEditorState>({})

  /**
   * Setting derived state for reporting years
   */
  reportingYears = $derived(Object.keys(this.reportingPeriods).toReversed())

  /**
   * The selected year, used to focus a specific reporting period in the editor
   */
  selectedYear = $state<string>('')

  /**
   * Derived state for the selected period/year
   */
  selectedPeriod = $derived(
    this.selectedYear
      ? this.reportingPeriods?.[this.selectedYear?.toString()]
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
      ? Object.values(this.scope3.categories).reduce(
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
    this.selectedYear = this.reportingYears.at(0) ?? ''

    if (this.selectedYear) {
      this.reportingPeriods[this.selectedYear].emissions?.scope1?.total
    }
  }

  setScope1({ total }: { total: number }) {
    this.reportingPeriods[this.selectedYear].emissions ??= {}
    this.reportingPeriods[this.selectedYear].emissions!.scope1 = { total }
  }

  setScope2({
    mb,
    lb,
    unknown,
  }: {
    mb?: number
    lb?: number
    unknown?: number
  }) {
    this.reportingPeriods[this.selectedYear].emissions ??= {}

    if (this.reportingPeriods[this.selectedYear].emissions!.scope2) {
      if (mb !== undefined) {
        this.reportingPeriods[this.selectedYear].emissions!.scope2!.mb = mb
      }
      if (lb !== undefined) {
        this.reportingPeriods[this.selectedYear].emissions!.scope2!.lb = lb
      }
      if (unknown !== undefined) {
        this.reportingPeriods[this.selectedYear].emissions!.scope2!.unknown =
          unknown
      }
    } else {
      this.reportingPeriods[this.selectedYear].emissions!.scope2 = {
        mb,
        lb,
        unknown,
      }
    }
  }

  setScope3Category(updated: Scope3Category) {
    this.reportingPeriods[this.selectedYear].emissions ??= {}
    this.reportingPeriods[this.selectedYear].emissions!.scope3 ??= {}
    this.reportingPeriods[this.selectedYear].emissions!.scope3!.categories ??=
      {}

    this.reportingPeriods[this.selectedYear].emissions!.scope3!.categories![
      updated.category
    ] = updated
  }

  setScope3StateTotal(total: { total: number }) {
    this.reportingPeriods[this.selectedYear].emissions ??= {}
    this.reportingPeriods[this.selectedYear].emissions!.scope3 ??= {}

    if (
      this.reportingPeriods[this.selectedYear].emissions!.scope3!
        .statedTotalEmissions
    ) {
      this.reportingPeriods[
        this.selectedYear
      ].emissions!.scope3!.statedTotalEmissions = total
    }
  }

  /**
   * Initialise editor state
   */
  private getEditableReportingPeriods(
    company: CompanyDetails,
  ): ReportingPeriodsEditorState {
    return company.reportingPeriods.reduce((periods, reportingPeriod) => {
      const economy = reportingPeriod.economy
      const emissions = reportingPeriod.emissions

      periods[reportingPeriod.endDate.slice(0, 4)] = {
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
                    categories: emissions.scope3.categories.reduce(
                      (categories, { total, category }) => {
                        categories[category] = {
                          category,
                          total,
                        }
                        return categories
                      },
                      {} as Record<string, Scope3Category>,
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

      return periods
    }, {} as ReportingPeriodsEditorState)
  }

  /**
   * Convert the editor state into the expected format to be saved to the API
   */
  getSavingFormat(): UpdateReportingPeriods['reportingPeriods'] {
    return Object.values(this.reportingPeriods).map((period) => ({
      ...period,
      emissions: period.emissions
        ? {
            ...period.emissions,
            scope3: period.emissions.scope3
              ? {
                  ...period.emissions.scope3,
                  categories: period.emissions.scope3.categories
                    ? Object.values(period.emissions.scope3.categories)
                    : undefined,
                }
              : undefined,
          }
        : undefined,
    }))
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
