import { Scope3Data } from './Scope3Data';
import type { Emissions, Scope3HistoricalData } from '@/types/company';

interface CompanyScope3Props {
  emissions: Emissions;
  year: number;
  isRealEstate: boolean;
  historicalData?: Scope3HistoricalData[];
}

export function CompanyScope3({ emissions, year, isRealEstate, historicalData }: CompanyScope3Props) {
  if (!emissions?.scope3?.categories?.length) {
    return null;
  }

  return (
    <Scope3Data 
      emissions={emissions}
      year={year}
      isRealEstate={isRealEstate}
      historicalData={historicalData}
    />
  );
}