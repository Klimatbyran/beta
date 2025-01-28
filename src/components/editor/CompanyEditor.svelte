<script lang="ts">
  import {onMount} from 'svelte'
  import { Button } from '../ui/button'
  import { Card } from '../ui/card'
  import { toast } from 'sonner'
  import BasicInfoEditor from './BasicInfoEditor.svelte'
  import GoalsEditor from './GoalsEditor.svelte'
  import ReportingPeriodsEditor from './ReportingPeriodsEditor.svelte'
  import InitiativesEditor from './InitiativesEditor.svelte'
  import { client } from '@/lib/api/request'
  import type {
    CompanyDetails,
    UpdateReportingPeriods,
    // UpdateGoals,
    // UpdateInitiatives,
    // UpdateIndustry,
    // UpdateCompanyDetails,
  } from '@/lib/api/types'
  import SaveDialog from './SaveDialog.svelte'
  import type { ValidationError } from '@/data/companies'
  import type { Scope3CategoryStrings } from '@/content/config'
  import { editByReportingPeriod } from './editor.svelte'



  type Props = {
    company: CompanyDetails
    scope3CategoryStrings: Scope3CategoryStrings
  }
  let { company, scope3CategoryStrings }: Props = $props()

  onMount(() => {
    editByReportingPeriod.setCompany(company)
  })


  // let updateGoals = $state<UpdateGoals['goals']>({
  //   description: company.goals?.description ?? undefined,
  //   year: company.goals?.year ?? undefined,
  //   target: company.goals?.target ?? undefined,
  //   baseYear: company.goals?.baseYear ?? undefined,
  // })
  // let updateInitiatives = $state<UpdateInitiatives>( {
  //     return {
  //       title: title ? title : undefined,
  //       description: description ? description : undefined,
  //       year: year ? year : undefined,
  //       scope: scope ? scope : undefined,
  //     }
  //   }),
  // let updateIndustry = $state<UpdateIndustry>(
  //   company.industry((industry) => industry),
  // )
  // let updateCompanyDetails = $state<UpdateCompanyDetails>(
  //   company.map((description, name) => {
  //     return {
  //       description: description ? description : undefined,
  //       name: name ? name : undefined,
  //     }
  //   }),
  // )

  let saving = false
  let error: string | ValidationError | null = null

  let showSaveDialog = false

  async function handleSave(event: CustomEvent<FormData>) {
    const formData = event.detail
    saving = true
    error = null
    try {
      // Spara grundinformation
      const { data: companyData, error } = await client.POST('/companies/', {
        body: {
          wikidataId: company.wikidataId,
          name: company.name,
          description: company.description ? company.description : undefined,
          url: (formData.get('url') as string) ?? undefined,
          internalComment:
            (formData.get('internalComment') as string) ?? undefined,
          tags: (formData.get('tags') as unknown as string[]) ?? undefined,
        },
      })

      if (!companyData?.ok || !companyData || error) {
        throw new Error('Ogiltig data från API')
      }
      console.log('Saved company details') // Debug logging

      // Spara utsläpp om det finns en period med utsläppsdata
      const latestPeriod = company.reportingPeriods.find(
        (period) => period.emissions,
      )
      if (latestPeriod?.emissions) {
        const { data: emissionsData, error: emissionsError } =
          await client.POST('/companies/{wikidataId}/reporting-periods', {
            params: { path: { wikidataId: company.wikidataId } },
            body: {
              reportingPeriods: editByReportingPeriod.reportingPeriods
            },
          })

        if (!emissionsData?.ok || !emissionsData || emissionsError) {
          throw new Error('Ogiltig data från API')
        }
        console.log('Saved emissions data') // Debug logging
      }

      // // Spara mål
      // const { data: goalsData, error: goalsError } = await client.POST(
      //   '/companies/{wikidataId}/goals',
      //   {
      //     path: { wikidataId: company.wikidataId },
      //     body: {
      //       goals: {
      //         description: company.goals.description,
      //         year: company.goals.year,
      //         target: company.goals.target,
      //         baseYear: company.goals.baseYear,
      //       },
      //       metadata: {
      //         comment: (formData.get('comment') as string) ?? undefined,
      //         sourceFile: (formData.get('sourceFile') as string) ?? undefined,
      //       },
      //     },
      //   },
      // )

      // if (!goalsData?.ok || !goalsData || goalsError) {
      //   throw new Error('Ogiltig data från API')
      // }
      // console.log('Saved goals data') // Debug logging

      // Spara initiativ
      // const { data: initiativeData, error: initiativeError } =
      //   await client.POST('/companies/{wikidataId}/initiatives', {
      //     path: { wikidataId: company.wikidataId },
      //     body: {
      //       initiatives: {
      //         title: company.initiatives.title,
      //         description: company.initiatives.description,
      //         year: company.initiatives.year,
      //         scope: company.initiatives.scope,
      //       },
      //       metadata: {
      //         comment: (formData.get('comment') as string) ?? undefined,
      //         sourceFile: (formData.get('sourceFile') as string) ?? undefined,
      //       },
      //     },
      //   })

      // if (!initiativeData?.ok || !initiativeData || initiativeError) {
      //   throw new Error('Ogiltig data från API')
      // }
      // console.log('Saved initiative data') // Debug logging

      // Lägg till metadata från formuläret
      if (formData.get('comment')) {
        // TODO: Uppdatera metadata för varje sektion med kommentar och källfil
      }

      showSaveDialog = false
      toast.success('Ändringarna har sparats')
    } catch (err) {
      if (err instanceof Error) {
        const validationError = err.cause as ValidationError
        error =
          validationError?.error === 'Validation failed'
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
  <ReportingPeriodsEditor
    {scope3CategoryStrings}
  />
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
                  <span class="font-medium">{detail.field}:</span>
                  {detail.message}
                </li>
              {/each}
            </ul>
            <p class="mt-2 text-sm">{error.help}</p>
          </div>
        {/if}
      {/if}
    </div>
    <Button on:click={() => (showSaveDialog = true)} disabled={saving}>
      Spara ändringar
    </Button>

    <SaveDialog bind:open={showSaveDialog} bind:saving on:save={handleSave} />
  </Card>
</div>
