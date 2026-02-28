import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import './select.less';

export interface SelectOption {
  /** 选项的值 */
  value: string | number;
  /** 选项的显示文本 */
  label: React.ReactNode;
  /** 是否禁用该选项 */
  disabled?: boolean;
  /** 选项的标题，鼠标悬停时显示 */
  title?: string;
}

export interface SelectProps {
  /** 选择框大小 */
  size?: 'large' | 'middle' | 'small';
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 占位符 */
  placeholder?: string;
  /** 当前选中的值（受控模式） */
  value?: string | number | (string | number)[];
  /** 默认选中的值（非受控模式） */
  defaultValue?: string | number | (string | number)[];
  /** 选择框变化时的回调 */
  onChange?: (value: string | number | (string | number)[], option?: SelectOption | SelectOption[] | null) => void;
  /** 获得焦点时的回调 */
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
  /** 失去焦点时的回调 */
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
  /** 下拉框可见状态变化时的回调 */
  onDropdownVisibleChange?: (visible: boolean) => void;
  /** 选项数据 */
  options?: SelectOption[];
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 是否显示下拉箭头 */
  showArrow?: boolean;
  /** 下拉框是否与选择框同宽 */
  dropdownMatchSelectWidth?: boolean;
  /** 下拉框样式 */
  dropdownStyle?: React.CSSProperties;
  /** 下拉框类名 */
  dropdownClassName?: string;
  /** 选择模式：单选或多选 */
  mode?: 'single' | 'multiple';
  /** 最大标签数量（多选时显示） */
  maxTagCount?: number;
  /** 自定义标签渲染（多选时） */
  tagRender?: (props: { label: React.ReactNode; value: string | number; onClose: () => void }) => React.ReactNode;
  /** 是否显示搜索框 */
  showSearch?: boolean;
  /** 自定义筛选函数 */
  filterOption?: (inputValue: string, option: SelectOption) => boolean;
  /** 自定义选项渲染 */
  optionRender?: (option: SelectOption) => React.ReactNode;
  /** 是否默认展开下拉框 */
  defaultOpen?: boolean;
  /** 下拉框是否展开（受控模式） */
  open?: boolean;
  /** 是否自动获取焦点 */
  autoFocus?: boolean;
  /** 原生 input 属性 */
  name?: string;
  /** 原生 input 属性 */
  id?: string;
}

/**
 * 选择器组件
 */
export const Select: React.FC<SelectProps> = ({
  size = 'middle',
  disabled = false,
  allowClear = false,
  placeholder = '请选择',
  value: controlledValue,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  onDropdownVisibleChange,
  options = [],
  className,
  style,
  showArrow = true,
  dropdownMatchSelectWidth = true,
  dropdownStyle,
  dropdownClassName,
  mode = 'single',
  maxTagCount,
  tagRender,
  showSearch = false,
  filterOption,
  optionRender,
  defaultOpen = false,
  open: controlledOpen,
  autoFocus = false,
  name,
  id,
}) => {
  const [internalValue, setInternalValue] = useState<string | number | (string | number)[]>(
    defaultValue || (mode === 'multiple' ? [] : '')
  );
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [searchValue, setSearchValue] = useState('');
  const [focused, setFocused] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const selectRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isControlled = controlledValue !== undefined;
  const isOpenControlled = controlledOpen !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const open = isOpenControlled ? controlledOpen : internalOpen;

  // 处理自动获取焦点
  useEffect(() => {
    if (autoFocus && selectRef.current) {
      selectRef.current.focus();
    }
  }, [autoFocus]);

  // 点击外部关闭下拉框
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        handleOpenChange(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // 监听窗口变化更新下拉框位置
  useEffect(() => {
    if (!open) return;

    const handleWindowChange = () => {
      setUpdateTrigger(prev => prev + 1);
    };

    window.addEventListener('scroll', handleWindowChange, true);
    window.addEventListener('resize', handleWindowChange);

    return () => {
      window.removeEventListener('scroll', handleWindowChange, true);
      window.removeEventListener('resize', handleWindowChange);
    };
  }, [open]);

  // 过滤选项
  const filteredOptions = React.useMemo(() => {
    if (!searchValue || !showSearch) return options;
    
    if (filterOption) {
      return options.filter(option => filterOption(searchValue, option));
    }
    
    // 默认过滤：根据label进行模糊匹配
    return options.filter(option => {
      const label = String(option.label).toLowerCase();
      return label.includes(searchValue.toLowerCase());
    });
  }, [options, searchValue, showSearch, filterOption]);

  // 获取选中的选项
  const getSelectedOptions = useCallback(() => {
    if (mode === 'multiple') {
      // 多选模式
      if (!Array.isArray(value)) {
        return [];
      }
      return options.filter(option => value.includes(option.value));
    }
    
    // 单选模式
    if (value === '' || value === null || value === undefined) {
      return null;
    }
    return options.find(option => option.value === value) || null;
  }, [value, mode, options]);

  // 处理打开/关闭下拉框
  const handleOpenChange = (newOpen: boolean) => {
    if (disabled) return;
    
    if (!isOpenControlled) {
      setInternalOpen(newOpen);
    }
    
    if (newOpen && showSearch && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchValue('');
    }
    
    onDropdownVisibleChange?.(newOpen);
  };

  // 处理选择
  const handleSelect = (option: SelectOption) => {
    console.log('handleSelect called', { option, mode, value, isControlled });
    if (option.disabled) return;

    let newValue: string | number | (string | number)[];
    
    if (mode === 'multiple') {
      const currentValue = Array.isArray(value) ? value : [];
      const index = currentValue.indexOf(option.value);
      
      if (index > -1) {
        // 取消选择
        newValue = [...currentValue.slice(0, index), ...currentValue.slice(index + 1)];
      } else {
        // 添加选择
        newValue = [...currentValue, option.value];
      }
    } else {
      newValue = option.value;
      handleOpenChange(false);
    }

    if (!isControlled) {
      setInternalValue(newValue);
    }

    if (onChange) {
      const selectedOptions = mode === 'multiple' 
        ? options.filter(opt => (newValue as (string | number)[]).includes(opt.value))
        : option;
      onChange(newValue, selectedOptions);
    }

    setSearchValue('');
  };

  // 清除选择
  const handleClear = (event: React.MouseEvent) => {
    console.log('Clear button clicked', { value, mode, isControlled });
    event.preventDefault();
    event.stopPropagation();
    
    const newValue = mode === 'multiple' ? [] : '';
    
    if (!isControlled) {
      console.log('Setting internal value:', newValue);
      setInternalValue(newValue);
    }
    
     if (onChange) {
       console.log('Calling onChange with:', newValue);
       onChange(newValue, mode === 'multiple' ? [] : undefined);
     }
    
    // 重置搜索值
    setSearchValue('');
  };

  // 处理焦点
  const handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    setFocused(true);
    onFocus?.(event);
  };

  // 处理失去焦点
  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    setFocused(false);
    onBlur?.(event);
  };

  // 处理搜索
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  // 渲染选中内容
  const renderSelection = () => {
    const selectedOptions = getSelectedOptions();
    
    if (mode === 'multiple') {
      const selected = selectedOptions as SelectOption[];
      if (selected.length === 0) {
        return <span className="dt-select-placeholder">{placeholder}</span>;
      }
      
      const displayItems = maxTagCount && selected.length > maxTagCount 
        ? selected.slice(0, maxTagCount)
        : selected;
      
      return (
        <>
          {displayItems.map(option => {
            if (tagRender) {
              return tagRender({
                label: option.label,
                value: option.value,
                onClose: () => handleSelect(option)
              });
            }
            
            return (
              <span key={option.value} className="dt-select-tag">
                <span className="dt-select-tag-content">{option.label}</span>
                <span 
                  className="dt-select-tag-close"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(option);
                  }}
                >
                  ×
                </span>
              </span>
            );
          })}
          
          {maxTagCount && selected.length > maxTagCount && (
            <span className="dt-select-tag dt-select-tag-more">
              +{selected.length - maxTagCount}
            </span>
          )}
        </>
      );
    }
    
    // 单选模式
    const selected = selectedOptions as SelectOption | null;
    if (!selected) {
      return <span className="dt-select-placeholder">{placeholder}</span>;
    }
    
    return <span className="dt-select-selection-item">{selected.label}</span>;
  };

  // 构建类名
  const selectClasses = classNames(
    'dt-select',
    `dt-select-${size}`,
    {
      'dt-select-disabled': disabled,
      'dt-select-focused': focused,
      'dt-select-open': open,
      'dt-select-allow-clear': allowClear && value && !disabled,
      'dt-select-multiple': mode === 'multiple',
      'dt-select-single': mode === 'single',
    },
    className
  );

  // 下拉框类名
  const dropdownClasses = classNames(
    'dt-select-dropdown',
    dropdownClassName
  );



  // 渲染下拉框
  const renderDropdown = () => {
    if (!open) return null;

    // 计算下拉框位置
    let dropdownStyles: React.CSSProperties = {
      ...dropdownStyle,
    };

    if (selectRef.current) {
      const selectRect = selectRef.current.getBoundingClientRect();
      dropdownStyles = {
        ...dropdownStyles,
        top: selectRect.bottom,
        left: selectRect.left,
        minWidth: dropdownMatchSelectWidth ? selectRef.current.offsetWidth : undefined,
      };
    }

    const dropdownContent = (
      <div 
        ref={dropdownRef}
        className={dropdownClasses}
        style={dropdownStyles}
        onClick={(e) => e.stopPropagation()}
      >
        {showSearch && (
          <div className="dt-select-search">
            <input
              ref={searchInputRef}
              type="text"
              className="dt-select-search-input"
              placeholder="搜索..."
              value={searchValue}
              onChange={handleSearch}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
        
        <div className="dt-select-options">
          {filteredOptions.length === 0 ? (
            <div className="dt-select-option dt-select-option-empty">
              暂无数据
            </div>
          ) : (
            filteredOptions.map(option => {
              const isSelected = mode === 'multiple'
                ? Array.isArray(value) && value.includes(option.value)
                : value === option.value;
              
              const optionClasses = classNames('dt-select-option', {
                'dt-select-option-selected': isSelected,
                'dt-select-option-disabled': option.disabled,
              });
              
              return (
                <div
                  key={option.value}
                  className={optionClasses}
                  onClick={() => handleSelect(option)}
                  title={option.title}
                >
                  {optionRender ? optionRender(option) : option.label}
                </div>
              );
            })
          )}
        </div>
      </div>
    );

    return ReactDOM.createPortal(dropdownContent, document.body);
  };

   return (
    <>
      <div
        ref={selectRef}
        className={selectClasses}
        style={style}
        tabIndex={disabled ? -1 : 0}
        onClick={() => handleOpenChange(!open)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <div className="dt-select-selector">
          {renderSelection()}
          
          <input
            type="hidden"
            name={name}
            id={id}
            value={Array.isArray(value) ? value.join(',') : value}
          />
        </div>
        
        <div className="dt-select-arrow">
          {allowClear && !disabled && (mode === 'multiple' ? (Array.isArray(value) && value.length > 0) : (value != null && value !== '')) ? (
             <span 
              className="dt-select-clear" 
              onClick={handleClear}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              ×
            </span>
          ) : showArrow ? (
            <span className="dt-select-arrow-icon">▼</span>
          ) : null}
        </div>
      </div>
      
      {renderDropdown()}
    </>
  );
};

export default Select;