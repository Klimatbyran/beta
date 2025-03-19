import React, { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  X,
  BarChart3,
  PieChart as PieChartIcon,
  ArrowLeft,
} from "lucide-react";
import {
  useSectorNames,
  SectorCode,
  sectorColors,
  useCompanyColors,
} from "@/hooks/useCompanyFilters";
import { RankedCompany } from "@/hooks/useCompanies";

interface EmissionsChartProps {
  companies: RankedCompany[];
  selectedSectors: string[];
}

interface YearData {
  year: string;
  [key: string]: any;
}

interface DetailPopupProps {
  year: string;
  sector: string;
  scope1: number;
  scope2: number;
  scope3: number;
  onClose: () => void;
}

const DetailPopup: React.FC<DetailPopupProps> = ({
  year,
  sector,
  scope1,
  scope2,
  scope3,
  onClose,
}) => {
  const total = scope1 + scope2 + scope3;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-black-2 border border-black-1 rounded-xl shadow-xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-light text-white">
            {sector} - {year}
          </h3>
          <button
            onClick={onClose}
            className="text-grey hover:text-white focus:outline-none transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm text-grey mb-2">Total Emissions</h4>
            <p className="text-2xl font-light text-white">
              {total.toLocaleString()} tonnes CO₂e
            </p>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-grey">Scope 1</span>
                <span className="text-sm text-white">
                  {scope1.toLocaleString()} tonnes CO₂e
                </span>
              </div>
              <div className="h-2 bg-black-1 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-1 transition-all duration-500 ease-out"
                  style={{ width: `${(scope1 / total) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-grey">Scope 2</span>
                <span className="text-sm text-white">
                  {scope2.toLocaleString()} tonCO₂e
                </span>
              </div>
              <div className="h-2 bg-black-1 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-2 transition-all duration-500 ease-out"
                  style={{ width: `${(scope2 / total) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-grey">Scope 3</span>
                <span className="text-sm text-white">
                  {scope3.toLocaleString()} tonCO₂e
                </span>
              </div>
              <div className="h-2 bg-black-1 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-3 transition-all duration-500 ease-out"
                  style={{ width: `${(scope3 / total) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (!active || !payload || !payload.length || !payload[0].dataKey)
    return null;

  const [sector] = payload[0].dataKey.split("_scope");
  const scope1 =
    payload.find((p) => p.dataKey === `${sector}_scope1`)?.value || 0;
  const scope2 =
    payload.find((p) => p.dataKey === `${sector}_scope2`)?.value || 0;
  const scope3 =
    payload.find((p) => p.dataKey === `${sector}_scope3`)?.value || 0;
  const total = scope1 + scope2 + scope3;

  return (
    <div className="bg-black-2 border border-black-1 rounded-lg shadow-xl p-4 text-white">
      <p className="text-sm font-medium mb-2">{label}</p>
      <div className="mb-3">
        <p className="text-sm font-medium mb-2">{sector}</p>
        <div className="space-y-1">
          <div className="flex justify-between text-sm text-grey">
            <span>Scope 1:</span>
            <span className="font-medium text-white">
              {Number(scope1).toLocaleString()} tonnes CO₂e
            </span>
          </div>
          <div className="flex justify-between text-sm text-grey">
            <span>Scope 2:</span>
            <span className="font-medium text-white">
              {Number(scope2).toLocaleString()} tonnes CO₂e
            </span>
          </div>
          <div className="flex justify-between text-sm text-grey">
            <span>Scope 3:</span>
            <span className="font-medium text-white">
              {Number(scope3).toLocaleString()} tonnes CO₂e
            </span>
          </div>
          <div className="pt-2 border-t border-black-1">
            <div className="flex justify-between text-sm">
              <span className="text-grey">Total:</span>
              <span className="font-medium text-white">
                {Number(total).toLocaleString()} tonnes CO₂e
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomLegend = ({ payload }: { payload?: any[] }) => {
  if (!payload || payload.length === 0) return null;

  const sectorGroups = payload.reduce((acc: { [key: string]: any[] }, item) => {
    const [sector] = item.value.split("_scope");
    if (!acc[sector]) {
      acc[sector] = [];
    }
    acc[sector].push(item);
    return acc;
  }, {});

  return (
    <div className="flex flex-wrap justify-center gap-6 pt-4">
      {Object.entries(sectorGroups).map(([sector, items]) => (
        <div key={sector} className="flex flex-col items-start">
          <span className="text-sm font-medium text-white mb-1">{sector}</span>
          <div className="flex flex-col gap-1 pl-2">
            {items
              .sort((a, b) => {
                const scopeA = parseInt(a.value.split("_scope")[1]);
                const scopeB = parseInt(b.value.split("_scope")[1]);
                return scopeA - scopeB;
              })
              .map((item) => (
                <div key={item.value} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-grey">
                    Scope {item.value.split("_scope")[1]}
                  </span>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const PieChartTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload || !payload.length) return null;

  const { name, value, payload: data } = payload[0];
  const percentage = value ? ((value / data.total) * 100).toFixed(1) : "0.0";

  return (
    <div className="bg-black-2 border border-black-1 rounded-lg shadow-xl p-4 text-white">
      <p className="text-sm font-medium mb-2">{name}</p>
      <div className="flex justify-between text-sm">
        <span className="text-grey">Emissions:</span>
        <span className="font-medium text-white">
          {Number(value).toLocaleString()} tonCO₂e
        </span>
      </div>
      <div className="flex justify-between text-sm mt-1">
        <span className="text-grey">Percentage:</span>
        <span className="font-medium text-white">{percentage}%</span>
      </div>
      {data.scope1 !== undefined && (
        <div className="mt-3 pt-2 border-t border-black-1">
          <div className="flex justify-between text-sm text-grey">
            <span>Scope 1:</span>
            <span className="font-medium text-white">
              {Number(data.scope1).toLocaleString()} tonCO₂e
            </span>
          </div>
          <div className="flex justify-between text-sm text-grey">
            <span>Scope 2:</span>
            <span className="font-medium text-white">
              {Number(data.scope2).toLocaleString()} tonCO₂e
            </span>
          </div>
          <div className="flex justify-between text-sm text-grey">
            <span>Scope 3:</span>
            <span className="font-medium text-white">
              {Number(data.scope3).toLocaleString()} tonCO₂e
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

const CompanyTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload || !payload.length) return null;

  const { companyName, scope1, scope2, scope3, total } = payload[0].payload;

  return (
    <div className="bg-black-2 border border-black-1 rounded-lg shadow-xl p-4 text-white">
      <p className="text-sm font-medium mb-2">{companyName}</p>
      <div className="space-y-1">
        <div className="flex justify-between text-sm text-grey">
          <span>Scope 1:</span>
          <span className="font-medium text-white">
            {Number(scope1).toLocaleString()} tonnes CO₂e
          </span>
        </div>
        <div className="flex justify-between text-sm text-grey">
          <span>Scope 2:</span>
          <span className="font-medium text-white">
            {Number(scope2).toLocaleString()} tonnes CO₂e
          </span>
        </div>
        <div className="flex justify-between text-sm text-grey">
          <span>Scope 3:</span>
          <span className="font-medium text-white">
            {Number(scope3).toLocaleString()} tonnes CO₂e
          </span>
        </div>
        <div className="pt-2 border-t border-black-1">
          <div className="flex justify-between text-sm">
            <span className="text-grey">Total:</span>
            <span className="font-medium text-white">
              {Number(total).toLocaleString()} tonnes CO₂e
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmissionsChart: React.FC<EmissionsChartProps> = ({
  companies,
  selectedSectors,
}) => {
  const [selectedData, setSelectedData] = useState<{
    year: string;
    sector: string;
    scope1: number;
    scope2: number;
    scope3: number;
  } | null>(null);
  const [chartType, setChartType] = useState<"bar" | "pie">("bar");
  const [selectedYear, setSelectedYear] = useState<string>("2023");
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const sectorNames = useSectorNames();
  const getCompanyColors = useCompanyColors();

  const chartData = useMemo(() => {
    if (selectedSector) {
      // Company-level data for selected sector
      const sectorCompanies = companies.filter(
        (company) =>
          company.industry?.industryGics.sectorCode === selectedSector
      );

      const years = new Set<string>();
      sectorCompanies.forEach((company) => {
        company.reportingPeriods.forEach((period) => {
          years.add(period.startDate.substring(0, 4));
        });
      });

      return Array.from(years)
        .sort()
        .map((year) => {
          const yearData: { [key: string]: any } = { year };

          sectorCompanies.forEach((company) => {
            const periodForYear = company.reportingPeriods.find((period) =>
              period.startDate.startsWith(year)
            );

            if (periodForYear?.emissions) {
              const scope1 = periodForYear.emissions.scope1?.total || 0;
              const scope2 =
                periodForYear.emissions.scope2?.calculatedTotalEmissions || 0;
              const scope3 =
                periodForYear.emissions.scope3?.calculatedTotalEmissions || 0;
              const total = scope1 + scope2 + scope3;

              yearData[`${company.name}_scope1`] = scope1;
              yearData[`${company.name}_scope2`] = scope2;
              yearData[`${company.name}_scope3`] = scope3;
              yearData[`${company.name}_total`] = total;
            }
          });

          return yearData;
        });
    }

    // Sector-level aggregated data
    const years = new Set<string>();
    companies.forEach((company) => {
      company.reportingPeriods.forEach((period) => {
        years.add(period.startDate.substring(0, 4));
      });
    });

    return Array.from(years)
      .sort()
      .map((year) => {
        const yearData: YearData = { year };

        selectedSectors.forEach((sectorCode) => {
          const sectorName =
            sectorNames[sectorCode as SectorCode] || sectorCode;
          let scope1 = 0;
          let scope2 = 0;
          let scope3 = 0;

          companies.forEach((company) => {
            if (company.industry?.industryGics.sectorCode === sectorCode) {
              const periodForYear = company.reportingPeriods.find((period) =>
                period.startDate.startsWith(year)
              );

              if (periodForYear?.emissions) {
                scope1 += periodForYear.emissions.scope1?.total || 0;
                scope2 +=
                  periodForYear.emissions.scope2?.calculatedTotalEmissions || 0;
                scope3 +=
                  periodForYear.emissions.scope3?.calculatedTotalEmissions || 0;
              }
            }
          });

          yearData[`${sectorName}_scope1`] = scope1;
          yearData[`${sectorName}_scope2`] = scope2;
          yearData[`${sectorName}_scope3`] = scope3;
        });

        return yearData;
      });
  }, [companies, selectedSectors, selectedSector]);

  const pieChartData = useMemo(() => {
    if (selectedSector) {
      // Company-level data for the selected sector and year
      const sectorCompanies = companies.filter(
        (company) =>
          company.industry?.industryGics.sectorCode === selectedSector
      );

      return sectorCompanies.map((company) => {
        const periodForYear = company.reportingPeriods.find((period) =>
          period.startDate.startsWith(selectedYear)
        );

        const scope1 = periodForYear?.emissions?.scope1?.total || 0;
        const scope2 =
          periodForYear?.emissions?.scope2?.calculatedTotalEmissions || 0;
        const scope3 =
          periodForYear?.emissions?.scope3?.calculatedTotalEmissions || 0;
        const total = scope1 + scope2 + scope3;

        return {
          name: company.name,
          value: total,
          companyName: company.name,
          scope1,
          scope2,
          scope3,
          total,
        };
      });
    }

    // Sector-level data
    const yearData = chartData.find((d) => d.year === selectedYear);
    if (!yearData) return [];

    const sectorTotals = selectedSectors.map((sectorCode) => {
      const sectorName = sectorNames[sectorCode as SectorCode] || sectorCode;
      const scope1 = yearData[`${sectorName}_scope1`] || 0;
      const scope2 = yearData[`${sectorName}_scope2`] || 0;
      const scope3 = yearData[`${sectorName}_scope3`] || 0;
      const total = scope1 + scope2 + scope3;

      return {
        name: sectorName,
        value: total,
        sectorCode,
        scope1,
        scope2,
        scope3,
        total,
      };
    });

    const totalEmissions = sectorTotals.reduce(
      (sum, sector) => sum + sector.value,
      0
    );
    return sectorTotals.map((sector) => ({ ...sector, total: totalEmissions }));
  }, [chartData, selectedYear, selectedSectors, selectedSector, companies]);

  const totalEmissions = useMemo(() => {
    return pieChartData.reduce((sum, item) => sum + item.value, 0);
  }, [pieChartData]);

  const handleBarClick = (data: any) => {
    if (!data || !data.activePayload || !data.activePayload[0]) return;

    if (selectedSector) {
      const companyName = data.activePayload[0].dataKey.split("_")[0];
      const year = data.activeLabel;
      const company = companies.find((c) => c.name === companyName);
      if (!company) return;

      const periodForYear = company.reportingPeriods.find((period) =>
        period.startDate.startsWith(year)
      );
      if (!periodForYear?.emissions) return;

      setSelectedData({
        year,
        sector: companyName,
        scope1: periodForYear.emissions.scope1?.total || 0,
        scope2: periodForYear.emissions.scope2?.calculatedTotalEmissions || 0,
        scope3: periodForYear.emissions.scope3?.calculatedTotalEmissions || 0,
      });
    } else {
      const [sector] = data.activePayload[0].dataKey.split("_scope");
      const year = data.activeLabel;
      const sectorCode = Object.entries(sectorNames).find(
        ([_, name]) => name === sector
      )?.[0];
      if (sectorCode) {
        setSelectedSector(sectorCode);
        setSelectedYear(year);
      }
    }
  };

  const handlePieClick = (data: any) => {
    if (!selectedSector) {
      const sectorCode = data.payload.sectorCode;
      setSelectedSector(sectorCode);
    }
  };

  const years = useMemo(
    () => Array.from(new Set(chartData.map((d) => d.year))).sort(),
    [chartData]
  );

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {selectedSector && (
              <button
                onClick={() => setSelectedSector(null)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-grey hover:text-white focus:outline-none transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm font-medium">Back to Overview</span>
              </button>
            )}
            <button
              onClick={() => setChartType("bar")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg focus:outline-none transition-colors ${
                chartType === "bar"
                  ? "bg-black-1 text-white"
                  : "text-grey hover:text-white"
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span className="text-sm font-medium">Bar Chart</span>
            </button>
            <button
              onClick={() => setChartType("pie")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg focus:outline-none transition-colors ${
                chartType === "pie"
                  ? "bg-black-1 text-white"
                  : "text-grey hover:text-white"
              }`}
            >
              <PieChartIcon className="h-4 w-4" />
              <span className="text-sm font-medium">Pie Chart</span>
            </button>
          </div>

          {chartType === "pie" && (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-grey">
                  {selectedSector ? "Sector Total" : "Total"} Emissions
                </div>
                <div className="text-xl font-light text-white">
                  {totalEmissions.toLocaleString()} tonnes CO₂e
                </div>
              </div>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-black-2 border border-black-1 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-3 transition-shadow"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="h-[600px]">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "bar" ? (
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              onClick={handleBarClick}
              barGap={2}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
              <XAxis
                dataKey="year"
                padding={{ left: 20, right: 20 }}
                tick={{ fill: "#888888" }}
              />
              <YAxis
                label={{
                  value: "tonCO₂e",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#888888",
                  style: { fontSize: "10px" },
                }}
                tick={{
                  fill: "#888888",
                  fontSize: 10,
                }}
                tickFormatter={(value) => {
                  if (value >= 1000000000) {
                    return `${(value / 1000000000).toFixed(1)}B`;
                  } else if (value >= 1000000) {
                    return `${(value / 1000000).toFixed(1)}M`;
                  } else if (value >= 1000) {
                    return `${(value / 1000).toFixed(1)}K`;
                  }
                  return value;
                }}
                width={50}
              />
              <Tooltip
                content={
                  selectedSector ? <CompanyTooltip /> : <CustomTooltip />
                }
              />
              <Legend content={<CustomLegend />} />
              {selectedSector
                ? companies
                    .filter(
                      (company) =>
                        company.industry?.industryGics.sectorCode ===
                        selectedSector
                    )
                    .map((company, index) => {
                      const colors = getCompanyColors(index);
                      return (
                        <React.Fragment key={company.name}>
                          <Bar
                            dataKey={`${company.name}_scope1`}
                            stackId={`stack-${company.name}`}
                            fill={colors.scope1}
                            name={`${company.name}_scope1`}
                            cursor="pointer"
                          />
                          <Bar
                            dataKey={`${company.name}_scope2`}
                            stackId={`stack-${company.name}`}
                            fill={colors.scope2}
                            name={`${company.name}_scope2`}
                            cursor="pointer"
                          />
                          <Bar
                            dataKey={`${company.name}_scope3`}
                            stackId={`stack-${company.name}`}
                            fill={colors.scope3}
                            name={`${company.name}_scope3`}
                            cursor="pointer"
                          />
                        </React.Fragment>
                      );
                    })
                : selectedSectors.map((sectorCode) => {
                    const sectorName =
                      sectorNames[sectorCode as SectorCode] || sectorCode;
                    const colors =
                      sectorColors[sectorCode as keyof typeof sectorColors];

                    return (
                      <React.Fragment key={sectorCode}>
                        <Bar
                          dataKey={`${sectorName}_scope1`}
                          stackId={`stack-${sectorName}`}
                          fill={colors.scope1}
                          name={`${sectorName}_scope1`}
                          cursor="pointer"
                        />
                        <Bar
                          dataKey={`${sectorName}_scope2`}
                          stackId={`stack-${sectorName}`}
                          fill={colors.scope2}
                          name={`${sectorName}_scope2`}
                          cursor="pointer"
                        />
                        <Bar
                          dataKey={`${sectorName}_scope3`}
                          stackId={`stack-${sectorName}`}
                          fill={colors.scope3}
                          name={`${sectorName}_scope3`}
                          cursor="pointer"
                        />
                      </React.Fragment>
                    );
                  })}
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={200}
                label={({ name, value, percent }) =>
                  `${name} (${(percent * 100).toFixed(1)}%)`
                }
                labelLine={true}
                onClick={handlePieClick}
              >
                {pieChartData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={
                      selectedSector
                        ? getCompanyColors(
                            companies.findIndex((c) => c.name === entry.name)
                          ).base
                        : "sectorCode" in entry
                        ? sectorColors[
                            entry.sectorCode as keyof typeof sectorColors
                          ]?.base || "#888888"
                        : "#888888"
                    }
                  />
                ))}
              </Pie>
              <Tooltip content={<PieChartTooltip />} />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>

      {selectedData && (
        <DetailPopup
          year={selectedData.year}
          sector={selectedData.sector}
          scope1={selectedData.scope1}
          scope2={selectedData.scope2}
          scope3={selectedData.scope3}
          onClose={() => setSelectedData(null)}
        />
      )}
    </div>
  );
};

export default EmissionsChart;
