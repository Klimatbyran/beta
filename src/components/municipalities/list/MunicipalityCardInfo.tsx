import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Info, TrendingDown } from "lucide-react";

interface CardInfoProps {
  title: string;
  tooltip: string;
  value: string;
  textColor: string;
  unit?: string;
}

export function CardInfo({
  title,
  tooltip,
  value,
  textColor,
  unit,
}: CardInfoProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-grey mb-2 text-lg">
        <TrendingDown className="w-4 h-4" />
        <span>{title}</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-4 h-4" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="text-3xl font-light">
        <span className={cn(textColor)}>
          {value}
          <span className="text-lg text-grey ml-1">{unit}</span>
        </span>
      </div>
    </div>
  );
}
