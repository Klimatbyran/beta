import { IconCheckbox } from "@/components/ui/icon-checkbox";
import { Input } from "@/components/ui/input";

export function CompanyEditPeriod({ periods }) {
  return (
    <div>
      <div className="flex justify-between my-2 py-2 ps-4 pe-6 items-center">
        <h2 className="text-lg font-bold">Reporting Timespan</h2>
        <div>
          {periods.map((period) => (
            <div className="w-[186px] text-right pe-[36px]">
              {period.endDate.substring(0, 4)}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between my-1 px-6 py-3 rounded-lg hover:bg-[#1F1F1F] items-center">
        <h2 className="text-md">Start</h2>
        <div>
          {periods.map((period) => (
            <div className="flex items-center">
              <Input
                type="date"
                className="w-[150px] bg-black-1"
                value={period.startDate.substring(0, 10)}
              ></Input>
              <IconCheckbox></IconCheckbox>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between my-1 px-6 py-3 rounded-lg hover:bg-[#1F1F1F] items-center">
        <h2 className="text-md">End</h2>
        <div>
          {periods.map((period) => (
            <div className="flex items-center">
              <Input
                type="date"
                className="w-[150px] bg-black-1"
                value={period.endDate.substring(0, 10)}
              ></Input>
              <IconCheckbox></IconCheckbox>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
