import React, { createContext, useContext } from 'react'
import { defaultToken, ThemeToken } from './token'

// 主题上下文
export interface ThemeContextValue {
  token: ThemeToken
  mode: 'light' | 'dark'
  setMode: (mode: 'light' | 'dark') => void
  updateToken: (token: Partial<ThemeToken>) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

// 主题Provider的props
export interface ThemeProviderProps {
  children: React.ReactNode
  theme?: Partial<ThemeToken>
  defaultMode?: 'light' | 'dark'
}

// 使用主题的hook
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// 使用主题令牌的hook
export const useToken = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useToken must be used within a ThemeProvider')
  }
  return context.token
}

export default ThemeContext