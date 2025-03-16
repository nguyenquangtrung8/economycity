import React, { useState, useEffect, useRef, useCallback } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import styles from './Features.module.css';
import featureData from './FeaturesData';

// Custom hook để xử lý chuyển đổi tab
const useTabTransition = (activeFeature, isClient) => {
  const [visibleFeature, setVisibleFeature] = useState(activeFeature);
  const [transitioning, setTransitioning] = useState(false);
  
  useEffect(() => {
    if (!isClient) return;
    
    if (activeFeature !== visibleFeature) {
      setTransitioning(true);
      const timer = setTimeout(() => {
        setVisibleFeature(activeFeature);
        setTransitioning(false);
      }, 300); // Phải khớp với thời gian transition trong CSS
      
      return () => clearTimeout(timer);
    }
  }, [activeFeature, visibleFeature, isClient]);
  
  return { visibleFeature, transitioning };
};

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const intervalRef = useRef(null);
  const featureRefs = useRef(featureData.map(() => React.createRef()));
  
  // Sử dụng custom hook để xử lý hiệu ứng chuyển tab
  const { visibleFeature, transitioning } = useTabTransition(activeFeature, isClient);
  
  // Đánh dấu khi component đã mount trên client
  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      setIsClient(true);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  // Bắt đầu auto-rotate chỉ sau khi đã xác nhận đang ở client
  useEffect(() => {
    if (!isClient) return;
    
    // Clear interval cũ nếu có
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Tạo interval mới
    intervalRef.current = setInterval(() => {
      setActiveFeature(current => current === featureData.length ? 1 : current + 1);
    }, 5000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isClient]);

  // Xử lý click chọn feature
  const handleFeatureClick = useCallback((id) => {
    if (!isClient) return;
    
    setActiveFeature(id);
    
    // Reset interval khi người dùng click
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      setActiveFeature(current => current === featureData.length ? 1 : current + 1);
    }, 5000);
    
    // Focus vào nội dung tính năng cho accessibility
    if (featureRefs.current[id-1]?.current) {
      featureRefs.current[id-1].current.focus();
    }
  }, [isClient]);

  // Xử lý phím mũi tên để điều hướng
  const handleKeyDown = useCallback((e, id) => {
    if (e.key === 'ArrowRight') {
      const nextId = id === featureData.length ? 1 : id + 1;
      handleFeatureClick(nextId);
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      const prevId = id === 1 ? featureData.length : id - 1;
      handleFeatureClick(prevId);
      e.preventDefault();
    }
  }, [handleFeatureClick]);

  // Lấy icon dựa trên loại danh mục
  const getFeatureIcon = useCallback((categoryId) => {
    switch (categoryId) {
      case 'location':
        return (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        );
      case 'amenities':
        return (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
          </svg>
        );
      case 'investment':
        return (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
            <polyline points="17 6 23 6 23 12"></polyline>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        );
    }
  }, []);

  // Tạo style cho card dựa trên trạng thái active
  const getCardStyle = useCallback((id) => {
    const isActive = visibleFeature === id;
    const isTransitioning = transitioning && activeFeature === id;
    
    return {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      opacity: isActive ? 1 : isTransitioning ? 0 : 0,
      visibility: isActive || isTransitioning ? 'visible' : 'hidden',
      zIndex: isActive ? 2 : isTransitioning ? 1 : 0,
      pointerEvents: isActive ? 'auto' : 'none'
    };
  }, [visibleFeature, transitioning, activeFeature]);

  return (
    <section className={styles.featuresSection} id="features">
      <div className={styles.container}>
        <div className={styles.tagWrapper}>
          <span className={styles.tag}>TÍNH NĂNG NỔI BẬT</span>
        </div>
        
        <h2 className={styles.heading}>Giá trị vượt trội tại Economy City Văn Lâm</h2>
        <p className={styles.subheading}>
          Tận hưởng cuộc sống đẳng cấp với vị trí đắc địa, tiện ích hoàn hảo và cơ hội đầu tư sinh lời
        </p>
        
        {/* Tab Navigation với SVG icons - SẮP XẾP NGANG TRÊN MOBILE */}
        <div className={styles.featuresTabsContainer} role="tablist" aria-label="Tính năng nổi bật">
          {featureData.map((feature) => (
            <button 
              key={feature.id}
              id={`tab-${feature.id}`}
              role="tab"
              aria-selected={activeFeature === feature.id}
              aria-controls={`panel-${feature.id}`}
              tabIndex={activeFeature === feature.id ? 0 : -1}
              onClick={() => handleFeatureClick(feature.id)}
              onKeyDown={(e) => handleKeyDown(e, feature.id)}
              className={`${styles.featureTab} ${activeFeature === feature.id ? styles.featureTabActive : ''}`}
            >
              <div className={styles.featureTabIcon}>
                {getFeatureIcon(feature.categoryId)}
              </div>
              <div className={styles.featureTabText}>
                <span>{feature.categoryName}</span>
              </div>
            </button>
          ))}
        </div>
        
        {/* Feature cards container */}
        <div className={styles.featureCardsContainer}>
          {featureData.map((feature) => (
            <div
              key={feature.id}
              id={`panel-${feature.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${feature.id}`}
              tabIndex={-1}
              ref={featureRefs.current[feature.id-1]}
              className={styles.featureCard}
              style={getCardStyle(feature.id)}
            >
              <div className={styles.contentSide}>
                <div className={styles.featureTag}>
                  <span>{feature.categoryName}</span>
                </div>
                
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
                
                {/* LAYOUT 2x2 CHO CÁC CHI TIẾT & ĐẶC ĐIỂM */}
                <div className={styles.featureDetails}>
                  {feature.benefits.map((benefit, index) => (
                    <div key={index} className={styles.detailItem}>
                      <div className={styles.detailIcon}>
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div className={styles.detailContent}>
                        <p className={styles.detailLabel}>{benefit.label}</p>
                        <p className={styles.detailValue}>{benefit.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* CĂN GIỮA NÚT CTA */}
                <div className={styles.ctaButtonWrapper}>
                  <a href="#contact" className={styles.ctaButton}>
                    Tìm hiểu thêm
                  </a>
                </div>
              </div>
              
              <div className={styles.imageSide}>
                <img 
                  src={feature.imageUrl}
                  alt={feature.imageAlt || `Hình ảnh ${feature.title}`}
                  className={styles.featureImage}
                  width={feature.imageWidth || 600}
                  height={feature.imageHeight || 400}
                  loading="lazy"
                  onError={(e) => {
                    console.error(`Failed to load image: ${feature.imageUrl}`);
                    e.target.src = '/img/placeholder.jpg';
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;