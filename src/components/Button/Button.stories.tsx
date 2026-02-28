import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonProps } from './index';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `# Button 按钮

常用的操作按钮，支持多种类型、尺寸和状态。

## 何时使用

- 标记一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。
- 用于表单提交、弹窗确认、流程导航等场景。

## API

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| type | 按钮类型 | \`'primary' \| 'default' \| 'danger' \| 'link'\` | \`'default'\` | 否 |
| size | 按钮尺寸 | \`'large' \| 'middle' \| 'small'\` | \`'middle'\` | 否 |
| disabled | 是否禁用 | \`boolean\` | \`false\` | 否 |
| loading | 是否加载中 | \`boolean\` | \`false\` | 否 |
| onClick | 点击事件 | \`(event: React.MouseEvent<HTMLButtonElement>) => void\` | - | 否 |
| className | 自定义类名 | \`string\` | - | 否 |
| children | 按钮内容 | \`React.ReactNode\` | - | 否 |
| htmlType | HTML按钮类型 | \`'button' \| 'submit' \| 'reset'\` | \`'button'\` | 否 |
| href | 链接地址（type="link"时生效） | \`string\` | - | 否 |
| target | 链接打开方式（type="link"时生效） | \`string\` | - | 否 |

## 代码示例`,
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
        category: 'Appearance',
      },
    },
    size: {
      control: 'select',
      options: ['large', 'middle', 'small'],
      description: '按钮尺寸',
      table: {
        type: { summary: "'large' | 'middle' | 'small'" },
        defaultValue: { summary: "'middle'" },
        category: 'Appearance',
      },
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
    loading: {
      control: 'boolean',
      description: '是否加载中',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
    onClick: {
      description: '点击事件',
      table: {
        type: { summary: '(event: React.MouseEvent<HTMLButtonElement>) => void' },
        category: 'Events',
      },
    },
    className: {
      control: 'text',
      description: '自定义类名',
      table: {
        type: { summary: 'string' },
        category: 'General',
      },
    },
    children: {
      control: 'text',
      description: '按钮内容',
      table: {
        type: { summary: 'ReactNode' },
        category: 'Content',
      },
    },
    htmlType: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML button type 属性',
      table: {
        type: { summary: "'button' | 'submit' | 'reset'" },
        defaultValue: { summary: "'button'" },
        category: 'HTML Attributes',
      },
    },
    href: {
      control: 'text',
      description: '链接地址（type="link" 时生效）',
      table: {
        type: { summary: 'string' },
        category: 'Link',
      },
    },
    target: {
      control: 'text',
      description: '链接打开方式（type="link" 时生效）',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
        category: 'Link',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 基础按钮示例
 */
export const Basic: Story = {
  args: {
    children: '基础按钮',
    disabled: false,
    loading: false,
    type: "primary"
  },
  parameters: {
    docs: {
      description: {
        story: '基础按钮，默认样式和中等尺寸。',
      },
    },
  },
};

/**
 * 主要按钮示例
 */
export const Primary: Story = {
  args: {
    type: 'primary',
    children: '主要按钮',
  },
  parameters: {
    docs: {
      description: {
        story: '用于主要操作，视觉上最突出的按钮。',
      },
    },
  },
};

/**
 * 危险按钮示例
 */
export const Danger: Story = {
  args: {
    type: 'danger',
    children: '危险按钮',
  },
  parameters: {
    docs: {
      description: {
        story: '用于危险操作，如删除、取消等。',
      },
    },
  },
};

/**
 * 链接按钮示例
 */
export const Link: Story = {
  args: {
    type: 'link',
    href: 'https://example.com',
    target: '_blank',
    children: '链接按钮',
  },
  parameters: {
    docs: {
      description: {
        story: '链接样式的按钮，点击后跳转到指定URL。',
      },
    },
  },
};

/**
 * 不同尺寸示例
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button size="large">大号按钮</Button>
      <Button size="middle">中等按钮</Button>
      <Button size="small">小号按钮</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '按钮支持三种尺寸：大(large)、中(middle)、小(small)。',
      },
    },
  },
};

/**
 * 禁用状态示例
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: '禁用按钮',
  },
  parameters: {
    docs: {
      description: {
        story: '禁用状态的按钮，不可点击。',
      },
    },
  },
};

/**
 * 加载状态示例
 */
export const Loading: Story = {
  args: {
    loading: true,
    children: '加载中...',
  },
  parameters: {
    docs: {
      description: {
        story: '加载状态的按钮，显示加载图标并禁止点击。',
      },
    },
  },
};

/**
 * 表单按钮示例
 */
export const FormButtons: Story = {
  render: () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert('表单已提交！');
      }}
      style={{ display: 'flex', gap: '12px' }}
    >
      <Button htmlType="submit" type="primary">
        提交
      </Button>
      <Button htmlType="reset" type="default">
        重置
      </Button>
      <Button onClick={() => alert('取消操作')}>取消</Button>
    </form>
  ),
  parameters: {
    docs: {
      description: {
        story: '按钮在表单中的应用，支持submit、reset等类型。',
      },
    },
  },
};

/**
 * 组合示例
 */
export const Combinations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button type="primary" size="large">
          主要大按钮
        </Button>
        <Button type="danger" size="small">
          危险小按钮
        </Button>
        <Button type="link" href="#" size="middle">
          链接按钮
        </Button>
      </div>
      
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button disabled type="primary">
          禁用主要按钮
        </Button>
        <Button loading type="default">
          加载中按钮
        </Button>
        <Button disabled loading>
          禁用并加载中
        </Button>
      </div>
      
      <div>
        <Button 
          type="primary" 
          onClick={() => console.log('按钮被点击')}
          style={{ marginRight: '12px' }}
        >
          带点击事件
        </Button>
        <Button
          type="link"
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          在新窗口打开
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '各种属性组合的按钮示例。',
      },
    },
  },
};

/**
 * 交互式调试面板
 */
export const Playground: Story = {
  args: {
    type: 'primary',
    size: 'middle',
    children: '调试按钮',
    disabled: false,
    loading: false,
    href: 'https://example.com',
    target: '_blank',
  },
  argTypes: {
    children: {
      control: 'text',
    },
    onClick: {
      action: 'clicked',
    },
  },
  parameters: {
    docs: {
      description: {
        story: '交互式调试面板，可以调整所有属性并实时查看效果。',
      },
    },
  },
};
