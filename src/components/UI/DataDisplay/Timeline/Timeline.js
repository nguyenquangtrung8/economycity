// src/components/UI/DataDisplay/Timeline/Timeline.js
import React from 'react';
import styles from './Timeline.module.css';

/**
 * Timeline component - Hiển thị các sự kiện theo thời gian
 * @param {Array} items - Mảng các timeline items
 * @param {string} className - Class bổ sung
 * @param {string} mode - Chế độ hiển thị (left, right, alternate)
 * @param {string} labelPosition - Vị trí của label (start, center, end)
 * @param {string} color - Màu sắc chính của timeline
 * @param {boolean} reverse - Hiển thị ngược
 * @param {boolean} pending - Có hiển thị trạng thái đang chờ
 * @param {ReactNode} pendingDot - Dot hiển thị cho trạng thái đang chờ
 */
const Timeline = ({
  items = [],
  className = '',
  mode = 'left',
  labelPosition = 'start',
  color = 'primary',
  reverse = false,
  pending = false,
  pendingDot,
  ...rest
}) => {
  // Xử lý items nếu cần đảo ngược
  const timelineItems = reverse ? [...items].reverse() : items;
  
  // Nếu có trạng thái đang chờ, thêm một item pending vào cuối
  if (pending) {
    timelineItems.push({
      pending: true,
      dot: pendingDot,
      content: typeof pending === 'boolean' ? 'Đang chờ...' : pending
    });
  }

  return (
    <div 
      className={`
        ${styles.timeline}
        ${styles[`mode-${mode}`]}
        ${styles[`label-${labelPosition}`]}
        ${styles[`color-${color}`]}
        ${className}
      `}
      {...rest}
    >
      {timelineItems.map((item, index) => {
        // Xác định vị trí của item (trái/phải) trong chế độ alternate
        const position = mode === 'alternate' 
          ? index % 2 === 0 ? 'left' : 'right' 
          : mode;
        
        // Xác định xem có phải item cuối cùng hay không
        const isLast = index === timelineItems.length - 1;
        
        return (
          <div 
            key={item.key || index} 
            className={`
              ${styles.item}
              ${styles[`position-${position}`]}
              ${isLast ? styles.lastItem : ''}
              ${item.pending ? styles.pendingItem : ''}
              ${item.className || ''}
            `}
          >
            <div className={styles.tail} style={{ backgroundColor: item.color }}></div>
            
            <div className={styles.head}>
              <div 
                className={styles.dot}
                style={{ backgroundColor: item.color || `var(--${color}-color)` }}
              >
                {item.dot}
              </div>
            </div>
            
            {item.label && (
              <div className={styles.label}>
                {item.label}
              </div>
            )}
            
            <div className={styles.content}>
              {item.title && <div className={styles.title}>{item.title}</div>}
              <div className={styles.description}>{item.content || item.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;