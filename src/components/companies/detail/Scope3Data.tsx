import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EmissionsBreakdown } from './EmissionsBreakdown'
import { Scope3Chart } from './Scope3Chart'
import { RealEstateScope3History } from './RealEstateScope3History'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Text } from '@/components/ui/text'
import {
  getCategoryColor,
  getCategoryDescription,
  getCategoryIcon,
  getCategoryName,
} from '@/lib/constants/categories'
import { cn } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface Scope3DataProps {
  emissions: {
    scope1And2?: { total: number; unit: string } | null
    scope1?: { total: number; unit: string } | null
    scope2?: {
      mb?: number | null
      lb?: number | null
      unknown?: number | null
      unit: string
      calculatedTotalEmissions: number
    } | null
    scope3?: {
      total: number
      unit: string
      categories?: Array<{
        category: number
        total: number
        unit: string
      }>
    } | null
    biogenicEmissions?: { total: number; unit: string } | null
  } | null
  year: number
  className?: string
  isRealEstate?: boolean
  historicalData?: Array<{
    year: number
    categories: Array<{
      category: number
      total: number
      unit: string
    }>
  }>
}

export function Scope3Data({
  emissions,
  year,
  className,
  isRealEstate,
  historicalData,
}: Scope3DataProps) {
  const [selectedYear, setSelectedYear] = useState<string>('latest')

  if (!emissions?.scope3?.categories?.length) {
    return null
  }

  // Get available years from historical data
  const availableYears = historicalData
    ? [...new Set(historicalData.map((data) => data.year))].sort(
        (a, b) => b - a
      )
    : []

  // Get categories for selected year
  const selectedCategories =
    selectedYear === 'latest'
      ? emissions.scope3.categories
      : historicalData?.find((data) => data.year === parseInt(selectedYear))
          ?.categories || emissions.scope3.categories

  // Create emissions object for selected year
  const selectedEmissions = {
    ...emissions,
    scope3: {
      ...emissions.scope3,
      categories: selectedCategories,
    },
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-8">
        <Text variant="h3">Scope 3-kategorier</Text>
        {historicalData && historicalData.length > 0 && (
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[180px] bg-black-1">
              <SelectValue placeholder="Välj år" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Senaste året</SelectItem>
              {availableYears.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="space-y-8 mb-8">
        <Text variant="muted">
          Scope 3-utsläpp delas in i uppströms och nedströms kategorier. Uppströms avser utsläpp som sker innan företagets egen verksamhet, till exempel från inköpta varor och tjänster. Nedströms avser utsläpp som sker efter företagets verksamhet, som användning av sålda produkter.
        </Text>
      </div>

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
            categories={selectedCategories}
            className="bg-transparent p-0"
          />
        </TabsContent>

        <TabsContent value="data">
          <div className="grid grid-cols-2 gap-8">
            {/* Upstream Categories */}
            <div className="space-y-8">
              <Text variant="h4" className="text-grey">
                Uppströms
              </Text>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((categoryId) => {
                  const reportedCategory = selectedCategories.find(
                    (c) => c.category === categoryId
                  )
                  const color = getCategoryColor(categoryId)
                  const Icon = getCategoryIcon(categoryId)
                  const isReported = !!reportedCategory

                  return (
                    <div
                      key={categoryId}
                      className={cn(
                        'bg-black-1 rounded-[32px] p-8 flex flex-col justify-between min-h-[240px]',
                        !isReported && 'opacity-30'
                      )}
                      style={{
                        background: `linear-gradient(160deg, ${color}15 0%, rgba(0,0,0,0) 100%)`,
                      }}
                    >
                      <div className="flex items-start justify-between mb-8">
                        <div>
                          <Text variant="large" style={{ color }}>
                            Kategori {categoryId}
                          </Text>
                          <Text variant="h3" className="mt-2">
                            {getCategoryName(categoryId)}
                          </Text>
                        </div>
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: `${color}25`,
                          }}
                        >
                          <Icon className="w-6 h-6" style={{ color }} />
                        </div>
                      </div>

                      <div className="flex justify-between items-end">
                        <Text className="text-grey max-w-[60%]">
                          {getCategoryDescription(categoryId)}
                        </Text>
                        {isReported ? (
                          <div className="text-right">
                            <div className="flex items-baseline gap-2">
                              <Text
                                className="text-[48px] font-light tracking-tighter"
                                style={{ color }}
                              >
                                {Math.round(
                                  reportedCategory.total
                                ).toLocaleString('sv-SE')}
                              </Text>
                              <Text className="text-grey">
                                {reportedCategory.unit}
                              </Text>
                            </div>
                            <Text variant="small" className="text-grey">
                              {(
                                (reportedCategory.total /
                                  selectedEmissions.scope3!.total) *
                                100
                              ).toFixed(1)}
                              % av scope 3
                            </Text>
                          </div>
                        ) : (
                          <Text variant="muted">Ej rapporterat</Text>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Downstream Categories */}
            <div className="space-y-8">
              <Text variant="h4" className="text-grey">
                Nedströms
              </Text>
              <div className="space-y-4">
                {[9, 10, 11, 12, 13, 14, 15].map((categoryId) => {
                  const reportedCategory = selectedCategories.find(
                    (c) => c.category === categoryId
                  )
                  const color = getCategoryColor(categoryId)
                  const Icon = getCategoryIcon(categoryId)
                  const isReported = !!reportedCategory

                  return (
                    <div
                      key={categoryId}
                      className={cn(
                        'bg-black-1 rounded-[32px] p-8 flex flex-col justify-between min-h-[240px]',
                        !isReported && 'opacity-30'
                      )}
                      style={{
                        background: `linear-gradient(160deg, ${color}15 0%, rgba(0,0,0,0) 100%)`,
                      }}
                    >
                      <div className="flex items-start justify-between mb-8">
                        <div>
                          <Text variant="large" style={{ color }}>
                            Kategori {categoryId}
                          </Text>
                          <Text variant="h3" className="mt-2">
                            {getCategoryName(categoryId)}
                          </Text>
                        </div>
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: `${color}25`,
                          }}
                        >
                          <Icon className="w-6 h-6" style={{ color }} />
                        </div>
                      </div>

                      <div className="flex justify-between items-end">
                        <Text className="text-grey max-w-[60%]">
                          {getCategoryDescription(categoryId)}
                        </Text>
                        {isReported ? (
                          <div className="text-right">
                            <div className="flex items-baseline gap-2">
                              <Text
                                className="text-[48px] font-light tracking-tighter"
                                style={{ color }}
                              >
                                {Math.round(
                                  reportedCategory.total
                                ).toLocaleString('sv-SE')}
                              </Text>
                              <Text className="text-grey">
                                {reportedCategory.unit}
                              </Text>
                            </div>
                            <Text variant="small" className="text-grey">
                              {(
                                (reportedCategory.total /
                                  selectedEmissions.scope3!.total) *
                                100
                              ).toFixed(1)}
                              % av scope 3
                            </Text>
                          </div>
                        ) : (
                          <Text variant="muted">Ej rapporterat</Text>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
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
  )
}
