import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { ThemeToken } from '../../theme/token'

// 按钮基础样式
export const buttonBaseStyles = (token: ThemeToken) => css`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: ${token.componentToken.button.fontWeight};
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: ${token.componentToken.button.borderWidth} ${token.componentToken.button.borderStyle} transparent;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
  touch-action: manipulation;
  line-height: 1.5715;
  font-family: ${token.typography.fontFamily};
  outline: none;
  
  &:focus {
    outline: 0;
  }
`

// 按钮大小样式
export const buttonSizeStyles = (token: ThemeToken, size: 'large' | 'middle' | 'small') => {
  const { button } = token.componentToken
  
  switch (size) {
    case 'large':
      return css`
        height: ${button.heightLg};
        padding: 0 ${button.paddingHorizontalLg};
        font-size: ${button.fontSizeLg};
        border-radius: ${button.borderRadiusBase};
      `
    case 'small':
      return css`
        height: ${button.heightSm};
        padding: 0 ${button.paddingHorizontalSm};
        font-size: ${button.fontSizeSm};
        border-radius: ${button.borderRadiusSm};
      `
    case 'middle':
    default:
      return css`
        height: ${button.heightBase};
        padding: 0 ${button.paddingHorizontalBase};
        font-size: ${button.fontSizeBase};
        border-radius: ${button.borderRadiusBase};
      `
  }
}

// 按钮类型样式
export const buttonTypeStyles = (token: ThemeToken, type: 'primary' | 'default' | 'danger' | 'link') => {
  const { button } = token.componentToken
  
  switch (type) {
    case 'primary':
      return css`
        color: ${button.primaryColor};
        background-color: ${button.primaryBg};
        border-color: ${button.primaryBorder};
        
        &:hover:not(:disabled):not(.loading) {
          background-color: ${token.primaryHover};
          border-color: ${token.primaryHover};
        }
        
        &:active:not(:disabled):not(.loading) {
          background-color: ${token.primaryActive};
          border-color: ${token.primaryActive};
        }
      `
    case 'danger':
      return css`
        color: ${button.dangerColor};
        background-color: ${button.dangerBg};
        border-color: ${button.dangerBorder};
        
        &:hover:not(:disabled):not(.loading) {
          background-color: ${token.error};
          border-color: ${token.error};
        }
        
        &:active:not(:disabled):not(.loading) {
          background-color: ${token.error};
          border-color: ${token.error};
        }
      `
    case 'link':
      return css`
        color: ${token.primary};
        background-color: transparent;
        border-color: transparent;
        padding: 0;
        height: auto;
        
        &:hover:not(:disabled):not(.loading) {
          color: ${token.primaryHover};
        }
        
        &:active:not(:disabled):not(.loading) {
          color: ${token.primaryActive};
        }
      `
    case 'default':
    default:
      return css`
        color: ${button.defaultColor};
        background-color: ${button.defaultBg};
        border-color: ${button.defaultBorder};
        
        &:hover:not(:disabled):not(.loading) {
          color: ${token.primary};
          border-color: ${token.primary};
        }
        
        &:active:not(:disabled):not(.loading) {
          color: ${token.primaryActive};
          border-color: ${token.primaryActive};
        }
      `
  }
}

// 按钮状态样式
export const buttonStateStyles = (token: ThemeToken, disabled: boolean, loading: boolean) => {
  const { button } = token.componentToken
  
  return css`
    ${disabled || loading ? 'cursor: not-allowed;' : ''}
    ${disabled || loading ? 'opacity: 0.65;' : ''}
    
    ${disabled ? css`
      color: ${button.disabledColor};
      background-color: ${button.disabledBg};
      border-color: ${button.disabledBorder};
      
      &:hover,
      &:active {
        color: ${button.disabledColor};
        background-color: ${button.disabledBg};
        border-color: ${button.disabledBorder};
      }
    ` : ''}
  `
}

// 加载图标样式
export const loadingIconStyles = css`
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-right: 8px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: button-spin 1s linear infinite;
  
  @keyframes button-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

// 样式化的Button组件
export const StyledButton = styled.button<{
  $size: 'large' | 'middle' | 'small'
  $type: 'primary' | 'default' | 'danger' | 'link'
  $disabled: boolean
  $loading: boolean
}>(({ theme, $size, $type, $disabled, $loading }) => {
  const token = theme as ThemeToken
  
  return css`
    ${buttonBaseStyles(token)}
    ${buttonSizeStyles(token, $size)}
    ${buttonTypeStyles(token, $type)}
    ${buttonStateStyles(token, $disabled, $loading)}
    
    // 链接按钮特殊处理
    ${$type === 'link' && css`
      text-decoration: none;
      display: inline;
      height: auto;
      line-height: inherit;
      background: none;
      border: none;
    `}
  `
})

// 样式化的Link组件（用于链接按钮）
export const StyledLink = styled.a<{
  $size: 'large' | 'middle' | 'small'
  $type: 'primary' | 'default' | 'danger' | 'link'
  $disabled: boolean
  $loading: boolean
}>(({ theme, $size, $type, $disabled, $loading }) => {
  const token = theme as ThemeToken
  
  return css`
    ${buttonBaseStyles(token)}
    ${buttonSizeStyles(token, $size)}
    ${buttonTypeStyles(token, $type)}
    ${buttonStateStyles(token, $disabled, $loading)}
    
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    
    ${$type === 'link' && css`
      text-decoration: underline;
      display: inline;
      height: auto;
      line-height: inherit;
      background: none;
      border: none;
    `}
  `
})