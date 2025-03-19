import React from "react";
import { RankedCompany } from "@/hooks/useCompanies";
import SectorEmissionsChart from "@/components/companies/list/SectorEmissionsChart";
import { CompanySector } from "@/hooks/useCompanyFilters";
import { SECTOR_NAMES } from "@/hooks/useCompanyFilters";

interface SectorGraphsProps {
  companies: RankedCompany[];
  selectedSectors?: CompanySector[];
}

const SectorGraphs: React.FC<SectorGraphsProps> = ({
  companies,
  selectedSectors = [],
}) => {
  // Convert selectedSectors to string[] for SectorEmissionsChart
  const sectorCodes = selectedSectors.filter((sector) => sector !== "all");

  return (
    <div className="bg-black">
      <div className="bg-black-2 rounded-lg border p-6">
        <SectorEmissionsChart
          companies={companies}
          selectedSectors={
            sectorCodes.length > 0
              ? sectorCodes
              : Object.keys(SECTOR_NAMES).filter((key) => key !== "all")
          }
        />
      </div>
    </div>
  );
};

export default SectorGraphs;
