# Modern UI Component Library

基于antd v5最新架构设计的现代化React UI组件库，采用CSS-in-JS技术栈，支持动态主题切换和完整的TypeScript类型支持。

## 架构特色

### 1. CSS-in-JS架构
- 使用**Emotion**作为样式引擎
- 运行时样式生成，支持动态主题
- 完整的TypeScript类型支持
- 优秀的Tree-shaking支持

### 2. 分层令牌系统
- **基础令牌**：颜色、间距、字体等原始值
- **语义令牌**：基于基础令牌的语义化变量
- **组件令牌**：组件级别的样式变量
- **CSS变量**：运行时动态主题支持

### 3. 动态主题系统
- 运行时主题切换（无构建步骤）
- 支持亮色/暗色模式
- 动态CSS变量更新
- 主题令牌深度合并

## 快速开始

### 安装
```bash
cd demo2
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建库
```bash
npm run build
```

## 架构详解

### 主题系统
```typescript
// 1. 定义设计令牌
import { defaultToken } from './theme/token'

// 2. 使用主题Provider
import { ThemeProvider } from './theme/ThemeProvider'

function App() {
  return (
    <ThemeProvider theme={{ primary: '#1890ff' }}>
      <YourApp />
    </ThemeProvider>
  )
}

// 3. 在组件中使用主题
import { useToken } from './hooks/useTheme'

function Button() {
  const token = useToken()
  // 使用token.componentToken.button等
}
```

### 组件开发模式
```typescript
// 1. 样式定义（CSS-in-JS）
export const StyledButton = styled.button<{
  $size: 'large' | 'middle' | 'small'
}>(({ theme, $size }) => {
  const token = theme as ThemeToken
  return css`
    height: ${token.componentToken.button[`height${$size}`]};
    // 其他样式
  `
})

// 2. 组件实现
export const Button: React.FC<ButtonProps> = (props) => {
  return <StyledButton $size={props.size} {...props} />
}
```

## 对比antd v4架构

| 特性 | antd v4 (旧方案) | 本库 (antd v5架构) |
|------|----------------|-------------------|
| 样式方案 | Less + CSS变量 | CSS-in-JS (Emotion) |
| 主题切换 | 构建时+运行时 | 纯运行时 |
| 包大小 | 较大（全量样式） | 较小（Tree-shaking） |
| 动态主题 | 有限支持 | 完整支持 |
| TypeScript | 基本支持 | 完整类型安全 |
| 性能 | 运行时优 | 构建时优 |

## 项目结构

```
demo2/
├── src/
│   ├── components/          # 组件目录
│   │   └── Button/         # 按钮组件
│   │       ├── index.tsx   # 组件实现
│   │       └── style.ts    # 样式定义
│   ├── theme/              # 主题系统
│   │   ├── token.ts        # 设计令牌
│   │   ├── context.tsx     # 主题上下文
│   │   └── ThemeProvider.tsx # 主题Provider
│   ├── hooks/              # 自定义Hooks
│   │   └── useTheme.ts     # 主题相关Hooks
│   ├── utils/              # 工具函数
│   ├── examples/           # 示例代码
│   └── index.ts            # 库入口
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 设计理念

### 1. 可扩展性
- 令牌系统易于扩展新变量
- 组件样式基于令牌，保持一致性
- 支持自定义主题配置

### 2. 类型安全
- 完整的TypeScript类型定义
- 主题令牌类型推导
- 组件属性类型检查

### 3. 性能优化
- CSS-in-JS按需生成样式
- CSS变量实现高效主题切换
- 避免不必要的重渲染

## 使用示例

```typescript
import { ThemeProvider, Button, useThemeMode } from 'modern-ui-component-library'

function App() {
  const { mode, setMode } = useThemeMode()
  
  return (
    <ThemeProvider>
      <Button type="primary" onClick={() => setMode('dark')}>
        切换暗色模式
      </Button>
      <Button type="default" size="large">
        大号按钮
      </Button>
    </ThemeProvider>
  )
}
```

## 路线图

- [ ] 更多组件（Input、Card、Modal等）
- [ ] 暗色主题优化
- [ ] 动画系统集成
- [ ] 响应式设计支持
- [ ] 服务端渲染支持
- [ ] 测试覆盖

## 许可证

MIT