import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Text } from "@/components/ui/text";

interface AccordionGroupProps {
  title: string;
  children: React.ReactNode;
  value: string;
}

export function AccordionGroup({
  title,
  children,
  value,
}: AccordionGroupProps) {
  return (
    <AccordionItem value={value} className="border-none">
      <AccordionTrigger className="bg-black-2 rounded-level-2 p-8 hover:no-underline hover:bg-black-1 data-[state=open]:bg-black-1">
        <Text variant="h4">{title}</Text>
      </AccordionTrigger>
      <AccordionContent className="p-8">{children}</AccordionContent>
    </AccordionItem>
  );
}
