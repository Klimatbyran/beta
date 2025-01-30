<script lang="ts">
  import * as Dialog from '@/components/ui/dialog'
  import { Button } from '../ui/button'

  type Props = {
    open?: boolean
    saving?: boolean
    onsubmit?: (metadata: { comment: string; source: string }) => Promise<void>
  }

  let { open = $bindable(false), onsubmit }: Props = $props()
  let saving = $state(false)

  // TODO: Improve handling of the metadata.
  // A big problem right now is that saving changes overwrites all previous metadata, even for data points that were not changed.
  // This means we lose the metadata (including comment and source) for almost all data points, for all reporting periods.
  // NOTE: This needs to be solved before we can deploy this to production
  let metadata = $state({
    comment: '',
    source: '',
  })

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault()

    saving = true
    await onsubmit?.(metadata)
    saving = false
  }
</script>

<Dialog.Root bind:open>
  <Dialog.Content>
    <Dialog.Header>
      <div class="flex items-center gap-3">
        <div class="rounded-full bg-gray-300 size-10"></div>
        <!-- <img
          src="/placeholder-user.jpg"
          alt="Användarens profilbild"
          class="h-10 w-10 rounded-full object-cover"
        /> -->
        <div>
          <Dialog.Title>Spara ändringar</Dialog.Title>
          <Dialog.Description class="pt-2">
            Lägg till en kommentar och eventuell källa för dina ändringar.
          </Dialog.Description>
        </div>
      </div>
    </Dialog.Header>

    <form class="grid gap-4" onsubmit={handleSubmit}>
      <div class="grid gap-2">
        <label for="comment" class="text-sm font-medium">Kommentar</label>
        <textarea
          id="comment"
          bind:value={metadata.comment}
          rows="3"
          class="rounded-md bg-gray-700 px-4 py-2"
          placeholder="Beskriv dina ändringar..."
          required
        ></textarea>
      </div>

      <div class="grid gap-2">
        <label for="source" class="text-sm font-medium">Källa (valfritt)</label>
        <input
          id="source"
          type="text"
          placeholder="T.ex. länk till rapporten"
          bind:value={metadata.source}
          class="rounded-md bg-gray-700 px-4 py-2"
        />
      </div>

      <Dialog.Footer>
        <Button variant="outline" on:click={() => (open = false)}>Avbryt</Button
        >
        <Button type="submit" disabled={saving}>
          {saving ? 'Sparar...' : 'Spara'}
        </Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
