import { CategoryEnum } from "../blog/blogPostsList";

export const reports = [
  {
    id: 1,
    title: "Klimatrapport 2023",
    slug: "klimatrapport-2023",
    date: "2023-12-15",
    excerpt: "En omfattande analys av klimatförändringar i Sverige under 2023.",
    readTime: "8 min",
    category: CategoryEnum.Yearly_Report,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    author: {
      name: "Alexandra Palmquist",
      avatar: "/people/alex.jpg",
    },
    pdfUrl: "/reports/klimatrapport-2023.pdf",
    coverImage: "/images/reports/climate-report-2023.jpg",
    language: "sv", // This report is only available in Swedish
  },
  {
    id: 2,
    title: "Climate Report 2023",
    slug: "climate-report-2023",
    date: "2023-12-15",
    excerpt:
      "A comprehensive analysis of climate change in Sweden during 2023.",
    readTime: "8 min",
    category: CategoryEnum.Yearly_Report,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    author: {
      name: "Alexandra Palmquist",
      avatar: "/people/alex.jpg",
    },
    pdfUrl: "/reports/climate-report-2023.pdf",
    coverImage: "/images/reports/climate-report-2023.jpg",
    language: "en", // This report is only available in English
  },
];
