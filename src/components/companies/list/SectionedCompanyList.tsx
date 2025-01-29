import { CompanyCard } from './CompanyCard'
import type { RankedCompany } from '@/types/company'

// GICS sector names mapping
const sectorNames: Record<string, string> = {
  '10': 'Energi',
  '15': 'Material',
  '20': 'Industri',
  '25': 'Sällanköpsvaror',
  '30': 'Dagligvaror',
  '35': 'Hälsovård',
  '40': 'Finans',
  '45': 'IT',
  '50': 'Kommunikation',
  '55': 'Kraftförsörjning',
  '60': 'Fastigheter',
}

// Order sectors by code
const sectorOrder = [
  '10',
  '15',
  '20',
  '25',
  '30',
  '35',
  '40',
  '45',
  '50',
  '55',
  '60',
]

interface SectionedCompanyListProps {
  companies: RankedCompany[]
  sortBy: string
}

export function SectionedCompanyList({
  companies,
  sortBy,
}: SectionedCompanyListProps) {
  // Group companies by sector
  const companiesBySector = companies.reduce(
    (acc, company) => {
      const sectorCode = company.industry?.industryGics?.sectorCode || 'unknown'
      if (!acc[sectorCode]) {
        acc[sectorCode] = []
      }
      acc[sectorCode].push(company)
      return acc
    },
    {} as Record<string, RankedCompany[]>,
  )

  // Sort sectors by predefined order
  const sortedSectors = Object.keys(companiesBySector).sort((a, b) => {
    const indexA = sectorOrder.indexOf(a)
    const indexB = sectorOrder.indexOf(b)
    if (indexA === -1) return 1
    if (indexB === -1) return -1
    return indexA - indexB
  })

  // Sort companies within each sector based on the selected sort option
  Object.keys(companiesBySector).forEach((sector) => {
    companiesBySector[sector].sort((a, b) => {
      switch (sortBy) {
        case 'emissions_reduction':
          return b.metrics.emissionsReduction - a.metrics.emissionsReduction
        case 'emissions':
          return (
            (b.reportingPeriods[0]?.emissions?.calculatedTotalEmissions || 0) -
            (a.reportingPeriods[0]?.emissions?.calculatedTotalEmissions || 0)
          )
        case 'turnover':
          return (
            (b.reportingPeriods[0]?.economy?.turnover?.value || 0) -
            (a.reportingPeriods[0]?.economy?.turnover?.value || 0)
          )
        case 'employees':
          return (
            (b.reportingPeriods[0]?.economy?.employees?.value || 0) -
            (a.reportingPeriods[0]?.economy?.employees?.value || 0)
          )
        case 'name':
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })
  })

  return (
    <div className="space-y-16">
      {sortedSectors.map((sectorCode) => {
        const sectorCompanies = companiesBySector[sectorCode]
        if (!sectorCompanies?.length) return null

        return (
          <section key={sectorCode} className="space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-light">
                {sectorNames[sectorCode] || 'Övriga företag'}
              </h2>
              <span className="text-grey">
                {sectorCompanies.length} företag
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sectorCompanies.map((company, index) => (
                <div
                  key={company.wikidataId}
                  className="transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(153,207,255,0.15)]"
                >
                  <CompanyCard
                    {...company}
                    rankings={{
                      ...company.rankings,
                      sector: `${index + 1}/${sectorCompanies.length}`,
                    }}
                  />
                </div>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
