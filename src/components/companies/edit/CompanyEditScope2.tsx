import { IconCheckbox } from "@/components/ui/icon-checkbox";
import { Input } from "@/components/ui/input";
import { CompanyEditRow } from "./CompanyEditRow";
import { CompanyEditInputField, CompanyEmptyField } from "./CompanyEditField";

export function CompanyEditScope2({ periods }) {
  return (
    <>
      <CompanyEditRow
        headerName
        noHover
        name="Scope 2"
        fields={periods.map((period) => CompanyEmptyField())}
      ></CompanyEditRow>
      <CompanyEditRow
        name="Market-based"
        fields={periods.map((period) =>
          CompanyEditInputField({
            type: "number",
            value: period.emissions.scope2.mb ?? 0,
          })
        )}
      ></CompanyEditRow>
      <CompanyEditRow
        name="Location-based"
        fields={periods.map((period) =>
          CompanyEditInputField({
            type: "number",
            value: period.emissions.scope2.lb ?? 0,
          })
        )}
      ></CompanyEditRow>
      <CompanyEditRow
        name="Unknown"
        fields={periods.map((period) =>
          CompanyEditInputField({
            type: "number",
            value: period.emissions.scope2.unknown ?? 0,
          })
        )}
      ></CompanyEditRow>
    </>
  );
}
