// 导出主题相关
export { themeManager, defaultTheme } from './theme/theme-manager';
export type { ThemeConfig } from './theme/theme-manager';
export { useTheme, ThemeProvider, useThemeSwitcher, createUseTheme } from './hooks/useTheme';

// 导出组件
export { default as Button } from './components/Button';
export { default as Modal } from './components/Modal';
export { default as Input } from './components/Input';

// 导出样式
import './theme/tokens.less';
import './theme/component-variables.less';
