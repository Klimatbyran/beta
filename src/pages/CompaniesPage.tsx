import { useState, useMemo } from "react";
import { useCompanies } from "@/hooks/useCompanies";
import { CompanyCard } from "@/components/companies/list/CompanyCard";
import { SectionedCompanyList } from "@/components/companies/list/SectionedCompanyList";
import { Filter, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { SECTORS, SECTOR_NAMES } from "@/lib/constants/sectors";

type CompanySector = "all" | keyof typeof SECTORS;
type SortOption =
  | "emissions_reduction"
  | "total_emissions"
  | "scope3_coverage"
  | "name";

const SORT_OPTIONS = [
  { value: "emissions_reduction", label: "Utsläppsminskning" },
  { value: "total_emissions", label: "Totala utsläpp" },
  { value: "scope3_coverage", label: "Scope 3-rapportering" },
  { value: "name", label: "Företagsnamn" },
] as const;

type FilterBadge = {
  type: "filter" | "sort";
  label: string;
  onRemove?: () => void;
};

interface FilterPopoverProps {
  filterOpen: boolean;
  setFilterOpen: (open: boolean) => void;
  sectors: CompanySector[];
  setSectors: React.Dispatch<React.SetStateAction<CompanySector[]>>;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
}

function FilterPopover({
  filterOpen,
  setFilterOpen,
  sectors,
  setSectors,
  sortBy,
  setSortBy,
}: FilterPopoverProps) {
  return (
    <Popover open={filterOpen} onOpenChange={setFilterOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 bg-black-1 border-none gap-2"
        >
          <Filter className="w-4 h-4" />
          Filter
          {sectors.length > 0 && (
            <Badge
              variant="secondary"
              className="ml-1 bg-blue-5/30 text-blue-2"
            >
              {sectors.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="end">
        <FilterCommands
          sectors={sectors}
          setSectors={setSectors}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </PopoverContent>
    </Popover>
  );
}

interface SortGroupProps {
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
}

function SortGroup({ sortBy, setSortBy }: SortGroupProps) {
  return (
    <CommandGroup heading="Sortera efter">
      {SORT_OPTIONS.map((option) => (
        <CommandItem
          key={option.value}
          onSelect={() => setSortBy(option.value)}
          className="flex items-center justify-between"
        >
          <span>{option.label}</span>
          {sortBy === option.value && <Check className="w-4 h-4" />}
        </CommandItem>
      ))}
    </CommandGroup>
  );
}

interface FilterCommandsProps {
  sectors: CompanySector[];
  setSectors: (sectors: CompanySector[]) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
}

function FilterCommands({
  sectors,
  setSectors,
  sortBy,
  setSortBy,
}: FilterCommandsProps) {
  return (
    <Command>
      <CommandInput placeholder="Sök i filter..." />
      <CommandList>
        <CommandEmpty>Inga filter hittades.</CommandEmpty>
        <FilterGroup
          title="Sektor"
          items={SECTORS}
          selected={sectors}
          onSelect={setSectors}
        />
        <CommandSeparator />
        <SortGroup sortBy={sortBy} setSortBy={setSortBy} />
      </CommandList>
    </Command>
  );
}

interface FilterGroupProps {
  title: string;
  items: typeof SECTORS;
  selected: CompanySector[];
  onSelect: React.Dispatch<React.SetStateAction<CompanySector[]>>;
}

function FilterGroup({ title, items, selected, onSelect }: FilterGroupProps) {
  return (
    <CommandGroup heading={title}>
      {items.map((item) => (
        <CommandItem
          key={item.value}
          onSelect={() => {
            if (item.value === "all") {
              onSelect([]);
            } else {
              onSelect((prev) =>
                prev.includes(item.value as CompanySector)
                  ? prev.filter((v) => v !== item.value)
                  : [...prev, item.value as CompanySector]
              );
            }
          }}
          className="flex items-center justify-between"
        >
          <span>{item.label}</span>
          {selected.includes(item.value as CompanySector) && (
            <Check className="w-4 h-4" />
          )}
        </CommandItem>
      ))}
    </CommandGroup>
  );
}

export function CompaniesPage() {
  const { companies, loading, error } = useCompanies();
  const [sectors, setSectors] = useState<CompanySector[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("emissions_reduction");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const activeFilters: FilterBadge[] = [
    ...sectors.map((sec) => ({
      type: "filter" as const,
      label: String(SECTORS.find((s) => s.value === sec)?.label ?? sec),
      onRemove: () => setSectors((prev) => prev.filter((s) => s !== sec)),
    })),
    {
      type: "sort" as const,
      label: String(
        SORT_OPTIONS.find((s) => s.value === sortBy)?.label ?? sortBy
      ),
    },
  ];

  const filteredCompanies = useMemo(() => {
    const filtered = companies.filter((company) => {
      if (sectors.length === 0 && !searchQuery) {
        return true;
      }

      const matchesSector =
        sectors.length === 0 ||
        sectors.some(
          (sec) => company.industry?.industryGics?.sectorCode === sec
        );

      const matchesSearch =
        !searchQuery ||
        searchQuery
          .toLowerCase()
          .split(",")
          .map((term) => term.trim())
          .some(
            (term) =>
              company.name.toLowerCase().includes(term) ||
              (company.industry?.industryGics?.sectorCode &&
                SECTOR_NAMES[company.industry.industryGics.sectorCode]
                  ?.toLowerCase()
                  .includes(term))
          );

      return matchesSector && matchesSearch;
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "emissions_reduction":
          return (
            (b.metrics?.emissionsReduction || 0) -
            (a.metrics?.emissionsReduction || 0)
          );
        case "total_emissions":
          return (
            (b.reportingPeriods[0]?.emissions?.calculatedTotalEmissions || 0) -
            (a.reportingPeriods[0]?.emissions?.calculatedTotalEmissions || 0)
          );
        case "scope3_coverage":
          const bCoverage =
            b.reportingPeriods[0]?.emissions?.scope3?.categories?.length || 0;
          const aCoverage =
            a.reportingPeriods[0]?.emissions?.scope3?.categories?.length || 0;
          return bCoverage - aCoverage;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [companies, sectors, searchQuery, sortBy]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-64 bg-black-2 rounded-level-2" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-light text-red-500">
          Det gick inte att hämta företagsinformation
        </h2>
        <p className="text-grey mt-2">Försök igen senare</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="sticky top-2 z-10 bg-black pt-6 pb-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light">Företagsrapporter</h1>
            <p className="text-sm text-grey">
              Översikt över företagens klimatpåverkan och hållbarhetsarbete
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Input
              type="text"
              placeholder="Sök (separera med ,)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black-1 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-2 w-[200px]"
            />
            <FilterPopover
              filterOpen={filterOpen}
              setFilterOpen={setFilterOpen}
              sectors={sectors}
              setSectors={setSectors}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>
        </div>

        {activeFilters.length > 0 && <FilterBadges filters={activeFilters} />}
      </div>

      {filteredCompanies.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-light text-grey">
            Inga företag hittades
          </h3>
          <p className="text-grey mt-2">Försök med andra sökkriterier</p>
        </div>
      ) : sectors.length === 0 && !searchQuery ? (
        <SectionedCompanyList
          companies={filteredCompanies.map(
            ({ ...rest }) => ({
              ...rest,
              reportingPeriods: rest.reportingPeriods.map((period) => ({
                ...period,
                id: period.startDate, // Using startDate as temporary id
              })),
            })
          )}
          sortBy={sortBy}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCompanies.map((company) => (
            <div
              key={company.wikidataId}
              className="group overflow-hidden rounded-level-2"
            >
              <div className="transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-[0_0_30px_rgba(153,207,255,0.15)]">
                <CompanyCard {...company} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterBadges({ filters }: { filters: FilterBadge[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter, index) => (
        <Badge
          key={index}
          variant="secondary"
          className="bg-blue-5/30 text-blue-2 pl-2 pr-1 flex items-center gap-1"
        >
          <span className="text-grey text-xs mr-1">
            {filter.type === "sort" ? "Sorterar:" : "Filter:"}
          </span>
          {filter.label}
          {filter.type === "filter" && filter.onRemove && (
            <button
              onClick={(e) => {
                e.preventDefault();
                filter.onRemove?.();
              }}
              className="hover:bg-blue-5/50 p-1 rounded-sm transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </Badge>
      ))}
    </div>
  );
}
