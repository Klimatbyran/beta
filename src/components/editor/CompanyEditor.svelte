<script lang="ts">
  import { onMount } from 'svelte'
  import { Button } from '../ui/button'
  import { Card } from '../ui/card'
  import { toast } from 'sonner'
  import BasicInfoEditor from './BasicInfoEditor.svelte'
  import ReportingPeriodsEditor from './ReportingPeriodsEditor.svelte'
  import { client } from '@/lib/api/request'
  import type {
    CompanyDetails,
    // UpdateGoals,
    // UpdateInitiatives,
    // UpdateIndustry,
    // UpdateCompanyDetails,
  } from '@/lib/api/types'
  import SaveDialog from './SaveDialog.svelte'
  import type { Scope3CategoryStrings } from '@/content/config'
  import { editByReportingPeriod } from './reporting-periods-editor.svelte'
  import { companyEditor } from './company-editor.svelte'
  import ShowCompanyLink from './ShowCompanyLink.svelte'

  type Props = {
    company: CompanyDetails
    scope3CategoryStrings: Scope3CategoryStrings
  }
  let { company, scope3CategoryStrings }: Props = $props()

  onMount(() => {
    editByReportingPeriod.init(company)
    companyEditor.init(company)
  })

  let saving = $state(false)
  let error = $state<string | undefined>()
  let showSaveDialog = $state(false)

  async function saveReportingPeriods(metadata: {
    comment: string
    source: string
  }) {
    saving = true
    error = undefined

    const reportingPeriodsResponse = await client.POST(
      '/companies/{wikidataId}/reporting-periods',
      {
        params: { path: { wikidataId: company.wikidataId } },
        body: {
          reportingPeriods: editByReportingPeriod.getUpdatedReportingPeriods(),
          metadata,
        },
      },
    )

    saving = false
    showSaveDialog = false

    if (!reportingPeriodsResponse.response.ok) {
      console.error(reportingPeriodsResponse.response)
      error = reportingPeriodsResponse.response.statusText
    } else {
      error = reportingPeriodsResponse.error
      console.log('Saved reporting periods')
    }
  }

  async function handleSave(event: CustomEvent<FormData>) {
    const formData = event.detail
    saving = true
    error = undefined
    try {
      // Spara grundinformation
      const { data: companyData, error } = await client.POST('/companies/', {
        body: {
          wikidataId: company.wikidataId,
          name: company.name,
          description: company.description ? company.description : undefined,
          // url: (formData.get('url') as string) ?? undefined,
          // internalComment:
          // (formData.get('internalComment') as string) ?? undefined,
          // tags: (formData.get('tags') as unknown as string[]) ?? undefined,
        },
      })

      if (!companyData?.ok || !companyData || error) {
        throw new Error('Ogiltig data från API')
      }
      console.log('Saved company details')

      const reportingPeriodsResponse = await client.POST(
        '/companies/{wikidataId}/reporting-periods',
        {
          params: { path: { wikidataId: company.wikidataId } },
          body: {
            reportingPeriods:
              editByReportingPeriod.getUpdatedReportingPeriods(),
          },
        },
      )

      console.log('Saved reporting periods')

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
      // if (err instanceof Error) {
      //   const validationError = err.cause as ValidationError
      //   error =
      //     validationError?.error === 'Validation failed'
      //       ? validationError
      //       : err.message
      // } else {
      error = 'Ett fel uppstod vid sparande'
      // }
    } finally {
      saving = false
    }
  }
</script>

<div class="grid gap-8">
  <BasicInfoEditor />
  <ReportingPeriodsEditor {scope3CategoryStrings} />
  <!-- <GoalsEditor bind:company />
  <InitiativesEditor bind:company /> -->

  <Card level={1} class="flex items-center justify-between">
    <div>
      {#if error}
        {#if typeof error === 'string'}
          <p class="text-red-500">{error}</p>
        {/if}
      {/if}
    </div>

    <div class="flex gap-4 items-center">
      <Button on:click={() => (showSaveDialog = true)} disabled={saving}>
        Spara ändringar
      </Button>
      <ShowCompanyLink company={companyEditor} variant="outline" />
    </div>

    <SaveDialog bind:open={showSaveDialog} onsubmit={saveReportingPeriods} />
  </Card>
</div>
