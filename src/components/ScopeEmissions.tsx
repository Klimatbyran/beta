import React from 'react'

interface Emission {
  subtitle: string
  description: string
  value: number
}

interface ScopeEmissionsProps {
  title: string
  emissions: Emission[]
}

export function ScopeEmissions({ title, emissions }: ScopeEmissionsProps) {
  return (
    <div className="grid gap-4">
      <div className="font-semibold">{title}</div>
      <div className="grid gap-4">
        {emissions.map((emission, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <div className="font-medium">{emission.subtitle}</div>
              <div className="text-sm text-gray-400 dark:text-gray-500">
                {emission.description}
              </div>
            </div>
            <div className="flex items-center gap-2 text-2xl font-bold">
              <div className="rounded-full bg-gray-800 p-2 dark:bg-gray-800">
                {emission.value.toLocaleString('sv-se')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ScopeEmissions
