import { Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { sectorNames } from '@/lib/constants/sectors'

interface CompanyFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  selectedSector: string
  onSectorChange: (sector: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
}

const categories = [
  { value: 'all', label: 'Alla företag' },
  { value: 'omx', label: 'Large Cap (OMX)' },
  { value: 'midcap', label: 'Mid Cap' },
  { value: 'sme', label: 'Small Cap' },
  { value: 'government', label: 'Statligt ägda' },
] as const

const sortOptions = [
  { value: 'emissions_reduction', label: 'Utsläppsminskning' },
  { value: 'total_emissions', label: 'Totala utsläpp' },
  { value: 'scope3_coverage', label: 'Scope 3-rapportering' },
  { value: 'data_quality', label: 'Datakvalitet' },
  { value: 'name', label: 'Företagsnamn' },
] as const

export function CompanyFilter({
  selectedCategory,
  onCategoryChange,
  selectedSector,
  onSectorChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}: CompanyFilterProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative w-[300px]">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-grey w-4 h-4" />
          <Input
            type="text"
            placeholder="Sök företag (separera med komma)"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8 py-1 h-8 bg-black-1 border-none text-sm"
          />
        </div>

        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[200px] bg-black-1">
            <SelectValue placeholder="Välj kategori" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedSector} onValueChange={onSectorChange}>
          <SelectTrigger className="w-[200px] bg-black-1">
            <SelectValue placeholder="Välj sektor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alla sektorer</SelectItem>
            {Object.entries(sectorNames).map(([code, name]) => (
              <SelectItem key={code} value={code}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[200px] bg-black-1">
            <SelectValue placeholder="Sortera efter" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="h-8 bg-black-1 border-none gap-2"
      >
        <Filter className="w-4 h-4" />
        Filter
      </Button>
    </div>
  )
}
