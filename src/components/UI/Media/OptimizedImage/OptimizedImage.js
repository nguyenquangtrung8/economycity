import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './OptimizedImage.module.css';

/**
 * OptimizedImage Component - Hiển thị hình ảnh với tối ưu hiệu suất
 * @param {string} src - Đường dẫn hình ảnh
 * @param {string} alt - Mô tả thay thế cho hình ảnh
 * @param {number} width - Chiều rộng hình ảnh
 * @param {number} height - Chiều cao hình ảnh
 * @param {string} className - CSS class bổ sung
 * @param {string} loading - Chế độ tải (eager/lazy)
 */
const OptimizedImage = React.memo(({ 
  src, 
  alt, 
  width,
  height,
  className,
  loading = 'lazy',
  ...imgProps 
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [placeholder, setPlaceholder] = useState(null); // Thêm state cho placeholder
  const abortController = useRef(null);

  // Helper functions
  const getOptimizedPath = (imagePath) => {
    return imagePath.replace(/^(\/.*\/)img\//, '$1img-optimized/');
  };

  const getOriginalFormat = (imagePath) => {
    return imagePath.split('.').pop().toLowerCase().split('?')[0];
  };

  const getOptimizedFilePath = (imagePath, format) => {
    const [basePath] = getOptimizedPath(imagePath).split('.');
    return `${basePath}.${format}`;
  };

  // Fetch placeholder
  useEffect(() => {
    if (!src) return;

    abortController.current = new AbortController();
    
    const basePath = getOptimizedPath(src).split('.').slice(0, -1).join('.');
    fetch(`${basePath}.placeholder.txt`, { 
      signal: abortController.current.signal 
    })
    .then(response => {
      if (!response.ok) throw new Error('Placeholder not found');
      return response.text();
    })
    .then(data => {
      setLoaded(false); // Reset loaded state when fetching new placeholder
      setPlaceholder(data); // Lưu placeholder vào state
    })
    .catch(err => {
      if (!abortController.current.signal.aborted) {
        console.warn('Could not load placeholder:', err.message);
      }
    });

    return () => {
      abortController.current?.abort();
    };
  }, [src]);

  // Handle image error
  const handleError = (e) => {
    console.error('Image failed to load:', e);
    setError(true);
    setLoaded(true);
  };

  // Render error state
  if (!src) {
    return (
      <div className={styles.error}>
        Image source is required
      </div>
    );
  }

  const originalFormat = getOriginalFormat(src);

  return (
    <div 
      className={`${styles.container} ${className}`}
      style={{ 
        width: width || '100%', 
        height: height || 'auto',
        aspectRatio: width && height ? `${width}/${height}` : 'auto'
      }}
    >
      {/* Picture element for responsive images */}
      <picture>
        {/* WebP version */}
        <source
          srcSet={`${getOptimizedFilePath(src, 'webp')} 1x, ${getOptimizedFilePath(src, 'webp')}@2x 2x`}
          sizes="(max-width: 600px) 100vw, 50vw"
          type="image/webp"
        />
        
        {/* Fallback to optimized original format */}
        <source
          srcSet={`${getOptimizedFilePath(src, originalFormat)} 1x, ${getOptimizedFilePath(src, originalFormat)}@2x 2x`}
          sizes="(max-width: 600px) 100vw, 50vw"
          type={`image/${originalFormat === 'jpg' ? 'jpeg' : originalFormat}`}
        />
        
        {/* Original image as final fallback */}
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          className={`${styles.image} ${loaded ? styles.loaded : ''}`}
          onLoad={() => setLoaded(true)}
          onError={handleError}
          {...imgProps}
        />
      </picture>

      {/* Placeholder */}
      {!loaded && !error && placeholder && ( // Kiểm tra placeholder trước khi render
        <div 
          className={styles.placeholder}
          style={{
            backgroundImage: `url(${placeholder})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            filter: 'blur(10px)',
            transform: 'scale(1.1)',
            transition: 'opacity 0.3s ease-in-out',
            opacity: 1,
          }}
        />
      )}

      {/* Error overlay */}
      {error && (
        <div className={styles.errorOverlay}>
          <span>Failed to load image</span>
        </div>
      )}
    </div>
  );
});

// Prop types validation
OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  loading: PropTypes.oneOf(['eager', 'lazy'])
};

export default OptimizedImage;