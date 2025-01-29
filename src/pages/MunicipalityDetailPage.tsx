import { useParams } from 'react-router-dom';
import { useMunicipalityDetails } from '@/hooks/useMunicipalityDetails';
import { MunicipalityDetails } from '@/components/municipalities/detail/MunicipalityDetails';
import { MunicipalityComparison } from '@/components/municipalities/MunicipalityComparison';
import { Text } from "@/components/ui/text";

export function MunicipalityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { municipality, loading, error } = useMunicipalityDetails(id!);

  if (loading) {
    return (
      <div className="animate-pulse space-y-16">
        <div className="h-12 w-1/3 bg-black-1 rounded" />
        <div className="h-96 bg-black-1 rounded-level-1" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-24">
        <Text variant="h3" className="text-red-500 mb-4">
          Det gick inte att hämta kommuninformation
        </Text>
        <Text variant="muted">Försök igen senare</Text>
      </div>
    );
  }

  if (!municipality) {
    return (
      <div className="text-center py-24">
        <Text variant="h3" className="text-red-500 mb-4">
          Kommunen kunde inte hittas
        </Text>
        <Text variant="muted">
          Kontrollera att kommun-ID:t är korrekt
        </Text>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto space-y-16">
      <MunicipalityDetails municipality={municipality} />
      <MunicipalityComparison 
        title="Hur går det med?"
        description="Vi utför mätningar av den samlade längden av cykelvägar per invånare, inklusive alla väghållare (statliga, kommunala och enskilda). Den senaste tillgängliga datan är från år 2022."
        nationalAverage={2.8}
        euTarget={3.8}
        unit="m"
        municipalities={[
          {
            id: municipality.id,
            name: municipality.name,
            value: municipality.bicycleMetrePerCapita,
            rank: municipality.rank,
            change: municipality.historicalEmissionChangePercent,
          },
          // Mock data for comparison - replace with real data
          {
            id: "2",
            name: "Uppsala",
            value: 3.2,
            rank: "2",
            change: -2.1,
          },
          {
            id: "3", 
            name: "Linköping",
            value: 3.1,
            rank: "3",
            change: 1.5,
          },
          {
            id: "4",
            name: "Örebro",
            value: 2.9,
            rank: "4",
            change: -1.8,
          },
          {
            id: "5",
            name: "Västerås",
            value: 2.7,
            rank: "5",
            change: 2.2,
          }
        ]}
      />
    </div>
  );
}
