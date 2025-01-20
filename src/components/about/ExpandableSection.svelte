<script lang="ts">
  export let title: string;
  export let section: string; // Pass a section identifier
  console.log(section)
  let isOpen = false;

  function toggleOpen() {
    isOpen = !isOpen;
  }

  import MissionSection from './sections/MissionSection.svelte';
  import TeamSection from './sections/TeamSection.svelte';
  import BoardSection from './sections/BoardSection.svelte';
  import FundingSection from './sections/FundingSection.svelte';
  import ProjectSection from './sections/ProjectSection.svelte';
</script>

<div class="border-b border-gray-700 py-4">
  <button
    on:click={toggleOpen}
    class="flex justify-between items-center w-full text-left text-lg font-medium sm:text-xl"
  >
    <span>{title}</span>
    <span>{isOpen ? '▲' : '▼'}</span>
  </button>
  {#if isOpen}
    {#if section === 'mission'}
      <MissionSection />
    {:else if section === 'team'}
      <TeamSection />
    {:else if section === 'board'}
      <BoardSection />
    {:else if section === 'funding'}
      <FundingSection />
    {:else if section === 'project'}
      <ProjectSection />
    {/if}
  {/if}
</div>