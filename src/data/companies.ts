import { createCache } from '@/lib/createCache'
import type { CompanyData } from './companyData'

const FIVE_MINUTES = 5 * 60 * 1000

const cachedCompanies = createCache<'companies', CompanyData[]>({
  maxAge: FIVE_MINUTES,
})

// TODO: improve filtering to only keep the companies that have facit or wikidata properties
// And secondly, prefer later hits (as long as they include more information

const keepUniqueCompanies = (c: CompanyData, i: number, array: CompanyData[]) =>
  i === array.findLastIndex((company) => company.wikidataId === c.wikidataId)

/**
 * Conditionally load cached local JSON file instead of fetching from the API
 */
export async function getCompanies() {
  const cached = cachedCompanies.get('companies')
  if (cached) {
    return cached
  }

  let data: CompanyData[]

  if (process.env.NODE_ENV === 'production') {
    data = (
      (await fetch('https://api.klimatkollen.se/api/companies').then((res) =>
        res.json(),
      )) as CompanyData[]
    ).filter(keepUniqueCompanies)

    cachedCompanies.set('companies', data)
  } else {
    // prettier-ignore
    // @ts-ignore Don't care about this TS error
    data = ((await import('@/data/test.json')).default as CompanyData[]).filter(keepUniqueCompanies)
  }

  return data

  // TODO: Move filtering to the backend.
  // return (
  //   data
  //     .filter(isCompany)
  //     // HACK: Keep unique companies. This should ideally be solved with filtering on the API side.
  //     .filter(
  //       (c, i, array) =>
  //         i === array.findLastIndex((company) => c.url === company.url),
  //     ) as CompanyData[]
  // )
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
