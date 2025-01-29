import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format large numbers with spaces as thousand separators
export function formatNumber(num: number) {
  return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/**
 * Format emissions values with appropriate scaling
 * @param tons - Emissions value in tons CO2e
 * @returns Formatted string with appropriate unit (m for millions, k for thousands)
 */
export function formatEmissions(tons: number): string {
  if (tons >= 1500000) { // 1.5 million or more -> show in millions
    return `${(tons / 1000000).toFixed(1)}m`;
  } else { // Less than 1.5 million -> show in thousands
    return `${Math.round(tons / 1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}k`;
  }
}

/**
 * Format percentage values with appropriate sign and decimals
 * @param value - Percentage value
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted percentage string with sign
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value > 0 ? '+' : ''}${value.toFixed(decimals)}%`;
}
