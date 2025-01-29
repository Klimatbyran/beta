import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Text } from "@/components/ui/text";
import { formatEmissions } from '@/lib/utils';

interface EmissionsBarChartProps {
  data: Array<{
    year: number;
    scope1?: number;
    scope2?: number;
    scope3?: number;
  }>;
}

export function EmissionsBarChart({ data }: EmissionsBarChartProps) {
  // Sort data by year in descending order and take last 5 years
  const chartData = [...data]
    .sort((a, b) => b.year - a.year)
    .slice(0, 5)
    .reverse();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black-1 px-4 py-3 rounded-level-2">
          <Text variant="small" className="text-grey">{label}</Text>
          {payload.map((entry: any) => (
            <div key={entry.dataKey} className="text-sm">
              <span className="text-grey mr-2">
                {entry.dataKey === 'scope1' ? 'Scope 1' :
                 entry.dataKey === 'scope2' ? 'Scope 2' : 'Scope 3'}:
              </span>
              <span style={{ color: entry.color }}>
                {formatEmissions(entry.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={chartData}
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
          tickFormatter={(value) => formatEmissions(value)}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="scope3"
          stackId="emissions"
          fill="var(--blue-2)"
          name="Scope 3"
          radius={[0, 0, 12, 12]}
          background={{ fill: 'rgba(255, 255, 255, 0.03)', radius: [0, 0, 12, 12] }}
        />
        <Bar
          dataKey="scope2"
          stackId="emissions"
          fill="var(--pink-3)"
          name="Scope 2"
          radius={[0, 0, 0, 0]}
          background={{ fill: 'rgba(255, 255, 255, 0.03)' }}
        />
        <Bar
          dataKey="scope1"
          stackId="emissions"
          fill="var(--orange-3)"
          name="Scope 1"
          radius={[12, 12, 0, 0]}
          background={{ fill: 'rgba(255, 255, 255, 0.03)', radius: [12, 12, 0, 0] }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
