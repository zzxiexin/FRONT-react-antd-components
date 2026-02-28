import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Select, SelectProps, SelectOption } from './index';

const defaultOptions: SelectOption[] = [
  { value: 'option1', label: '选项一' },
  { value: 'option2', label: '选项二' },
  { value: 'option3', label: '选项三' },
  { value: 'option4', label: '选项四', disabled: true },
  { value: 'option5', label: '选项五' },
  { value: 'option6', label: '选项六' },
  { value: 'option7', label: '选项七' },
  { value: 'option8', label: '选项八' },
  { value: 'option9', label: '选项九' },
  { value: 'option10', label: '选项十' },
];

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `# Select 选择器

下拉选择器，用于从一组选项中选择一个或多个值。

## 何时使用

- 当用户需要从一组选项中进行选择时。
- 当选项数量较多，需要下拉展示时。
- 当需要支持单选、多选、搜索等功能时。

## API

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| size | 选择框大小 | \`'large' \| 'middle' \| 'small'\` | \`'middle'\` | 否 |
| disabled | 是否禁用 | \`boolean\` | \`false\` | 否 |
| allowClear | 是否允许清除 | \`boolean\` | \`false\` | 否 |
| placeholder | 占位符 | \`string\` | \`'请选择'\` | 否 |
| value | 当前选中的值（受控模式） | \`string \| number \| (string \| number)[]\` | - | 否 |
| defaultValue | 默认选中的值（非受控模式） | \`string \| number \| (string \| number)[]\` | - | 否 |
| onChange | 选择框变化时的回调 | \`(value, option) => void\` | - | 否 |
| onFocus | 获得焦点时的回调 | \`(event) => void\` | - | 否 |
| onBlur | 失去焦点时的回调 | \`(event) => void\` | - | 否 |
| onDropdownVisibleChange | 下拉框可见状态变化时的回调 | \`(visible) => void\` | - | 否 |
| options | 选项数据 | \`SelectOption[]\` | \`[]\` | 否 |
| className | 自定义类名 | \`string\` | - | 否 |
| style | 自定义样式 | \`React.CSSProperties\` | - | 否 |
| showArrow | 是否显示下拉箭头 | \`boolean\` | \`true\` | 否 |
| dropdownMatchSelectWidth | 下拉框是否与选择框同宽 | \`boolean\` | \`true\` | 否 |
| dropdownStyle | 下拉框样式 | \`React.CSSProperties\` | - | 否 |
| dropdownClassName | 下拉框类名 | \`string\` | - | 否 |
| mode | 选择模式：单选或多选 | \`'single' \| 'multiple'\` | \`'single'\` | 否 |
| maxTagCount | 最大标签数量（多选时显示） | \`number\` | - | 否 |
| tagRender | 自定义标签渲染（多选时） | \`(props) => React.ReactNode\` | - | 否 |
| showSearch | 是否显示搜索框 | \`boolean\` | \`false\` | 否 |
| filterOption | 自定义筛选函数 | \`(inputValue, option) => boolean\` | - | 否 |
| optionRender | 自定义选项渲染 | \`(option) => React.ReactNode\` | - | 否 |
| defaultOpen | 是否默认展开下拉框 | \`boolean\` | \`false\` | 否 |
| open | 下拉框是否展开（受控模式） | \`boolean\` | - | 否 |
| autoFocus | 是否自动获取焦点 | \`boolean\` | \`false\` | 否 |
| name | 原生 input 属性 | \`string\` | - | 否 |
| id | 原生 input 属性 | \`string\` | - | 否 |

### SelectOption 接口

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| value | 选项的值 | \`string \| number\` | - | 是 |
| label | 选项的显示文本 | \`React.ReactNode\` | - | 是 |
| disabled | 是否禁用该选项 | \`boolean\` | \`false\` | 否 |
| title | 选项的标题，鼠标悬停时显示 | \`string\` | - | 否 |

## 代码示例`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['large', 'middle', 'small'],
      description: '选择框大小',
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
        defaultValue: { summary: "'请选择'" },
        category: 'Content',
      },
    },
    value: {
      description: '当前选中的值',
      table: {
        type: { summary: 'string | number | (string | number)[]' },
        category: 'Value',
      },
    },
    defaultValue: {
      description: '默认选中的值',
      table: {
        type: { summary: 'string | number | (string | number)[]' },
        category: 'Value',
      },
    },
    onChange: {
      description: '选择框变化时的回调',
      table: {
        type: { summary: '(value, option) => void' },
        category: 'Events',
      },
    },
    onFocus: {
      description: '获得焦点时的回调',
      table: {
        type: { summary: '(event) => void' },
        category: 'Events',
      },
    },
    onBlur: {
      description: '失去焦点时的回调',
      table: {
        type: { summary: '(event) => void' },
        category: 'Events',
      },
    },
    onDropdownVisibleChange: {
      description: '下拉框可见状态变化时的回调',
      table: {
        type: { summary: '(visible) => void' },
        category: 'Events',
      },
    },
    options: {
      description: '选项数据',
      table: {
        type: { summary: 'SelectOption[]' },
        defaultValue: { summary: '[]' },
        category: 'Data',
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
      description: '自定义样式',
      table: {
        type: { summary: 'React.CSSProperties' },
        category: 'General',
      },
    },
    showArrow: {
      control: 'boolean',
      description: '是否显示下拉箭头',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Appearance',
      },
    },
    dropdownMatchSelectWidth: {
      control: 'boolean',
      description: '下拉框是否与选择框同宽',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Dropdown',
      },
    },
    dropdownStyle: {
      description: '下拉框样式',
      table: {
        type: { summary: 'React.CSSProperties' },
        category: 'Dropdown',
      },
    },
    dropdownClassName: {
      control: 'text',
      description: '下拉框类名',
      table: {
        type: { summary: 'string' },
        category: 'Dropdown',
      },
    },
    mode: {
      control: 'select',
      options: ['single', 'multiple'],
      description: '选择模式：单选或多选',
      table: {
        type: { summary: "'single' | 'multiple'" },
        defaultValue: { summary: "'single'" },
        category: 'Mode',
      },
    },
    maxTagCount: {
      control: 'number',
      description: '最大标签数量（多选时显示）',
      table: {
        type: { summary: 'number' },
        category: 'Multiple',
      },
    },
    tagRender: {
      description: '自定义标签渲染（多选时）',
      table: {
        type: { summary: '(props) => React.ReactNode' },
        category: 'Multiple',
      },
    },
    showSearch: {
      control: 'boolean',
      description: '是否显示搜索框',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Search',
      },
    },
    filterOption: {
      description: '自定义筛选函数',
      table: {
        type: { summary: '(inputValue, option) => boolean' },
        category: 'Search',
      },
    },
    optionRender: {
      description: '自定义选项渲染',
      table: {
        type: { summary: '(option) => React.ReactNode' },
        category: 'Customization',
      },
    },
    defaultOpen: {
      control: 'boolean',
      description: '是否默认展开下拉框',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Dropdown',
      },
    },
    open: {
      control: 'boolean',
      description: '下拉框是否展开（受控模式）',
      table: {
        type: { summary: 'boolean' },
        category: 'Dropdown',
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
 * 基础选择器示例
 */
export const Basic: Story = {
  args: {
    placeholder: '请选择',
    options: defaultOptions,
    size: 'middle',
    disabled: false,
    allowClear: false,
  },
  parameters: {
    docs: {
      description: {
        story: '基础选择器，默认单选模式。',
      },
    },
  },
};

/**
 * 不同尺寸示例
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '200px' }}>
      <Select size="large" placeholder="大号选择器" options={defaultOptions} />
      <Select size="middle" placeholder="中等选择器" options={defaultOptions} />
      <Select size="small" placeholder="小号选择器" options={defaultOptions} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '选择器支持三种尺寸：大(large)、中(middle)、小(small)。',
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
    placeholder: '禁用选择器',
    options: defaultOptions,
    value: 'option1',
  },
  parameters: {
    docs: {
      description: {
        story: '禁用状态的选择器，不可交互。',
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
    placeholder: '选择后可以清除',
    options: defaultOptions,
    value: 'option2',
  },
  parameters: {
    docs: {
      description: {
        story: '带清除按钮的选择器，点击清除按钮可以清空选择。',
      },
    },
  },
};

/**
 * 多选模式示例
 */
export const Multiple: Story = {
  args: {
    mode: 'multiple',
    placeholder: '请选择多个选项',
    options: defaultOptions,
    defaultValue: ['option1', 'option3'],
  },
  parameters: {
    docs: {
      description: {
        story: '多选模式的选择器，可以同时选择多个选项。',
      },
    },
  },
};

/**
 * 带最大标签数量的多选
 */
export const MultipleWithMaxTagCount: Story = {
  args: {
    mode: 'multiple',
    placeholder: '最多显示2个标签',
    options: defaultOptions,
    defaultValue: ['option1', 'option2', 'option3', 'option5'],
    maxTagCount: 2,
  },
  parameters: {
    docs: {
      description: {
        story: '多选模式下限制显示的标签数量，超出部分显示为"+N"。',
      },
    },
  },
};

/**
 * 带搜索功能示例
 */
export const Searchable: Story = {
  args: {
    showSearch: true,
    placeholder: '输入关键词搜索',
    options: defaultOptions,
  },
  parameters: {
    docs: {
      description: {
        story: '带搜索功能的选择器，可以输入关键词筛选选项。',
      },
    },
  },
};

/**
 * 自定义选项渲染
 */
export const CustomOptionRender: Story = {
  args: {
    placeholder: '自定义选项样式',
    options: defaultOptions,
    optionRender: (option: SelectOption) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ 
          width: '12px', 
          height: '12px', 
          borderRadius: '50%', 
          backgroundColor: option.disabled ? '#ccc' : '#1890ff',
          marginRight: '8px'
        }} />
        <span style={{ fontWeight: option.disabled ? 'normal' : 'bold' }}>
          {option.label}
        </span>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: '自定义选项的渲染方式，可以添加图标、样式等。',
      },
    },
  },
};

/**
 * 自定义标签渲染
 */
export const CustomTagRender: Story = {
  args: {
    mode: 'multiple',
    placeholder: '自定义标签样式',
    options: defaultOptions,
    defaultValue: ['option1', 'option3'],
    tagRender: ({ label, value, onClose }: { label: React.ReactNode; value: string | number; onClose: () => void }) => (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 8px',
        margin: '2px',
        backgroundColor: '#e6f7ff',
        border: '1px solid #91d5ff',
        borderRadius: '4px',
        fontSize: '12px',
      }}>
        <span style={{ marginRight: '4px' }}>🏷️</span>
        {label}
        <button
          onClick={onClose}
          style={{
            marginLeft: '4px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '12px',
            color: '#999',
          }}
        >
          ×
        </button>
      </span>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: '多选模式下自定义标签的渲染方式。',
      },
    },
  },
};

/**
 * 不同宽度的下拉框
 */
export const DropdownWidth: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <Select 
        placeholder="下拉框与选择框同宽" 
        options={defaultOptions}
        style={{ width: '200px' }}
        dropdownMatchSelectWidth={true}
      />
      <Select 
        placeholder="下拉框最小宽度" 
        options={defaultOptions}
        style={{ width: '200px' }}
        dropdownMatchSelectWidth={false}
      />
      <Select 
        placeholder="自定义下拉框宽度" 
        options={defaultOptions}
        style={{ width: '200px' }}
        dropdownStyle={{ width: '300px' }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '控制下拉框的宽度，可以与选择框同宽或自定义宽度。',
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
        <Select 
          placeholder="禁用带搜索"
          options={defaultOptions}
          disabled
          showSearch
        />
        <Select 
          placeholder="小号可清除"
          size="small"
          options={defaultOptions}
          allowClear
          value="option1"
        />
      </div>
      
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Select 
          placeholder="多选带搜索"
          mode="multiple"
          options={defaultOptions}
          showSearch
          defaultValue={['option1', 'option2']}
        />
        <Select 
          placeholder="大号多选"
          size="large"
          mode="multiple"
          options={defaultOptions}
          maxTagCount={1}
          defaultValue={['option1', 'option2', 'option3']}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '各种属性组合的选择器示例。',
      },
    },
  },
};

/**
 * 交互式调试面板
 */
export const Playground: Story = {
  args: {
    placeholder: '交互式调试面板',
    options: defaultOptions,
    size: 'middle',
    disabled: false,
    allowClear: false,
    showSearch: false,
    mode: 'single',
    showArrow: true,
    dropdownMatchSelectWidth: true,
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
    onDropdownVisibleChange: {
      action: 'dropdown visible changed',
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