import { Pen } from "lucide-react";
import { Text } from "@/components/ui/text";
import type { CompanyDetails } from "@/types/company";
import React from "react";
import Select from "react-select";

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
  const periods = [...company.reportingPeriods].map((period) => {
    return {
      value: new Date(period.endDate).getFullYear().toString(),
      label: new Date(period.endDate).getFullYear().toString(),
    };
  });
  periods.sort();

  return (
    <div className="flex items-start justify-between mb-12">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Text variant="display">{company.name}</Text>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div>
          <label className="text-sm">Reportingperiod:</label>
          <Select
            options={periods}
            isMulti
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: "#2E2E2E",
                border: "none",
              }),
              menu: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: "#2E2E2E",
                border: "none",
              }),
              option: (baseStyles, {isFocused}) => ({
                ...baseStyles,
                backgroundColor: isFocused ? "#3A3A3A" : "#2E2E2E",
              }),
              multiValue: (baseStyles) => ({
                ...baseStyles,
                backgroundColor: "#3A3A3A",
                color: "white"
              }),
            }}
          ></Select>
        </div>
        <div className="w-16 h-16 rounded-full bg-orange-5/30 flex items-center justify-center">
          <Pen className="w-8 h-8 text-orange-2" />
        </div>
      </div>
    </div>
  );
}
