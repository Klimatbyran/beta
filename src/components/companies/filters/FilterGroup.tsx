import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface FilterGroupProps {
  title: string;
  items: readonly { value: string; label: string }[];
  selected: string[];
  onSelect: (value: string[]) => void;
  className?: string;
}

export function FilterGroup({
  title,
  items,
  selected,
  onSelect,
  className,
}: FilterGroupProps) {
  const { t } = useTranslation();

  const handleSelect = (value: string) => {
    if (value === "all") {
      onSelect([]);
      return;
    }

    if (selected.includes(value)) {
      onSelect(selected.filter((item) => item !== value));
    } else {
      onSelect([...selected, value]);
    }
  };

  return (
    <div className={cn("", className)}>
      {title && <h3 className="mb-3 text-base font-medium">{title}</h3>}
      <Command className="bg-transparent border-none">
        <CommandInput
          placeholder={t("companiesPage.searchInFilter")}
          className="h-10 text-base"
        />
        <CommandList className="max-h-[300px]">
          <CommandEmpty className="py-3 text-base">
            {t("companiesPage.noFiltersFound")}
          </CommandEmpty>
          <CommandGroup>
            {items.map((item) => {
              const isSelected =
                item.value === "all"
                  ? selected.length === 0
                  : selected.includes(item.value);

              return (
                <CommandItem
                  key={item.value}
                  onSelect={() => handleSelect(item.value)}
                  className="flex items-center gap-3 py-3 text-base cursor-pointer"
                >
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-sm border ${
                      isSelected
                        ? "border-blue-2 bg-blue-2 text-black"
                        : "border-grey opacity-70"
                    }`}
                  >
                    {isSelected && <Check className="h-4 w-4" />}
                  </div>
                  <span>{item.label}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
