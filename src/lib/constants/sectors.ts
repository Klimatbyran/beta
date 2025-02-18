// GICS sector names and metadata
export const SECTOR_NAMES: Record<string, string> = {
  "10": "Energi",
  "15": "Material",
  "20": "Industri",
  "25": "Sällanköpsvaror",
  "30": "Dagligvaror",
  "35": "Hälsovård",
  "40": "Finans",
  "45": "IT",
  "50": "Kommunikation",
  "55": "Kraftförsörjning",
  "60": "Fastigheter",
} as const;

export const SECTOR_ORDER = [
  "10",
  "15",
  "20",
  "25",
  "30",
  "35",
  "40",
  "45",
  "50",
  "55",
  "60",
] as const;

export const SECTORS = [
  { value: "all", label: "Alla sektorer" },
  ...Object.entries(SECTOR_NAMES).map(([code, name]) => ({
    value: code,
    label: name,
  })),
] as const;

export type SectorCode = keyof typeof SECTOR_NAMES;
export type Sector = (typeof SECTORS)[number]["value"];
