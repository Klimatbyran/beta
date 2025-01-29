import { MunicipalityComparisonList } from './MunicipalityComparisonList';
import type { Municipality } from '@/types/municipality';

interface BudgetComparisonProps {
  municipalities: Municipality[];
  className?: string;
}

export function BudgetComparison({ municipalities, className }: BudgetComparisonProps) {
  const comparisonData = municipalities.map(municipality => ({
    id: municipality.id,
    name: municipality.name,
    value: municipality.emissionBudget[2024] || 0,
    unit: 'ton CO₂e',
    change: municipality.historicalEmissionChangePercent,
  }));

  return (
    <MunicipalityComparisonList
      title="Utsläppsbudget"
      description="Jämförelse av kommunernas återstående koldioxidbudget enligt Parisavtalet."
      municipalities={comparisonData}
      formatValue={(value) => value.toLocaleString()}
      className={className}
    />
  );
}
