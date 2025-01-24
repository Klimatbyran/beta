import { Link } from 'react-router-dom';
import { Building2, TrendingDown, Users, Wallet, ArrowUpRight, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getCategoryColor, sectorNames } from '@/lib/constants/emissions';
import type { RankedCompany } from '@/types/company';

type CompanyCardProps = RankedCompany;

export function CompanyCard({
  wikidataId,
  name,
  description,
  industry,
  reportingPeriods,
  rankings,
}: CompanyCardProps) {
  const latestPeriod = reportingPeriods[0];
  const previousPeriod = reportingPeriods[1];
  
  const currentEmissions = latestPeriod?.emissions?.calculatedTotalEmissions;
  const previousEmissions = previousPeriod?.emissions?.calculatedTotalEmissions;
  const emissionsChange = previousEmissions && currentEmissions
    ? ((currentEmissions - previousEmissions) / previousEmissions) * 100
    : null;

  const employeeCount = latestPeriod?.economy?.employees?.value;
  const formattedEmployeeCount = employeeCount ? employeeCount.toLocaleString() : 'N/A';

  const sectorName = industry?.industryGics?.sectorCode 
    ? sectorNames[industry.industryGics.sectorCode]
    : 'Okänd sektor';

  // Find the largest scope 3 category
  const scope3Categories = latestPeriod?.emissions?.scope3?.categories || [];
  const largestCategory = scope3Categories.reduce((max, current) => 
    current.total > (max?.total || 0) ? current : max
  , scope3Categories[0]);

  // Get the color for the largest category
  const categoryColor = largestCategory 
    ? getCategoryColor(largestCategory.category)
    : 'var(--blue-2)';

  return (
    <Link 
      to={`/companies/${wikidataId}`}
      className="block bg-black-2 rounded-level-2 p-8 space-y-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(153,207,255,0.15)] hover:bg-[#1a1a1a]"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-light">{name}</h2>
          {rankings && (
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
          )}
          <p className="text-grey text-sm line-clamp-2">
            {description}
          </p>
        </div>
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ 
            backgroundColor: `color-mix(in srgb, ${categoryColor} 30%, transparent)`,
            color: categoryColor
          }}
        >
          <Building2 className="w-6 h-6" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {latestPeriod?.economy?.turnover && (
          <div className="bg-black-1 rounded-level-2 p-4">
            <div className="flex items-center gap-2 text-grey mb-2">
              <Wallet className="w-4 h-4" />
              <span className="text-xs">Omsättning</span>
            </div>
            <div className="text-lg font-light">
              {(latestPeriod.economy.turnover.value / 1e9).toFixed(1)} mdr
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
            <div className="text-lg font-light">
              {formattedEmployeeCount}
            </div>
          </div>
        )}

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
            <div className="text-lg font-light">
              {(currentEmissions / 1000).toFixed(1)}k
              <span className="text-xs text-grey ml-1">tCO₂e</span>
              {emissionsChange && (
                <span className={`text-sm ml-2 ${
                  emissionsChange < 0 ? 'text-green-3' : 'text-pink-3'
                }`}>
                  {emissionsChange > 0 ? '+' : ''}{emissionsChange.toFixed(1)}%
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {latestPeriod?.reportURL && (
        <div
          onClick={(e) => {
            e.preventDefault();
            window.open(latestPeriod.reportURL, '_blank', 'noopener,noreferrer');
          }}
          className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors cursor-pointer"
          style={{ color: categoryColor }}
        >
          Läs årsredovisning
          <ArrowUpRight className="w-4 h-4" />
        </div>
      )}
    </Link>
  );
}