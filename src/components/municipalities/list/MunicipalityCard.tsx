import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import type { Municipality } from "@/types/municipality";

interface MunicipalityCardProps {
  municipality: Municipality;
}

export function MunicipalityCard({ municipality }: MunicipalityCardProps) {
  return (
    <Link
      to={`/municipalities/${municipality.name}`}
      className="block bg-black-2 rounded-level-2 p-8 space-y-8 hover:bg-black-1/80 transition-colors"
    >
      <div className="space-y-6">
        <h2 className="text-5xl font-light">{municipality.name}</h2>

        {/* <div className="space-y-2"> //fixme add!
          <div className="text-sm text-grey uppercase tracking-wide">
            UTSLÄPPSRANKING
          </div>
          <div className="text-3xl font-light">{municipality.rank}</div>
        </div> */}
      </div>

      <div className="bg-black-1 rounded-level-2 p-6">
        <div className="space-y-2">
          <div className="text-sm text-grey">
            Håller {municipality.name} Parisavtalet?
          </div>
          <div
            className={cn(
              "text-5xl font-light",
              municipality.budgetRunsOut === "Håller budget"
                ? "text-green-3"
                : "text-pink-3"
            )}
          >
            {municipality.budgetRunsOut === "Håller budget" ? "Ja" : "Nej"}
            {municipality.budgetRunsOut === "Håller budget" ? (
              <div className="flex items-center text-sm text-grey mt-2">
                Kommunen når nollutsläpp
                <Text variant="body" className="text-green-3 ml-1">
                  {municipality.hitNetZero}
                </Text>
              </div>
            ) : (
              <div className="flex items-center text-sm text-grey mt-2">
                Koldioxidbudgeten tar slut
                <Text variant="body" className="text-pink-3 ml-1">
                  {municipality.budgetRunsOut}
                </Text>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-grey">Årlig utsläppsminskning</div>
          <div
            className={cn(
              "text-6xl font-light",
              municipality.historicalEmissionChangePercent >=
                municipality.neededEmissionChangePercent
                ? "text-green-3"
                : "text-pink-3"
            )}
          >
            {municipality.historicalEmissionChangePercent > 0 ? "+" : ""}
            {municipality.historicalEmissionChangePercent.toFixed(1)}%
          </div>
        </div>
        <div>
          <div className="text-sm text-grey">Behövd utsläppsminskning</div>
          <div className="text-6xl font-light text-green-3">
            -{municipality.neededEmissionChangePercent.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black-1">
        <div>
          <Text variant="body" className="mb-2 text-grey">
            Konsumtionsutsläpp per invånare (tusen kg CO₂e)
          </Text>
          <Text className="text-6xl text-pink-3">
            {(municipality.totalConsumptionEmission / 1000).toFixed(1)}
          </Text>
        </div>
        <div>
          <Text variant="body" className="mb-2 text-grey">
            Elbilar per offentlig laddpunkt
          </Text>
          <Text
            className={cn(
              "text-6xl",
              municipality.electricVehiclePerChargePoints > 10
                ? "text-pink-3"
                : "text-green-3"
            )}
          >
            {municipality.electricVehiclePerChargePoints === 1e10
              ? "-"
              : municipality.electricVehiclePerChargePoints.toFixed(1)}
          </Text>
        </div>
      </div>
      <a
        href={
          municipality.climatePlanLink &&
          municipality.climatePlanLink !== "Saknar plan"
            ? municipality.climatePlanLink
            : undefined
        }
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-black-1 rounded-level-2 p-4 hover:bg-black-1/80 transition-colors"
        onClick={(e) => e.stopPropagation()} // Prevent event bubbling
      >
        <div className="flex items-center justify-between">
          <div>
            <Text variant="h5">Klimatplan</Text>
            <Text variant="body" className="text-grey">
              {municipality.climatePlanYear === "Saknar plan"
                ? "Saknar plan"
                : `Antagen ${municipality.climatePlanYear}`}
            </Text>
          </div>
          {municipality.climatePlanLink &&
            municipality.climatePlanLink !== "Saknar plan" && (
              <ArrowUpRight className="w-6 h-6" />
            )}
        </div>
      </a>
    </Link>
  );
}
