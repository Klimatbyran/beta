import { useState } from "react";
import { useMunicipalities } from "@/hooks/useMunicipalities";
import { MunicipalityList } from "@/components/municipalities/list/MunicipalityList";
import { Text } from "@/components/ui/text";
import { useTranslation } from "react-i18next";

type SortOption = "emissions" | "reduction" | "name";

export function MunicipalitiesPage() {
  const { t } = useTranslation();
  const { municipalities, loading, error } = useMunicipalities();
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("emissions");

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
        <Text variant="h3" className="text-red-500 mb-4">
          {t("municipalitiesPage.errorTitle")}
        </Text>
        <Text variant="muted">{t("municipalitiesPage.errorDescription")}</Text>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-light">{t("municipalitiesPage.title")}</h1>
        <p className="text-sm text-grey">
          {t("municipalitiesPage.description")}
        </p>
      </div>

      <MunicipalityList
        municipalities={municipalities}
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
    </div>
  );
}
