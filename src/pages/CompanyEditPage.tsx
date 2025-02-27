import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useCompanyDetails } from '@/hooks/useCompanyDetails';
import { Text } from "@/components/ui/text";
import { CompanyEditHeader } from '@/components/companies/edit/CompanyEditHeader';
import { CompanyEditPeriod } from '@/components/companies/edit/CompanyEditPeriod';
import { CompanyEditScope1 } from '@/components/companies/edit/CompanyEditScope1';
import { CompanyEditScope2 } from '@/components/companies/edit/CompanyEditScope2';
import { CompanyEditScope3 } from '@/components/companies/edit/CompanyEditScope3';
import { CompanyDetails } from '@/types/company';

export function CompanyEditPage() {
  const { id } = useParams<{ id: string }>();
  const { company, loading, error } = useCompanyDetails(id!);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);

  const selectedPeriods = company !== undefined ? selectedYears.reduce((periods, year) => {
    const period =  [...company.reportingPeriods].find(
      (reportingPeriod) =>
        new Date(reportingPeriod.endDate).getFullYear().toString() ===
        year)
      if(period !== undefined) {
        periods.push(period);
      } 
      return periods;
  }, [] as CompanyDetails["reportingPeriods"]) : [];

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

  return (
    <div className="space-y-16 max-w-[1400px] mx-auto">
      <div className="bg-black-2 rounded-level-1 p-16">
      <CompanyEditHeader 
        company={company} 
        selectedYears={selectedYears}
        onYearsSelect={setSelectedYears}
      />
      {selectedPeriods !== null && selectedPeriods.length > 0 && (
        <>
        <CompanyEditPeriod periods={selectedPeriods}></CompanyEditPeriod>
        <CompanyEditScope1 periods={selectedPeriods}></CompanyEditScope1>
        <CompanyEditScope2 periods={selectedPeriods}></CompanyEditScope2>
        <CompanyEditScope3 periods={selectedPeriods}></CompanyEditScope3>
        </>
      )}
      </div>
    </div>
  );
}