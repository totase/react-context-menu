import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { ContextMenu } from '../components';
import { StoryWrapper } from './components';

const TRIGGER_ID = 'storybook-trigger';

const meta = {
  title: 'Context Menu',
  component: ContextMenu,
  decorators: [
    (Story) => (
      <StoryWrapper triggerId={TRIGGER_ID}>
        <Story />
      </StoryWrapper>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  args: { triggerId: TRIGGER_ID },
} satisfies Meta<typeof ContextMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: [
      <ContextMenu.Item onClick={fn()}>Item 1</ContextMenu.Item>,
      <ContextMenu.Item onClick={fn()}>Item 2</ContextMenu.Item>,
      <ContextMenu.Item onClick={fn()}>Item 3</ContextMenu.Item>,
    ],
  },
};

export const DisabledItem: Story = {
  args: {
    children: [
      <ContextMenu.Item onClick={fn()}>Item 1</ContextMenu.Item>,
      <ContextMenu.Item onClick={fn()} disabled>
        Item 2
      </ContextMenu.Item>,
      <ContextMenu.Item onClick={fn()}>Item 3</ContextMenu.Item>,
    ],
  },
};

export const Separator: Story = {
  args: {
    children: [
      <ContextMenu.Item onClick={fn()}>Item 1</ContextMenu.Item>,
      <ContextMenu.Separator />,
      <ContextMenu.Item onClick={fn()}>Item 2</ContextMenu.Item>,
      <ContextMenu.Item onClick={fn()}>Item 3</ContextMenu.Item>,
    ],
  },
};

export const SubMenu: Story = {
  args: {
    children: [
      <ContextMenu.Item onClick={fn()}>Item 1</ContextMenu.Item>,
      <ContextMenu.Item onClick={fn()}>Item 2</ContextMenu.Item>,
      <ContextMenu.Separator />,
      <ContextMenu.SubMenu label="Sub Menu">
        <ContextMenu.Item onClick={fn()}>Sub item 2</ContextMenu.Item>
        <ContextMenu.Item onClick={fn()}>Sub item 3</ContextMenu.Item>
      </ContextMenu.SubMenu>,
    ],
  },
};
