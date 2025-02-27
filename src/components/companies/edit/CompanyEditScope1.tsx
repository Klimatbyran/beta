import { CompanyEditRow } from "./CompanyEditRow";
import { CompanyEditInputField } from "./CompanyEditField";

export function CompanyEditScope1({ periods }) {
  return (
    <CompanyEditRow
      headerName
      name="Scope 1"
      fields={periods.map((period) =>
        CompanyEditInputField({
          type: "number",
          value: period.emissions.scope1.total ?? 0,
        })
      )}
    ></CompanyEditRow>
  );
}
