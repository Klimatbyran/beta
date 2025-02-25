import { useParams } from "react-router-dom";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { useMunicipalityDetails } from "@/hooks/useMunicipalityDetails";
import { transformEmissionsData } from "@/types/municipality";
import { MunicipalityEmissionsGraph } from "@/components/municipalities/MunicipalityEmissionsGraph";
import { MunicipalitySection } from "@/components/municipalities/MunicipalitySection";
import { MunicipalityStatCard } from "@/components/municipalities/MunicipalityStatCard";
import { MunicipalityLinkCard } from "@/components/municipalities/MunicipalityLinkCard";
import { useTranslation } from "react-i18next";

export function MunicipalityDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { municipality, loading, error } = useMunicipalityDetails(id || "");

  if (loading) return <Text>{t("municipalityDetailPage.loading")}</Text>;
  if (error) return <Text>{t("municipalityDetailPage.error")}</Text>;
  if (!municipality) return <Text>{t("municipalityDetailPage.noData")}</Text>;

  const requirementsInProcurement =
    municipality.procurementScore === "2"
      ? t("municipalityDetailPage.procurementScore.high")
      : municipality.procurementScore === "1"
      ? t("municipalityDetailPage.procurementScore.medium")
      : t("municipalityDetailPage.procurementScore.low");

  const emissionsData = transformEmissionsData(municipality);

  const lastYearEmissions = municipality.approximatedHistoricalEmission.at(-1);
  const lastYear = lastYearEmissions?.year;
  const lastYearEmissionsKTon = lastYearEmissions
    ? (lastYearEmissions.value / 1000).toFixed(1)
    : "N/A";

  return (
    <div className="space-y-16 max-w-[1400px] mx-auto">
      <div className="bg-black-2 rounded-level-1 p-8 md:p-16">
        <Text className="text-4xl md:text-8xl">{municipality.name}</Text>
        <Text className="text-grey">{municipality.region}</Text>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 mt-8">
          <MunicipalityStatCard
            title={t("municipalityDetailPage.totalEmissions", {
              year: lastYear,
            })}
            value={lastYearEmissionsKTon}
            valueClassName="text-orange-2"
          />
          <MunicipalityStatCard
            title={t("municipalityDetailPage.budgetRunsOut")}
            value={municipality.budgetRunsOut.toString()}
            valueClassName={
              municipality.budgetRunsOut ===
              t("municipalityDetailPage.budgetHolds")
                ? "text-green-3"
                : "text-pink-3"
            }
          />
          <MunicipalityStatCard
            title={t("municipalityDetailPage.hitNetZero")}
            value={municipality.hitNetZero.toString()}
            valueClassName={cn(
              municipality.hitNetZero === t("municipalityDetailPage.never") ||
                new Date(municipality.hitNetZero) > new Date("2050-01-01")
                ? "text-pink-3"
                : "text-green-3"
            )}
          />
        </div>
      </div>

      <div className={cn("bg-black-2 rounded-level-1 py-8 md:py-16")}>
        <div className="px-8 md:px-16">
          <Text className="text-2xl md:text-4xl">
            {t("municipalityDetailPage.emissionsDevelopment")}
          </Text>
          <Text className="text-grey">
            {t("municipalityDetailPage.inThousandTons")}
          </Text>
        </div>
        <div className="mt-8 mr-8">
          <MunicipalityEmissionsGraph projectedData={emissionsData} />
        </div>
      </div>

      <MunicipalitySection
        title={t("municipalityDetailPage.futureEmissions")}
        items={[
          {
            title: t("municipalityDetailPage.annualChangeSince2015"),
            value: `${municipality.historicalEmissionChangePercent.toFixed(
              1
            )}%`,
            valueClassName: cn(
              Math.abs(municipality.historicalEmissionChangePercent) >=
                municipality.neededEmissionChangePercent
                ? "text-green-3"
                : "text-pink-3"
            ),
          },
          {
            title: t("municipalityDetailPage.reductionToMeetParis"),
            value: `-${municipality.neededEmissionChangePercent.toFixed(1)}%`,
            valueClassName: "text-green-3",
          },
          {
            title: t("municipalityDetailPage.consumptionEmissionsPerCapita"),
            value: (municipality.totalConsumptionEmission / 1000).toFixed(1),
            valueClassName: "text-orange-2",
          },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <MunicipalityLinkCard
          title={t("municipalityDetailPage.climatePlan")}
          description={
            municipality.climatePlanYear === t("municipalityDetailPage.noPlan")
              ? t("municipalityDetailPage.noClimatePlan")
              : t("municipalityDetailPage.adopted", {
                  year: municipality.climatePlanYear,
                })
          }
          link={
            municipality.climatePlanLink !== t("municipalityDetailPage.noPlan")
              ? municipality.climatePlanLink
              : undefined
          }
          descriptionClassName={
            municipality.climatePlanYear === t("municipalityDetailPage.noPlan")
              ? "text-pink-3"
              : "text-green-3"
          }
        />
        <MunicipalityLinkCard
          title={t("municipalityDetailPage.procurementRequirements")}
          description={requirementsInProcurement}
          link={municipality.procurementLink || undefined}
          descriptionClassName={
            municipality.procurementScore === "2"
              ? "text-green-3"
              : "text-pink-3"
          }
        />
      </div>

      <MunicipalitySection
        title={t("municipalityDetailPage.sustainableTransport")}
        items={[
          {
            title: t("municipalityDetailPage.electricCarChange"),
            value: `${(municipality.electricCarChangePercent * 100).toFixed(
              1
            )}%`,
            valueClassName: "text-orange-2",
          },
          {
            title: t("municipalityDetailPage.electricCarsPerChargePoint"),
            value: municipality.electricVehiclePerChargePoints
              ? municipality.electricVehiclePerChargePoints.toFixed(1)
              : t("municipalityDetailPage.noChargePoints"),
            valueClassName: municipality.electricVehiclePerChargePoints
              ? "text-green-3"
              : "text-pink-3",
          },
          {
            title: t("municipalityDetailPage.bicycleMetrePerCapita"),
            value: municipality.bicycleMetrePerCapita.toFixed(1),
            valueClassName: "text-orange-2",
          },
        ]}
      />
    </div>
  );
}
