import type { paths } from '@/lib/api-types';

// Base company type from API
export type CompanyDetails = NonNullable<paths['/companies/{wikidataId}']['get']['responses'][200]['content']['application/json']>;

// Common emissions type used across components
export interface Emissions {
  scope1And2?: { total: number; unit: string } | null;
  scope1?: { total: number; unit: string } | null;
  scope2?: { 
    mb?: number | null;
    lb?: number | null;
    unknown?: number | null;
    unit: string;
    calculatedTotalEmissions: number;
  } | null;
  scope3?: { 
    total: number; 
    unit: string;
    categories?: Array<{
      category: number;
      total: number;
      unit: string;
      isInterpolated?: boolean;
    }>;
    calculatedTotalEmissions: number;
  } | null;
  biogenicEmissions?: { total: number; unit: string } | null;
  calculatedTotalEmissions: number;
}

// Common reporting period type
export interface ReportingPeriod {
  id: string;
  startDate: string;
  endDate: string;
  reportURL: string | null;
  emissions: Emissions | null;
  economy: {
    turnover: { value: number; currency: string } | null;
    employees: { value: number; unit: string } | null;
  } | null;
}

// Extended company type with metrics and rankings
export interface RankedCompany extends CompanyDetails {
  rankings: {
    overall: string;
    sector: string;
    category: string;
  };
  metrics: {
    emissionsReduction: number;
    displayReduction: string;
  };
}

// Scope 3 historical data type
export interface Scope3HistoricalData {
  year: number;
  categories: Array<{
    category: number;
    total: number;
    unit: string;
  }>;
}