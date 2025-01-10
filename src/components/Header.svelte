<script>
  let open = false

  const baseURL = import.meta.env.DEV
    ? 'http://localhost:3000'
    : 'https://klimatkollen.se'
</script>

<header
  class="bg-black h-18 top-0 m-0 mb-1.5 w-full flex-shrink-0 pb-1.5 opacity-100 relative z-[2]"
>
  <div
    class="relative flex h-12 max-w-screen-2xl items-center justify-between px-4"
  >
    <div
      class="absolute left-1/2 top-1/2 z-[30] flex h-8 -translate-x-1/2 -translate-y-1/2 pt-1"
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
  </div>
</header>
