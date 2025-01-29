import { BarChart3, ChevronDown } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar'

export function Header() {
  const location = useLocation()
  const { scrollDirection, scrollY } = useScrollDirection()
  const isLandingPage = location.pathname === '/'
  const isMinimized = scrollDirection === 'down' && scrollY > 100

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        'bg-black-2/60 backdrop-blur-md',
        isMinimized ? 'h-8' : 'h-12',
      )}
    >
      <div className="container mx-auto px-4">
        <div
          className={cn(
            'flex items-center justify-between transition-all duration-300',
            isMinimized ? 'h-8' : 'h-12',
          )}
        >
          <Link
            to="/"
            className={cn(
              'flex items-center gap-2 transition-all duration-300',
              isMinimized && 'transform scale-75 -translate-x-4',
            )}
          >
            Klimatkollen
          </Link>

          <div
            className={cn(
              'flex items-center gap-8 transition-all duration-300',
              isMinimized && 'opacity-0 invisible',
            )}
          >
            <Menubar className="border-none bg-transparent">
              <MenubarMenu>
                <MenubarTrigger
                  className={cn(
                    'flex items-center gap-2 px-3 py-1.5 rounded-level-2 transition-colors data-[state=open]:bg-black-1',
                    location.pathname.startsWith('/companies')
                      ? 'bg-black-1 text-white'
                      : 'text-grey hover:text-white',
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
                    'flex items-center gap-2 px-3 py-1.5 rounded-level-2 transition-colors data-[state=open]:bg-black-1',
                    location.pathname.startsWith('/municipalities')
                      ? 'bg-black-1 text-white'
                      : 'text-grey hover:text-white',
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
    </header>
  )
}
