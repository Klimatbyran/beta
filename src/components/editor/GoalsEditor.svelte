<script lang="ts">
  import { Card } from '../ui/card'
  import { Button } from '../ui/button'
  import type { CompanyDetails } from '@/lib/api/types'

  export let company: CompanyDetails

  function addGoal() {
    company.goals = [
      ...company.goals,
      {
        description: '',
        year: null,
        baseYear: null,
        target: null,
        metadata: {
          comment: null,
          source: null,
          updatedAt: new Date(),
          user: { name: '' }, // Will be set by the API
          verifiedBy: null,
          dataOrigin: null
        }
      }
    ]
  }

  function removeGoal(index: number) {
    company.goals = company.goals.filter((_, i) => i !== index)
  }
</script>

<Card level={1}>
  <h2 class="mb-6 text-2xl font-semibold">Klimatmål</h2>

  <div class="grid gap-6">
    {#each company.goals as goal, i}
      <div class="grid gap-4">
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-medium">Mål {i + 1}</h3>
          <Button variant="destructive" size="sm" on:click={() => removeGoal(i)}>
            Ta bort
          </Button>
        </div>

        <label class="grid gap-2">
          <span>Beskrivning</span>
          <textarea
            bind:value={goal.description}
            rows="3"
            class="rounded-md bg-gray-700 px-4 py-2"
          ></textarea>
        </label>

        <div class="grid gap-4 sm:grid-cols-2">
          <label class="grid gap-2">
            <span>Målår</span>
            <input
              type="number"
              bind:value={goal.year}
              class="rounded-md bg-gray-700 px-4 py-2"
              min="2000"
              max="2100"
            />
          </label>

          <label class="grid gap-2">
            <span>Basår</span>
            <input
              type="number"
              bind:value={goal.baseYear}
              class="rounded-md bg-gray-700 px-4 py-2"
              min="1900"
              max="2100"
            />
          </label>
        </div>

        <label class="grid gap-2">
          <span>Mål (% minskning)</span>
          <input
            type="number"
            bind:value={goal.target}
            class="rounded-md bg-gray-700 px-4 py-2"
            min="0"
            max="100"
          />
        </label>
      </div>
    {/each}

    <Button variant="outline" on:click={addGoal}>Lägg till mål</Button>
  </div>
</Card>
