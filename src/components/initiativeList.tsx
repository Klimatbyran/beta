import React from 'react'
import { CheckIcon } from './icons'

interface Initiative {
  title: string
  description: string
}

interface InitiativeListProps {
  initiatives: Initiative[]
}

export function InitiativeList({ initiatives }: InitiativeListProps) {
  return (
    <ul className="grid gap-2">
      {initiatives.map((initiative, i) => (
        <li key={i} className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-800 dark:bg-gray-800">
            <CheckIcon className="h-5 w-5" />
          </div>
          <div>
            <div className="font-medium">{initiative.title}</div>
            <div className="text-sm text-gray-400 dark:text-gray-500">
              {initiative.description}%
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default InitiativeList
