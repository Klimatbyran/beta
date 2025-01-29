import { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, ReferenceDot } from 'recharts';
import { Info } from 'lucide-react';
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Text } from "@/components/ui/text";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type MetricView = 'bicycle' | 'charging' | 'emissions';

interface MunicipalityMetricsHistoryProps {
  municipality: {
    name: string;
    bicycleMetrePerCapita: number;
    electricVehiclePerChargePoints: number;
    trendEmission: number;
    totalApproximatedHistoricalEmission: number;
  };
  className?: string;
}

export function MunicipalityMetricsHistory({ municipality, className }: MunicipalityMetricsHistoryProps) {
  const [view, setView] = useState<MetricView>('emissions');

  // Mock historical data - replace with real data when available
  const historicalData = {
    bicycle: [
      { year: 2020, value: municipality.bicycleMetrePerCapita * 0.8 },
      { year: 2021, value: municipality.bicycleMetrePerCapita * 0.9 },
      { year: 2022, value: municipality.bicycleMetrePerCapita * 0.95 },
      { year: 2023, value: municipality.bicycleMetrePerCapita },
    ],
    charging: [
      { year: 2020, value: municipality.electricVehiclePerChargePoints * 1.3 },
      { year: 2021, value: municipality.electricVehiclePerChargePoints * 1.2 },
      { year: 2022, value: municipality.electricVehiclePerChargePoints * 1.1 },
      { year: 2023, value: municipality.electricVehiclePerChargePoints },
    ],
    emissions: [
      { year: 2020, value: municipality.totalApproximatedHistoricalEmission },
      { year: 2021, value: municipality.totalApproximatedHistoricalEmission * 0.95 },
      { year: 2022, value: municipality.totalApproximatedHistoricalEmission * 0.9 },
      { year: 2023, value: municipality.trendEmission },
    ],
  };

  const getMetricInfo = (metricType: MetricView) => {
    switch (metricType) {
      case 'bicycle':
        return {
          title: 'Cykelvägar per invånare',
          unit: 'm',
          description: 'Meter cykelväg per invånare',
          target: 3.8, // EU target
          reference: 2.8, // National average
        };
      case 'charging':
        return {
          title: 'Elbilar per laddpunkt',
          unit: 'bilar',
          description: 'Antal elbilar per offentlig laddpunkt',
          target: 10, // Example target
          reference: 15, // Example national average
        };
      case 'emissions':
        return {
          title: 'Territoriella utsläpp',
          unit: 'ton CO₂e',
          description: 'Totala territoriella utsläpp',
          target: municipality.totalApproximatedHistoricalEmission * 0.5, // 50% reduction target
          reference: municipality.totalApproximatedHistoricalEmission,
        };
    }
  };

  const currentMetric = getMetricInfo(view);
  const data = historicalData[view];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black-1 px-4 py-3 rounded-level-2">
          <Text variant="small" className="text-grey">{label}</Text>
          <Text variant="large">
            {Math.round(payload[0].value).toLocaleString()} {currentMetric.unit}
          </Text>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={cn("bg-black-2 rounded-level-1 p-16", className)}>
      <div className="flex items-center justify-between mb-12">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Text variant="h3">Historisk utveckling</Text>
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-grey" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{currentMetric.description}</p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </div>
          <Text variant="muted">{currentMetric.unit}</Text>
        </div>

        <Tabs value={view} onValueChange={(value) => setView(value as MetricView)}>
          <TabsList className="bg-black-1">
            <TabsTrigger value="bicycle">Cykelvägar</TabsTrigger>
            <TabsTrigger value="charging">Laddpunkter</TabsTrigger>
            <TabsTrigger value="emissions">Utsläpp</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <XAxis 
              dataKey="year"
              stroke="#878787"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke="#878787"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
              width={80}
              domain={['auto', 'auto']}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Main value line */}
            {view === 'emissions' ? (
              <>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="white"
                  strokeWidth={2}
                  dot={{ r: 4, fill: 'white' }}
                  activeDot={{ r: 6, fill: 'white' }}
                />
                {/* Trend line */}
                <Line
                  type="monotone"
                  dataKey={() => currentMetric.reference}
                  stroke="#F0759A"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                />
                {/* Paris agreement target */}
                <Line
                  type="monotone"
                  dataKey={() => currentMetric.target}
                  stroke="#E2FF8D"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                />
              </>
            ) : (
              <>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="white"
                  strokeWidth={2}
                  dot={{ r: 4, fill: 'white' }}
                  activeDot={{ r: 6, fill: 'white' }}
                />
                {/* Reference line for target */}
                <Line
                  type="monotone"
                  dataKey={() => currentMetric.target}
                  stroke="#E2FF8D"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                />
                {/* Reference line for national average */}
                <Line
                  type="monotone"
                  dataKey={() => currentMetric.reference}
                  stroke="#F0759A"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 p-6 bg-black-1 rounded-level-2">
        <div className="flex items-center gap-6">
          <div>
            <Text variant="muted" className="mb-2">Målbild</Text>
            <Text variant="large" className="text-[#E2FF8D]">
              {Math.round(currentMetric.target).toLocaleString()} {currentMetric.unit}
            </Text>
          </div>
          <div>
            <Text variant="muted" className="mb-2">Rikssnitt</Text>
            <Text variant="large" className="text-pink-3">
              {Math.round(currentMetric.reference).toLocaleString()} {currentMetric.unit}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
