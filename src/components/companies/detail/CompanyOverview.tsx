import { Building2, ArrowUpRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { EmissionsComparison } from "./EmissionsComparison";
import type { CompanyDetails, ReportingPeriod } from "@/types/company";

interface CompanyOverviewProps {
  company: CompanyDetails;
  selectedPeriod: ReportingPeriod;
  previousPeriod?: ReportingPeriod;
  onYearSelect: (year: string) => void;
  selectedYear: string;
}

export function CompanyOverview({
  company,
  selectedPeriod,
  previousPeriod,
  onYearSelect,
  selectedYear,
}: CompanyOverviewProps) {
  const periodYear = new Date(selectedPeriod.endDate).getFullYear();
  const sectorName =
    company.industry?.industryGics?.sv?.sectorName ||
    company.industry?.industryGics?.en?.sectorName ||
    "Okänd sektor";

  const yearOverYearChange =
    previousPeriod && selectedPeriod.emissions?.calculatedTotalEmissions
      ? ((selectedPeriod.emissions.calculatedTotalEmissions -
          (previousPeriod.emissions?.calculatedTotalEmissions || 0)) /
          (previousPeriod.emissions?.calculatedTotalEmissions || 1)) *
        100
      : null;
  const sortedPeriods = [...company.reportingPeriods].sort(
    (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
  );

  return (
    <div className="bg-black-2 rounded-level-1 p-16">
      <div className="flex items-start justify-between mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Text variant="display">{company.name}</Text>
            {/* Commenting out the Company Chat to be re-implemented and modified later */}
            {/* <CompanyChat companyName={company.name} companyId={company.wikidataId} /> */}
          </div>
          <Text variant="body" className="text-lg max-w-3xl">
            {company.description}
          </Text>
          <div className="flex items-center gap-2 mt-4">
            <Text variant="body" className="text-grey text-lg">
              Sektor:
            </Text>
            <Text variant="body" className="text-lg">
              {sectorName}
            </Text>
          </div>
        </div>
        <div className="flex justify-end">
          <Select value={selectedYear} onValueChange={onYearSelect}>
            <SelectTrigger className="w-[180px] bg-black-1">
              <SelectValue placeholder="Välj år" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Senaste året</SelectItem>
              {sortedPeriods.map((period) => {
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
        <div className="w-16 h-16 rounded-full bg-blue-5/30 flex items-center justify-center">
          <Building2 className="w-8 h-8 text-blue-2" />
        </div>
        
      </div>

      <div className="grid grid-cols-2 gap-16">
        <div>
          <Text variant="body" className="mb-2 text-lg">
            Totala utsläpp {periodYear}
          </Text>
          <div className="flex items-baseline gap-4">
            <Text className="text-6xl font-light text-orange-2 tracking-tighter leading-none">
              {(
                selectedPeriod.emissions?.calculatedTotalEmissions || 0
              ).toLocaleString("sv-SE")}
              <span className="text-2xl ml-2 text-grey">ton CO₂e</span>
            </Text>
            {/* TODO: This is not fully implemented yet, commenting out for now and will pick up in a later milestone */}
            {/* <EmissionsComparison
              emissions={
                selectedPeriod.emissions?.calculatedTotalEmissions || 0
              }
            /> */}
          </div>
        </div>

        <div>
          <Text className="mb-2 text-lg">Förändring sedan förra året</Text>
          <Text className="text-6xl font-light tracking-tighter leading-none">
            {yearOverYearChange !== null ? (
              <span
                className={
                  yearOverYearChange < 0 ? "text-green-3" : "text-pink-3"
                }
              >
                {yearOverYearChange > 0 ? "+" : ""}
                {Math.ceil(yearOverYearChange).toLocaleString("sv-SE")}%
              </span>
            ) : (
              <span className="text-grey">Ingen data</span>
            )}
          </Text>
        </div>
      </div>

      <div className="mt-12 bg-black-1 rounded-level-2 p-8">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <Text className="mb-2 text-lg">Omsättning ({periodYear})</Text>
            <Text className="text-lg">
              {selectedPeriod.economy?.turnover?.value
                ? `${(selectedPeriod.economy.turnover.value / 1e9).toFixed(
                    1
                  )} mdr ${selectedPeriod.economy.turnover.currency}`
                : "Ej rapporterat"}
            </Text>
          </div>

          <div>
            <Text className="text-lg mb-2">Antal anställda ({periodYear})</Text>
            <Text className="text-lg">
              {selectedPeriod.economy?.employees?.value
                ? selectedPeriod.economy.employees.value.toLocaleString("sv-SE")
                : "Ej rapporterat"}
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
  );
}
