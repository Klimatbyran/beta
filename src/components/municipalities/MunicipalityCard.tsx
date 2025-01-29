import { Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Text } from '@/components/ui/text'
import { cn } from '@/lib/utils'

interface MunicipalityCardProps {
  name: string
  rank: string
  description: string
  targetDate: string
  emissions: {
    historical: number
    current: number
    target: number
  }
  yearlyReduction: number
}

export function MunicipalityCard({
  name,
  rank,
  description,
  targetDate,
  emissions,
  yearlyReduction,
}: MunicipalityCardProps) {
  // Calculate days until target date
  const daysUntil = Math.ceil(
    (new Date(targetDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  )

  // Format date for display
  const formattedDate = new Date(targetDate).toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  // Check if target date is within a year
  const isWithinYear = daysUntil <= 365 && daysUntil > 0

  return (
    <div className="bg-black-2 rounded-level-2 p-8 space-y-8">
      <div className="space-y-6">
        <h2 className="text-5xl font-light">{name}</h2>

        <div className="space-y-2">
          <div className="text-sm text-grey uppercase tracking-wide">
            UTSLÄPPSRANKING
          </div>
          <div className="text-3xl font-light">{rank}</div>
        </div>

        <p className="text-grey">{description}</p>
      </div>

      <div className="bg-black-1 rounded-level-2 p-6">
        <div className="space-y-2">
          <div className="text-sm text-grey">
            {name} har en {yearlyReduction < 0 ? 'positiv' : 'negativ'} trend,
            koldioxidbudgeten tar slut:
          </div>
          <div className="flex items-baseline gap-3">
            <div className="text-5xl font-light text-blue-2">
              {isWithinYear ? <>{daysUntil} dagar</> : formattedDate}
            </div>
            {isWithinYear && <Text variant="muted">({formattedDate})</Text>}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm text-grey">
            Utsläppen i siffror (tusen ton CO₂)
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
            <div className="text-xs text-grey uppercase">
              FÖR ATT KLARA PARISAVTALET
            </div>
            <div className="text-2xl font-light text-green-3">
              {Math.round(emissions.target)}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm text-grey">Årlig utsläppsminskning</div>
        <div className="text-6xl font-light text-green-3">
          {yearlyReduction > 0 ? '+' : ''}
          {yearlyReduction.toFixed(1)}%
        </div>
      </div>
    </div>
  )
}
