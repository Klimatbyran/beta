import { CalendarDays, Clock, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Så kan företag halvera sina scope 3-utsläpp till 2030',
    excerpt: 'Ny forskning visar att företag kan uppnå betydande minskningar av sina scope 3-utsläpp genom att fokusera på fem nyckelområden.',
    date: '2024-03-15',
    readTime: '5 min',
    category: 'Analys',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
  },
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
];

export function InsightsPage() {
  return (
    <div className="max-w-[1200px] mx-auto space-y-16">
      {/* Hero Section */}
      <div className="space-y-4">
        <Text variant="display">Insikter</Text>
        <Text variant="large" className="text-grey max-w-2xl">
          Fördjupande analyser och rapporter om klimatomställningen i Sverige
        </Text>
      </div>

      {/* Featured Post */}
      <Link 
        to={`/insights/${blogPosts[0].id}`}
        className="group block"
      >
        <div className="relative h-[500px] rounded-level-1 overflow-hidden">
          <img
            src={blogPosts[0].image}
            alt={blogPosts[0].title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black-3 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-16 space-y-4">
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-blue-5/50 rounded-full text-blue-2 text-sm">
                {blogPosts[0].category}
              </span>
              <div className="flex items-center gap-2 text-grey text-sm">
                <CalendarDays className="w-4 h-4" />
                <span>{new Date(blogPosts[0].date).toLocaleDateString('sv-SE')}</span>
              </div>
              <div className="flex items-center gap-2 text-grey text-sm">
                <Clock className="w-4 h-4" />
                <span>{blogPosts[0].readTime}</span>
              </div>
            </div>
            <Text variant="h2" className="group-hover:text-blue-2 transition-colors">
              {blogPosts[0].title}
            </Text>
            <Text className="text-grey max-w-2xl">
              {blogPosts[0].excerpt}
            </Text>
          </div>
        </div>
      </Link>

      {/* Post Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogPosts.slice(1).map(post => (
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