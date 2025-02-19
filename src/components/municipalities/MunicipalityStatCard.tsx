import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  valueClassName?: string;
}

export function MunicipalityStatCard({
  title,
  value,
  valueClassName,
}: StatCardProps) {
  return (
    <div>
      <Text className="text-lg md:text-xl">{title}</Text>
      <Text className={cn("text-4xl md:text-6xl", valueClassName)}>
        {value}
      </Text>
    </div>
  );
}
