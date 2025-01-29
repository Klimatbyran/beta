<script>
  import { Hamburger } from 'svelte-hamburgers'
  let open = false

  const navItems = [
    { href: 'https://www.klimatkollen.se/om-oss', label: 'Om oss' },

    {
      href: 'https://www.klimatkollen.se/kallor-och-metod',
      label: 'Källor och metod',
    },
    { href: '/blog', label: 'Insikter' },
    { href: 'https://klimatkollen.teamtailor.com/', label: 'Jobb' },
    { href: 'https://www.klimatkollen.se/in-english', label: 'In English' },
  ]
</script>

<header
  class="bg-black h-18 top-0 mb-1.5 w-full flex-shrink-0 pb-1.5 opacity-100 relative z-[2] pt-3"
>
  <div class="relative flex h-12 items-center justify-between px-4 mt-4">
    <!-- Logo -->
    <div class="flex items-center h-8 z-[60]">
      <a
        href="https://klimatkollen.se"
        class="flex items-center pl-4"
        aria-label="Go to Klimatkollen homepage"
      >
        <img
          src="/klimatkollen_logo.svg"
          alt="Klimatkollen logga"
          width="150"
        />
      </a>
    </div>
    <nav class="ml-auto hidden lg:flex h-[2rem] items-center gap-6 pr-4">
      {#each navItems as item}
        <a
          href={item.href}
          class="relative text-gray-150 text-sm after:content-[''] after:block after:h-[2px] after:bg-gray-200 after:absolute after:left-0 after:bottom-[-2px] after:w-full after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-gray-200"
        >
          {item.label}
        </a>
      {/each}
    </nav>
    <!-- Hamburger Button (Mobile) -->
    <div class="ml-auto block lg:hidden z-40">
      <Hamburger
        bind:open
        type="spin"
        --color="white"
        aria-label="Toggle menu"
        --layer-height="1px"
        --layer-width="22px"
      />
    </div>
  </div>

  <!-- Fullscreen Menu Overlay (Mobile View) -->
  {#if open}
    <!-- Background Overlay to hide content -->
    <div class="fixed inset-0 bg-black bg-opacity-75"></div>

    <!-- Fullscreen Menu (Nav Links) -->
    <div
      class="fullscreen-menu bg-black text-white fixed left-0 top-0 flex h-full w-full flex-col pl-4 pt-4"
    >
      <!-- Divider Line -->
      <hr class="mt-[58px] mb-4 border-t bg-gray-350 border-0 w-full" />

      <!-- Navigation Links -->
      <nav class="flex flex-col gap-5">
        {#each navItems as item}
          <a href={item.href} class=" text-[1.5rem] hover:underline">
            {item.label}
          </a>
        {/each}
      </nav>
    </div>
  {/if}
</header>
