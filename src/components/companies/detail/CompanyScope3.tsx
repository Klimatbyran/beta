import { Scope3Data } from "./Scope3Data";
import type { Emissions, Scope3HistoricalData } from "@/types/company";

interface CompanyScope3Props {
  emissions: Emissions;
  year: number;
  isRealEstate: boolean;
  historicalData?: Scope3HistoricalData[];
}

export function CompanyScope3({
  emissions,
  year,
  isRealEstate,
  historicalData,
}: CompanyScope3Props) {
  if (!emissions?.scope3?.categories?.length) {
    return null;
  }

  // Transform emissions to match the expected format for Scope3Data
  const transformedEmissions = {
    ...emissions,
    scope3: emissions.scope3
      ? {
          total: emissions.scope3.calculatedTotalEmissions,
          unit: emissions.scope3.statedTotalEmissions?.unit || "tCO2e",
          categories: emissions.scope3.categories,
        }
      : null,
  };

  return (
    <Scope3Data
      emissions={transformedEmissions}
      year={year}
      isRealEstate={isRealEstate}
      historicalData={historicalData}
    />
  );
}
