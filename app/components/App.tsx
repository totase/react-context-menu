import { ContextMenu } from '../../src';

const App = () => {
  const handleClick = () => {
    console.log('Item clicked');
  };

  return (
    <>
      <div className="centered">
        <p id="context-menu-trigger">Right click to trigger</p>
      </div>

      <ContextMenu triggerId="context-menu-trigger">
        <ContextMenu.Item disabled>Item 1</ContextMenu.Item>
        <ContextMenu.Item onClick={handleClick}>Item 2</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item onClick={handleClick}>Item 3</ContextMenu.Item>
      </ContextMenu>
    </>
  );
};

export default App;
