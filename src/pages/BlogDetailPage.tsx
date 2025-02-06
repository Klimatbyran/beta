import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { CalendarDays, Clock, ArrowLeft, Share2 } from "lucide-react";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BlogPostMeta, blogMetadata } from "../lib/blog/blogPostsList";

// Import Markdown files dynamically
const markdownFiles = import.meta.glob("/src/content/blog/*.md");

export function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [blogPost, setBlogPost] = useState<{ metadata: BlogPostMeta; content: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      if (!id) return;
      
      const filePath = `/src/content/blog/${id}.md`;

      // Check if the Markdown file exists
      if (!markdownFiles[filePath]) {
        setBlogPost(null);
        setLoading(false);
        return;
      }

      // Fetch and parse the Markdown file
      const module = await markdownFiles[filePath]();
      const content = (module as { default: string }).default; // Markdown content

      // Find metadata from blogMetadata
      const metadata = blogMetadata.find((post) => post.id === id);
      if (!metadata) {
        setBlogPost(null);
        setLoading(false);
        return;
      }

      setBlogPost({ metadata, content });
      setLoading(false);
    }

    fetchBlog();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!blogPost) return <div>Post not found</div>;

  // Get related posts metadata
  const relatedPosts = blogPost.metadata.relatedPosts
    ? blogPost.metadata.relatedPosts
        .map((relatedId) => blogMetadata.find((post) => post.id === relatedId))
        .filter((post): post is BlogPostMeta => post !== undefined) // Remove undefined values
    : [];

  return (
    <div className="max-w-[1200px] mx-auto space-y-16">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" className="gap-2" asChild>
          <a href="/insights">
            <ArrowLeft className="w-4 h-4" />
            Tillbaka
          </a>
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
            {blogPost.metadata.category}
          </span>
          <div className="flex items-center gap-2 text-grey text-sm">
            <CalendarDays className="w-4 h-4" />
            <span>{new Date(blogPost.metadata.date).toLocaleDateString("sv-SE")}</span>
          </div>
          <div className="flex items-center gap-2 text-grey text-sm">
            <Clock className="w-4 h-4" />
            <span>{blogPost.metadata.readTime}</span>
          </div>
        </div>

        <Text variant="display">{blogPost.metadata.title}</Text>
        <Text variant="body" className="text-grey max-w-3xl">
          {blogPost.metadata.excerpt}
        </Text>
      </div>

      {/* Featured Image */}
      <div className="relative h-[500px] rounded-level-1 overflow-hidden">
        <img
          src={blogPost.metadata.image}
          alt={blogPost.metadata.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Author Section */}
      {blogPost.metadata.author && (
        <div className="flex items-center gap-4 p-8 bg-black-2 rounded-level-2">
          <img
            src={blogPost.metadata.author.avatar}
            alt={blogPost.metadata.author.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <Text variant="body">{blogPost.metadata.author.name}</Text>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {blogPost.content}
        </ReactMarkdown>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="space-y-8">
          <Text variant="h3">Relaterade artiklar</Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map((post) => (
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
                  <Text className="text-grey">
                    {post.excerpt}
                  </Text>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}