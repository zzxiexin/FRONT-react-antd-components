// 主题管理器 - 支持动态主题切换
export interface ThemeConfig {
  // 基础颜色
  primaryColor?: string;
  primaryColorHover?: string;
  primaryColorActive?: string;
  
  // 功能色
  successColor?: string;
  warningColor?: string;
  errorColor?: string;
  infoColor?: string;
  
  // 文本色
  textColor?: string;
  textColorSecondary?: string;
  textColorDisabled?: string;
  
  // 背景色
  backgroundColorBase?: string;
  backgroundColorLight?: string;
  backgroundColorDark?: string;
  
  // 间距
  spacingXs?: string;
  spacingSm?: string;
  spacingMd?: string;
  spacingLg?: string;
  spacingXl?: string;
  spacingXxl?: string;
  
  // 字体
  fontSizeSm?: string;
  fontSizeBase?: string;
  fontSizeLg?: string;
  fontSizeXl?: string;
  fontSizeXxl?: string;
  
  // 边框
  borderRadiusSm?: string;
  borderRadiusBase?: string;
  borderRadiusLg?: string;
  borderRadiusXl?: string;
}

export class ThemeManager {
  private currentTheme: ThemeConfig = {};
  private subscribers: Array<(theme: ThemeConfig) => void> = [];

  // 应用主题配置
  applyTheme(themeConfig: ThemeConfig): void {
    this.currentTheme = { ...this.currentTheme, ...themeConfig };
    this.updateCSSVariables(themeConfig);
    this.notifySubscribers();
  }

  // 获取当前主题配置
  getCurrentTheme(): ThemeConfig {
    return { ...this.currentTheme };
  }

  // 重置为默认主题
  resetToDefault(): void {
    this.currentTheme = {};
    this.resetCSSVariables();
    this.notifySubscribers();
  }

  // 订阅主题变化
  subscribe(callback: (theme: ThemeConfig) => void): () => void {
    this.subscribers.push(callback);
    
    // 返回取消订阅函数
    return () => {
      const index = this.subscribers.indexOf(callback);
      if (index > -1) {
        this.subscribers.splice(index, 1);
      }
    };
  }

  // 更新CSS变量
  private updateCSSVariables(themeConfig: ThemeConfig): void {
    const root = document.documentElement;
    
    Object.entries(themeConfig).forEach(([key, value]) => {
      if (value) {
        const cssVarName = this.camelToKebab(key);
        root.style.setProperty(`--${cssVarName}`, value);
      }
    });
  }

  // 重置CSS变量
  private resetCSSVariables(): void {
    const root = document.documentElement;
    const cssVariables = [
      'primary-color', 'primary-color-hover', 'primary-color-active',
      'success-color', 'warning-color', 'error-color', 'info-color',
      'text-color', 'text-color-secondary', 'text-color-disabled',
      'background-color-base', 'background-color-light', 'background-color-dark',
      'spacing-xs', 'spacing-sm', 'spacing-md', 'spacing-lg', 'spacing-xl', 'spacing-xxl',
      'font-size-sm', 'font-size-base', 'font-size-lg', 'font-size-xl', 'font-size-xxl',
      'border-radius-sm', 'border-radius-base', 'border-radius-lg', 'border-radius-xl'
    ];

    cssVariables.forEach(varName => {
      root.style.removeProperty(`--${varName}`);
    });
  }

  // 通知订阅者
  private notifySubscribers(): void {
    this.subscribers.forEach(callback => {
      callback(this.currentTheme);
    });
  }

  // 驼峰命名转短横线命名
  private camelToKebab(str: string): string {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }
}

// 创建全局主题管理器实例
export const themeManager = new ThemeManager();

// 默认主题配置
export const defaultTheme: ThemeConfig = {
  primaryColor: '#1890ff',
  primaryColorHover: '#40a9ff',
  primaryColorActive: '#096dd9',
  successColor: '#52c41a',
  warningColor: '#fa8c16',
  errorColor: '#f5222d',
  infoColor: '#1890ff',
  textColor: '#262626',
  textColorSecondary: '#595959',
  textColorDisabled: '#bfbfbf',
  backgroundColorBase: '#fafafa',
  backgroundColorLight: '#ffffff',
  backgroundColorDark: '#141414',
  spacingXs: '4px',
  spacingSm: '8px',
  spacingMd: '16px',
  spacingLg: '24px',
  spacingXl: '32px',
  spacingXxl: '48px',
  fontSizeSm: '12px',
  fontSizeBase: '14px',
  fontSizeLg: '16px',
  fontSizeXl: '20px',
  fontSizeXxl: '24px',
  borderRadiusSm: '2px',
  borderRadiusBase: '4px',
  borderRadiusLg: '8px',
  borderRadiusXl: '12px'
};
