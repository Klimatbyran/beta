<script lang="ts">
  type Props = {
    value?: string | null
    onchange?: (value: string) => void
    multiline?: boolean
  }
  let { value = $bindable(''), onchange, multiline = false }: Props = $props()
</script>

<div class="flex gap-2 items-center">
  {#if multiline}
    <textarea
      bind:value
      oninput={onchange
        ? (e) => onchange((e.target as HTMLInputElement).value)
        : undefined}
      rows={6}
      class="flex-1 rounded-xl bg-gray-800 px-4 py-3 text-lg focus:border-blue-250 focus:outline-none focus:ring-2 focus:ring-blue-250/50"
    ></textarea>
  {:else}
    <input
      type="text"
      bind:value
      oninput={onchange
        ? (e) => onchange((e.target as HTMLInputElement).value)
        : undefined}
      class="flex-1 rounded-xl bg-gray-800 px-4 py-3 text-lg focus:border-blue-250 focus:outline-none focus:ring-2 focus:ring-blue-250/50"
    />
  {/if}
</div>
