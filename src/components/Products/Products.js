import React, { useState, useEffect } from 'react';
import styles from './Products.module.css';
import { productData } from '../common/data';

const Products = () => {
  const [activeTab, setActiveTab] = useState(1);
  
  // Tự động chuyển sản phẩm mỗi 4 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab(current => current === productData.length ? 1 : current + 1);
    }, 4000);
    
    // Xóa interval khi component unmount
    return () => clearInterval(interval);
  }, []);

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
        
        {/* Điều hướng dạng chấm */}
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
        
        {/* Hiển thị sản phẩm - Theo thiết kế mới */}
        {productData.map((product) => (
          <div 
            key={product.id}
            className={`${styles.productCard} ${
              activeTab === product.id ? styles.activeCard : styles.inactiveCard
            }`}
          >
            <div className={styles.productContent}>
              <div className={styles.productTagBar}>
                <span className={styles.productTagLabel}>{product.tag}</span>
              </div>
              
              <h3 className={styles.productTitle}>{product.type}</h3>
              <p className={styles.productDescription}>{product.description}</p>
              
              <div className={styles.productSpecsGrid}>
                <div className={styles.specColumn}>
                  <h4 className={styles.specTitle}>Diện tích</h4>
                  <p className={styles.specValue}>{product.area}</p>
                </div>
                <div className={styles.specColumn}>
                  <h4 className={styles.specTitle}>Mặt tiền</h4>
                  <p className={styles.specValue}>{product.frontage}</p>
                </div>
                <div className={styles.specColumn}>
                  <h4 className={styles.specTitle}>Thiết kế</h4>
                  <p className={styles.specValue}>{product.floors}</p>
                </div>
                <div className={styles.specColumn}>
                  <h4 className={styles.specTitle}>Giá bán</h4>
                  <p className={`${styles.specValue} ${styles.priceValue}`}>{product.price}</p>
                </div>
              </div>
              
              <div className={styles.ctaButtonContainer}>
                <a href="#contact" className={styles.ctaButton}>
                  Nhận thông tin chi tiết
                </a>
              </div>
            </div>
            
            {/* Hình ảnh sản phẩm */}
            <div className={styles.productImageContainer}>
              <img 
                src={product.imageUrl || `/img/${product.type.replace(/\s+/g, '-').toLowerCase()}.jpg`}
                alt={product.imageAlt || product.type}
                className={styles.productImage}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;