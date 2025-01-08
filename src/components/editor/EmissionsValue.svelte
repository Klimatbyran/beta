<script lang="ts">
  export let value: number | null = null
  export let isReported: boolean = value !== null
  export let disabled: boolean = false // Kept for API compatibility but not used
  export let onChange: (value: number | null) => void
  export let onReportedChange: (reported: boolean) => void

  function handleInput(e: Event) {
    const input = e.target as HTMLInputElement
    const newValue = input.value === '' ? null : Number(input.value)
    if (newValue === null) {
      isReported = false
      onReportedChange(false)
    } else {
      isReported = true
      onReportedChange(true)
    }
    onChange(newValue)
  }

  function handleReportedChange(e: Event) {
    const checked = (e.target as HTMLInputElement).checked
    onReportedChange(checked)
    if (!checked) {
      onChange(null)
    }
  }
</script>

<div class="flex gap-2 items-center">
  <input
    type="number"
    value={value ?? ''}
    on:input={handleInput}
    class="flex-1 rounded-xl bg-gray-800 px-4 py-3 text-lg focus:border-blue-250 focus:outline-none focus:ring-2 focus:ring-blue-250/50"
  />
  <label class="flex items-center gap-2" title="Har rapporterat">
    <input
      type="checkbox"
      checked={isReported}
      on:change={handleReportedChange}
      class="h-4 w-4 rounded border-gray-300"
    />
  </label>
</div>
