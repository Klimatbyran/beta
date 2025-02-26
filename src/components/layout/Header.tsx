import { BarChart3, ChevronDown, Menu, X } from "lucide-react";
import { Link, useLocation, matchPath } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState, useCallback } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { NewsletterPopover } from "../NewsletterPopover";

interface NavLink {
  label: string;
  icon?: JSX.Element;
  path: string;
  sublinks?: { label: string; path: string; shortcut?: string }[];
}

const NAV_LINKS: NavLink[] = [
  { label: "Företag", icon: <BarChart3 className="w-4 h-4" />, path: "/companies" },
  { label: "Kommuner", icon: <BarChart3 className="w-4 h-4" />, path: "/municipalities" },
  { path: "/about", label: "Om oss" },
  { path: "/insights", label: "Insikter" },
  { path: "/methodology", label: "Källor och metod" },
];

export function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black-2 h-14">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-base font-medium">
          Klimatkollen
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 ml-auto">
          <Menubar className="border-none bg-transparent h-full">
            {NAV_LINKS.map((item) =>
              item.sublinks ? (
                <MenubarMenu key={item.label}>
                  <MenubarTrigger
                    className={cn(
                      "flex items-center gap-2 px-3 py-3 h-full transition-all",
                      location.pathname.startsWith(item.path)
                        ? "bg-black-1 text-white"
                        : "text-grey hover:text-white"
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    <ChevronDown className="w-4 h-4" />
                  </MenubarTrigger>
                  <MenubarContent>
                    {item.sublinks.map((sublink) => (
                      <MenubarItem key={sublink.path}>
                        <Link to={sublink.path} className="flex justify-between w-full">
                          {sublink.label}
                          {sublink.shortcut && <MenubarShortcut>{sublink.shortcut}</MenubarShortcut>}
                        </Link>
                      </MenubarItem>
                    ))}
                  </MenubarContent>
                </MenubarMenu>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-3 py-3 h-full font-medium",
                    matchPath(item.path, location.pathname)
                      ? "bg-black-1 text-white"
                      : "text-grey hover:text-white"
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              )
            )}
            <div className="ml-4 h-full flex items-center">
              <NewsletterPopover isOpen={isSignUpOpen} setIsOpen={setIsSignUpOpen} buttonText="Nyhetsbrev" />
            </div>
          </Menubar>
        </nav>

        {/* Mobile Fullscreen Menu */}
        {menuOpen && (
          <div className="fixed inset-0 w-full h-full z-100 flex p-8 mt-12">
            <div className="flex flex-col gap-6 text-lg">
              {NAV_LINKS.map((link) => (
                <div key={link.path} className="flex flex-col">
                  <Link to={link.path} onClick={toggleMenu} className="flex items-center gap-2">
                    {link.icon}
                    {link.label}
                  </Link>
                  {link.sublinks && (
                    <div className="flex flex-col gap-2 pl-4 mt-2">
                      {link.sublinks.map((sublink) => (
                        <Link key={sublink.path} to={sublink.path} className="flex items-center gap-2 text-sm text-gray-400">
                          {sublink.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}