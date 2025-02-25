import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import MailchimpSubscribe from "react-mailchimp-subscribe";

interface NewsletterPopoverProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  buttonText: string;
}

export function NewsletterPopover({
  isOpen,
  setIsOpen,
  buttonText,
}: NewsletterPopoverProps) {
  const [email, setEmail] = useState("");

  const MAILCHIMP_URL = import.meta.env.VITE_MAILCHIMP_URL || "https://";

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button className="bg-blue-5 text-white px-4 py-2 rounded-lg hover:bg-blue-6 transition">
          {buttonText}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="relative w-80 p-6 text-center bg-black-2 rounded-lg">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-grey hover:text-white transition"
          aria-label="Stäng"
          onClick={() => setIsOpen(false)}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Newsletter Content */}
        <h2 className="text-2xl mb-4">Prenumerera på vårt nyhetsbrev</h2>
        <p className="text-grey mb-6">
          Med vårt nyhetsbrev får du uppdateringar om hur det går med
          utsläppen och omställningen direkt i din mejl.
        </p>

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
                placeholder="Din e-postadress"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded text-black bg-white"
                required
              />
              <Button className="bg-blue-5 text-white w-full" type="submit">
                Prenumerera
              </Button>
            </form>
          )}
        />

        <p className="text-xs text-grey mt-2">
          När du lämnat dina uppgifter kommer de att behandlas av Klimatbyrån
          ideell förening som står bakom Klimatkollen. Du har rätt till
          information om hur{" "}
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            dina personuppgifter behandlas.
          </a>
        </p>
      </PopoverContent>
    </Popover>
  );
}