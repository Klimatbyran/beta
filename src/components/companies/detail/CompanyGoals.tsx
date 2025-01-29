import { Info } from 'lucide-react'
import { Text } from '@/components/ui/text'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface CompanyGoalsProps {
  goals: Array<{
    id: string
    description: string
    year: string | null
    baseYear: string | null
    target: number | null
  }> | null
  className?: string
}

export function CompanyGoals({ goals, className }: CompanyGoalsProps) {
  if (!goals?.length) return null

  const useSimpleLayout = goals.length <= 3

  // Always use the new design regardless of number of goals
  return (
    <div className={cn('bg-black-2 rounded-level-1 p-16', className)}>
      <div className="flex items-center gap-2 mb-12">
        <Text variant="h2">Klimatmål</Text>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-4 h-4 text-grey" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Företagets egna uppsatta klimatmål</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="bg-black-1 rounded-[32px] p-8 flex flex-col justify-end min-h-[240px]"
          >
            {goal.target && (
              <div className="mb-4">
                <Text className="text-[72px] font-light tracking-tighter leading-none">
                  {goal.target}
                  <span className="text-[32px] text-grey ml-1">%</span>
                </Text>
              </div>
            )}
            <div className="space-y-4">
              <Text variant="large" className="line-clamp-2">
                {goal.description}
              </Text>
              <div className="flex items-center gap-4">
                {goal.baseYear && (
                  <Text variant="muted">Från {goal.baseYear}</Text>
                )}
                {goal.year && <Text variant="muted">Till {goal.year}</Text>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
