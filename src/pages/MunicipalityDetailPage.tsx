import { useParams } from 'react-router-dom'
import { useMunicipalityDetails } from '@/hooks/useMunicipalityDetails'
import { MunicipalityDetails } from '@/components/municipalities/detail/MunicipalityDetails'
import { MunicipalityComparison } from '@/components/municipalities/MunicipalityComparison'
import { Text } from '@/components/ui/text'

export function MunicipalityDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { municipality, loading, error } = useMunicipalityDetails(id!)

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-6">
          <div>
            <div className="h-8 w-1/3 bg-black-1 rounded mb-2" />
            <div className="h-4 w-1/2 bg-black-1 rounded" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-[300px] h-8 bg-black-1 rounded" />
              <div className="w-[200px] h-8 bg-black-1 rounded" />
              <div className="w-[200px] h-8 bg-black-1 rounded" />
              <div className="w-[200px] h-8 bg-black-1 rounded" />
            </div>
            <div className="w-[100px] h-8 bg-black-1 rounded" />
          </div>
        </div>

        <div className="space-y-16">
          {[...Array(3)].map((_, sectionIndex) => (
            <section key={sectionIndex} className="space-y-6 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="h-8 w-1/4 bg-black-1 rounded" />
                <div className="h-4 w-16 bg-black-1 rounded" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[...Array(4)].map((_, cardIndex) => (
                  <div key={cardIndex} className="bg-black-2 rounded-level-2 p-8 space-y-8">
                    <div className="flex items-start justify-between">
                      <div className="space-y-4 flex-1">
                        <div className="h-8 w-3/4 bg-black-1 rounded" />
                        <div className="flex gap-4">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-4 w-20 bg-black-1 rounded" />
                          ))}
                        </div>
                        <div className="h-4 w-full bg-black-1 rounded" />
                      </div>
                      <div className="w-12 h-12 rounded-full bg-black-1 flex-shrink-0" />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-black-1 rounded-level-2 p-4 space-y-2">
                          <div className="h-4 w-1/2 bg-black-2 rounded" />
                          <div className="h-6 w-2/3 bg-black-2 rounded" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-24">
        <Text variant="h3" className="text-red-500 mb-4">
          Det gick inte att hämta kommuninformation
        </Text>
        <Text variant="muted">Försök igen senare</Text>
      </div>
    )
  }

  if (!municipality) {
    return (
      <div className="text-center py-24">
        <Text variant="h3" className="text-red-500 mb-4">
          Kommunen kunde inte hittas
        </Text>
        <Text variant="muted">Kontrollera att kommun-ID:t är korrekt</Text>
      </div>
    )
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
            id: '2',
            name: 'Uppsala',
            value: 3.2,
            rank: '2',
            change: -2.1,
          },
          {
            id: '3',
            name: 'Linköping',
            value: 3.1,
            rank: '3',
            change: 1.5,
          },
          {
            id: '4',
            name: 'Örebro',
            value: 2.9,
            rank: '4',
            change: -1.8,
          },
          {
            id: '5',
            name: 'Västerås',
            value: 2.7,
            rank: '5',
            change: 2.2,
          },
        ]}
      />
    </div>
  )
}
