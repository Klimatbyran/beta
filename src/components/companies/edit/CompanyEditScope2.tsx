import { IconCheckbox } from "@/components/ui/icon-checkbox";
import { Input } from "@/components/ui/input";
import { CompanyEditRow } from "./CompanyEditRow";
import { CompanyEditInputField, CompanyEmptyField } from "./CompanyEditField";

export function CompanyEditScope2({ periods, onInputChange }) {
  return (
    <>
      <CompanyEditRow
        key={"scope-2"}
        headerName
        noHover
        name="Scope 2"
        fields={periods.map((period) => CompanyEmptyField())}
      ></CompanyEditRow>
      <CompanyEditRow
      key={"scope-2-mb"}
        name="Market-based"
        fields={periods.map((period) =>
          CompanyEditInputField({
            type: "number",
            name: "scope-2-mb-" + period.id,
            value: period.emissions.scope2.mb ?? 0,            
            verified: period.emissions.scope2.metadata.verifiedBy !== null,
            onInputChange
          })
        )}
      ></CompanyEditRow>
      <CompanyEditRow
        key={"scope-2-lb"}
        name="Location-based"
        fields={periods.map((period) =>
          CompanyEditInputField({
            type: "number",
            name: "scope-2-lb-" + period.id,
            value: period.emissions.scope2.lb ?? 0,            
            verified: period.emissions.scope2.metadata.verifiedBy !== null,
            onInputChange
          })
        )}
      ></CompanyEditRow>
      <CompanyEditRow
        key={"scope-2-unknown"}
        name="Unknown"
        fields={periods.map((period) =>
          CompanyEditInputField({
            type: "number",
            name: "scope-2-unknown-" + period.id,
            value: period.emissions.scope2.unknown ?? 0,            
            verified: period.emissions.scope2.metadata.verifiedBy !== null,
            onInputChange
          })
        )}
      ></CompanyEditRow>
    </>
  );
}