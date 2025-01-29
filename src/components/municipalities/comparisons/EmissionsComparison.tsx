import { MunicipalityComparisonList } from './MunicipalityComparisonList'
import type { Municipality } from '@/types/municipality'

interface EmissionsComparisonProps {
  municipalities: Municipality[]
  className?: string
}

export function EmissionsComparison({
  municipalities,
  className,
}: EmissionsComparisonProps) {
  const comparisonData = municipalities.map((municipality) => ({
    id: municipality.id,
    name: municipality.name,
    value: municipality.trendEmission,
    unit: 'ton CO₂e',
    change: municipality.historicalEmissionChangePercent,
  }))

  return (
    <MunicipalityComparisonList
      title="Historiska utsläpp"
      description="Jämförelse av kommunernas territoriella utsläpp inom kommunens gränser. Data från 2022."
      municipalities={comparisonData}
      formatValue={(value) => value.toLocaleString()}
      className={className}
    />
  )
}
