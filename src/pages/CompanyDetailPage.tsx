import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useCompanyDetails } from '@/hooks/useCompanyDetails'
import { CompanyOverview } from '@/components/companies/detail/CompanyOverview'
import { CompanyHistory } from '@/components/companies/detail/CompanyHistory'
import { CompanyScope3 } from '@/components/companies/detail/CompanyScope3'
import { EmissionsBubbleChart } from '@/components/companies/detail/EmissionsBubbleChart'
import { CompanySectorComparison } from '@/components/companies/detail/CompanySectorComparison'
import { CompanyGoals } from '@/components/companies/detail/CompanyGoals'
import { Text } from '@/components/ui/text'

export function CompanyDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { company, loading, error } = useCompanyDetails(id!)
  const [selectedYear, setSelectedYear] = useState<string>('latest')

  if (loading) {
    return (
      <div className="animate-pulse space-y-16">
        <div className="h-12 w-1/3 bg-black-1 rounded" />
        <div className="h-96 bg-black-1 rounded-level-1" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-24">
        <Text variant="h3" className="text-red-500 mb-4">
          Det gick inte att hämta företagsinformation
        </Text>
        <Text variant="muted">Försök igen senare</Text>
      </div>
    )
  }

  if (!company || !company.reportingPeriods.length) {
    return (
      <div className="text-center py-24">
        <Text variant="h3" className="text-red-500 mb-4">
          Företaget kunde inte hittas
        </Text>
        <Text variant="muted">Kontrollera att företags-ID:t är korrekt</Text>
      </div>
    )
  }

  const sortedPeriods = [...company.reportingPeriods].sort(
    (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime(),
  )

  const selectedPeriod =
    selectedYear === 'latest'
      ? sortedPeriods[0]
      : sortedPeriods.find(
          (p) => new Date(p.endDate).getFullYear().toString() === selectedYear,
        ) || sortedPeriods[0]

  return (
    <div className="space-y-16 max-w-[1400px] mx-auto">
      <CompanyOverview company={company} selectedPeriod={selectedPeriod} />

      <CompanyHistory
        company={company}
        selectedYear={selectedYear}
        onYearSelect={setSelectedYear}
      />

      <EmissionsBubbleChart emissions={selectedPeriod.emissions!} />

      <CompanyScope3
        emissions={selectedPeriod.emissions!}
        year={new Date(selectedPeriod.endDate).getFullYear()}
        isRealEstate={company.industry?.industryGics?.sectorCode === '60'}
        historicalData={sortedPeriods
          .filter((period) => period.emissions?.scope3?.categories?.length > 0)
          .map((period) => ({
            year: new Date(period.endDate).getFullYear(),
            categories: period.emissions!.scope3!.categories!,
          }))
          .sort((a, b) => a.year - b.year)}
      />

      {company.goals && <CompanyGoals goals={company.goals} />}

      <CompanySectorComparison company={company} />
    </div>
  )
}
