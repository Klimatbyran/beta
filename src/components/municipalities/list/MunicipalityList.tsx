import { useState } from "react";
import { MunicipalityCard } from "./MunicipalityCard";
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
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<
    | "meets_paris"
    | "reduction"
    | "needed_reduction"
    | "consumption_emissions"
    | "charging_points"
    | "climate_plan"
    | "name"
  >("reduction");
  const [sortDirection, setSortDirection] = useState<"best" | "worst">("best");

  const sortOptions = [
    { value: "meets_paris", label: "Möter Parisavtalet" },
    { value: "reduction", label: "Utsläppsminskning" },
    { value: "needed_reduction", label: "Krävd utsläppsminskning" },
    { value: "consumption_emissions", label: "Konsumtionsutsläpp" },
    { value: "charging_points", label: "Laddinfrastruktur" },
    { value: "climate_plan", label: "Klimatplan" },
    { value: "name", label: "Namn" },
  ];

  const filteredMunicipalities = municipalities.filter((municipality) => {
    if (selectedRegion !== "all" && municipality.region !== selectedRegion) {
      return false;
    }

    if (searchQuery) {
      const searchTerms = searchQuery
        .toLowerCase()
        .split(",")
        .map((term) => term.trim())
        .filter((term) => term.length > 0);

      return searchTerms.some((term) => {
        if (term.endsWith(",")) {
          return municipality.name.toLowerCase() === term.slice(0, -1);
        }
        return municipality.name.toLowerCase().startsWith(term);
      });
    }

    return true;
  });

  const sortedMunicipalities = filteredMunicipalities.sort((a, b) => {
    const directionMultiplier = sortDirection === "best" ? 1 : -1;
    switch (sortBy) {
      case "meets_paris":
        if (
          a.budgetRunsOut === "Håller budget" &&
          b.budgetRunsOut === "Håller budget"
        ) {
          return (
            directionMultiplier *
            (new Date(a.hitNetZero).getTime() -
              new Date(b.hitNetZero).getTime())
          );
        }
        if (a.budgetRunsOut === "Håller budget") {
          return -1 * directionMultiplier;
        }
        if (b.budgetRunsOut === "Håller budget") {
          return 1 * directionMultiplier;
        }
        return (
          directionMultiplier *
          (new Date(b.budgetRunsOut).getTime() -
            new Date(a.budgetRunsOut).getTime())
        );
      case "reduction":
        return (
          directionMultiplier *
          (a.historicalEmissionChangePercent -
            b.historicalEmissionChangePercent)
        );
      case "needed_reduction":
        return (
          directionMultiplier *
          (a.neededEmissionChangePercent - b.neededEmissionChangePercent)
        );
      case "consumption_emissions":
        return (
          directionMultiplier *
          (a.totalConsumptionEmission - b.totalConsumptionEmission)
        );
      case "charging_points":
        return (
          directionMultiplier *
          (a.electricVehiclePerChargePoints - b.electricVehiclePerChargePoints)
        );
      case "climate_plan":
        if (a.climatePlanYear === "Saknar plan") {
          return 1 * directionMultiplier;
        }
        if (b.climatePlanYear === "Saknar plan") {
          return -1 * directionMultiplier;
        }
        return (
          directionMultiplier *
          (parseInt(b.climatePlanYear as unknown as string) -
            parseInt(a.climatePlanYear as unknown as string))
        );
      case "name":
        return directionMultiplier * a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full">
          <div className="relative w-full md:w-[350px]">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-grey w-4 h-4" />
            <Input
              type="text"
              placeholder="Sök kommun (separera med komma)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 py-1 h-8 bg-black-1 border-none text-sm w-full"
            />
          </div>

          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-full md:w-[250px] bg-black-1">
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

          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value as typeof sortBy)}
          >
            <SelectTrigger className="w-full md:w-[250px] bg-black-1">
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

          <button
            onClick={() =>
              setSortDirection(sortDirection === "best" ? "worst" : "best")
            }
            className="px-4 py-2 bg-gray-700 text-white rounded w-full md:w-auto"
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedMunicipalities.map((municipality) => (
          <MunicipalityCard
            key={municipality.name}
            municipality={municipality}
          />
        ))}
      </div>
    </div>
  );
}
