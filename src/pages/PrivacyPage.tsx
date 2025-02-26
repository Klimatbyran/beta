import { Text } from "@/components/ui/text";
import { Accordion } from "@/components/ui/accordion";
import { AccordionGroup } from "../components/layout/AccordionGroup";
import { PageHeader } from "@/components/layout/PageHeader";

export function PrivacyPage() {
  return (
    <div className="max-w-[1200px] mx-auto space-y-8">
      <PageHeader
        title="Hur Klimatkollen behandlar personuppgifter"
        description="Senast publicerad: 2024-04-19"
      />
      <div className="bg-black-2 rounded-level-1 p-16 md:p-8 sm:p-4">
        <div className="flex flex-col md:flex-row items-start justify-between mb-12">
          <div className="space-y-4 w-full">
            <div className="flex flex-wrap items-center gap-4">
              <Text variant="h3" className="text-4xl md:text-3xl sm:text-2xl">
                Personuppgiftsansvar
              </Text>
            </div>
            <Text
              variant="body"
              className="text-lg md:text-base sm:text-sm max-w-3xl"
            >
              Klimatbyrån med organisationsnummer 802537-8814 är
              personuppgiftsansvarig när föreningens verksamheter behandlar
              personuppgifter.
            </Text>
            <div className="flex flex-wrap items-center gap-4">
              <Text variant="h3" className="text-4xl md:text-3xl sm:text-2xl">
                Vilka uppgifter behandlar vi?
              </Text>
            </div>
            <Text variant="body" className="text-lg md:text-base sm:text-sm">
              De personuppgifter vi samlar in är i första hand sådana som du
              själv uppger (namn, adress, mobilnummer etc.) när du exempelvis
              skriver upp dig för vårt nyhetsbrev eller blir medlem. Du kan
              också vara anställd hos en samarbetspartner eller annan kontakt
              till Klimatbyrån, då är personuppgifterna dina kontaktuppgifter i
              arbetet.
            </Text>
          </div>
        </div>
      </div>
      <Accordion type="single" collapsible className="space-y-6">
        {/* Main Content */}
        <AccordionGroup title="Varför behandlar vi personuppgifterna?">
          <div className="prose prose-invert w-[90%] max-w-5xl mx-auto space-y-4">
            <p>
              Vi behandlar uppgifterna för att kunna fullfölja de åtaganden som
              är kopplade till det syfte som uppges vid insamlingstillfället
              eller för samarbetet. I övrigt använder vi dina uppgifter endast
              för ändamål som rör Klimatbyråns egen verksamhet. Vi lämnar inte
              ut uppgifterna till tredje part.
            </p>
            <p>
              Klimatbyrån värnar om den personliga integriteten. Att hantera
              personuppgifter korrekt och säkert är en prioriterad fråga för
              oss. De som anförtror oss sina uppgifter ska vara trygga.
            </p>
            <p>
              Vi följer Dataskyddsförordningen och de andra lagar och regler som
              gäller på dataskyddsområdet. Du har alltid rätt att begära
              korrigering eller radering av dina personliga uppgifter.
            </p>
          </div>
        </AccordionGroup>
      </Accordion>
      <div className="bg-blue-5/30 rounded-level-2 p-6 mt-8">
        <Text variant="h4">Kontakt Oss</Text>
        <Text className="text-grey">
          Har du frågor eller önskemål kring hantering av dina personuppgifter,
          vänligen kontakta oss.
        </Text>
        <Text className="text-grey">
          If you have questions or requests about your personal data, please
          contact us.
        </Text>
        <Text variant="body" className="text-blue-2 mt-2">
        <a
                href="mailto:hej@klimatkollen.se"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                hej@klimatkollen.se
              </a>
        </Text>
      </div>
    </div>
  );
}
