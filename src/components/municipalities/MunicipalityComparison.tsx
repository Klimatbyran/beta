import { useState } from 'react';
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface Municipality {
  id: string;
  name: string;
  value: number;
  rank: string;
  change?: number;
}

interface MunicipalityComparisonProps {
  title?: string;
  description?: string;
  nationalAverage?: number;
  euTarget?: number;
  unit?: string;
  municipalities: Municipality[];
  className?: string;
}

export function MunicipalityComparison({
  title = "Hur går det med?",
  description = "Vi utför mätningar av den samlade längden av cykelvägar per invånare, inklusive alla väghållare (statliga, kommunala och enskilda). Den senaste tillgängliga datan är från år 2022.",
  nationalAverage = 2.8,
  euTarget = 3.8,
  unit = "m",
  municipalities,
  className
}: MunicipalityComparisonProps) {
  const [activeTab, setActiveTab] = useState('cyklarna');

  const tabs = [
    { id: 'cyklarna', label: 'Cyklarna' },
    { id: 'elbilarna', label: 'Elbilarna' },
    { id: 'klimatplanerna', label: 'Klimatplanerna' },
    { id: 'konsumtionen', label: 'Konsumtionen' },
    { id: 'laddarna', label: 'Laddarna' },
  ];

  return (
    <div className={cn("space-y-8", className)}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <Text variant="h2">{title}</Text>
          <Text variant="muted" className="max-w-2xl">
            {description}
          </Text>
        </div>

        {/* Metrics */}
        <div className="space-y-8 text-right">
          <div>
            <Text variant="large">RIKSSNITT</Text>
            <Text className="text-7xl font-light">
              {nationalAverage}
              <span className="text-2xl">{unit}</span>
            </Text>
          </div>
          <div>
            <Text variant="large">EU:S MÅLBILD</Text>
            <Text className="text-7xl font-light">
              {euTarget}
              <span className="text-2xl">{unit}</span>
            </Text>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-transparent border border-black-1 p-2 h-auto">
          {tabs.map(tab => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className={cn(
                "rounded-full data-[state=active]:bg-white data-[state=active]:text-black",
                "transition-colors hover:text-white"
              )}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'cyklarna' && (
          {municipalities.map((municipality, index) => (
            <div
              key={municipality.id}
              className="flex items-center justify-between py-4 border-t border-black-1"
            >
              <div className="flex items-center gap-8">
                <Text variant="large" className="text-blue-2 w-12">
                  {String(index + 1).padStart(2, '0')}
                </Text>
                <Text variant="large">{municipality.name}</Text>
              </div>
              <div className="flex items-center gap-4">
                <Text variant="large" className="text-blue-2">
                  {municipality.value.toFixed(1)}
                  <span className="text-sm text-grey ml-1">{unit}</span>
                </Text>
                {municipality.change && (
                  <Text 
                    variant="small" 
                    className={cn(
                      "px-2 rounded",
                      municipality.change > 0 
                        ? "text-green-3 bg-green-5/30" 
                        : "text-pink-3 bg-pink-5/30"
                    )}
                  >
                    {municipality.change > 0 ? '+' : ''}{municipality.change}%
                  </Text>
                )}
              </div>
            </div>
          ))}
        )}

        {activeTab === 'elbilarna' && (
          <div className="text-center py-12">
            <Text variant="h3" className="text-grey">Kommer snart</Text>
            <Text variant="muted" className="mt-2">Vi samlar in data om elbilar</Text>
          </div>
        )}

        {activeTab === 'klimatplanerna' && (
          <div className="text-center py-12">
            <Text variant="h3" className="text-grey">Kommer snart</Text>
            <Text variant="muted" className="mt-2">Vi analyserar kommunernas klimatplaner</Text>
          </div>
        )}

        {activeTab === 'konsumtionen' && (
          <div className="text-center py-12">
            <Text variant="h3" className="text-grey">Kommer snart</Text>
            <Text variant="muted" className="mt-2">Vi samlar in data om konsumtionsutsläpp</Text>
          </div>
        )}

        {activeTab === 'laddarna' && (
          <div className="text-center py-12">
            <Text variant="h3" className="text-grey">Kommer snart</Text>
            <Text variant="muted" className="mt-2">Vi samlar in data om laddinfrastruktur</Text>
          </div>
        )}
      </div>
    </div>
  );
}
