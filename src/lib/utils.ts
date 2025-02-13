import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format large numbers with spaces as thousand separators
export function formatNumber(num: number) {
  return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}