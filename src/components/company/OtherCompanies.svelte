<script lang="ts">
  import { Combobox, type Item } from '../ui/combobox'
  import { getCompanyURL, type CompanyData } from '@/data/companyData'

  type Props = {
    companies: CompanyData[]
  }
  let { companies }: Props = $props()

  const sorted = $derived(
    companies.sort((a, b) => a.name.localeCompare(b.name)),
  )

  function onSelect(item: Item<string>) {
    window.location.assign(item.data)
  }
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
