import { useQuery } from '@tanstack/react-query'
import { getMunicipalityDetails } from '@/lib/api'

export function useMunicipalityDetails(id: string) {
  const {
    data: municipality,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['municipality', id],
    queryFn: () => getMunicipalityDetails(id),
    enabled: !!id,
  })

  return {
    municipality,
    loading: isLoading,
    error,
  }
}
