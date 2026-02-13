# Ant Design v4 令牌系统设计分析

## 1. 核心设计理念

Ant Design v4 的令牌系统基于以下核心设计理念：

### 1.1 分层设计
- **基础令牌 (Base Tokens)**: 定义基础颜色、间距、字体等原始值
- **语义令牌 (Semantic Tokens)**: 基于基础令牌定义具有语义含义的变量
- **组件令牌 (Component Tokens)**: 组件级别的具体样式变量

### 1.2 主题定制机制
- 使用 LESS 变量作为主要配置方式
- 支持 CSS 变量实现运行时主题切换
- 构建时通过 less-loader 进行变量替换

## 2. 令牌系统架构

### 2.1 变量定义层次
```
├── 基础变量 (Base Variables)
│   ├── 颜色系统 (Colors)
│   ├── 间距系统 (Spacing)
│   ├── 字体系统 (Typography)
│   └── 阴影系统 (Shadows)
│
├── 语义变量 (Semantic Variables)
│   ├── 主色调 (Primary Color)
│   ├── 成功色 (Success Color)
│   ├── 警告色 (Warning Color)
│   └── 错误色 (Error Color)
│
└── 组件变量 (Component Variables)
    ├── Button
    ├── Input
    ├── Modal
    └── ...
```

### 2.2 LESS 变量示例
```less
// 基础颜色
@blue-1: #e6f7ff;
@blue-6: #1890ff;
@blue-9: #003a8c;

// 语义颜色
@primary-color: @blue-6;
@success-color: #52c41a;
@warning-color: #faad14;
@error-color: #f5222d;

// 组件变量
@btn-primary-bg: @primary-color;
@btn-primary-border: @primary-color;
```

## 3. 构建时变量替换机制

### 3.1 Webpack 配置
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
                  'primary-color': '#1890ff',
                  // 其他自定义变量
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
};
```

### 3.2 CSS 变量支持
```css
:root {
  --primary-color: #1890ff;
  --success-color: #52c41a;
  --component-padding: 16px;
}

.component {
  background-color: var(--primary-color);
  padding: var(--component-padding);
}
```

## 4. 动态主题切换实现

### 4.1 运行时主题配置
```javascript
// 主题配置对象
const themeConfig = {
  primaryColor: '#1890ff',
  successColor: '#52c41a',
  // 其他主题变量
};

// 应用主题函数
function applyTheme(themeConfig) {
  const root = document.documentElement;
  Object.keys(themeConfig).forEach(key => {
    root.style.setProperty(`--${key}`, themeConfig[key]);
  });
}
```

### 4.2 构建时转换策略
1. **开发阶段**: 使用 LESS 变量进行开发
2. **构建阶段**: 将 LESS 变量转换为 CSS 变量
3. **运行时**: 通过 JavaScript 动态修改 CSS 变量

## 5. 架构优势

### 5.1 设计一致性
- 统一的变量命名规范
- 清晰的层级关系
- 易于维护和扩展

### 5.2 灵活性
- 支持构建时主题定制
- 支持运行时动态切换
- 良好的向后兼容性

### 5.3 性能优化
- CSS 变量支持浏览器原生主题切换
- 减少样式重复计算
- 更好的缓存策略

## 6. 总结

Ant Design v4 的令牌系统通过分层设计和双重变量机制（LESS + CSS变量），实现了灵活的主题定制能力。这种架构既支持构建时的静态主题配置，又支持运行时的动态主题切换，为组件库提供了强大的主题定制能力。
