import { Link } from "react-router-dom";
import {
  Building2,
  TrendingDown,
  Users,
  Wallet,
  ArrowUpRight,
  Info,
  FileText,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getCategoryColor, sectorNames } from "@/lib/constants/emissions";
import type { RankedCompany } from "@/types/company";
import { Text } from "@/components/ui/text";

type CompanyCardProps = RankedCompany;

export function CompanyCard({
  wikidataId,
  name,
  description,
  industry,
  reportingPeriods,
}: CompanyCardProps) {
  const latestPeriod = reportingPeriods[0];
  const previousPeriod = reportingPeriods[1];

  const currentEmissions = latestPeriod?.emissions?.calculatedTotalEmissions;
  const previousEmissions = previousPeriod?.emissions?.calculatedTotalEmissions;
  const emissionsChange =
    previousEmissions && currentEmissions
      ? ((currentEmissions - previousEmissions) / previousEmissions) * 100
      : null;

  const employeeCount = latestPeriod?.economy?.employees?.value;
  const formattedEmployeeCount = employeeCount
    ? employeeCount.toLocaleString()
    : "N/A";

  const sectorName = industry?.industryGics?.sectorCode
    ? sectorNames[industry.industryGics.sectorCode]
    : "Okänd sektor";

  // Find the largest scope 3 category
  const scope3Categories = latestPeriod?.emissions?.scope3?.categories || [];
  const largestCategory = scope3Categories.reduce(
    (max, current) => (current.total > (max?.total || 0) ? current : max),
    scope3Categories[0]
  );

  // Get the color for the largest category
  const categoryColor = largestCategory
    ? getCategoryColor(largestCategory.category)
    : "var(--blue-2)";

  return (
    <div className="relative rounded-level-2">
      <Link
        to={`/companies/${wikidataId}`}
        className="block bg-black-2 rounded-level-2 p-8 space-y-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(153,207,255,0.15)] hover:bg-[#1a1a1a]"
      >
        <div className="flex items-start justify-between rounded-level-2">
          <div className="space-y-2">
            <h2 className="text-3xl font-light">{name}</h2>
            {/* {rankings && (
            <div className="flex flex-wrap gap-4 text-sm text-grey">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <span>#{rankings.overall} totalt</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ranking bland alla företag</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <span>#{rankings.sector} inom {sectorName}</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ranking inom {sectorName.toLowerCase()}-sektorn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <span>#{rankings.category} i kategorin</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ranking inom företag av liknande storlek</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )} */}
            <p className="text-grey text-sm line-clamp-2">{description}</p>
          </div>
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: `color-mix(in srgb, ${categoryColor} 30%, transparent)`,
              color: categoryColor,
            }}
          >
            <Building2 className="w-6 h-6" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {currentEmissions && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-grey mb-2">
                <TrendingDown className="w-4 h-4" />
                <span className="text-lg">Utsläpp</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Totala utsläpp (Scope 1 & 2)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-6xl font-light text-orange-3">
                {(currentEmissions / 1000).toFixed(1)}k
                <span className="text-lg text-grey ml-1">tCO₂e</span>
              </div>
            </div>
          )}
          {currentEmissions && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-grey mb-2">
                <TrendingDown className="w-4 h-4" />
                <span className="text-lg">Rate of Change</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Rate of emissions change from previous reporting period
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-6xl font-light text-orange-3">
                {emissionsChange && (
                  <span
                    className={` ml-2 ${
                      emissionsChange < 0 ? "text-green-3" : "text-pink-3"
                    }`}
                  >
                    {emissionsChange > 0 ? "+" : ""}
                    {emissionsChange.toFixed(1)}%
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black-1">
          {latestPeriod?.economy?.turnover && (
            <div>
              <Text
                variant="body"
                className="flex items-center gap-2 text-grey mb-2"
              >
                <Wallet className="w-4 h-4" />
                <span> Omsättning</span>
              </Text>
              <Text variant="large">
                {latestPeriod.economy.turnover.value
                  ? (latestPeriod.economy.turnover.value / 1e9).toFixed(1)
                  : "N/A"}{" "}
                mdr
                <span className="text-xs text-grey ml-1">
                  {latestPeriod.economy.turnover.currency}
                </span>
              </Text>
            </div>
          )}
          {latestPeriod?.economy?.employees && (
            <div>
              <Text
                variant="body"
                className="flex items-center gap-2 text-grey mb-2"
              >
                <Users className="w-4 h-4" /> <span>Anställda</span>
              </Text>
              <Text variant="large">{formattedEmployeeCount}</Text>
            </div>
          )}
        </div>
        {/* Climate Plan */}
        {latestPeriod.reportURL && (
          <a
            href={latestPeriod.reportURL}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-black-1 rounded-level-2 p-4 hover:bg-black-1/80 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <Text variant="large" className="flex items-center gap-2 text-white mb-2">
                  <FileText className="w-4 h-4 text-white" />
                  <span>Company Report</span>
                </Text>
                <Text variant="muted">
                  {latestPeriod.reportURL === "Saknar report"
                    ? "Saknar report"
                    : ``}
                </Text>
              </div>
              <ArrowUpRight className="w-6 h-6" />
            </div>
          </a>
        )}
        {/* ---original styling-----
        <div className="grid grid-cols-2 gap-4">
          {currentEmissions && (
            <div className="bg-black-1 rounded-level-2 p-4">
              <div className="flex items-center gap-2 text-grey mb-2">
                <TrendingDown className="w-4 h-4" />
                <span className="text-xs">Utsläpp</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Totala utsläpp (Scope 1 & 2)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-3xl font-light">
                <span className="text-orange-3">
                  {(currentEmissions / 1000).toFixed(1)}k
                </span>
                <span className="text-lg text-grey ml-1">tCO₂e</span>
              </div>
            </div>
          )}
          {currentEmissions && (
            <div className="bg-black-1 rounded-level-2 p-4">
              <div className="flex items-center gap-2 text-grey mb-2">
                <TrendingDown className="w-4 h-4" />
                <span className="text-xs">Rate of Change</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Rate of emissions change from previous reporting period
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-lg font-light">
                {emissionsChange && (
                  <span
                    className={`text-3xl ml-2 ${
                      emissionsChange < 0 ? "text-green-3" : "text-pink-3"
                    }`}
                  >
                    {emissionsChange > 0 ? "+" : ""}
                    {emissionsChange.toFixed(1)}%
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {latestPeriod?.economy?.turnover && (
            <div className="bg-black-1 rounded-level-2 p-4">
              <div className="flex items-center gap-2 text-grey mb-2">
                <Wallet className="w-4 h-4" />
                <span className="text-xs">Omsättning</span>
              </div>
              <div className="text-lg font-light">
                {latestPeriod.economy.turnover.value
                  ? (latestPeriod.economy.turnover.value / 1e9).toFixed(1)
                  : "N/A"}{" "}
                mdr
                <span className="text-xs text-grey ml-1">
                  {latestPeriod.economy.turnover.currency}
                </span>
              </div>
            </div>
          )}

          {latestPeriod?.economy?.employees && (
            <div className="bg-black-1 rounded-level-2 p-4">
              <div className="flex items-center gap-2 text-grey mb-2">
                <Users className="w-4 h-4" />
                <span className="text-xs">Anställda</span>
              </div>
              <div className="text-lg font-light">{formattedEmployeeCount}</div>
            </div>
          )}
        </div>
        {latestPeriod?.reportURL && (
          <div
            onClick={(e) => {
              e.preventDefault();
              window.open(
                latestPeriod.reportURL || "",
                "_blank",
                "noopener,noreferrer"
              );
            }}
            className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors cursor-pointer"
            style={{ color: categoryColor }}
          >
            <FileText className="w-4 h-4 text-white" />
            Company Report
            <ArrowUpRight className="w-4 h-4" />
          </div>
        )} */}
      </Link>
    </div>
  );
}
