<script lang="ts">
  import { MunicipalityDataService } from '@/data/municipalities'
  import { Combobox, type Item } from '../ui/combobox'
  import { type Municipality } from '@/data/municipalityTypes'
  import { onMount } from 'svelte'

  let municipalityNames = $state<string[]>([])

  const sorted = $derived(
    municipalityNames.sort((a, b) => a.localeCompare(b)),
  )

  function onSelect(item: Item<string>) {
    window.location.assign(item.data)
  }

  onMount(async () => {
    const service = new MunicipalityDataService()
    municipalityNames = service.getAllMunicipalityNames()
  })
</script>

<Combobox
  items={sorted.map((c) => ({
    label: c,
    value: c,
    data: `/kommun/${c}`,
  }))}
  buttonLabel="Visa annan kommun"
  placeholder="Sök kommun..."
  emptyMessage="Inga kommuner hittade."
  {onSelect}
  width={260}
/>
