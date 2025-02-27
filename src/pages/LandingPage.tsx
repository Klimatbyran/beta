import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RankedList } from "@/components/RankedList";
import { ContentBlock } from "@/components/ContentBlock";
import { Typewriter } from "@/components/ui/typewriter";
import { useCompanies } from "@/hooks/useCompanies";
import { useMunicipalities } from "@/hooks/useMunicipalities";

const companyTypewriterTexts = [
  "minska sina utsläpp",
  "rapportera scope 3",
  "nå Parisavtalets mål",
  "jämföra sig med andra",
  "följa upp sina klimatmål",
];

const municipalityTypewriterTexts = [
  "minska sina utsläpp",
  "nå klimatmålen",
  "jämföra sig med andra",
  "följa upp sina åtgärder",
  "engagera medborgarna",
];

const tabName = {
  companies: "företagen",
  municipalities: "kommunerna",
};

export function LandingPage() {
  const [selectedTab, setSelectedTab] = useState("companies");
  const { companies } = useCompanies();
  const { getTopMunicipalities, getMunicipalitiesForMap } = useMunicipalities();

  // Get top 5 companies by emissions reduction
  const topCompanies = companies
    .sort((a, b) => b.metrics.emissionsReduction - a.metrics.emissionsReduction)
    .slice(0, 5)
    .map((company) => ({
      id: company.wikidataId,
      name: company.name,
      value: company.metrics.emissionsReduction,
      displayValue: company.metrics.displayReduction,
    }));

  // Get top 5 municipalities by emissions reduction
  const topMunicipalities = getTopMunicipalities(5).map((municipality) => ({
    id: municipality.id,
    name: municipality.name,
    value: municipality.historicalEmissionChangePercent,
    displayValue: municipality.historicalEmissionChangePercent.toFixed(1),
  }));

  // Get municipality data for comparison
  // const municipalityComparisonData = getMunicipalitiesForMap(10).map(
  //   (municipality) => ({
  //     id: municipality.id,
  //     name: municipality.name,
  //     value: municipality.value,
  //     rank: "1",
  //     change: Math.random() > 0.5 ? 5.2 : -3.4, // Mock data - replace with real change values
  //   })
  // );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16 md:py-24">
        <div className="mb-8 md:mb-12">
          <Tabs
            defaultValue="companies"
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="w-full max-w-xs md:max-w-md"
          >
            <TabsList className="grid w-full grid-cols-2 bg-black-1">
              <TabsTrigger
                value="companies"
                className="data-[state=active]:bg-black-2"
              >
                Företag
              </TabsTrigger>
              <TabsTrigger
                value="municipalities"
                className="data-[state=active]:bg-black-2"
              >
                Kommuner
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="max-w-lg md:max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-7xl font-light tracking-tight">
            Hur går det för {tabName[selectedTab]} att
          </h1>

          <div className="h-[80px] md:h-[120px] flex items-center justify-center text-4xl md:text-7xl font-light">
            <Typewriter
              text={
                selectedTab === "companies"
                  ? companyTypewriterTexts
                  : municipalityTypewriterTexts
              }
              speed={70}
              className="text-[#E2FF8D]"
              waitTime={2000}
              deleteSpeed={40}
              cursorChar="_"
            />
          </div>
        </div>

        <Button
          className="mt-8 md:mt-12 rounded-full px-6 md:px-8 py-4 md:py-6 text-base md:text-lg bg-white text-black hover:bg-white/90"
          asChild
        >
          <a
            href={
              selectedTab === "companies" ? "/companies" : "/municipalities"
            }
          >
            Se resultat
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </Button>
      </div>

      {/* FIXME reintroduce at a later stage
      {selectedTab === "municipalities" && (
        <div className="py-16 md:py-24 bg-black-2">
          <div className="container mx-auto">
            <div className="max-w-lg md:max-w-[1200px] mx-auto">
              <MunicipalityComparison
                title="Hur går det med?"
                description="Vi utför mätningar av den samlade längden av cykelvägar per invånare, inklusive alla väghållare (statliga, kommunala och enskilda). Den senaste tillgängliga datan är från år 2022."
                nationalAverage={2.8}
                euTarget={3.8}
                unit="m"
                municipalities={municipalityComparisonData}
              />
            </div>
          </div>
        </div>
      )} */}

      <div className="py-8 md:py-24">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center mb-8 md:mb-16">
            Vilka gör det bäst?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RankedList
              title="Sveriges bästa kommuner"
              description="Årlig utsläppsminskning sedan Parisavtalet 2015"
              items={topMunicipalities}
              type="municipality"
            />
            <RankedList
              title="Företag som minskat utsläppen mest"
              description="Utsläppsminskning mellan 2023 och 2024"
              items={topCompanies}
              type="company"
            />
          </div>
        </div>
      </div>

      <div className="pb-8 md:pb-16">
        <div className="container mx-auto">
          <ContentBlock
            title="Vilka är vi?"
            content="Klimatkollen är en medborgarplattform som tillgängliggör klimatdata och bygger stöd för minskade utsläpp enligt Parisavtalet. Vi tror på kraften i enkel och tilltalande datavisualisering för att öka kunskapen och engagemanget kring klimatdebatten."
          />
        </div>
      </div>
    </div>
  );
}
