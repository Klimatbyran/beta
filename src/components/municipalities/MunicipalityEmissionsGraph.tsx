import { FC } from "react";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Line,
  Area,
  Legend,
  Tooltip,
  TooltipProps,
} from "recharts";

interface DataPoint {
  year: number;
  total?: number;
  trend?: number;
  paris?: number;
  gap?: number; // fixme add to graph
}

interface MunicipalityEmissionsGraphProps {
  projectedData: DataPoint[];
}

export const MunicipalityEmissionsGraph: FC<
  MunicipalityEmissionsGraphProps
> = ({ projectedData }) => {
  // Add data validation
  if (!projectedData || projectedData.length === 0) {
    return <div>No data available</div>;
  }

  const CustomTooltip: FC<TooltipProps<number, string>> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black-1 px-4 py-3 rounded-level-2">
          <div className="text-sm font-medium mb-2">{label}</div>
          {payload.map((entry) => {
            if (entry.dataKey === "gap") {
              return null;
            }
            return (
              <div key={entry.dataKey} className="text-sm">
                <span className="text-grey mr-2">{entry.name}:</span>
                <span style={{ color: entry.color }}>
                  {((entry.value as number) / 1000).toFixed(1)} ton CO₂e
                </span>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[400px] pr-8">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={projectedData}>
          <Legend
            verticalAlign="top"
            align="right"
            height={36}
            iconType="line"
            wrapperStyle={{ fontSize: "12px", color: "#878787" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <XAxis
            dataKey="year"
            stroke="#878787"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            padding={{ left: 0, right: 0 }}
            domain={[1990, 2050]}
            ticks={[1990, 2015, 2020, 2030, 2040, 2050]} // fixme find better solution where years are not hardcoded
            tickFormatter={(year) => year}
          />
          <YAxis
            stroke="#878787"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => (value / 1000).toFixed(0)}
            width={80}
            domain={[0, "auto"]}
            padding={{ top: 0, bottom: 0 }}
          />
          <Area
            type="monotone"
            dataKey="gap"
            fill="rgba(240, 117, 154, 0.1)"
            stroke="none"
            fillOpacity={0.3}
            activeDot={false}
            name="Gap"
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="white"
            strokeWidth={2}
            dot={false}
            connectNulls
            name="Historiskt"
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
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
