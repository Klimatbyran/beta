import { BarChart3, ChevronDown, Menu, X } from "lucide-react";
import { Link, useLocation, matchPath } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useState, useCallback } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

const NAV_LINKS = [
  {
    label: "Företag",
    icon: <BarChart3 className="w-4 h-4" aria-hidden="true" />,
    path: "/companies",
    sublinks: [
      { path: "/companies", label: "Alla företag", shortcut: "⌘F" },
      { path: "/companies?category=omx", label: "Large Cap (OMX)" },
      { path: "/companies?category=midcap", label: "Mid Cap" },
      { path: "/companies?category=sme", label: "Small Cap" },
      { path: "/companies/insights", label: "Insikter", shortcut: "⌘I" },
    ],
  },
  {
    label: "Kommuner",
    icon: <BarChart3 className="w-4 h-4" aria-hidden="true" />,
    path: "/municipalities",
    sublinks: [
      { path: "/municipalities", label: "Alla kommuner", shortcut: "⌘K" },
      { path: "/municipalities?sort=top", label: "Topplista" },
      { path: "/municipalities?sort=emissions", label: "Högst utsläpp" },
      { path: "/municipalities?sort=reduction", label: "Störst minskning" },
      { path: "/municipalities/insights", label: "Insikter", shortcut: "⌘I" },
    ],
  },
  { path: "/about", label: "Om oss" },
  { path: "/tools", label: "Vårt verktyg" },
  { path: "/insights", label: "Insikter" },
  { path: "/methodology", label: "Källor och metod" },
];

export function Header() {
  const location = useLocation();
  const { scrollDirection, scrollY } = useScrollDirection();
  const isMinimized = scrollDirection === "down" && scrollY > 100;
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isMinimized ? "h-8" : "h-12",
        isMinimized ? "bg-black-2/60" : "bg-black-2"
      )}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className={cn(
            "flex items-center gap-2 transition-all",
            isMinimized && "scale-75 -translate-x-4"
          )}
        >
          Klimatkollen
        </Link>

        <button
          className="md:hidden text-white"
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <nav className="hidden md:flex items-center gap-8">
          <Menubar className="border-none bg-transparent">
            {NAV_LINKS.map((item) =>
              item.sublinks ? (
                <MenubarMenu key={item.label}>
                  <MenubarTrigger
                    aria-expanded={location.pathname.startsWith(item.path)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-level-2 transition-colors",
                      location.pathname.startsWith(item.path)
                        ? "bg-black-1 text-white"
                        : "text-grey hover:text-white"
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    <ChevronDown className="w-4 h-4" aria-hidden="true" />
                  </MenubarTrigger>
                  <MenubarContent>
                    {item.sublinks.map((sublink) => (
                      <MenubarItem key={sublink.path}>
                        <Link
                          to={sublink.path}
                          className="flex items-center justify-between w-full"
                        >
                          {sublink.label}
                          {sublink.shortcut && (
                            <MenubarShortcut>
                              {sublink.shortcut}
                            </MenubarShortcut>
                          )}
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
                    "flex items-center gap-2 px-3 py-1.5 rounded-level-2 transition-colors text-sm",
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
          </Menubar>
        </nav>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 bg-black-2 w-full h-full z-100 flex justify-center mt-12 p-8">
          <div className="flex flex-col items-center gap-6 text-lg">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={toggleMenu}
                className="flex items-center gap-2"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
