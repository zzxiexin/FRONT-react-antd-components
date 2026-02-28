import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Modal, ModalProps } from './index';
import { Button } from '../Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `# Modal 模态框

模态对话框，用于重要的反馈或需要用户确认的操作。

## 何时使用

- 需要用户处理事务，又不希望跳转页面以致打断工作流程时。
- 当需要一个简洁的确认框询问用户时。
- 当需要展示更多内容又不希望跳转页面时。

## API

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| visible | 是否显示模态框 | \`boolean\` | \`false\` | 否 |
| title | 标题 | \`React.ReactNode\` | - | 否 |
| onClose | 关闭时回调 | \`() => void\` | - | 否 |
| okText | 确认按钮文本 | \`string\` | \`'确认'\` | 否 |
| cancelText | 取消按钮文本 | \`string\` | \`'取消'\` | 否 |
| onOk | 确认按钮点击回调 | \`() => void\` | - | 否 |
| onCancel | 取消按钮点击回调 | \`() => void\` | - | 否 |
| showOk | 是否显示确认按钮 | \`boolean\` | \`true\` | 否 |
| showCancel | 是否显示取消按钮 | \`boolean\` | \`true\` | 否 |
| footer | 自定义底部内容 | \`React.ReactNode\` | - | 否 |
| maskClosable | 点击蒙层是否允许关闭 | \`boolean\` | \`true\` | 否 |
| closable | 是否显示右上角的关闭按钮 | \`boolean\` | \`true\` | 否 |
| width | 宽度 | \`number \| string\` | \`520\` | 否 |
| className | 自定义类名 | \`string\` | - | 否 |
| children | 内容 | \`React.ReactNode\` | - | 否 |
| keyboard | 是否支持键盘ESC关闭 | \`boolean\` | \`true\` | 否 |

## 代码示例`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    visible: {
      control: 'boolean',
      description: '是否显示模态框',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
    title: {
      control: 'text',
      description: '标题',
      table: {
        type: { summary: 'React.ReactNode' },
        category: 'Content',
      },
    },
    onClose: {
      description: '关闭时回调',
      table: {
        type: { summary: '() => void' },
        category: 'Events',
      },
    },
    okText: {
      control: 'text',
      description: '确认按钮文本',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'确认'" },
        category: 'Footer',
      },
    },
    cancelText: {
      control: 'text',
      description: '取消按钮文本',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'取消'" },
        category: 'Footer',
      },
    },
    onOk: {
      description: '确认按钮点击回调',
      table: {
        type: { summary: '() => void' },
        category: 'Events',
      },
    },
    onCancel: {
      description: '取消按钮点击回调',
      table: {
        type: { summary: '() => void' },
        category: 'Events',
      },
    },
    showOk: {
      control: 'boolean',
      description: '是否显示确认按钮',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Footer',
      },
    },
    showCancel: {
      control: 'boolean',
      description: '是否显示取消按钮',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Footer',
      },
    },
    footer: {
      description: '自定义底部内容',
      table: {
        type: { summary: 'React.ReactNode' },
        category: 'Footer',
      },
    },
    maskClosable: {
      control: 'boolean',
      description: '点击蒙层是否允许关闭',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Behavior',
      },
    },
    closable: {
      control: 'boolean',
      description: '是否显示右上角的关闭按钮',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Appearance',
      },
    },
    width: {
      control: 'text',
      description: '宽度',
      table: {
        type: { summary: 'number | string' },
        defaultValue: { summary: '520' },
        category: 'Appearance',
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
      description: '内容',
      table: {
        type: { summary: 'React.ReactNode' },
        category: 'Content',
      },
    },
    keyboard: {
      control: 'boolean',
      description: '是否支持键盘ESC关闭',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Behavior',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 使用状态的包装组件
const ModalWithState = (props: Omit<ModalProps, 'visible' | 'onClose'>) => {
  const [visible, setVisible] = useState(false);
  
  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        打开模态框
      </Button>
      <Modal
        {...props}
        visible={visible}
        onClose={() => setVisible(false)}
      />
    </>
  );
};

/**
 * 基础模态框示例
 */
export const Basic: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    
    return (
      <>
        <Button type="primary" onClick={() => setVisible(true)}>
          打开基础模态框
        </Button>
        <Modal
          visible={visible}
          title="基础模态框"
          onClose={() => setVisible(false)}
          onOk={() => {
            alert('确认操作');
            setVisible(false);
          }}
          onCancel={() => {
            alert('取消操作');
            setVisible(false);
          }}
        >
          <p>这是一个基础模态框的示例内容。</p>
          <p>可以放置任意内容，如文本、表单、图片等。</p>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '基础模态框，包含标题、内容和标准底部按钮。',
      },
    },
  },
};

/**
 * 自定义标题示例
 */
export const CustomTitle: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    
    return (
      <>
        <Button onClick={() => setVisible(true)}>
          打开自定义标题模态框
        </Button>
        <Modal
          visible={visible}
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>🔔</span>
              <span>重要通知</span>
            </div>
          }
          onClose={() => setVisible(false)}
          okText="知道了"
          cancelText="稍后再说"
        >
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '16px', marginBottom: '16px' }}>
              系统将于今晚 24:00 进行维护升级
            </p>
            <p style={{ color: '#666' }}>
              预计维护时间 2 小时，请提前保存您的工作。
            </p>
          </div>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '自定义标题样式和内容的模态框。',
      },
    },
  },
};

/**
 * 自定义宽度示例
 */
export const CustomWidth: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    
    return (
      <>
        <Button onClick={() => setVisible(true)}>
          打开宽模态框
        </Button>
        <Modal
          visible={visible}
          title="宽模态框"
          width={800}
          onClose={() => setVisible(false)}
        >
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <h3>左侧内容</h3>
              <p>这是一个宽度为 800px 的模态框，适合展示较宽的内容。</p>
              <p>例如：表单、表格、图表等需要更多水平空间的场景。</p>
            </div>
            <div style={{ flex: 1 }}>
              <h3>右侧内容</h3>
              <p>模态框的宽度可以通过 width 属性自定义。</p>
              <p>支持像素值（如 800）或百分比（如 "80%"）。</p>
            </div>
          </div>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '自定义宽度的模态框，适合展示较宽的内容。',
      },
    },
  },
};

/**
 * 无底部按钮示例
 */
export const NoFooter: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    
    return (
      <>
        <Button onClick={() => setVisible(true)}>
          打开无底部模态框
        </Button>
        <Modal
          visible={visible}
          title="通知"
          showOk={false}
          showCancel={false}
          closable={false}
          maskClosable={true}
          onClose={() => setVisible(false)}
        >
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎉</div>
            <h3 style={{ marginBottom: '10px' }}>操作成功</h3>
            <p style={{ color: '#666' }}>您的数据已成功保存到云端。</p>
            <p style={{ color: '#999', fontSize: '12px', marginTop: '20px' }}>
              点击蒙层区域关闭此提示
            </p>
          </div>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '没有底部按钮的模态框，通常用于纯信息展示。',
      },
    },
  },
};

/**
 * 自定义底部示例
 */
export const CustomFooter: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const handleOk = () => {
      setLoading(true);
      // 模拟异步操作
      setTimeout(() => {
        setLoading(false);
        alert('操作成功！');
        setVisible(false);
      }, 1500);
    };
    
    return (
      <>
        <Button onClick={() => setVisible(true)}>
          打开自定义底部模态框
        </Button>
        <Modal
          visible={visible}
          title="自定义底部"
          footer={
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <div>
                <Button type="link" onClick={() => setVisible(false)}>
                  稍后再说
                </Button>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button onClick={() => setVisible(false)}>
                  取消
                </Button>
                <Button 
                  type="primary" 
                  onClick={handleOk}
                  loading={loading}
                >
                  {loading ? '处理中...' : '确认提交'}
                </Button>
              </div>
            </div>
          }
          onClose={() => setVisible(false)}
        >
          <p>这个模态框使用了完全自定义的底部区域。</p>
          <p>可以放置任意组件，如按钮组、链接、复选框等。</p>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '自定义底部区域的模态框，提供更大的灵活性。',
      },
    },
  },
};

/**
 * 禁用蒙层点击关闭示例
 */
export const NonClosableMask: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    
    return (
      <>
        <Button onClick={() => setVisible(true)}>
          打开禁用蒙层点击的模态框
        </Button>
        <Modal
          visible={visible}
          title="重要操作"
          maskClosable={false}
          closable={false}
          onClose={() => setVisible(false)}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
        >
          <div style={{ textAlign: 'center' }}>
            <p>这个模态框的蒙层点击和关闭按钮都被禁用了。</p>
            <p>用户必须通过底部的按钮来关闭模态框。</p>
            <p style={{ color: '#ff4d4f', marginTop: '16px' }}>
              ⚠️ 适用于重要操作，防止用户误关闭。
            </p>
          </div>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '禁用蒙层点击和关闭按钮的模态框，强制用户通过底部按钮操作。',
      },
    },
  },
};

/**
 * 表单示例
 */
export const FormExample: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    
    const handleSubmit = () => {
      if (!name || !email) {
        alert('请填写完整信息');
        return;
      }
      alert(`提交成功！\n姓名: ${name}\n邮箱: ${email}`);
      setName('');
      setEmail('');
      setVisible(false);
    };
    
    return (
      <>
        <Button type="primary" onClick={() => setVisible(true)}>
          填写信息
        </Button>
        <Modal
          visible={visible}
          title="用户信息"
          onClose={() => setVisible(false)}
          okText="提交"
          cancelText="重置"
          onOk={handleSubmit}
          onCancel={() => {
            setName('');
            setEmail('');
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                姓名
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '6px',
                  fontSize: '14px',
                }}
                placeholder="请输入您的姓名"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                邮箱
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '6px',
                  fontSize: '14px',
                }}
                placeholder="请输入您的邮箱"
              />
            </div>
          </div>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '在模态框中嵌入表单的示例，展示模态框与表单的结合使用。',
      },
    },
  },
};

/**
 * 组合示例
 */
export const Combinations: Story = {
  render: () => {
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button type="primary" onClick={() => setVisible1(true)}>
            基础模态框
          </Button>
          <Button onClick={() => setVisible2(true)}>
            宽模态框
          </Button>
          <Button type="dashed" onClick={() => setVisible3(true)}>
            无底部模态框
          </Button>
        </div>
        
        <Modal
          visible={visible1}
          title="基础示例"
          onClose={() => setVisible1(false)}
        >
          <p>这是基础模态框的示例内容。</p>
        </Modal>
        
        <Modal
          visible={visible2}
          title="宽模态框"
          width={600}
          onClose={() => setVisible2(false)}
        >
          <p>这是一个宽度为 600px 的模态框。</p>
        </Modal>
        
        <Modal
          visible={visible3}
          title="通知"
          showOk={false}
          showCancel={false}
          onClose={() => setVisible3(false)}
        >
          <p>这个模态框没有底部按钮。</p>
        </Modal>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '多个模态框的组合示例，展示不同类型模态框的使用方式。',
      },
    },
  },
};

/**
 * 交互式调试面板
 */
export const Playground: Story = {
  args: {
    visible: false,
    title: '调试模态框',
    okText: '确认',
    cancelText: '取消',
    showOk: true,
    showCancel: true,
    maskClosable: true,
    closable: true,
    width: '520',
    keyboard: true,
    children: '这是一个用于调试的模态框内容。',
  },
  argTypes: {
    children: {
      control: 'text',
    },
    onClose: {
      action: 'closed',
    },
    onOk: {
      action: 'ok',
    },
    onCancel: {
      action: 'cancel',
    },
  },
  parameters: {
    docs: {
      description: {
        story: '交互式调试面板，可以调整所有属性并实时查看效果。',
      },
    },
  },
  render: (args) => {
    const [visible, setVisible] = useState(args.visible);
    
    return (
      <>
        <Button type="primary" onClick={() => setVisible(true)}>
          打开调试模态框
        </Button>
        <Modal
          {...args}
          visible={visible}
          onClose={() => {
            setVisible(false);
            args.onClose?.();
          }}
          onOk={() => {
            args.onOk?.();
          }}
          onCancel={() => {
            args.onCancel?.();
          }}
        />
      </>
    );
  },
};