import { BarChart3, ChevronDown, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

const NAV_LINKS = [
  {
    path: "/companies",
    label: "Företag",
    icon: <BarChart3 className="w-4 h-4" />,
    sublinks: [
      { path: "/companies", label: "Alla företag", shortcut: "⌘F" },
      { path: "/companies?category=omx", label: "Large Cap (OMX)" },
      { path: "/companies?category=midcap", label: "Mid Cap" },
      { path: "/companies?category=sme", label: "Small Cap" },
      { path: "/companies/insights", label: "Insikter", shortcut: "⌘I" },
    ],
  },
  {
    path: "/municipalities",
    label: "Kommuner",
    icon: <BarChart3 className="w-4 h-4" />,
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

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "bg-black-2/60 backdrop-blur-md",
        isMinimized ? "h-8" : "h-12"
      )}
    >
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-300",
            isMinimized ? "h-8" : "h-12"
          )}
        >
          <Link
            to="/"
            className={cn(
              "flex items-center gap-2 transition-all duration-300",
              isMinimized && "transform scale-75 -translate-x-4"
            )}
          >
            Klimatkollen
          </Link>

          <a
            className="md:hidden text-white cursor-pointer"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </a>

          <div className="hidden md:flex items-center gap-8">
            <Menubar className="border-none bg-transparent">
              <MenubarMenu>
                <MenubarTrigger
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-level-2 transition-colors data-[state=open]:bg-black-1",
                    location.pathname.startsWith("/companies")
                      ? "bg-black-1 text-white"
                      : "text-grey hover:text-white"
                  )}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Företag</span>
                  <ChevronDown className="w-4 h-4" />
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    <Link
                      to="/companies"
                      className="flex items-center justify-between w-full"
                    >
                      Alla företag
                      <MenubarShortcut>⌘F</MenubarShortcut>
                    </Link>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <Link
                      to="/companies?category=omx"
                      className="flex items-center justify-between w-full"
                    >
                      Large Cap (OMX)
                    </Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Link
                      to="/companies?category=midcap"
                      className="flex items-center justify-between w-full"
                    >
                      Mid Cap
                    </Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Link
                      to="/companies?category=sme"
                      className="flex items-center justify-between w-full"
                    >
                      Small Cap
                    </Link>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <Link
                      to="/companies/insights"
                      className="flex items-center justify-between w-full"
                    >
                      Insikter
                      <MenubarShortcut>⌘I</MenubarShortcut>
                    </Link>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-level-2 transition-colors data-[state=open]:bg-black-1",
                    location.pathname.startsWith("/municipalities")
                      ? "bg-black-1 text-white"
                      : "text-grey hover:text-white"
                  )}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Kommuner</span>
                  <ChevronDown className="w-4 h-4" />
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    <Link
                      to="/municipalities"
                      className="flex items-center justify-between w-full"
                    >
                      Alla kommuner
                      <MenubarShortcut>⌘K</MenubarShortcut>
                    </Link>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <Link
                      to="/municipalities?sort=top"
                      className="flex items-center justify-between w-full"
                    >
                      Topplista
                    </Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Link
                      to="/municipalities?sort=emissions"
                      className="flex items-center justify-between w-full"
                    >
                      Högst utsläpp
                    </Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Link
                      to="/municipalities?sort=reduction"
                      className="flex items-center justify-between w-full"
                    >
                      Störst minskning
                    </Link>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <Link
                      to="/municipalities/insights"
                      className="flex items-center justify-between w-full"
                    >
                      Insikter
                      <MenubarShortcut>⌘I</MenubarShortcut>
                    </Link>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>

            <div className="flex items-center gap-6 text-sm">
              <Link
                to="/about"
                className="text-grey hover:text-white transition-colors"
              >
                Om oss
              </Link>
              <Link
                to="/tools"
                className="text-grey hover:text-white transition-colors"
              >
                Vårt verktyg
              </Link>
              <Link
                to="/insights"
                className="text-grey hover:text-white transition-colors"
              >
                Insikter
              </Link>
              <Link
                to="/methodology"
                className="text-grey hover:text-white transition-colors"
              >
                Källor och metod
              </Link>
            </div>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen bg-black-2 z-400 flex flex-col text-white pt-12">
          <a
            className="absolute top-3 right-4 text-white"
            onClick={() => setMenuOpen(false)}
            aira-label="Close menu"
          >
            <X className="w-6 h-6" />
          </a>
          <div className="flex flex-col items-center gap-6 text-lg">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="mb-4 flex items-center gap-2"
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
