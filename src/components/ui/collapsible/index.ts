import { Collapsible as CollapsiblePrimitive } from 'bits-ui'
import Content from './collapsible-content.svelte'
import Button from './button.svelte'

const Root = CollapsiblePrimitive.Root
const Trigger = CollapsiblePrimitive.Trigger
const CollapsibleButton = Button // Export your Button here

export {
  Root,
  Content,
  Trigger,
  CollapsibleButton as Button, // Export the button here

  //
  Root as Collapsible,
  Content as CollapsibleContent,
  Trigger as CollapsibleTrigger,
}
