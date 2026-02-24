import React, { useState, useMemo, useEffect } from 'react'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import ThemeContext, { ThemeProviderProps, ThemeContextValue } from './context'
import { defaultToken, ThemeToken } from './token'

// 合并主题令牌
const mergeToken = (base: ThemeToken, override: Partial<ThemeToken>): ThemeToken => {
  const result = { ...base } as any
  
  // 深度合并componentToken
  if (override.componentToken) {
    result.componentToken = {
      ...base.componentToken,
      ...override.componentToken,
    }
  }
  
  // 合并其他属性
  Object.keys(override).forEach((key) => {
    if (key !== 'componentToken') {
      const typedKey = key as keyof ThemeToken
      if (typeof override[typedKey] === 'object' && override[typedKey] !== null) {
        result[typedKey] = {
          ...base[typedKey],
          ...override[typedKey],
        } as any
      } else if (override[typedKey] !== undefined) {
        result[typedKey] = override[typedKey] as any
      }
    }
  })
  
  return result as ThemeToken
}

// 将主题令牌转换为CSS变量对象
const tokenToCssVariables = (token: ThemeToken) => {
  const cssVars: Record<string, string> = {}
  
  // 语义颜色
  if (token.primary) cssVars['--color-primary'] = token.primary
  if (token.primaryHover) cssVars['--color-primary-hover'] = token.primaryHover
  if (token.primaryActive) cssVars['--color-primary-active'] = token.primaryActive
  if (token.success) cssVars['--color-success'] = token.success
  if (token.warning) cssVars['--color-warning'] = token.warning
  if (token.error) cssVars['--color-error'] = token.error
  if (token.info) cssVars['--color-info'] = token.info
  if (token.text) cssVars['--color-text'] = token.text
  if (token.textSecondary) cssVars['--color-text-secondary'] = token.textSecondary
  if (token.textDisabled) cssVars['--color-text-disabled'] = token.textDisabled
  if (token.textInverse) cssVars['--color-text-inverse'] = token.textInverse
  if (token.bgBase) cssVars['--color-bg-base'] = token.bgBase
  if (token.bgLight) cssVars['--color-bg-light'] = token.bgLight
  if (token.bgDark) cssVars['--color-bg-dark'] = token.bgDark
  if (token.border) cssVars['--color-border'] = token.border
  if (token.borderSplit) cssVars['--color-border-split'] = token.borderSplit
  if (token.borderInverse) cssVars['--color-border-inverse'] = token.borderInverse
  
  // 间距
  if (token.spacing) {
    Object.entries(token.spacing).forEach(([key, value]) => {
      cssVars[`--spacing-${key}`] = value
    })
  }
  
  // 字体
  if (token.typography) {
    const { typography: typo } = token
    if (typo.fontFamily) cssVars['--font-family'] = typo.fontFamily
    if (typo.fontSizeSm) cssVars['--font-size-sm'] = typo.fontSizeSm
    if (typo.fontSizeBase) cssVars['--font-size-base'] = typo.fontSizeBase
    if (typo.fontSizeLg) cssVars['--font-size-lg'] = typo.fontSizeLg
    if (typo.fontSizeXl) cssVars['--font-size-xl'] = typo.fontSizeXl
    if (typo.fontSizeXxl) cssVars['--font-size-xxl'] = typo.fontSizeXxl
  }
  
  // 边框
  if (token.borderRadius) {
    Object.entries(token.borderRadius).forEach(([key, value]) => {
      cssVars[`--border-radius-${key}`] = value
    })
  }
  
  return cssVars
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  theme: themeOverride,
  defaultMode = 'light',
}) => {
  const [mode, setMode] = useState<'light' | 'dark'>(defaultMode)
  const [customToken, setCustomToken] = useState<Partial<ThemeToken>>(themeOverride || {})
  
  // 合并主题令牌
  const token = useMemo(() => {
    return mergeToken(defaultToken, customToken)
  }, [customToken])
  
  // 生成CSS变量
  const cssVariables = useMemo(() => {
    return tokenToCssVariables(token)
  }, [token])
  
  // 更新主题令牌
  const updateToken = (newToken: Partial<ThemeToken>) => {
    setCustomToken((prev) => ({
      ...prev,
      ...newToken,
    }))
  }
  
  // 创建上下文值
  const contextValue: ThemeContextValue = useMemo(() => {
    return {
      token,
      mode,
      setMode,
      updateToken,
    }
  }, [token, mode])
  
  // 创建emotion主题对象（包含CSS变量）
  const emotionTheme = useMemo(() => {
    return {
      ...token,
      cssVariables,
      mode,
    }
  }, [token, cssVariables, mode])
  
  // 动态应用CSS变量到document
  useEffect(() => {
    const root = document.documentElement
    Object.entries(cssVariables).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
    
    return () => {
      Object.keys(cssVariables).forEach((key) => {
        root.style.removeProperty(key)
      })
    }
  }, [cssVariables])
  
  return (
    <ThemeContext.Provider value={contextValue}>
      <EmotionThemeProvider theme={emotionTheme}>
        {children}
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider