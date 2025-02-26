import { IconCheckbox } from "@/components/ui/icon-checkbox";
import { Input } from "@/components/ui/input";

export function CompanyEditScope1({ periods }) {
  return (
    <div className="flex justify-between my-1 ps-4 pe-6 py-3 rounded-lg hover:bg-[#1F1F1F] items-center">
      <h2 className="text-lg font-bold">Scope 1</h2>
      <div>
        {periods.map((period) => (
          <div className="flex items-center">
            <Input
              type="number"
              className="w-[150px] bg-black-1"
              value={period.emissions.scope1.total ?? 0}
            ></Input>
            <IconCheckbox></IconCheckbox>
          </div>
        ))}
      </div>
    </div>
  );
}
