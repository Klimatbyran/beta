import React from 'react'

export function Header() {
  const navItems = [
    { href: 'https://www.klimatkollen.se/kallor-och-metod', label: 'Källor och metod' },
    { href: 'https://www.klimatkollen.se/om-oss', label: 'Om oss' },
    { href: 'https://klimatkollen.teamtailor.com/', label: 'Jobb' },
    { href: 'https://www.klimatkollen.se/in-english', label: 'In English' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-gray-300 bg-black bg-opacity-95 backdrop-blur supports-[backdrop-filter]:bg-opacity-60">
      <div className="container relative flex h-12 max-w-screen-2xl items-center justify-between">
        <div className="absolute left-0 flex items-center h-full pl-4 z-30">
          <a href="https://www.klimatkollen.se/foretag/utslappen/lista" className="text-white" title="Go back">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </a>
        </div>
        <div className="absolute inset-0 flex justify-center items-center z-20">
          <a className="flex items-center space-x-2" href="https://www.klimatkollen.se/">
            <img src="/klimatkollen_logo.svg" alt="Klimatkollen logga" width={150} />
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
