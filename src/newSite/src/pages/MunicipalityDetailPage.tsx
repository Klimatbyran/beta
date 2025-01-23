import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Info, Building2, TreePine, ArrowUpRight } from 'lucide-react';
import { Text } from "@/components/ui/text";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmissionsHistory } from '@/components/companies/EmissionsHistory';
import { KeyMetricsComparison } from '@/components/KeyMetricsComparison';

/**
 * MOCKED DATA TO REPLACE BEFORE LAUNCH:
 * 
 * 1. Municipality Details:
 *    - Replace municipalityData object with real API data including:
 *      - Basic info (name, description, rank)
 *      - Emissions data (historical, current, target)
 *      - Target dates
 *      - Yearly reduction rates
 * 
 * 2. Metrics Data:
 *    - Replace metrics array with real data for:
 *      - Bicycle paths per capita
 *      - Charging stations
 *      - Other environmental metrics
 *    - Update sources and years to match actual data sources
 * 
 * 3. Report Links:
 *    - Add real links to climate plans and action documents
 *    - Ensure proper error handling for missing documents
 */

const municipalityData = {
  id: "1",
  name: "Alingsås",
  description: "Alingsås är en kommun i Västra Götalands län med cirka 40 000 invånare. Kommunen har ett aktivt klimatarbete och har antagit ambitiösa mål för att minska sina utsläpp.",
  rank: "124/290",
  targetDate: "26 feb 2028",
  emissions: {
    historical: 915.7,
    current: 1086.2,
    target: 256.7,
  },
  yearlyReduction: -3,
  reportingPeriods: [
    {
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      emissions: {
        calculatedTotalEmissions: 1086.2,
      }
    },
    {
      startDate: "2022-01-01",
      endDate: "2022-12-31",
      emissions: {
        calculatedTotalEmissions: 1120.4,
      }
    },
    {
      startDate: "2021-01-01",
      endDate: "2021-12-31",
      emissions: {
        calculatedTotalEmissions: 1156.8,
      }
    }
  ],
  metrics: [
    {
      name: "Cykelvägar",
      icon: <TreePine className="w-6 h-6 text-white" />,
      category: "Transport",
      metrics: {
        local: { value: "2.1", label: "Meter per invånare" },
        national: { value: "1.8", label: "Rikssnitt" },
        target: { value: "3.0", label: "Målbild 2030" },
      },
      source: "Trafikverket",
      year: 2023,
    },
    {
      name: "Laddstolpar",
      icon: <Building2 className="w-6 h-6 text-white" />,
      category: "Infrastruktur",
      metrics: {
        local: { value: "12.4", label: "Per 1000 invånare" },
        national: { value: "8.2", label: "Rikssnitt" },
        target: { value: "25.0", label: "Målbild 2030" },
      },
      source: "Power Circle",
      year: 2023,
    }
  ]
};

export function MunicipalityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [selectedYear, setSelectedYear] = useState<string>('latest');

  const sortedPeriods = [...municipalityData.reportingPeriods].sort(
    (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
  );

  const selectedPeriod = selectedYear === 'latest' 
    ? sortedPeriods[0]
    : sortedPeriods.find(p => new Date(p.endDate).getFullYear().toString() === selectedYear) || sortedPeriods[0];

  const periodYear = new Date(selectedPeriod.endDate).getFullYear();

  return (
    <div className="space-y-16 max-w-[1400px] mx-auto">
      {/* Municipality Header */}
      <div className="bg-black-2 rounded-level-1 p-16">
        <div className="flex items-start justify-between mb-12">
          <div className="space-y-4">
            <Text variant="display">{municipalityData.name}</Text>
            <Text variant="muted" className="text-lg max-w-3xl">
              {municipalityData.description}
            </Text>
          </div>
          <div className="w-16 h-16 rounded-full bg-[#FDE7CE]/30 flex items-center justify-center">
            <TreePine className="w-8 h-8 text-[#FDE7CE]" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-16">
          <div>
            <Text variant="muted" className="mb-2">Ranking</Text>
            <Text variant="large">
              {municipalityData.rank}
            </Text>
          </div>
          
          <div>
            <Text variant="muted" className="mb-2">Koldioxidbudget tar slut</Text>
            <Text variant="large">
              {municipalityData.targetDate}
            </Text>
          </div>
          
          <div>
            <Text variant="muted" className="mb-2">Årlig minskning</Text>
            <Text variant="large" className={municipalityData.yearlyReduction > 0 ? "text-green-3" : "text-pink-3"}>
              {municipalityData.yearlyReduction}%
            </Text>
          </div>
        </div>
      </div>

      {/* Year Selector and Total Emissions */}
      <div className="bg-black-2 rounded-level-1 p-16">
        <div className="flex items-baseline justify-between mb-12">
          <div className="flex items-baseline gap-4">
            <Text variant="h3">Totala utsläpp</Text>
            <Text variant="muted">(tusen ton CO₂e)</Text>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-grey" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Territoriella utsläpp inom kommunens gränser</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <Select 
            value={selectedYear} 
            onValueChange={setSelectedYear}
          >
            <SelectTrigger className="w-[180px] bg-black-1">
              <SelectValue placeholder="Välj år" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Senaste året</SelectItem>
              {sortedPeriods.map(period => {
                const year = new Date(period.endDate).getFullYear().toString();
                return (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        
        <Text className="text-[120px] font-light text-orange-2 tracking-tighter leading-none">
          {selectedPeriod.emissions.calculatedTotalEmissions.toLocaleString()}
        </Text>
      </div>

      {/* Emissions History */}
      <EmissionsHistory 
        reportingPeriods={municipalityData.reportingPeriods}
        onYearSelect={setSelectedYear}
      />

      {/* Key Metrics */}
      <KeyMetricsComparison 
        title="Nyckeltal"
        data={municipalityData.metrics}
      />

      {/* Action Links */}
      <div className="grid grid-cols-2 gap-8">
        <a 
          href="#klimatplan"
          className="group bg-black-2 rounded-level-2 p-8 hover:bg-black-1 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Text variant="h4">Klimatplan</Text>
              <Text className="text-grey">Se kommunens klimatplan och åtgärder</Text>
            </div>
            <ArrowUpRight className="w-6 h-6 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </a>

        <a 
          href="#atgarder"
          className="group bg-black-2 rounded-level-2 p-8 hover:bg-black-1 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Text variant="h4">Åtgärder</Text>
              <Text className="text-grey">Utforska kommunens klimatåtgärder</Text>
            </div>
            <ArrowUpRight className="w-6 h-6 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </a>
      </div>
    </div>
  );
}