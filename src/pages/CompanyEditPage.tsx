import { useParams } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import { useCompanyDetails } from '@/hooks/useCompanyDetails';
import { Text } from "@/components/ui/text";
import { CompanyEditHeader } from '@/components/companies/edit/CompanyEditHeader';
import { CompanyEditPeriod } from '@/components/companies/edit/CompanyEditPeriod';
import { CompanyEditScope1 } from '@/components/companies/edit/CompanyEditScope1';
import { CompanyEditScope2 } from '@/components/companies/edit/CompanyEditScope2';
import { CompanyEditScope3 } from '@/components/companies/edit/CompanyEditScope3';
import { CompanyDetails } from '@/types/company';
import { mapCompanyEditFormToRequestBody } from '@/lib/company-edit';
import { updateReportingPeriods } from '@/lib/api';
import { useToast } from '@/contexts/ToastContext';
import { useTranslation } from 'react-i18next';

export function CompanyEditPage() {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>();
  const { company, loading, error, refetch } = useCompanyDetails(id!);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [formData, setFormData] = useState<Map<string, string>>(new Map<string, string>());
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const { showToast } = useToast();
  
  const selectedPeriods = company !== undefined ? selectedYears.reduce((periods, year) => {
    const period =  [...company.reportingPeriods].find(
      (reportingPeriod) =>
        new Date(reportingPeriod.endDate).getFullYear().toString() ===
        year)
      if(period !== undefined) {
        periods.push(period);
      } 
      periods.sort((a, b) => b.endDate > a.endDate ? -1 : 1)
      return periods;
  }, [] as CompanyDetails["reportingPeriods"]) : [];

  if (loading || isUpdating) {
    return (
      <div className="animate-pulse space-y-16">
        <div className="h-12 w-1/3 bg-black-1 rounded" />
        <div className="h-96 bg-black-1 rounded-level-1" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-24">
        <Text variant="h3" className="text-red-500 mb-4">
          {t("companyEditPage.error.couldNotFetch")}
        </Text>
        <Text variant="muted">{t("companyEditPage.error.tryAgainLater")}</Text>
      </div>
    );
  }

  if (!company || !company.reportingPeriods.length) {
    return (
      <div className="text-center py-24">
        <Text variant="h3" className="text-red-500 mb-4">
          {t("companyEditPage.error.couldNotFind")}
        </Text>
        <Text variant="muted">
          {t("companyEditPage.error.checkId")}
        </Text>
      </div>
    );
  }

  const handleInputChange = async (name, value) => {
    setFormData(formData.set(name, value));    
  };

  const handleSubmit = async (event: React.FormEvent<SubmitEvent>) => {  
    setIsUpdating(true);  
    event.preventDefault();
    if(formRef.current !== null) {
      const inputs = formRef.current.querySelectorAll("input");
      for(const input of inputs) {
        if (input.value === input.defaultValue) continue

        if(input.type === "checkbox") {
          setFormData(formData.set(input.name, input.checked ? "true" : "false"));
        } else {
          setFormData(formData.set(input.name, input.value));
        }
      }
    }
    if(id !== undefined) {      
      await updateReportingPeriods(id, mapCompanyEditFormToRequestBody(selectedPeriods, formData));
      await refetch();
      setSelectedYears(selectedYears);
      setIsUpdating(false);
      showToast(t("companyEditPage.success.title"), t("companyEditPage.success.description"));
    }    
  };

  return (
    <div className="space-y-16 max-w-[1400px] mx-auto">
      <div className="bg-black-2 rounded-level-1 p-16">
      <CompanyEditHeader 
        company={company} 
        selectedYears={selectedYears}
        onYearsSelect={setSelectedYears}
      />
      {selectedPeriods !== null && selectedPeriods.length > 0 && (
        <form onSubmit={handleSubmit} ref={formRef}>
        <CompanyEditPeriod periods={selectedPeriods} onInputChange={handleInputChange}></CompanyEditPeriod>
        <CompanyEditScope1 periods={selectedPeriods} onInputChange={handleInputChange}></CompanyEditScope1>
        <CompanyEditScope2 periods={selectedPeriods} onInputChange={handleInputChange}></CompanyEditScope2>
        <CompanyEditScope3 periods={selectedPeriods} onInputChange={handleInputChange}></CompanyEditScope3>
        <button type="submit" className='inline-flex float-right mt-2 items-center justify-center text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:pointer-events-none hover:opacity-80 active:ring-1 active:ring-white disabled:opacity-50 h-10 bg-blue-5 text-white rounded-lg hover:bg-blue-6 transition px-4 py-1 font-medium'>
          {t("companyEditPage.save")}
        </button>
        </form>
      )}
      </div>
    </div>
  );
}