import { Building2, TreePine } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Text } from "@/components/ui/text";

interface RankedListProps {
  title: string;
  items: Array<{
    id: string;
    name: string;
    value: number;
    displayValue?: string;
  }>;
  type: 'municipality' | 'company';
  className?: string;
}

export function RankedList({ 
  title, 
  items: initialItems, 
  type, 
  className 
}: RankedListProps) {
  // Get total number of items in the full dataset
  const totalItems = type === 'municipality' ? 290 : initialItems.length;

  return (
    <div className={cn(
      "bg-black-2 rounded-level-2 p-8",
      className
    )}>
      <div className="flex items-center justify-between mb-8">
        <Text variant="h3">{title}</Text>
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center",
          type === 'municipality' ? "bg-[#FDE7CE]" : "bg-[#D4E7F7]"
        )}>
          {type === 'municipality' ? (
            <TreePine className="w-5 h-5 text-black" />
          ) : (
            <Building2 className="w-5 h-5 text-black" />
          )}
        </div>
      </div>

      <div className="space-y-6">
        {initialItems.map((item, index) => (
          <div
            key={item.id || index}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-6">
              <span className={cn(
                "text-5xl font-light",
                type === 'municipality' ? "text-orange-2" : "text-blue-2"
              )}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-lg">{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-grey">Utsläppsförändring</span>
              <span className={cn(
                "text-lg",
                item.value > 0 ? "text-pink-3" : "text-green-3"
              )}>
                {item.value > 0 ? "+" : ""}
                {item.displayValue || item.value.toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}