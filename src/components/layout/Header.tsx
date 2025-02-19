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
  },
  {
    label: "Kommuner",
    icon: <BarChart3 className="w-4 h-4" aria-hidden="true" />,
    path: "/municipalities",
  },
  { path: "/about", label: "Om oss" },
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
        isMinimized ? "h-9" : "h-10",
        isMinimized ? "bg-black-2/60" : "bg-black-2"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between py-0">
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

        <nav className={cn("hidden md:flex gap-8")}>
          <Menubar className="border-none bg-transparent">
            {NAV_LINKS.map((item) =>
              item.sublinks ? (
                <MenubarMenu key={item.label}>
                  <MenubarTrigger
                    aria-expanded={location.pathname.startsWith(item.path)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-4 transition-colors",
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
                    "flex items-center gap-2 p-3 transition-colors text-sm",
                    matchPath(item.path, location.pathname)
                      ? "bg-black-1 text-white"
                      : "text-grey hover:text-white",
                    isMinimized && "scale-75 -translate-x-4"
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
        <div className="fixed inset-0 bg-black-2 w-full h-full z-100 flex  mt-12 p-8">
          <div className="flex flex-col gap-6 text-lg">
            {NAV_LINKS.map((link) => (
              <div key={link.path} className="flex flex-col">
                <Link
                  to={link.path}
                  onClick={toggleMenu}
                  className="flex items-center gap-2"
                >
                  {link.icon}
                  {link.label}
                </Link>

                {link.sublinks && (
                  <div className="flex flex-col gap-2 pl-4 mt-2">
                    {link.sublinks.map((sublink) => (
                      <Link
                        key={sublink.path}
                        to={sublink.path}
                        className="flex items-center gap-2 text-sm text-gray-400"
                      >
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
    </header>
  );
}
