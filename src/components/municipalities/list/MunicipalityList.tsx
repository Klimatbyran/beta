import { MunicipalityFilter } from './MunicipalityFilter'
import { MunicipalityCard } from './MunicipalityCard'
import type { Municipality } from '@/types/municipality'

interface MunicipalityListProps {
  municipalities: Municipality[]
  selectedRegion: string
  onRegionChange: (region: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  sortBy:
    | 'emissions'
    | 'reduction'
    | 'climate_plan'
    | 'bicycle'
    | 'charging'
    | 'name'
  onSortChange: (sort: typeof sortBy) => void
}

export function MunicipalityList({
  municipalities,
  selectedRegion,
  onRegionChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}: MunicipalityListProps) {
  const filteredMunicipalities = municipalities
    .filter((municipality) => {
      // Filter by region
      if (selectedRegion !== 'all' && municipality.region !== selectedRegion) {
        return false
      }

      // Filter by search query - support multiple municipalities separated by comma
      if (searchQuery) {
        const searchTerms = searchQuery
          .toLowerCase()
          .split(',')
          .map((term) => term.trim())
        return searchTerms.some((term) =>
          municipality.name.toLowerCase().includes(term),
        )
      }

      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'reduction':
          // Sort by emission reduction (negative is better)
          return (
            a.historicalEmissionChangePercent -
            b.historicalEmissionChangePercent
          )
        case 'emissions':
          // Sort by total emissions (high to low)
          return b.trendEmission - a.trendEmission
        case 'climate_plan':
          // Sort by climate plan year (newest first, missing plans last)
          if (a.climatePlanYear === 'Saknar plan') return 1
          if (b.climatePlanYear === 'Saknar plan') return -1
          return parseInt(b.climatePlanYear) - parseInt(a.climatePlanYear)
        case 'bicycle':
          // Sort by bicycle paths per capita (high to low)
          return b.bicycleMetrePerCapita - a.bicycleMetrePerCapita
        case 'charging':
          // Sort by EV charging infrastructure (low ratio is better)
          return (
            a.electricVehiclePerChargePoints - b.electricVehiclePerChargePoints
          )
        case 'name':
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

  return (
    <div className="space-y-8">
      <MunicipalityFilter
        selectedRegion={selectedRegion}
        onRegionChange={onRegionChange}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        sortBy={sortBy}
        onSortChange={onSortChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMunicipalities.map((municipality) => (
          <MunicipalityCard key={municipality.id} municipality={municipality} />
        ))}
      </div>
    </div>
  )
}
