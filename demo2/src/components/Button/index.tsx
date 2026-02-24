import React from 'react'
import { StyledButton, StyledLink, loadingIconStyles } from './style'

export interface ButtonProps {
  /** 按钮类型 */
  type?: 'primary' | 'default' | 'danger' | 'link'
  /** 按钮大小 */
  size?: 'large' | 'middle' | 'small'
  /** 是否禁用 */
  disabled?: boolean
  /** 是否加载中 */
  loading?: boolean
  /** 点击事件 */
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
  /** 自定义类名 */
  className?: string
  /** 按钮内容 */
  children?: React.ReactNode
  /** HTML按钮类型 */
  htmlType?: 'button' | 'submit' | 'reset'
  /** 链接按钮的href */
  href?: string
  /** 链接按钮的target */
  target?: string
  /** 链接按钮的rel */
  rel?: string
  /** 自定义样式 */
  style?: React.CSSProperties
}

/**
 * 按钮组件 - 基于CSS-in-JS架构
 */
export const Button: React.FC<ButtonProps> = ({
  type = 'default',
  size = 'middle',
  disabled = false,
  loading = false,
  onClick,
  className,
  children,
  htmlType = 'button',
  href,
  target,
  rel,
  style,
  ...restProps
}) => {
  // 处理点击事件
  const handleClick = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled || loading) {
      event.preventDefault()
      return
    }
    
    if (onClick) {
      onClick(event)
    }
  }
  
  // 链接按钮
  if (type === 'link' && href) {
    return (
      <StyledLink
        href={disabled ? undefined : href}
        target={target}
        rel={rel}
        $size={size}
        $type={type}
        $disabled={disabled}
        $loading={loading}
        className={className}
        style={style}
        onClick={handleClick}
        {...restProps}
      >
        {loading && <span css={loadingIconStyles} />}
        {children}
      </StyledLink>
    )
  }
  
  // 普通按钮
  return (
    <StyledButton
      type={htmlType}
      $size={size}
      $type={type}
      $disabled={disabled}
      $loading={loading}
      className={className}
      style={style}
      disabled={disabled || loading}
      onClick={handleClick}
      {...restProps}
    >
      {loading && <span css={loadingIconStyles} />}
      {children}
    </StyledButton>
  )
}

Button.displayName = 'Button'

export default Button