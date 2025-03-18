import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { FilterGroup } from "./FilterGroup";
import { SortingDropdown } from "./SortingDropdown";
import { FilterBadges, FilterBadge } from "./FilterBadge";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

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
  activeFilters: FilterBadge[];
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
  const [headerHeight, setHeaderHeight] = useState(48);
  
  // Measure the actual header height
  useEffect(() => {
    const header = document.querySelector('header');
    if (header) {
      const height = header.getBoundingClientRect().height;
      setHeaderHeight(height);
    }
  }, []);

  return (
    <div 
      className="sticky z-30 bg-black pt-4 pb-2 -mt-4"
      style={{ 
        top: `${headerHeight}px`,
        boxShadow: '0 -10px 15px 15px rgba(0, 0, 0, 1)' // Shadow to cover any gap
      }}
    >
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

      <div className={cn(
        "transition-all duration-300 overflow-hidden",
        isFilterOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      )}>
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
      </div>

      {activeFilters.length > 0 && (
        <div className="mt-2 mb-2">
          <FilterBadges filters={activeFilters} />
        </div>
      )}
    </div>
  );
}
