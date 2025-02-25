import { Accordion } from "@/components/ui/accordion";
import { AccordionGroup } from "../components/layout/AccordionGroup";
import { LinkButton } from "@/components/layout/LinkButton";
import { PageHeader } from "@/components/layout/PageHeader";
import { useTranslation } from "react-i18next";

export function MethodsPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-[1200px] mx-auto space-y-20">
      <PageHeader
        title={t("methodsPage.header.title")}
        description={t("methodsPage.header.description")}
      />
      <Accordion type="single" collapsible className="space-y-6">
        {/* Main Content */}
        <AccordionGroup title={t("methodsPage.accordion.parisAgreement.title")}>
          <div className="prose prose-invert w-[90%] max-w-5xl mx-auto space-y-4">
            <p>{t("methodsPage.accordion.parisAgreement.paragraph1")}</p>
            <p>{t("methodsPage.accordion.parisAgreement.paragraph2")}</p>
            <p>{t("methodsPage.accordion.parisAgreement.paragraph3")}</p>
            <div className="space-y-6 max-w-3xl">
              <LinkButton
                title={t("methodsPage.accordion.parisAgreement.link.title")}
                text={t("methodsPage.accordion.parisAgreement.link.text")}
                link="https://www.naturvardsverket.se/parisavtalet"
              />
            </div>
          </div>
        </AccordionGroup>
        <AccordionGroup title={t("methodsPage.accordion.sources.title")}>
          <div className="prose prose-invert w-[90%] max-w-5xl mx-auto space-y-8">
            <p>{t("methodsPage.accordion.sources.paragraph1")}</p>
            <p>{t("methodsPage.accordion.sources.paragraph2")}</p>

            {/* Grid Layout for Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              {[
                {
                  title: t("methodsPage.accordion.sources.links.skr.title"),
                  text: t("methodsPage.accordion.sources.links.skr.text"),
                  link: "https://skr.se/skr/demokratiledningstyrning/valmaktfordelning/valresultatstyren/styrekommunereftervalet2022.69547.html",
                },
                {
                  title: t(
                    "methodsPage.accordion.sources.links.wikidata.title"
                  ),
                  text: t("methodsPage.accordion.sources.links.wikidata.text"),
                  link: "https://www.wikidata.org/wiki/Wikidata:Country_subdivision_task_force/Sweden/Municipalities",
                },
                {
                  title: t(
                    "methodsPage.accordion.sources.links.trafikanalys.title"
                  ),
                  text: t(
                    "methodsPage.accordion.sources.links.trafikanalys.text"
                  ),
                  link: "https://www.trafa.se/vagtrafik/fordon/",
                },
                {
                  title: t("methodsPage.accordion.sources.links.nvdb.title"),
                  text: t("methodsPage.accordion.sources.links.nvdb.text"),
                  link: "https://nvdb2012.trafikverket.se/SeTransportnatverket",
                },
                {
                  title: t("methodsPage.accordion.sources.links.sei.title"),
                  text: t("methodsPage.accordion.sources.links.sei.text"),
                  link: "https://www.sei.org/tools/konsumtionskompassen/",
                },
                {
                  title: t(
                    "methodsPage.accordion.sources.links.powerCircles.title"
                  ),
                  text: t(
                    "methodsPage.accordion.sources.links.powerCircles.text"
                  ),
                  link: "https://powercircle.org/elbilsstatistik/",
                },
                {
                  title: t(
                    "methodsPage.accordion.sources.links.klimatplaner.title"
                  ),
                  text: t(
                    "methodsPage.accordion.sources.links.klimatplaner.text"
                  ),
                  link: "https://docs.google.com/spreadsheets/d/13CMqmfdd6QUD6agKFyVhwZUol4PKzvy253_EwtsFyvw/edit#gid=0",
                },
                {
                  title: t(
                    "methodsPage.accordion.sources.links.upphandlingsmyndigheten.title"
                  ),
                  text: t(
                    "methodsPage.accordion.sources.links.upphandlingsmyndigheten.text"
                  ),
                  link: "https://www.klimatkollen.se/data/procurements/NUE2022_DATA_2023-12-20.xlsx",
                },
                {
                  title: t(
                    "methodsPage.accordion.sources.links.greenpeace.title"
                  ),
                  text: t(
                    "methodsPage.accordion.sources.links.greenpeace.text"
                  ),
                  link: "https://docs.google.com/spreadsheets/d/1EdHUa49HJZn0rXqM-6tChdim4TJzXnwA/edit#gid=1040317160",
                },
              ].map((item) => (
                <LinkButton key={item.title} {...item} />
              ))}
            </div>
          </div>
        </AccordionGroup>
        <AccordionGroup title={t("methodsPage.accordion.co2Budgets.title")}>
          <div className="prose prose-invert w-[90%] max-w-5xl mx-auto space-y-8">
            <p>{t("methodsPage.accordion.co2Budgets.paragraph1")}</p>
            <p>{t("methodsPage.accordion.co2Budgets.paragraph2")}</p>
            <p>{t("methodsPage.accordion.co2Budgets.paragraph3")}</p>
            <p>{t("methodsPage.accordion.co2Budgets.paragraph4")}</p>
            <p>{t("methodsPage.accordion.co2Budgets.paragraph5")}</p>
            <p>{t("methodsPage.accordion.co2Budgets.paragraph6")}</p>
            <p>{t("methodsPage.accordion.co2Budgets.paragraph7")}</p>
            <p>{t("methodsPage.accordion.co2Budgets.paragraph8")}</p>
          </div>
        </AccordionGroup>
        <AccordionGroup title={t("methodsPage.accordion.emissionTypes.title")}>
          <div className="prose prose-invert w-[90%] max-w-5xl mx-auto space-y-8">
            <p>{t("methodsPage.accordion.emissionTypes.paragraph1")}</p>
            <p>{t("methodsPage.accordion.emissionTypes.paragraph2")}</p>
            <p>{t("methodsPage.accordion.emissionTypes.paragraph3")}</p>
            <p>{t("methodsPage.accordion.emissionTypes.paragraph4")}</p>
            <p>{t("methodsPage.accordion.emissionTypes.paragraph5")}</p>
            <p>{t("methodsPage.accordion.emissionTypes.paragraph6")}</p>
          </div>
        </AccordionGroup>
      </Accordion>
    </div>
  );
}
