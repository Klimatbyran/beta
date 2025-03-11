import { CategoryEnum } from "../blog/blogPostsList";

export const reports = [
  {
    id: 1,
    title: "Storföretagens Historiska Utsläpp",
    slug: "storföretagens-historiska-utsläpp",
    date: "2025-03-11",
    excerpt: "En analys av 150 bolags klimatredovisningar",
    readTime: "15 min",
    category: "Årlig rapport",
    author: {
      name: "Alexandra Palmquist",
      avatar: "/people/alex.jpg",
    },
    pdfUrl: "/reports/2025-03_StorfoeretagensHistoriskaUtslaepp.pdf",
    coverImage: "/images/reportImages/2024_report_sv2.png",
    language: "sv",
  },
  {
    id: 2,
    title: "Bolags Klimat Kollen",
    slug: "bolags-klimatkollen",
    date: "2024-06-01",
    excerpt: "En analys av 150 svenska storbolags klimatredovisning 2023",
    readTime: "15 min",
    category: "Årlig rapport",
    author: {
      name: "Alexandra Palmquist",
      avatar: "/people/alex.jpg",
    },
    pdfUrl: "/reports/2024-06-Bolagsklimatkollen.pdf",
    coverImage: "/images/reportImages/2023_bolagsklimatkollen2.png",
    language: "sv",
  },
  {
    id: 3,
    title: "Corporate Climate Checker",
    slug: "corporate-climate-checker",
    date: "2024-08-01",
    excerpt:
      "An analysis of 150 major Swedish companies' climate reporting 2023",
    readTime: "15 min",
    category: "Yearly Report",
    author: {
      name: "Alexandra Palmquist",
      avatar: "/people/alex.jpg",
    },
    pdfUrl: "/reports/2024-08_CorporateClimateChecker.pdf",
    coverImage: "/images/reportImages/2023_corportateclimatechecker2.png",
    language: "en",
  },
];
