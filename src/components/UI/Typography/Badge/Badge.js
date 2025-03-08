import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Badge.module.css';

/**
 * Badge component - Nút thông báo hiển thị trạng thái
 */
const Badge = ({
  children,
  className = '',
  variant = 'info',
  size = 'md',
  position = 'topRight',
  absolute = false,
  ribbon = false,
  ribbonPosition = 'topRight',
  ribbonStyle = 'corner',
  animation = '',
  count = 0,
  dot = false,
  visible = true,
  onClick,
  onClose,
  childrenWrapper = false,
  ...rest
}) => {
  // Kiểm tra xung đột giữa ribbon và absolute
  if (ribbon && absolute && process.env.NODE_ENV !== 'production') {
    console.warn('Badge: Using both ribbon and absolute positioning may cause unexpected results');
  }

  // Cảnh báo nếu có children nhưng ở chế độ dot
  useEffect(() => {
    if (dot && children && process.env.NODE_ENV !== 'production') {
      console.warn('Badge: Children will not be rendered when dot=true');
    }
  }, [dot, children]);

  // Xác thực và xử lý giá trị mặc định cho variant
  const sanitizeVariant = (variant) => {
    const validVariants = [
      'success', 'warning', 'danger', 'info', 'sale', 'promo', 'featured', 'new', 'hot', 'limited', 'event'
    ];
    return validVariants.includes(variant) ? variant : 'info';
  };

  const safeVariant = sanitizeVariant(variant);

  // Tạo classes cho badge
  const getBadgeClasses = () => {
    return clsx(
      styles.badge,
      styles[`badge-${safeVariant}`],
      styles[`badge-${size}`],
      absolute && styles.absolute,
      absolute && styles[`position-${position}`],
      ribbon && styles.ribbon,
      ribbon && styles[`ribbon-${ribbonPosition}`],
      ribbon && styles[`ribbon-${ribbonStyle}`],
      animation && styles[`animation-${animation}`],
      dot && styles.dot,
      className
    );
  };

  const badgeClasses = getBadgeClasses();

  // Render phần tử badge
  const badgeElement = (
    <span
      className={badgeClasses}
      onClick={onClick}
      role={safeVariant === 'danger' || safeVariant === 'warning' ? 'status' : undefined}
      aria-live={safeVariant === 'danger' || safeVariant === 'warning' ? 'polite' : undefined}
      aria-label={dot && !children ? `${safeVariant} notification` : undefined}
      aria-hidden={dot && children ? true : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...rest}
    >
      {!dot && children}
      {renderCountIndicator()}
      {renderCloseButton()}
    </span>
  );

  // Render nút đóng (close button)
  const renderCloseButton = () => {
    if (!onClose) return null;
    return (
      <button
        className={styles.closeButton}
        onClick={(e) => {
          e.stopPropagation();
          onClose(e);
        }}
        aria-label="Close"
      >
        &times;
      </button>
    );
  };

  // Render số lượng thông báo (count indicator)
  const renderCountIndicator = () => {
    if (count <= 0) return null;
    return <span className={styles.count}>{count > 99 ? '99+' : count}</span>;
  };

  // Nếu không visible, trả về children hoặc null
  if (!visible) return children || null;

  // Nếu sử dụng childrenWrapper, bọc children và badge
  if (childrenWrapper && children) {
    return (
      <div className={styles.badgeWrapper}>
        {children}
        {badgeElement}
      </div>
    );
  }

  return badgeElement;
};

// Prop types validation
Badge.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'success', 'warning', 'danger', 'info', 'sale', 'promo', 'featured', 'new', 'hot', 'limited', 'event'
  ]),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  position: PropTypes.oneOf(['topLeft', 'topRight', 'bottomLeft', 'bottomRight']),
  absolute: PropTypes.bool,
  ribbon: PropTypes.bool,
  ribbonPosition: PropTypes.oneOf(['topRight', 'topLeft']),
  ribbonStyle: PropTypes.oneOf(['corner', 'edge']),
  animation: PropTypes.oneOf(['pulse', 'glow', 'bounce', 'shake']),
  count: PropTypes.number,
  dot: PropTypes.bool,
  visible: PropTypes.bool,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  childrenWrapper: PropTypes.bool,
};

export default React.memo(Badge);