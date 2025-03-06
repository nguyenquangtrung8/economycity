// src/components/UI/Media/Image/Image.js
import React, { useState } from 'react';
import styles from './Image.module.css';

/**
 * Image component - Hình ảnh với lazy loading và placeholder
 * @param {string} src - Đường dẫn hình ảnh
 * @param {string} alt - Alt text cho hình ảnh
 * @param {number} width - Chiều rộng
 * @param {number} height - Chiều cao
 * @param {string} objectFit - Kiểu fit (cover, contain, fill, none, scale-down)
 * @param {boolean} lazy - Bật lazy loading
 * @param {string} className - Class bổ sung
 * @param {string} placeholderSrc - Ảnh placeholder khi lazy loading
 * @param {function} onLoad - Callback khi ảnh load xong
 * @param {function} onError - Callback khi ảnh load lỗi
 */
const Image = ({
  src,
  alt,
  width,
  height,
  objectFit = 'cover',
  lazy = true,
  className = '',
  placeholderSrc,
  onLoad,
  onError,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    setHasError(true);
    if (onError) onError(e);
  };

  return (
    <div 
      className={`${styles.imageContainer} ${className}`}
      style={{ width, height }}
    >
      {(!isLoaded || hasError) && (
        <div className={styles.placeholder} aria-hidden="true">
          {placeholderSrc ? (
            <img 
              src={placeholderSrc} 
              alt="" 
              className={styles.placeholderImage}
              style={{ objectFit }}
            />
          ) : (
            <div className={styles.placeholderBox} />
          )}
        </div>
      )}
      
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={lazy ? "lazy" : "eager"}
        onLoad={handleLoad}
        onError={handleError}
        className={`
          ${styles.image}
          ${isLoaded ? styles.loaded : styles.loading}
        `}
        style={{ objectFit }}
        {...rest}
      />
    </div>
  );
};

export default Image;