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
  return (
    <div className="flex flex-col dark:bg-muted/40">
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
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl">Totala utsläpp {year}</div>
                      <div className="text-2xl font-bold flex items-center gap-2">
                        <div className="rounded-full bg-gray-800 dark:bg-gray-800 p-2">
                          {totalEmissions.toLocaleString('sv-se')}
                        </div>
                      </div>
                    </div>
                    {/*<LineChart className="aspect-[9/4]" />*/}
                  </div>
                  <div className="grid gap-4">
                    <div className="font-semibold">Scope 1 and 2 utsläpp</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Scope 1 utsläpp</div>
                          <div className="text-sm text-gray-400 dark:text-gray-500">
                            Utsläpp från egna källor eller kontrollerade av
                            organisationen.
                          </div>
                        </div>
                        <div className="text-2xl font-bold flex items-center gap-2">
                          <div className="rounded-full bg-gray-800 dark:bg-gray-800 p-2">
                            {emissions.scope1.emissions.toLocaleString('sv-se')}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Scope 2 Emissions</div>
                          <div className="text-sm text-gray-400 dark:text-gray-500">
                            Indirekta utsläpp från produktion av köpt el, ånga,
                            värme och kyla som konsumeras av organisationen.
                          </div>
                        </div>
                        <div className="text-2xl font-bold flex items-center gap-2">
                          <div className="rounded-full bg-gray-800 dark:bg-gray-800 p-2">
                            {emissions.scope2.emissions.toLocaleString('sv-se')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-4">
                    <div className="font-semibold">
                      Scope 3 Utsläppskategorier
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-800 dark:bg-gray-800">
                            <TruckIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-medium">
                              Köpta varor och tjänster
                            </div>
                            <div className="text-sm text-gray-400 dark:text-gray-500">
                              Utsläpp från produktion av varor och tjänster som
                              köpts av organisationen.
                            </div>
                          </div>
                        </div>
                        <div className="text-2xl font-bold mt-2 flex items-center gap-2 justify-end">
                          <div className="rounded-full bg-gray-800 dark:bg-gray-800 p-2">
                            {emissions.scope3.categories[
                              '1_purchasedGoods'
                            ]?.toLocaleString('sv-se')}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-800 dark:bg-gray-800">
                            <PlaneIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-medium">Affärsresor</div>
                            <div className="text-sm text-gray-400 dark:text-gray-500">
                              Utsläpp från transport av anställda för
                              affärsrelaterade aktiviteter.
                            </div>
                          </div>
                        </div>
                        <div className="text-2xl font-bold mt-2 flex items-center gap-2 justify-end">
                          <div className="rounded-full bg-gray-800 dark:bg-gray-800 p-2">
                            {emissions.scope3.categories[
                              '6_businessTravel'
                            ]?.toLocaleString('sv-se')}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-800 dark:bg-gray-800">
                            <CompassIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-medium">
                              Anställdas pendling
                            </div>
                            <div className="text-sm text-gray-400 dark:text-gray-500">
                              Utsläpp från transport av anställda mellan deras
                              hem och arbetsplatser.
                            </div>
                          </div>
                        </div>
                        <div className="text-2xl font-bold mt-2 flex items-center gap-2 justify-end">
                          <div className="text-2xl font-bold flex items-center gap-2 justify-end">
                            <div className="rounded-full bg-gray-800 dark:bg-gray-800 p-2">
                              {emissions.scope3.categories[
                                '7_employeeCommuting'
                              ]?.toLocaleString('sv-se')}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-800 dark:bg-gray-800">
                            <WarehouseIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-medium">
                              Uppströms transporter och distribution
                            </div>
                            <div className="text-sm text-gray-400 dark:text-gray-500">
                              Utsläpp från transport och distribution av
                              produkter som köpts av organisationen, dvs från
                              sina leverantörer.
                            </div>
                          </div>
                        </div>
                        <div className="text-2xl font-bold mt-2 flex items-center gap-2 justify-end">
                          <div className="rounded-full bg-gray-800 dark:bg-gray-800 p-2">
                            {emissions.scope3.categories[
                              '4_upstreamTransportationAndDistribution'
                            ]?.toLocaleString('sv-se')}
                          </div>
                        </div>
                      </div>
                      <div>
                        {newFunction()}
                        <div className="text-2xl font-bold mt-2 flex items-center gap-2 justify-end">
                          <div className="rounded-full bg-gray-800 dark:bg-gray-800 p-2">
                            {emissions.scope3.categories[
                              '5_wasteGeneratedInOperations'
                            ]?.toLocaleString('sv-se')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-semibold">Ranking</div>
                    <div className="text-2xl font-bold">3rd</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-center">2028</div>
                    <div className="text-center text-gray-400 dark:text-gray-500">
                      According to current emissions, Acme Inc will run out of
                      its CO2 budget by 2028.
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="font-semibold">
                      Våra initiativ och löften
                    </div>
                    <ul className="grid gap-2">
                      {company.initiatives.map((initiative, i) => (
                        <li key={i} className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-800 dark:bg-gray-800">
                            <CheckIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-medium">
                              {initiative.title}
                            </div>
                            <div className="text-sm text-gray-400 dark:text-gray-500">
                              {initiative.description}%
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
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
