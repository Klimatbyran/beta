import { IconCheckbox } from "@/components/ui/icon-checkbox";
import { Input } from "@/components/ui/input";
import { categoryMetadata } from "@/lib/constants/categories";

export function CompanyEditScope3({ periods }) {

  if(periods.length <= 0 || periods[0].emissions.scope3 === undefined || periods[0].emissions.scope3.categories === undefined) {
    return <></>;
  }

  return (
    <>
      <div className="flex justify-between my-2 py-2 px-4 items-center">
        <h2 className="text-lg font-bold">Scope 3</h2>
      </div>

      {periods[0].emissions.scope3.categories.map((category, index) => (
        <div>
        {category.category !== 16 && (
          <div className="flex justify-between my-1 px-6 py-3 rounded-lg hover:bg-[#1F1F1F] items-center">
          <h3 className="text-md">{categoryMetadata[category.category].name}</h3>
          {periods.map(period => (
            <div>
              <div className="flex items-center">
                <Input
                  type="number"
                  className="w-[150px] bg-black-1"
                  value={period.emissions.scope3.categories[index].total ?? 0}
                ></Input>
                <IconCheckbox></IconCheckbox>
              </div>
            </div>
          ))}
        </div>
        )}
        </div>        
      ))}
    </>
  );
}
