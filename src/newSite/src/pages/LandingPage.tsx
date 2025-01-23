import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RankedList } from '@/components/RankedList';
import { ContentBlock } from '@/components/ContentBlock';
import { Typewriter } from '@/components/ui/typewriter';
import { SwedenMap } from '@/components/municipalities/SwedenMap';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useCompanies } from '@/hooks/useCompanies';

/**
 * MOCKED DATA TO REPLACE BEFORE LAUNCH:
 * 
 * 1. Map Data:
 *    - Replace municipalityData with real geographic and statistical data:
 *      - Municipality boundaries (SVG paths)
 *      - Current metrics and values
 *      - Proper coordinate system
 * 
 * 2. Rankings:
 *    - Replace topMunicipalities with real ranking data:
 *      - Actual emission reductions
 *      - Verified calculations
 *      - Proper time periods
 * 
 * 3. Typewriter Text:
 *    - Review and finalize all typewriter messages
 *    - Ensure translations are correct
 *    - Verify claims match actual functionality
 */

// Mock data for the map - replace with real data
const municipalityData = [
  { id: '1', name: 'Tingsryd', value: 7.9, path: 'M100,200 L120,220 L110,240 Z' },
  { id: '2', name: 'Forshaga', value: 6.4, path: 'M90,180 L110,200 L100,220 Z' },
  { id: '3', name: 'Bromölla', value: 6.4, path: 'M80,160 L100,180 L90,200 Z' },
  { id: '4', name: 'Ulricehamn', value: 6.2, path: 'M70,140 L90,160 L80,180 Z' },
  { id: '5', name: 'Munkfors', value: 5.6, path: 'M60,120 L80,140 L70,160 Z' },
  { id: '6', name: 'Uppvidinge', value: 0.3, path: 'M110,220 L130,240 L120,260 Z' },
  { id: '7', name: 'Åre', value: 0.3, path: 'M120,240 L140,260 L130,280 Z' },
  { id: '8', name: 'Östhammar', value: 0.6, path: 'M130,260 L150,280 L140,300 Z' },
  { id: '9', name: 'Sundbyberg', value: 0.7, path: 'M140,280 L160,300 L150,320 Z' },
  { id: '10', name: 'Surahammar', value: 0.7, path: 'M150,300 L170,320 L160,340 Z' },
];

const topMunicipalities = [
  { id: '1', name: 'Tingsryd', value: -10.1 },
  { id: '2', name: 'Forshaga', value: -8.7 },
  { id: '3', name: 'Bromölla', value: -8.4 },
  { id: '4', name: 'Ulricehamn', value: -8.4 },
  { id: '5', name: 'Munkfors', value: -7.9 },
];

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

export function LandingPage() {
  const [selectedTab, setSelectedTab] = useState('companies');
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>();
  const { companies } = useCompanies();

  // Get top 5 companies by emissions reduction
  const topCompanies = companies
    .sort((a, b) => b.metrics.emissionsReduction - a.metrics.emissionsReduction)
    .slice(0, 5)
    .map(company => ({
      id: company.wikidataId,
      name: company.name,
      value: company.metrics.emissionsReduction,
    }));

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24">
        <div className="mb-12">
          <Tabs
            defaultValue="companies"
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="w-[400px]"
          >
            <TabsList className="grid w-full grid-cols-2 bg-black-1">
              <TabsTrigger value="companies" className="data-[state=active]:bg-black-2">
                Företag
              </TabsTrigger>
              <TabsTrigger value="municipalities" className="data-[state=active]:bg-black-2">
                Kommuner
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-7xl font-light tracking-tight">
            Hur går det med?
          </h1>
          
          <div className="h-[120px] flex items-center justify-center text-7xl font-light">
            <Typewriter
              text={selectedTab === 'companies' ? companyTypewriterTexts : municipalityTypewriterTexts}
              speed={70}
              className="text-[#E2FF8D]"
              waitTime={2000}
              deleteSpeed={40}
              cursorChar="_"
            />
          </div>
        </div>
        
        <Button 
          className="mt-12 rounded-full px-8 py-6 text-lg bg-white text-black hover:bg-white/90"
          asChild
        >
          <a href={selectedTab === 'companies' ? "/companies" : "/municipalities"}>
            Se resultat
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </Button>
      </div>

      {/* Map Section */}
      {selectedTab === 'municipalities' && (
        <div className="py-24 bg-black-2">
          <div className="container mx-auto">
            <div className="max-w-[800px] mx-auto">
              <div className="mb-12">
                <Text variant="h2">Hur går det med?</Text>
                <Text variant="muted" className="mt-2">
                  Vi utför mätningar av den samlade längden av cykelvägar per invånare, inklusive alla väghållare
                  (statliga, kommunala och enskilda). Den senaste tillgängliga datan är från år 2022.
                </Text>
              </div>

              <div className="flex items-start gap-12">
                <div className="flex-1">
                  <SwedenMap
                    data={municipalityData}
                    selectedId={selectedMunicipality}
                    onSelect={setSelectedMunicipality}
                  />
                </div>

                <div className="flex-1 space-y-4">
                  {municipalityData.slice(0, 5).map(municipality => (
                    <div
                      key={municipality.id}
                      className={cn(
                        "p-4 rounded-level-2 transition-colors cursor-pointer",
                        selectedMunicipality === municipality.id
                          ? "bg-blue-5/30"
                          : "bg-black-1 hover:bg-black-1/50"
                      )}
                      onClick={() => setSelectedMunicipality(municipality.id)}
                    >
                      <Text variant="large">{municipality.name}</Text>
                      <Text variant="large" className="text-blue-2">
                        {municipality.value.toFixed(1)}m
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rankings Section */}
      <div className="py-24">
        <div className="container mx-auto">
          <h2 className="text-5xl font-light text-center mb-16">Vilka gör det bäst?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <RankedList
              title="Sveriges bästa kommuner"
              items={topMunicipalities}
              type="municipality"
            />
            <RankedList
              title="Företag som minskat utsläppen mest"
              items={topCompanies}
              type="company"
            />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="pb-24">
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