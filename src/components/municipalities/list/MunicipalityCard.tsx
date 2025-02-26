import { Link } from "react-router-dom";
import { ArrowUpRight, FileText, Info, TrendingDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import type { Municipality } from "@/types/municipality";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MunicipalityCardProps {
  municipality: Municipality;
}

export function MunicipalityCard({ municipality }: MunicipalityCardProps) {
  const { t } = useTranslation();
  const meetsParis = municipality.budgetRunsOut === "Håller budget";

  const lastYearEmission = municipality.approximatedHistoricalEmission.at(-1);
  const lastYearEmissionsKtons = lastYearEmission
    ? (lastYearEmission.value / 1000).toFixed(1)
    : "N/A";
  const lastYear = lastYearEmission?.year.toString();

  const emissionsChange = municipality.historicalEmissionChangePercent;

  const noClimatePlan =
    municipality.climatePlanLink === "Saknar plan" ||
    municipality.climatePlanLink === undefined;

  return (
    <Link
      to={`/municipalities/${municipality.name}`}
      className="block bg-black-2 rounded-level-2 p-8 space-y-8 hover:bg-black-1/80 transition-colors"
    >
      <div className="space-y-6">
        <h2 className="text-3xl font-light">{municipality.name}</h2>

        {/* <div className="space-y-2"> //fixme add as soon as we have time!
        <h2 className="text-5xl font-light">{municipality.name}</h2>

        {/* <div className="space-y-2"> //fixme add!
>>>>>>> staging
          <div className="text-sm text-grey uppercase tracking-wide">
            UTSLÄPPSRANKING
          </div>
          <div className="text-3xl font-light">{municipality.rank}</div>
        </div> */}
      </div>

      <div className="space-y-2">
        <div className="text-sm text-grey">
          {t("municipalities.card.meetsParis", { name: municipality.name })}
        </div>
        <div
          className={cn(
            "text-3xl font-light",
            meetsParis ? "text-green-3" : "text-pink-3"
          )}
        >
          {meetsParis ? "Ja" : "Nej"}
          {meetsParis ? (
            <div className="flex items-center text-sm text-grey mt-2">
              {t("municipalities.card.netZero")}
              <Text variant="body" className="text-green-3 ml-1">
                {municipality.hitNetZero.toString()}
              </Text>
            </div>
          ) : (
            <div className="flex items-center text-sm text-grey mt-2">
              {t("municipalities.card.budgetRunsOut")}
              <Text variant="body" className="text-pink-3 ml-1">
                {municipality.budgetRunsOut.toString()}
              </Text>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black-1">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-grey mb-2 text-lg">
            <TrendingDown className="w-4 h-4" />
            <span>{t("municipalities.card.emission", { year: lastYear })}</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {t("municipalities.card.emissionInfo", { year: lastYear })}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="text-3xl font-light">
            {lastYearEmissionsKtons ? (
              <span className="text-orange-3">
                {lastYearEmissionsKtons}
                <span className="text-lg text-grey ml-1">
                  {t("municipalities.card.kTCO2")}
                </span>
              </span>
            ) : (
              <span className="text-grey">
                {t("municipalities.card.noData")}
              </span>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-grey mb-2 text-lg">
            <TrendingDown className="w-4 h-4" />
            <span>{t("municipalities.card.changeRate")}</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("municipalities.card.changeRateInfo")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="text-3xl font-light">
            {emissionsChange !== null ? (
              <span className={meetsParis ? "text-green-3" : "text-pink-3"}>
                {emissionsChange > 0 ? "+" : ""}
                {Math.ceil(emissionsChange).toLocaleString("sv-SE")}%
              </span>
            ) : (
              <span className="text-grey">
                {t("municipalities.card.noData")}
              </span>
            )}
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
        className="block bg-black-1 rounded-level-2 p-6 hover:bg-black-1/80 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div>
            <Text
              variant="h6"
              className="flex items-center gap-2 text-white mb-2"
            >
              <FileText className="w-6 h-6 text-white" />
              <span>{t("municipalities.card.climatePlan")}</span>
            </Text>
            <Text
              variant="body"
              className={cn(noClimatePlan ? "text-pink-3" : "text-green-3")}
            >
              {noClimatePlan
                ? "Saknar plan"
                : t("municipalities.card.adopted", {
                    year: municipality.climatePlanYear,
                  })}
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
