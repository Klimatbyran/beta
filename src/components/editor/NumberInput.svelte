<script lang="ts">
  type Props = {
    value?: number | null
    onchange: (value: number) => void
  }
  let { value, onchange }: Props = $props()
</script>

<div class="flex gap-2 items-center">
  <input
    type="number"
    value={value ?? 0}
    oninput={(e) => onchange(Number((e.target as HTMLInputElement).value))}
    class="flex-1 rounded-xl bg-gray-800 px-4 py-3 text-lg focus:border-blue-250 focus:outline-none focus:ring-2 focus:ring-blue-250/50"
  />
</div>
