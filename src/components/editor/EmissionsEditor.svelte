<script lang="ts">
  import { Card } from '../ui/card'
  import EmissionsValue from './EmissionsValue.svelte'
  import type { UpdateReportingPeriods } from '../../lib/api/types'
  import type { Scope3CategoryStrings } from '../../content/config'
  import { editByReportingPeriod } from './editor.svelte'

  type Props = {
    scope3CategoryStrings: Scope3CategoryStrings
  }
  let { scope3CategoryStrings }: Props = $props()

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

<!-- <div class="sticky top-20 z-10"> -->
  <Card level={2} class="mb-4 bg-gray-800 p-6">
    <div class="grid gap-4">
      <div class="grid gap-2 text-sm">
        <div class="flex justify-between">
          <span>Scope 1</span>
          <span class="font-medium"
            >{(editByReportingPeriod.scope1?.total ?? 0).toLocaleString(
              'sv-SE',
            )}</span
          >
        </div>
        <div class="flex justify-between">
          <span>Scope 2</span>
          <span class="font-medium"
            >{editByReportingPeriod.scope2Total.toLocaleString('sv-SE')}</span
          >
        </div>
        <div class="flex justify-between">
          <span>Scope 3</span>
          <span class="font-medium"
            >{editByReportingPeriod.scope3Total.toLocaleString('sv-SE')}</span
          >
        </div>
        <div class="flex justify-between border-t border-gray-700 pt-2">
          <span>Biogena utsläpp</span>
          <span class="font-medium"
            >{(editByReportingPeriod.biogenic?.total ?? 0).toLocaleString(
              'sv-SE',
            )}</span
          >
        </div>
      </div>
    </div>
  </Card>
<!-- </div> -->

<Card level={2} class="bg-gray-900 p-8">
  <h2 class="mb-8 text-3xl font-medium tracking-tight">Utsläpp</h2>

  <div class="grid gap-6">
    {#if editByReportingPeriod.selectedPeriod}
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
              value={editByReportingPeriod.scope1?.total}
              onChange={(total) => editByReportingPeriod.setScope1({ total })}
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
          <div class="grid gap s-2">
            <span>Market-based (ton CO₂e)</span>
            <EmissionsValue
              value={editByReportingPeriod.emissions?.scope2?.mb}
              onChange={(mb) => editByReportingPeriod.setScope2({ mb })}
            />
          </div>
          <div class="grid gap-2">
            <span>Location-based (ton CO₂e)</span>
            <EmissionsValue
              value={editByReportingPeriod.emissions?.scope2?.lb}
              onChange={(lb) => editByReportingPeriod.setScope2({ lb })}
            />
          </div>
          <div class="grid gap s-2">
            <span>Unknown (ton CO₂e)</span>
            <EmissionsValue
              value={editByReportingPeriod.emissions?.scope2?.unknown}
              onChange={(unknown) =>
                editByReportingPeriod.setScope2({ unknown })}
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

          <div class="grid gap s-2">
            <span>Totala scope 3-utsläpp enligt rapport (ton CO₂e)</span>
            <EmissionsValue
              value={editByReportingPeriod.emissions?.scope3
                ?.statedTotalEmissions?.total}
              onChange={(total) =>
                editByReportingPeriod.setScope3StateTotal({ total })}
            />
          </div>

          <div class="grid gap-8 sm:grid-cols-2">
            {#snippet scope3Category(categoryNumber: number)}
              <label class="grid gap-1.5">
                <span class="text-sm">
                  {categoryNumber}. {getCategoryName(categoryNumber)} (ton CO₂e)
                </span>
                <EmissionsValue
                  value={editByReportingPeriod.scope3?.categories?.[categoryNumber]?.total}
                  onChange={(total) =>
                    editByReportingPeriod.setScope3Category({
                      category: categoryNumber,
                      total,
                    })}
                />
              </label>
            {/snippet}

            <!-- Upstream (1-8) -->
            <div class="grid gap-4">
              <h4 class="text-lg font-medium">Uppströms (1-8)</h4>
              {#each Array.from({ length: 8 }, (_, i) => i + 1) as categoryNumber}
                {@render scope3Category(categoryNumber)}
              {/each}
            </div>

            <!-- Downstream (9-15) -->
            <div class="grid gap-4">
              <h4 class="text-lg font-medium">Nedströms (9-15)</h4>
              {#each Array.from({ length: 7 }, (_, i) => i + 9) as categoryNumber}
                {@render scope3Category(categoryNumber)}
              {/each}
            </div>
          </div>
        </div>

        <!-- Biogenic Emissions -->
        <div class="grid gap-4">
          <h3 class="text-xl font-medium">Biogena utsläpp</h3>
          <label class="grid gap-2">
            <span>Totala biogena utsläpp (ton CO₂e)</span>
            <EmissionsValue
              value={editByReportingPeriod.emissions?.biogenic?.total ?? null}
              onChange={(val) => {
                console.log('TODO: handle update pls! :)')
                // if (emissions.biogenic) {
                //   emissions.biogenic.total = val
                // }
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
