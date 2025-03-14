import React, { useState, useEffect } from 'react';
import styles from './Products.module.css';
import { productData } from '../common/data';

const Products = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [isBrowser, setIsBrowser] = useState(false);
  
  // Kiểm tra xem có đang chạy trên browser không
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  
  // Auto-rotate products every 4 seconds - chỉ trong browser
  useEffect(() => {
    // Chỉ thực hiện trong browser
    if (!isBrowser) {
      return;
    }
    
    const interval = setInterval(() => {
      setActiveTab(current => current === productData.length ? 1 : current + 1);
    }, 4000);
    
    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [isBrowser]);

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
              aria-label={`Sản phẩm ${product.id}`}
            />
          ))}
        </div>
        
        {/* Display only active product */}
        {productData.map((product) => (
          <div 
            key={product.id}
            className={`${styles.productCard} ${
              activeTab === product.id ? styles.activeCard : styles.hiddenCard
            }`}
          >
            <div className={styles.imageSide}>
              <img 
                src={product.imageUrl || `/img/${product.type.replace(/\s+/g, '-').toLowerCase()}.jpg`}
                alt={product.imageAlt || `${product.type} tại Economy City Văn Lâm`}
                className={styles.productImage}
              />
            </div>
            
            <div className={styles.contentSide}>
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
                  <p className={styles.specValue}>{product.price}</p>
                </div>
              </div>
              
              <div className={styles.ctaButtonContainer}>
                <a href="#contact" className={styles.ctaButton}>
                  Nhận thông tin chi tiết
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;