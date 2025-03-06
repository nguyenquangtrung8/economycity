// src/components/UI/DataDisplay/List/List.js
import React from 'react';
import styles from './List.module.css';

/**
 * List component - Hiển thị danh sách dữ liệu dạng có cấu trúc
 * @param {Array} items - Mảng các item cần hiển thị
 * @param {Function} renderItem - Hàm render cho mỗi item
 * @param {Function} keyExtractor - Hàm lấy key cho mỗi item
 * @param {string} className - Class bổ sung
 * @param {boolean} bordered - Có hiển thị đường viền giữa các item
 * @param {string} size - Kích thước (sm, md, lg)
 * @param {string} type - Kiểu hiển thị (ordered, unordered, none)
 * @param {boolean} horizontal - Hiển thị theo chiều ngang
 * @param {ReactNode} header - Nội dung header
 * @param {ReactNode} footer - Nội dung footer
 * @param {ReactNode} emptyState - Hiển thị khi không có dữ liệu
 */
const List = ({
  items = [],
  renderItem,
  keyExtractor,
  className = '',
  bordered = true,
  size = 'md',
  type = 'none',
  horizontal = false,
  header,
  footer,
  emptyState,
  ...rest
}) => {
  // Xác định loại thẻ cần sử dụng
  const ListTag = type === 'ordered' ? 'ol' : type === 'unordered' ? 'ul' : 'div';
  
  // Nếu không có dữ liệu
  if (items.length === 0 && emptyState) {
    return (
      <div className={`${styles.list} ${styles.emptyState} ${className}`} {...rest}>
        {header && <div className={styles.header}>{header}</div>}
        {emptyState}
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    );
  }

  return (
    <div className={`${styles.listContainer} ${className}`} {...rest}>
      {header && <div className={styles.header}>{header}</div>}
      
      <ListTag 
        className={`
          ${styles.list}
          ${styles[`size-${size}`]}
          ${bordered ? styles.bordered : ''}
          ${horizontal ? styles.horizontal : ''}
        `}
      >
        {items.map((item, index) => {
          const key = keyExtractor ? keyExtractor(item, index) : index;
          
          return (
            <li key={key} className={styles.item}>
              {renderItem(item, index)}
            </li>
          );
        })}
      </ListTag>
      
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
};

export default List;