import { useState } from 'react';
import { MunicipalityCard } from '@/components/municipalities/MunicipalityCard';
import { allMunicipalities, getMunicipalityId } from '@/lib/constants/regions';

function generateMunicipalityData(municipality: string) {
  return {
    id: getMunicipalityId(municipality),
    name: municipality,
    rank: `${Math.floor(Math.random() * 290) + 1}/290`,
    description: 'Ligger över riksgenomsnittet i några kategorier. Nulla vel nulla mollis, pulvinar lorem quis, volutpat elit.',
    targetDate: new Date(Date.now() + Math.random() * 157680000000).toLocaleDateString('sv-SE'),
    emissions: {
      historical: 800 + Math.random() * 400,
      current: 900 + Math.random() * 400,
      target: 200 + Math.random() * 200,
    },
    yearlyReduction: -3 + Math.random() * 6,
  };
}

export function MunicipalitiesPage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const municipalities = allMunicipalities.map(municipality => generateMunicipalityData(municipality));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-light">Kommunrapporter</h1>
        <p className="text-sm text-grey">
          Översikt över kommunernas klimatpåverkan och hållbarhetsarbete
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {municipalities.map(municipality => (
          <div key={municipality.id} className="transition-transform hover:scale-[1.02]">
            <MunicipalityCard {...municipality} />
          </div>
        ))}
      </div>
    </div>
  );
}