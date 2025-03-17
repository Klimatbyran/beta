import { useState } from "react";
import { useCompanies } from "@/hooks/useCompanies";
import { useCompanyFilters, useSectorNames } from "@/hooks/useCompanyFilters";
import { SectionedCompanyList } from "@/components/companies/list/SectionedCompanyList";
import { CompanyFilters } from "@/components/companies/filters/CompanyFilters";
import { CompanyGrid } from "@/components/companies/list/CompanyGrid";
import { useTranslation } from "react-i18next";
import { PageSEO } from "@/components/SEO/PageSEO";
import { PageHeader } from "@/components/layout/PageHeader";

export function CompaniesPage() {
  const { t } = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { companies } = useCompanies();
  const sectorNames = useSectorNames();

  // Create sector options with translations
  const sectorOptions = [
    { value: "all", label: t("companiesPage.allSectors") },
    ...Object.entries(sectorNames).map(([code, name]) => ({
      value: code,
      label: name,
    })),
  ] as const;

  // Create sort options with translations
  const sortOptions = [
    {
      value: "emissions_change",
      label: t("companiesPage.sortingOptions.emissionsChange"),
    },
    {
      value: "total_emissions",
      label: t("companiesPage.sortingOptions.totalEmissions"),
    },
    {
      value: "scope3_coverage",
      label: t("companiesPage.sortingOptions.scope3Coverage"),
    },
    { value: "name_asc", label: t("companiesPage.sortingOptions.nameAsc") },
    { value: "name_desc", label: t("companiesPage.sortingOptions.nameDesc") },
  ];

  const {
    searchQuery,
    setSearchQuery,
    sectors,
    setSectors,
    sortBy,
    setSortBy,
    filteredCompanies,
  } = useCompanyFilters(companies as any);

  const activeFilters = [
    ...sectors.map((sec) => ({
      label: `${t("companiesPage.filtering")} ${
        sectorNames[sec as keyof typeof sectorNames] || sec
      }`,
      onRemove: () => setSectors(sectors.filter((s) => s !== sec)),
    })),
    ...(searchQuery
      ? [
          {
            label: searchQuery,
            onRemove: () => setSearchQuery(""),
          },
        ]
      : []),
    {
      label: `${t("companiesPage.sorting")} ${
        sortOptions.find((opt) => opt.value === sortBy)?.label || sortBy
      }`,
      onRemove: () => setSortBy("emissions_reduction"),
    },
  ];

  // Add this before passing to CompanyGrid
  const companiesWithMetrics = filteredCompanies.map((company) => ({
    ...company,
    metrics: {
      emissionsReduction: 0,
      displayReduction: "0%",
    },
    tags: [],
  }));

  return (
    <div className="max-w-[1400px] mx-auto">
      <PageSEO
        title={t("companiesPage.title")}
        description={t("companiesPage.description")}
        canonicalUrl="https://klimatkollen.se/companies"
      />

      <PageHeader
        title={t("companiesPage.title")}
        description={t("companiesPage.description")}
      />

      <CompanyFilters
        isFilterOpen={isFilterOpen}
        toggleFilter={() => setIsFilterOpen(!isFilterOpen)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sectors={sectors}
        setSectors={setSectors}
        sectorOptions={sectorOptions}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOptions={sortOptions}
        activeFilters={activeFilters}
      />

      {viewMode === "grid" ? (
        <CompanyGrid companies={companiesWithMetrics} />
      ) : (
        <SectionedCompanyList
          companies={companiesWithMetrics}
          sortBy={sortBy}
        />
      )}
    </div>
  );
}
