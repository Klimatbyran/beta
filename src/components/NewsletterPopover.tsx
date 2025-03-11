// FIXME ADD TRANSLATIONS

import { useState, useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { useTranslation } from "react-i18next";

interface NewsletterPopoverProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  buttonText: string;
}

export function NewsletterPopover({
  isOpen,
  onOpenChange,
  buttonText,
}: NewsletterPopoverProps) {
  const [email, setEmail] = useState("");
  const { t } = useTranslation();
  const MAILCHIMP_URL = import.meta.env.VITE_MAILCHIMP_URL || "https://";

  // Use the props if provided, otherwise use internal state
  const [open, setOpen] = useState(isOpen || false);

  // Update internal state when prop changes
  useEffect(() => {
    if (isOpen !== undefined) {
      setOpen(isOpen);
    }
  }, [isOpen]);

  // Notify parent component when state changes
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button className="bg-blue-5 text-white rounded-lg hover:bg-blue-6 transition px-4 py-1 font-medium">
          {buttonText}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="relative w-80 p-6 text-center bg-black-2 rounded-lg">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-grey hover:text-white transition"
          aria-label="Close"
          onClick={() => handleOpenChange(false)}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Newsletter Content */}
        <h2 className="text-2xl mb-4">{t("newsletter.subscribe")}</h2>
        <p className="text-grey mb-6">{t("newsletter.description")}</p>

        <MailchimpSubscribe
          url={MAILCHIMP_URL}
          render={({ subscribe }) => (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                subscribe({ EMAIL: email });
                setEmail(""); // Clears input after submission
              }}
              className="flex flex-col items-center"
            >
              <input
                type="email"
                placeholder={t("newsletter.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded text-black bg-white"
                required
              />
              <Button className="bg-blue-5 text-white w-full" type="submit">
                {t("newsletter.subscribeButton")}
              </Button>
            </form>
          )}
        />

        <p className="text-xs text-grey mt-2">
          {t("newsletter.privacyNotice")}{" "}
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            {t("newsletter.privacyLink")}{" "}
          </a>
        </p>
      </PopoverContent>
    </Popover>
  );
}
