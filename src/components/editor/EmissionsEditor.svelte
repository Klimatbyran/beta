<script lang="ts">
  import { Card } from '../ui/card'
  import type { CompanyData } from '@/data/companyData'
  import EmissionsValue from './EmissionsValue.svelte'
  import { Scope3CategoryNumber } from '@/data/companyData'
  import { isNumber } from '@/lib/utils'

  export let company: CompanyData

  // Reactive calculation of total emissions
  $: latestPeriod = company.reportingPeriods.find(period => period.emissions)
  $: emissions = latestPeriod?.emissions
  $: scope1Total = emissions?.scope1?.total ?? 0
  $: scope2Total = emissions?.scope2?.calculatedTotalEmissions ?? 0
  $: scope3Total = emissions?.scope3?.categories?.reduce((sum, category) => 
    sum + (category.total ?? 0), 0) ?? 0
  $: if (emissions?.scope3) {
    emissions.scope3.calculatedTotalEmissions = scope3Total
  }
  $: biogenicTotal = emissions?.biogenicEmissions?.total ?? 0
  $: totalEmissions = scope1Total + scope2Total + scope3Total

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


  function handleNumberInput(e: Event, setter: (value: number | null) => void) {
    const input = e.target as HTMLInputElement
    const value = input.value === '' ? null : Number(input.value)
    setter(value)
  }
</script>

<div class="sticky top-12 z-10">
  <Card level={1} class="mb-4 bg-gray-800 p-6">
    <div class="grid gap-4">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-medium">Totala utsläpp</h3>
        <span class="text-2xl font-bold text-orange-250">
          {totalEmissions.toLocaleString('sv-SE')} <span class="text-base text-muted">ton CO₂e</span>
        </span>
      </div>
      <div class="grid gap-2 text-sm">
        <div class="flex justify-between">
          <span>Scope 1</span>
          <span class="font-medium">{scope1Total.toLocaleString('sv-SE')}</span>
        </div>
        <div class="flex justify-between">
          <span>Scope 2</span>
          <span class="font-medium">{scope2Total.toLocaleString('sv-SE')}</span>
        </div>
        <div class="flex justify-between">
          <span>Scope 3</span>
          <span class="font-medium">{scope3Total.toLocaleString('sv-SE')}</span>
        </div>
        <div class="flex justify-between border-t border-gray-700 pt-2">
          <span>Biogena utsläpp</span>
          <span class="font-medium">{biogenicTotal.toLocaleString('sv-SE')}</span>
        </div>
      </div>
    </div>
  </Card>
</div>

<Card level={1} class="bg-gray-900 p-8">
  <h2 class="mb-8 text-3xl font-medium tracking-tight">Utsläpp</h2>

  {#if latestPeriod}
    <div class="grid gap-6">
      <!-- Scope 1 -->
      <div class="grid gap-4">
        <div>
          <h3 class="text-xl font-medium">Scope 1</h3>
          <p class="text-sm text-muted">Direkta utsläpp från egna eller kontrollerade källor, t.ex. egna fordon och fastigheter.</p>
        </div>
        <div class="grid gap-2">
          <span>Totala utsläpp (ton CO₂e)</span>
          <EmissionsValue
            value={emissions.scope1.total}
            isReported={emissions.scope1.isReported}
            onChange={(val) => emissions.scope1.total = val}
            onReportedChange={(reported) => emissions.scope1.isReported = reported}
          />
        </div>
      </div>

      <!-- Scope 2 -->
      <div class="grid gap-4">
        <div>
          <h3 class="text-xl font-medium">Scope 2</h3>
          <p class="text-sm text-muted">Indirekta utsläpp från inköpt el, värme och kyla.</p>
        </div>
        <div class="grid gap-2">
          <span>Location-based (ton CO₂e)</span>
          <div class="flex gap-2 items-center">
            <input
              type="number"
              value={emissions.scope2.lb ?? ''}
              on:input={(e) => handleNumberInput(e, (val) => emissions.scope2.lb = val)}
              class="flex-1 rounded-md bg-gray-700 px-4 py-2"
              disabled={!emissions.scope2.isLbReported}
            />
            <label class="flex items-center gap-2">
              <input
                type="checkbox"
                bind:checked={emissions.scope2.isLbReported}
                class="h-4 w-4 rounded border-gray-300"
              />
              <span class="text-sm">Rapporterat</span>
            </label>
          </div>
        </div>
        <div class="grid gap-2">
          <span>Market-based (ton CO₂e)</span>
          <div class="flex gap-2 items-center">
            <input
              type="number"
              value={emissions.scope2.mb ?? ''}
              on:input={(e) => handleNumberInput(e, (val) => emissions.scope2.mb = val)}
              class="flex-1 rounded-md bg-gray-700 px-4 py-2"
              disabled={!emissions.scope2.isMbReported}
            />
            <label class="flex items-center gap-2">
              <input
                type="checkbox"
                bind:checked={emissions.scope2.isMbReported}
                class="h-4 w-4 rounded border-gray-300"
              />
              <span class="text-sm">Rapporterat</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Scope 3 -->
      <div class="grid gap-4">
        <div>
          <h3 class="text-xl font-medium">Scope 3</h3>
          <p class="text-sm text-muted">Övriga indirekta utsläpp i värdekedjan, både uppströms och nedströms.</p>
        </div>
        {#if emissions.scope3?.categories}
          <div class="grid gap-8 sm:grid-cols-2">
            <!-- Upstream (1-8) -->
            <div class="grid gap-4">
              <h4 class="text-lg font-medium">Uppströms (1-8)</h4>
              {#each Array.from({ length: 8 }, (_, i) => i + 1) as categoryNumber}
                {@const category = emissions.scope3.categories.find(c => c.category === categoryNumber)}
                <label class="grid gap-1.5">
                  <span class="text-sm">
                    {categoryNumber}. {getCategoryName(categoryNumber)} (ton CO₂e)
                  </span>
                  <div class="flex gap-2 items-center">
                    <input
                      type="number" 
                      value={category?.total ?? ''}
                      on:input={(e) => {
                        const existingIndex = emissions.scope3.categories.findIndex(c => c.category === categoryNumber)
                        if (existingIndex >= 0) {
                          emissions.scope3.categories[existingIndex].total = e.currentTarget.valueAsNumber
                        } else {
                          emissions.scope3.categories.push({
                            category: categoryNumber,
                            total: e.currentTarget.valueAsNumber,
                            isReported: true,
                            unit: 'ton CO₂e',
                            metadata: {
                              comment: null,
                              source: null,
                              updatedAt: new Date(),
                              user: { name: '' },
                              verifiedBy: null,
                              dataOrigin: null
                            }
                          })
                        }
                      }}
                      disabled={!category?.isReported}
                      class="flex-1 rounded-xl bg-gray-800 px-4 py-2 text-lg focus:border-blue-250 focus:outline-none focus:ring-2 focus:ring-blue-250/50"
                    />
                    <label class="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={category?.isReported ?? false}
                        on:change={(e) => {
                          const existingIndex = emissions.scope3.categories.findIndex(c => c.category === categoryNumber)
                          if (existingIndex >= 0) {
                            emissions.scope3.categories[existingIndex].isReported = e.currentTarget.checked
                          } else if (e.currentTarget.checked) {
                            emissions.scope3.categories.push({
                              category: categoryNumber,
                              total: null,
                              isReported: true,
                              unit: 'ton CO₂e',
                              metadata: {
                                comment: null,
                                source: null,
                                updatedAt: new Date(),
                                user: { name: '' },
                                verifiedBy: null,
                                dataOrigin: null
                              }
                            })
                          }
                        }}
                        class="h-4 w-4 rounded border-gray-300"
                      />
                      <span class="text-sm">Rapporterat</span>
                    </label>
                  </div>
                </label>
              {/each}
            </div>

            <!-- Downstream (9-15) -->
            <div class="grid gap-4">
              <h4 class="text-lg font-medium">Nedströms (9-15)</h4>
              {#each Array.from({ length: 7 }, (_, i) => i + 9) as categoryNumber}
                {@const category = emissions.scope3.categories.find(c => c.category === categoryNumber)}
                <label class="grid gap-1.5">
                  <span class="text-sm">
                    {categoryNumber}. {getCategoryName(categoryNumber)} (ton CO₂e)
                  </span>
                  <input
                    type="number" 
                    value={category?.total ?? ''}
                    on:input={(e) => {
                      const existingIndex = emissions.scope3.categories.findIndex(c => c.category === categoryNumber)
                      if (existingIndex >= 0) {
                        emissions.scope3.categories[existingIndex].total = e.currentTarget.valueAsNumber
                      } else {
                        emissions.scope3.categories.push({
                          category: categoryNumber,
                          total: e.currentTarget.valueAsNumber,
                          unit: 'ton CO₂e',
                          metadata: {
                            comment: null,
                            source: null,
                            updatedAt: new Date(),
                            user: { name: '' },
                            verifiedBy: null,
                            dataOrigin: null
                          }
                        })
                      }
                    }}
                    class="rounded-xl bg-gray-800 px-4 py-2 text-lg focus:border-blue-250 focus:outline-none focus:ring-2 focus:ring-blue-250/50"
                  />
                </label>
              {/each}
            </div>
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
