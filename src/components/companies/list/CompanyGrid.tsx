import { CompanyCard } from "./CompanyCard";
import { RankedCompany } from "@/hooks/useCompanies";
import { Text } from "@/components/ui/text";
import { useTranslation } from "react-i18next";

interface CompanyGridProps {
  companies: RankedCompany[];
  emptyMessage?: string;
}

export function CompanyGrid({ companies, emptyMessage }: CompanyGridProps) {
  const { t } = useTranslation();

  if (companies.length === 0) {
    return (
      <div className="text-center py-12">
        <Text variant="h3" className="text-2xl mb-2">
          {t("companiesPage.noCompaniesFound")}
        </Text>
        <Text variant="body" className="text-grey">
          {emptyMessage || t("companiesPage.tryDifferentCriteria")}
        </Text>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {companies.map((company) => (
        <div
          key={company.wikidataId}
          className="group overflow-hidden rounded-level-2"
        >
          <div
            className="bg-black-2 p-6 h-full"
            style={{
              background:
                "linear-gradient(180deg, rgba(26, 26, 26, 0.5) 0%, rgba(26, 26, 26, 0.8) 100%)",
            }}
          >
            <div className="transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-[0_0_30px_rgba(153,207,255,0.15)]">
              <CompanyCard
                {...company}
                metrics={{
                  emissionsReduction: 0,
                  displayReduction: "0%",
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
