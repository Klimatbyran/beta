import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { EmissionsHistory } from './EmissionsHistory'
import type { CompanyDetails } from '@/types/company'

interface CompanyHistoryProps {
  company: CompanyDetails
  selectedYear: string
  onYearSelect: (year: string) => void
}

export function CompanyHistory({
  company,
  selectedYear,
  onYearSelect,
}: CompanyHistoryProps) {
  const sortedPeriods = [...company.reportingPeriods].sort(
    (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime(),
  )

  return (
    <>
      <div className="flex justify-end">
        <Select value={selectedYear} onValueChange={onYearSelect}>
          <SelectTrigger className="w-[180px] bg-black-1">
            <SelectValue placeholder="Välj år" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Senaste året</SelectItem>
            {sortedPeriods.map((period) => {
              const year = new Date(period.endDate).getFullYear().toString()
              return (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </div>

      <EmissionsHistory
        reportingPeriods={company.reportingPeriods}
        onYearSelect={onYearSelect}
      />
    </>
  )
}
