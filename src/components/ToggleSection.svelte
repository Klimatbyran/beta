<script lang="ts">
  import { onMount } from 'svelte'
  import Markdown from './Markdown.svelte'
  import ArrowSvg from '../public/icons/arrow-down-round.svg'
  import { H5 } from './Typography.svelte'

  export let header: string
  export let text: string | HTMLElement

  let isOpen = false

  // Toggle open state when the summary element is clicked
  const toggleOpen = () => {
    isOpen = !isOpen
  }
</script>

<details bind:open={isOpen} class="text-section">
  <summary class="header-section" on:click={toggleOpen}>
    <H5>{header}</H5>
    <ArrowSvg
      class="arrow"
      style="transform: rotate({isOpen ? '180deg' : '0deg'});"
    />
  </summary>
  <div class="info-section">
    {#if typeof text === 'string'}
      <Markdown>{text}</Markdown>
    {:else}
      {@html text}
    {/if}
  </div>
</details>

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
    width: 100%;
    list-style: none;
    padding: 0.5rem 0;
    cursor: pointer;
  }

  .header-section::-webkit-details-marker {
    display: none;
  }

  .arrow {
    transition: transform 0.2s ease;
  }

  .info-section {
    display: flex;
    flex-direction: column;
  }
</style>
