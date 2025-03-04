import React, { useState, useEffect } from 'react';
import styles from './Products.module.css';
import { productData } from '../common/data';

const Products = () => {
  const [activeTab, setActiveTab] = useState(1);
  
  // Auto-rotate products every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab(current => current === productData.length ? 1 : current + 1);
    }, 4000);
    
    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.productsSection}>
      <div className={styles.container}>
        <div className={styles.tagWrapper}>
          <span className={styles.tag}>SẢN PHẨM ĐA DẠNG</span>
        </div>
        
        <h2 className={styles.heading}>Lựa chọn hoàn hảo cho bạn</h2>
        <p className={styles.subheading}>
          Đa dạng sản phẩm đáp ứng mọi nhu cầu: từ ở thực đến kinh doanh và đầu tư sinh lời
        </p>
        
        {/* Navigation dots */}
        <div className={styles.navigation}>
          {productData.map((product) => (
            <button 
              key={product.id}
              onClick={() => setActiveTab(product.id)} 
              className={`${styles.navDot} ${
                product.id === 2 ? styles.navDotMiddle : ''
              } ${
                activeTab === product.id 
                  ? styles.navDotActive 
                  : ''
              }`}
              aria-label={`Product ${product.id}`}
            />
          ))}
        </div>
        
        {/* Product card */}
        <div className={styles.productCard}>
          <div className={styles.productContent}>
            <div className={styles.contentWrapper}>
              {productData.map((product) => (
                <div 
                  key={product.id} 
                  className={`${styles.productDetails} ${
                    activeTab === product.id 
                      ? styles.active 
                      : ''
                  }`}
                >
                  <div className={styles.productTag}>
                    <span>{product.tag}</span>
                  </div>
                  
                  <h3 className={styles.productTitle}>{product.type}</h3>
                  <p className={styles.productDescription}>{product.description}</p>
                  
                  <div className={styles.productSpecs}>
                    <div className={styles.specItem}>
                      <p className={styles.specLabel}>Diện tích</p>
                      <p className={styles.specValue}>{product.area}</p>
                    </div>
                    <div className={styles.specItem}>
                      <p className={styles.specLabel}>Mặt tiền</p>
                      <p className={styles.specValue}>{product.frontage}</p>
                    </div>
                    <div className={styles.specItem}>
                      <p className={styles.specLabel}>Thiết kế</p>
                      <p className={styles.specValue}>{product.floors}</p>
                    </div>
                    <div className={styles.specItem}>
                      <p className={styles.specLabel}>Giá bán</p>
                      <p className={`${styles.specValue} ${styles.specValuePrice}`}>{product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Placeholder for layout structure */}
              <div className={styles.placeholderLayout}>
                <div className={styles.productTag}><span>Placeholder</span></div>
                <h3 className={styles.productTitle}>Placeholder</h3>
                <p className={styles.productDescription}>Placeholder description for layout purposes.</p>
                <div className={styles.productSpecs}>
                  <div className={styles.specItem}>
                    <p className={styles.specLabel}>Placeholder</p>
                    <p className={styles.specValue}>Placeholder</p>
                  </div>
                  <div className={styles.specItem}>
                    <p className={styles.specLabel}>Placeholder</p>
                    <p className={styles.specValue}>Placeholder</p>
                  </div>
                  <div className={styles.specItem}>
                    <p className={styles.specLabel}>Placeholder</p>
                    <p className={styles.specValue}>Placeholder</p>
                  </div>
                  <div className={styles.specItem}>
                    <p className={styles.specLabel}>Placeholder</p>
                    <p className={styles.specValue}>Placeholder</p>
                  </div>
                </div>
              </div>
            </div>
            
            <button className={styles.ctaButton}>
              <span>Nhận thông tin chi tiết</span>
            </button>
          </div>
          
          <div className={styles.productImageWrapper}>
            {productData.map((product) => {
              // Determine image source - use actual path from data
              const imgSrc = product.imageUrl || `/api/placeholder/800/600`;
              
              return (
                <div 
                  key={product.id}
                  className={`${styles.productImage} ${
                    activeTab === product.id ? styles.productImageActive : ''
                  }`}
                  aria-hidden={activeTab !== product.id}
                >
                  <img 
                    src={imgSrc} 
                    alt={product.imageAlt}
                    className={styles.image}
                  />
                  <div className={styles.imageOverlay}>
                    <p className={styles.overlayTitle}>{product.type}</p>
                    <p className={styles.overlayDetails}>{product.area} | {product.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;