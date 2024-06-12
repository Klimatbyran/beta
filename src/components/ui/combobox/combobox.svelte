<script lang="ts">
  // TODO: replace lucide-svelte with unplugin-icons to allow using lucide icons in Astro components too
  import Check from 'lucide-svelte/icons/check'
  import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down'
  import { tick } from 'svelte'
  import * as Command from '@/components/ui/command/index.js'
  import * as Popover from '@/components/ui/popover/index.js'
  import { Button } from '@/components/ui/button/index.js'
  import { cn } from '@/lib/utils.js'
  import { type Item } from './index'

  export let items: Item[]
  export let buttonLabel: string
  export let placeholder: string
  export let emptyMessage: string
  export let onSelect: ((item: Item) => void) | undefined = undefined

  let open = false
  let value = ''

  $: selectedValue = items.find((i) => i.value === value)?.label ?? buttonLabel

  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the
  // rest of the form with the keyboard.
  function closeAndFocusTrigger(triggerId: string) {
    open = false
    tick().then(() => {
      document.getElementById(triggerId)?.focus()
    })
  }
</script>

<Popover.Root bind:open let:ids>
  <Popover.Trigger asChild let:builder>
    <Button
      builders={[builder]}
      variant="outline"
      role="combobox"
      aria-expanded={open}
      class="w-[200px] justify-between"
    >
      {selectedValue}
      <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </Popover.Trigger>
  <Popover.Content class="w-[200px] p-0">
    <Command.Root>
      <Command.Input {placeholder} />
      <Command.Empty>{emptyMessage}</Command.Empty>
      <Command.Group>
        {#each items as item}
          <!-- IDEA: Maybe hide items that are not relevant, only show top 5 most relevant to improve performance -->
          <Command.Item
            value={item.value}
            onSelect={(currentValue) => {
              value = currentValue
              closeAndFocusTrigger(ids.trigger)
              onSelect?.(item)
            }}
          >
            <Check
              class={cn(
                'mr-2 h-4 w-4',
                value !== item.value && 'text-transparent',
              )}
            />
            {item.label}
          </Command.Item>
        {/each}
      </Command.Group>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
