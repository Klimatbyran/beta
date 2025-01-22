
export type ValidationError = {
  error: string
  details: Array<{
    field: string
    message: string
    code: string
  }>
  help: string
}

function isValidationError(error: unknown): error is ValidationError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'error' in error &&
    'details' in error &&
    'help' in error
  )
}

// export async function saveBasicInfo(wikidataId: string, data: Partial<CompanyData>): Promise<void> {
//   try {
//     await request(`/companies/${wikidataId}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         wikidataId,
//         name: data.name,
//         ...data
//       })
//     })
//   } catch (error) {
//     if (isValidationError(error)) {
//       throw error
//     }
//     throw new Error('Ett fel uppstod vid sparande av grundinformation')
//   }
// }

// export async function saveEmissions(wikidataId: string, periodId: string, emissions: CompanyData['reportingPeriods'][0]['emissions']): Promise<void> {
//   await request(`/companies/${wikidataId}/reporting-periods`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       reportingPeriods: [{
//         id: periodId,
//         emissions
//       }]
//     })
//   })
// }

// export async function saveGoals(wikidataId: string, goals: Goal[]): Promise<void> {
//   await request(`/companies/${wikidataId}/goals`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ goals })
//   })
// }

// export async function saveInitiatives(wikidataId: string, initiatives: Initiative[]): Promise<void> {
//   await request(`/companies/${wikidataId}/initiatives`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ initiatives })
//   })
// }
