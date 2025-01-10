<script>
  const baseURL = import.meta.env.DEV
    ? 'http://localhost:3000'
    : 'https://klimatkollen.se'

  const navItems = [
    {
      href: `https://www.klimatkollen.se/kallor-och-metod`,
      label: 'Källor och metod',
    },
    { href: `https://www.klimatkollen.se/om-oss`, label: 'Om oss' },
    { href: `https://klimatkollen.teamtailor.com/`, label: 'Jobb' },
    { href: `https://www.klimatkollen.se/in-english`, label: 'In English' },
  ]
</script>

<header
  class="bg-black h-18 top-0 mb-1.5 w-full flex-shrink-0 pb-1.5 opacity-100 relative z-[2]"
>
  <div class="relative flex h-12 items-center justify-between px-4">
    <div
      class="absolute left-1/2 top-1/2 z-[10] flex h-8 -translate-x-1/2 -translate-y-1/2"
    >
      <a
        href="https://klimatkollen.se"
        class="flex items-center"
        aria-label="Go to Klimatkollen homepage"
      >
        <img
          src="/klimatkollen_logo.svg"
          alt="Klimatkollen logga"
          width="150"
          class="pt-1"
        />
      </a>
    </div>
    <nav class="ml-auto hidden lg:flex h-[2rem] items-center gap-6">
      {#each navItems as item}
        <a
          href={item.href}
          class="relative text-white after:content-[''] after:block after:h-[2px] after:bg-white after:absolute after:left-0 after:bottom-[-2px] after:w-full after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
        >
          {item.label}
        </a>
      {/each}
    </nav>
  </div>
</header>
