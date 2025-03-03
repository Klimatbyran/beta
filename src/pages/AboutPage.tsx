import { useState } from "react";
import { Text } from "@/components/ui/text";
import { Accordion } from "@/components/ui/accordion";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { useBoardMembers } from "@/hooks/useBoardMembers";
import { cn } from "@/lib/utils";
import { AccordionGroup } from "../components/layout/AccordionGroup";
import { LinkButton } from "@/components/layout/LinkButton";
import { PageHeader } from "@/components/layout/PageHeader";
import { useTranslation } from "react-i18next";

export function AboutPage() {
  const { t } = useTranslation();
  const [expandedTeamMember, setExpandedTeamMember] = useState<string | null>(
    null
  );
  const teamMembers = useTeamMembers();
  const boardMembers = useBoardMembers();

  return (
    <div className="max-w-[1200px] mx-auto space-y-20">
      <PageHeader
        title={t("aboutPage.header.title")}
        description={t("aboutPage.header.description")}
      />
      <Accordion type="single" collapsible className="space-y-6">
        {/* Main Content */}
        <AccordionGroup title={t("aboutPage.mainContent.title")}>
          <div className="prose prose-invert w-[90%] max-w-5xl mx-auto space-y-4">
            <p>{t("aboutPage.mainContent.paragraph1")}</p>
            <p>{t("aboutPage.mainContent.paragraph2")}</p>
            <p>{t("aboutPage.mainContent.paragraph3")}</p>
            <p>{t("aboutPage.mainContent.paragraph4")}</p>
          </div>
        </AccordionGroup>

        {/* Team Section */}
        <AccordionGroup title={t("aboutPage.teamSection.title")}>
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
        <AccordionGroup title={t("aboutPage.boardSection.title")}>
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
                {t("aboutPage.boardSection.links.stadgar")}{" "}
                <a
                  href="https://www.klimatkollen.se/stadgar.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white"
                >
                  {t("aboutPage.boardSection.links.stadgarLink")}
                </a>
                {", "}{" "}
                <a
                  href="https://www.klimatkollen.se/uppforandekod.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white"
                >
                  {t("aboutPage.boardSection.links.uppforandekodLink")}
                </a>{" "}
                {t("aboutPage.boardSection.links.and")}{" "}
                <a
                  href="https://www.klimatkollen.se/antikorruptionspolicy.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white"
                >
                  {t("aboutPage.boardSection.links.antikorruptionspolicyLink")}
                </a>{" "}
                .
              </p>
            </div>
          </div>
        </AccordionGroup>

        {/* Financing Section */}
        <AccordionGroup title={t("aboutPage.financingSection.title")}>
          <div className="prose prose-invert w-[90%] max-w-5xl mx-auto space-y-4">
            <p>{t("aboutPage.financingSection.paragraph1")}</p>
            <p>{t("aboutPage.financingSection.paragraph2")}</p>
            <p>{t("aboutPage.financingSection.paragraph3")}</p>
            <div className="bg-blue-5/30 rounded-level-2 p-6 mt-8 max-w-3xl">
              <Text variant="body">
                {t("aboutPage.financingSection.donate")}
              </Text>
              <Text className="text-grey">
                {t("aboutPage.financingSection.donateDescription")}
              </Text>
              <Text variant="body" className="text-blue-2 mt-2">
                {t("aboutPage.financingSection.bankgiro")}
              </Text>
            </div>
          </div>
        </AccordionGroup>

        {/* Previous Projects Section */}
        <AccordionGroup title={t("aboutPage.previousProjectsSection.title")}>
          <div className="prose prose-invert w-[90%] max-w-5xl mx-auto space-y-8">
            <div className="space-y-4">
              <Text variant="h4">
                {t("aboutPage.previousProjectsSection.kommunprojektetTitle")}
              </Text>
              <p>
                {t(
                  "aboutPage.previousProjectsSection.kommunprojektetDescription"
                )}
              </p>
            </div>

            <div className="space-y-4">
              <Text variant="h1">
                {t("aboutPage.previousProjectsSection.riksdagsvaletTitle")}
              </Text>
              <p>
                {t(
                  "aboutPage.previousProjectsSection.riksdagsvaletDescription"
                )}
              </p>
              <div className="space-y-6 max-w-3xl">
                <LinkButton
                  title={t("aboutPage.previousProjectsSection.klimatmalTitle")}
                  text={t("aboutPage.previousProjectsSection.klimatmalText")}
                  link="/insights/klimatmal"
                />
                <LinkButton
                  title={t(
                    "aboutPage.previousProjectsSection.utslappsberakningTitle"
                  )}
                  text={t(
                    "aboutPage.previousProjectsSection.utslappsberakningText"
                  )}
                  link="/insights/utslappsberakning"
                />
              </div>
            </div>
          </div>
        </AccordionGroup>
      </Accordion>
    </div>
  );
}
