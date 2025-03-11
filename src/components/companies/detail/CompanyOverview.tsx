import { Building2, ArrowUpRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import type { CompanyDetails, ReportingPeriod } from "@/types/company";
import { useTranslation } from "react-i18next";
import { useScreenSize } from "@/hooks/useScreenSize";
import { useState } from "react";
import { CompanyChat } from "./CompanyChat";

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
  const { t } = useTranslation();
  const isMobile = useScreenSize();
  const [showMore, setShowMore] = useState(false);

  const periodYear = new Date(selectedPeriod.endDate).getFullYear();
  const sectorName =
    company.industry?.industryGics?.sv?.sectorName ||
    company.industry?.industryGics?.en?.sectorName ||
    t("company.unknownSector");

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
    <div className="bg-black-2 rounded-level-1 p-16 md:p-8 sm:p-4">
      <div className="flex flex-col md:flex-row items-start justify-between mb-12">
        <div className="space-y-4 w-full">
          <div className="flex flex-wrap items-center gap-4">
            <Text
              variant="display"
              className="text-4xl md:text-3xl sm:text-2xl"
            >
              {company.name}
            </Text>
            {/* <div className="flex items-end"> */}
              <CompanyChat title="Chatta med Garbo" company={company} selectedPeriod={selectedPeriod} />
            {/* </div> */}
          </div>
          {isMobile ? (
            <div>
              <button
                className="bg-black-1 text-white px-3 py-1 rounded-md mt-1 text-sm"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore
                  ? t("companies.overview.readLess")
                  : t("companies.overview.readMore")}
              </button>
              {showMore && (
                <Text
                  variant="body"
                  className="text-lg md:text-base sm:text-sm max-w-3xl mt-2"
                >
                  {company.description}
                </Text>
              )}
            </div>
          ) : (
            <Text
              variant="body"
              className="text-lg md:text-base sm:text-sm max-w-3xl"
            >
              {company.description}
            </Text>
          )}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-4">
            <Text
              variant="body"
              className="text-grey text-lg md:text-base sm:text-sm"
            >
              {t("companies.overview.sector")}:
            </Text>
            <Text variant="body" className="text-lg md:text-base sm:text-sm">
              {sectorName}
            </Text>
          </div>
          <div className="mt-4 w-full max-w-[180px]">
            <Select value={selectedYear} onValueChange={onYearSelect}>
              <SelectTrigger className="w-full bg-black-1 text-white px-3 py-2 rounded-md">
                <SelectValue placeholder={t("companies.overview.selectYear")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">
                  {t("companies.overview.latestYear")}
                </SelectItem>
                {sortedPeriods.map((period) => {
                  const year = new Date(period.endDate)
                    .getFullYear()
                    .toString();
                  return (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="hidden md:flex w-16 h-16 rounded-full bg-blue-5/30 items-center justify-center">
          <Building2 className="w-8 h-8 sm:w-6 sm:h-6 text-blue-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        <div>
          <Text variant="body" className="mb-2 lg:text-lg md:text-base sm:text-sm">
            {t("companies.overview.totalEmissions")} {periodYear}
          </Text>
          <div className="flex items-baseline gap-4">
            <Text className="lg:text-6xl md:text-4xl sm:text-3xl font-light text-orange-2 tracking-tighter leading-none">
              {(
                selectedPeriod.emissions?.calculatedTotalEmissions || 0
              ).toLocaleString("sv-SE")}
              <span className="lg:text-2xl md:text-lg sm:text-sm ml-2 text-grey">
                {t("companies.overview.tonsCO2e")}
              </span>
            </Text>
          </div>
        </div>

        <div>
          <Text className="mb-2 lg:text-lg md:text-base sm:text-sm">
            {t("companies.overview.changeSinceLastYear")}
          </Text>
          <Text className="lg:text-6xl md:text-4xl sm:text-3xl font-light tracking-tighter leading-none">
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
              <span className="text-grey">
                {t("companies.overview.noData")}
              </span>
            )}
          </Text>
        </div>
      </div>

      <div className="mt-12 bg-black-1 rounded-level-2 p-8 md:p-6 sm:p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Text className="mb-2 text-lg md:text-base sm:text-sm">
              {t("companies.overview.turnover")} ({periodYear})
            </Text>
            <Text className="text-lg md:text-base sm:text-sm">
              {selectedPeriod.economy?.turnover?.value
                ? `${(selectedPeriod.economy.turnover.value / 1e9).toFixed(
                    1
                  )} mdr ${selectedPeriod.economy.turnover.currency}`
                : t("company.notReported")}
            </Text>
          </div>

          <div>
            <Text className="text-lg md:text-base sm:text-sm mb-2">
              {t("companies.overview.employees")} ({periodYear})
            </Text>
            <Text className="text-lg md:text-base sm:text-sm">
              {selectedPeriod.economy?.employees?.value
                ? selectedPeriod.economy.employees.value.toLocaleString("sv-SE")
                : t("company.notReported")}
            </Text>
          </div>

          {selectedPeriod?.reportURL && (
            <div className="flex items-end">
              <a
                href={selectedPeriod.reportURL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-2 hover:text-blue-1 transition-colors"
              >
                {t("companies.overview.readAnnualReport")}
                <ArrowUpRight className="w-4 h-4 sm:w-3 sm:h-3" />
              </a>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
