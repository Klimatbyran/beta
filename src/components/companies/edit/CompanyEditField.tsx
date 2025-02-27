import { Input } from "@/components/ui/input";
import { IconCheckbox } from "@/components/ui/icon-checkbox";

export interface CompanyEditInputFieldProps {
  type: "date" | "number" | "text";
  value: number | string;
}

export function CompanyEditInputField({
  type,
  value,
}: CompanyEditInputFieldProps) {
  return (
    <div className="flex items-center w-[187px] me-2 py-2 border-r border-white">
      <Input type={type} className="w-[150px] bg-black-1" value={value}></Input>
      <IconCheckbox></IconCheckbox>
    </div>
  );
}

export function CompanyYearHeaderField({ text }: { text: string }) {
  return <div className="w-[187px] text-right me-2 pe-[36px] pe-2 border-r border-white min-h-[36px]">{text}</div>;
}

export function CompanyEmptyField() {
  return <div className="w-[187px] py-2 border-r me-2 border-white min-h-[36px]"></div>;
}
