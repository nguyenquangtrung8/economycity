import React, { useEffect } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import styles from './Products.module.css';
import productData from './ProductsData';
import useTabTransition from '../../hooks/useTabTransition';

const Products = () => {
  const {
    activeTab,
    prevActiveTab,
    changeTab,
    isTransitioning,
    direction,
    isMounted
  } = useTabTransition(productData, 0, 300, true, 5000); // Giảm thời gian transition xuống 300ms

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
        
        {/* Product Cards Container */}
        {isMounted && (
          <div className={styles.productCardsContainer}>
            {/* Sử dụng thẻ div bên ngoài có position relative */}
            {productData.map((product, index) => {
              // Chỉ render các tabs liên quan đến trạng thái hiện tại
              const isRelevant = activeTab === index || (isTransitioning && prevActiveTab === index);
              
              if (!isRelevant) return null; // Không render những tab không liên quan
              
              return (
                <div
                  key={index}
                  className={styles.productCard}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    width: '100%',
                    height: '100%', /* Đảm bảo chiều cao 100% */
                    opacity: activeTab === index ? 1 : 0,
                    transform: `translate3d(${
                      activeTab === index
                        ? '0, 0, 0'
                        : (direction === 'next' ? '30px, 0, 0' : '-30px, 0, 0')
                    })`,
                    transition: 'opacity 300ms ease, transform 300ms ease',
                    zIndex: activeTab === index ? 2 : 1,
                    pointerEvents: activeTab === index ? 'all' : 'none',
                    willChange: 'transform, opacity' // Kích hoạt GPU cho animation mượt mà hơn
                  }}
                >
                  <div className={styles.imageSide}>
                    <img 
                      src={product.imageUrl}
                      alt={product.imageAlt || `${product.categoryName} - ${product.title}`}
                      className={styles.productImage}
                      loading="lazy"
                      onError={(e) => {
                        console.error(`Failed to load image: ${product.imageUrl}`);
                        e.target.src = '/img/placeholder.jpg';
                      }}
                    />
                    
                    {product.statusTag && (
                      <div className={`${styles.statusTag} ${styles[`status${product.statusTag.type}`]}`}>
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
                          <p className={styles.specLabel}>{spec.label}</p>
                          <p className={styles.specValue}>{spec.value}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className={styles.ctaButtonContainer}>
                      <a href="#contact" className={styles.ctaButton}>
                        Nhận tư vấn chi tiết
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {/* Indicator dots for mobile */}
        <div className={styles.indicatorDots}>
          {productData.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicatorDot} ${activeTab === index ? styles.activeDot : ''}`}
              onClick={() => changeTab(index)}
              aria-label={`Chuyển đến sản phẩm ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;