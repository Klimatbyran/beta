<script lang="ts">
  import LucideExternalLink from '~icons/lucide/external-link'

  import { getCompanyURL } from '../../data/companyData'
  import { buttonVariants } from '../ui/button/index'
  import type { CompanyDetails } from '../../lib/api/types'

  type Props = {
    company: Pick<CompanyDetails, 'name' | 'wikidataId'>
    variant?: 'default' | 'outline'
  }
  let { company, variant = 'default' }: Props = $props()
</script>

<a
  href={`/foretag/${getCompanyURL(company)}`}
  class={buttonVariants({ variant, size: 'default' })}
  ><LucideExternalLink class="mr-2 size-4" /> Visa</a
>
