<script lang="ts">
  import { Card } from '../ui/card'
  import TextInput from './TextInput.svelte'
  import { companyEditor } from './company-editor.svelte'
  import { buttonVariants } from '../ui/button'
  import { getCompanyURL } from '@/data/companyData'
  import LucideExternalLink from 'icons:astro/lucide/external-link'
</script>

<Card level={1} class="bg-gray-900 p-8">
  <div class="grid grid-cols-[1fr_min-content] items-center mb-8">
    <h1 class="text-balance text-3xl leading-none tracking-tight lg:text-4xl">
      Redigera {companyEditor.name}
    </h1>

    <a
      href={`/foretag/${getCompanyURL(companyEditor)}`}
      class={buttonVariants({ variant: 'default', size: 'default' })}
      ><LucideExternalLink class="mr-2 size-4" /> Visa</a
    >
  </div>

  <div class="grid gap-6">
    <label class="grid gap-3">
      <span class="text-sm text-gray-300">Namn</span>
      <TextInput bind:value={companyEditor.name} />
    </label>

    <label class="grid gap-3">
      <span class="text-sm text-gray-300">Beskrivning</span>
      <TextInput multiline bind:value={companyEditor.description} />
    </label>

    <!-- <label class="grid gap-3">
      <span class="text-sm text-gray-300">Industri</span>
      <TextInput bind:value={companyEditor.subIndustry} />
    </label> -->

    <!--
    NOTE: url and internalComment are not returned by the regular GET /companies/:wikidataId endpoint
    IDEA: One possible solution would be to have a separate API endpoint for loading the editor data,
    which would only be accessible by editors, and could return more details (hidden fields) about each company.
    The API endpoint could probably be called something like /api/admin/companies/:wikidataId to avoid complicating the main public API.
    -->
    <!-- <label class="grid gap-3">
      <span class="text-sm text-gray-300">URL</span>
      <input
        type="url"
        bind:value={company.url}
        class="rounded-xl bg-gray-800 px-4 py-3 text-lg focus:border-blue-250 focus:outline-none focus:ring-2 focus:ring-blue-250/50"
      />
    </label>

    <label class="grid gap-3">
      <span class="text-sm text-gray-300">Intern kommentar</span>
      <textarea
        bind:value={company.internalComment}
        rows="2"
        class="rounded-xl bg-gray-800 px-4 py-3 text-lg focus:border-blue-250 focus:outline-none focus:ring-2 focus:ring-blue-250/50"
      ></textarea>
    </label> -->
  </div>
</Card>
