import { useParams } from 'react-router-dom'
import { CalendarDays, Clock, ArrowLeft, Share2 } from 'lucide-react'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const blogPost = {
  id: 'trend-calculations',
  title: 'Så beräknar vi trendlinjer för utsläpp',
  excerpt:
    'En djupdykning i hur vi analyserar och projicerar företags utsläppstrender med hänsyn till datakvalitet, scope 3-rapportering och Parisavtalets mål.',
  content: `
## Varför är trendberäkningar viktiga?

För att förstå om ett företag är på rätt väg i klimatomställningen räcker det inte att titta på enskilda år. Vi behöver analysera den långsiktiga trenden och jämföra den med vad som krävs enligt Parisavtalet. Men att beräkna trender för utsläppsdata är komplext av flera anledningar:

- Företag rapporterar olika mycket data och med varierande kvalitet
- Scope 3-utsläpp rapporteras inte alltid konsekvent
- Extrema värden eller outliers kan ge missvisande trender
- Linjära trender ger ofta orealistiska långsiktiga projektioner

## Vår metod för trendberäkning

För att hantera dessa utmaningar använder vi en kombination av flera metoder som anpassas efter datakvaliteten. Här är de viktigaste komponenterna:

### 1. Datakvalitetsbedömning

Först analyserar vi kvaliteten på tillgänglig data genom att titta på:

- Antal år med rapporterade utsläpp
- Konsistens i scope 3-rapportering
- Förekomst av extremvärden eller outliers
- Täckning av olika utsläppskategorier

### 2. Val av trendberäkningsmetod

Baserat på datakvaliteten väljer vi den mest lämpliga metoden:

- **Hög kvalitet:** Använder totala utsläpp (scope 1-3) med full viktning
- **Medium kvalitet:** Fokuserar på scope 1-2 med reducerad viktning av scope 3
- **Låg kvalitet:** Använder endast verifierade utsläpp med extra försiktighet

### 3. Progressiv reduktion av förändringstakt

En av de viktigaste innovationerna i vår metod är hur vi hanterar långsiktiga projektioner. Vi använder en modell med progressiv reduktion av förändringstakten:

- **År 1-5:** 100% av initial förändringstakt
- **År 5-10:** Linjär minskning till 70% av initial takt
- **År 10-15:** Ytterligare minskning till 50%
- **Efter år 15:** Exponentiell avtagning mot 30%

Detta ger mer realistiska projektioner som undviker extrema värden i långsiktiga prognoser, samtidigt som kortsiktiga trender respekteras.

## Hantering av särskilda fall

### 1. Inkonsekvent scope 3-rapportering

När ett företag rapporterar scope 3 oregelbundet använder vi flera tekniker:

- Interpolering mellan kända värden
- Viktad trend baserad på rapporterade år
- Tydlig markering av interpolerade värden

### 2. Nollrapportering till aktiv rapportering

När företag går från noll till aktiv rapportering:

- Identifierar första året med faktiska utsläpp som basår
- Exkluderar initiala nollår från trendberäkningen
- Markerar tydligt när rapporteringen började

### 3. Outliers och extremvärden

För att hantera extremvärden:

- Använder Median Absolute Deviation (MAD) för att identifiera outliers
- Justerar extrema värden mot mer troliga nivåer
- Behåller original data men med reducerad vikt i trendberäkningen

## Jämförelse med Parisavtalet

Parallellt med företagets trend visar vi alltid Parisavtalets målbana som kräver 7,6% minskning per år. Detta ger en tydlig referens för att bedöma om företagets utveckling är i linje med klimatmålen.

### Begränsningar och fortsatt utveckling

Vi är medvetna om metodens begränsningar:

- Kräver minst två års data för meningsfull analys
- Kan underskatta effekten av planerade åtgärder
- Tar inte hänsyn till branschspecifika utmaningar

Vi fortsätter att utveckla metoden baserat på ny forskning och feedback från användare och experter. Målet är att ge en så rättvisande bild som möjligt av företagens klimatomställning, samtidigt som vi är transparenta med osäkerheter och begränsningar.
  `,
  date: '2024-03-20',
  readTime: '8 min',
  category: 'Metodik',
  image:
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
  author: {
    name: 'Elvira Boman',
    role: 'Tech Lead',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop',
  },
  relatedPosts: [
    {
      id: '2',
      title: 'Så kan företag halvera sina scope 3-utsläpp till 2030',
      excerpt:
        'Ny forskning visar att företag kan uppnå betydande minskningar av sina scope 3-utsläpp genom att fokusera på fem nyckelområden.',
      date: '2024-03-15',
      readTime: '5 min',
      category: 'Analys',
      image:
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
    },
    {
      id: '3',
      title: 'Parisavtalet och näringslivet',
      excerpt:
        'Vad betyder Parisavtalets 1,5-gradersmål i praktiken för svenska företag? Vi reder ut begreppen.',
      date: '2024-03-05',
      readTime: '6 min',
      category: 'Guide',
      image:
        'https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?w=800&h=400&fit=crop',
    },
  ],
}

export function BlogDetailPage() {
  const { id } = useParams<{ id: string }>()

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
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {blogPost.content}
        </ReactMarkdown>
      </div>

      {/* Related Posts */}
      <div className="space-y-8">
        <Text variant="h3">Relaterade artiklar</Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPost.relatedPosts.map((post) => (
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
                    <span>
                      {new Date(post.date).toLocaleDateString('sv-SE')}
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
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
