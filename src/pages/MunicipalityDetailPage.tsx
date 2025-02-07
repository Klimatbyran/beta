import { useParams } from "react-router-dom";
import { Text } from "@/components/ui/text";
import { useMunicipalityDetails } from "@/hooks/useMunicipalityDetails";

export function MunicipalityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { municipality, loading, error } = useMunicipalityDetails(id || "");

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading data</Text>;
  if (!municipality) return <Text>No data available</Text>;

  const requirementsInProcurement =
    municipality.procurementScore === "2"
      ? "Ja"
      : municipality.procurementScore === "1"
      ? "Kanske"
      : "Nej";

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
                  : "text-red-500"
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
                municipality.totalConsumptionEmission >= 7000
                  ? "text-red-700"
                  : municipality.totalConsumptionEmission >= 6000
                  ? "text-red-500"
                  : "text-red-300"
              }
            >
              {(municipality.totalConsumptionEmission / 1000).toFixed(1)}
            </Text>
          </div>
        </div>
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
                  ? "text-blue-3"
                  : "text-red-500"
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
                  ? "text-red-500"
                  : "text-blue-3"
              }
            >
              {municipality.hitNetZero.toString()}
            </Text>
          </div>
        </div>
      </div>

      <div className="bg-black-2 rounded-level-1 p-16">
        <Text variant="h3">Klimatplan</Text>
        <Text variant="body">År: {municipality.climatePlanYear}</Text>
        <Text variant="body">{municipality.climatePlanComment}</Text>
        {municipality.climatePlanLink !== "Saknar plan" && (
          <a
            href={municipality.climatePlanLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-3 underline"
          >
            Läs mer
          </a>
        )}
      </div>

      {/* Electric Vehicle Information */}
      <div className="bg-black-2 rounded-level-1 p-16">
        <Text variant="h3">Elfordon</Text>
        <div className="grid grid-cols-2 gap-16 mt-8">
          <div>
            <Text variant="body">Förändring i elbilsandel</Text>
            <Text
              variant="h2"
              className={
                municipality.electricCarChangePercent * 100 >= 8
                  ? "text-blue-3"
                  : municipality.electricCarChangePercent * 100 >= 7
                  ? "text-orange-2"
                  : municipality.electricCarChangePercent * 100 >= 6
                  ? "text-orange-500"
                  : municipality.electricCarChangePercent * 100 >= 5
                  ? "text-red-300"
                  : municipality.electricCarChangePercent * 100 >= 4
                  ? "text-red-500"
                  : "text-red-700"
              }
            >
              {(municipality.electricCarChangePercent * 100).toFixed(1)}%
            </Text>
          </div>
          <div>
            <Text variant="body">Elbilar per laddpunkt</Text>
            <Text
              variant="h2"
              className={
                !municipality.electricVehiclePerChargePoints
                  ? "text-red-700"
                  : municipality.electricVehiclePerChargePoints <= 10
                  ? "text-blue-3"
                  : municipality.electricVehiclePerChargePoints <= 20
                  ? "text-orange-2"
                  : municipality.electricVehiclePerChargePoints <= 30
                  ? "text-orange-500"
                  : "text-red-500"
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
            <Text
              variant="h2"
              className={
                municipality.bicycleMetrePerCapita >= 5
                  ? "text-blue-3"
                  : municipality.bicycleMetrePerCapita >= 4
                  ? "text-orange-2"
                  : municipality.bicycleMetrePerCapita >= 3
                  ? "text-orange-500"
                  : municipality.bicycleMetrePerCapita >= 2
                  ? "text-red-300"
                  : municipality.bicycleMetrePerCapita >= 1
                  ? "text-red-500"
                  : "text-red-700"
              }
            >
              {municipality.bicycleMetrePerCapita.toFixed(1)}
            </Text>
          </div>
          <div>
            <Text variant="body">Klimatkrav i upphandlingar</Text>
            <Text
              variant="h2"
              className={
                municipality.procurementScore === "2"
                  ? "text-blue-3"
                  : municipality.procurementScore === "1"
                  ? "text-orange-2"
                  : "text-red-500"
              }
            >
              {requirementsInProcurement}
            </Text>
            {municipality.procurementLink && (
              <a
                href={municipality.procurementLink}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Läs mer
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
