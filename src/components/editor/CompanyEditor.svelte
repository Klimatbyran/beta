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

  import { saveBasicInfo, saveEmissions, saveGoals, saveInitiatives } from '@/data/companies'

  async function handleSave(event: CustomEvent<FormData>) {
    const formData = event.detail
    
    saving = true
    error = null
    try {
      // Spara grundinformation
      await saveBasicInfo(company.wikidataId, {
        name: company.name,
        description: company.description,
        url: company.url,
        internalComment: company.internalComment
      })

      // Spara utsläpp om det finns en period med utsläppsdata
      const latestPeriod = company.reportingPeriods.find(period => period.emissions)
      if (latestPeriod?.emissions) {
        await saveEmissions(company.wikidataId, latestPeriod.id, latestPeriod.emissions)
      }

      // Spara mål
      await saveGoals(company.wikidataId, company.goals)

      // Spara initiativ
      await saveInitiatives(company.wikidataId, company.initiatives)

      // Lägg till metadata från formuläret
      if (formData.get('comment')) {
        // TODO: Uppdatera metadata för varje sektion med kommentar och källfil
      }
      
      showSaveDialog = false
    } catch (err) {
      error = err instanceof Error ? err.message : 'Ett fel uppstod vid sparande'
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
