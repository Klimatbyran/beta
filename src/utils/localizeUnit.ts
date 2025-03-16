import { useLanguage } from "@/components/LanguageProvider";

export const localizeUnit = (unit: number) => {
    const { currentLanguage } = useLanguage();

    return unit.toLocaleString(
        currentLanguage === 'sv'
        ? 'sv-SE'
        : 'en-US',
        { minimumFractionDigits: 1, maximumFractionDigits: 1 }
    )
}