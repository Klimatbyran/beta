import type { CompanyData } from './companyData'

/**
 * Conditionally load cached local JSON file instead of fetching from the API
 */
export async function getCompanies() {
  const URL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api/companies'
      : 'https://api.klimatkollen.se/api/companies'

  return (await fetch(URL).then((res) => res.json())) as CompanyData[]
}

// /**
//  * NOTE: If we need this in the future, here's a suggestion for how to implement it
//  */
// export async function getCompany(wikidataId: string) {
//   let data: CompanyData

//   if (process.env.NODE_ENV === 'production') {
//     data = (await fetch(
//       `https://api.klimatkollen.se/api/companies/${wikidataId}`,
//     ).then((res) => res.json())) as CompanyData
//   } else {
//     // prettier-ignore
//     // @ts-ignore Don't care about this TS error
//     data = ((await import('@/data/test.json')).default as CompanyData[]).find(c => c.wikidataId.toLowerCase() === wikidataId.toLowerCase())
//   }

//   return data
// }
