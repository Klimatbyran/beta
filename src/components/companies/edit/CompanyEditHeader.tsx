import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pen } from "lucide-react";
import { Text } from "@/components/ui/text";
import type { CompanyDetails } from "@/types/company";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { IconCheckbox } from "@/components/ui/icon-checkbox";

interface CompanyOverviewProps {
  company: CompanyDetails;
  selectedYear: string;
  onYearSelect: (year: string) => void;
}

export function CompanyEditHeader({
  company,
  selectedYear,
  onYearSelect,
}: CompanyOverviewProps) {
  const sortedPeriods = [...company.reportingPeriods].sort(
    (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
  );

	const getSelectedReportingPeriod = () => {
		return [...company.reportingPeriods].find((reportingPeriod) => new Date(reportingPeriod.endDate).getFullYear().toString() === selectedYear);
	}

	console.log(company)

  return (
    <div className="bg-black-2 rounded-level-1 p-16">
      <div className="flex items-start justify-between mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div>
              <Text variant="display">{company.name}</Text>
							<div className="mt-3">
              <Select value={selectedYear} onValueChange={onYearSelect}>
                <SelectTrigger className="w-[180px] bg-black-1">
                  <SelectValue placeholder="Välj år" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Senaste året</SelectItem>
                  {sortedPeriods.map((period) => {
                    const year = new Date(period.endDate)
                      .getFullYear()
                      .toString();
                    return (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
							</div>
            </div>
          </div>
        </div>
        <div className="w-16 h-16 rounded-full bg-orange-5/30 flex items-center justify-center">
          <Pen className="w-8 h-8 text-orange-2" />
        </div>
      </div>
			<div className="flex items-center">
				<Input type="date" className="w-[150px] bg-black-1" value={getSelectedReportingPeriod() !== undefined ? getSelectedReportingPeriod()?.startDate.substring(0, 10) : ""}></Input>
				<span className="mx-2">-</span>
				<Input type="date" className="w-[150px] bg-black-1" value={getSelectedReportingPeriod() !== undefined ? getSelectedReportingPeriod()?.endDate.substring(0, 10) : ""}></Input>
				<IconCheckbox></IconCheckbox>
			</div>
			{getSelectedReportingPeriod() !== undefined && (
				<div>
					{getSelectedReportingPeriod()?.emissions?.scope1 !== undefined && (
						<div>
							<h2 className="text-xl">Scope 1</h2>
							<div className="flex items-center">
								<Input type="number" className="w-[150px] bg-black-1" value={getSelectedReportingPeriod()!.emissions!.scope1!.total}></Input>
								<span>{getSelectedReportingPeriod()!.emissions!.scope1!.unit}</span>
								<IconCheckbox></IconCheckbox>
							</div>
						</div>
					)}
					{getSelectedReportingPeriod()?.emissions?.scope1 !== undefined && (
						<div>
							<h2 className="text-xl">Scope 2</h2>
							<h4 className="text-md">Market-Based</h4>
							<div className="flex items-center">
								<Input type="number" className="w-[150px] bg-black-1" value={getSelectedReportingPeriod()!.emissions!.scope2!.mb ?? 0}></Input>
								<span>{getSelectedReportingPeriod()!.emissions!.scope2!.unit}</span>
								<IconCheckbox></IconCheckbox>
							</div>
							<h4 className="text-md">Location-Based</h4>
							<div className="flex items-center">
								<Input type="number" className="w-[150px] bg-black-1" value={getSelectedReportingPeriod()!.emissions!.scope2!.lb ?? 0}></Input>
								<span>{getSelectedReportingPeriod()!.emissions!.scope2!.unit}</span>
								<IconCheckbox></IconCheckbox>
							</div>
							<h4 className="text-md">Unknown</h4>
							<div className="flex items-center">
								<Input type="number" className="w-[150px] bg-black-1" value={getSelectedReportingPeriod()!.emissions!.scope2!.unknown ?? 0}></Input>
								<span>{getSelectedReportingPeriod()!.emissions!.scope2!.unit}</span>
								<IconCheckbox></IconCheckbox>
							</div>
						</div>
					)}
				</div>
			)}
    </div>
  );
}
