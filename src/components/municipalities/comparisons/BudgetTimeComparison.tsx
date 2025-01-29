import { MunicipalityComparisonList } from './MunicipalityComparisonList'
import type { Municipality } from '@/types/municipality'

interface BudgetTimeComparisonProps {
  municipalities: Municipality[]
  className?: string
}

export function BudgetTimeComparison({
  municipalities,
  className,
}: BudgetTimeComparisonProps) {
  const comparisonData = municipalities.map((municipality) => ({
    id: municipality.name,
    name: municipality.name,
    value: new Date(municipality.budgetRunsOut).getFullYear(),
    unit: '',
    change: municipality.historicalEmissionChangePercent,
  }))

  return (
    <MunicipalityComparisonList
      title="Budget räcker till"
      description="När tar kommunernas koldioxidbudget slut med nuvarande utsläppstakt?"
      municipalities={comparisonData}
      formatValue={(value) => value.toString()}
      className={className}
    />
  )
}
