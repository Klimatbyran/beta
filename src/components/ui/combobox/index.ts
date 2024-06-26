import Combobox from './combobox.svelte'

export type Item<T> = {
  value: string
  label: string
  data: T
}

export { Combobox }
