<script lang="ts">
  import { Combobox, type Item } from '../ui/combobox'
  import { getCompanyURL } from '@/data/companyData'
  import { request } from '@/lib/api/request'
  import type { CompanyDetails } from '@/lib/api/types'
  import { onMount } from 'svelte'

  let companies = $state<CompanyDetails[]>([])

  const sorted = $derived(
    // Make a copy of the array to avoid mutating state
    companies.slice().sort((a, b) => a.name.localeCompare(b.name)),
  )

  function onSelect(item: Item<string>) {
    window.location.assign(item.data)
  }

  onMount(async () => {
    companies = await request('/companies')
  })
</script>

<Combobox
  items={sorted.map((c) => ({
    label: c.name,
    value: c.name,
    data: `/foretag/${getCompanyURL(c)}`,
  }))}
  buttonLabel="Visa annat företag"
  placeholder="Sök företag..."
  emptyMessage="Inga företag hittade."
  {onSelect}
  width={260}
/>
