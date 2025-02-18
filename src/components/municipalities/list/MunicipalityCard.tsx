import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import type { Municipality } from "@/types/municipality";

interface MunicipalityCardProps {
  municipality: Municipality;
}

export function MunicipalityCard({ municipality }: MunicipalityCardProps) {
  const meetsParis = municipality.budgetRunsOut === "Håller budget";
  const lastYearEmission = municipality.approximatedHistoricalEmission.at(-1);
  const lastYearEmissionsKtons = lastYearEmission
    ? (lastYearEmission.value / 1000).toFixed(1)
    : "N/A";
  const lastYear = lastYearEmission?.year.toString();

  return (
    <Link
      to={`/municipalities/${municipality.name}`}
      className="block bg-black-2 rounded-level-2 p-8 space-y-8 hover:bg-black-1/80 transition-colors"
    >
      <div className="space-y-6">
        <h2 className="text-5xl font-light">{municipality.name}</h2>

        {/* <div className="space-y-2"> //fixme add as soon as we have time!
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
              meetsParis ? "text-green-3" : "text-pink-3"
            )}
          >
            {meetsParis ? "Ja" : "Nej"}
            {meetsParis ? (
              <div className="flex items-center text-sm text-grey mt-2">
                Kommunen når nollutsläpp
                <Text variant="body" className="text-green-3 ml-1">
                  {municipality.hitNetZero.toString()}
                </Text>
              </div>
            ) : (
              <div className="flex items-center text-sm text-grey mt-2">
                Koldioxidbudgeten tar slut
                <Text variant="body" className="text-pink-3 ml-1">
                  {municipality.budgetRunsOut.toString()}
                </Text>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-grey">
            Totala utsläpp {lastYear} (tusen kg CO₂e)
          </div>
          <div className="text-6xl font-light text-orange-3">
            {lastYearEmissionsKtons}{" "}
          </div>
        </div>
        <div>
          <div className="text-sm text-grey">
            Årlig utsläppsminskning sen Parisavtalet
          </div>
          <div
            className={cn(
              "text-6xl font-light",
              meetsParis ? "text-green-3" : "text-pink-3"
            )}
          >
            {municipality.historicalEmissionChangePercent > 0 ? "+" : ""}
            {municipality.historicalEmissionChangePercent.toFixed(1)}%
          </div>
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
        onClick={(e) => e.stopPropagation()}
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
