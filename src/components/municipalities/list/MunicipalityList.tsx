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
  const [sortBy, setSortBy] = useState<"meets_paris" | "name">("meets_paris");
  const [sortDirection, setSortDirection] = useState<"best" | "worst">("best");

  const sortOptions = [
    { value: "meets_paris", label: "Möter Parisavtalet" },
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
      case "meets_paris": {
        const aMeetsParis = a.budgetRunsOut === "Håller budget";
        const bMeetsParis = b.budgetRunsOut === "Håller budget";
        if (aMeetsParis && bMeetsParis) {
          return (
            directionMultiplier *
            (new Date(a.hitNetZero).getTime() -
              new Date(b.hitNetZero).getTime())
          );
        }
        if (aMeetsParis) {
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
      }
      case "name":
        return directionMultiplier * a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 flex-wrap">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full flex-wrap">
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

          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value as typeof sortBy)}
          >
            <SelectTrigger className="w-full md:w-[250px] h-10 bg-black-1">
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
