<script lang="ts">
  import Check from 'icons:svelte/lucide/check'
  import ChevronsUpDown from 'icons:svelte/lucide/chevrons-up-down'
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
  export let width = 200

  let open = false
  let value = ''

  $: selectedValue = items.find((i) => i.value === value)?.label || buttonLabel

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
      class="justify-between"
      style="width: {width}px"
      aria-controls="combobox-content"
    >
      <span
        class="text-ellipsis overflow-hidden text-left"
        style="width: {width - 20}px">{selectedValue}</span
      >
      <ChevronsUpDown class="h-4 ml-1 w-4 shrink-0 opacity-50" />
    </Button>
  </Popover.Trigger>
  <Popover.Content
    class="p-0 max-h-72 overflow-y-scroll"
    id="combobox-content"
    style="width: {width}px"
  >
    <Command.Root loop>
      <Command.Input {placeholder} />
      <Command.Empty>{emptyMessage}</Command.Empty>
      <Command.Group>
        {#each items as item}
          <Command.Item
            value={item.value}
            onSelect={(currentValue) => {
              value = currentValue
              closeAndFocusTrigger(ids.trigger)
              onSelect?.(item)
            }}
            class="text-balance"
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
