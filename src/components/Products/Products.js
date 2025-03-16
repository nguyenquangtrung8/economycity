import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import styles from './Products.module.css';
import productData from './ProductsData';
import useTabTransition from '../../hooks/useTabTransition';
// Import icons từ lucide-react
import { 
  SquareIcon, 
  Eye, 
  Home, 
  DollarSign, 
  Store,
  GraduationCap
} from 'lucide-react';

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
      cardRefs.current[activeTab].current.focus({ preventScroll: true });
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

  // Lấy icon phù hợp dựa trên label
  const getSpecIcon = useCallback((label) => {
    switch(label) {
      case "Diện tích":
        return <SquareIcon size={16} className={styles.specIconSvg} />;
      case "Tầm nhìn":
        return <Eye size={16} className={styles.specIconSvg} />;
      case "Thiết kế":
        return <Home size={16} className={styles.specIconSvg} />;
      case "Giá bán":
        return <DollarSign size={16} className={styles.specIconSvg} />;
      case "Mặt tiền":
        return <Store size={16} className={styles.specIconSvg} />;
      case "Công năng":
        return <GraduationCap size={16} className={styles.specIconSvg} />;
      default:
        return <SquareIcon size={16} className={styles.specIconSvg} />;
    }
  }, []);

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
              <div key={idx} className={styles.specGroup}>
                <div className={styles.specIcon}>
                  {getSpecIcon(spec.label)}
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
  }, [productData, activeTab, imageErrors, handleImageError, getCardStyle, getSpecIcon]);

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