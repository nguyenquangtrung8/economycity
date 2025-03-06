// src/components/UI/DataDisplay/Card/Card.js
import React from 'react';
import styles from './Card.module.css';

/**
 * Card component - Container giúp hiển thị nội dung, sản phẩm với khung viền
 * @param {ReactNode} children - Nội dung bên trong card
 * @param {string} className - Class bổ sung từ bên ngoài
 * @param {ReactNode|string} title - Tiêu đề của card
 * @param {ReactNode} footer - Nội dung footer của card
 * @param {string} elevation - Độ nổi của card (none, sm, md, lg)
 * @param {function} onClick - Handler khi click vào card
 * @param {boolean} hoverable - Hiệu ứng khi hover
 * @param {boolean} bordered - Hiển thị viền
 */
const Card = ({
  children,
  className = '',
  title,
  footer,
  elevation = 'md',
  onClick,
  hoverable = true,
  bordered = true,
  ...rest
}) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div
      className={`
        ${styles.card}
        ${bordered ? styles.bordered : ''}
        ${styles[`elevation-${elevation}`]}
        ${hoverable ? styles.hoverable : ''}
        ${onClick ? styles.clickable : ''}
        ${className}
      `}
      onClick={handleClick}
      {...rest}
    >
      {title && (
        <div className={styles.cardHeader}>
          {typeof title === 'string' ? <h3 className={styles.cardTitle}>{title}</h3> : title}
        </div>
      )}
      
      <div className={styles.cardBody}>
        {children}
      </div>
      
      {footer && (
        <div className={styles.cardFooter}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;