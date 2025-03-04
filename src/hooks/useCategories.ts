import {
  Building2,
  Package,
  Factory,
  Truck,
  Trash2,
  Bus,
  Car,
  Box,
  TrendingDown,
  Wrench,
  Recycle,
  Home,
  Search,
  Layers
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Layer } from "recharts";

export const useCategoryMetadata = () => {
  const { t } = useTranslation();

  const categoryMetadata: Record<number, {
    icon: LucideIcon;
    color: string;
    name: string;
    description: string;
  }> = {
    1: {
      icon: Package,
      color: "var(--blue-2)",
      name: t("companies.categories.1.name", "Inköpta varor och tjänster"),
      description: t("companies.categories.1.description", "Utsläpp från produktion av varor och tjänster som köps av organisationen."),
    },
    2: {
      icon: Building2,
      color: "var(--orange-2)",
      name: t("companies.categories.2.name", "Kapitalvaror"),
      description: t("companies.categories.2.description", "Utsläpp från produktion av kapitalvaror som köps av organisationen."),
    },
    3: {
      icon: Factory,
      color: "var(--pink-2)",
      name: t("companies.categories.3.name", "Bränsle- och energirelaterade aktiviteter"),
      description: t("companies.categories.3.description", "Utsläpp från produktion av bränslen och energi som köps av organisationen, inklusive transport och distribution, som inte inkluderas i scope 2."),
    },
    4: {
      icon: Truck,
      color: "var(--green-4)",
      name: t("companies.categories.4.name", "Uppströms transport och distribution"),
      description: t("companies.categories.4.description", "Utsläpp från transport och distribution av inköpta varor mellan leverantörer och/eller inom organisationen."),
    },
    5: {
      icon: Trash2,
      color: "var(--blue-3)",
      name: t("companies.categories.5.name", "Avfall genererat i verksamheten"),
      description: t("companies.categories.5.description", "Utsläpp från behandling av avfall som genereras av organisationen."),
    },
    6: {
      icon: Bus,
      color: "var(--orange-3)",
      name: t("companies.categories.6.name", "Tjänsteresor"),
      description: t("companies.categories.6.description", "Utsläpp från resor i tjänsten med fordon som inte ägs av organisationen."),
    },
    7: {
      icon: Car,
      color: "var(--pink-3)",
      name: t("companies.categories.7.name", "Pendlingsresor"),
      description: t("companies.categories.7.description", "Utsläpp från anställdas resor mellan hemmet och arbetsplatsen."),
    },
    8: {
      icon: Box,
      color: "var(--green-3)",
      name: t("companies.categories.8.name", "Uppströms leasade tillgångar"),
      description: t("companies.categories.8.description", "Utsläpp från verksamhet i leasade tillgångar som inte inkluderas i scope 1 och 2."),
    },
    9: {
      icon: TrendingDown,
      color: "var(--blue-4)",
      name: t("companies.categories.9.name", "Nedströms transport och distribution"),
      description: t("companies.categories.9.description", "Utsläpp från transport och distribution av sålda varor mellan organisationen och kund."),
    },
    10: {
      icon: Wrench,
      color: "var(--orange-4)",
      name: t("companies.categories.10.name", "Bearbetning av sålda produkter"),
      description: t("companies.categories.10.description", "Utsläpp från vidareförädling av sålda insatsvaror."),
    },
    11: {
      icon: Factory,
      color: "var(--green-2)",
      name: t("companies.categories.11.name", "Användning av sålda produkter"),
      description: t("companies.categories.11.description", "Utsläpp från användning av sålda produkter av kunden."),
    },
    12: {
      icon: Recycle,
      color: "var(--pink-4)",
      name: t("companies.categories.12.name", "Slutbehandling av sålda produkter"),
      description: t("companies.categories.12.description", "Utsläpp från avfallshantering av sålda produkter vid slutet av livscykeln."),
    },
    13: {
      icon: Home,
      color: "var(--blue-1)",
      name: t("companies.categories.13.name", "Nedströms leasade tillgångar"),
      description: t("companies.categories.13.description", "Utsläpp från verksamhet i nedströms leasade tillgångar som inte inkluderas i scope 1 och 2."),
    },
    14: {
      icon: Building2,
      color: "var(--orange-1)",
      name: t("companies.categories.14.name", "Franchiser"),
      description: t("companies.categories.14.description", "Utsläpp från franchisetagares verksamhet som inte inkluderas i scope 1 och 2."),
    },
    15: {
      icon: Search,
      color: "var(--pink-1)",
      name: t("companies.categories.15.name", "Investeringar"),
      description: t("companies.categories.15.description", "Utsläpp från organisationens investeringar i andra företag, samt andra finansierade utsläpp."),
    },
    16: {
      icon: Layers,
      color: "var(--green-1)",
      name: t("companies.categories.16.name", "Övrigt"),
      description: t("companies.categories.16.description", "Utsläpp som inte är kopplade till de 15 Scope 3-kategorierna"),
    },
  };


  const getCategoryIcon = (id: number): LucideIcon => {
    return categoryMetadata[id]?.icon || Package;
  };

  const getCategoryColor = (id: number): string => {
    return categoryMetadata[id]?.color || "var(--blue-2)";
  };

  const getCategoryName = (id: number): string => {
    return categoryMetadata[id]?.name || t(`category.${id}.name`, `Kategori ${id}`);
  };

  const getCategoryDescription = (id: number): string => {
    return categoryMetadata[id]?.description || "";
  };

  return {
    categoryMetadata,
    getCategoryIcon,
    getCategoryColor,
    getCategoryName,
    getCategoryDescription,
    upstreamCategories: [1, 2, 3, 4, 5, 6, 7, 8],
    downstreamCategories: [9, 10, 11, 12, 13, 14, 15],
  };
};
