import { CompanyEditRow } from "./CompanyEditRow";
import { CompanyEditInputField } from "./CompanyEditField";

export function CompanyEditScope1({ periods, onInputChange }) {
  console.log("scope 1 periods", periods)
  return (
    <CompanyEditRow
      headerName
      name="Scope 1"
      key={"scope-1"}
      fields={periods.map((period) =>
        CompanyEditInputField({
          name: "scope-1-" + period.id,
          type: "number",
          value: period.emissions.scope1.total ?? 0,
          verified: period.emissions.scope1.metadata?.verifiedBy,
          onInputChange
        })
      )}
    ></CompanyEditRow>
  );
}
