import { useParams, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { CalendarDays, Clock, ArrowLeft, Share2, Check } from "lucide-react";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import { BlogPostMeta, blogMetadata } from "../lib/blog/blogPostsList";
import { useTranslation } from "react-i18next";

// Import Markdown files
const markdownFiles = import.meta.glob("/src/lib/blog/posts/*.md", {
  as: "raw",
  eager: true,
});

export function BlogDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [blogPost, setBlogPost] = useState<{
    metadata: BlogPostMeta;
    content: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (!id) return;
    const filePath = `/src/lib/blog/posts/${id}.md`;
    const rawMarkdown = markdownFiles[filePath];

    if (!rawMarkdown) {
      console.error(`❌ Markdown file not found: ${filePath}`);
      setBlogPost(null);
      setLoading(false);
      return;
    }

    const extractedMetadata = extractMetadata(rawMarkdown);
    const metadata = blogMetadata.find((post) => post.id === id);

    if (!metadata) {
      console.error(`❌ Metadata not found for post: ${id}`);
      setBlogPost(null);
      setLoading(false);
      return;
    }

    setBlogPost({ metadata, content: extractedMetadata });
    setLoading(false);
  }, [id]);

  const extractMetadata = (rawMarkdown: string) => {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
    return rawMarkdown.replace(frontmatterRegex, "").trim();
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: blogPost?.metadata.title,
          text: t("blogDetailPage.shareText"),
          url: shareUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error("Error copying to clipboard:", error);
      }
    }
  };

  if (loading) return <div>{t("blogDetailPage.loading")}</div>;
  if (!blogPost) return <div>{t("blogDetailPage.postNotFound")}</div>;

  const relatedPosts = blogPost.metadata.relatedPosts
    ? blogPost.metadata.relatedPosts
        .map((relatedId) => blogMetadata.find((post) => post.id === relatedId))
        .filter(Boolean)
    : [];

  return (
    <div className="max-w-[1200px] mx-auto space-y-16">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" className="gap-2" asChild>
          <a href="/insights">
            <ArrowLeft className="w-4 h-4" />
            {t("blogDetailPage.back")}
          </a>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          onClick={handleShare}
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Share2 className="w-4 h-4" />
          )}
          {copied ? t("blogDetailPage.linkCopied") : t("blogDetailPage.share")}
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
            <span>
              {new Date(blogPost.metadata.date).toLocaleDateString("sv-SE")}
            </span>
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
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks, remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeKatex]}
          components={{
            img: ({ node, ...props }) => (
              <img
                {...props}
                className="w-2/3 mx-auto shadow-lg !rounded-lg !overflow-hidden"
              />
            ),
            a: ({ node, ...props }) => (
              <a
                {...props}
                target="_blank" // Opens link in a new tab
                rel="noopener noreferrer"
                className="underline hover:text-white"
              />
            ),
          }}
        >
          {blogPost.content}
        </ReactMarkdown>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="space-y-8">
          <Text variant="h3">{t("blogDetailPage.relatedArticles")}</Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map(
              (post) =>
                post && (
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
                          <span>
                            {new Date(post.date).toLocaleDateString("sv-SE")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-grey text-sm">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <Text
                        variant="h4"
                        className="group-hover:text-blue-2 transition-colors"
                      >
                        {post.title}
                      </Text>
                      <Text className="text-grey">{post.excerpt}</Text>
                    </div>
                  </Link>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
