<script lang="ts">
  export let value: number | null = null
  export let disabled: boolean = false // Kept for API compatibility but not used
  export let onChange: (value: number) => void

  function handleInput(e: Event) {
    if (e.target) {
      onChange(Number((e.target as HTMLInputElement).value))
    }
  }

</script>

<div class="flex gap-2 items-center">
  <input
    type="number"
    value={value ?? 0}
    on:input={handleInput}
    class="flex-1 rounded-xl bg-gray-800 px-4 py-3 text-lg focus:border-blue-250 focus:outline-none focus:ring-2 focus:ring-blue-250/50"
  />
</div>
