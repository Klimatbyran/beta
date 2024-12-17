<script lang="ts">
  import { Combobox, type Item } from '../ui/combobox'
  import { Card } from '../ui/card'
  import { getCompanyURL, type CompanyData } from '@/data/companyData'
  import { getCompanies } from '@/data/companies'
  import { onMount } from 'svelte'

  let companies = $state<CompanyData[]>([])
  let searchQuery = $state('')
  let selectedIndustry = $state<string | null>(null)
  let loading = $state(true)
  let error = $state<string | null>(null)

  const industries = $derived(
    Array.from(
      new Set(
        companies
          .map((c) => c.industry?.industryGics.sv.industryName)
          .filter(Boolean)
      )
    ).sort()
  )

  const filteredCompanies = $derived(() => {
    console.log('Filtrerar företag, total:', companies.length) // Debug logging
    return companies
      .filter((company) => {
        if (!company?.name) return false
        if (selectedIndustry && company.industry?.industryGics?.sv?.industryName !== selectedIndustry) {
          return false
        }
        return company.name.toLowerCase().includes(searchQuery.toLowerCase())
      })
      .sort((a, b) => a.name.localeCompare(b.name))
  })

  function onSelectIndustry(item: Item<string>) {
    selectedIndustry = item.value === 'all' ? null : item.value
  }

  onMount(async () => {
    try {
      const data = await getCompanies()
      if (!data || !Array.isArray(data)) {
        throw new Error('Ogiltig data från API')
      }
      companies = data
      console.log('Hämtade företag:', companies.length) // Debug logging
    } catch (e) {
      console.error('Fel vid hämtning av företag:', e) // Debug logging
      error = e instanceof Error ? e.message : 'Ett fel uppstod vid hämtning av företag'
    } finally {
      loading = false
    }
  })
</script>

<div class="container mx-auto max-w-4xl px-4 py-8">
  <Card level={1}>
    <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex-1">
        <input
          type="search"
          placeholder="Sök företag..."
          bind:value={searchQuery}
          class="w-full rounded-md bg-gray-700 px-4 py-2"
        />
      </div>

      <Combobox
        items={[
          { label: 'Alla branscher', value: 'all', data: 'all' },
          ...industries.map((industry) => ({
            label: industry,
            value: industry,
            data: industry,
          })),
        ]}
        buttonLabel="Välj bransch"
        placeholder="Välj bransch..."
        emptyMessage="Inga branscher hittade."
        onSelect={onSelectIndustry}
        width={300}
      />
    </div>

    {#if loading}
      <div class="py-8 text-center text-muted">
        Laddar företag...
      </div>
    {:else if error}
      <div class="py-8 text-center text-red-500">
        {error}
      </div>
    {:else if filteredCompanies.length === 0}
      <div class="py-8 text-center text-muted">
        Inga företag hittades
      </div>
    {:else}
      <div class="grid gap-4">
        {#each filteredCompanies as company}
          <a
            href={`/foretag/${getCompanyURL(company)}`}
            class="flex items-center justify-between rounded-lg bg-gray-700 p-4 transition-colors hover:bg-gray-600"
          >
            <div>
              <h3 class="font-medium">{company.name}</h3>
              {#if company.industry}
                <p class="text-sm text-muted">
                  {company.industry.industryGics.sv.industryName}
                </p>
              {/if}
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </Card>
</div>
