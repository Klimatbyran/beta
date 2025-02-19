import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export function PageHeader({ title, description, children, className }: PageHeaderProps) {
  return (
    <div className={cn("sticky top-2 z-10 bg-black pt-6 pb-4 space-y-4", className)}>
      {/* Title & Description */}
      <div>
        <h1 className="text-3xl font-light">{title}</h1>
        {description && <p className="text-sm text-grey">{description}</p>}
      </div>

      {/* Children (Extra Components like Filters, Search, Buttons) */}
      {children && <div className="flex flex-wrap gap-3">{children}</div>}
    </div>
  );
}