import { useMemo } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, ReferenceDot } from 'recharts';
import { Info } from 'lucide-react';
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

interface EmissionsHistoryProps {
  reportingPeriods: Array<{
    startDate: string;
    endDate: string;
    emissions: {
      calculatedTotalEmissions: number;
    } | null;
  }>;
  onYearSelect?: (year: string) => void;
  className?: string;
}

function findFirstRelevantYear(chartData: Array<{ year: number; emissions: number }>) {
  // Must have at least 2 points to calculate rate of change
  if (chartData.length < 2) return chartData[0]?.year;

  // Start from the most recent year and work backwards
  for (let i = chartData.length - 1; i > 0; i--) {
    const current = chartData[i];
    const previous = chartData[i - 1];
    
    // Calculate year-over-year rate of change
    const rateOfChange = Math.abs(
      (current.emissions - previous.emissions) / previous.emissions
    ) * 100;

    // If rate of change is more than 20%, this point is not reliable for trend
    if (rateOfChange > 20) {
      // Return the current year as the starting point
      return current.year;
    }
  }

  // If no significant jumps found, use the first year
  return chartData[0].year;
}

export function EmissionsHistory({ reportingPeriods, onYearSelect, className }: EmissionsHistoryProps) {
  const chartData = useMemo(() => {
    return [...reportingPeriods]
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      .map(period => ({
        year: new Date(period.startDate).getFullYear(),
        emissions: period.emissions?.calculatedTotalEmissions || 0,
      }));
  }, [reportingPeriods]);

  // Find first relevant year for trendline
  const firstRelevantYear = findFirstRelevantYear(chartData);
  
  // Calculate trend line using only relevant data points
  const relevantData = chartData;
  const firstPoint = relevantData[0];
  const lastPoint = relevantData[relevantData.length - 1];
  const yearDiff = lastPoint.year - firstPoint.year;
  const emissionsDiff = lastPoint.emissions - firstPoint.emissions;
  const yearlyChange = yearDiff > 0 ? (emissionsDiff / yearDiff) : 0;

  // Project trend to 2050 with minimum value of 0
  const trendData = Array.from({ length: 2050 - firstPoint.year + 1 }, (_, i) => ({
    year: firstPoint.year + i,
    trend: Math.max(0, firstPoint.emissions + (yearlyChange * i)),
  }));

  // Calculate Paris agreement target line (assuming 7.6% yearly reduction needed)
  const parisData = Array.from({ length: 2050 - firstPoint.year + 1 }, (_, i) => ({
    year: firstPoint.year + i,
    paris: Math.max(0, firstPoint.emissions * Math.pow(0.924, i)), // 7.6% reduction per year, minimum 0
  }));

  // Merge all data points
  const allData = trendData.map(point => ({
    ...point,
    emissions: chartData.find(d => d.year === point.year)?.emissions || null,
    paris: parisData.find(d => d.year === point.year)?.paris,
  }));

  // Calculate domain for Y axis
  const maxValue = Math.max(
    ...chartData.map(d => d.emissions),
    ...trendData.map(d => d.trend),
    ...parisData.map(d => d.paris)
  );

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black-1 px-4 py-3 rounded-level-2">
          <div className="text-sm font-medium mb-2">{label}</div>
          {payload.map((entry: any) => (
            <div key={entry.dataKey} className="text-sm">
              <span className="text-grey mr-2">{entry.name}:</span>
              <span className={cn(
                entry.dataKey === 'paris' ? 'text-[#E2FF8D]' :
                entry.dataKey === 'trend' ? 'text-pink-3' :
                'text-white'
              )}>
                {Math.round(entry.value).toLocaleString()} ton CO₂e
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const handleClick = (data: any) => {
    if (data && data.activePayload && data.activePayload[0].payload.emissions !== null) {
      onYearSelect?.(data.activePayload[0].payload.year.toString());
    }
  };

  return (
    <div className={cn("bg-black-2 rounded-level-1 p-16", className)}>
      <div className="flex items-center justify-between mb-12">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Text variant="h3">Historiska utsläpp</Text>
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-grey" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Historiska utsläpp och trend mot 2050. Klicka på en punkt för att välja år.</p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </div>
          <Text variant="muted">Ton CO₂e per år</Text>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-pink-3" />
            <Text variant="muted">Trend</Text>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#E2FF8D]" />
            <Text variant="muted">Parisavtalet</Text>
          </div>
        </div>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={allData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            onClick={handleClick}
          >
            <XAxis 
              dataKey="year"
              stroke="#878787"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
              padding={{ left: 0, right: 0 }}
            />
            <YAxis 
              stroke="#878787"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
              width={80}
              domain={[0, maxValue * 1.1]}
              padding={{ top: 0, bottom: 0 }}
            />
            <Tooltip content={<CustomTooltip />} />
            
            <Line
              type="monotone"
              dataKey="emissions"
              stroke="white"
              strokeWidth={2}
              dot={{ r: 4, fill: 'white', cursor: 'pointer' }}
              activeDot={{ r: 6, fill: 'white', cursor: 'pointer' }}
              connectNulls
              name="Faktiska utsläpp"
            />
            
            <Line
              type="monotone"
              dataKey="trend"
              stroke="#F0759A"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
              name="Trend"
            />
            
            <Line
              type="monotone"
              dataKey="paris"
              stroke="#E2FF8D"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
              name="Parisavtalet"
            />

            <ReferenceDot
              x={2032}
              y={allData.find(d => d.year === 2032)?.trend || 0}
              r={6}
              fill="#F0759A"
              stroke="none"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Trend info */}
      <div className="mt-8 p-6 bg-black-1 rounded-level-2">
        <div className="flex items-baseline gap-2">
          <Text variant="h4">Med nuvarande trend når företaget</Text>
          <Text variant="h4" className="text-pink-3">
            {Math.round(allData.find(d => d.year === 2032)?.trend || 0).toLocaleString()}
          </Text>
          <Text variant="h4">ton CO₂e år 2032</Text>
        </div>
        <Text variant="muted" className="mt-2">
          För att nå Parisavtalets mål krävs en minskning med 7,6% per år
        </Text>
      </div>
    </div>
  );
}