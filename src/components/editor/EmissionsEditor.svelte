<script lang="ts">
  import { Card } from '../ui/card'
  import EmissionsValue from './EmissionsValue.svelte'
  import type { UpdateReportingPeriods } from '../../lib/api/types'
  import type { Scope3CategoryStrings } from '../../content/config'

  type Props = {
    selectedPeriod: UpdateReportingPeriods['reportingPeriods'][number]
    scope3CategoryStrings: Scope3CategoryStrings
    updatedReportingPeriods:UpdateReportingPeriods['reportingPeriods']
  }
  let { selectedPeriod = $bindable(), scope3CategoryStrings }: Props = $props()

  const emissions = $derived(selectedPeriod?.emissions)
  const scope1 = $derived(emissions?.scope1)
  const scope2 = $derived(emissions?.scope2)
  const scope3Total = $derived(
    emissions?.scope3?.categories?.reduce(
      (sum, category) => sum + (category.total ?? 0),
      0,
    ) ?? 0,
  )

  const biogenic = $derived(emissions?.biogenic)

  /**
   * find the category by number then pulling the title assuming it is found
   */
  function getCategoryName(categoryNumber: number): string {
    return (
      Object.entries(scope3CategoryStrings).find(([key]) =>
        key.startsWith(`${categoryNumber}`),
      )?.[1]?.title ?? 'Unknown category'
    )
  }
</script>

<div class="sticky top-12 z-10">
  <Card level={2} class="mb-4 bg-gray-800 p-6">
    <div class="grid gap-4">
      <div class="grid gap-2 text-sm">
        <div class="flex justify-between">
          <span>Scope 1</span>
          <span class="font-medium"
            >{scope1?.total.toLocaleString('sv-SE')}</span
          >
        </div>
        <div class="flex justify-between">
          <span>Scope 2</span>
          <!-- NOTE: we need to handle calculatedTotalEmissions on the client - see how it was implemented for the API -->
          <span class="font-medium">{scope2?.mb?.toLocaleString('sv-SE')}</span>
        </div>
        <div class="flex justify-between">
          <span>Scope 3</span>
          <span class="font-medium">{scope3Total.toLocaleString('sv-SE')}</span>
        </div>
        <div class="flex justify-between border-t border-gray-700 pt-2">
          <span>Biogena utsläpp</span>
          <span class="font-medium"
            >{biogenic?.total.toLocaleString('sv-SE')}</span
          >
        </div>
      </div>
    </div>
  </Card>
</div>

<Card level={2} class="bg-gray-900 p-8">
  <h2 class="mb-8 text-3xl font-medium tracking-tight">Utsläpp</h2>

  <div class="grid gap-6">
    {#if selectedPeriod && emissions}
      <div class="grid gap-6">
        <!-- Scope 1 -->
        <div class="grid gap-4">
          <div>
            <h3 class="text-xl font-medium">Scope 1</h3>
            <p class="text-sm text-muted">
              Direkta utsläpp från egna eller kontrollerade källor, t.ex. egna
              fordon och fastigheter.
            </p>
          </div>
          <div class="grid gap-2">
            <span>Totala utsläpp (ton CO₂e)</span>
            <EmissionsValue
              value={emissions?.scope1?.total}
              onChange={(val) => {
                if (emissions?.scope1) {
                  emissions.scope1.total = val
                }
              }}
            />
          </div>
        </div>

        <!-- Scope 2 -->
        <div class="grid gap-4">
          <div>
            <h3 class="text-xl font-medium">Scope 2</h3>
            <p class="text-sm text-muted">
              Indirekta utsläpp från inköpt el, värme och kyla.
            </p>
          </div>
          <div class="grid gap-2">
            <span>Location-based (ton CO₂e)</span>
            <EmissionsValue
              value={emissions?.scope2?.lb}
              onChange={(val) => {
                if (emissions?.scope2) {
                  emissions.scope2.lb = val
                }
              }}
            />
          </div>
          <div class="grid gap-2">
            <span>Market-based (ton CO₂e)</span>
            <EmissionsValue
              value={emissions.scope2?.mb}
              onChange={(val) => {
                if (emissions?.scope2) {
                  emissions.scope2.mb = val
                }
              }}
            />
          </div>
        </div>

        <!-- Scope 3 -->
        <div class="grid gap-4">
          <div>
            <h3 class="text-xl font-medium">Scope 3</h3>
            <p class="text-sm text-muted">
              Övriga indirekta utsläpp i värdekedjan, både uppströms och
              nedströms.
            </p>
          </div>
          {#if emissions.scope3?.categories}
            <div class="grid gap-8 sm:grid-cols-2">
              <!-- Upstream (1-8) -->
              <div class="grid gap-4">
                <h4 class="text-lg font-medium">Uppströms (1-8)</h4>
                {#each Array.from({ length: 8 }, (_, i) => i + 1) as categoryNumber}
                  {@const category = emissions.scope3.categories.find(
                    (c) => c.category === categoryNumber,
                  )}
                  <label class="grid gap-1.5">
                    <span class="text-sm">
                      {categoryNumber}. {getCategoryName(categoryNumber)} (ton CO₂e)
                    </span>
                    <EmissionsValue
                      value={category?.total ?? null}
                      onChange={(val) => {
                        const existingIndex =
                          emissions?.scope3?.categories?.findIndex(
                            (c) => c.category === categoryNumber,
                          )
                        if (
                          existingIndex !== undefined &&
                          existingIndex >= 0 &&
                          emissions.scope3?.categories?.[existingIndex]
                        ) {
                          emissions.scope3.categories[existingIndex].total = val
                        } else if (val !== null) {
                          emissions?.scope3?.categories?.push({
                            category: categoryNumber,
                            total: val,
                          })
                        }
                      }}
                    />
                  </label>
                {/each}
              </div>

              <!-- Downstream (9-15) -->
              <div class="grid gap-4">
                <h4 class="text-lg font-medium">Nedströms (9-15)</h4>
                {#each Array.from({ length: 7 }, (_, i) => i + 9) as categoryNumber}
                  {@const category = emissions.scope3.categories.find(
                    (c) => c.category === categoryNumber,
                  )}
                  <label class="grid gap-1.5">
                    <span class="text-sm">
                      {categoryNumber}. {getCategoryName(categoryNumber)} (ton CO₂e)
                    </span>
                    <EmissionsValue
                      value={category?.total ?? null}
                      onChange={(val) => {
                        const existingIndex =
                          emissions?.scope3?.categories?.findIndex(
                            (c) => c.category === categoryNumber,
                          )
                        if (
                          existingIndex !== undefined &&
                          existingIndex >= 0 &&
                          emissions.scope3?.categories?.[existingIndex]
                        ) {
                          emissions.scope3.categories[existingIndex].total = val
                        } else if (val !== null) {
                          emissions?.scope3?.categories?.push({
                            category: categoryNumber,
                            total: val,
                          })
                        }
                      }}
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
            <EmissionsValue
              value={emissions.biogenic?.total ?? null}
              onChange={(val) => {
                if (emissions.biogenic) {
                  emissions.biogenic.total = val
                }
              }}
            />
          </label>
        </div>
      </div>
    {:else}
      <p class="text-muted">
        Ingen rapporteringsperiod med utsläppsdata hittades.
      </p>
    {/if}
  </div></Card
>
