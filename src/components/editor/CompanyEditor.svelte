<script lang="ts">
  import { Button } from '../ui/button'
  import { Card } from '../ui/card'
  import type { CompanyData } from '@/data/companyData'
  import BasicInfoEditor from './BasicInfoEditor.svelte'
  import EmissionsEditor from './EmissionsEditor.svelte'
  import GoalsEditor from './GoalsEditor.svelte'
  import InitiativesEditor from './InitiativesEditor.svelte'

  export let company: CompanyData

  let saving = false
  let error: string | null = null

  import SaveDialog from './SaveDialog.svelte'
  
  let showSaveDialog = false

  async function handleSave(event: CustomEvent<FormData>) {
    const formData = event.detail
    formData.append('company', JSON.stringify(company))
    
    saving = true
    error = null
    try {
      const response = await fetch('/api/companies', {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) {
        throw new Error('Kunde inte spara ändringar')
      }
      
      showSaveDialog = false
    } catch (err) {
      error = err instanceof Error ? err.message : 'Ett fel uppstod'
    } finally {
      saving = false
    }
  }
</script>

<div class="grid gap-8">
  <Card level={1}>
    <h1 class="text-3xl font-bold">Redigera {company.name}</h1>
  </Card>

  <BasicInfoEditor bind:company />
  <EmissionsEditor bind:company />
  <GoalsEditor bind:company />
  <InitiativesEditor bind:company />

  <Card level={1} class="flex items-center justify-between">
    <div>
      {#if error}
        <p class="text-red-500">{error}</p>
      {/if}
    </div>
    <Button on:click={() => showSaveDialog = true} disabled={saving}>
      Spara ändringar
    </Button>

    <SaveDialog 
      bind:open={showSaveDialog}
      bind:saving
      on:save={handleSave}
    />
  </Card>
</div>
