import { useState } from "react";
import { MunicipalityCard } from "./MunicipalityCard";
import { MunicipalityMap } from "./MunicipalityMap";
import type { Municipality } from "@/types/municipality";
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

interface MunicipalityListProps {
  municipalities: Municipality[];
}

export function MunicipalityList({ municipalities }: MunicipalityListProps) {
  const [view, setView] = useState<"list" | "map">("list");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<
    "emissions" | "reduction" | "climate_plan" | "bicycle" | "charging" | "name"
  >("name");

  const sortOptions = [
    { value: "reduction", label: "Utsläppsminskning" },
    { value: "emissions", label: "Totala utsläpp" },
    { value: "climate_plan", label: "Klimatplan" },
    { value: "bicycle", label: "Cykelvägar" },
    { value: "charging", label: "Laddinfrastruktur" },
    { value: "name", label: "Namn" },
  ] as const;

  const filteredMunicipalities = municipalities
    .filter((municipality) => {
      if (selectedRegion !== "all" && municipality.region !== selectedRegion) {
        return false;
      }

      if (searchQuery) {
        const searchTerms = searchQuery
          .toLowerCase()
          .split(",")
          .map((term) => term.trim());
        return searchTerms.some((term) =>
          municipality.name.toLowerCase().includes(term)
        );
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "reduction":
          // Sort by emission reduction (negative is better)
          return (
            a.historicalEmissionChangePercent -
            b.historicalEmissionChangePercent
          );
        case "emissions":
          // Sort by total emissions (high to low)
          return b.trendEmission - a.trendEmission;
        case "climate_plan":
          // Sort by climate plan year (newest first, missing plans last)
          if (a.climatePlanYear === "Saknar plan") return 1;
          if (b.climatePlanYear === "Saknar plan") return -1;
          return (
            parseInt(b.climatePlanYear as unknown as string) -
            parseInt(a.climatePlanYear as unknown as string)
          );
        case "bicycle":
          // Sort by bicycle paths per capita (high to low)
          return b.bicycleMetrePerCapita - a.bicycleMetrePerCapita;
        case "charging":
          // Sort by EV charging infrastructure (low ratio is better)
          return (
            a.electricVehiclePerChargePoints - b.electricVehiclePerChargePoints
          );
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-[300px]">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-grey w-4 h-4" />
            <Input
              type="text"
              placeholder="Sök kommun (separera med komma)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 py-1 h-9 bg-black-1 border-none text-sm"
            />
          </div>

          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value as typeof sortBy)}
          >
            <SelectTrigger className="w-[200px] bg-black-1">
              <SelectValue placeholder="Sortera efter" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <button
            onClick={() => setView(view === "list" ? "map" : "list")}
            className="px-4 py-2 bg-black-1 text-white rounded"
          >
            Visa {view === "list" ? "karta" : "lista"}
          </button>
        </div>
      </div>

      {view === "list" ? (
        <>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-[200px] bg-black-1">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMunicipalities.map((municipality) => (
              <MunicipalityCard
                key={municipality.name}
                municipality={municipality}
              />
            ))}
          </div>
        </>
      ) : (
        <MunicipalityMap municipalities={filteredMunicipalities} />
      )}
    </div>
  );
}
