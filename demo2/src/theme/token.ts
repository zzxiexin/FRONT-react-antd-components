// 设计令牌系统 - 基于antd v5架构

// 基础颜色系统
export const colorBase = {
  blue: {
    1: '#e6f7ff',
    2: '#bae7ff',
    3: '#91d5ff',
    4: '#69c0ff',
    5: '#40a9ff',
    6: '#1890ff',
    7: '#096dd9',
    8: '#0050b3',
    9: '#003a8c',
    10: '#002766',
  },
  green: {
    1: '#f6ffed',
    2: '#d9f7be',
    3: '#b7eb8f',
    4: '#95de64',
    5: '#73d13d',
    6: '#52c41a',
    7: '#389e0d',
    8: '#237804',
    9: '#135200',
    10: '#092b00',
  },
  red: {
    1: '#fff1f0',
    2: '#ffccc7',
    3: '#ffa39e',
    4: '#ff7875',
    5: '#ff4d4f',
    6: '#f5222d',
    7: '#cf1322',
    8: '#a8071a',
    9: '#820014',
    10: '#5c0011',
  },
  orange: {
    1: '#fff7e6',
    2: '#ffe7ba',
    3: '#ffd591',
    4: '#ffc069',
    5: '#ffa940',
    6: '#fa8c16',
    7: '#d46b08',
    8: '#ad4e00',
    9: '#873800',
    10: '#612500',
  },
  gray: {
    1: '#ffffff',
    2: '#fafafa',
    3: '#f5f5f5',
    4: '#f0f0f0',
    5: '#d9d9d9',
    6: '#bfbfbf',
    7: '#8c8c8c',
    8: '#595959',
    9: '#434343',
    10: '#262626',
    11: '#1f1f1f',
    12: '#141414',
    13: '#000000',
  },
}

// 语义颜色令牌
export const colorSemantic = {
  primary: colorBase.blue[6],
  primaryHover: colorBase.blue[5],
  primaryActive: colorBase.blue[7],
  primaryOutline: 'rgba(24, 144, 255, 0.2)',
  
  success: colorBase.green[6],
  warning: colorBase.orange[6],
  error: colorBase.red[6],
  info: colorBase.blue[6],
  
  text: colorBase.gray[10],
  textSecondary: colorBase.gray[8],
  textDisabled: colorBase.gray[6],
  textInverse: colorBase.gray[1],
  
  bgBase: colorBase.gray[2],
  bgLight: colorBase.gray[1],
  bgDark: colorBase.gray[12],
  
  border: colorBase.gray[5],
  borderSplit: colorBase.gray[4],
  borderInverse: colorBase.gray[1],
}

// 间距系统
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
}

// 字体系统
export const typography = {
  fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
  fontSizeSm: '12px',
  fontSizeBase: '14px',
  fontSizeLg: '16px',
  fontSizeXl: '20px',
  fontSizeXxl: '24px',
  lineHeightBase: 1.5715,
  lineHeightLg: 1.5,
  lineHeightSm: 1.4,
}

// 边框系统
export const borderRadius = {
  sm: '2px',
  base: '4px',
  lg: '8px',
  xl: '12px',
}

export const borderWidth = {
  base: '1px',
}

export const borderStyle = {
  base: 'solid',
}

// 阴影系统
export const boxShadow = {
  1: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
  2: '0 1px 8px 0 rgba(0, 0, 0, 0.15)',
  3: '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
}

// 组件令牌 - 按需扩展
export const componentToken = {
  button: {
    fontWeight: 400,
    borderRadiusBase: borderRadius.base,
    borderRadiusSm: borderRadius.sm,
    borderWidth: borderWidth.base,
    borderStyle: borderStyle.base,
    heightBase: '32px',
    heightLg: '40px',
    heightSm: '24px',
    paddingHorizontalBase: spacing.md,
    paddingHorizontalLg: spacing.lg,
    paddingHorizontalSm: spacing.sm,
    fontSizeLg: typography.fontSizeLg,
    fontSizeBase: typography.fontSizeBase,
    fontSizeSm: typography.fontSizeSm,
    primaryColor: colorSemantic.textInverse,
    primaryBg: colorSemantic.primary,
    primaryBorder: colorSemantic.primary,
    defaultColor: colorSemantic.text,
    defaultBg: colorSemantic.bgLight,
    defaultBorder: colorSemantic.border,
    dangerColor: colorSemantic.textInverse,
    dangerBg: colorSemantic.error,
    dangerBorder: colorSemantic.error,
    disabledColor: colorSemantic.textDisabled,
    disabledBg: colorSemantic.bgBase,
    disabledBorder: colorSemantic.border,
  },
  input: {
    heightBase: '32px',
    heightLg: '40px',
    heightSm: '24px',
    paddingHorizontalBase: spacing.sm,
    paddingHorizontalLg: spacing.md,
    paddingHorizontalSm: spacing.xs,
    color: colorSemantic.text,
    bg: colorSemantic.bgLight,
    borderColor: colorSemantic.border,
    borderRadius: borderRadius.base,
    hoverBorderColor: colorSemantic.primaryHover,
    focusBorderColor: colorSemantic.primary,
    disabledColor: colorSemantic.textDisabled,
    disabledBg: colorSemantic.bgBase,
    placeholderColor: colorSemantic.textSecondary,
  },
}

// 完整主题令牌
export const defaultToken = {
  ...colorBase,
  ...colorSemantic,
  spacing,
  typography,
  borderRadius,
  borderWidth,
  borderStyle,
  boxShadow,
  componentToken,
}

export type ThemeToken = typeof defaultToken