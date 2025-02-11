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

  const sortOptions = [
    { value: "meets_paris", label: "Möter Parisavtalet" },
    { value: "reduction", label: "Utsläppsminskning" },
    { value: "needed_reduction", label: "Behövd utsläppsminskning" },
    { value: "consumption_emissions", label: "Konsumtionsutsläpp" },
    { value: "charging_points", label: "Laddinfrastruktur" },
    { value: "climate_plan", label: "Klimatplan" },
    { value: "name", label: "Namn" },
  ];

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
        case "meets_paris":
          // Sort by whether the municipality meets the Paris Agreement (Yes first)
          if (
            a.budgetRunsOut === "Håller budget" &&
            b.budgetRunsOut === "Håller budget"
          ) {
            // Both meet the Paris Agreement, sort by hitNetZero date
            return (
              new Date(a.hitNetZero).getTime() -
              new Date(b.hitNetZero).getTime()
            );
          }
          if (a.budgetRunsOut === "Håller budget") return -1;
          if (b.budgetRunsOut === "Håller budget") return 1;
          return 0;
        case "reduction":
          // Sort by emission reduction (negative is better)
          return (
            a.historicalEmissionChangePercent -
            b.historicalEmissionChangePercent
          );
        case "needed_reduction":
          // Sort by needed emission reduction (low to high)
          return a.neededEmissionChangePercent - b.neededEmissionChangePercent;
        case "consumption_emissions":
          // Sort by consumption emissions per capita (low to high)
          return a.totalConsumptionEmission - b.totalConsumptionEmission;
        case "charging_points":
          // Sort by EV charging infrastructure (low ratio is better)
          return (
            a.electricVehiclePerChargePoints - b.electricVehiclePerChargePoints
          );
        case "climate_plan":
          // Sort by climate plan year (newest first, missing plans last)
          if (a.climatePlanYear === "Saknar plan") {
            return 1;
          }
          if (b.climatePlanYear === "Saknar plan") {
            return -1;
          }
          return (
            parseInt(b.climatePlanYear as unknown as string) -
            parseInt(a.climatePlanYear as unknown as string)
          );
        case "name":
          // Sort by name alphabetically
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMunicipalities.map((municipality) => (
          <MunicipalityCard
            key={municipality.name}
            municipality={municipality}
          />
        ))}
      </div>
    </div>
  );
}
