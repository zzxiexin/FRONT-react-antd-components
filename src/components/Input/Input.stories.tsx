import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Input, InputProps } from './index';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `# Input 输入框

通过鼠标或键盘输入内容的基础表单组件。

## 何时使用

- 需要用户输入表单域内容时。
- 提供组合型输入框，带搜索、选择器等功能。
- 提供大小不同的输入框，适合不同场景。

## API

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| type | 输入框类型 | \`'text' \| 'password' \| 'number' \| 'textarea'\` | \`'text'\` | 否 |
| size | 输入框尺寸 | \`'large' \| 'middle' \| 'small'\` | \`'middle'\` | 否 |
| disabled | 是否禁用 | \`boolean\` | \`false\` | 否 |
| readOnly | 是否只读 | \`boolean\` | \`false\` | 否 |
| value | 输入框值 | \`string\` | - | 否 |
| defaultValue | 默认值 | \`string\` | \`''\` | 否 |
| onChange | 输入框变化时的回调 | \`(value: string, event: React.ChangeEvent) => void\` | - | 否 |
| onFocus | 输入框获得焦点时的回调 | \`(event: React.FocusEvent) => void\` | - | 否 |
| onBlur | 输入框失去焦点时的回调 | \`(event: React.FocusEvent) => void\` | - | 否 |
| onPressEnter | 按下回车时的回调 | \`(event: React.KeyboardEvent) => void\` | - | 否 |
| prefix | 输入框前缀 | \`React.ReactNode\` | - | 否 |
| suffix | 输入框后缀 | \`React.ReactNode\` | - | 否 |
| allowClear | 是否允许清除 | \`boolean\` | \`false\` | 否 |
| placeholder | 占位符 | \`string\` | \`''\` | 否 |
| className | 自定义类名 | \`string\` | - | 否 |
| style | 输入框样式 | \`React.CSSProperties\` | - | 否 |
| maxLength | 最大长度 | \`number\` | - | 否 |
| showCount | 是否显示字数统计（仅 textarea 有效） | \`boolean\` | \`false\` | 否 |
| rows | textarea 行数 | \`number\` | \`3\` | 否 |
| autoFocus | 是否自动获取焦点 | \`boolean\` | \`false\` | 否 |
| name | 原生 input 属性 | \`string\` | - | 否 |
| id | 原生 input 属性 | \`string\` | - | 否 |

## 代码示例`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'number', 'textarea'],
      description: '输入框类型',
      table: {
        type: { summary: "'text' | 'password' | 'number' | 'textarea'" },
        defaultValue: { summary: "'text'" },
        category: 'Appearance',
      },
    },
    size: {
      control: 'select',
      options: ['large', 'middle', 'small'],
      description: '输入框尺寸',
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
    readOnly: {
      control: 'boolean',
      description: '是否只读',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
    value: {
      control: 'text',
      description: '输入框值',
      table: {
        type: { summary: 'string' },
        category: 'Value',
      },
    },
    defaultValue: {
      control: 'text',
      description: '默认值',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
        category: 'Value',
      },
    },
    onChange: {
      description: '输入框变化时的回调',
      table: {
        type: { summary: '(value: string, event: React.ChangeEvent) => void' },
        category: 'Events',
      },
    },
    onFocus: {
      description: '输入框获得焦点时的回调',
      table: {
        type: { summary: '(event: React.FocusEvent) => void' },
        category: 'Events',
      },
    },
    onBlur: {
      description: '输入框失去焦点时的回调',
      table: {
        type: { summary: '(event: React.FocusEvent) => void' },
        category: 'Events',
      },
    },
    onPressEnter: {
      description: '按下回车时的回调',
      table: {
        type: { summary: '(event: React.KeyboardEvent) => void' },
        category: 'Events',
      },
    },
    prefix: {
      control: 'text',
      description: '输入框前缀',
      table: {
        type: { summary: 'React.ReactNode' },
        category: 'Content',
      },
    },
    suffix: {
      control: 'text',
      description: '输入框后缀',
      table: {
        type: { summary: 'React.ReactNode' },
        category: 'Content',
      },
    },
    allowClear: {
      control: 'boolean',
      description: '是否允许清除',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Features',
      },
    },
    placeholder: {
      control: 'text',
      description: '占位符',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
        category: 'Content',
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
    style: {
      description: '输入框样式',
      table: {
        type: { summary: 'React.CSSProperties' },
        category: 'General',
      },
    },
    maxLength: {
      control: 'number',
      description: '最大长度',
      table: {
        type: { summary: 'number' },
        category: 'Validation',
      },
    },
    showCount: {
      control: 'boolean',
      description: '是否显示字数统计（仅 textarea 有效）',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Features',
      },
    },
    rows: {
      control: 'number',
      description: 'textarea 行数',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '3' },
        category: 'Textarea',
      },
    },
    autoFocus: {
      control: 'boolean',
      description: '是否自动获取焦点',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Behavior',
      },
    },
    name: {
      control: 'text',
      description: '原生 input 属性',
      table: {
        type: { summary: 'string' },
        category: 'HTML Attributes',
      },
    },
    id: {
      control: 'text',
      description: '原生 input 属性',
      table: {
        type: { summary: 'string' },
        category: 'HTML Attributes',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 基础输入框示例
 */
export const Basic: Story = {
  args: {
    placeholder: '请输入内容',
    size: 'middle',
    disabled: false,
    readOnly: false,
  },
  parameters: {
    docs: {
      description: {
        story: '基础输入框，默认样式和中等尺寸。',
      },
    },
  },
};

/**
 * 不同尺寸示例
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input size="large" placeholder="大号输入框" />
      <Input size="middle" placeholder="中等输入框" />
      <Input size="small" placeholder="小号输入框" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '输入框支持三种尺寸：大(large)、中(middle)、小(small)。',
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
    placeholder: '禁用输入框',
    value: '无法编辑的内容',
  },
  parameters: {
    docs: {
      description: {
        story: '禁用状态的输入框，不可编辑。',
      },
    },
  },
};

/**
 * 只读状态示例
 */
export const ReadOnly: Story = {
  args: {
    readOnly: true,
    placeholder: '只读输入框',
    value: '只读内容',
  },
  parameters: {
    docs: {
      description: {
        story: '只读状态的输入框，内容不可编辑但可以选中。',
      },
    },
  },
};

/**
 * 带前缀和后缀示例
 */
export const Affix: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input prefix="￥" placeholder="带前缀的输入框" />
      <Input suffix=".com" placeholder="带后缀的输入框" />
      <Input prefix="https://" suffix=".com" placeholder="同时带前后缀" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '带前缀和后缀的输入框，用于显示固定内容如货币符号、单位等。',
      },
    },
  },
};

/**
 * 可清除示例
 */
export const Clearable: Story = {
  args: {
    allowClear: true,
    placeholder: '输入内容后可以清除',
    defaultValue: '可清除的内容',
  },
  parameters: {
    docs: {
      description: {
        story: '带清除按钮的输入框，点击清除按钮可以清空输入内容。',
      },
    },
  },
};

/**
 * 密码框示例
 */
export const Password: Story = {
  args: {
    type: 'password',
    placeholder: '请输入密码',
  },
  parameters: {
    docs: {
      description: {
        story: '密码输入框，输入内容显示为圆点。',
      },
    },
  },
};

/**
 * 文本域示例
 */
export const Textarea: Story = {
  args: {
    type: 'textarea',
    placeholder: '请输入多行文本',
    rows: 4,
  },
  parameters: {
    docs: {
      description: {
        story: '多行文本输入框，支持自定义行数。',
      },
    },
  },
};

/**
 * 带字数统计的文本域
 */
export const TextareaWithCount: Story = {
  args: {
    type: 'textarea',
    placeholder: '请输入内容',
    rows: 4,
    showCount: true,
    maxLength: 100,
  },
  parameters: {
    docs: {
      description: {
        story: '带字数统计的多行文本输入框，可限制最大输入长度。',
      },
    },
  },
};

/**
 * 不同类型示例
 */
export const Types: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input type="text" placeholder="文本输入框" />
      <Input type="password" placeholder="密码输入框" />
      <Input type="number" placeholder="数字输入框" />
      <Input type="textarea" placeholder="多行文本输入框" rows={3} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '不同类型的输入框：文本、密码、数字、多行文本。',
      },
    },
  },
};

/**
 * 交互式调试面板
 */
export const Playground: Story = {
  args: {
    type: 'text',
    size: 'middle',
    placeholder: '交互式调试面板',
    disabled: false,
    readOnly: false,
    allowClear: false,
    autoFocus: false,
  },
  argTypes: {
    onChange: {
      action: 'changed',
    },
    onFocus: {
      action: 'focused',
    },
    onBlur: {
      action: 'blurred',
    },
    onPressEnter: {
      action: 'pressed enter',
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