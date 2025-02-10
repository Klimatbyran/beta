import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Text } from '@/components/ui/text'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

interface TeamMember {
  name: string
  role: string
  description: string
  imageUrl: string
}

const teamMembers: TeamMember[] = [
  {
    name: 'Ola Spännar',
    role: 'Medgrundare',
    description:
      'Opinionsbildare, medgrundare av Klimatkollen, tidigare kommunikationschef på Centerpartiet och kundansvarig på Forsman & Bodenfors.',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=300&fit=crop',
  },
  {
    name: 'Frida Berry Eklund',
    role: 'Medgrundare',
    description:
      'Klimatspecialist och medgrundare till Klimatkollen. Initiativtagare till Our Kids\' Climate och författare till boken "Prata med barn om klimatet" (Natur & Kultur). EU Climate Pact Ambassador och Climate Reality Leader.',
    imageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
  },
  {
    name: 'Elvira Boman',
    role: 'Tech Lead',
    description:
      'Tech lead och teknisk fysiker på Klimatkollen och Precisit. Lång erfarenhet av grön och cirkulär tech vid flera prisbelönta startups och del av ledarteamet på IT-konsultbyrån Precisit.',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
  },
  {
    name: 'Samuel Plumppu',
    role: 'Fullstackutvecklare',
    description:
      "Fullstackutvecklare med passion för open source och att skapa digitala lösningar som ger värde till människor och samhälle. Har tidigare arbetat med startups och ideella organisationer i tidiga skeden, bland annat på We Don't Have Time.",
    imageUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
  },
  {
    name: 'Alexandra Palmquist',
    role: 'Miljövetare',
    description:
      'Miljövetare med fokus på klimat och företagsdata. Tidigare erfarenhet från FN i Latinamerika, numera hemmastadd i Stockholms tech startup-scen för att driva klimatomställningen.',
    imageUrl:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop',
  },
  {
    name: 'Christian Landgren',
    role: 'Tech Advisor',
    description:
      'Prisbelönt utvecklare, digital entreprenör och en av Sveriges mest inflytelserika personer inom tech. Grundare av digitala innovationsbyrån Iteam och medgrundare av Öppna skolplattformen. Talare inom AI och digital innovation och rådgivare till regeringen.',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
  },
]

const boardMembers: TeamMember[] = [
  {
    name: 'Christian Landgren',
    role: 'Styrelseledamot',
    description:
      'Digital entreprenör och en av Sveriges mest inflytelserika personer inom tech. VD och grundare av Iteam och Öppna skolplattformen.',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
  },
  {
    name: 'Anna Loverus',
    role: 'Styrelseledamot',
    description:
      'Digital strateg och tidigare chef för sociala medier på Spotify och H&M. VD och grundare av Better Odds.',
    imageUrl:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop',
  },
  {
    name: 'Maria Soxbo',
    role: 'Styrelseledamot',
    description:
      'Journalist, författare, föreläsare och grundare av Klimatklubben. Utsedd till en av Sveriges 101 hållbarhetsmäktigaste 2021.',
    imageUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop',
  },
  {
    name: 'Carl-Johan Schultz',
    role: 'Styrelseledamot',
    description:
      'Hållbarhetsstrateg på Doings, tidigare planner på Forsman & Bodenfors, författare till boken "Hållbariseringen", Årets marknadsföringsbok 2022.',
    imageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
  },
]

export function AboutPage() {
  const [expandedTeamMember, setExpandedTeamMember] = useState<string | null>(
    null,
  )

  return (
    <div className="max-w-[1200px] mx-auto space-y-24">
      {/* Hero Section */}
      <div className="space-y-8">
        <Text variant="display">Om oss</Text>
        <Text variant="large" className="text-grey max-w-3xl">
          Klimatkollen är en medborgarplattform som tillgängliggör klimatdata.
          Klicka på rubrikerna för att läsa mer.
        </Text>
      </div>

      {/* Main Content */}
      <Accordion type="single" collapsible className="space-y-6">
        <AccordionItem value="what" className="border-none">
          <AccordionTrigger className="bg-black-2 rounded-level-2 p-8 hover:no-underline hover:bg-black-1 data-[state=open]:bg-black-1">
            <Text variant="h3">Vad är Klimatkollen?</Text>
          </AccordionTrigger>
          <AccordionContent className="p-8">
            <div className="prose prose-invert max-w-3xl space-y-4">
              <p>
                Klimatkollen är en medborgarplattform som hjälper medborgare,
                företag och organisationer att få koll på klimatomställningen,
                genom att samla in och visualisera klimatdata.
              </p>
              <p>
                Vi visar hur det går med utsläppen, jämfört med hur det borde
                gå, så att det blir begripligt för allmänheten, bidrar till en
                faktabaserad debatt och stärker opinionen för klimatåtgärder.
              </p>
              <p>
                Vår vision är att beslutsfattare i politik och näringsliv ska
                påverkas av en välinformerad och växande opinion till att
                genomföra åtgärder som sänker utsläppen i linje med
                Parisavtalet.
              </p>
            </div>
            <div className="mt-8">
              <a
                href="/partner"
                className="text-blue-2 hover:underline"
              >
                Bli vår partner
              </a>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Team Section */}
        <div className="bg-black-2 rounded-level-2 p-16 space-y-16">
          <Text variant="h3">Vårt team</Text>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className={cn(
                  'bg-black-1 rounded-level-2 p-8 space-y-6 cursor-pointer transition-all',
                  expandedTeamMember === member.name ? 'col-span-2' : '',
                )}
                onClick={() =>
                  setExpandedTeamMember(
                    expandedTeamMember === member.name ? null : member.name,
                  )
                }
              >
                <div className="flex items-start gap-6">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <Text variant="large">{member.name}</Text>
                    <Text variant="muted">{member.role}</Text>
                  </div>
                </div>
                {expandedTeamMember === member.name && (
                  <Text className="text-grey">{member.description}</Text>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Board Section */}
        <div className="bg-black-2 rounded-level-2 p-16 space-y-16">
          <Text variant="h3">Vår styrelse</Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {boardMembers.map((member) => (
              <div
                key={member.name}
                className="bg-black-1 rounded-level-2 p-8 space-y-6"
              >
                <div className="flex items-start gap-6">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <Text variant="large">{member.name}</Text>
                    <Text variant="muted">{member.role}</Text>
                    <Text className="text-grey mt-4">{member.description}</Text>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financing Section */}
        <AccordionItem value="financing" className="border-none">
          <AccordionTrigger className="bg-black-2 rounded-level-2 p-8 hover:no-underline hover:bg-black-1 data-[state=open]:bg-black-1">
            <Text variant="h3">Så finansieras vi</Text>
          </AccordionTrigger>
          <AccordionContent className="p-8">
            <div className="prose prose-invert max-w-3xl space-y-4">
              <p>
                Under 2024 och 2025 får Klimatkollen finansiell uppbackning av
                Google.org som en av två svenska mottagare av Google.org Impact
                Challenge: Tech for Social Good.
              </p>
              <p>
                Under 2023 drevs Klimatkollen med stöd från Postkodstiftelsen.
                Uppstarten 2022 finansierades av Världsnaturfonden WWF,
                ClimateView, We Don't Have Time och Argand Partners.
              </p>
              <p>
                Mycket av arbetet är ideellt, därför välkomnar vi fler
                samarbetspartners och ekonomiskt stöd för att kunna skala upp!
              </p>
              <div className="bg-blue-5/30 rounded-level-2 p-6 mt-8">
                <Text variant="large">Skänk gärna en slant!</Text>
                <Text className="text-grey">
                  Varje krona ger oss muskler att visa upp mer data.
                </Text>
                <Text variant="large" className="text-blue-2 mt-2">
                  Bankgiro: 5793-3178
                </Text>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Previous Projects Section */}
        <AccordionItem value="projects" className="border-none">
          <AccordionTrigger className="bg-black-2 rounded-level-2 p-8 hover:no-underline hover:bg-black-1 data-[state=open]:bg-black-1">
            <Text variant="h3">Tidigare projekt</Text>
          </AccordionTrigger>
          <AccordionContent className="p-8">
            <div className="prose prose-invert max-w-3xl space-y-8">
              <div className="space-y-4">
                <Text variant="h4">Kommunprojektet 2023</Text>
                <p>
                  Under 2023 fick Klimatkollen stöd av Postkodstiftelsen för att
                  ta tempen på hur det går med klimatomställningen i kommunerna.
                  I dag kan du se hur det går med koldioxidutsläppen. Nu visar
                  vi även vad kommunerna gör för att minska dem.
                </p>
              </div>

              <div className="space-y-4">
                <Text variant="h4">Riksdagsvalet 2022</Text>
                <p>
                  Inför riksdagsvalet 2022 ansvarade Klimatkollen för två unika
                  projekt:
                </p>
                <div className="space-y-6">
                  <a
                    href="#klimatmal"
                    className="block bg-black-1 rounded-level-2 p-6 hover:bg-black-1/80 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <Text variant="large">Klimatmål</Text>
                        <Text className="text-grey">
                          Analys av riksdagspartiernas klimatmål
                        </Text>
                      </div>
                      <ArrowUpRight className="w-6 h-6" />
                    </div>
                  </a>

                  <a
                    href="#utslapp"
                    className="block bg-black-1 rounded-level-2 p-6 hover:bg-black-1/80 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <Text variant="large">Utsläppsberäkning</Text>
                        <Text className="text-grey">
                          Beräkning av partiernas klimatåtgärder
                        </Text>
                      </div>
                      <ArrowUpRight className="w-6 h-6" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
