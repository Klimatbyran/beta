import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useCompanyDetails } from '@/hooks/useCompanyDetails';
import { Text } from "@/components/ui/text";
import { CompanyEditHeader } from '@/components/companies/edit/CompanyEditHeader';

export function CompanyEditPage() {
  const { id } = useParams<{ id: string }>();
  const { company, loading, error } = useCompanyDetails(id!);
  const [selectedYear, setSelectedYear] = useState<string>('latest');

  if (loading) {
    return (
      <div className="animate-pulse space-y-16">
        <div className="h-12 w-1/3 bg-black-1 rounded" />
        <div className="h-96 bg-black-1 rounded-level-1" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-24">
        <Text variant="h3" className="text-red-500 mb-4">
          Det gick inte att hämta företagsinformation
        </Text>
        <Text variant="muted">Försök igen senare</Text>
      </div>
    );
  }

  if (!company || !company.reportingPeriods.length) {
    return (
      <div className="text-center py-24">
        <Text variant="h3" className="text-red-500 mb-4">
          Företaget kunde inte hittas
        </Text>
        <Text variant="muted">
          Kontrollera att företags-ID:t är korrekt
        </Text>
      </div>
    );
  }

  const sortedPeriods = [...company.reportingPeriods].sort(
    (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
  );

  const selectedPeriod = selectedYear === 'latest' 
    ? sortedPeriods[0]
    : sortedPeriods.find(p => new Date(p.endDate).getFullYear().toString() === selectedYear) || sortedPeriods[0];

  return (
    <div className="space-y-16 max-w-[1400px] mx-auto">
      <CompanyEditHeader 
        company={company} 
        selectedYear={selectedYear}
        onYearSelect={setSelectedYear}
      />
    </div>
  );
}