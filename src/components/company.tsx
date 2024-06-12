import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar'
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card'

import type { CompanyData } from '@/data/companyData'
import {
  CheckIcon,
  CompassIcon,
  PlaneIcon,
  TruckIcon,
  WarehouseIcon,
  WormIcon,
} from './icons'
import DataCard from './dataCard'
import InitiativeList from './initiativeList'
import ScopeEmissions from './ScopeEmissions'
import Scope3Emissions from './Scope3Emissions'

function extractInitials(name: string) {
  return (name || '')
    .split(' ')
    .map((part) => part[0])
    .join('')
}

export function Company({ company }: { company: CompanyData }) {
  const year = '2023'
  const emissions = company.emissions[year]
  const totalEmissions =
    emissions &&
    (emissions.scope1.emissions || 0) +
      (emissions.scope2.emissions ||
        emissions.scope2.mb ||
        emissions.scope2.lb ||
        0) +
      (emissions.scope3.emissions || 0)

  const scopeEmissionsList = [
    {
      subtitle: 'Scope 1 utsläpp',
      description:
        'Utsläpp från egna källor eller kontrollerade av organisationen.',
      value: emissions.scope1.emissions,
    },
    {
      subtitle: 'Scope 2 utsläpp',
      description:
        'Indirekta utsläpp från produktion av köpt el, ånga, värme och kyla som konsumeras av organisationen.',
      value: emissions.scope2.emissions,
    },
  ]
  return (
    <div className="flex flex-col">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col sm:flex" />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-4 xl:grid-cols-4">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-4">
            <Card
              className="sm:col-span-2 dark:bg-background"
              x-chunk="dashboard-05-chunk-0"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4">
                  <div>
                    <CardTitle>{company.companyName}</CardTitle>
                    <div className="text-sm text-gray-400 dark:text-gray-500">
                      {company.description}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <DataCard
                    title={'Totala utsläpp ' + year}
                    data={totalEmissions.toLocaleString('sv-se')}
                  />
                  <ScopeEmissions
                    title="Scope 1 and 2 utsläpp"
                    emissions={scopeEmissionsList}
                  />
                  <Scope3Emissions emissions={emissions.scope3.categories} />
                </div>
              </CardContent>
              <CardFooter>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-semibold">Ranking</div>
                    <div className="text-2xl font-bold">3rd</div>
                  </div>
                  <div className="col-span-2">
                    <div className="font-semibold">
                      Våra initiativ och löften
                    </div>
                    <InitiativeList initiatives={company.initiatives} />
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

function newFunction() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-800 dark:bg-gray-800">
        <WormIcon className="h-5 w-5" />
      </div>
      <div>
        <div className="font-medium">Avfall genererat i verksamheten</div>
        <div className="text-sm text-gray-400 dark:text-gray-500">
          Utsläpp från avfall som genereras av organisationens verksamhet.
        </div>
      </div>
    </div>
  )
}
