import { useState, useMemo, useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  // ReferenceDot,
  // Area,
} from "recharts";
import { Info, X } from "lucide-react";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Text } from "@/components/ui/text";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  // analyzeTrend,
  // projectEmissions,
  // getDataQualityColor,
  interpolateScope3Categories,
} from "@/lib/calculations/emissions";
import { getCategoryColor, getCategoryName } from "@/lib/constants/emissions";
import type { ReportingPeriod } from "@/types/company";
import { ChartData } from "@/types/emissions"; // Adjust the import path as necessary
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

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

type DataView = "overview" | "scopes" | "categories";

export function EmissionsHistory({
  reportingPeriods,
  onYearSelect,
  className,
  features = {
    interpolateScope3: true,
    guessBaseYear: true,
    compositeTrend: true,
    outlierDetection: true,
  },
}: EmissionsHistoryProps) {
  // Validate input data
  if (!reportingPeriods?.length) {
    return (
      <div className="text-center py-12">
        <Text variant="body">No reporting periods available</Text>
      </div>
    );
  }

  // Check if any period has scope 3 categories
  const hasScope3Categories = useMemo(
    () =>
      reportingPeriods.some(
        (period) => period.emissions?.scope3?.categories?.length ?? 0 > 0
      ),
    [reportingPeriods]
  );

  const [dataView, setDataView] = useState<DataView>(() => {
    // If no scope 3 categories exist, default to overview instead
    if (!hasScope3Categories && "categories" === "categories") {
      return "overview";
    }
    return "overview";
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint if needed
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Only interpolate if the feature is enabled
  const processedPeriods = useMemo(
    () =>
      features.interpolateScope3
        ? interpolateScope3Categories(reportingPeriods)
        : reportingPeriods,
    [reportingPeriods, features.interpolateScope3]
  );

  // const trendAnalysis = useMemo(
  //   () => analyzeTrend(processedPeriods, features),
  //   [processedPeriods, features]
  // );

  // const annualReductionRate = trendAnalysis.hasEmissions
  //   ? (-trendAnalysis.trend.slope /
  //       (trendAnalysis.trend.dataPoints[0]?.value || 1)) *
  //     100
  //   : 0;

  // Process data based on view
  const chartData: ChartData[] = useMemo(() => {
    if (!processedPeriods?.length) return [];

    const sortedPeriods = [...processedPeriods].sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

    // Get last year and add 5 years
    const lastYear = new Date(
      sortedPeriods[sortedPeriods.length - 1].endDate
    ).getFullYear();
    const futureYears = Array.from({ length: 5 }, (_, i) => lastYear + i + 1);

    // Extract unique category keys from historical data
    const categoryKeys = new Set(
      processedPeriods.flatMap(
        (period) =>
          period.emissions?.scope3?.categories?.map(
            (cat) => `cat${cat.category}`
          ) || []
      )
    );

    const historicalData = sortedPeriods.map((period) => {
      const year = new Date(period.startDate).getFullYear();

      // Capture original values before overriding with 0 for graph continuity
      const categoryData = [...categoryKeys].reduce<
        Record<string, number | null>
      >((acc, key) => {
        const categoryEntry = period.emissions?.scope3?.categories?.find(
          (cat) => `cat${cat.category}` === key
        );

        acc[key] = categoryEntry?.total ?? null; // Preserve null if data is missing
        return acc;
      }, {});

      return {
        year,
        total: period.emissions?.calculatedTotalEmissions ?? 0,
        scope1: period.emissions?.scope1?.total ?? 0,
        scope2: period.emissions?.scope2?.calculatedTotalEmissions ?? 0,
        scope3: period.emissions?.scope3?.calculatedTotalEmissions ?? 0,
        originalValues: { ...categoryData }, // Keep original null values
        ...Object.fromEntries(
          Object.entries(categoryData).map(([key, value]) => [key, value ?? 0]) // Graph continuity: replace null with 0
        ),
      };
    });

    // Add empty future years with null values
    const futureData = futureYears.map((year) => ({
      year,
      total: null,
      scope1: null,
      scope2: null,
      scope3: null,
      ...Object.fromEntries([...categoryKeys].map((key) => [key, undefined])),
      originalValues: Object.fromEntries(
        [...categoryKeys].map((key) => [key, null])
      ),
    }));

    console.log("Processed Periods:", processedPeriods);
    console.log("Historical Data:", historicalData);
    console.log("Future Data:", futureData);

    return [...historicalData, ...futureData];
  }, [processedPeriods]);

  // Ensure that chartData is defined before using it
  const firstPoint = chartData[0];

  // const projectedData = useMemo(() => {
  //   if (!firstPoint?.total) return [];

  //   const projections = projectEmissions(trendAnalysis, firstPoint.total);

  //   // Merge actual data with projections
  //   return chartData
  //     .map((point) => {
  //       if (!point) return null;
  //       return {
  //         ...point,
  //         trend: projections.find((p) => p.year === point.year)?.trend || 0,
  //         paris: projections.find((p) => p.year === point.year)?.paris || 0,
  //         // Calculate gap between trend and Paris target
  //         gap:
  //           (projections.find((p) => p.year === point.year)?.trend || 0) -
  //           (projections.find((p) => p.year === point.year)?.paris || 0),
  //       };
  //     })
  //     .filter(Boolean)
  //     .concat(
  //       projections
  //         .filter((p) => p.year > (chartData[chartData.length - 1]?.year || 0))
  //         .map((p) => ({
  //           year: p.year,
  //           total: 0,
  //           trend: p.trend || 0,
  //           paris: p.paris || 0,
  //           // Calculate gap for projected years
  //           gap: (p.trend || 0) - (p.paris || 0),
  //         }))
  //     );
  // }, [trendAnalysis, firstPoint?.total, chartData]);

  // Calculate total excess emissions compared to Paris Agreement pathway
  // const totalExcessEmissions = useMemo(() => {
  //   return projectedData.reduce((sum, point) => {
  //     if (!point) return sum;
  //     const excess = (point.trend || 0) - (point.paris || 0);
  //     return sum + (excess > 0 ? excess : 0);
  //   }, 0);
  // }, [projectedData]);

  // Determine status text and colors
  // const getStatusInfo = (reductionRate: number) => {
  //   if (reductionRate >= 7.6) {
  //     return {
  //       status: "Följer Parisavtalet",
  //       color: "text-green-3",
  //       message: "Överträffar Parisavtalets krav på 7,6% minskning",
  //     };
  //   } else if (reductionRate >= 3) {
  //     return {
  //       status: "På rätt väg",
  //       color: "text-[#E2FF8D]",
  //       message: "Behöver öka till minst 7,6% för att nå Parisavtalets mål",
  //     };
  //   } else if (reductionRate > 0) {
  //     return {
  //       status: "Otillräcklig minskning",
  //       color: "text-pink-3",
  //       message: "Långt ifrån Parisavtalets krav på 7,6% årlig minskning",
  //     };
  //   } else {
  //     return {
  //       status: "Ökande utsläpp",
  //       color: "text-pink-3",
  //       message: "Utsläppen ökar istället för att minska",
  //     };
  //   }
  // };

  // const statusInfo = getStatusInfo(annualReductionRate);

  // const periodYear = reportingPeriods[0]?.endDate
  //   ? new Date(reportingPeriods[0].endDate).getFullYear()
  //   : new Date().getFullYear();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black-1 px-4 py-3 rounded-level-2">
          <div className="text-sm font-medium mb-2">{label}</div>
          {payload.map((entry: any) => {
            if (entry.dataKey === "gap") return null;

            let name = entry.name;
            if (entry.dataKey.startsWith("cat")) {
              const categoryId = parseInt(entry.dataKey.replace("cat", ""));
              name = getCategoryName(categoryId);
            }

            // Extract the original value from payload
            const originalValue =
              entry.payload?.originalValues?.[entry.dataKey];

            // Correctly display "No Data Available" if original value was null
            const displayValue =
              originalValue === null
                ? "No Data Available"
                : `${Math.round(entry.value).toLocaleString()} ton CO₂e`;

            return (
              <div key={entry.dataKey} className="text-sm">
                <span className="text-grey mr-2">{name}:</span>
                <span style={{ color: entry.color }}>{displayValue}</span>
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

  // Add state for hidden scopes
  const [hiddenScopes, setHiddenScopes] = useState<
    Array<"scope1" | "scope2" | "scope3">
  >([]);

  // Add toggle handler
  const handleScopeToggle = (scope: "scope1" | "scope2" | "scope3") => {
    setHiddenScopes((prev) =>
      prev.includes(scope) ? prev.filter((s) => s !== scope) : [...prev, scope]
    );
  };

  // Add state for hidden categories
  const [hiddenCategories, setHiddenCategories] = useState<number[]>([]);

  // Add toggle handler for categories
  // const handleCategoryToggle = (categoryId: number) => {
  //   setHiddenCategories((prev) =>
  //     prev.includes(categoryId)
  //       ? prev.filter((id) => id !== categoryId)
  //       : [...prev, categoryId]
  //   );
  // };
  const handleCategoryToggle = (categoryId: number) => {
    setHiddenCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  return (
    <div
      className={cn("bg-black-2 rounded-level-1 px-4 md:px-16 py-8", className)}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-12 gap-4 md:gap-0">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Text variant="h3">Historiska utsläpp</Text>
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-grey" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Historiska utsläpp och trend mot 2030. Klicka på en punkt
                    för att ta bort linjen från grafen. Hovra över punkten för
                    att se värdena för rapporteringsperioden.
                  </p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </div>
          <Text variant="body">Ton CO₂e per år</Text>
        </div>
        {/* Switch between Tabs and Dropdown based on screen size */}
        <div className="w-full max-w-xs">
          {!isMobile ? (
            <Tabs
              value={dataView}
              onValueChange={(value) => setDataView(value as any)}
            >
              <TabsList className="bg-black-1">
                <TabsTrigger value="overview">Översikt</TabsTrigger>
                <TabsTrigger value="scopes">Scope 1-3</TabsTrigger>
                <TabsTrigger value="categories" disabled={!hasScope3Categories}>
                  Scope 3-kategorier
                </TabsTrigger>
              </TabsList>
            </Tabs>
          ) : (
            <Select
              value={dataView}
              onValueChange={(value) => setDataView(value as any)}
            >
              <SelectTrigger className="w-full bg-black-1 text-white border border-gray-600 px-3 py-2 rounded-md">
                <SelectValue placeholder="Välj visning" />
              </SelectTrigger>
              <SelectContent className="bg-black-1 text-white">
                <SelectItem value="overview">Översikt</SelectItem>
                <SelectItem value="scopes">Scope 1-3</SelectItem>
                <SelectItem value="categories" disabled={!hasScope3Categories}>
                  Scope 3-kategorier
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        {/* <div className="flex items-center gap-8">
          <Tabs
            value={dataView}
            onValueChange={(value) => setDataView(value as DataView)}
          >
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
          </Tabs> */}

        {/* {dataView === "overview" && (
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
          )} */}
        {/* </div> */}
      </div>
      <div className="h-[300px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%" className="w-full">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
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
              domain={[0, "auto"]}
              padding={{ top: 0, bottom: 0 }}
            />
            <Tooltip content={<CustomTooltip />} />

            {dataView === "overview" && (
              <>
                {/* Comment out trend lines and areas
                 {/* Gap area between trend and Paris target
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
                */}
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="white"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "white", cursor: "pointer" }}
                  activeDot={{ r: 6, fill: "white", cursor: "pointer" }}
                  connectNulls
                  name="Totala utsläpp"
                />
                {/* Comment out trend and Paris lines
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
                */}
              </>
            )}

            {dataView === "scopes" && (
              <>
                {!hiddenScopes.includes("scope1") && (
                  <Line
                    type="monotone"
                    dataKey="scope1"
                    stroke="#F0759A"
                    strokeWidth={2}
                    dot={{
                      r: 4,
                      fill: "#F0759A",
                      cursor: "pointer",
                      onClick: () => handleScopeToggle("scope1"),
                    }}
                    activeDot={{ r: 6, fill: "#F0759A", cursor: "pointer" }}
                    name="Scope 1"
                  />
                )}
                {!hiddenScopes.includes("scope2") && (
                  <Line
                    type="monotone"
                    dataKey="scope2"
                    stroke="#E2FF8D"
                    strokeWidth={2}
                    dot={{
                      r: 4,
                      fill: "#E2FF8D",
                      cursor: "pointer",
                      onClick: () => handleScopeToggle("scope2"),
                    }}
                    activeDot={{ r: 6, fill: "#E2FF8D", cursor: "pointer" }}
                    name="Scope 2"
                  />
                )}
                {!hiddenScopes.includes("scope3") && (
                  <Line
                    type="monotone"
                    dataKey="scope3"
                    stroke="#99CFFF"
                    strokeWidth={2}
                    dot={{
                      r: 4,
                      fill: "#99CFFF",
                      cursor: "pointer",
                      onClick: () => handleScopeToggle("scope3"),
                    }}
                    activeDot={{
                      r: 6,
                      fill: "#99CFFF",
                      cursor: "pointer",
                      onClick: () => handleScopeToggle("scope3"),
                    }}
                    name="Scope 3"
                  />
                )}
              </>
            )}

            {dataView === "categories" &&
              Object.keys(chartData[0])
                .filter(
                  (key) =>
                    key.startsWith("cat") && !key.includes("Interpolated")
                )
                .map((categoryKey) => {
                  const categoryId = parseInt(categoryKey.replace("cat", ""));
                  const isInterpolatedKey = `${categoryKey}Interpolated`;

                  // Check if the category is hidden
                  if (hiddenCategories.includes(categoryId)) return null;
                  // Calculate strokeDasharray based on the first data point
                  const strokeDasharray = chartData[0][isInterpolatedKey]
                    ? "4 4"
                    : "0";

                  return (
                    // <Line
                    //   key={categoryKey}
                    //   type="monotone"
                    //   dataKey={categoryKey as keyof ChartData}
                    //   stroke={getCategoryColor(categoryId)}
                    //   strokeWidth={2}
                    //   strokeDasharray={strokeDasharray}
                    //   dot={(props) => {
                    //     const { cx, cy, payload } = props;
                    //     if (
                    //       payload[categoryKey] === 0 &&
                    //       payload.originalValue === null
                    //     ) {
                    //       // Render an outlined dot if the value was originally missing (null)
                    //       return (
                    //         <circle
                    //           cx={cx}
                    //           cy={cy}
                    //           r={4}
                    //           fill="none"
                    //           stroke={getCategoryColor(categoryId)}
                    //           strokeWidth={2}
                    //           cursor="pointer"
                    //           onClick={() => handleCategoryToggle(categoryId)}
                    //         />
                    //       );
                    //     }
                    //     return (
                    //       <circle
                    //         cx={cx}
                    //         cy={cy}
                    //         r={4}
                    //         fill={getCategoryColor(categoryId)}
                    //         cursor="pointer"
                    //         onClick={() => handleCategoryToggle(categoryId)}
                    //       />
                    //     );
                    //   }}
                    //   activeDot={{
                    //     r: 6,
                    //     fill: getCategoryColor(categoryId),
                    //     cursor: "pointer",
                    //     onClick: () => handleCategoryToggle(categoryId),
                    //   }}
                    //   name={getCategoryName(categoryId)}
                    // />
                    <Line
                      key={categoryKey}
                      type="monotone"
                      dataKey={categoryKey as keyof ChartData}
                      stroke={getCategoryColor(categoryId)}
                      strokeWidth={2}
                      strokeDasharray={strokeDasharray}
                      dot={(props) => {
                        const { cx, cy, payload } = props;
                        const isMissingData =
                          payload.originalValues?.[categoryKey] === null;

                        return (
                          <circle
                            cx={cx}
                            cy={cy}
                            r={4}
                            fill={
                              isMissingData
                                ? "none"
                                : getCategoryColor(categoryId)
                            }
                            stroke={
                              isMissingData
                                ? getCategoryColor(categoryId)
                                : "none"
                            }
                            strokeWidth={2}
                            cursor="pointer"
                            onClick={() => handleCategoryToggle(categoryId)}
                          />
                        );
                      }}
                      activeDot={{
                        r: 6,
                        fill: getCategoryColor(categoryId),
                        cursor: "pointer",
                        onClick: () => handleCategoryToggle(categoryId),
                      }}
                      name={getCategoryName(categoryId)}
                    />
                  );
                })}
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Moved badges below graph */}
      {(hiddenScopes.length > 0 || hiddenCategories.length > 0) && (
        <div className="flex gap-2 mt-4">
          {hiddenScopes.map((scope) => (
            <button
              key={scope}
              onClick={() => handleScopeToggle(scope)}
              className="px-2 py-1 text-sm bg-black-1 rounded-md flex items-center gap-1 hover:bg-black-3 transition-colors"
              style={{
                color:
                  scope === "scope1"
                    ? "#F0759A"
                    : scope === "scope2"
                    ? "#E2FF8D"
                    : "#99CFFF",
              }}
            >
              {scope === "scope1"
                ? "Scope 1"
                : scope === "scope2"
                ? "Scope 2"
                : "Scope 3"}
              <X className="w-3 h-3" />
            </button>
          ))}
          {hiddenCategories.map((categoryId) => (
            <button
              key={categoryId}
              onClick={() => handleCategoryToggle(categoryId)}
              className="px-2 py-1 text-sm bg-black-1 rounded-md flex items-center gap-1 hover:bg-black-3 transition-colors"
              style={{ color: getCategoryColor(categoryId) }}
            >
              {getCategoryName(categoryId)}
              <X className="w-3 h-3" />
            </button>
          ))}
        </div>
      )}
      {/* Status Section  */}
      {/* <div className="mt-8 p-6 bg-black-1 rounded-level-2">
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
              <Text variant="body" className="mb-2">
                Årlig minskningstakt
              </Text>
              {trendAnalysis.hasEmissions ? (
                <>
                  <div className="flex items-baseline gap-2">
                    <Text variant="body" className={statusInfo.color}>
                      {annualReductionRate > 0
                        ? `${annualReductionRate.toFixed(1)}%`
                        : `+${(-annualReductionRate).toFixed(1)}%`}
                    </Text>
                    <Text variant="body">per år</Text>
                  </div>
                  <Text variant="small" className="text-grey mt-1">
                    {statusInfo.message}
                  </Text>
                </>
              ) : (
                <Text variant="body">Ingen minskningstakt kan beräknas</Text>
              )}
            </div>

            <div>
              <Text variant="body" className="mb-2">
                Prognos 2030
              </Text>
              {trendAnalysis.hasEmissions ? (
                <>
                  <div className="flex items-baseline gap-2">
                    <Text
                      variant="body"
                      className={
                        annualReductionRate >= 7.6
                          ? "text-green-3"
                          : "text-pink-3"
                      }
                    >
                      {Math.round(
                        projectedData.find((d) => d?.year === 2030)?.trend || 0
                      ).toLocaleString()}
                    </Text>
                    <Text variant="body">ton CO₂e</Text>
                  </div>
                  <Text variant="small" className="text-grey mt-1">
                    {annualReductionRate >= 7.6
                      ? "På väg att nå målet med god marginal"
                      : `${Math.round(
                          totalExcessEmissions
                        ).toLocaleString()} ton överskjutande utsläpp totalt`}
                  </Text>
                </>
              ) : (
                <Text variant="body">Ingen prognos tillgänglig</Text>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Text variant="body">Datakvalitet:</Text>
            <Text
              className="flex items-center gap-2"
              style={{ color: getDataQualityColor(trendAnalysis.dataQuality) }}
            >
              {trendAnalysis.dataQuality === "high"
                ? "Hög"
                : trendAnalysis.dataQuality === "medium"
                ? "Medium"
                : "Låg"}
              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{trendAnalysis.message}</p>
                    {trendAnalysis.hasScope3 &&
                      !trendAnalysis.consistentScope3 && (
                        <p className="mt-2">
                          Scope 3 rapporterat i{" "}
                          {Math.round(trendAnalysis.scope3Coverage * 100)}% av
                          åren.
                        </p>
                      )}
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            </Text>
          </div>
        </div>
      </div> */}
    </div>
  );
}
