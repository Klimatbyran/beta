import { IconCheckbox } from "@/components/ui/icon-checkbox";
import { Input } from "@/components/ui/input";

export function CompanyEditScope2({ periods }) {
  return (
    <>
      <div className="flex justify-between my-2 py-2 px-4 items-center">
        <h2 className="text-lg font-bold">Scope 2</h2>
      </div>
      <div className="flex justify-between my-1 px-6 py-3 rounded-lg hover:bg-[#1F1F1F] items-center">
        <h3 className="text-md">Market-based</h3>
        <div>
          {periods.map((period) => (
            <div className="flex items-center">
              <Input
                type="number"
                className="w-[150px] bg-black-1"
                value={period.emissions.scope2.mb ?? 0}
              ></Input>
              <IconCheckbox></IconCheckbox>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between my-1 px-6 py-3 rounded-lg hover:bg-[#1F1F1F] items-center">
        <h3 className="text-md">Location-based</h3>
        <div>
          {periods.map((period) => (
            <div className="flex items-center">
              <Input
                type="number"
                className="w-[150px] bg-black-1"
                value={period.emissions.scope2.lb ?? 0}
              ></Input>
              <IconCheckbox></IconCheckbox>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between my-1 px-6 py-3 rounded-lg hover:bg-[#1F1F1F] items-center">
        <h3 className="text-md">Unknown</h3>
        <div>
          {periods.map((period) => (
            <div className="flex items-center">
              <Input
                type="number"
                className="w-[150px] bg-black-1"
                value={period.emissions.scope2.unknown ?? 0}
              ></Input>
              <IconCheckbox></IconCheckbox>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
