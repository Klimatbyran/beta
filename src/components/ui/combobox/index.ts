import Combobox from './combobox.svelte'

export type Item<T = string> = {
  value: string
  label: string
  data: T
}

export { Combobox }
