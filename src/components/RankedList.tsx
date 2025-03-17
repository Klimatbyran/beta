import { Building2, TreePine } from "lucide-react";
import { cn } from "@/lib/utils";
import { Text } from "@/components/ui/text";

interface RankedListProps {
  title: string;
  description: string;
  items: Array<{
    id?: string;
    name: string;
    value: number;
    displayValue?: string;
  }>;
  type: "municipality" | "company";
  className?: string;
  textColor: string;
  unit: string;
}

export function RankedList({
  title,
  description,
  items: initialItems,
  type,
  className,
  textColor,
  unit,
}: RankedListProps) {
  return (
    <div className={cn("bg-black-2 rounded-level-2 p-4 md:p-8", className)}>
      <div className="flex items-center justify-between mb-2 md:mb-4">
        <Text className="text-2xl md:text-4xl">{title}</Text>
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            type === "municipality" ? "bg-[#FDE7CE]" : "bg-[#D4E7F7]"
          )}
        >
          {type === "municipality" ? (
            <TreePine className="w-10 h-5 text-black" />
          ) : (
            <Building2 className="w-10 h-5 text-black" />
          )}
        </div>
      </div>

      <div className="space-y-6">
        <Text className="text-md text-grey">{description}</Text>
        {initialItems.map((item, index) => (
          <a
            key={item.id || index}
            className="grid grid-cols-[auto_1fr] items-center gap-4 hover:bg-black-1 transition-colors rounded-lg"
            href={
              (type === "municipality" ? "/municipalities/" : "/companies/") +
              (item.id || item.name)
            }
          >
            <span
              className={cn(
                "text-2xl md:text-5xl font-light",
                type === "municipality" ? "text-orange-2" : "text-blue-2"
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center md:gap-4">
              <span className="text-base md:text-lg">{item.name}</span>
              <div className="flex items-center md:justify-end">
                <span
                  className={cn(
                    "text-base md:text-lg md:text-right",
                    textColor
                  )}
                >
                  {item.displayValue || item.value.toFixed(1)}
                </span>
                <span className={cn("text-grey", unit !== "%" && "ml-2")}>
                  {unit}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
