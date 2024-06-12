import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card'

import type { CompanyData } from '@/data/companyData'
import DataCard from './dataCard'
import InitiativeList from './initiativeList'
import ScopeEmissions from './ScopeEmissions'
import Scope3Emissions from './Scope3Emissions'

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
                    <div className="text-sm text-gray-400 dark:text-gray-500">
                      Läs {company.companyName}s{' '}
                      <a
                        href={company.url}
                        className="text-sm text-blue-500 dark:text-blue-300 underline"
                      >
                        hållbarhetsrapport
                      </a>
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <div className="font-semibold">
                      Våra initiativ och löften
                    </div>
                    <InitiativeList initiatives={company.initiatives} />
                  </div>
                </div>
              </CardContent>
              <CardHeader className="pb-3">
                <div className="flex flex-col gap-4">
                  {company.industryNace.division.name && (
                    <DataCard
                      title={'Industri'}
                      data={company.industryNace.division.name}
                    />
                  )}
                  {company.baseFacts[year]?.turnover && (
                    <DataCard
                      title={'Omsättning ' + year}
                      data={
                        company.baseFacts[year].turnover.toLocaleString(
                          'sv-se',
                        ) +
                        ' ' +
                        company.baseFacts.unit
                      }
                    />
                  )}
                  {company.baseFacts[year]?.employees && (
                    <DataCard
                      title={'Anställda 2023'}
                      data={company.baseFacts[year].employees}
                    />
                  )}
                  <div className="col-span-2">
                    <div className="font-semibold">Kontakt</div>
                    <ul className="list-disc pl-5">
                      {company.contacts.map((contact, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-400 dark:text-gray-500"
                        >
                          {contact.name} - {contact.email}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Company
