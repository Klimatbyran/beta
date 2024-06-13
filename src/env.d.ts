/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module 'icons:astro/*' {
  const component: (props: astroHTML.JSX.SVGAttributes) => astroHTML.JSX.Element
  export default component
}

declare module 'icons:svelte/*' {
  import { SvelteComponent } from 'svelte'
  import type { SvelteHTMLElements } from 'svelte/elements'
  export default class extends SvelteComponent<SvelteHTMLElements['svg']> {}
}
