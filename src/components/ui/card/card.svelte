<script lang="ts">
  import { cardVariants, type Props } from '.'

  type $$Props = Props

  export let level: $$Props['level'] = 1
  let className: $$Props['class'] = undefined
  export { className as class }
</script>

<div class={cardVariants({ level, className })} {...$$restProps}>
  <slot />
</div>
