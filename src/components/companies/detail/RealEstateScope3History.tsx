import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Text } from "@/components/ui/text";
import { Info } from 'lucide-react';
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface RealEstateScope3HistoryProps {
  data: Array<{
    year: number;
    categories: Array<{
      category: number;
      total: number;
      unit: string;
    }>;
  }>;
  className?: string;
}

const categoryNames: Record<number, string> = {
  1: "Inköpta varor & tjänster",
  2: "Kapitalvaror",
  3: "Bränsle & energi",
  4: "Uppströms transport",
  5: "Avfall",
  6: "Tjänsteresor",
  7: "Pendling",
  8: "Uppströms leasing",
  9: "Nedströms transport",
  10: "Bearbetning",
  11: "Användning",
  12: "Slutbehandling",
  13: "Nedströms leasing",
  14: "Franchiser",
  15: "Investeringar"
};

// Colors for different categories
const COLORS = [
  'var(--blue-2)',
  'var(--blue-3)',
  'var(--orange-2)',
  'var(--orange-3)',
  'var(--pink-2)',
  'var(--pink-3)',
  'var(--green-2)',
  'var(--green-3)',
];

export function RealEstateScope3History({ data, className }: RealEstateScope3HistoryProps) {
  // Transform data for the chart
  const chartData = data.map(yearData => {
    const dataPoint: any = { year: yearData.year };
    yearData.categories.forEach(cat => {
      dataPoint[`cat${cat.category}`] = cat.total;
      dataPoint[`cat${cat.category}Name`] = categoryNames[cat.category];
    });
    return dataPoint;
  });

  // Get unique categories across all years
  const uniqueCategories = Array.from(
    new Set(
      data.flatMap(yearData => 
        yearData.categories.map(cat => cat.category)
      )
    )
  ).sort();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black-1 px-4 py-3 rounded-level-2">
          <Text variant="small" className="text-grey mb-2">{label}</Text>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <Text variant="small">
                  {entry.payload[`cat${entry.name.replace('cat', '')}Name`]}:
                </Text>
                <Text variant="small" className="font-medium">
                  {Math.round(entry.value).toLocaleString()} ton CO₂e
                </Text>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={cn("bg-black-2 rounded-level-1 p-16", className)}>
      <div className="flex items-center gap-2 mb-12">
        <Text variant="h3">Historiska Scope 3-utsläpp per kategori</Text>
        <TooltipProvider>
          <UITooltip>
            <TooltipTrigger>
              <Info className="w-4 h-4 text-grey" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Utveckling av Scope 3-utsläpp över tid per kategori</p>
            </TooltipContent>
          </UITooltip>
        </TooltipProvider>
      </div>

      <div className="h-[600px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
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
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom"
              height={72}
              formatter={(value) => categoryNames[parseInt(value.replace('cat', ''))]}
            />
            {uniqueCategories.map((category, index) => (
              <Line
                key={category}
                type="monotone"
                dataKey={`cat${category}`}
                name={`cat${category}`}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 p-6 bg-black-1 rounded-level-2">
        <Text variant="h4" className="mb-2">Viktiga trender för fastighetssektorn</Text>
        <Text variant="muted">
          Scope 3-utsläpp i fastighetssektorn domineras ofta av kategorierna "Inköpta varor & tjänster" (1), 
          "Kapitalvaror" (2) och "Energirelaterade aktiviteter" (3). Dessa kategorier inkluderar 
          byggmaterial, renoveringar och energianvändning i fastigheter.
        </Text>
      </div>
    </div>
  );
}