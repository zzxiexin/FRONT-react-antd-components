import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import './modal.less';

export interface ModalProps {
  /** 是否显示模态框 */
  visible?: boolean;
  /** 标题 */
  title?: React.ReactNode;
  /** 关闭时回调 */
  onClose?: () => void;
  /** 确认按钮文本 */
  okText?: string;
  /** 取消按钮文本 */
  cancelText?: string;
  /** 确认按钮点击回调 */
  onOk?: () => void;
  /** 取消按钮点击回调 */
  onCancel?: () => void;
  /** 是否显示确认按钮 */
  showOk?: boolean;
  /** 是否显示取消按钮 */
  showCancel?: boolean;
  /** 自定义底部内容 */
  footer?: React.ReactNode;
  /** 点击蒙层是否允许关闭 */
  maskClosable?: boolean;
  /** 是否显示右上角的关闭按钮 */
  closable?: boolean;
  /** 宽度 */
  width?: number | string;
  /** 自定义类名 */
  className?: string;
  /** 内容 */
  children?: React.ReactNode;
  /** 是否支持键盘ESC关闭 */
  keyboard?: boolean;
}

/**
 * 模态框组件
 */
export const Modal: React.FC<ModalProps> = ({
  visible = false,
  title,
  onClose,
  okText = '确认',
  cancelText = '取消',
  onOk,
  onCancel,
  showOk = true,
  showCancel = true,
  footer,
  maskClosable = true,
  closable = true,
  width = 520,
  className,
  children,
  keyboard = true,
}) => {
  // 处理ESC键关闭
  useEffect(() => {
    if (!keyboard || !visible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyboard, visible, onClose]);

  // 处理蒙层点击
  const handleMaskClick = () => {
    if (maskClosable) {
      onClose?.();
    }
  };

  // 处理取消按钮
  const handleCancel = () => {
    onCancel?.();
    onClose?.();
  };

  // 处理确认按钮
  const handleOk = () => {
    onOk?.();
    onClose?.();
  };

  // 默认底部
  const defaultFooter = (
    <div className="dt-modal-footer">
      {showCancel && (
        <button className="dt-modal-btn dt-modal-btn-cancel" onClick={handleCancel}>
          {cancelText}
        </button>
      )}
      {showOk && (
        <button className="dt-modal-btn dt-modal-btn-ok" onClick={handleOk}>
          {okText}
        </button>
      )}
    </div>
  );

  const modalContent = (
    <div className={classNames('dt-modal-root', className)} style={{ display: visible ? 'block' : 'none' }}>
      {/* 蒙层 */}
      <div className="dt-modal-mask" onClick={handleMaskClick} />
      
      {/* 模态框主体 */}
      <div className="dt-modal-wrap">
        <div className="dt-modal" style={{ width }}>
          {/* 标题栏 */}
          <div className="dt-modal-header">
            <div className="dt-modal-title">{title}</div>
            {closable && (
              <button className="dt-modal-close" onClick={onClose}>
                ×
              </button>
            )}
          </div>
          
          {/* 内容区域 */}
          <div className="dt-modal-body">{children}</div>
          
          {/* 底部 */}
          <div className="dt-modal-footer">{footer !== undefined ? footer : defaultFooter}</div>
        </div>
      </div>
    </div>
  );

  // 使用Portal渲染到body
  return ReactDOM.createPortal(modalContent, document.body);
};

export default Modal;