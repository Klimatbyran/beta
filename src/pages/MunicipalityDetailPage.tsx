import { useParams } from "react-router-dom";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { useMunicipalityDetails } from "@/hooks/useMunicipalityDetails";
import { transformEmissionsData } from "@/types/municipality";
import { MunicipalityEmissionsGraph } from "@/components/municipalities/MunicipalityEmissionsGraph";
import { MunicipalitySection } from "@/components/municipalities/MunicipalitySection";
import { MunicipalityStatCard } from "@/components/municipalities/MunicipalityStatCard";
import { MunicipalityLinkCard } from "@/components/municipalities/MunicipalityLinkCard";

export function MunicipalityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { municipality, loading, error } = useMunicipalityDetails(id || "");

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading data</Text>;
  if (!municipality) return <Text>No data available</Text>;

  const requirementsInProcurement =
    municipality.procurementScore === "2"
      ? "Kommunen ställer klimatkrav i upphandlingar"
      : municipality.procurementScore === "1"
      ? "Kommunen ställer kanske klimatkrav i upphandlingar"
      : "Kommunen ställer inte klimatkrav i upphandlingar";

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
            title={`Totala utsläpp ${lastYear} i tusen ton CO₂`}
            value={lastYearEmissionsKTon}
            valueClassName="text-orange-2"
          />
          <MunicipalityStatCard
            title="Koldioxidbudgeten tar slut"
            value={municipality.budgetRunsOut.toString()}
            valueClassName={
              municipality.budgetRunsOut === "Håller budget"
                ? "text-green-3"
                : "text-pink-3"
            }
          />
          <MunicipalityStatCard
            title="Når nettonoll"
            value={municipality.hitNetZero.toString()}
            valueClassName={cn(
              municipality.hitNetZero === "Aldrig" ||
                new Date(municipality.hitNetZero) > new Date("2050-01-01")
                ? "text-pink-3"
                : "text-green-3"
            )}
          />
        </div>
      </div>

      <MunicipalitySection
        title="Utsläppsutveckling"
        items={[
          {
            title: "I tusen ton CO₂",
            value: <MunicipalityEmissionsGraph projectedData={emissionsData} />,
          },
        ]}
      />

      <MunicipalitySection
        title="Framtida utsläpp"
        items={[
          {
            title: "Årlig utsläppsförändring sedan 2015",
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
            title: "Utsläppsminskning för att klara Parisavtalet",
            value: `-${municipality.neededEmissionChangePercent.toFixed(1)}%`,
            valueClassName: "text-green-3",
          },
          {
            title: "Konsumtionsutsläpp per invånare i ton CO₂",
            value: (municipality.totalConsumptionEmission / 1000).toFixed(1),
            valueClassName: cn(
              municipality.totalConsumptionEmission >= 2000
                ? "text-pink-3"
                : "text-green-3"
            ),
          },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <MunicipalityLinkCard
          title="Klimatplan"
          description={
            municipality.climatePlanYear === "Saknar plan"
              ? "Saknar klimatplan"
              : `Antagen ${municipality.climatePlanYear}`
          }
          link={
            municipality.climatePlanLink !== "Saknar plan"
              ? municipality.climatePlanLink
              : undefined
          }
          descriptionClassName={
            municipality.climatePlanYear === "Saknar plan"
              ? "text-pink-3"
              : "text-green-3"
          }
        />
        <MunicipalityLinkCard
          title="Klimatkrav i upphandlingar"
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
        title="Hållbar transport"
        items={[
          {
            title: "Förändring i elbilsandel",
            value: `${(municipality.electricCarChangePercent * 100).toFixed(
              1
            )}%`,
            valueClassName: "text-orange-2",
          },
          {
            title: "Elbilar per laddpunkt",
            value: municipality.electricVehiclePerChargePoints
              ? municipality.electricVehiclePerChargePoints.toFixed(1)
              : "Inga laddpunkter",
            valueClassName: municipality.electricVehiclePerChargePoints
              ? "text-green-3"
              : "text-pink-3",
          },
          {
            title: "Cykelmeter per capita",
            value: municipality.bicycleMetrePerCapita.toFixed(1),
            valueClassName: "text-orange-2",
          },
        ]}
      />
    </div>
  );
}
