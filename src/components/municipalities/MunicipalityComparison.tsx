import { useState } from 'react'
import { Text } from '@/components/ui/text'
import { cn, formatPercentage } from '@/lib/utils'
import { Link } from 'react-router-dom'
import { EmissionsComparison } from './comparisons/EmissionsComparison'
import { BudgetComparison } from './comparisons/BudgetComparison'
import { BudgetTimeComparison } from './comparisons/BudgetTimeComparison'
import { ReductionComparison } from './comparisons/ReductionComparison'
import { NetZeroComparison } from './comparisons/NetZeroComparison'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Municipality {
  id: string
  name: string
  value: number
  rank: string
  change?: number
}

interface MunicipalityComparisonProps {
  title?: string
  description?: string
  nationalAverage?: number
  euTarget?: number
  unit?: string
  municipalities: Municipality[]
  className?: string
}

export function MunicipalityComparison({
  title = 'Hur går det med?',
  description = 'Vi utför mätningar av den samlade längden av cykelvägar per invånare, inklusive alla väghållare (statliga, kommunala och enskilda). Den senaste tillgängliga datan är från år 2022.',
  nationalAverage = 2.8,
  euTarget = 3.8,
  unit = 'm',
  municipalities,
  className,
}: MunicipalityComparisonProps) {
  const [activeTab, setActiveTab] = useState('cyklarna')

  const tabs = [
    { id: 'historical', label: 'Historiska utsläpp' },
    { id: 'budget', label: 'Utsläppsbudget' },
    { id: 'budget_time', label: 'Budget räcker till' },
    { id: 'reduction', label: 'Årlig minskning' },
    { id: 'net_zero', label: 'Nettonoll-mål' },
    { id: 'ev_change', label: 'Elbilsförändring' },
    { id: 'ev_chargers', label: 'Laddpunkter' },
    { id: 'consumption', label: 'Konsumtionsutsläpp' },
    { id: 'bicycle', label: 'Cykelvägar' },
    { id: 'procurement', label: 'Miljöupphandling' },
  ]

  return (
    <div className={cn('space-y-8', className)}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <Text variant="h2">{title}</Text>
          <Text variant="muted" className="max-w-2xl">
            {description}
          </Text>
        </div>

        {/* Metrics */}
        <div className="space-y-8 text-right">
          <div>
            <Text variant="large">RIKSSNITT</Text>
            <Text className="text-7xl font-light">
              {nationalAverage}
              <span className="text-2xl">{unit}</span>
            </Text>
          </div>
          <div>
            <Text variant="large">EU:S MÅLBILD</Text>
            <Text className="text-7xl font-light">
              {euTarget}
              <span className="text-2xl">{unit}</span>
            </Text>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-transparent border border-black-1 p-2 h-auto">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className={cn(
                'rounded-full data-[state=active]:bg-white data-[state=active]:text-black',
                'transition-colors hover:text-white',
              )}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'bicycle' &&
          municipalities.map((municipality, index) => (
            <Link
              key={municipality.id}
              to={`/municipalities/${municipality.name.toLowerCase().replace(/ /g, '-')}`}
              className="flex items-center justify-between py-4 border-t border-black-1 hover:bg-black-1/80 transition-colors"
            >
              <div className="flex items-center gap-8">
                <Text className="text-blue-2 w-12 text-4xl font-light">
                  {String(index + 1).padStart(2, '0')}
                </Text>
                <Text className="text-2xl font-light">{municipality.name}</Text>
              </div>
              <div className="flex items-center gap-4">
                <Text className="text-2xl font-light text-blue-2">
                  {municipality.value.toFixed(1)}
                  <span className="text-lg text-grey ml-1">{unit}</span>
                </Text>
                {municipality.change && (
                  <Text
                    variant="small"
                    className={cn(
                      'px-2 rounded',
                      municipality.change > 0
                        ? 'text-green-3 bg-green-5/30'
                        : 'text-pink-3 bg-pink-5/30',
                    )}
                  >
                    {formatPercentage(municipality.change)}
                  </Text>
                )}
              </div>
            </Link>
          ))}

        {activeTab === 'historical' && (
          <EmissionsComparison municipalities={municipalities} />
        )}

        {activeTab === 'budget' && (
          <BudgetComparison municipalities={municipalities} />
        )}

        {activeTab === 'budget_time' && (
          <BudgetTimeComparison municipalities={municipalities} />
        )}

        {activeTab === 'reduction' && (
          <ReductionComparison municipalities={municipalities} />
        )}

        {activeTab === 'net_zero' && (
          <NetZeroComparison municipalities={municipalities} />
        )}

        {(activeTab === 'budget' ||
          activeTab === 'budget_time' ||
          activeTab === 'reduction' ||
          activeTab === 'net_zero' ||
          activeTab === 'ev_change' ||
          activeTab === 'ev_chargers' ||
          activeTab === 'consumption' ||
          activeTab === 'bicycle' ||
          activeTab === 'procurement') && (
          <div className="text-center py-12">
            <Text variant="h3" className="text-grey">
              Kommer snart
            </Text>
            <Text variant="muted" className="mt-2">
              {activeTab === 'budget' &&
                'Vi beräknar kommunernas utsläppsbudget'}
              {activeTab === 'budget_time' &&
                'Vi analyserar hur länge budgeten räcker'}
              {activeTab === 'reduction' &&
                'Vi beräknar nödvändig årlig minskning'}
              {activeTab === 'net_zero' && 'Vi sammanställer nettonoll-målen'}
              {activeTab === 'ev_change' &&
                'Vi samlar in data om elbilsförändring'}
              {activeTab === 'ev_chargers' &&
                'Vi samlar in data om laddinfrastruktur'}
              {activeTab === 'consumption' &&
                'Vi samlar in data om konsumtionsutsläpp'}
              {activeTab === 'bicycle' && 'Vi mäter cykelvägar per capita'}
              {activeTab === 'procurement' && 'Vi analyserar miljöupphandling'}
            </Text>
          </div>
        )}
      </div>
    </div>
  )
}
