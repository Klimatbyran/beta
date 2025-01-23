import { useState, useEffect } from 'react';
import { getCompanyDetails } from '@/lib/api';
import type { paths } from '@/lib/api-types';

type CompanyDetails = NonNullable<paths['/companies/{wikidataId}']['get']['responses'][200]['content']['application/json']>;

interface UseCompanyDetailsReturn {
  company: CompanyDetails | null;
  loading: boolean;
  error: Error | null;
}

export function useCompanyDetails(id: string): UseCompanyDetailsReturn {
  const [company, setCompany] = useState<CompanyDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCompanyDetails() {
      try {
        setLoading(true);
        const data = await getCompanyDetails(id);
        if (data === null) {
          throw new Error('Company not found');
        }
        setCompany(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch company details'));
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchCompanyDetails();
    }
  }, [id]);

  return { company, loading, error };
}