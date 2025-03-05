import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCompanyDetails } from "@/hooks/useCompanyDetails";
import { CompanyOverview } from "@/components/companies/detail/CompanyOverview";
import { CompanyHistory } from "@/components/companies/detail/CompanyHistory";
import { Text } from "@/components/ui/text";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

export function CompanyDetailPage() {
  const { t } = useTranslation();
  const { id, slug } = useParams<{ id: string; slug?: string }>();
  const actualId = id?.startsWith('Q') ? id : id;
  const { company, loading, error } = useCompanyDetails(actualId!);
  const [selectedYear, setSelectedYear] = useState<string>("latest");
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-16">
        <div className="h-12 w-1/3 bg-black-1 rounded" />
        <div className="h-96 bg-black-1 rounded-level-1" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-24">
        <Text variant="h3" className="text-red-500 mb-4">
          {t("companyDetailPage.errorTitle")}
        </Text>
        <Text variant="body">{t("companyDetailPage.errorDescription")}</Text>
      </div>
    );
  }

  if (!company || !company.reportingPeriods.length) {
    return (
      <div className="text-center py-24">
        <Text variant="h3" className="text-red-500 mb-4">
          {t("companyDetailPage.notFoundTitle")}
        </Text>
        <Text variant="body">{t("companyDetailPage.notFoundDescription")}</Text>
      </div>
    );
  }

  const sortedPeriods = [...company.reportingPeriods].sort(
    (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
  );

  const selectedPeriod =
    selectedYear === "latest"
      ? sortedPeriods[0]
      : sortedPeriods.find(
          (p) => new Date(p.endDate).getFullYear().toString() === selectedYear
        ) || sortedPeriods[0];

  const selectedIndex = sortedPeriods.findIndex(
    (p) => p.endDate === selectedPeriod.endDate
  );
  const previousPeriod =
    selectedIndex < sortedPeriods.length - 1
      ? sortedPeriods[selectedIndex + 1]
      : undefined;

  // Get the latest reporting period for SEO content
  const latestPeriod = sortedPeriods[0];
  const latestYear = latestPeriod ? new Date(latestPeriod.endDate).getFullYear() : new Date().getFullYear();
  
  // Calculate total emissions for SEO content
  const totalEmissions = latestPeriod?.emissions?.calculatedTotalEmissions;
  const formattedEmissions = totalEmissions 
    ? (totalEmissions >= 1000 
        ? (totalEmissions / 1000).toFixed(1) + ' tusen' 
        : totalEmissions.toFixed(1))
    : 'N/A';
  
  // Get industry for SEO content
  const industry = company.industry?.industryGics?.sv?.sectorName || t("companyDetailPage.unknownIndustry");

  return (
    <>
      <Helmet>
        <title>{company.name} - {t("companyDetailPage.metaTitle")} - Klimatkollen</title>
        <meta name="description" content={t("companyDetailPage.metaDescription", { 
          company: company.name,
          industry: industry
        })} />
        <meta property="og:title" content={`${company.name} - ${t("companyDetailPage.metaTitle")} - Klimatkollen`} />
        <meta property="og:description" content={t("companyDetailPage.metaDescription", { 
          company: company.name,
          industry: industry
        })} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://klimatkollen.se/foretag/${createSlug(company.name)}-${actualId}`} />
        <link rel="canonical" href={`https://klimatkollen.se/foretag/${createSlug(company.name)}-${actualId}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": company.name,
            "description": company.description,
            "url": `https://klimatkollen.se/foretag/${createSlug(company.name)}-${actualId}`,
            "industry": industry
          })}
        </script>
      </Helmet>
      
      {/* SEO-optimized content section - hidden visually but available to search engines */}
      <div className="sr-only">
        <h1>{company.name} - {t("companyDetailPage.seoText.climateData")}</h1>
        <p>
          {t("companyDetailPage.seoText.intro", { 
            company: company.name,
            industry: industry
          })}
        </p>
        <h2>{t("companyDetailPage.seoText.emissionsHeading")}</h2>
        <p>
          {t("companyDetailPage.seoText.emissionsText", { 
            company: company.name,
            emissions: formattedEmissions,
            year: latestYear
          })}
        </p>
        <h2>{t("companyDetailPage.seoText.industryHeading")}</h2>
        <p>
          {t("companyDetailPage.seoText.industryText", { 
            company: company.name,
            industry: industry
          })}
        </p>
        {company.goals && company.goals.length > 0 && (
          <>
            <h2>{t("companyDetailPage.seoText.goalsHeading")}</h2>
            <p>
              {t("companyDetailPage.seoText.goalsText", { 
                company: company.name
              })}
            </p>
          </>
        )}
        {company.initiatives && company.initiatives.length > 0 && (
          <>
            <h2>{t("companyDetailPage.seoText.initiativesHeading")}</h2>
            <p>
              {t("companyDetailPage.seoText.initiativesText", { 
                company: company.name
              })}
            </p>
          </>
        )}
      </div>
      
      <div className="space-y-16 max-w-[1400px] mx-auto">
      <CompanyOverview
        company={company}
        selectedPeriod={selectedPeriod}
        previousPeriod={previousPeriod}
        onYearSelect={setSelectedYear}
        selectedYear={selectedYear}
      />

      <CompanyHistory company={company} />
      {/* <CompanyScope3
        emissions={selectedPeriod.emissions!}
        year={new Date(selectedPeriod.endDate).getFullYear()}
        isRealEstate={company.industry?.industryGics?.sectorCode === "60"}
        historicalData={sortedPeriods
          .filter((period) => period.emissions?.scope3?.categories?.length > 0)
          .map((period) => ({
            year: new Date(period.endDate).getFullYear(),
            categories: period.emissions!.scope3!.categories!,
          }))
          .sort((a, b) => a.year - b.year)}
      />

      <CompanySectorComparison company={company} /> */}
      </div>
    </>
  );
}
