import { useTheme as useThemeContext, useToken as useTokenContext } from '../theme/context'

// 重新导出
export { useThemeContext as useTheme, useTokenContext as useToken }

// 使用样式令牌的hook
export const useStyleToken = () => {
  const { token } = useThemeContext()
  return token
}

// 使用颜色令牌的hook
export const useColorToken = () => {
  const { token } = useThemeContext()
  return {
    primary: token.primary,
    primaryHover: token.primaryHover,
    primaryActive: token.primaryActive,
    success: token.success,
    warning: token.warning,
    error: token.error,
    info: token.info,
    text: token.text,
    textSecondary: token.textSecondary,
    textDisabled: token.textDisabled,
    textInverse: token.textInverse,
    bgBase: token.bgBase,
    bgLight: token.bgLight,
    bgDark: token.bgDark,
    border: token.border,
    borderSplit: token.borderSplit,
    borderInverse: token.borderInverse,
  }
}

// 使用间距令牌的hook
export const useSpacingToken = () => {
  const { token } = useThemeContext()
  return token.spacing
}

// 使用字体令牌的hook
export const useTypographyToken = () => {
  const { token } = useThemeContext()
  return token.typography
}

// 使用边框令牌的hook
export const useBorderToken = () => {
  const { token } = useThemeContext()
  return {
    borderRadius: token.borderRadius,
    borderWidth: token.borderWidth,
    borderStyle: token.borderStyle,
  }
}

// 使用组件令牌的hook
export const useComponentToken = () => {
  const { token } = useThemeContext()
  return token.componentToken
}

// 主题模式hook
export const useThemeMode = () => {
  const { mode, setMode } = useThemeContext()
  return { mode, setMode }
}

// 更新主题的hook
export const useUpdateToken = () => {
  const { updateToken } = useThemeContext()
  return updateToken
}