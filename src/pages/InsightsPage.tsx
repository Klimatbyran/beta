import { CalendarDays, Clock, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Text } from "@/components/ui/text";
import { blogMetadata } from "../lib/blog/blogPostsList";

export function InsightsPage() {
  return (
    <div className="max-w-[1200px] mx-auto space-y-16">
      {/* Hero Section */}
      <div className="space-y-4">
        <Text variant="display">Insikter</Text>
        <Text variant="body" className="text-grey max-w-2xl">
          Fördjupande analyser och rapporter om klimatomställningen i Sverige
        </Text>
      </div>

      {/* Featured Post */}
      <div className="relative rounded-level-1">
        <Link
          to={`/insights/${blogMetadata[0].id}`}
          className="group block transition-all duration-300"
        >
          {/* Custom Shadow Fix */}
          <div className="absolute inset-0 rounded-level-1 shadow-[0_0_40px_rgba(153,207,255,0.15)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

          {/* Image Wrapper */}
          <div className="relative h-[500px] overflow-hidden rounded-level-1">
            <img
              src={blogMetadata[0].image}
              alt={blogMetadata[0].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black-3 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-16 space-y-4">
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-blue-5/50 rounded-full text-blue-2 text-sm">
                  {blogMetadata[0].category}
                </span>
                <div className="flex items-center gap-2 text-grey text-sm">
                  <CalendarDays className="w-4 h-4" />
                  <span>
                    {new Date(blogMetadata[0].date).toLocaleDateString("sv-SE")}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-grey text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{blogMetadata[0].readTime}</span>
                </div>
              </div>
              <Text
                variant="h2"
                className="group-hover:text-blue-2 transition-colors"
              >
                {blogMetadata[0].title}
              </Text>
              <Text className="text-grey max-w-2xl">
                {blogMetadata[0].excerpt}
              </Text>
            </div>
          </div>
        </Link>
      </div>

      {/* Post Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogMetadata.slice(1).map((post) => (
          <Link
            key={post.id}
            to={`/insights/${post.id}`}
            className="group bg-black-2 rounded-level-2 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(153,207,255,0.15)] hover:bg-[#1a1a1a]"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-8 space-y-4">
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-blue-5/50 rounded-full text-blue-2 text-sm">
                  {post.category}
                </span>
                <div className="flex items-center gap-2 text-grey text-sm">
                  <CalendarDays className="w-4 h-4" />
                  <span>{new Date(post.date).toLocaleDateString('sv-SE')}</span>
                </div>
                <div className="flex items-center gap-2 text-grey text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <Text variant="h3" className="group-hover:text-blue-2 transition-colors">
                {post.title}
              </Text>
              <Text className="text-grey">
                {post.excerpt}
              </Text>
              <div className="flex items-center gap-2 text-blue-2 group-hover:gap-3 transition-all">
                <span>Läs mer</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}