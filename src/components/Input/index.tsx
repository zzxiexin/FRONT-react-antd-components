import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import './input.less';

export interface InputProps {
  /** 输入框类型 */
  type?: 'text' | 'password' | 'number' | 'textarea';
  /** 输入框大小 */
  size?: 'large' | 'middle' | 'small';
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readOnly?: boolean;
  /** 输入框值 */
  value?: string;
  /** 默认值 */
  defaultValue?: string;
  /** 输入框变化时的回调 */
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** 输入框获得焦点时的回调 */
  onFocus?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** 输入框失去焦点时的回调 */
  onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** 按下回车时的回调 */
  onPressEnter?: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** 输入框前缀 */
  prefix?: React.ReactNode;
  /** 输入框后缀 */
  suffix?: React.ReactNode;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 占位符 */
  placeholder?: string;
  /** 自定义类名 */
  className?: string;
  /** 输入框样式 */
  style?: React.CSSProperties;
  /** 最大长度 */
  maxLength?: number;
  /** 是否显示字数统计（仅 textarea 有效） */
  showCount?: boolean;
  /** textarea 行数 */
  rows?: number;
  /** 是否自动获取焦点 */
  autoFocus?: boolean;
  /** 原生 input 属性 */
  name?: string;
  /** 原生 input 属性 */
  id?: string;
}

/**
 * 输入框组件
 */
export const Input: React.FC<InputProps> = ({
  type = 'text',
  size = 'middle',
  disabled = false,
  readOnly = false,
  value: controlledValue,
  defaultValue = '',
  onChange,
  onFocus,
  onBlur,
  onPressEnter,
  prefix,
  suffix,
  allowClear = false,
  placeholder = '',
  className,
  style,
  maxLength,
  showCount = false,
  rows = 3,
  autoFocus = false,
  name,
  id,
  ...restProps
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  // 处理自动获取焦点
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // 处理值变化
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    if (onChange) {
      onChange(newValue, event);
    }
  };

  // 处理焦点
  const handleFocus = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFocused(true);
    if (onFocus) {
      onFocus(event);
    }
  };

  // 处理失去焦点
  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFocused(false);
    if (onBlur) {
      onBlur(event);
    }
  };

  // 处理按键
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && onPressEnter) {
      onPressEnter(event);
    }
  };

  // 清除输入
  const handleClear = () => {
    if (!isControlled) {
      setInternalValue('');
    }
    
    if (onChange) {
      onChange('', {
        target: { value: '' }
      } as React.ChangeEvent<HTMLInputElement>);
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // 构建类名
  const classes = classNames(
    'dt-input',
    `dt-input-${size}`,
    {
      'dt-input-disabled': disabled,
      'dt-input-focused': focused,
      'dt-input-readonly': readOnly,
      'dt-input-with-prefix': prefix,
      'dt-input-with-suffix': suffix || allowClear,
      'dt-input-textarea': type === 'textarea',
    },
    className
  );

  // 渲染清除按钮
  const renderClearIcon = () => {
    if (allowClear && value && !disabled) {
      return (
        <span 
          className="dt-input-clear-icon" 
          onClick={handleClear}
          role="button"
          aria-label="Clear input"
        >
          ×
        </span>
      );
    }
    return null;
  };

  // 渲染字数统计
  const renderCount = () => {
    if (!showCount || type !== 'textarea') return null;
    
    const currentLength = value?.length || 0;
    return (
      <div className="dt-input-count">
        <span className="dt-input-count-current">{currentLength}</span>
        {maxLength && <span className="dt-input-count-divider">/</span>}
        {maxLength && <span className="dt-input-count-max">{maxLength}</span>}
      </div>
    );
  };

  // 渲染输入框
  const renderInput = () => {
    const inputProps = {
      ref: inputRef as any,
      type: type === 'textarea' ? undefined : type,
      value: value || '',
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
      disabled,
      readOnly,
      placeholder,
      className: 'dt-input-inner',
      maxLength,
      name,
      id,
      style,
      ...restProps,
    };

    if (type === 'textarea') {
      return <textarea {...inputProps} rows={rows} />;
    }

    return <input {...inputProps} />;
  };

  return (
    <div className={classes} style={style}>
      {prefix && <span className="dt-input-prefix">{prefix}</span>}
      
      <div className="dt-input-wrapper">
        {renderInput()}
        {renderClearIcon()}
        {suffix && <span className="dt-input-suffix">{suffix}</span>}
      </div>
      
      {renderCount()}
    </div>
  );
};

export default Input;