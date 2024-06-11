import React from 'react'

export function Header() {
  const navItems = [
    { href: 'https://www.klimatkollen.se/kallor-och-metod', label: 'Källor och metod' },
    { href: 'https://www.klimatkollen.se/om-oss', label: 'Om oss' },
    { href: 'https://klimatkollen.teamtailor.com/', label: 'Jobb' },
    { href: 'https://www.klimatkollen.se/in-english', label: 'In English' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container relative flex h-12 max-w-screen-2xl items-center justify-between">
        <div className="absolute inset-0 flex justify-center items-center">
          <a className="flex items-center space-x-2" href="https://www.klimatkollen.se/">
            <img src='/klimatkollen_logo.svg' alt='Klimatkollen logga' width={150} />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center gap-4 text-m lg:gap-5">
            {navItems.map(item => (
              <a key={item.href} className="text-white cursor-pointer hover:underline" href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
