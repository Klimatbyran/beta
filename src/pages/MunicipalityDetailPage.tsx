import { useParams } from 'react-router-dom';
import { useMunicipalityDetails } from '@/hooks/useMunicipalityDetails';
import { MunicipalityDetails } from '@/components/municipalities/detail/MunicipalityDetails';
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
    <div className="max-w-[1400px] mx-auto">
      <MunicipalityDetails municipality={municipality} />
    </div>
  );
}
