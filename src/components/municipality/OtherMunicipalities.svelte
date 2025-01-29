<script lang="ts">
  import { getMunicipalities } from '@/data/municipalities'
  import { Combobox, type Item } from '../ui/combobox'
  import { onMount } from 'svelte'
  import type { Municipality } from '@/data/municipalityData'

  let municipalityNames: string[] = []

  const sorted = () =>
    municipalityNames.slice().sort((a, b) => a.localeCompare(b))

  function onSelect(item: Item<string>) {
    window.location.assign(item.data)
  }

  onMount(async () => {
    try {
      const municipalities: Municipality[] = await getMunicipalities()
      municipalityNames = municipalities.map((m) => m.name)
    } catch (error) {
      console.error('Failed to fetch municipalities:', error)
    }
  })
</script>

<Combobox
  items={sorted().map((c) => ({
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
