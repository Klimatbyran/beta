import { Github, Linkedin, Twitter, Disc as Discord } from "lucide-react";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-black-2 py-12 md:py-24">
      <div className="container mx-auto px-4 space-y-8 md:space-y-16">
        {/* Contact Section */}
        <div className="space-y-2 md:space-y-4">
          <Text variant="muted" className="text-sm md:text-base">
            Kontakta oss
          </Text>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
            <Text variant="display" className="text-3xl md:text-5xl">
              hej@klimatkollen.se
            </Text>
            <Button
              variant="outline"
              size="sm"
              className="bg-black-1 border-none"
              onClick={() => {
                navigator.clipboard.writeText("hej@klimatkollen.se");
              }}
            >
              Kopiera mailadress
            </Button>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex gap-2 md:gap-4">
          <a
            href="https://github.com/klimatbyran"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 md:p-3 bg-black-1 rounded-full hover:bg-black-1/80 transition-colors"
          >
            <Github className="w-5 h-5 md:w-6 md:h-6" />
          </a>
          <a
            href="https://linkedin.com/company/klimatkollen"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 md:p-3 bg-black-1 rounded-full hover:bg-black-1/80 transition-colors"
          >
            <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
          </a>
          <a
            href="https://twitter.com/klimatkollen"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 md:p-3 bg-black-1 rounded-full hover:bg-black-1/80 transition-colors"
          >
            <Twitter className="w-5 h-5 md:w-6 md:h-6" />
          </a>
          <a
            href="https://discord.gg/klimatkollen"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 md:p-3 bg-black-1 rounded-full hover:bg-black-1/80 transition-colors"
          >
            <Discord className="w-5 h-5 md:w-6 md:h-6" />
          </a>
        </div>

        {/* Description */}
        <Text
          variant="muted"
          className="text-sm md:text-base max-w-full md:max-w-2xl"
        >
          Klimatkollen är en medborgarplattform som tillgängliggör klimatdata
          och är utvecklad med öppen källkod.
        </Text>

        {/* Legal Links */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-grey">
          <a href="/privacy" className="hover:text-white transition-colors">
            Privacy & Terms
          </a>
          <a href="/license" className="hover:text-white transition-colors">
            International license
          </a>
          <a href="/cc" className="hover:text-white transition-colors">
            CC BY-SA - Attribution-ShareAlike 4.0
          </a>
        </div>
      </div>
    </footer>
  );
}
