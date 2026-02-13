# 动态主题 React 组件库

基于 Ant Design v4 令牌系统架构设计的 React 组件库，支持构建时主题定制和运行时动态主题切换。

## 特性

- 🎨 **动态主题切换**: 支持运行时通过 CSS 变量动态切换主题
- 🏗️ **Ant Design v4 架构**: 基于成熟的令牌系统设计
- 📦 **TypeScript 支持**: 完整的类型定义
- 🎯 **构建时主题定制**: 通过 Webpack 配置定制构建主题
- 🔧 **灵活的配置**: 支持自定义主题配置
- 🚀 **现代化构建**: 使用 Webpack 5 和 Babel 构建

## 安装

```bash
npm install dynamic-theme-component-library
# 或
yarn add dynamic-theme-component-library
```

## 快速开始

### 基本使用

```tsx
import React from 'react';
import { Button, ThemeProvider } from 'dynamic-theme-component-library';

function App() {
  return (
    <ThemeProvider>
      <Button type="primary">主要按钮</Button>
      <Button type="default">默认按钮</Button>
    </ThemeProvider>
  );
}

export default App;
```

### 动态主题切换

```tsx
import React from 'react';
import { Button, useThemeSwitcher } from 'dynamic-theme-component-library';

function ThemeDemo() {
  const { switchToLightTheme, switchToDarkTheme, resetTheme } = useThemeSwitcher();

  return (
    <div>
      <Button type="primary" onClick={switchToLightTheme}>
        浅色主题
      </Button>
      <Button type="primary" onClick={switchToDarkTheme}>
        深色主题
      </Button>
      <Button onClick={resetTheme}>
        重置主题
      </Button>
    </div>
  );
}
```

### 自定义主题配置

```tsx
import React from 'react';
import { Button, useThemeSwitcher } from 'dynamic-theme-component-library';

function CustomThemeDemo() {
  const { switchToCustomTheme } = useThemeSwitcher();

  const applyCustomTheme = () => {
    switchToCustomTheme({
      primaryColor: '#ff6b6b',
      successColor: '#51cf66',
      textColor: '#2b2d42',
      backgroundColorBase: '#f8f9fa'
    });
  };

  return (
    <Button type="primary" onClick={applyCustomTheme}>
      应用自定义主题
    </Button>
  );
}
```

## 主题系统架构

### 令牌层级

组件库采用三层令牌设计：

1. **基础令牌 (Base Tokens)**: 定义原始颜色、间距、字体等
2. **语义令牌 (Semantic Tokens)**: 基于基础令牌定义语义变量
3. **组件令牌 (Component Tokens)**: 组件级别的具体样式变量

### CSS 变量支持

所有样式都使用 CSS 变量实现，支持运行时动态修改：

```css
:root {
  --primary-color: #1890ff;
  --success-color: #52c41a;
  --text-color: #262626;
  --background-color-base: #fafafa;
  /* ... 更多变量 */
}
```

## 构建时主题定制

在 Webpack 配置中通过 `less-loader` 的 `modifyVars` 选项定制主题：

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  'primary-color': '#ff6b6b',
                  'success-color': '#51cf66',
                  // 更多自定义变量
                },
              },
            },
          },
        ],
      },
    ],
  },
};
```

## 组件

### Button 按钮

支持多种类型、大小和状态：

```tsx
import { Button } from 'dynamic-theme-component-library';

// 不同类型
<Button type="primary">主要按钮</Button>
<Button type="default">默认按钮</Button>
<Button type="danger">危险按钮</Button>
<Button type="link">链接按钮</Button>

// 不同大小
<Button size="large">大按钮</Button>
<Button size="middle">中按钮</Button>
<Button size="small">小按钮</Button>

// 状态
<Button disabled>禁用按钮</Button>
<Button loading>加载中</Button>
```

## API 参考

### ThemeProvider

主题提供者组件，用于包装应用：

```tsx
<ThemeProvider theme={customTheme}>
  <App />
</ThemeProvider>
```

### useTheme Hook

获取当前主题状态和管理功能：

```tsx
const { currentTheme, applyTheme, resetTheme } = useTheme();
```

### useThemeSwitcher Hook

提供主题切换功能：

```tsx
const { 
  switchToLightTheme, 
  switchToDarkTheme, 
  switchToCustomTheme, 
  resetTheme 
} = useThemeSwitcher();
```

### themeManager

直接的主题管理器实例：

```tsx
import { themeManager } from 'dynamic-theme-component-library';

// 应用主题
themeManager.applyTheme(customTheme);

// 重置主题
themeManager.resetToDefault();

// 订阅主题变化
const unsubscribe = themeManager.subscribe((theme) => {
  console.log('主题已更新:', theme);
});
```

## 开发

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 构建

```bash
# 构建组件库
npm run build

# 构建演示应用
npm run build:demo
```

## 项目结构

```
src/
├── components/          # 组件目录
│   └── Button/         # 按钮组件
│       ├── index.tsx   # 组件实现
│       └── button.less # 组件样式
├── theme/              # 主题系统
│   ├── tokens.less     # 令牌定义
│   ├── component-variables.less # 组件变量
│   └── theme-manager.ts # 主题管理器
├── hooks/              # React Hooks
│   └── useTheme.ts     # 主题 Hook
└── index.ts            # 主入口文件
```

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
