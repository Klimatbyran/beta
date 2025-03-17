import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { FilterGroup } from "./FilterGroup";
import { SortingDropdown } from "./SortingDropdown";
import { FilterBadge } from "./FilterBadge";

interface CompanyFiltersProps {
  isFilterOpen: boolean;
  toggleFilter: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sectors: string[];
  setSectors: (sectors: string[]) => void;
  sectorOptions: readonly { value: string; label: string }[];
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  sortOptions: { value: string; label: string }[];
  activeFilters: { label: string; onRemove: () => void }[];
}

export function CompanyFilters({
  isFilterOpen,
  toggleFilter,
  searchQuery,
  setSearchQuery,
  sectors,
  setSectors,
  sectorOptions,
  sortBy,
  setSortBy,
  sortOptions,
  activeFilters,
}: CompanyFiltersProps) {
  const { t } = useTranslation();

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Input
            placeholder={t("companiesPage.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 h-12 bg-black-2 border-none text-base"
          />
        </div>
        <Button
          variant={isFilterOpen ? "default" : "outline"}
          className="gap-2 h-12 px-6 text-base"
          onClick={toggleFilter}
        >
          <Filter className="h-5 w-5" />
          {t("companiesPage.filter")}
        </Button>
      </div>

      {isFilterOpen && (
        <div className="bg-black-2 rounded-level-2 p-8 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">
                {t("companiesPage.sector")}
              </h3>
              <FilterGroup
                title=""
                items={sectorOptions}
                selected={sectors}
                onSelect={setSectors}
                className="bg-black-1 rounded-md p-4"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">
                {t("companiesPage.sortBy")}
              </h3>
              <SortingDropdown
                value={sortBy}
                onChange={setSortBy}
                options={sortOptions}
                className="bg-black-1 rounded-md"
              />
            </div>
          </div>
        </div>
      )}

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-4">
          {activeFilters.map((filter, index) => (
            <FilterBadge
              key={index}
              label={filter.label}
              onRemove={filter.onRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
}
