import React, { useState } from 'react'
import { ThemeProvider, Button, useThemeMode, useUpdateToken, defaultToken } from '../index'

const DemoApp: React.FC = () => {
  const [count, setCount] = useState(0)
  const { mode, setMode } = useThemeMode()
  const updateToken = useUpdateToken()
  
  const handleThemeChange = (newMode: 'light' | 'dark') => {
    setMode(newMode)
  }
  
  const handleColorChange = (color: string) => {
    updateToken({
      primary: color,
      primaryHover: `${color}cc`,
      primaryActive: `${color}99`,
    })
  }
  
  return (
    <div className="container">
      <header className="header">
        <h1>Modern UI Component Library Demo</h1>
        <p>基于antd v5架构的CSS-in-JS组件库</p>
      </header>
      
      <section className="section">
        <h2 className="section-title">主题控制</h2>
        <div className="theme-controls">
          <Button type="primary" onClick={() => handleThemeChange('light')}>
            亮色模式
          </Button>
          <Button type="default" onClick={() => handleThemeChange('dark')}>
            暗色模式
          </Button>
          <Button type="primary" onClick={() => handleColorChange('#1890ff')}>
            蓝色主题
          </Button>
          <Button type="primary" onClick={() => handleColorChange('#52c41a')}>
            绿色主题
          </Button>
          <Button type="primary" onClick={() => handleColorChange('#f5222d')}>
            红色主题
          </Button>
          <Button type="default" onClick={() => updateToken(defaultToken)}>
            重置主题
          </Button>
        </div>
        <p>当前主题模式: {mode}</p>
      </section>
      
      <section className="section">
        <h2 className="section-title">按钮组件</h2>
        <div className="demo-grid">
          <div>
            <h3>主要按钮</h3>
            <Button type="primary" onClick={() => setCount(count + 1)}>
              点击计数: {count}
            </Button>
            <Button type="primary" size="large">
              大按钮
            </Button>
            <Button type="primary" size="small">
              小按钮
            </Button>
            <Button type="primary" disabled>
              禁用按钮
            </Button>
            <Button type="primary" loading>
              加载中
            </Button>
          </div>
          
          <div>
            <h3>默认按钮</h3>
            <Button type="default">默认按钮</Button>
            <Button type="default" size="large">
              大按钮
            </Button>
            <Button type="default" size="small">
              小按钮
            </Button>
            <Button type="default" disabled>
              禁用按钮
            </Button>
            <Button type="default" loading>
              加载中
            </Button>
          </div>
          
          <div>
            <h3>危险按钮</h3>
            <Button type="danger">危险按钮</Button>
            <Button type="danger" size="large">
              大按钮
            </Button>
            <Button type="danger" size="small">
              小按钮
            </Button>
            <Button type="danger" disabled>
              禁用按钮
            </Button>
            <Button type="danger" loading>
              加载中
            </Button>
          </div>
          
          <div>
            <h3>链接按钮</h3>
            <Button type="link" href="#">
              链接按钮
            </Button>
            <Button type="link" href="#" size="large">
              大链接
            </Button>
            <Button type="link" href="#" size="small">
              小链接
            </Button>
            <Button type="link" href="#" disabled>
              禁用链接
            </Button>
            <Button type="link" href="#" loading>
              加载链接
            </Button>
          </div>
        </div>
      </section>
      
      <section className="section">
        <h2 className="section-title">组合示例</h2>
        <div>
          <Button type="primary" style={{ marginRight: 16 }}>
            主要按钮
          </Button>
          <Button type="default" style={{ marginRight: 16 }}>
            默认按钮
          </Button>
          <Button type="danger" style={{ marginRight: 16 }}>
            危险按钮
          </Button>
          <Button type="link" href="#">
            链接按钮
          </Button>
        </div>
        <div style={{ marginTop: 24 }}>
          <Button type="primary" size="large" style={{ marginRight: 16 }}>
            大按钮
          </Button>
          <Button type="primary" style={{ marginRight: 16 }}>
            中按钮
          </Button>
          <Button type="primary" size="small">
            小按钮
          </Button>
        </div>
      </section>
    </div>
  )
}

const App: React.FC = () => {
  return (
    <ThemeProvider defaultMode="light">
      <DemoApp />
    </ThemeProvider>
  )
}

export default App