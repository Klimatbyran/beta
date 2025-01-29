import { MunicipalityComparisonList } from './MunicipalityComparisonList';
import type { Municipality } from '@/types/municipality';

interface NetZeroComparisonProps {
  municipalities: Municipality[];
  className?: string;
}

export function NetZeroComparison({ municipalities, className }: NetZeroComparisonProps) {
  const comparisonData = municipalities.map(municipality => ({
    id: municipality.id,
    name: municipality.name,
    value: parseInt(municipality.hitNetZero.split("-")[0]),
    unit: '',
    change: municipality.historicalEmissionChangePercent,
  }));

  return (
    <MunicipalityComparisonList
      title="Nettonoll-mål"
      description="När når kommunerna nettonoll enligt nuvarande utveckling?"
      municipalities={comparisonData}
      formatValue={(value) => value.toString()}
      className={className}
    />
  );
}
