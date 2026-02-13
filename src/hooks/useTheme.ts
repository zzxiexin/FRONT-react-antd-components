import React, { useState, useEffect, useCallback } from 'react';
import { themeManager, ThemeConfig } from '../theme/theme-manager';

/**
 * 主题Hook - 提供主题状态管理和切换功能
 */
export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(themeManager.getCurrentTheme());

  // 监听主题变化
  useEffect(() => {
    const unsubscribe = themeManager.subscribe((newTheme) => {
      setCurrentTheme(newTheme);
    });

    // 清理订阅
    return unsubscribe;
  }, []);

  // 应用主题
  const applyTheme = useCallback((themeConfig: ThemeConfig) => {
    themeManager.applyTheme(themeConfig);
  }, []);

  // 重置为默认主题
  const resetTheme = useCallback(() => {
    themeManager.resetToDefault();
  }, []);

  return {
    currentTheme,
    applyTheme,
    resetTheme,
    themeManager
  };
}

/**
 * 主题提供者组件Props
 */
export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: ThemeConfig;
}

/**
 * 主题提供者组件
 */
export function ThemeProvider({ children, theme }: ThemeProviderProps) {
  const { applyTheme } = useTheme();

  // 初始化主题
  useEffect(() => {
    if (theme) {
      applyTheme(theme);
    }
  }, [theme, applyTheme]);

  return children as React.ReactElement;
}

/**
 * 创建自定义主题Hook
 */
export function createUseTheme<T extends Record<string, unknown>>(defaultTheme: T) {
  return function useCustomTheme() {
    const { currentTheme, applyTheme, resetTheme } = useTheme();
    
    const mergedTheme = {
      ...defaultTheme,
      ...currentTheme
    };

    return {
      theme: mergedTheme as T & ThemeConfig,
      applyTheme,
      resetTheme
    };
  };
}

/**
 * 主题切换器Hook
 */
export function useThemeSwitcher() {
  const { applyTheme, resetTheme } = useTheme();

  const switchToLightTheme = useCallback(() => {
    applyTheme({
      primaryColor: '#1890ff',
      textColor: '#262626',
      backgroundColorBase: '#fafafa',
      backgroundColorLight: '#ffffff'
    });
  }, [applyTheme]);

  const switchToDarkTheme = useCallback(() => {
    applyTheme({
      primaryColor: '#177ddc',
      textColor: '#ffffff',
      backgroundColorBase: '#141414',
      backgroundColorLight: '#1f1f1f'
    });
  }, [applyTheme]);

  const switchToCustomTheme = useCallback((customTheme: ThemeConfig) => {
    applyTheme(customTheme);
  }, [applyTheme]);

  return {
    switchToLightTheme,
    switchToDarkTheme,
    switchToCustomTheme,
    resetTheme
  };
}
