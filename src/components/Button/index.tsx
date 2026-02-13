import React from 'react';
import classNames from 'classnames';
import './button.less';

export interface ButtonProps {
  /** 按钮类型 */
  type?: 'primary' | 'default' | 'danger' | 'link';
  /** 按钮大小 */
  size?: 'large' | 'middle' | 'small';
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 点击事件 */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** 自定义类名 */
  className?: string;
  /** 按钮内容 */
  children?: React.ReactNode;
  /** HTML按钮类型 */
  htmlType?: 'button' | 'submit' | 'reset';
  /** 链接按钮的href */
  href?: string;
  /** 链接按钮的target */
  target?: string;
}

/**
 * 按钮组件
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
  ...restProps
}) => {
  const classes = classNames(
    'dt-btn',
    `dt-btn-${type}`,
    `dt-btn-${size}`,
    {
      'dt-btn-disabled': disabled,
      'dt-btn-loading': loading
    },
    className
  );

  // 处理点击事件
  const handleClick = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled || loading) {
      event.preventDefault();
      return;
    }
    
    if (onClick) {
      (onClick as any)(event);
    }
  };

  // 链接按钮
  if (type === 'link' && href) {
    return (
      <a
        className={classes}
        href={disabled ? undefined : href}
        target={target}
        onClick={handleClick}
        {...restProps}
      >
        {loading && <span className="dt-btn-loading-icon" />}
        {children}
      </a>
    );
  }

  // 普通按钮
  return (
    <button
      type={htmlType}
      className={classes}
      disabled={disabled || loading}
      onClick={handleClick}
      {...restProps}
    >
      {loading && <span className="dt-btn-loading-icon" />}
      {children}
    </button>
  );
};

export default Button;
