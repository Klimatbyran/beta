import { CalendarDays, Clock, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Text } from "@/components/ui/text";
import { blogMetadata } from "../lib/blog/blogPostsList";
import { isMobile } from "react-device-detect";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { X } from "lucide-react";

// Component for blog metadata (category, date, read time)
function BlogMeta({
  category,
  date,
  readTime,
}: {
  category: string;
  date: string;
  readTime: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <span
        aria-label="Category"
        className="px-3 py-1 bg-blue-5/50 rounded-full text-blue-2 text-sm"
      >
        {category}
      </span>
      <div className="flex items-center gap-2 text-grey text-sm">
        <CalendarDays className="w-4 h-4" />
        <span aria-label="Date Published">
          {new Date(date).toLocaleDateString("sv-SE")}
        </span>
      </div>
      <div className="flex items-center gap-2 text-grey text-sm">
        <Clock className="w-4 h-4" />
        <span aria-label="Read Time">{readTime}</span>
      </div>
    </div>
  );
}

// Component for blog post cards
function BlogCard({ post }: { post: (typeof blogMetadata)[number] }) {
  return (
    <Link
      to={`/insights/${post.id}`}
      className="group bg-black-2 rounded-level-2 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(153,207,255,0.15)] hover:bg-[#1a1a1a]"
    >
      <div className="relative h-36 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-8 space-y-4">
        <BlogMeta
          category={post.category}
          date={post.date}
          readTime={post.readTime}
        />
        <Text
          variant="h4"
          className="group-hover:text-blue-2 transition-colors"
        >
          {post.title}
        </Text>
        <Text className="text-grey">{post.excerpt}</Text>
        <div className="flex items-center gap-2 text-blue-2 group-hover:gap-3 transition-all">
          <span aria-label="Click to read full article">Läs mer</span>
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}

export function InsightsPage() {
  const featuredPost = isMobile ? undefined : blogMetadata[0];
  const otherPosts = isMobile ? blogMetadata.slice(0) : blogMetadata.slice(1);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  return (
    <div className="max-w-[1200px] mx-auto space-y-16">
      <PageHeader
        title="Insikter"
        description="Fördjupande analyser och rapporter om klimatomställningen i Sverige"
      >
        {/* Newsletter Sign-Up Modal */}
        <Popover open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
          <PopoverTrigger asChild>
            <Button className="bg-blue-5 text-white px-4 py-2 rounded-lg hover:bg-blue-6 transition">
              Prenumerera på nyhetsbrev
            </Button>
          </PopoverTrigger>

          <PopoverContent className="relative w-80 p-6 text-center bg-black-2 rounded-lg">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-grey hover:text-white transition"
              aria-label="Stäng"
              onClick={() => setIsSignUpOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Newsletter Content */}
            <h2 className="text-2xl mb-4">Prenumerera på vårt nyhetsbrev</h2>
            <p className="text-grey mb-6">
              Med vårt nyhetsbrev får du uppdateringar om hur det går med
              utsläppen och omställningen direkt i din mejl.
            </p>
            <input
              type="email"
              placeholder="Din e-postadress"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <Button className="bg-blue-5 text-white w-full">Prenumerera</Button>
            <p className="text-xs text-grey mt-2">
              När du lämnat dina uppgifter kommer de att behandlas av
              Klimatbyrån ideell förening som står bakom Klimatkollen. Du har
              rätt till information om hur {" "}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                dina personuppgifter behandlas.
              </a>
            </p>
          </PopoverContent>
        </Popover>
      </PageHeader>

      {/* Featured Post */}
      {featuredPost && (
        <div className="relative rounded-level-1">
          <Link
            to={`/insights/${featuredPost.id}`}
            className="group block transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-level-1 shadow-[0_0_40px_rgba(153,207,255,0.15)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <div className="relative h-[500px] overflow-hidden rounded-level-1">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-16 space-y-4">
                <BlogMeta
                  category={featuredPost.category}
                  date={featuredPost.date}
                  readTime={featuredPost.readTime}
                />
                <Text
                  variant="h2"
                  className="group-hover:text-blue-2 transition-colors"
                >
                  {featuredPost.title}
                </Text>
                <Text className="text-grey max-w-2xl">
                  {featuredPost.excerpt}
                </Text>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Post Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {otherPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
