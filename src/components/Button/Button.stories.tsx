import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Button } from './index';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '## Button 按钮\n\n常用的操作按钮，支持多种类型、尺寸和状态。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'default', 'danger', 'link'],
      description: '按钮类型',
      table: {
        type: { summary: "'primary' | 'default' | 'danger' | 'link'" },
        defaultValue: { summary: "'default'" },
      },
    },
    size: {
      control: 'select',
      options: ['large', 'middle', 'small'],
      description: '按钮尺寸',
      table: {
        type: { summary: "'large' | 'middle' | 'small'" },
        defaultValue: { summary: "'middle'" },
      },
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: '是否加载中',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: 'text',
      description: '按钮内容',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    htmlType: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML button type 属性',
      table: {
        type: { summary: "'button' | 'submit' | 'reset'" },
        defaultValue: { summary: "'button'" },
      },
    },
    href: {
      control: 'text',
      description: '链接地址（type="link" 时生效）',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} as Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: 'primary',
    children: 'Primary Button',
  },
};

export const Default: Story = {
  args: {
    type: 'default',
    children: 'Default Button',
  },
};

export const Danger: Story = {
  args: {
    type: 'danger',
    children: 'Danger Button',
  },
};

export const Link: Story = {
  args: {
    type: 'link',
    href: 'https://example.com',
    children: 'Link Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large Button',
  },
};

export const Middle: Story = {
  args: {
    size: 'middle',
    children: 'Middle Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small Button',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading Button',
  },
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button type="primary">Primary</Button>
      <Button type="default">Default</Button>
      <Button type="danger">Danger</Button>
      <Button type="link" href="https://example.com">Link</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button size="large">Large</Button>
      <Button size="middle">Middle</Button>
      <Button size="small">Small</Button>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </div>
  ),
};
