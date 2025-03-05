import { useTranslation } from "react-i18next";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
}

export const useTeamMembers = () => {
  const { t } = useTranslation();

  const teamMembers: TeamMember[] = [
    {
      name: "Ola Spännar",
      role: t("team.ola.role"),
      description: t("team.ola.description"),
      imageUrl: "/people/ola.jpg",
    },
    {
      name: "Frida Berry Eklund",
      role: t("team.frida.role"),
      description: t("team.frida.description"),
      imageUrl: "/people/frida.jpg",
    },
    {
      name: "Elvira Boman",
      role: t("team.elvira.role"),
      description: t("team.elvira.description"),
      imageUrl: "/people/elvira.jpg",
    },
    {
      name: "Christian Landgren",
      role: t("team.christian.role"),
      description: t("team.christian.description"),
      imageUrl: "/people/christian.jpg",
    },
    {
      name: "Hugo Björk",
      role: t("team.hugo.role"),
      description: t("team.hugo.description"),
      imageUrl: "/people/hugo.jpeg",
    },
    {
      name: "Kayla Woodbury",
      role: t("team.kayla.role"),
      description: t("team.kayla.description"),
      imageUrl: "/people/placeholder-user.jpg",
    },
    {
      name: "Catharina Höglund",
      role: t("team.catharina.role"),
      description: t("team.catharina.description"),
      imageUrl: "/people/catharina.jpg",
    },
  ];

  return teamMembers;
};
