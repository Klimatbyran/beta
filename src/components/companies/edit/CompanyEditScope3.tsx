import { IconCheckbox } from "@/components/ui/icon-checkbox";
import { Input } from "@/components/ui/input";
import { categoryMetadata } from "@/lib/constants/categories";
import { CompanyEditRow } from "./CompanyEditRow";
import { CompanyEditInputField, CompanyEmptyField } from "./CompanyEditField";

export function CompanyEditScope3({ periods }) {
  if (
    periods.length <= 0 ||
    periods[0].emissions.scope3 === undefined ||
    periods[0].emissions.scope3.categories === undefined
  ) {
    return <></>;
  }

  const getCategoryValue = (index: number, categories) => {
    const category = categories.find((category) => category.category === index);
    return category !== undefined ? category.total : 0;
  };
  return (
    <>
      <CompanyEditRow
        headerName
        noHover
        name="Scope 3"
        fields={periods.map((_period => CompanyEmptyField()))}
      ></CompanyEditRow>

      {Object.values(categoryMetadata).map((category, index) => (
        <div>
          {index !== 15 && (
            <CompanyEditRow
              name={category.name}
              fields={periods.map((period) =>
                CompanyEditInputField({
                  type: "number",
                  value: getCategoryValue(
                    index,
                    period.emissions.scope3.categories
                  ),
                })
              )}
            ></CompanyEditRow>
          )}
        </div>
      ))}
    </>
  );
}
