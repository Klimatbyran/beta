import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MunicipalityCardProps {
  name: string;
  rank: string;
  description: string;
  targetDate: string;
  emissions: {
    historical: number;
    current: number;
    target: number;
  };
  yearlyReduction: number;
}

export function MunicipalityCard({
  name,
  rank,
  description,
  targetDate,
  emissions,
  yearlyReduction,
}: MunicipalityCardProps) {
  return (
    <div className="bg-black-2 rounded-level-2 p-8 space-y-8">
      <div className="space-y-6">
        <h2 className="text-5xl font-light">{name}</h2>
        
        <div className="space-y-2">
          <div className="text-sm text-grey uppercase tracking-wide">UTSLÄPPSRANKING</div>
          <div className="text-3xl font-light">{rank}</div>
        </div>

        <p className="text-grey">{description}</p>
      </div>

      <div className="bg-black-1 rounded-level-2 p-6">
        <div className="space-y-2">
          <div className="text-sm text-grey">
            {name} har en negativ trend, koldioxidbudgeten tar slut:
          </div>
          <div className="text-5xl font-light text-blue-2">
            {targetDate}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm text-grey">Utsläppen i siffror (tusen ton CO₂)</h3>
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
              {Math.round(emissions.historical)}
            </div>
          </div>
          
          <div className="bg-blue-5/30 rounded-level-2 p-4 space-y-1">
            <div className="text-xs text-grey uppercase">TREND</div>
            <div className="text-2xl font-light text-blue-2">
              {Math.round(emissions.current)}
            </div>
          </div>
          
          <div className="bg-green-5/30 rounded-level-2 p-4 space-y-1">
            <div className="text-xs text-grey uppercase">FÖR ATT KLARA PARISAVTALET</div>
            <div className="text-2xl font-light text-green-3">
              {Math.round(emissions.target)}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm text-grey">Årlig utsläppsminskning</div>
        <div className="text-6xl font-light text-green-3">
          {yearlyReduction > 0 ? '+' : ''}{yearlyReduction.toFixed(1)}%
        </div>
      </div>
    </div>
  );
}