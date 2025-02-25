// GICS sector names and metadata
export const SECTOR_NAMES: Record<string, string> = {
  "10": "sector.energy",
  "15": "sector.materials",
  "20": "sector.industrials",
  "25": "sector.consumerDiscretionary",
  "30": "sector.consumerStaples",
  "35": "sector.healthCare",
  "40": "sector.financials",
  "45": "sector.informationTechnology",
  "50": "sector.communicationServices",
  "55": "sector.utilities",
  "60": "sector.realEstate",
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
