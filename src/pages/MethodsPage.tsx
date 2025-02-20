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
          <div className="prose prose-invert w-[90%] max-w-5xl mx-auto space-y-8">
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
                {
                  title: "Upphandlingsmyndigheten",
                  text: "Information om klimatkrav vid kommunernas upphandlingar",
                  link: "https://www.klimatkollen.se/data/procurements/NUE2022_DATA_2023-12-20.xlsx",
                },
                {
                  title: "Greenpeace.",
                  text: "Information om klimatkrav vid kommunernas upphandlingar",
                  link: "https://docs.google.com/spreadsheets/d/1EdHUa49HJZn0rXqM-6tChdim4TJzXnwA/edit#gid=1040317160",
                },
              ].map((item) => (
                <LinkButton key={item.title} {...item} />
              ))}
            </div>
          </div>
        </AccordionGroup>
        <AccordionGroup title="Om koldioxidbudgetar">
          <div className="prose prose-invert w-[90%] max-w-5xl mx-auto space-y-8">
            <p>
              En koldioxidbudget anger hur mycket koldioxid som kan släppas ut
              innan koldioxidhalten i atmosfären blir så hög att uppvärmningen
              överstiger Parisavtalets 1,5-gradersmål.
            </p>
            <p>
              Enligt en{" "}
              <a
                href="https://www.cemus.uu.se/wp-content/uploads/2023/12/Paris-compliant-carbon-budgets-for-Swedens-counties-.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                beräkning
              </a>{" "}
              av forskare vid Uppsala universitet och Tyndall Centre i
              Storbritannien, återstår globalt cirka 340 gigaton koldioxid från
              och med år 2024 för 50 procents chans att hålla uppvärmningen
              under 1,5 grader. Med dagens utsläppstakt tar den globala budgeten
              slut om cirka åtta år.
            </p>
            <p>
              Utifrån den globala budgeten har forskarna även gjort en beräkning
              av hur en nationel koldioxidbudget för en rättvis
              klimatomställning skulle se ut för Sverige.
            </p>
            <p>
              Beräkningen visar att från och med januari 2024 återstår ett
              nationellt utsläppsutrymme på 80 miljoner ton för att ligga i
              linje med 1,5 grader. För 83 procents chans att inte överskrida 2
              grader är budgeten 285 miljoner ton. Som jämförelse uppgick de
              totala växthusgasutsläppen för Sverige år 2022 till 45,2 miljoner
              ton.
            </p>
            <p>
              Med Sveriges nuvarande utsläppstakt återstår 1,8 år av
              1,5-gradersbudgeten, 6,4 år för 2 grader. För att vara i linje med
              1,5 grader skulle utsläppen i Sverige behöva minska med drygt 35
              procent från och med 2024, eller 13,5 procent för 2 grader.
            </p>
            <p>
              Klimatkollen har fördelat ut den nya nationella koldioxidbudgeten
              (80 miljoner ton, som även inkluderar utrikes flyg och sjöfart) på
              landets kommuner med samma fördelningsnyckel som använts för att
              bryta ner den globala budgeten nationellt.
            </p>
            <p>
              De lokala koldioxidbudgetarna gör det möjligt att jämföra hur det
              går med utsläppen med hur det borde gå. På Klimatkollen visas
              koldioxidbudgetar för kommunerna både med siffror och som
              utvecklingskurva över hur utsläppen behöver minska för att vara i
              linje med Parisavtalet.
            </p>
            <p>
              Förutom den så kallade Tyndall-modellen som Klimatkollen använder
              finns även andra sätt att beräkna en nationell koldioxidbudget, se
              exempelvis{" "}
              <a
                href="https://research.chalmers.se/publication/530543/file/530543_Fulltext.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                Chalmers här
              </a>{" "}
              .
            </p>
          </div>
        </AccordionGroup>
        <AccordionGroup title="Om olika typer av utsläpp">
          <div className="prose prose-invert w-[90%] max-w-5xl mx-auto space-y-8">
            <p>
              Klimatkollen är en oberoende faktaplattform som följer allmän och
              vedertagen standard för hur utsläpp redovisas. Den klimatdata vi
              visar speglar de avgränsningar som följer av hur koldioxidbudgeten
              är beräknad. Exempelvis går det inte att rakt av koppla
              koldioxidbudgetar till utsläpp av alla växthusgaser, där även
              metan, lustgas, vattenånga med flera inkluderas.
            </p>
            <p>
              Utsläpp från cementproduktion är exkluderat i IPCC:s globala
              koldioxidbudget och därmed även i koldioxidbudgeten för Sverige
              och i utsläppsstatistiken för de tre kommunerna Gotland, Skövde
              och Mörbylånga, där cementproduktion sker idag eller skett
              tidigare under perioden.
            </p>
            <p>
              Sverige har även hög klimatbelastning från varor vi importerar
              från andra länder och orsakar därför utsläpp i andra delar av
              världen. Dessa konsumtionsbaserade utsläpp inkluderas inte i
              koldioxidbudgeten.
            </p>
            <p>
              Inte heller utsläpp från skog och mark (så kallade biogena
              utsläpp) inkluderas i koldioxidbudgeten.
            </p>
            <p>
              Egentligen är alltså de klimatpåverkande utsläppen mycket större
              än de territoriella fossila koldioxidutsläpp som vanligtvis
              rapporteras av myndigheter och i media och som idag visas på
              Klimatkollen.
            </p>
            <p>
              Klimatkollen undersöker nu hur även andra växthusgasutsläpp skulle
              kunna visas på webbplatsen framöver, samtidigt som möjligheten att
              jämföra dagens utsläpp med koldioxidbudgetar behålls.
            </p>
          </div>
        </AccordionGroup>
      </Accordion>
    </div>
  );
}
