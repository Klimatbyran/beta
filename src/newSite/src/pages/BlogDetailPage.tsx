import { useParams } from 'react-router-dom';
import { CalendarDays, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";

/**
 * MOCKED DATA TO REPLACE BEFORE LAUNCH:
 * 
 * 1. Blog Post Content:
 *    - Replace blogPost object with real content from CMS/API including:
 *      - Full article content (properly formatted HTML)
 *      - Author information
 *      - Publication date
 *      - Read time calculation
 *      - Categories
 *      - Featured images
 * 
 * 2. Related Posts:
 *    - Implement real related posts logic based on:
 *      - Same category
 *      - Similar topics
 *      - Publication date
 * 
 * 3. Author Data:
 *    - Add real author profiles including:
 *      - Name
 *      - Role/title
 *      - Avatar image
 *      - Bio
 */

// Mock blog post data - replace with real API data
const blogPost = {
  id: '1',
  title: 'Så kan företag halvera sina scope 3-utsläpp till 2030',
  excerpt: 'Ny forskning visar att företag kan uppnå betydande minskningar av sina scope 3-utsläpp genom att fokusera på fem nyckelområden.',
  content: `
    <h2>Fem nyckelområden för att minska scope 3-utsläpp</h2>
    <p>Scope 3-utsläpp utgör ofta den största delen av ett företags totala klimatpåverkan, men är samtidigt de svåraste att mäta och påverka. En ny studie från Climate Action 100+ visar dock att företag kan uppnå betydande minskningar genom att fokusera på fem nyckelområden:</p>
    
    <h3>1. Leverantörskedjan</h3>
    <p>Genom att ställa tydliga krav på leverantörer och hjälpa dem att minska sina utsläpp kan företag påverka en stor del av sina scope 3-utsläpp. Detta kan innebära att:</p>
    <ul>
      <li>Sätta upp klimatkrav i upphandlingar</li>
      <li>Erbjuda stöd och utbildning till leverantörer</li>
      <li>Samarbeta med andra företag i samma bransch</li>
    </ul>

    <h3>2. Produktdesign</h3>
    <p>Genom att designa produkter för längre livslängd, reparerbarhet och återvinning kan företag minska utsläppen i hela värdekedjan.</p>

    <h3>3. Affärsmodeller</h3>
    <p>Nya affärsmodeller som fokuserar på tjänster istället för produkter kan minska resursanvändning och utsläpp.</p>

    <h3>4. Digitalisering</h3>
    <p>Digitala lösningar kan effektivisera processer och minska behovet av fysiska transporter och möten.</p>

    <h3>5. Samarbeten</h3>
    <p>Branschöverskridande samarbeten och partnerskap är avgörande för att tackla scope 3-utsläpp.</p>
  `,
  date: '2024-03-15',
  readTime: '5 min',
  category: 'Analys',
  image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop',
  author: {
    name: 'Anna Karlsson',
    role: 'Klimatanalytiker',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop'
  },
  relatedPosts: [
    {
      id: '2',
      title: 'Kommunernas klimatarbete 2024',
      excerpt: 'Vi har analyserat hur Sveriges kommuner arbetar med klimatomställningen. Här är de viktigaste trenderna och slutsatserna.',
      date: '2024-03-10',
      readTime: '8 min',
      category: 'Rapport',
      image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=400&fit=crop',
    },
    {
      id: '3',
      title: 'Parisavtalet och näringslivet',
      excerpt: 'Vad betyder Parisavtalets 1,5-gradersmål i praktiken för svenska företag? Vi reder ut begreppen.',
      date: '2024-03-05',
      readTime: '6 min',
      category: 'Guide',
      image: 'https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?w=800&h=400&fit=crop',
    },
  ]
};

export function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();

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
            {blogPost.category}
          </span>
          <div className="flex items-center gap-2 text-grey text-sm">
            <CalendarDays className="w-4 h-4" />
            <span>{new Date(blogPost.date).toLocaleDateString('sv-SE')}</span>
          </div>
          <div className="flex items-center gap-2 text-grey text-sm">
            <Clock className="w-4 h-4" />
            <span>{blogPost.readTime}</span>
          </div>
        </div>

        <Text variant="display">{blogPost.title}</Text>
        <Text variant="large" className="text-grey max-w-3xl">
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

      {/* Author */}
      <div className="flex items-center gap-4 p-8 bg-black-2 rounded-level-2">
        <img
          src={blogPost.author.avatar}
          alt={blogPost.author.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <Text variant="large">{blogPost.author.name}</Text>
          <Text variant="muted">{blogPost.author.role}</Text>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
      </div>

      {/* Related Posts */}
      <div className="space-y-8">
        <Text variant="h3">Relaterade artiklar</Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPost.relatedPosts.map(post => (
            <a
              key={post.id}
              href={`/insights/${post.id}`}
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
                    <span>{new Date(post.date).toLocaleDateString('sv-SE')}</span>
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
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}