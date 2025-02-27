import { useTranslation } from "react-i18next";

interface BoardMember {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
}
export const useBoardMembers = () => {
  const { t } = useTranslation();

  const boardMembers: BoardMember[] = [
    {
      name: "Ola Spännar",
      role: t("board.ola.role"),
      description: t("board.ola.description"),
      imageUrl: "/people/ola.jpg",
    },
    {
      name: "Frida Berry Eklund",
      role: t("board.frida.role"),
      description: t("board.frida.description"),
      imageUrl: "/people/frida.jpg",
    },
    {
      name: "Christian Landgren",
      role: t("board.christian.role"),
      description: t("board.christian.description"),
      imageUrl: "/people/christian.jpg",
    },
    {
      name: "Anna Loverus",
      role: t("board.anna.role"),
      description: t("board.anna.description"),
      imageUrl: "/people/anna.jpg",
    },
    {
      name: "Maria Soxbo",
      role: t("board.maria.role"),
      description: t("board.maria.description"),
      imageUrl: "/people/maria.jpg",
    },
    {
      name: "Carl-Johan Schultz",
      role: t("board.carlJohan.role"),
      description: t("board.carlJohan.description"),
      imageUrl: "/people/carl-johan.jpg",
    },
  ];

  return boardMembers;
};
