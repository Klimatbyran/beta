<script lang="ts">
  import { onMount } from 'svelte'
  import LucidePencil from '~icons/lucide/pencil'

  import { getCompanyURL } from '../../data/companyData'
  import { buttonVariants } from '../ui/button/index'
  import type { CompanyDetails } from '../../lib/api/types'

  type Props = {
    company: CompanyDetails
  }
  let { company }: Props = $props()

  let userIsEditor = $state(false)

  onMount(() => {
    userIsEditor = Boolean(localStorage.editToken?.length)
  })
</script>

{#if userIsEditor}
  <a
    href={`/foretag/${getCompanyURL(company)}/edit`}
    class={buttonVariants({ variant: 'default', size: 'default' })}
  >
    <LucidePencil class="mr-2 size-4" /> Redigera
  </a>
{/if}
