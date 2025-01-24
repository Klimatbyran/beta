import { useState } from 'react';
import { useCompanies } from '@/hooks/useCompanies';
import { CompanyCard } from '@/components/companies/list/CompanyCard';
import { SectionedCompanyList } from '@/components/companies/list/SectionedCompanyList';
import { Search, Filter, Check } from 'lucide-react';
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
import { cn } from "@/lib/utils";
import { sectorNames } from '@/lib/constants/sectors';

type CompanyCategory = 'all' | 'omx' | 'midcap' | 'sme' | 'government';
type CompanySector = 'all' | keyof typeof sectorNames;
type SortOption = 'emissions_reduction' | 'total_emissions' | 'scope3_coverage' | 'data_quality' | 'name';

const categories = [
  { value: 'all', label: 'Alla företag' },
  { value: 'omx', label: 'Large Cap (OMX)' },
  { value: 'midcap', label: 'Mid Cap' },
  { value: 'sme', label: 'Small Cap' },
  { value: 'government', label: 'Statligt ägda' },
] as const;

const sectors = [
  { value: 'all', label: 'Alla sektorer' },
  ...Object.entries(sectorNames).map(([code, name]) => ({
    value: code,
    label: name,
  })),
] as const;

const sortOptions = [
  { value: 'emissions_reduction', label: 'Utsläppsminskning' },
  { value: 'total_emissions', label: 'Totala utsläpp' },
  { value: 'scope3_coverage', label: 'Scope 3-rapportering' },
  { value: 'data_quality', label: 'Datakvalitet' },
  { value: 'name', label: 'Företagsnamn' },
] as const;

export function CompaniesPage() {
  const { companies, loading, error } = useCompanies();
  const [category, setCategory] = useState<CompanyCategory>('all');
  const [sector, setSector] = useState<CompanySector>('all');
  const [sortBy, setSortBy] = useState<SortOption>('emissions_reduction');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredCompanies = companies
    .filter(company => {
      // Category filter
      if (category !== 'all') {
        const mockCategories: Record<string, string[]> = {
          omx: ['Q10523797'],
          midcap: [],
          sme: [],
          government: [],
        };
        if (!mockCategories[category]?.includes(company.wikidataId)) {
          return false;
        }
      }

      // Sector filter
      if (sector !== 'all' && company.industry?.industryGics?.sectorCode !== sector) {
        return false;
      }

      // Search filter - support multiple companies separated by comma
      if (searchQuery) {
        const searchTerms = searchQuery.toLowerCase().split(',').map(term => term.trim());
        return searchTerms.some(term => {
          const nameMatch = company.name.toLowerCase().includes(term);
          const sectorMatch = company.industry?.industryGics?.sectorName?.toLowerCase().includes(term);
          return nameMatch || sectorMatch;
        });
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'emissions_reduction':
          return b.metrics.emissionsReduction - a.metrics.emissionsReduction;
        case 'total_emissions':
          return (b.reportingPeriods[0]?.emissions?.calculatedTotalEmissions || 0) -
                 (a.reportingPeriods[0]?.emissions?.calculatedTotalEmissions || 0);
        case 'scope3_coverage': {
          // Calculate scope 3 coverage percentage
          const getScope3Coverage = (company: typeof a) => {
            const scope3Reports = company.reportingPeriods
              .filter(p => p.emissions?.scope3?.categories?.length > 0);
            return scope3Reports.length / company.reportingPeriods.length;
          };
          return getScope3Coverage(b) - getScope3Coverage(a);
        }
        case 'data_quality': {
          // Sort by number of reporting years and scope completeness
          const getQualityScore = (company: typeof a) => {
            const yearsScore = company.reportingPeriods.length;
            const scope3Score = company.reportingPeriods
              .filter(p => p.emissions?.scope3?.categories?.length > 0).length;
            return yearsScore + scope3Score;
          };
          return getQualityScore(b) - getQualityScore(a);
        }
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const activeFilters = [
    category !== 'all' && categories.find(c => c.value === category)?.label,
    sector !== 'all' && sectors.find(s => s.value === sector)?.label,
    sortOptions.find(s => s.value === sortBy)?.label,
  ].filter(Boolean);

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
              <Button variant="outline" size="sm" className="h-8 bg-black-1 border-none gap-2">
                <Filter className="w-4 h-4" />
                Filter
                {activeFilters.length > 0 && (
                  <Badge variant="secondary" className="ml-1 bg-blue-5/30 text-blue-2">
                    {activeFilters.length}
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
                    {categories.map(cat => (
                      <CommandItem
                        key={cat.value}
                        onSelect={() => setCategory(cat.value as CompanyCategory)}
                        className="flex items-center justify-between"
                      >
                        <span>{cat.label}</span>
                        {category === cat.value && <Check className="w-4 h-4" />}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Sektor">
                    {sectors.map(sec => (
                      <CommandItem
                        key={sec.value}
                        onSelect={() => setSector(sec.value as CompanySector)}
                        className="flex items-center justify-between"
                      >
                        <span>{sec.label}</span>
                        {sector === sec.value && <Check className="w-4 h-4" />}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Sortera efter">
                    {sortOptions.map(opt => (
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
              className="bg-blue-5/30 text-blue-2"
            >
              {filter}
            </Badge>
          ))}
        </div>
      )}

      {filteredCompanies.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-light text-grey">Inga företag hittades</h3>
          <p className="text-grey mt-2">Försök med andra sökkriterier</p>
        </div>
      ) : sector === 'all' && category === 'all' && !searchQuery ? (
        <SectionedCompanyList companies={filteredCompanies} sortBy={sortBy} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCompanies.map(company => (
            <div 
              key={company.wikidataId} 
              className="transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(153,207,255,0.15)]"
            >
              <CompanyCard {...company} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}