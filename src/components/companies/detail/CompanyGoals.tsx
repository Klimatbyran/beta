import { Info } from 'lucide-react';
import { Text } from "@/components/ui/text";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface CompanyGoalsProps {
  goals: Array<{
    id: string;
    description: string;
    year: string | null;
    baseYear: string | null;
    target: number | null;
  }> | null;
  className?: string;
}

export function CompanyGoals({ goals, className }: CompanyGoalsProps) {
  if (!goals?.length) return null;

  const useSimpleLayout = goals.length <= 3;

  if (useSimpleLayout) {
    return (
      <div className={cn("bg-black-2 rounded-level-1 p-16", className)}>
        <div className="flex items-center gap-2 mb-12">
          <Text variant="h3">Klimatmål</Text>
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

        <div className="space-y-8">
          {goals.map(goal => (
            <div 
              key={goal.id}
              className="bg-black-1 rounded-level-2 p-8 space-y-4"
            >
              <Text variant="large">{goal.description}</Text>
              <div className="flex items-center gap-8">
                {goal.year && (
                  <div>
                    <Text variant="muted" className="mb-1">Målår</Text>
                    <Text variant="large">{goal.year}</Text>
                  </div>
                )}
                {goal.baseYear && (
                  <div>
                    <Text variant="muted" className="mb-1">Basår</Text>
                    <Text variant="large">{goal.baseYear}</Text>
                  </div>
                )}
                {goal.target && (
                  <div>
                    <Text variant="muted" className="mb-1">Mål</Text>
                    <Text variant="large">{goal.target}%</Text>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("bg-black-2 rounded-level-1 p-16", className)}>
      <div className="flex items-center gap-2 mb-12">
        <Text variant="h3">Klimatmål</Text>
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

      <div className="grid grid-cols-2 gap-8">
        {goals.map(goal => (
          <div 
            key={goal.id}
            className="bg-black-1 rounded-level-2 p-8 space-y-4"
          >
            <Text variant="large">{goal.description}</Text>
            <div className="grid grid-cols-3 gap-4">
              {goal.year && (
                <div>
                  <Text variant="muted" className="mb-1">Målår</Text>
                  <Text variant="large">{goal.year}</Text>
                </div>
              )}
              {goal.baseYear && (
                <div>
                  <Text variant="muted" className="mb-1">Basår</Text>
                  <Text variant="large">{goal.baseYear}</Text>
                </div>
              )}
              {goal.target && (
                <div>
                  <Text variant="muted" className="mb-1">Mål</Text>
                  <Text variant="large">{goal.target}%</Text>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
