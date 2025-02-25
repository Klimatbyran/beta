import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { regions } from "@/lib/constants/regions";
import { useTranslation } from "react-i18next";

interface municipalities.filterProps {
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy:
    | "emissions"
    | "reduction"
    | "climate_plan"
    | "bicycle"
    | "charging"
    | "name";
  onSortChange: (sort: typeof sortBy) => void;
}

const sortOptions = [
  { value: "reduction", label: "Utsläppsminskning" },
  { value: "emissions", label: "Totala utsläpp" },
  { value: "climate_plan", label: "Klimatplan" },
  { value: "bicycle", label: "Cykelvägar" },
  { value: "charging", label: "Laddinfrastruktur" },
  { value: "name", label: "Namn" },
] as const;

export function municipalities.filter({
  selectedRegion,
  onRegionChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}: municipalities.filterProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative w-[300px]">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-grey w-4 h-4" />
          <Input
            type="text"
            placeholder={t("municipalities.filter.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8 py-1 h-8 bg-black-1 border-none text-sm"
          />
        </div>

        <Select value={selectedRegion} onValueChange={onRegionChange}>
          <SelectTrigger className="w-[200px] bg-black-1">
            <SelectValue placeholder={t("municipalities.filter.selectRegion")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              {t("municipalities.filter.allRegions")}
            </SelectItem>
            {Object.keys(regions).map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={sortBy}
          onValueChange={(value) => onSortChange(value as typeof sortBy)}
        >
          <SelectTrigger className="w-[200px] bg-black-1">
            <SelectValue placeholder={t("municipalities.filter.sortBy")} />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {t(`municipalities.filter.sortOptions.${option.value}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
