import { useState, useMemo } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, ReferenceDot, Area } from 'recharts';
import { EmissionsBarChart } from './EmissionsBarChart';
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
import { analyzeTrend, projectEmissions, getDataQualityColor, interpolateScope3Categories } from '@/lib/calculations/emissions';
import { getCategoryColor, getCategoryName } from '@/lib/constants/emissions';
import type { ReportingPeriod } from '@/types/company';

interface EmissionsHistoryProps {
  reportingPeriods: ReportingPeriod[];
  onYearSelect?: (year: string) => void;
  className?: string;
  features?: {
    interpolateScope3: boolean;
    guessBaseYear: boolean;
    compositeTrend: boolean;
    outlierDetection: boolean;
  };
}

type DataView = 'overview' | 'scopes' | 'categories';

export function EmissionsHistory({ 
  reportingPeriods, 
  onYearSelect, 
  className,
  features = {
    interpolateScope3: true,
    guessBaseYear: true,
    compositeTrend: true,
    outlierDetection: true
  }
}: EmissionsHistoryProps) {
  // Validate input data
  if (!reportingPeriods?.length) {
    return (
      <div className="text-center py-12">
        <Text variant="muted">No reporting periods available</Text>
      </div>
    );
  }

  // Check if any period has scope 3 categories
  const hasScope3Categories = useMemo(() => 
    reportingPeriods.some(period => 
      period.emissions?.scope3?.categories?.length
    ),
    [reportingPeriods]
  );

  const [dataView, setDataView] = useState<DataView>(() => {
    // If no scope 3 categories exist, default to overview instead
    if (!hasScope3Categories && 'categories' === 'categories') {
      return 'overview';
    }
    return 'overview';
  });

  // Only interpolate if the feature is enabled
  const processedPeriods = useMemo(() => 
    features.interpolateScope3 
      ? interpolateScope3Categories(reportingPeriods)
      : reportingPeriods,
    [reportingPeriods, features.interpolateScope3]
  );

  // Calculate trend analysis with processed data and feature flags
  const trendAnalysis = useMemo(() => 
    analyzeTrend(processedPeriods, features),
    [processedPeriods, features]
  );

  // Calculate annual reduction rate
  const annualReductionRate = trendAnalysis.hasEmissions 
    ? -trendAnalysis.trend.slope / (trendAnalysis.trend.dataPoints[0]?.value || 1) * 100
    : 0;

  // Process data based on view
  const chartData = useMemo(() => {
    if (!processedPeriods?.length) return [];

    const sortedPeriods = [...processedPeriods]
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    return sortedPeriods.map(period => {
      if (!period) return null;

      const year = new Date(period.startDate).getFullYear();
      const baseData = {
        year,
        total: period.emissions?.calculatedTotalEmissions || 0,
        scope1: period.emissions?.scope1?.total || 0,
        scope2: period.emissions?.scope2?.calculatedTotalEmissions || 0,
        scope3: period.emissions?.scope3?.calculatedTotalEmissions || 0,
      }

      if (dataView === 'categories' && period.emissions?.scope3?.categories) {
        const categoryData: Record<string, number> = {};
        const interpolatedData: Record<string, boolean> = {};
        
        period.emissions.scope3.categories.forEach(cat => {
          if (cat) {
            categoryData[`cat${cat.category}`] = cat.total;
            interpolatedData[`cat${cat.category}Interpolated`] = 'isInterpolated' in cat;
          }
        });
        
        return {
          ...baseData,
          ...interpolatedData,
        };
      }

      return baseData;
    }).filter(Boolean); // Remove any null entries
  }, [processedPeriods, dataView]);

  // Calculate projected data
  const firstPoint = chartData[0];
  const projectedData = useMemo(() => {
    if (!firstPoint?.total) return [];

    const projections = projectEmissions(trendAnalysis, firstPoint.total);
    
    // Merge actual data with projections
    return chartData.map(point => {
      if (!point) return null;
      return {
        ...point,
        trend: projections.find(p => p.year === point.year)?.trend,
        paris: projections.find(p => p.year === point.year)?.paris,
        // Calculate gap between trend and Paris target
        gap: (projections.find(p => p.year === point.year)?.trend || 0) - 
             (projections.find(p => p.year === point.year)?.paris || 0)
      };
    }).filter(Boolean).concat(
      projections
        .filter(p => p.year > (chartData[chartData.length - 1]?.year || 0))
        .map(p => ({
          year: p.year,
          total: null,
          trend: p.trend,
          paris: p.paris,
          // Calculate gap for projected years
          gap: p.trend - p.paris
        }))
    );
  }, [trendAnalysis, firstPoint?.total, chartData]);

  // Calculate total excess emissions compared to Paris Agreement pathway
  const totalExcessEmissions = useMemo(() => {
    return projectedData.reduce((sum, point) => {
      if (!point) return sum;
      const excess = (point.trend || 0) - (point.paris || 0);
      return sum + (excess > 0 ? excess : 0);
    }, 0);
  }, [projectedData]);

  // Determine status text and colors
  const getStatusInfo = (reductionRate: number) => {
    if (reductionRate >= 7.6) {
      return {
        status: "Följer Parisavtalet",
        color: "text-green-3",
        message: "Överträffar Parisavtalets krav på 7,6% minskning"
      };
    } else if (reductionRate >= 3) {
      return {
        status: "På rätt väg",
        color: "text-[#E2FF8D]",
        message: "Behöver öka till minst 7,6% för att nå Parisavtalets mål"
      };
    } else if (reductionRate > 0) {
      return {
        status: "Otillräcklig minskning",
        color: "text-pink-3",
        message: "Långt ifrån Parisavtalets krav på 7,6% årlig minskning"
      };
    } else {
      return {
        status: "Ökande utsläpp",
        color: "text-pink-3",
        message: "Utsläppen ökar istället för att minska"
      };
    }
  };

  const statusInfo = getStatusInfo(annualReductionRate);
  const periodYear = reportingPeriods[0]?.endDate 
    ? new Date(reportingPeriods[0].endDate).getFullYear()
    : new Date().getFullYear();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black-1 px-4 py-3 rounded-level-2">
          <div className="text-sm font-medium mb-2">{label}</div>
          {payload.map((entry: any) => {
            // Skip gap data in tooltip
            if (entry.dataKey === 'gap') return null;
            
            let name = entry.name;
            if (entry.dataKey.startsWith('cat')) {
              const categoryId = parseInt(entry.dataKey.replace('cat', ''));
              name = getCategoryName(categoryId);
            }
            
            return (
              <div key={entry.dataKey} className="text-sm">
                <span className="text-grey mr-2">{name}:</span>
                <span style={{ color: entry.color }}>
                  {Math.round(entry.value).toLocaleString()} ton CO₂e
                </span>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  const handleClick = (data: any) => {
    if (data?.activePayload?.[0]?.payload?.total) {
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
                  <p>Historiska utsläpp och trend mot 2030. Klicka på en punkt för att välja år.</p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </div>
          <Text variant="muted">Ton CO₂e per år</Text>
        </div>

        <div className="flex items-center gap-8">
          <Tabs value={dataView} onValueChange={(value) => setDataView(value as DataView)}>
            <TabsList className="bg-black-1">
              <TabsTrigger value="overview">Översikt</TabsTrigger>
              <TabsTrigger value="scopes">Scope 1-3</TabsTrigger>
              <TabsTrigger 
                value="categories" 
                disabled={!hasScope3Categories}
                className={cn(
                  !hasScope3Categories && "opacity-50 cursor-not-allowed",
                  "relative group"
                )}
              >
                Scope 3-kategorier
                {!hasScope3Categories && (
                  <TooltipProvider>
                    <UITooltip>
                      <TooltipTrigger className="absolute inset-0" />
                      <TooltipContent>
                        <p>Ingen Scope 3-data tillgänglig</p>
                      </TooltipContent>
                    </UITooltip>
                  </TooltipProvider>
                )}
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {dataView === 'overview' && (
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
          )}
        </div>
      </div>

      <div className="h-[400px]">
        {dataView === 'overview' ? (
          <EmissionsBarChart 
            data={chartData.map(d => ({
              year: d?.year,
              scope1: d?.scope1 || 0,
              scope2: d?.scope2 || 0,
              scope3: d?.scope3 || 0,
            }))}
          />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={projectedData} 
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
              domain={[0, 'auto']}
              padding={{ top: 0, bottom: 0 }}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {dataView === 'overview' && (
              <>
                {/* Gap area between trend and Paris target */}
                <Area
                  type="monotone"
                  dataKey="gap"
                  fill="rgba(240, 117, 154, 0.1)"
                  stroke="none"
                  fillOpacity={0.3}
                  activeDot={false}
                  name="Gap"
                  baseValue={(d) => Math.min(d.trend || 0, d.paris || 0)}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="white"
                  strokeWidth={2}
                  dot={{ r: 4, fill: 'white', cursor: 'pointer' }}
                  activeDot={{ r: 6, fill: 'white', cursor: 'pointer' }}
                  connectNulls
                  name="Totala utsläpp"
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
                  x={2030}
                  y={projectedData.find(d => d?.year === 2030)?.trend || 0}
                  r={6}
                  fill="#F0759A"
                  stroke="none"
                />
              </>
            )}

            {dataView === 'scopes' && (
              <>
                <Line
                  type="monotone"
                  dataKey="scope1"
                  stroke="var(--orange-3)"
                  strokeWidth={2}
                  dot={{ r: 4, fill: 'var(--orange-3)' }}
                  name="Scope 1"
                />
                <Line
                  type="monotone"
                  dataKey="scope2"
                  stroke="var(--pink-3)"
                  strokeWidth={2}
                  dot={{ r: 4, fill: 'var(--pink-3)' }}
                  name="Scope 2"
                />
                <Line
                  type="monotone"
                  dataKey="scope3"
                  stroke="var(--blue-2)"
                  strokeWidth={2}
                  dot={{ r: 4, fill: 'var(--blue-2)' }}
                  name="Scope 3"
                />
              </>
            )}

            {dataView === 'categories' && chartData[0] && Object.keys(chartData[0])
              .filter(key => key.startsWith('cat') && !key.includes('Interpolated'))
              .map(categoryKey => {
                const categoryId = parseInt(categoryKey.replace('cat', ''));
                const isInterpolatedKey = `${categoryKey}Interpolated`;
                
                return (
                  <Line
                    key={categoryKey}
                    type="monotone"
                    dataKey={categoryKey}
                    stroke={getCategoryColor(categoryId)}
                    strokeWidth={2}
                    strokeDasharray={(data: any) => data[isInterpolatedKey] ? "4 4" : "0"}
                    dot={{ 
                      r: 4, 
                      fill: getCategoryColor(categoryId),
                      strokeDasharray: (data: any) => data[isInterpolatedKey] ? "2 2" : "0"
                    }}
                    name={getCategoryName(categoryId)}
                  />
                );
              })}
          </LineChart>
            </ResponsiveContainer>
        )}
      </div>

      {/* Status Section */}
      <div className="mt-8 p-6 bg-black-1 rounded-level-2">
        <div className="space-y-6">
          <div className="flex items-baseline gap-2">
            <Text variant="h4">Status {periodYear}:</Text>
            {trendAnalysis.hasEmissions ? (
              <Text variant="h4" className={statusInfo.color}>
                {statusInfo.status}
              </Text>
            ) : (
              <Text variant="h4" className="text-grey">
                Inga utsläpp rapporterade
              </Text>
            )}
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <Text variant="muted" className="mb-2">Årlig minskningstakt</Text>
              {trendAnalysis.hasEmissions ? (
                <>
                  <div className="flex items-baseline gap-2">
                    <Text variant="large" className={statusInfo.color}>
                      {annualReductionRate > 0 ? 
                        `${annualReductionRate.toFixed(1)}%` : 
                        `+${(-annualReductionRate).toFixed(1)}%`}
                    </Text>
                    <Text variant="muted">per år</Text>
                  </div>
                  <Text variant="small" className="text-grey mt-1">
                    {statusInfo.message}
                  </Text>
                </>
               ) : (
                <Text variant="muted">
                  Ingen minskningstakt kan beräknas
                </Text>
              )}
            </div>

            <div>
              <Text variant="muted" className="mb-2">Prognos 2030</Text>
              {trendAnalysis.hasEmissions ? (
                <>
                  <div className="flex items-baseline gap-2">
                    <Text variant="large" className={
                      annualReductionRate >= 7.6 ? "text-green-3" : "text-pink-3"
                    }>
                      {Math.round(projectedData.find(d => d?.year === 2030)?.trend || 0).toLocaleString()}
                    </Text>
                    <Text variant="muted">ton CO₂e</Text>
                  </div>
                  <Text variant="small" className="text-grey mt-1">
                    {annualReductionRate >= 7.6 ? 
                      "På väg att nå målet med god marginal" :
                      `${Math.round(totalExcessEmissions).toLocaleString()} ton överskjutande utsläpp totalt`}
                  </Text>
                </>
              ) : (
                <Text variant="muted">
                  Ingen prognos tillgänglig
                </Text>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Text variant="muted">Datakvalitet:</Text>
            <Text className="flex items-center gap-2" style={{ color: getDataQualityColor(trendAnalysis.dataQuality) }}>
              {trendAnalysis.dataQuality === 'high' ? 'Hög' :
               trendAnalysis.dataQuality === 'medium' ? 'Medium' : 'Låg'}
              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{trendAnalysis.message}</p>
                    {trendAnalysis.hasScope3 && !trendAnalysis.consistentScope3 && (
                      <p className="mt-2">
                        Scope 3 rapporterat i {Math.round(trendAnalysis.scope3Coverage * 100)}% av åren.
                      </p>
                    )}
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
