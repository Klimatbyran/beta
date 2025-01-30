import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Text } from "@/components/ui/text";

interface AccordionGroupProps {
    title: string;
    children: React.ReactNode;
  }

export function AccordionGroup({title, children}: AccordionGroupProps) {
  return (
    <Accordion type="single" collapsible className="space-y-6">
      <AccordionItem value="what" className="border-none">
        <AccordionTrigger className="bg-black-2 rounded-level-2 p-8 hover:no-underline hover:bg-black-1 data-[state=open]:bg-black-1">
          <Text variant="h3">{title}</Text>
        </AccordionTrigger>
        <AccordionContent className="p-8">
            {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
