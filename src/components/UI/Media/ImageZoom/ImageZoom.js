// src/components/UI/Media/ImageZoom/ImageZoom.js
import React, { useState, useCallback, useRef } from 'react';
import styles from './ImageZoom.module.css';

/**
 * ImageZoom component - Hình ảnh có thể phóng to
 * @param {string} src - Đường dẫn hình ảnh
 * @param {string} alt - Alt text cho hình ảnh
 * @param {number} width - Chiều rộng container
 * @param {number} height - Chiều cao container
 * @param {number} zoomFactor - Hệ số zoom (1.5, 2, 2.5, etc.)
 * @param {number} backgroundOpacity - Độ mờ của background khi zoom (0-1)
 * @param {string} className - Class bổ sung
 */
const ImageZoom = ({
  src,
  alt,
  width,
  height,
  zoomFactor = 2,
  backgroundOpacity = 0.8,
  className = '',
  ...rest
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Tính toán vị trí zoom dựa trên tọa độ con trỏ chuột
  const calculateZoomPosition = useCallback((e) => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    
    // Tính tỷ lệ vị trí con trỏ trong container (0-1)
    const relativeX = (e.clientX - containerRect.left) / containerRect.width;
    const relativeY = (e.clientY - containerRect.top) / containerRect.height;
    
    // Giới hạn giá trị từ 0 đến 1
    const boundedX = Math.max(0, Math.min(1, relativeX));
    const boundedY = Math.max(0, Math.min(1, relativeY));
    
    // Chuyển đổi thành phần trăm để di chuyển background
    // Phần trăm di chuyển phụ thuộc vào zoomFactor
    const percentX = boundedX * 100;
    const percentY = boundedY * 100;
    
    setPosition({ x: percentX, y: percentY });
  }, []);

  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => setIsZoomed(false);
  const handleMouseMove = (e) => {
    if (isZoomed) {
      calculateZoomPosition(e);
    }
  };

  // Tính toán transform và background position
  const zoomedImageStyle = {
    transform: `scale(${zoomFactor})`,
    transformOrigin: `${position.x}% ${position.y}%`
  };

  return (
    <div 
      ref={containerRef}
      className={`${styles.zoomContainer} ${className}`}
      style={{ width, height }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      {...rest}
    >
      <img 
        src={src} 
        alt={alt} 
        className={`${styles.zoomImage} ${isZoomed ? styles.zoomed : ''}`}
        style={isZoomed ? zoomedImageStyle : {}}
      />
      
      {isZoomed && (
        <div 
          className={styles.overlay} 
          style={{ backgroundColor: `rgba(0, 0, 0, ${backgroundOpacity})` }}
        />
      )}
      
      <div className={styles.indicator} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
      </div>
    </div>
  );
};

export default ImageZoom;