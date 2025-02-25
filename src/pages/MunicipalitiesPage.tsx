import { useState } from "react";
import { useMunicipalities } from "@/hooks/useMunicipalities";
import { MunicipalityList } from "@/components/municipalities/list/MunicipalityList";
import { PageHeader } from "@/components/layout/PageHeader";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { regions } from "@/lib/constants/regions";

type SortOption = "meets_paris" | "name";

export function MunicipalitiesPage() {
  const { municipalities, loading, error } = useMunicipalities();
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("meets_paris");
  const [sortDirection, setSortDirection] = useState<"best" | "worst">("best");

  if (loading) {
    return (
      <div className="animate-pulse space-y-16">
        <div className="h-12 w-1/3 bg-black-1 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-96 bg-black-1 rounded-level-2" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-24">
        <h3 className="text-red-500 mb-4 text-xl">Det gick inte att hämta kommuninformation</h3>
        <p className="text-grey">Försök igen senare</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Kommunrapporter"
        description="Översikt över kommunernas klimatpåverkan och hållbarhetsarbete"
      >
        <div className="flex flex-col md:flex-row items-center gap-4 w-full flex-wrap">
          {/* Search Input */}
          <div className="relative w-full md:w-[350px]">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-grey w-4 h-4" />
            <Input
              type="text"
              placeholder="Sök kommun (separera med komma)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 py-1 h-10 bg-black-1 border-none text-sm w-full"
            />
          </div>

          {/* Region Select */}
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-full md:w-[250px] h-10 bg-black-1">
              <SelectValue placeholder="Välj län" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alla län</SelectItem>
              {Object.keys(regions).map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sorting Select */}
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger className="w-full md:w-[250px] h-10 bg-black-1">
              <SelectValue placeholder="Sortera efter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="meets_paris">Möter Parisavtalet</SelectItem>
              <SelectItem value="name">Namn</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort Direction Button */}
          <button
            onClick={() =>
              setSortDirection(sortDirection === "best" ? "worst" : "best")
            }
            className="px-4 py-2 bg-gray-700 text-white text-sm rounded w-full md:w-[150px] h-10"
          >
            {sortBy === "name"
              ? sortDirection === "best"
                ? "A-Ö"
                : "Ö-A"
              : sortDirection === "best"
              ? "Visar bäst först"
              : "Visar sämst först"}
          </button>
        </div>
      </PageHeader>

      <MunicipalityList
        municipalities={municipalities}
        selectedRegion={selectedRegion}
        searchQuery={searchQuery}
        sortBy={sortBy}
        sortDirection={sortDirection}
      />
    </div>
  );
}