import type { Meta, StoryObj } from '@storybook/react';

import { ContextMenu } from '../components';
import { StoryWrapper } from './components';

const TRIGGER_ID = 'storybook-trigger';

const meta = {
  title: 'Context Menu',
  component: ContextMenu,
  parameters: {
    layout: 'centered',
  },
  args: { triggerId: TRIGGER_ID },
} satisfies Meta<typeof ContextMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

const clickFunction = () => {
  console.log('Item clicked');
};

export const Default: Story = {
  args: {
    children: [
      <ContextMenu.Item onClick={() => clickFunction()}>Item 1</ContextMenu.Item>,
      <ContextMenu.Item onClick={() => clickFunction()}>Item 2</ContextMenu.Item>,
      <ContextMenu.Item onClick={() => clickFunction()}>Item 3</ContextMenu.Item>,
    ],
  },
  render: (args) => (
    <StoryWrapper triggerId={TRIGGER_ID}>
      <ContextMenu {...args} />
    </StoryWrapper>
  ),
};

export const WithoutExitAnimation: Story = {
  args: {
    animateExit: false,
    children: [
      <ContextMenu.Item onClick={() => clickFunction()}>Item 1</ContextMenu.Item>,
      <ContextMenu.Item onClick={() => clickFunction()}>Item 2</ContextMenu.Item>,
      <ContextMenu.Item onClick={() => clickFunction()}>Item 3</ContextMenu.Item>,
    ],
  },
  render: (args) => (
    <StoryWrapper triggerId={TRIGGER_ID}>
      <ContextMenu {...args} />
    </StoryWrapper>
  ),
};

export const ClickTrigger: Story = {
  args: {
    triggerEvent: 'click',
    children: [
      <ContextMenu.Item onClick={() => clickFunction()}>Item 1</ContextMenu.Item>,
      <ContextMenu.Item onClick={() => clickFunction()}>Item 2</ContextMenu.Item>,
      <ContextMenu.Item onClick={() => clickFunction()}>Item 3</ContextMenu.Item>,
    ],
  },
  render: (args) => (
    <StoryWrapper triggerId={TRIGGER_ID} triggerText="Left-click to trigger menu">
      <ContextMenu {...args} />
    </StoryWrapper>
  ),
};

export const DisabledItem: Story = {
  args: {
    children: [
      <ContextMenu.Item onClick={() => clickFunction()}>Item 1</ContextMenu.Item>,
      <ContextMenu.Item onClick={() => clickFunction()} disabled>
        Item 2
      </ContextMenu.Item>,
      <ContextMenu.Item onClick={() => clickFunction()}>Item 3</ContextMenu.Item>,
    ],
  },
  render: (args) => (
    <StoryWrapper triggerId={TRIGGER_ID}>
      <ContextMenu {...args} />
    </StoryWrapper>
  ),
};

export const Separator: Story = {
  args: {
    children: [
      <ContextMenu.Item onClick={() => clickFunction()}>Item 1</ContextMenu.Item>,
      <ContextMenu.Separator />,
      <ContextMenu.Item onClick={() => clickFunction()}>Item 2</ContextMenu.Item>,
      <ContextMenu.Item onClick={() => clickFunction()}>Item 3</ContextMenu.Item>,
    ],
  },
  render: (args) => (
    <StoryWrapper triggerId={TRIGGER_ID}>
      <ContextMenu {...args} />
    </StoryWrapper>
  ),
};

export const SubMenu: Story = {
  args: {
    children: [
      <ContextMenu.Item onClick={() => clickFunction()}>Item 1</ContextMenu.Item>,
      <ContextMenu.Item onClick={() => clickFunction()}>Item 2</ContextMenu.Item>,
      <ContextMenu.Separator />,
      <ContextMenu.SubMenu label="Sub Menu">
        <ContextMenu.Item onClick={() => clickFunction()}>Sub item 2</ContextMenu.Item>
        <ContextMenu.Item onClick={() => clickFunction()}>Sub item 3</ContextMenu.Item>
      </ContextMenu.SubMenu>,
    ],
  },
  render: (args) => (
    <StoryWrapper triggerId={TRIGGER_ID}>
      <ContextMenu {...args} />
    </StoryWrapper>
  ),
};

export const SubMenuIndicator: Story = {
  args: {
    children: [
      <ContextMenu.Item onClick={() => clickFunction()}>Item 1</ContextMenu.Item>,
      <ContextMenu.Separator />,
      <ContextMenu.SubMenu label="Sub Menu" iconElement={<span>▶</span>}>
        <ContextMenu.Item onClick={() => clickFunction()}>Sub item 2</ContextMenu.Item>
        <ContextMenu.Item onClick={() => clickFunction()}>Sub item 3</ContextMenu.Item>
      </ContextMenu.SubMenu>,
    ],
  },
  render: (args) => (
    <StoryWrapper triggerId={TRIGGER_ID}>
      <ContextMenu {...args} />
    </StoryWrapper>
  ),
};
