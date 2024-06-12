import React from 'react'

interface DataCardProps {
  title: string
  data: number | string
}

export function DataCard({ title, data }: DataCardProps) {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <div className="text-2xl">{title}</div>
        <div className="text-2xl font-bold flex items-center gap-2">
          <div className="rounded-full bg-gray-800 dark:bg-gray-800 p-2">
            {data}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataCard
