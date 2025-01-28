<script lang="ts">
  import { Card } from '../ui/card'
  import EmissionsEditor from './EmissionsEditor.svelte'
  import { editByReportingPeriod } from './editor.svelte'
  import type { Scope3CategoryStrings } from '@/content/config'

  type Props = {
    scope3CategoryStrings: Scope3CategoryStrings
  }
  let { scope3CategoryStrings }: Props = $props()

  $inspect(editByReportingPeriod.selectedYear)
</script>

<Card level={1} class="grid gap-8">
  <div class="grid gap-2">
    <label for="reportingPeriods" class="block text-sm font-medium">
      Välj rapporteringsperiod
    </label>
    <select
      id="reportingPeriods"
      class="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 p-2 text-white"
      bind:value={editByReportingPeriod.selectedYear}
    >
      {#each editByReportingPeriod.reportingYears as year}
        <option value={year}>{year}</option>
      {/each}
    </select>
  </div>
  {#if editByReportingPeriod.selectedPeriod}
    <EmissionsEditor {scope3CategoryStrings} />
    <!-- TODO: Add EconomyEditor -->
  {:else}
    <p class="text-muted">
      Ingen rapporteringsperiod med utsläppsdata hittades.
    </p>
  {/if}
</Card>
