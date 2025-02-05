import { useParams } from "react-router-dom";
import { CalendarDays, Clock, ArrowLeft, Share2 } from "lucide-react";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getBlogBySlug } from "../lib/blog/blogLoader";
import { Link } from "react-router-dom";
import { BlogPostMeta } from "../lib/blog/blogPostsList";

export function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const blogPost = getBlogBySlug(id!);

  if (!blogPost) return <div>Post not found</div>;

  return (
    <div className="max-w-[1200px] mx-auto space-y-16">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" className="gap-2" asChild>
          <Link to="/insights">
            <ArrowLeft className="w-4 h-4" />
            Tillbaka
          </Link>
        </Button>
        <Button variant="ghost" size="sm" className="gap-2">
          <Share2 className="w-4 h-4" />
          Dela
        </Button>
      </div>

      {/* Hero Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 bg-blue-5/50 rounded-full text-blue-2 text-sm">
            {blogPost.category}
          </span>
          <div className="flex items-center gap-2 text-grey text-sm">
            <CalendarDays className="w-4 h-4" />
            <span>{new Date(blogPost.date).toLocaleDateString("sv-SE")}</span>
          </div>
          <div className="flex items-center gap-2 text-grey text-sm">
            <Clock className="w-4 h-4" />
            <span>{blogPost.readTime}</span>
          </div>
        </div>

        <Text variant="display">{blogPost.title}</Text>
        <Text variant="body" className="text-grey max-w-3xl">
          {blogPost.excerpt}
        </Text>
      </div>

      {/* Featured Image */}
      <div className="relative h-[500px] rounded-level-1 overflow-hidden">
        <img
          src={blogPost.image}
          alt={blogPost.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Author Section */}
      {blogPost.author && (
        <div className="flex items-center gap-4 p-8 bg-black-2 rounded-level-2">
          <img
            src={blogPost.author.avatar}
            alt={blogPost.author.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <Text variant="body">{blogPost.author.name}</Text>
          </div>
        </div>
      )}

      {/* Blog Content */}
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{blogPost.content}</ReactMarkdown>
      </div>

      {/* Related Posts Section */}
      {blogPost.relatedPosts && blogPost.relatedPosts.length > 0 && (
        <div className="space-y-8">
          <Text variant="h3">Relaterade artiklar</Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPost.relatedPosts.map((post: BlogPostMeta) => (
              <Link
                key={post.id}
                to={`/insights/${post.id}`}
                className="group bg-black-2 rounded-level-2 overflow-hidden transition-transform hover:scale-[1.02]"
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
                      <span>{new Date(post.date).toLocaleDateString("sv-SE")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-grey text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <Text variant="h4" className="group-hover:text-blue-2 transition-colors">
                    {post.title}
                  </Text>
                  <Text className="text-grey">{post.excerpt}</Text>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}