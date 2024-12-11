<script lang="ts">
  import { Card } from '../ui/card'
  import type { CompanyData } from '@/data/companyData'

  export let company: CompanyData

  // Get the latest reporting period with emissions
  $: latestPeriod = company.reportingPeriods.find(period => period.emissions)
  $: emissions = latestPeriod?.emissions

  function handleNumberInput(e: Event, setter: (value: number | null) => void) {
    const input = e.target as HTMLInputElement
    const value = input.value === '' ? null : Number(input.value)
    setter(value)
  }
</script>

<Card level={1}>
  <h2 class="mb-6 text-2xl font-semibold">Utsläpp</h2>

  {#if latestPeriod}
    <div class="grid gap-6">
      <!-- Scope 1 -->
      <div class="grid gap-4">
        <h3 class="text-xl font-medium">Scope 1</h3>
        <label class="grid gap-2">
          <span>Totala utsläpp (ton CO₂e)</span>
          <input
            type="number"
            value={emissions.scope1.total ?? ''}
            on:input={(e) => handleNumberInput(e, (val) => emissions.scope1.total = val)}
            class="rounded-md bg-gray-700 px-4 py-2"
          />
        </label>
      </div>

      <!-- Scope 2 -->
      <div class="grid gap-4">
        <h3 class="text-xl font-medium">Scope 2</h3>
        <label class="grid gap-2">
          <span>Location-based (ton CO₂e)</span>
          <input
            type="number"
            value={emissions.scope2.lb ?? ''}
            on:input={(e) => handleNumberInput(e, (val) => emissions.scope2.lb = val)}
            class="rounded-md bg-gray-700 px-4 py-2"
          />
        </label>
        <label class="grid gap-2">
          <span>Market-based (ton CO₂e)</span>
          <input
            type="number"
            value={emissions.scope2.mb ?? ''}
            on:input={(e) => handleNumberInput(e, (val) => emissions.scope2.mb = val)}
            class="rounded-md bg-gray-700 px-4 py-2"
          />
        </label>
      </div>

      <!-- Scope 3 -->
      <div class="grid gap-4">
        <h3 class="text-xl font-medium">Scope 3</h3>
        {#if emissions.scope3?.categories}
          {#each emissions.scope3.categories as category}
            <label class="grid gap-2">
              <span>Kategori {category.category} (ton CO₂e)</span>
              <input
                type="number" 
                value={category.total ?? ''}
                on:input={(e) => {
                  category.total = e.currentTarget.valueAsNumber
                }}
                class="rounded-md bg-gray-700 px-4 py-2"
              />
            </label>
          {/each}
        {/if}
      </div>

      <!-- Biogenic Emissions -->
      <div class="grid gap-4">
        <h3 class="text-xl font-medium">Biogena utsläpp</h3>
        <label class="grid gap-2">
          <span>Totala biogena utsläpp (ton CO₂e)</span>
          <input
            type="number"
            value={emissions.biogenicEmissions?.total ?? ''}
            on:input={(e) => handleNumberInput(e, (val) => {
              if (emissions.biogenicEmissions) {
                emissions.biogenicEmissions.total = val
              }
            })}
            class="rounded-md bg-gray-700 px-4 py-2"
          />
        </label>
      </div>
    </div>
  {:else}
    <p class="text-muted">Ingen rapporteringsperiod med utsläppsdata hittades.</p>
  {/if}
</Card>
