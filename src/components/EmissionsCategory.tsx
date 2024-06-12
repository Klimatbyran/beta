import React from 'react'

interface EmissionCategoryProps {
  icon: React.ReactNode
  title: string
  description: string
  emissions: number
}

export function EmissionCategory({
  icon,
  title,
  description,
  emissions,
}: EmissionCategoryProps) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-800 dark:bg-gray-800">
          {icon}
        </div>
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-sm text-gray-400 dark:text-gray-500">
            {description}
          </div>
        </div>
      </div>
      <div className="text-2xl font-bold mt-2 flex items-center gap-2 justify-end">
        <div className="rounded-full bg-gray-800 dark:bg-gray-800 p-2">
          {emissions.toLocaleString('sv-se')}
        </div>
      </div>
    </div>
  )
}

export default EmissionCategory
