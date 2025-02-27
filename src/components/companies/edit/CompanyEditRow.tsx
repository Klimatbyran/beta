export interface CompanyEditRowProps {
  name: string;
  fields: JSX.Element[];
  noHover?: boolean;
  headerName?: boolean;
}

export function CompanyEditRow({fields, name, noHover, headerName}: CompanyEditRowProps) {
  return (
    <div className={`flex justify-between px-4 rounded-lg items-center
    ${noHover ? "" : "hover:bg-[#1F1F1F]"}`}>
      <h2 className={headerName ? "text-lg font-bold" : "text-md ps-2"}>{name}</h2>
      <div className="flex">
        {fields.map((field) => (
          field
        ))}
      </div>
    </div>
  );
}
