import { MunicipalityComparisonList } from './MunicipalityComparisonList';
import type { Municipality } from '@/types/municipality';

interface ReductionComparisonProps {
  municipalities: Municipality[];
  className?: string;
}

export function ReductionComparison({ municipalities, className }: ReductionComparisonProps) {
  const comparisonData = municipalities.map(municipality => ({
    id: municipality.id,
    name: municipality.name,
    value: municipality.neededEmissionChangePercent,
    unit: '%',
    change: municipality.historicalEmissionChangePercent,
  }));

  return (
    <MunicipalityComparisonList
      title="Årlig minskning som krävs"
      description="Hur mycket måste kommunernas utsläpp minska varje år för att klara Parisavtalet?"
      municipalities={comparisonData}
      formatValue={(value) => value.toFixed(1)}
      className={className}
    />
  );
}
