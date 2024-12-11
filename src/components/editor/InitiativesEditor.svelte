<script lang="ts">
  import { Card } from '../ui/card'
  import { Button } from '../ui/button'
  import type { CompanyData, Initiative } from '@/data/companyData'

  export let company: CompanyData

  function addInitiative() {
    company.initiatives = [
      ...company.initiatives,
      {
        title: '',
        description: '',
        year: null,
        scope: null,
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

  function removeInitiative(index: number) {
    company.initiatives = company.initiatives.filter((_, i) => i !== index)
  }
</script>

<Card level={1}>
  <h2 class="mb-6 text-2xl font-semibold">Initiativ</h2>

  <div class="grid gap-6">
    {#each company.initiatives as initiative, i}
      <div class="grid gap-4">
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-medium">Initiativ {i + 1}</h3>
          <Button variant="destructive" size="sm" on:click={() => removeInitiative(i)}>
            Ta bort
          </Button>
        </div>

        <label class="grid gap-2">
          <span>Titel</span>
          <input
            type="text"
            bind:value={initiative.title}
            class="rounded-md bg-gray-700 px-4 py-2"
          />
        </label>

        <label class="grid gap-2">
          <span>Beskrivning</span>
          <textarea
            bind:value={initiative.description}
            rows="3"
            class="rounded-md bg-gray-700 px-4 py-2"
          />
        </label>

        <div class="grid gap-4 sm:grid-cols-2">
          <label class="grid gap-2">
            <span>År</span>
            <input
              type="number"
              bind:value={initiative.year}
              class="rounded-md bg-gray-700 px-4 py-2"
              min="2000"
              max="2100"
            />
          </label>

          <label class="grid gap-2">
            <span>Scope</span>
            <input
              type="text"
              bind:value={initiative.scope}
              class="rounded-md bg-gray-700 px-4 py-2"
              placeholder="t.ex. 'scope 1, 2'"
            />
          </label>
        </div>
      </div>
    {/each}

    <Button variant="outline" on:click={addInitiative}>Lägg till initiativ</Button>
  </div>
</Card>
