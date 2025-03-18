import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

export interface FilterBadge {
  type: "filter" | "sort";
  label: string;
  onRemove?: () => void;
}

interface FilterBadgeProps {
  label: string;
  onRemove: () => void;
  type?: "filter" | "sort";
}

export function FilterBadge({
  label,
  onRemove,
  type = "filter",
}: FilterBadgeProps) {
  const { t } = useTranslation();

  return (
    <Badge
      variant="secondary"
      className="bg-blue-5/30 text-blue-2 pl-2 pr-1 flex items-center gap-1"
    >
      <span className="text-grey text-xs mr-1">
        {type === "sort"
          ? t("companiesPage.sorting")
          : t("companiesPage.filtering")}
      </span>
      {label}
      {type === "filter" && onRemove && (
        <button
          type="button"
          title={t("companiesPage.removeFilter")}
          onClick={(e) => {
            e.preventDefault();
            onRemove();
          }}
          className="hover:bg-blue-5/50 p-1 rounded-sm transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </Badge>
  );
}

export function FilterBadges({ filters }: { filters: FilterBadge[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter, index) => (
        <FilterBadge
          key={index}
          label={filter.label}
          onRemove={filter.onRemove || (() => {})}
          type={filter.type}
        />
      ))}
    </div>
  );
}
