<script lang="ts">
  import { Card } from '../ui/card'
  import NumberInput from './NumberInput.svelte'
  import { editByReportingPeriod } from './reporting-periods-editor.svelte'
  import TextInput from './TextInput.svelte'
</script>

<Card level={2} class="bg-gray-900 p-8">
  <h2 class="mb-8 text-3xl font-medium tracking-tight">
    Ekonomi för {editByReportingPeriod.selectedYear}
  </h2>

  <div class="grid gap-6">
    {#if editByReportingPeriod.economy}
      <div class="grid gap-6">
        <!-- Turnover -->
        <div>
          <h3 class="text-xl font-medium">Turnover</h3>
          <p class="text-sm text-muted">Revenue for company</p>
        </div>
        <div class="grid gap-8 sm:grid-cols-2">
          <div class="grid gap-2">
            <span>Totala</span>
            <NumberInput
              value={editByReportingPeriod.turnover?.value}
              onchange={(value) => editByReportingPeriod.setTurnover({ value })}
            />
          </div>
          <div class="grid gap-2">
            <span>Currency</span>
            <!-- IDEA: In future change this to enum/dropdown list -->
            <TextInput
              value={editByReportingPeriod.turnover?.currency}
              onchange={(currency) =>
                editByReportingPeriod.setTurnover({ currency })}
            />
          </div>
        </div>

        <!-- Employees -->
        <div class="grid gap-4">
          <div>
            <h3 class="text-xl font-medium">Total Headcount</h3>
            <p class="text-sm text-muted">Number of full-time employees.</p>
          </div>
          <div class="grid gap-8 sm:grid-cols-2">
            <div class="grid gap s-2">
              <span>Total</span>
              <NumberInput
                value={editByReportingPeriod.employees?.value}
                onchange={(value) =>
                  editByReportingPeriod.setEmployees({ value })}
              />
            </div>
            <div class="grid gap s-2">
              <span>Unit</span>
              <!-- IDEA: In future change this to enum/dropdown list -->
              <TextInput
                value={editByReportingPeriod.employees?.unit}
                onchange={(unit) =>
                  editByReportingPeriod.setEmployees({ unit })}
              />
            </div>
          </div>
        </div>
      </div>
    {:else}
      <p class="text-muted">
        Ingen ekonomidata hittades för {editByReportingPeriod.selectedYear}.
      </p>
    {/if}
  </div>
</Card>
