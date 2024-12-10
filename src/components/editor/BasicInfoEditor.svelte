<script lang="ts">
  import { Card } from '../ui/card'
  import type { CompanyData } from '@/data/companyData'

  export let company: CompanyData
</script>

<Card level={1}>
  <h2 class="mb-6 text-2xl font-semibold">Grundinformation</h2>

  <div class="grid gap-4">
    <label class="grid gap-2">
      <span>Namn</span>
      <input
        type="text"
        bind:value={company.name}
        class="rounded-md bg-gray-700 px-4 py-2"
      />
    </label>

    <label class="grid gap-2">
      <span>Beskrivning</span>
      <textarea
        bind:value={company.description}
        rows="3"
        class="rounded-md bg-gray-700 px-4 py-2"
      />
    </label>

    <label class="grid gap-2">
      <span>URL</span>
      <input
        type="url"
        bind:value={company.url}
        class="rounded-md bg-gray-700 px-4 py-2"
      />
    </label>

    <label class="grid gap-2">
      <span>Intern kommentar</span>
      <textarea
        bind:value={company.internalComment}
        rows="2"
        class="rounded-md bg-gray-700 px-4 py-2"
      />
    </label>
  </div>
</Card>
