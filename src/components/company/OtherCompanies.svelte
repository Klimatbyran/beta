<script lang="ts">
  import { Combobox, type Item } from '../ui/combobox'
  import { getCompanyURL } from '@/data/companyData'
  import { client } from '@/lib/api/request'
  import type { CompanyList } from '@/lib/api/types'
  import { onMount } from 'svelte'

  let companies = $state<CompanyList>([])

  const sorted = $derived(
    // Make a copy of the array to avoid mutating state
    companies.slice().sort((a, b) => a.name.localeCompare(b.name)),
  )

  function onSelect(item: Item<string>) {
    window.location.assign(item.data)
  }

  onMount(async () => {
    const res = await client.GET('/companies/')
    if (res.data) {
      companies = res.data
    } else {
      throw new Error(res.error)
    }
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
