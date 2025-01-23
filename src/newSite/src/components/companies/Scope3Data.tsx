import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmissionsBreakdown } from './EmissionsBreakdown';
import { Scope3Chart } from './Scope3Chart';
import { RealEstateScope3History } from './RealEstateScope3History';

interface Scope3DataProps {
  emissions: {
    scope1And2?: { total: number; unit: string } | null;
    scope1?: { total: number; unit: string } | null;
    scope2?: { total: number; unit: string } | null;
    scope3?: { 
      total: number; 
      unit: string;
      categories?: Array<{
        category: number;
        total: number;
        unit: string;
      }>;
    } | null;
    biogenicEmissions?: { total: number; unit: string } | null;
  } | null;
  year: number;
  className?: string;
  isRealEstate?: boolean;
  historicalData?: Array<{
    year: number;
    categories: Array<{
      category: number;
      total: number;
      unit: string;
    }>;
  }>;
}

export function Scope3Data({ emissions, year, className, isRealEstate, historicalData }: Scope3DataProps) {
  if (!emissions?.scope3?.categories?.length) {
    return null;
  }

  return (
    <div className={className}>
      <Tabs defaultValue="chart" className="space-y-8">
        <TabsList className="bg-black-1">
          <TabsTrigger value="chart">Visualisering</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
          {isRealEstate && historicalData && (
            <TabsTrigger value="history">Historisk utveckling</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="chart">
          <Scope3Chart 
            categories={emissions.scope3.categories}
            className="bg-transparent p-0"
          />
        </TabsContent>
        
        <TabsContent value="data">
          <EmissionsBreakdown 
            emissions={{ scope3: emissions.scope3 }}
            year={year}
            className="bg-transparent p-0"
            showOnlyScope3={true}
          />
        </TabsContent>

        {isRealEstate && historicalData && (
          <TabsContent value="history">
            <RealEstateScope3History 
              data={historicalData}
              className="bg-transparent p-0"
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}