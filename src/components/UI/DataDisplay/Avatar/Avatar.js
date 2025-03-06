// src/components/UI/DataDisplay/Avatar/Avatar.js
import React, { useState } from 'react';
import styles from './Avatar.module.css';

/**
 * Avatar component - Hiển thị hình đại diện hoặc placeholder
 * @param {string} src - Đường dẫn hình ảnh
 * @param {string} alt - Alt text cho hình ảnh
 * @param {string} className - Class bổ sung
 * @param {string} size - Kích thước (xs, sm, md, lg, xl)
 * @param {string} shape - Hình dạng (circle, square, rounded)
 * @param {string} name - Tên (để hiển thị initials nếu không có hình)
 * @param {string} bgColor - Màu nền tùy chọn
 * @param {string} textColor - Màu chữ tùy chọn
 * @param {ReactNode} icon - Icon thay thế
 * @param {Function} onClick - Handler khi click vào avatar
 */
const Avatar = ({
  src,
  alt = 'avatar',
  className = '',
  size = 'md',
  shape = 'circle',
  name,
  bgColor,
  textColor,
  icon,
  onClick,
  ...rest
}) => {
  const [imageError, setImageError] = useState(false);
  
  // Xử lý lỗi khi tải hình ảnh
  const handleImageError = () => {
    setImageError(true);
  };
  
  // Lấy chữ cái đầu của tên để hiển thị
  const getInitials = () => {
    if (!name) return '';
    
    // Tách tên thành các từ
    const words = name.trim().split(' ');
    
    // Nếu chỉ có một từ, lấy chữ cái đầu tiên
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    
    // Lấy chữ cái đầu tiên của từ đầu tiên và từ cuối cùng
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  };
  
  // Tính toán màu nền ngẫu nhiên nhưng ổn định dựa vào tên
  const getRandomColor = () => {
    if (!name) return '#1e40af'; // Màu mặc định là primary
    
    // Tạo một mã hash đơn giản từ tên
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Chuyển đổi hash thành màu sắc
    const colors = [
      '#1e40af', // primary
      '#b78f00', // secondary
      '#047857', // success
      '#b45309', // warning
      '#be123c', // danger
      '#0f766e', // info
    ];
    
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };
  
  // Xác định nội dung hiển thị
  const renderContent = () => {
    // Nếu có icon, hiển thị icon
    if (icon) {
      return <div className={styles.icon}>{icon}</div>;
    }
    
    // Nếu có hình và không bị lỗi, hiển thị hình
    if (src && !imageError) {
      return (
        <img
          src={src}
          alt={alt}
          className={styles.image}
          onError={handleImageError}
        />
      );
    }
    
    // Nếu có tên, hiển thị initials
    if (name) {
      return <div className={styles.initials}>{getInitials()}</div>;
    }
    
    // Mặc định hiển thị icon người dùng
    return (
      <div className={styles.placeholder}>
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          height="70%"
          width="70%"
          aria-hidden="true"
        >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </div>
    );
  };
  
  // Style động dựa vào props
  const avatarStyle = {
    backgroundColor: bgColor || (name && !src && !imageError ? getRandomColor() : undefined),
    color: textColor || 'white',
    cursor: onClick ? 'pointer' : 'default'
  };

  return (
    <div
      className={`
        ${styles.avatar}
        ${styles[`size-${size}`]}
        ${styles[`shape-${shape}`]}
        ${className}
      `}
      style={avatarStyle}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...rest}
    >
      {renderContent()}
    </div>
  );
};

export default Avatar;