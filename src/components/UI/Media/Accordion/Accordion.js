import React, { useState, useCallback, useRef } from 'react';
import styles from './Accordion.module.css';

/**
 * Accordion Component - Hiển thị nội dung có thể mở rộng/thu gọn
 * @param {Array} items - Mảng các items chứa { title, content, key, disabled }
 * @param {string|Array} defaultActiveKey - Key hoặc mảng các keys mặc định được mở
 * @param {boolean} multiple - Cho phép mở nhiều panel cùng lúc
 * @param {function} onChange - Handler khi thay đổi trạng thái (key, isActive)
 * @param {string} className - Class bổ sung
 * @param {string} headerClassName - Class bổ sung cho phần header
 * @param {string} contentClassName - Class bổ sung cho phần content
 * @param {string} iconPosition - Vị trí của icon (left, right)
 * @param {boolean} bordered - Có hiển thị border không
 * @param {boolean} ghost - Chế độ ghost (trong suốt)
 */
const Accordion = ({
  items = [],
  defaultActiveKey = null,
  multiple = false,
  onChange,
  className = '',
  headerClassName = '',
  contentClassName = '',
  iconPosition = 'right',
  bordered = true,
  ghost = false,
  ...rest
}) => {
  // State lưu trữ các keys đang mở
  const [activeKeys, setActiveKeys] = useState(() => {
    if (defaultActiveKey === null) return [];
    return Array.isArray(defaultActiveKey) ? defaultActiveKey : [defaultActiveKey];
  });

  // Ref để lưu trữ chiều cao thực tế của nội dung
  const contentRefs = useRef({});

  // Xử lý khi click vào header của một panel
  const handleToggle = useCallback(
    (key) => {
      setActiveKeys((prevActiveKeys) => {
        let newActiveKeys;

        if (prevActiveKeys.includes(key)) {
          // Đóng panel nếu đã mở
          newActiveKeys = prevActiveKeys.filter((k) => k !== key);
        } else {
          // Mở panel nếu chưa mở
          newActiveKeys = multiple ? [...prevActiveKeys, key] : [key];
        }

        // Gọi onChange callback nếu được cung cấp
        if (onChange) {
          const isActive = newActiveKeys.includes(key);
          onChange(key, isActive);
        }

        return newActiveKeys;
      });
    },
    [multiple, onChange]
  );

  // Check một item có đang mở hay không
  const isItemActive = (key) => activeKeys.includes(key);

  return (
    <div
      className={`${styles.accordion} ${bordered ? styles.bordered : ''} ${ghost ? styles.ghost : ''} ${className}`}
      {...rest}
    >
      {items.map((item, index) => {
        const key = item.key || index;
        const isActive = isItemActive(key);
        const isDisabled = item.disabled;

        return (
          <div
            key={key}
            className={`${styles.item} ${isActive ? styles.active : ''} ${isDisabled ? styles.disabled : ''}`}
          >
            {/* Header của panel */}
            <button
              className={`${styles.header} ${headerClassName}`}
              onClick={() => !isDisabled && handleToggle(key)}
              aria-expanded={isActive}
              aria-controls={`accordion-content-${key}`}
              id={`accordion-header-${key}`}
              tabIndex={isDisabled ? -1 : 0}
              onKeyDown={(e) => {
                if (!isDisabled && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  handleToggle(key);
                }
              }}
            >
              {iconPosition === 'left' && (
                <span className={`${styles.icon} ${isActive ? styles.iconActive : ''}`} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}

              <span className={styles.title}>{item.title}</span>

              {iconPosition === 'right' && (
                <span className={`${styles.icon} ${isActive ? styles.iconActive : ''}`} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </button>

            {/* Content container của panel */}
            <div
              className={`${styles.contentContainer} ${contentClassName}`}
              style={{
                height: isActive ? `${contentRefs.current[key]?.scrollHeight || 'auto'}px` : '0',
              }}
            >
              <div
                className={styles.content}
                id={`accordion-content-${key}`}
                role="region"
                aria-labelledby={`accordion-header-${key}`}
                ref={(el) => {
                  if (el) contentRefs.current[key] = el;
                }}
              >
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;