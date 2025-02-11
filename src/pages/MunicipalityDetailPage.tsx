import { useParams } from "react-router-dom";
import { Text } from "@/components/ui/text";
import { useMunicipalityDetails } from "@/hooks/useMunicipalityDetails";
import { transformEmissionsData } from "@/types/municipality";
import { MunicipalityEmissionsGraph } from "@/components/municipalities/MunicipalityEmissionsGraph";
import { ArrowUpRight } from "lucide-react";

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

  const projectedData = transformEmissionsData(municipality);

  return (
    <div className="space-y-16 max-w-[1400px] mx-auto">
      {/* Municipality Header */}
      <div className="bg-black-2 rounded-level-1 p-16">
        <Text variant="h1">{municipality.name}</Text>
        <Text variant="body">{municipality.region}</Text>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-8">
          <div>
            <Text variant="body">Årlig utsläppsförändring sedan 2015</Text>
            <Text
              variant="h2"
              className={
                Math.abs(municipality.historicalEmissionChangePercent) >=
                municipality.neededEmissionChangePercent
                  ? "text-green-3"
                  : "text-pink-3"
              }
            >
              {municipality.historicalEmissionChangePercent.toFixed(1)}%
            </Text>
          </div>
          <div>
            <Text variant="body">
              Utsläppsminskning för att klara Parisavtalet
            </Text>
            <Text variant="h2" className="text-green-3">
              {-municipality.neededEmissionChangePercent.toFixed(1)}%
            </Text>
          </div>

          <div>
            <Text variant="body">
              Konsumtionsutsläpp per invånare (ton CO₂)
            </Text>
            <Text
              variant="h2"
              className={
                municipality.totalConsumptionEmission >= 2000
                  ? "text-pink-3"
                  : "text-green-3"
              }
            >
              {(municipality.totalConsumptionEmission / 1000).toFixed(1)}
            </Text>
          </div>
        </div>
      </div>

      <div className="bg-black-2 rounded-level-1">
        <Text variant="h3" className="p-16 pb-1">
          Utsläppsutveckling
        </Text>
        <Text variant="body" className="text-gray-500 px-16 pb-4">
          I tusen ton CO₂
        </Text>
        <MunicipalityEmissionsGraph projectedData={projectedData} />
      </div>

      <div className="bg-black-2 rounded-level-1 p-16">
        <Text variant="h3">Framtida utsläpp</Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-8">
          <div>
            <Text variant="body">Koldioxidbudget tar slut</Text>
            <Text
              variant="h2"
              className={
                municipality.budgetRunsOut === "Håller budget"
                  ? "text-green-3"
                  : "text-pink-3"
              }
            >
              {municipality.budgetRunsOut.toString()}
            </Text>
          </div>
          <div>
            <Text variant="body">Når nettonoll</Text>
            <Text
              variant="h2"
              className={
                municipality.hitNetZero === "Aldrig" ||
                new Date(municipality.hitNetZero) > new Date("2050-01-01")
                  ? "text-pink-3"
                  : "text-green-3"
              }
            >
              {municipality.hitNetZero.toString()}
            </Text>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <a
          href={
            municipality.climatePlanLink !== "Saknar plan"
              ? municipality.climatePlanLink
              : undefined
          }
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-black-2 rounded-level-2 p-8 hover:bg-black-1 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Text variant="h4">Klimatplan</Text>
              <Text
                variant="body"
                className={
                  municipality.climatePlanYear === "Saknar plan"
                    ? "text-pink-3"
                    : "text-green-3"
                }
              >
                {municipality.climatePlanYear === "Saknar plan"
                  ? "Saknar klimatplan"
                  : `Antagen ${municipality.climatePlanYear}`}
              </Text>
            </div>
            {municipality.climatePlanLink !== "Saknar plan" && (
              <ArrowUpRight className="w-6 h-6 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            )}
          </div>
        </a>

        <a
          href={municipality.procurementLink || undefined}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-black-2 rounded-level-2 p-8 hover:bg-black-1 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Text variant="h4">Klimatkrav i upphandlingar</Text>
              <div>
                <Text
                  variant="body"
                  className={
                    municipality.procurementScore === "2"
                      ? "text-green-3"
                      : "text-pink-3"
                  }
                >
                  {requirementsInProcurement}
                </Text>
              </div>
            </div>
            {municipality.procurementLink && (
              <ArrowUpRight className="w-6 h-6 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            )}
          </div>
        </a>
      </div>

      <div className="bg-black-2 rounded-level-1 p-16">
        <Text variant="h3">Elbilar</Text>
        <div className="grid grid-cols-2 gap-16 mt-8">
          <div>
            <Text variant="body">Förändring i elbilsandel</Text>
            <Text variant="h2" className="text-orange-2">
              {(municipality.electricCarChangePercent * 100).toFixed(1)}%
            </Text>
          </div>
          <div>
            <Text variant="body">Elbilar per laddpunkt</Text>
            <Text
              variant="h2"
              className={
                municipality.electricVehiclePerChargePoints
                  ? "text-green-3"
                  : "text-pink-3"
              }
            >
              {municipality.electricVehiclePerChargePoints
                ? municipality.electricVehiclePerChargePoints.toFixed(1)
                : "Inga laddpunkter"}
            </Text>
          </div>
        </div>
      </div>

      <div className="bg-black-2 rounded-level-1 p-16">
        <Text variant="h3">Övriga nyckeltal</Text>
        <div className="grid grid-cols-2 gap-16 mt-8">
          <div>
            <Text variant="body">Cykelmeter per capita</Text>
            <Text variant="h2" className="text-orange-2">
              {municipality.bicycleMetrePerCapita.toFixed(1)}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
