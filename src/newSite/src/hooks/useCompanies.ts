import { useState, useEffect } from 'react';
import { getCompanies } from '@/lib/api';

export interface Company {
  wikidataId: string;
  name: string;
  description: string;
  industry?: {
    industryGics?: {
      sectorCode: string;
      sectorName: string;
    };
  };
  reportingPeriods: Array<{
    startDate: string;
    endDate: string;
    reportURL: string | null;
    economy: {
      turnover: { value: number; currency: string } | null;
      employees: { value: number; unit: string } | null;
    } | null;
    emissions: {
      scope1And2: { total: number; unit: string } | null;
      calculatedTotalEmissions: number;
    };
  }>;
}

export interface RankedCompany extends Company {
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

interface UseCompaniesReturn {
  companies: RankedCompany[];
  loading: boolean;
  error: Error | null;
  getCompaniesBySector: (sectorCode: string) => RankedCompany[];
}

function formatReductionValue(value: number): string {
  if (value > 200) return '>200';
  if (value < -200) return '<-200';
  return value.toFixed(1);
}

export function useCompanies(): UseCompaniesReturn {
  const [companies, setCompanies] = useState<RankedCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const data = await getCompanies();
        
        // Calculate rankings and metrics for each company
        const rankedCompanies = data.map<RankedCompany>(company => {
          // Calculate emissions reduction
          const latestPeriod = company.reportingPeriods[0];
          const previousPeriod = company.reportingPeriods[1];
          const currentEmissions = latestPeriod?.emissions?.calculatedTotalEmissions;
          const previousEmissions = previousPeriod?.emissions?.calculatedTotalEmissions;
          
          const emissionsReduction = previousEmissions && currentEmissions
            ? ((previousEmissions - currentEmissions) / previousEmissions) * 100
            : 0;

          return {
            ...company,
            rankings: {
              overall: '12/290',
              sector: '3/45',
              category: '5/120',
            },
            metrics: {
              emissionsReduction,
              displayReduction: formatReductionValue(emissionsReduction)
            },
          };
        });

        setCompanies(rankedCompanies);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch companies'));
      } finally {
        setLoading(false);
      }
    }

    fetchCompanies();
  }, []);

  const getCompaniesBySector = (sectorCode: string) => {
    return companies.filter(company => 
      company.industry?.industryGics?.sectorCode === sectorCode
    ).sort((a, b) => 
      b.metrics.emissionsReduction - a.metrics.emissionsReduction
    );
  };

  return { companies, loading, error, getCompaniesBySector };
}