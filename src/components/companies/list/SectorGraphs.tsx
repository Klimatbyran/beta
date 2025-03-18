import { useState, useEffect, useRef } from "react";
import { BarChart3, Filter, Check } from "lucide-react";
import { SECTOR_NAMES } from "@/hooks/useCompanyFilters";
import SectorEmissionsChart from "@/components/companies/list/SectorEmissionsChart";
import {  RankedCompany } from "@/hooks/useCompanies";

function SectorGraphs({ companies }: { companies: RankedCompany[] }) {
    const [selectedSectors, setSelectedSectors] = useState<string[]>(["10", "15"]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
          setIsFilterOpen(false);
        }
      }
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    const toggleSector = (code: string) => {
      setSelectedSectors(prev => 
        prev.includes(code)
          ? prev.filter(s => s !== code)
          : [...prev, code]
      );
    };
  
    return (
      <div className="min-h-screen bg-black">
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-black-2 rounded-lg border p-6">
              <div className="mb-6 relative" ref={filterRef}>
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-black-2 border border-black-2 rounded-lg hover:bg-black-1 focus:outline-none focus:ring-2 focus:ring-orange-3"
                >
                  <Filter className="h-4 w-4 text-orange-3" />
                  <span className="text-sm font-medium text-grey">
                    Filter Sectors ({selectedSectors.length} selected)
                  </span>
                </button>
  
                {isFilterOpen && (
                  <div className="absolute z-10 mt-2 w-72 bg-black-2 border border-black-2 rounded-lg shadow-lg">
                    <div className="p-2 max-h-96 overflow-y-auto">
                      {Object.entries(SECTOR_NAMES).map(([code, name]) => (
                        <button
                          key={code}
                          onClick={() => toggleSector(code)}
                          className="flex items-center justify-between w-full px-4 py-2 text-sm text-left text-grey hover:bg-black-1 hover:text-white rounded-md"
                        >
                          <span>{name}</span>
                          {selectedSectors.includes(code) && (
                            <Check className="h-4 w-4 text-orange-3" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <SectorEmissionsChart
                companies={companies}
                selectedSectors={selectedSectors}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  export default SectorGraphs;