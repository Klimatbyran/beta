import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatEmissions = (tons: number) => {
  if (tons >= 1500000) {
    // 1.5 million or more -> show in millions
    return `${(tons / 1000000).toFixed(1)}m`
  } else {
    // Less than 1.5 million -> show in thousands
    return `${Math.round(tons / 1000)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}`
  }
}

export const formatPercentage = (value: number): string => {
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`
}
