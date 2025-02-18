export interface ChartData {
  year: number;
  total: number;
  scope1?: number;
  scope2?: number;
  [key: string]: number | undefined; // For dynamic category keys
}
