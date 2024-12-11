<script lang="ts">
  import { Card } from '../ui/card'
  import type { CompanyData } from '@/data/companyData'
  import { Scope3CategoryNumber } from '@/data/companyData'

  export let company: CompanyData

  function getCategoryName(category: Scope3CategoryNumber): string {
    switch (category) {
      case Scope3CategoryNumber.purchasedGoods:
        return 'Inköpta varor och tjänster'
      case Scope3CategoryNumber.capitalGoods:
        return 'Kapitalvaror'
      case Scope3CategoryNumber.fuelAndEnergyRelatedActivities:
        return 'Bränsle- och energirelaterade aktiviteter'
      case Scope3CategoryNumber.upstreamTransportationAndDistribution:
        return 'Uppströms transport och distribution'
      case Scope3CategoryNumber.wasteGeneratedInOperations:
        return 'Avfall genererat i verksamheten'
      case Scope3CategoryNumber.businessTravel:
        return 'Tjänsteresor'
      case Scope3CategoryNumber.employeeCommuting:
        return 'Pendlingsresor'
      case Scope3CategoryNumber.upstreamLeasedAssets:
        return 'Uppströms leasade tillgångar'
      case Scope3CategoryNumber.downstreamTransportationAndDistribution:
        return 'Nedströms transport och distribution'
      case Scope3CategoryNumber.processingOfSoldProducts:
        return 'Bearbetning av sålda produkter'
      case Scope3CategoryNumber.useOfSoldProducts:
        return 'Användning av sålda produkter'
      case Scope3CategoryNumber.endOfLifeTreatmentOfSoldProducts:
        return 'Slutbehandling av sålda produkter'
      case Scope3CategoryNumber.downstreamLeasedAssets:
        return 'Nedströms leasade tillgångar'
      case Scope3CategoryNumber.franchises:
        return 'Franchiser'
      case Scope3CategoryNumber.investments:
        return 'Investeringar'
      case Scope3CategoryNumber.other:
        return 'Övrigt'
      default:
        return 'Okänd kategori'
    }
  }

  // Get the latest reporting period with emissions
  $: latestPeriod = company.reportingPeriods.find(period => period.emissions)
  $: emissions = latestPeriod?.emissions

  function handleNumberInput(e: Event, setter: (value: number | null) => void) {
    const input = e.target as HTMLInputElement
    const value = input.value === '' ? null : Number(input.value)
    setter(value)
  }
</script>

<Card level={1} class="bg-gray-900 p-8">
  <h2 class="mb-8 text-3xl font-medium tracking-tight">Utsläpp</h2>

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
            class="rounded-xl bg-gray-800 px-4 py-3 text-lg focus:border-blue-250 focus:outline-none focus:ring-2 focus:ring-blue-250/50"
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
          <div class="grid gap-3 sm:grid-cols-2">
            {#each emissions.scope3.categories as category}
              <label class="grid gap-1.5">
                <span class="text-sm">
                  {category.category}. {getCategoryName(category.category)} (ton CO₂e)
                </span>
                <input
                  type="number" 
                  value={category.total ?? ''}
                  on:input={(e) => {
                    category.total = e.currentTarget.valueAsNumber
                  }}
                  class="rounded-xl bg-gray-800 px-4 py-2 text-lg focus:border-blue-250 focus:outline-none focus:ring-2 focus:ring-blue-250/50"
                />
              </label>
            {/each}
          </div>
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
