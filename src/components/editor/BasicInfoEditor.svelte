<script lang="ts">
  import { Card } from '../ui/card'
  import type { CompanyData } from '@/data/companyData'

  export let company: CompanyData
</script>

<Card level={1} class="bg-gray-900 p-8">
  <h2 class="mb-8 text-3xl font-medium tracking-tight">Grundinformation</h2>

  <div class="grid gap-6">
    <label class="grid gap-3">
      <span class="text-sm text-gray-300">Namn</span>
      <input
        type="text"
        bind:value={company.name}
        class="rounded-xl bg-gray-800 px-4 py-3 text-lg focus:border-blue-250 focus:outline-none focus:ring-2 focus:ring-blue-250/50"
      />
    </label>

    <label class="grid gap-3">
      <span class="text-sm text-gray-300">Beskrivning</span>
      <textarea
        bind:value={company.description}
        rows="3"
        class="rounded-xl bg-gray-800 px-4 py-3 text-lg focus:border-blue-250 focus:outline-none focus:ring-2 focus:ring-blue-250/50"
      />
    </label>

    <label class="grid gap-3">
      <span class="text-sm text-gray-300">URL</span>
      <input
        type="url"
        bind:value={company.url}
        class="rounded-xl bg-gray-800 px-4 py-3 text-lg focus:border-blue-250 focus:outline-none focus:ring-2 focus:ring-blue-250/50"
      />
    </label>

    <label class="grid gap-3">
      <span class="text-sm text-gray-300">Intern kommentar</span>
      <textarea
        bind:value={company.internalComment}
        rows="2"
        class="rounded-xl bg-gray-800 px-4 py-3 text-lg focus:border-blue-250 focus:outline-none focus:ring-2 focus:ring-blue-250/50"
      />
    </label>
  </div>
</Card>
