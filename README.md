# 📝 react-context-menu

Minimal context menu components for React.

## Installation

```bash
npm i --save @totase/react-context-menu
```

## Usage

Import the `ContextMenu` component and structure your menu with items and separators.

```tsx
import { ContextMenu } from '@totase/react-context-menu';

...

return (
  <>
    <div id="context-menu-trigger">I will trigger the menu when right clicked</div>

    <ContextMenu triggerId="context-menu-trigger">
      <ContextMenu.Item onClick={() => console.log("what up")}>Item 1</ContextMenu.Item>
      <ContextMenu.Item disabled>Disabled item</ContextMenu.Item>
      <ContextMenu.Separator />
      <ContextMenu.Item onClick={() => console.log("what up")}>Item 3</ContextMenu.Item>
    </ContextMenu>
  </>
)
```

Alternatively

```tsx
import { ContextMenu, MenuItem, Separator } from '@totase/react-context-menu';

...

return (
  <>
    <div id="context-menu-trigger">I will trigger the menu when right clicked</div>

    <ContextMenu triggerId="context-menu-trigger">
      <MenuItem onClick={() => console.log("what up")}>Item 1</MenuItem>
      <MenuItem disabled>Disabled item</MenuItem>
      <Separator />
      <MenuItem onClick={() => console.log("what up")}>Item 3</MenuItem>
    </ContextMenu>
  </>
)
```

## License

react-context-menu is licensed under MIT.
