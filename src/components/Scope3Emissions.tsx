import React from 'react'
import {
  TruckIcon,
  PlaneIcon,
  CompassIcon,
  WarehouseIcon,
  WormIcon,
} from './icons'
import type { EmissionsScope } from '@/data/companyData'

interface EmissionCategoryProps {
  icon: React.ReactNode
  title: string
  description: string
  value: string | null | undefined
}

const EmissionCategory = ({
  icon,
  title,
  description,
  value,
}: EmissionCategoryProps) => (
  <div className="mb-4">
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-800 dark:bg-gray-800">
          {icon}
        </div>
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-sm text-muted">{description}</div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-2xl font-bold">
        <div className="rounded-full bg-gray-800 p-2 dark:bg-gray-800">
          {value}
        </div>
      </div>
    </div>
  </div>
)

interface Scope3EmissionsProps {
  emissions: EmissionsScope['categories']
}

const Scope3Emissions = ({ emissions }: Scope3EmissionsProps) => {
  return emissions ? (
    <div className="grid gap-4">
      <div className="font-semibold">Scope 3 Utsläppskategorier</div>
      <div className="grid gap-4">
        <EmissionCategory
          icon={<TruckIcon className="h-5 w-5" />}
          title="Köpta varor och tjänster"
          description="Utsläpp från produktion av varor och tjänster som köpts av organisationen."
          value={emissions['1_purchasedGoods']?.toLocaleString('sv-se')}
        />
        <EmissionCategory
          icon={<PlaneIcon className="h-5 w-5" />}
          title="Affärsresor"
          description="Utsläpp från transport av anställda för affärsrelaterade aktiviteter."
          value={emissions['6_businessTravel']?.toLocaleString('sv-se')}
        />
        <EmissionCategory
          icon={<CompassIcon className="h-5 w-5" />}
          title="Anställdas pendling"
          description="Utsläpp från transport av anställda mellan deras hem och arbetsplatser."
          value={emissions['7_employeeCommuting']?.toLocaleString('sv-se')}
        />
        <EmissionCategory
          icon={<WarehouseIcon className="h-5 w-5" />}
          title="Uppströms transporter och distribution"
          description="Utsläpp från transport och distribution av produkter som köpts av organisationen, dvs från sina leverantörer."
          value={emissions[
            '4_upstreamTransportationAndDistribution'
          ]?.toLocaleString('sv-se')}
        />
        <EmissionCategory
          icon={<WormIcon className="h-5 w-5" />}
          title="Avfall genererat i verksamheten"
          description="Utsläpp från avfall som genereras av organisationens verksamhet."
          value={emissions['5_wasteGeneratedInOperations']?.toLocaleString(
            'sv-se',
          )}
        />
      </div>
    </div>
  ) : null
}

export default Scope3Emissions
