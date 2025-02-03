import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Text } from "@/components/ui/text";
import { Accordion } from "@/components/ui/accordion";
import { teamMembers, boardMembers } from "@/lib/constants/about";
import { cn } from "@/lib/utils";
import { AccordionGroup } from "../components/layout/AccordionGroup";

export function AboutPage() {
  const [expandedTeamMember, setExpandedTeamMember] = useState<string | null>(
    null
  );

  return (
    <div className="max-w-[1200px] mx-auto space-y-20">
      {/* Hero Section */}
      <div className="space-y-8">
        <Text variant="display">Om oss</Text>
        <Text variant="body" className="text-grey max-w-3xl">
          Klimatkollen är en medborgarplattform som tillgängliggör klimatdata.
          Klicka på rubrikerna för att läsa mer.
        </Text>
      </div>
      <Accordion type="single" collapsible className="space-y-6">
        {/* Main Content */}
        <AccordionGroup title="Vad är Klimatkollen?">
          <div className="prose prose-invert w-[90%] max-w-5xl mx-auto space-y-4">
            <p>
              Klimatkollen är en medborgarplattform som hjälper medborgare,
              företag och organisationer att få koll på klimatomställningen,
              genom att samla in och visualisera klimatdata.
            </p>
            <p>
              Vi visar hur det går med utsläppen, jämfört med hur det borde gå,
              så att det blir begripligt för allmänheten, bidrar till en
              faktabaserad debatt och stärker opinionen för klimatåtgärder.
            </p>
            <p>
              Vår vision är att beslutsfattare i politik och näringsliv ska
              påverkas av en välinformerad och växande opinion till att
              genomföra åtgärder som sänker utsläppen i linje med Parisavtalet.
            </p>
          </div>
        </AccordionGroup>

        {/* Team Section */}
        <AccordionGroup title="Vårt team">
          <div className="bg-black-2 rounded-level-2 p-16 space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className={cn(
                    "bg-black-1 rounded-level-2 p-8 space-y-6 cursor-pointer transition-all",
                    expandedTeamMember === member.name ? "col-span-2" : ""
                  )}
                  onClick={() =>
                    setExpandedTeamMember(
                      expandedTeamMember === member.name ? null : member.name
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
                      <Text variant="body">{member.name}</Text>
                    </div>
                  </div>
                  {expandedTeamMember === member.name && (
                    <Text className="text-grey">{member.description}</Text>
                  )}
                </div>
              ))}
            </div>
          </div>
        </AccordionGroup>

        {/* Board Section */}
        <AccordionGroup title="Vår styrelse">
          <div className="bg-black-2 rounded-level-2 p-16 space-y-16">
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
                      <Text variant="body">{member.name}</Text>
                      <Text variant="body">{member.role}</Text>
                      <Text className="text-grey mt-4">
                        {member.description}
                      </Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-8 prose prose-invert">
              <p>
                Här hittar du våra{" "}
                <a
                  href="https://www.klimatkollen.se/stadgar.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  stadgar
                </a>
                {", "}{" "}
                <a
                  href="https://www.klimatkollen.se/uppforandekod.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  uppförandekod
                </a>{" "}
                och{" "}
                <a
                  href="https://www.klimatkollen.se/antikorruptionspolicy.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  antikorruptionspolicy
                </a>{" "}
                .
              </p>
            </div>
          </div>
        </AccordionGroup>

        {/* Financing Section */}
        <AccordionGroup title="Så finansieras vi">
          <div className="prose prose-invert w-[90%] max-w-5xl mx-auto space-y-4">
            <p>
              Under 2024 och 2025 får Klimatkollen finansiell uppbackning av
              Google.org som en av två svenska mottagare av{" "}
              <a
                href="https://impactchallenge.withgoogle.com/techforsocialgood-sv/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Google.org Impact Challenge: Tech for Social Good
              </a>
              .
            </p>
            <p>
              Under 2023 drevs Klimatkollen med stöd från{" "}
              <a
                href="https://www.mynewsdesk.com/se/klimatbyraan/pressreleases/klimatkollen-faar-stoed-av-postkodstiftelsen-och-rekryterar-toppnamn-3223979"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Postkodstiftelsen
              </a>
              . Uppstarten 2022 finansierades av Världsnaturfonden WWF,
              ClimateView, We Don't Have Time och Argand Partners.
            </p>
            <p>
              Mycket av arbetet är ideellt, därför välkomnar vi fler
              samarbetspartners och ekonomiskt stöd för att kunna skala upp!
            </p>
            <div className="bg-blue-5/30 rounded-level-2 p-6 mt-8 max-w-3xl">
              <Text variant="body">Skänk gärna en slant!</Text>
              <Text className="text-grey">
                Varje krona ger oss muskler att visa upp mer data.
              </Text>
              <Text variant="body" className="text-blue-2 mt-2">
                Bankgiro: 5793-3178
              </Text>
            </div>
          </div>
        </AccordionGroup>

        {/* Previous Projects Section */}
        <AccordionGroup title="Tidigare projekt">
          <div className="prose prose-invert w-[90%] max-w-5xl mx-auto space-y-8">
            <div className="space-y-4">
              <Text variant="h4">Kommunprojektet 2023</Text>
              <p>
                Under 2023 fick Klimatkollen stöd av{" "}
                <a
                  href="https://postkodstiftelsen.se/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Postkodstiftelsen
                </a>{" "}
                för att ta tempen på hur det går med klimatomställningen i
                kommunerna. I dag kan du se hur det går med koldioxidutsläppen.
                Nu visar vi även vad kommunerna gör för att minska dem.
              </p>
            </div>

            <div className="space-y-4">
              <Text variant="h1">Riksdagsvalet 2022</Text>
              <p>
                Inför riksdagsvalet 2022 ansvarade Klimatkollen för två unika
                projekt:
              </p>
              <div className="space-y-6 max-w-3xl">
                {/* TODO: Update this link once the content has been
                  modified/moved to the blog, original link
                  https://www.klimatkollen.se/partierna */}
                <a
                  href="#klimatmal"
                  className="block bg-black-1 rounded-level-2 p-6 hover:bg-black-1/80 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <Text variant="body">Klimatmål</Text>
                      <Text className="text-grey">
                        En analys av riksdagspartiernas
                      </Text>
                    </div>
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </a>
                <a
                  // TODO: Update this link once the content has been modified/moved to the blog, original link https://www.klimatkollen.se/utslappsberakningar
                  href="#utslapp"
                  className="block bg-black-1 rounded-level-2 p-6 hover:bg-black-1/80 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <Text variant="body">Utsläppsberäkning</Text>
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
        </AccordionGroup>
      </Accordion>
    </div>
  );
}
