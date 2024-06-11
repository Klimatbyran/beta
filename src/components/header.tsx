export function Header() {
  const navItems = [
    { href: 'https://www.klimatkollen.se/kallor-och-metod', label: 'Källor och metod' },
    { href: 'https://www.klimatkollen.se/om-oss', label: 'Om oss' },
    { href: 'https://klimatkollen.teamtailor.com/', label: 'Jobb' },
    { href: 'https://www.klimatkollen.se/in-english', label: 'In English' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-center md:justify-between">
        <div className="hidden md:flex flex-1 justify-center md:justify-center">
          <a className="flex items-center space-x-2" href="https://www.klimatkollen.se/">
            <img src='/klimatkollen_logo.svg' alt='Klimatkollen logga' width={150} />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center gap-4 text-sm lg:gap-6">
            {navItems.map(item => (
              <a key={item.href} className="transition-colors hover:text-foreground/80 text-foreground/60" href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
