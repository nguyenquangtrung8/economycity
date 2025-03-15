import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import styles from './Products.module.css';
import productData from './ProductsData';
import useTabTransition from '../../hooks/useTabTransition';

/**
 * Products Component - Hiển thị sản phẩm của dự án
 * 
 * @component
 * @returns {JSX.Element} Products component
 */
const Products = () => {
  // State theo dõi lỗi hình ảnh cho từng sản phẩm
  const [imageErrors, setImageErrors] = useState({});
  
  const {
    activeTab,
    changeTab,
    isMounted
  } = useTabTransition(productData, 0, 300, true, 5000);
  
  // Tạo mảng refs để quản lý focus cho từng sản phẩm
  const cardRefs = useRef(productData.map(() => React.createRef()));

  // Focus vào thẻ sản phẩm đang active khi chuyển tab
  useEffect(() => {
    if (cardRefs.current[activeTab]?.current) {
      cardRefs.current[activeTab].current.focus();
    }
  }, [activeTab]);

  // Handler cho việc xử lý lỗi hình ảnh
  const handleImageError = useCallback((index, imageUrl) => {
    console.error(`Failed to load image: ${imageUrl}`);
    setImageErrors(prev => ({...prev, [index]: true}));
  }, []);
  
  // Handler cho việc chuyển tab - được memoize để tránh tạo lại
  const handleTabChange = useCallback((index) => {
    changeTab(index);
  }, [changeTab]);

  // Hàm để tính toán các inline styles dựa trên trạng thái active
  const getCardStyle = useCallback((index) => {
    const isActive = activeTab === index;
    
    // Absolute positioning để hoạt động với CSS mới
    return {
      position: 'absolute',
      left: isActive ? '0' : '-9999px',
      top: isActive ? '0' : '0',
      opacity: isActive ? '1' : '0',
      width: '100%',
      visibility: isActive ? 'visible' : 'hidden',
      transition: 'opacity 300ms ease',
      zIndex: isActive ? '1' : '0',
    };
  }, [activeTab]);

  // Memoize việc render danh sách sản phẩm để tránh re-render không cần thiết
  const memoizedProductCards = useMemo(() => {
    return productData.map((product, index) => (
      <div
        key={index}
        ref={cardRefs.current[index]}
        className={styles.productCard}
        style={getCardStyle(index)}
        tabIndex={activeTab === index ? 0 : -1}
        aria-hidden={activeTab !== index}
        role="tabpanel"
        id={`product-panel-${index}`}
      >
        <div className={styles.imageSide}>
          <img 
            src={product.imageUrl}
            alt={product.imageAlt || `${product.categoryName} - ${product.title}`}
            className={styles.productImage}
            loading="lazy"
            onError={() => handleImageError(index, product.imageUrl)}
          />
          
          {imageErrors[index] && (
            <div className={styles.imageError}>
              <p>Không thể tải hình ảnh. Vui lòng thử lại sau.</p>
            </div>
          )}
          
          {product.statusTag && (
            <div 
              className={`${styles.statusTag} ${styles[`status${product.statusTag.type}`]}`}
              aria-label={`Trạng thái: ${product.statusTag.text}`}
            >
              {product.statusTag.text}
            </div>
          )}
        </div>
        
        <div className={styles.contentSide}>
          <div className={styles.productTag}>
            <span>{product.categoryName}</span>
          </div>
          
          <h3 className={styles.productTitle}>{product.title}</h3>
          <p className={styles.productDescription}>{product.description}</p>
          
          <div className={styles.productSpecs}>
            {product.specs.map((spec, idx) => (
              <div key={idx} className={styles.specItem}>
                <div className={styles.specIcon}>
                  {/* Biểu tượng dựa trên loại thông số */}
                  {spec.label === "Diện tích" && (
                    <svg viewBox="0 0 24 24" className={styles.specIconSvg} aria-hidden="true">
                      <path d="M17 15h2v2h-2zm0-4h2v2h-2zm0-4h2v2h-2zm-3.5 0H15v2h-1.5zM11 13h1.5v2H11zm8-8H5v14h14V5zm2 16H3V3h18v16z" />
                    </svg>
                  )}
                  {spec.label === "Tầm nhìn" && (
                    <svg viewBox="0 0 24 24" className={styles.specIconSvg} aria-hidden="true">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                    </svg>
                  )}
                  {spec.label === "Thiết kế" && (
                    <svg viewBox="0 0 24 24" className={styles.specIconSvg} aria-hidden="true">
                      <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                    </svg>
                  )}
                  {spec.label === "Giá bán" && (
                    <svg viewBox="0 0 24 24" className={styles.specIconSvg} aria-hidden="true">
                      <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                    </svg>
                  )}
                </div>
                <div className={styles.specContent}>
                  <p className={styles.specLabel}>{spec.label}</p>
                  <p className={styles.specValue}>{spec.value}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Xử lý trường hợp không có dữ liệu specs */}
          {(!product.specs || product.specs.length === 0) && (
            <p className={styles.noSpecsMessage}>Chưa có thông tin chi tiết.</p>
          )}
          
          {/* CTA Button */}
          <div className={styles.ctaButtonWrapper}>
            <a 
              href="#contact" 
              className={styles.ctaButton} 
              aria-label={`Nhận tư vấn chi tiết về ${product.title}`}
            >
              Nhận tư vấn chi tiết
            </a>
          </div>
        </div>
      </div>
    ));
  }, [productData, activeTab, imageErrors, handleImageError, getCardStyle]);

  // Xử lý trường hợp không có dữ liệu
  if (!productData || productData.length === 0) {
    return (
      <section className={styles.productsSection} id="products">
        <div className={styles.container}>
          <div className={styles.noProducts}>
            <p>Không tìm thấy sản phẩm. Vui lòng quay lại sau.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.productsSection} id="products">
      <div className={styles.container}>
        <div className={styles.tagWrapper}>
          <span className={styles.tag}>SẢN PHẨM ĐA DẠNG</span>
        </div>
        
        <h2 className={styles.heading}>Lựa chọn hoàn hảo cho bạn</h2>
        <p className={styles.subheading}>
          Đa dạng sản phẩm đáp ứng mọi nhu cầu: từ ở thực đến kinh doanh và đầu tư sinh lời
        </p>
        
        {/* Product Cards Container - Absolute Positioning Layout */}
        {isMounted && (
          <div className={styles.productCardsContainer} role="tablist">
            {memoizedProductCards}
          </div>
        )}
        
        {/* Indicator dots for mobile */}
        <div className={styles.indicatorDots}>
          {productData.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicatorDot} ${activeTab === index ? styles.activeDot : ''}`}
              onClick={() => handleTabChange(index)}
              aria-label={`Chuyển đến sản phẩm ${index + 1}`}
              aria-selected={activeTab === index}
              role="tab"
              id={`product-tab-${index}`}
              aria-controls={`product-panel-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Bỏ React.memo để tránh lỗi khi triển khai lên production với Docusaurus
export default Products;