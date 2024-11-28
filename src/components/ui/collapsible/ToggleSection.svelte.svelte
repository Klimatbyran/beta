<script>
  import { slide } from 'svelte/transition'
  export let header
  export let text

  let isOpen = false

  function toggle() {
    isOpen = !isOpen
  }
</script>

<div class="text-section">
  <div
    class="header-section"
    role="button"
    tabindex="0"
    aria-expanded={isOpen}
    on:click={toggle}
    on:keydown={(event) => {
      if (event.key === 'Enter' || event.key === ' ') toggle()
    }}
  >
    <h5>{header}</h5>
    <svg
      class="chevron {isOpen ? 'open' : ''}"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M7 10l5 5 5-5z" fill="currentColor" />
    </svg>
  </div>
  {#if isOpen}
    <div class="info-section" transition:slide>
      {#if text}
        <div>{@html text}</div>
      {/if}
      <slot />
    </div>
  {/if}
</div>

<style>
  .text-section {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 2rem;
  }

  .header-section {
    display: flex;
    justify-content: space-between;
    inline-size: 100%;
    list-style: none;
    padding: 0.5rem 0;
    cursor: pointer;
  }

  .chevron {
    transition: transform 0.3s ease;
    fill: black;
    transform: rotate(0);
  }

  .chevron.open {
    transform: rotate(180deg) !important;
  }

  .info-section {
    padding: 1rem 0;
  }
</style>
