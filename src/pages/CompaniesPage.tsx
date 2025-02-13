import { useState } from "react";
import { useCompanies } from "@/hooks/useCompanies";
import { CompanyCard } from "@/components/companies/list/CompanyCard";
import { SectionedCompanyList } from "@/components/companies/list/SectionedCompanyList";
import { Search, Filter, Check, X } from "lucide-react";
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
import { sectorNames } from "@/lib/constants/sectors";

type CompanyCategory = "all" | "omx" | "midcap" | "sme" | "government";
type CompanySector = "all" | keyof typeof sectorNames;
type SortOption =
  | "emissions_reduction"
  | "total_emissions"
  | "scope3_coverage"
  | "name";

const categoriesOptions = [
  { value: "all", label: "Alla företag" },
  { value: "omx", label: "Large Companies (OMX)" },
  { value: "midcap", label: "Mid Size Companies" },
  { value: "sme", label: "Small Companies" },
  { value: "government", label: "Statligt ägda" },
] as const;

const sectorsOptions = [
  { value: "all", label: "Alla sektorer" },
  ...Object.entries(sectorNames).map(([code, name]) => ({
    value: code,
    label: name,
  })),
] as const;

const sortOptions = [
  { value: "emissions_reduction", label: "Utsläppsminskning" },
  { value: "total_emissions", label: "Totala utsläpp" },
  { value: "scope3_coverage", label: "Scope 3-rapportering" },
  { value: "name", label: "Företagsnamn" },
] as const;

export function CompaniesPage() {
  const { companies, loading, error } = useCompanies();
  const [categories, setCategories] = useState<CompanyCategory[]>([]);
  const [sectors, setSectors] = useState<CompanySector[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("emissions_reduction");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const activeFilters = [
    ...categories.map((cat) => ({
      type: "filter" as const,
      label: categoriesOptions.find((c) => c.value === cat)?.label,
      onRemove: () => setCategories((prev) => prev.filter((c) => c !== cat)),
    })),
    ...sectors.map((sec) => ({
      type: "filter" as const,
      label: sectorsOptions.find((s) => s.value === sec)?.label,
      onRemove: () => setSectors((prev) => prev.filter((s) => s !== sec)),
    })),
    {
      type: "sort" as const,
      label: sortOptions.find((s) => s.value === sortBy)?.label,
    },
  ].filter(Boolean);

  const activeFilterCount = activeFilters.filter(
    (filter) => filter.type === "filter"
  ).length;

  const filteredCompanies = companies.filter((company) => {
    // If no filters are applied, show all companies
    if (categories.length === 0 && sectors.length === 0 && !searchQuery) {
      return true;
    }

    let matchesCategory =
      categories.length === 0
        ? true
        : categories.some((cat) => company.tags.includes(cat));
    let matchesSector =
      sectors.length === 0
        ? true
        : sectors.some(
            (sec) => company.industry?.industryGics?.sectorCode === sec
          );
    let matchesSearch = true;

    if (searchQuery) {
      const searchTerms = searchQuery
        .toLowerCase()
        .split(",")
        .map((term) => term.trim());
      matchesSearch = searchTerms.some((term) => {
        const nameMatch = company.name.toLowerCase().includes(term);
        const sectorMatch = company.industry?.industryGics?.sectorCode
          ?.toLowerCase()
          .includes(term);
        return nameMatch || sectorMatch;
      });
    }

    return matchesCategory && matchesSector && matchesSearch;
  });

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light">Företagsrapporter</h1>
          <p className="text-sm text-grey">
            Översikt över företagens klimatpåverkan och hållbarhetsarbete
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-[200px]">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-grey w-4 h-4" />
            <Input
              type="text"
              placeholder="Sök (separera med ,)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 py-1 h-8 bg-black-1 border-none text-sm"
            />
          </div>

          <Popover open={filterOpen} onOpenChange={setFilterOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 bg-black-1 border-none gap-2"
              >
                <Filter className="w-4 h-4" />
                Filter
                {activeFilterCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-1 bg-blue-5/30 text-blue-2"
                  >
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0" align="end">
              <Command>
                <CommandInput placeholder="Sök i filter..." />
                <CommandList>
                  <CommandEmpty>Inga filter hittades.</CommandEmpty>
                  <CommandGroup heading="Kategori">
                    {categoriesOptions.map((cat) => (
                      <CommandItem
                        key={cat.value}
                        onSelect={() => {
                          if (cat.value === "all") {
                            setCategories([]);
                          } else {
                            setCategories((prev) =>
                              prev.includes(cat.value as CompanyCategory)
                                ? prev.filter((c) => c !== cat.value)
                                : [...prev, cat.value as CompanyCategory]
                            );
                          }
                        }}
                        className="flex items-center justify-between"
                      >
                        <span>{cat.label}</span>
                        {categories.includes(cat.value as CompanyCategory) && (
                          <Check className="w-4 h-4" />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Sektor">
                    {sectorsOptions.map((sec) => (
                      <CommandItem
                        key={sec.value}
                        onSelect={() => {
                          if (sec.value === "all") {
                            setSectors([]);
                          } else {
                            setSectors((prev) =>
                              prev.includes(sec.value as CompanySector)
                                ? prev.filter((s) => s !== sec.value)
                                : [...prev, sec.value as CompanySector]
                            );
                          }
                        }}
                        className="flex items-center justify-between"
                      >
                        <span>{sec.label}</span>
                        {sectors.includes(sec.value as CompanySector) && (
                          <Check className="w-4 h-4" />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Sortera efter">
                    {sortOptions.map((opt) => (
                      <CommandItem
                        key={opt.value}
                        onSelect={() => setSortBy(opt.value as SortOption)}
                        className="flex items-center justify-between"
                      >
                        <span>{opt.label}</span>
                        {sortBy === opt.value && <Check className="w-4 h-4" />}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter, index) => (
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
                    filter.onRemove();
                  }}
                  className="hover:bg-blue-5/50 p-1 rounded-sm transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </Badge>
          ))}
        </div>
      )}

      {filteredCompanies.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-light text-grey">
            Inga företag hittades
          </h3>
          <p className="text-grey mt-2">Försök med andra sökkriterier</p>
        </div>
      ) : sectors.length === 0 && categories.length === 0 && !searchQuery ? (
        <SectionedCompanyList companies={filteredCompanies} sortBy={sortBy} />
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
