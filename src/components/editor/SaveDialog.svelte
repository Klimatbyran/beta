<script lang="ts">
  import * as Dialog from '@/components/ui/dialog'
  import { Button } from '../ui/button'

  export let open = false
  export let saving = false

  let comment = ''
  let fileInput: HTMLInputElement
  
  function handleSubmit() {
    const formData = new FormData()
    formData.append('comment', comment)
    if (fileInput?.files?.[0]) {
      formData.append('source', fileInput.files[0])
    }
    saving = true
    // Return the form data to parent
    dispatch('save', formData)
  }

  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
</script>

<Dialog.Root bind:open>
  <Dialog.Content>
    <Dialog.Header>
      <div class="flex items-center gap-3">
        <img 
          src="/placeholder-user.jpg" 
          alt="Användarens profilbild"
          class="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <Dialog.Title>Spara ändringar</Dialog.Title>
          <Dialog.Description>
            Lägg till en kommentar och eventuell källfil för dina ändringar.
          </Dialog.Description>
        </div>
      </div>
    </Dialog.Header>

    <form class="grid gap-4" on:submit|preventDefault={handleSubmit}>
      <div class="grid gap-2">
        <label for="comment" class="text-sm font-medium">Kommentar</label>
        <textarea
          id="comment"
          bind:value={comment}
          rows="3"
          class="rounded-md bg-gray-700 px-4 py-2"
          placeholder="Beskriv dina ändringar..."
          required
        />
      </div>

      <div class="grid gap-2">
        <label for="source" class="text-sm font-medium">Källfil (valfritt)</label>
        <input
          id="source"
          type="file"
          bind:this={fileInput}
          accept=".pdf,image/*"
          class="rounded-md bg-gray-700 px-4 py-2"
        />
        <p class="text-xs text-muted">Accepterar PDF eller bilder</p>
      </div>

      <Dialog.Footer>
        <Button variant="outline" on:click={() => (open = false)}>Avbryt</Button>
        <Button type="submit" disabled={saving}>
          {saving ? 'Sparar...' : 'Spara'}
        </Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
