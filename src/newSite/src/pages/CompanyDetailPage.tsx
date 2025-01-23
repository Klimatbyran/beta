import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Info, Building2, ArrowUpRight } from 'lucide-react';
import { useCompanyDetails } from '@/hooks/useCompanyDetails';
import { useCompanies } from '@/hooks/useCompanies';
import { EmissionsHistory } from '@/components/companies/EmissionsHistory';
import { SectorComparison } from '@/components/companies/SectorComparison';
import { Scope3Data } from '@/components/companies/Scope3Data';
import { CompanyChat } from '@/components/companies/CompanyChat';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

export function CompanyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { company, loading, error } = useCompanyDetails(id!);
  const { getCompaniesBySector } = useCompanies();
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

  if (!selectedPeriod) {
    return (
      <div className="text-center py-24">
        <Text variant="h3" className="text-red-500 mb-4">
          Ingen rapporteringsperiod hittades
        </Text>
        <Text variant="muted">
          Företaget har inte rapporterat några utsläpp
        </Text>
      </div>
    );
  }

  const periodYear = new Date(selectedPeriod.endDate).getFullYear();
  const sectorCode = company.industry?.industryGics?.sectorCode;
  const sectorCompanies = sectorCode ? getCompaniesBySector(sectorCode) : [];

  // Calculate emissions change percentage
  const currentEmissions = selectedPeriod.emissions?.calculatedTotalEmissions;
  const previousPeriod = sortedPeriods[1];
  const previousEmissions = previousPeriod?.emissions?.calculatedTotalEmissions;
  
  const emissionsChange = previousEmissions && currentEmissions
    ? ((previousEmissions - currentEmissions) / previousEmissions) * 100
    : null;

  // Determine color based on reduction percentage
  const getEmissionsChangeColor = (change: number | null) => {
    if (!change) return 'text-grey';
    if (change >= 7) return 'text-green-3';
    if (change >= 3) return 'text-[#E2FF8D]';
    return 'text-pink-3';
  };

  // Get sector name in Swedish if available, otherwise use English
  const sectorName = company.industry?.industryGics?.sv?.sectorName || 
                    company.industry?.industryGics?.en?.sectorName || 
                    'Okänd sektor';

  // Check if company has scope 3 data
  const hasScope3Data = selectedPeriod.emissions?.scope3?.categories?.length > 0;

  // Get historical scope 3 data for real estate companies
  const isRealEstate = sectorCode === '60';
  const historicalScope3Data = isRealEstate ? sortedPeriods
    .filter(period => period.emissions?.scope3?.categories?.length > 0)
    .map(period => ({
      year: new Date(period.endDate).getFullYear(),
      categories: period.emissions!.scope3!.categories!
    }))
    .sort((a, b) => a.year - b.year) : undefined;

  return (
    <div className="space-y-16 max-w-[1400px] mx-auto">
      {/* Company Header */}
      <div className="bg-black-2 rounded-level-1 p-16">
        <div className="flex items-start justify-between mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Text variant="display">{company.name}</Text>
              <CompanyChat companyName={company.name} companyId={company.wikidataId} />
            </div>
            <Text variant="muted" className="text-lg max-w-3xl">
              {company.description}
            </Text>
            <div className="flex items-center gap-2 mt-4">
              <Text variant="large" className="text-grey">Sektor:</Text>
              <Text variant="large">
                {sectorName}
              </Text>
            </div>
          </div>
          <div className="w-16 h-16 rounded-full bg-blue-5/30 flex items-center justify-center">
            <Building2 className="w-8 h-8 text-blue-2" />
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-16">
          {/* Total Emissions */}
          <div>
            <Text variant="muted" className="mb-2">Totala utsläpp {periodYear}</Text>
            <Text className="text-[64px] font-light text-orange-2 tracking-tighter leading-none">
              {(selectedPeriod.emissions?.calculatedTotalEmissions || 0).toLocaleString()}
              <span className="text-2xl ml-2 text-grey">ton CO₂e</span>
            </Text>
          </div>

          {/* Emissions Change */}
          <div>
            <Text variant="muted" className="mb-2">Förändring sedan förra året</Text>
            <Text className={cn(
              "text-[64px] font-light tracking-tighter leading-none",
              getEmissionsChangeColor(emissionsChange)
            )}>
              {emissionsChange 
                ? `${emissionsChange > 0 ? '+' : ''}${emissionsChange.toFixed(1)}%`
                : 'N/A'}
            </Text>
          </div>
        </div>

        {/* Company Details Box */}
        <div className="mt-12 bg-black-1 rounded-level-2 p-8">
          <div className="grid grid-cols-3 gap-8">
            <div>
              <Text variant="muted" className="mb-2">Omsättning ({periodYear})</Text>
              <Text variant="large">
                {selectedPeriod.economy?.turnover?.value
                  ? `${(selectedPeriod.economy.turnover.value / 1e9).toFixed(1)} mdr ${selectedPeriod.economy.turnover.currency}`
                  : 'Ej rapporterat'}
              </Text>
            </div>
            
            <div>
              <Text variant="muted" className="mb-2">Antal anställda ({periodYear})</Text>
              <Text variant="large">
                {selectedPeriod.economy?.employees?.value
                  ? selectedPeriod.economy.employees.value.toLocaleString()
                  : 'Ej rapporterat'}
              </Text>
            </div>

            {selectedPeriod.reportURL && (
              <div className="flex items-end">
                <a 
                  href={selectedPeriod.reportURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-2 hover:text-blue-1 transition-colors"
                >
                  Läs årsredovisning
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Year Selector */}
      <div className="flex justify-end">
        <Select 
          value={selectedYear} 
          onValueChange={setSelectedYear}
        >
          <SelectTrigger className="w-[180px] bg-black-1">
            <SelectValue placeholder="Välj år" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Senaste året</SelectItem>
            {sortedPeriods.map(period => {
              const year = new Date(period.endDate).getFullYear().toString();
              return (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Emissions History */}
      <EmissionsHistory 
        reportingPeriods={company.reportingPeriods} 
        onYearSelect={setSelectedYear}
      />

      {/* Scope 3 Data */}
      {hasScope3Data && (
        <Scope3Data 
          emissions={selectedPeriod.emissions!}
          year={periodYear}
          isRealEstate={isRealEstate}
          historicalData={historicalScope3Data}
        />
      )}

      {/* Sector Comparison */}
      {sectorCode && (
        <SectorComparison 
          currentCompany={company}
          sectorCompanies={sectorCompanies}
        />
      )}
    </div>
  );
}