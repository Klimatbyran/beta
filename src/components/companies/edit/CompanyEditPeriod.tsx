import { IconCheckbox } from "@/components/ui/icon-checkbox";
import { Input } from "@/components/ui/input";
import { CompanyEditRow } from "./CompanyEditRow";
import { CompanyEditInputField, CompanyYearHeaderField } from "./CompanyEditField";

export function CompanyEditPeriod({ periods, onInputChange }) {
  return (
    <>
      <CompanyEditRow name="Reporting Timespan" key={"reporting-timespan"} headerName noHover fields={periods.map(period => CompanyYearHeaderField({text: period.endDate.substring(0, 4)}))}></CompanyEditRow>
      <CompanyEditRow name="Start" key={"start-date"} fields={periods.map(period => CompanyEditInputField({type: "date", value: period.startDate.substring(0, 10), name: "start-date-" + period.id, verified: false, onInputChange}))}></CompanyEditRow>
      <CompanyEditRow name="End"  key={"end-date"} fields={periods.map(period => CompanyEditInputField({type: "date", value: period.endDate.substring(0, 10), name: "end-date-" + period.id, verified: false, onInputChange}))}></CompanyEditRow>
    </>
  );
}
