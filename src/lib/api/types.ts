import type { paths } from './v1'

// extract the types from request body and responses (given a path and a status code, e.g. 200)

// export types that are easier to use in client code

// type ResponseOf<
//     Path extends paths[keyof paths],
//     Method extends keyof Path,
//     StatusCode extends Path[Method]['responses']
// > = Path[Method]['responses'][StatusCode]

// export type ResponseBody<
//   Path extends keyof paths,
//   Method extends keyof paths[Path],
//   StatusCode extends keyof (paths[Path][Method] & { responses: any })["responses"]
// > = (paths[Path][Method] & { responses: any })["responses"][StatusCode] extends { content: { "application/json": infer Body } }
//     ? Body
//     : never;

type ResponseBody<T> = T extends { content: { 'application/json': infer Body } }
  ? Body
  : never

export type CompanyList = ResponseBody<
  paths['/companies/']['get']['responses']['200']
>
export type CompanyDetails = ResponseBody<
  paths['/companies/{wikidataId}']['get']['responses']['200']
>
// export type CompanyDetailsUpdate = ResponseBody<paths['/companies/']['post']['responses']['200']>
// export type CompanyIndustryUpdate = ResponseBody<paths['/companies/{wikidataId}/industry']['post']['responses']['200']>

export type Emissions = NonNullable<
  CompanyDetails['reportingPeriods'][number]['emissions']
>
export type ReportingPeriod = NonNullable<
  CompanyDetails['reportingPeriods'][number]
>
export type Goals = NonNullable<CompanyDetails['goals']>
export type Initiatives = NonNullable<CompanyDetails['initiatives']>
export type Scope3 = NonNullable<Emissions['scope3']>
