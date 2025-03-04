import { ReactNode } from "react";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

interface MunicipalitySectionProps {
  title: string;
  items: Array<{
    title: string;
    value: ReactNode;
    valueClassName?: string;
  }>;
  className?: string;
}

export function MunicipalitySection({
  title,
  items,
  className,
}: MunicipalitySectionProps) {
  return (
    <div className={cn("bg-black-2 rounded-level-1 p-8 md:p-16", className)}>
      <Text className="text-2xl md:text-4xl">{title}</Text>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 mt-8">
        {items.map((item, index) => (
          <div key={index}>
            <Text className="text-lg md:text-xl">{item.title}</Text>
            <Text className={cn("text-4xl md:text-6xl", item.valueClassName)}>
              {item.value}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
}
