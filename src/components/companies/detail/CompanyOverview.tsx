import { Building2, ArrowUpRight } from 'lucide-react'
import { Text } from '@/components/ui/text'
import { CompanyChat } from './CompanyChat'
import { EmissionsComparison } from './EmissionsComparison'
import type { CompanyDetails, ReportingPeriod } from '@/types/company'

interface CompanyOverviewProps {
  company: CompanyDetails
  selectedPeriod: ReportingPeriod
}

export function CompanyOverview({
  company,
  selectedPeriod,
}: CompanyOverviewProps) {
  const periodYear = new Date(selectedPeriod.endDate).getFullYear()
  const sectorName =
    company.industry?.industryGics?.sv?.sectorName ||
    company.industry?.industryGics?.en?.sectorName ||
    'Okänd sektor'

  return (
    <div className="bg-black-2 rounded-level-1 p-16">
      <div className="flex items-start justify-between mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Text variant="display">{company.name}</Text>
            <CompanyChat
              companyName={company.name}
              companyId={company.wikidataId}
            />
          </div>
          <Text variant="muted" className="text-lg max-w-3xl">
            {company.description}
          </Text>
          <div className="flex items-center gap-2 mt-4">
            <Text variant="large" className="text-grey">
              Sektor:
            </Text>
            <Text variant="large">{sectorName}</Text>
          </div>
        </div>
        <div className="w-16 h-16 rounded-full bg-blue-5/30 flex items-center justify-center">
          <Building2 className="w-8 h-8 text-blue-2" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-16">
        <div>
          <Text variant="muted" className="mb-2">
            Totala utsläpp {periodYear}
          </Text>
          <div className="flex items-baseline gap-4">
            <Text className="text-[64px] font-light text-orange-2 tracking-tighter leading-none">
              {(
                selectedPeriod.emissions?.calculatedTotalEmissions || 0
              ).toLocaleString()}
              <span className="text-2xl ml-2 text-grey">ton CO₂e</span>
            </Text>
            <EmissionsComparison
              emissions={
                selectedPeriod.emissions?.calculatedTotalEmissions || 0
              }
            />
          </div>
        </div>

        <div>
          <Text variant="muted" className="mb-2">
            Förändring sedan förra året
          </Text>
          <Text className="text-[64px] font-light text-pink-3 tracking-tighter leading-none">
            +3.2%
          </Text>
        </div>
      </div>

      <div className="mt-12 bg-black-1 rounded-level-2 p-8">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <Text variant="muted" className="mb-2">
              Omsättning ({periodYear})
            </Text>
            <Text variant="large">
              {selectedPeriod.economy?.turnover?.value
                ? `${(selectedPeriod.economy.turnover.value / 1e9).toFixed(1)} mdr ${selectedPeriod.economy.turnover.currency}`
                : 'Ej rapporterat'}
            </Text>
          </div>

          <div>
            <Text variant="muted" className="mb-2">
              Antal anställda ({periodYear})
            </Text>
            <Text variant="large">
              {selectedPeriod.economy?.employees?.value
                ? selectedPeriod.economy.employees.value.toLocaleString()
                : 'Ej rapporterat'}
            </Text>
          </div>

          {selectedPeriod.reportURL && (
            <div className="flex items-end">
              <a
                href={selectedPeriod.reportURL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-2 hover:text-blue-1 transition-colors"
              >
                Läs årsredovisning
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
