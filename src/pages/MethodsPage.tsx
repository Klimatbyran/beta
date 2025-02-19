import { Accordion } from "@/components/ui/accordion";
import { AccordionGroup } from "../components/layout/AccordionGroup";
import { LinkButton } from "@/components/layout/LinkButton";
import { PageHeader } from "@/components/layout/PageHeader";

export function MethodsPage() {
  return (
    <div className="max-w-[1200px] mx-auto space-y-20">
      <PageHeader
        title="Källor och Metod"
        description="Vår utgångspunkt är Parisavtalets 1,5-gradersmål och våra datakällor är offentliga. Klicka på rubrikerna för att läsa mer."
      />
      <Accordion type="single" collapsible className="space-y-6">
        {/* Main Content */}
        <AccordionGroup title="Klimatkollen utgår från Parisavtalet">
          <div className="prose prose-invert w-[90%] max-w-5xl mx-auto space-y-4">
            <p>
              Parisavtalet är ett internationellt bindande avtal mellan världens
              länder om att vidta åtgärder för att begränsa den globala
              uppvärmningen till väl under 2 grader, med sikte på 1,5 grader.
            </p>
            <p>
              För att nå målet måste världens länder halvera växthusgasutsläppen
              till 2030 jämfört med 1990 och nå nära noll utsläpp senast 2050. I
              dag{" "}
              <a
                href="https://www.iea.org/reports/co2-emissions-in-2023"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                ökar
              </a>{" "}
              fortfarande utsläppen globalt.
            </p>
            <p>
              Enligt Parisavtalet ska rika länder ta ett större ansvar, eftersom
              deras stora historiska utsläpp innebär att de redan använt mycket
              av det utsläppsutrymme som återstår för att hejda uppvärmningen.
              Bland dessa länder ingår Sverige, som både ska gå före med att
              minska utsläppen och även hjälpa andra mer sårbara länder att
              ställa om.
            </p>
            <div className="space-y-6 max-w-3xl">
              <LinkButton
                title="Parisavtalet"
                text="Läs mer om Parisavtalet på Naturvårdsverkets webbplats."
                link="https://www.naturvardsverket.se/parisavtalet"
              />
            </div>
          </div>
        </AccordionGroup>
        <AccordionGroup title="Om våra källor">
          <div className="prose prose-invert w-[90%] max-w-5xl mx-auto space-y-4">
            <p>
              Klimatkollen baseras på offentliga källor och verifierad data. Vi
              anger alla källor så att du enkelt kan kolla upp och läsa mer. Om
              något blivit fel, mejla oss gärna på hej@klimatkollen.se så att vi
              kan ändra.
            </p>
            <p>
              Företagsdata hämtas från bolagens egna årsredovisningar och
              hållbarhetsrapporter.
            </p>

            {/* Grid Layout for Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              {[
                {
                  title: "Sveriges Kommuner och Regioner",
                  text: "Uppgifter om politiskt styre i kommunerna hämtas",
                  link: "https://skr.se/skr/demokratiledningstyrning/valmaktfordelning/valresultatstyren/styrekommunereftervalet2022.69547.html",
                },
                {
                  title: "Wikidata",
                  text: "Hämtar vi kommunernas invånarantal och kommunvapen",
                  link: "https://www.wikidata.org/wiki/Wikidata:Country_subdivision_task_force/Sweden/Municipalities",
                },
                {
                  title: "Trafikanalys",
                  text: "Statistiken om andel laddbara bilar",
                  link: "https://www.trafa.se/vagtrafik/fordon/",
                },
                {
                  title: "Nationella vägdatabas",
                  text: "Cykelvägsdata tas från Trafikverket",
                  link: "https://nvdb2012.trafikverket.se/SeTransportnatverket",
                },
                {
                  title: "Stockholm Environment Institute",
                  text: "För hushållens konsumtionsbaserade utsläpp kommer data",
                  link: "https://www.sei.org/tools/konsumtionskompassen/",
                },
                {
                  title: "Power Circles databas ELIS",
                  text: "Uppgifter om laddinfrastrukturen kommer från branschorganisationen",
                  link: "https://powercircle.org/elbilsstatistik/",
                },
                {
                  title: "Klimatplaner",
                  text: "Har vi samlat in med hjälp av allmänheten och Klimatklubbens och Naturskyddsföreningens medlemmar",
                  link: "https://docs.google.com/spreadsheets/d/13CMqmfdd6QUD6agKFyVhwZUol4PKzvy253_EwtsFyvw/edit#gid=0",
                },
              ].map((item) => (
                <LinkButton key={item.title} {...item} />
              ))}
            </div>
          </div>
        </AccordionGroup>
      </Accordion>
    </div>
  );
}
