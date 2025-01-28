import type {
  CompanyDetails,
  UpdateCompanyDetails,
  UpdateIndustry,
  UpdateGoals,
  UpdateInitiatives,
} from '@/lib/api/types'

type Details = Omit<CompanyDetails, 'reportingPeriods'>

// TODO: Use this type to create more specific editor state
type CompanyEditorState = {
  wikidataId: string
  name: string
  description: string | null

  // initiatives
  // goals
  // industry
}

class CompanyEditor {
  name = $state('')
  description = $state('')
  //   subIndustry = $state<string>()

  /**
   * Change which company to edit
   */
  init(company: CompanyDetails) {
    this.name = company.name
    this.description = company.description ?? ''

    // this.subIndustry = company.industry?.industryGics.subIndustryCode
  }

  //   /**
  //    * Get the format expected by the API
  //    */
  //   getUpdatedIndustry(): UpdateIndustry['industry'] {
  //     return { subIndustryCode: 'TODO' }
  //   }
}

export const companyEditor = new CompanyEditor()
