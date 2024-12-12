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
  let error: string | ValidationError | null = null

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
      if (err instanceof Error) {
        const validationError = err.cause as ValidationError
        error = validationError?.error === 'Validation failed' 
          ? validationError 
          : err.message
      } else {
        error = 'Ett fel uppstod vid sparande'
      }
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
        {#if typeof error === 'string'}
          <p class="text-red-500">{error}</p>
        {:else}
          <div class="text-red-500">
            <p>{error.error}</p>
            <ul class="mt-2 list-disc pl-4">
              {#each error.details as detail}
                <li>
                  <span class="font-medium">{detail.field}:</span> {detail.message}
                </li>
              {/each}
            </ul>
            <p class="mt-2 text-sm">{error.help}</p>
          </div>
        {/if}
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
