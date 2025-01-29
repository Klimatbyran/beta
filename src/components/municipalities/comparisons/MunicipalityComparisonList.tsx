import { Link } from "react-router-dom";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

interface Municipality {
  id: string;
  name: string;
  value: number;
  unit: string;
  change?: number;
}

interface MunicipalityComparisonListProps {
  title: string;
  description: string;
  municipalities: Municipality[];
  formatValue?: (value: number) => string;
  showChange?: boolean;
  className?: string;
}

export function MunicipalityComparisonList({
  title,
  description,
  municipalities,
  formatValue = (value) => value.toFixed(1),
  showChange = true,
  className
}: MunicipalityComparisonListProps) {
  return (
    <div className={cn("space-y-8", className)}>
      <div className="space-y-4">
        <Text variant="h3">{title}</Text>
        <Text variant="muted" className="max-w-2xl">
          {description}
        </Text>
      </div>

      <div className="space-y-4">
        {municipalities.map((municipality, index) => (
          <Link
            key={municipality.id}
            to={`/municipalities/${municipality.name.toLowerCase().replace(/ /g, '-')}`}
            className="flex items-center justify-between py-4 border-t border-black-1 hover:bg-black-1/80 transition-colors"
          >
            <div className="flex items-center gap-8">
              <Text className="text-blue-2 w-12 text-4xl font-light">
                {String(index + 1).padStart(2, '0')}
              </Text>
              <Text className="text-2xl font-light">{municipality.name}</Text>
            </div>
            <div className="flex items-center gap-4">
              <Text className="text-2xl font-light text-blue-2">
                {formatValue(municipality.value)}
                <span className="text-lg text-grey ml-1">{municipality.unit}</span>
              </Text>
              {showChange && municipality.change && (
                <Text 
                  variant="small" 
                  className={cn(
                    "px-2 rounded",
                    municipality.change > 0 
                      ? "text-green-3 bg-green-5/30" 
                      : "text-pink-3 bg-pink-5/30"
                  )}
                >
                  {municipality.change > 0 ? '+' : ''}{municipality.change.toFixed(1)}%
                </Text>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
