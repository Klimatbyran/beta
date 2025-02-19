import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface DataViewSelectorProps {
  isMobile: boolean;
  dataView: "overview" | "scopes" | "categories";
  setDataView: (value: "overview" | "scopes" | "categories") => void;
  hasScope3Categories: boolean;
}

export function DataViewSelector({
  isMobile,
  dataView,
  setDataView,
  hasScope3Categories,
}: DataViewSelectorProps) {
  return (
    <div className="w-full max-w-xs">
      {!isMobile ? (
        <Tabs value={dataView} onValueChange={(value) => setDataView(value as any)}>
          <TabsList className="bg-black-1">
            <TabsTrigger value="overview">Översikt</TabsTrigger>
            <TabsTrigger value="scopes">Scope 1-3</TabsTrigger>
            <TabsTrigger value="categories" disabled={!hasScope3Categories}>
              Scope 3-kategorier
            </TabsTrigger>
          </TabsList>
        </Tabs>
      ) : (
        <Select value={dataView} onValueChange={(value) => setDataView(value as any)}>
          <SelectTrigger className="w-full bg-black-1 text-white border border-gray-600 px-3 py-2 rounded-md">
            <SelectValue placeholder="Välj visning" />
          </SelectTrigger>
          <SelectContent className="bg-black-1 text-white">
            <SelectItem value="overview">Översikt</SelectItem>
            <SelectItem value="scopes">Scope 1-3</SelectItem>
            <SelectItem value="categories" disabled={!hasScope3Categories}>
              Scope 3-kategorier
            </SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
}