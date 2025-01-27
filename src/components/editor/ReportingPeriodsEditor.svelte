<script lang="ts">
  import { Card } from '../ui/card'
  import type { UpdateReportingPeriods } from '../../lib/api/types'
  import type { Scope3CategoryStrings } from '../../content/config'
  import EmissionsEditor from './EmissionsEditor.svelte'

  type Props = {
    updatedReportingPeriods: UpdateReportingPeriods['reportingPeriods']
    scope3CategoryStrings: Scope3CategoryStrings
  }
  let { updatedReportingPeriods = $bindable(), scope3CategoryStrings }: Props =
    $props()

  const reportingYears = $derived(
    (updatedReportingPeriods as UpdateReportingPeriods['reportingPeriods']).map(
      (period) => new Date(period.endDate).getFullYear(),
    ),
  )

  let selectedYear = $state(reportingYears.at(0))

  // Find the selected period based on selectedYear
  const selectedPeriod = $derived(
    updatedReportingPeriods?.find(
      (period) =>
        new Date(period.startDate).getFullYear() === selectedYear &&
        period.emissions,
    ),
  )
</script>

{#if selectedPeriod && reportingYears}
  <Card level={1} class="grid gap-8">
    <div class="grid gap-2">
      <label for="reportingPeriods" class="block text-sm font-medium">
        Välj rapporteringsperiod
      </label>
      <select
        id="reportingPeriods"
        class="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 p-2 text-white"
        bind:value={selectedYear}
      >
        {#each reportingYears as year}
          <option value={year}>{year}</option>
        {/each}
      </select>
    </div>
    <EmissionsEditor bind:updatedReportingPeriods {selectedPeriod} {scope3CategoryStrings} />
  </Card>
{:else}
  <p class="text-muted">Ingen rapporteringsperiod med utsläppsdata hittades.</p>
{/if}
