import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface SortingDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
}

export function SortingDropdown({
  value,
  onChange,
  options,
  className,
}: SortingDropdownProps) {
  return (
    <div className={cn("", className)}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full h-12 text-base bg-black-1 border-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-black-1 border-none">
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="text-base py-2 cursor-pointer"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
