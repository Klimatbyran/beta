import { IconCheckbox } from "@/components/ui/icon-checkbox";
import { Input } from "@/components/ui/input";
import { CompanyEditRow } from "./CompanyEditRow";
import { CompanyEditInputField, CompanyYearHeaderField } from "./CompanyEditField";

export function CompanyEditPeriod({ periods }) {
  return (
    <>
      <CompanyEditRow name="Reporting Timespan" headerName noHover fields={periods.map(period => CompanyYearHeaderField({text: period.endDate.substring(0, 4)}))}></CompanyEditRow>
      <CompanyEditRow name="Start" fields={periods.map(period => CompanyEditInputField({type: "date", value: period.startDate.substring(0, 10)}))}></CompanyEditRow>
      <CompanyEditRow name="End"  fields={periods.map(period => CompanyEditInputField({type: "date", value: period.endDate.substring(0, 10)}))}></CompanyEditRow>
    </>
  );
}
