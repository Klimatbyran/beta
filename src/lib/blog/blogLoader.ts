import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { blogMetadata, BlogPostMeta } from "./blogPostsList";

const blogDir = path.join(process.cwd(), "src/content/blog");

export type BlogPostWithContent = BlogPostMeta & {
  content: string;
  relatedPosts?: BlogPostMeta[];
};

export function getAllBlogs(): BlogPostMeta[] {
  return blogMetadata;
}

export function getBlogBySlug(slug: string): BlogPostWithContent | null {
  const filePath = path.join(blogDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content: markdownContent } = matter(fileContent);

  // Find the blog post metadata by slug
  const metadata = blogMetadata.find((post) => post.id === slug);
  if (!metadata) return null;

  // Convert relatedPosts from string[] (IDs) to full BlogPostMeta[]
  const relatedPosts: BlogPostMeta[] = metadata.relatedPosts
    ? metadata.relatedPosts
        .map((id) => {
          const relatedPost = blogMetadata.find((post) => post.id === id);
          return relatedPost ?? null; // If post is not found, return null
        })
        .filter((post): post is BlogPostMeta => post !== null) // Type-safe filtering
    : [];
  console.log("BlogPost:", metadata);
  console.log("Original relatedPosts (IDs):", metadata.relatedPosts);
  console.log("Transformed relatedPosts (Objects):", relatedPosts);
  console.log("Type of relatedPosts:", typeof relatedPosts);
  return { ...metadata, content: markdownContent, relatedPosts };
}
