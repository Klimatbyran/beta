import { Link } from 'react-router-dom';
import { Info, ArrowUpRight } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import type { Municipality } from '@/types/municipality';

interface MunicipalityCardProps {
  municipality: Municipality;
}

export function MunicipalityCard({ municipality }: MunicipalityCardProps) {
  // Format emissions values with appropriate scaling
  const formatEmissions = (tons: number) => {
    if (tons >= 1500000) { // 1.5 million or more -> show in millions
      return `${(tons / 1000000).toFixed(1)}m`;
    } else { // Less than 1.5 million -> show in thousands
      return `${Math.round(tons / 1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`;
    }
  };

  return (
    <Link 
      to={`/municipalities/${municipality.id}`}
      className="block bg-black-2 rounded-level-2 p-8 space-y-8 hover:bg-black-1/80 transition-colors"
    >
      <div className="space-y-6">
        <h2 className="text-5xl font-light">{municipality.name}</h2>
        
        <div className="space-y-2">
          <div className="text-sm text-grey uppercase tracking-wide">UTSLÄPPSRANKING</div>
          <div className="text-3xl font-light">
            {municipality.rank}
          </div>
        </div>

        <p className="text-grey">{municipality.description}</p>
      </div>

      <div className="bg-black-1 rounded-level-2 p-6">
        <div className="space-y-2">
          <div className="text-sm text-grey">
            {municipality.name} har en {municipality.historicalEmissionChangePercent < 0 ? 'positiv' : 'negativ'} trend, koldioxidbudgeten tar slut:
          </div>
          <div className="text-5xl font-light text-blue-2">
            {municipality.budgetRunsOut}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm text-grey">
            Utsläppen i siffror {municipality.totalApproximatedHistoricalEmission >= 1500000 ? '(miljoner ton CO₂)' : '(tusen ton CO₂)'}
          </h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-grey" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Totala territoriella utsläpp</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#FDE7CE]/10 rounded-level-2 p-4 space-y-1">
            <div className="text-xs text-grey uppercase">HISTORISKT</div>
            <div className="text-2xl font-light text-[#FDE7CE]">
              {formatEmissions(municipality.totalApproximatedHistoricalEmission)}
            </div>
          </div>
          
          <div className="bg-blue-5/30 rounded-level-2 p-4 space-y-1">
            <div className="text-xs text-grey uppercase">TREND</div>
            <div className="text-2xl font-light text-blue-2">
              {formatEmissions(municipality.trendEmission)}
            </div>
          </div>
          
          <div className="bg-green-5/30 rounded-level-2 p-4 space-y-1">
            <div className="text-xs text-grey uppercase">FÖR ATT KLARA PARISAVTALET</div>
            <div className="text-2xl font-light text-green-3">
              {formatEmissions(municipality.emissionBudget[2024] || 0)}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm text-grey">Årlig utsläppsminskning</div>
        <div className={cn(
          "text-6xl font-light",
          municipality.historicalEmissionChangePercent < 0 ? "text-green-3" : "text-pink-3"
        )}>
          {municipality.historicalEmissionChangePercent > 0 ? '+' : ''}
          {municipality.historicalEmissionChangePercent.toFixed(1)}%
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black-1">
        <div>
          <Text variant="muted" className="mb-2">Cykelväg per invånare</Text>
          <Text variant="large">
            {municipality.bicycleMetrePerCapita.toFixed(1)}m
          </Text>
        </div>
        <div>
          <Text variant="muted" className="mb-2">Elbilar per laddpunkt</Text>
          <Text variant="large">
            {municipality.electricVehiclePerChargePoints.toFixed(1)}
          </Text>
        </div>
      </div>

      {/* Climate Plan */}
      {municipality.climatePlanLink && (
        <a 
          href={municipality.climatePlanLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-black-1 rounded-level-2 p-4 hover:bg-black-1/80 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <Text variant="large">Klimatplan</Text>
              <Text variant="muted">
                {municipality.climatePlanYear === "Saknar plan" 
                  ? "Saknar plan" 
                  : `Antagen ${municipality.climatePlanYear}`}
              </Text>
            </div>
            <ArrowUpRight className="w-6 h-6" />
          </div>
        </a>
      )}
    </Link>
  );
}