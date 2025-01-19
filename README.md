# 📝 react-context-menu

## Installation

```bash
npm i --save @totase/react-context-menu
```

## Usage

All components are exported from the main component, `ContextMenu`, so that's the only one needed to import.

```tsx
import { ContextMenu } from '@totase/react-context-menu';

...

return (
  <>
    <div id="context-menu-trigger">I will trigger the menu when right clicked<div>

    <ContextMenu triggerId="context-menu-trigger">
      <ContextMenu.Item onClick={() => console.log("what up")}>Item 1</ContextMenu.Item>
      <ContextMenu.Item disabled>Disabled item</ContextMenu.Item>
      <ContextMenu.Separator />
      <ContextMenu.Item onClick={() => console.log("what up")}>Item 3</ContextMenu.Item>
    </ContextMenu>
  </>
)

```

## License

react-context-menu is licensed under MIT.
