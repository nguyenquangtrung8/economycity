import React, { useState, useEffect } from 'react';
import styles from './Features.module.css';

// Feature data based on the Economy City Văn Lâm project
const featureData = [
  {
    id: 1,
    categoryId: 'location',
    categoryName: 'VỊ TRÍ CHIẾN LƯỢC',
    title: 'Trung tâm kết nối',
    description: 'Tọa lạc tại trung tâm thị trấn Như Quỳnh, huyện Văn Lâm, cách trung tâm Hà Nội 18km, cách Ocean Park 5km với kết nối trực tiếp đến Quốc lộ 5A, Vành đai 3.5 và Vành đai 4.',
    benefits: [
      { label: 'Vị trí', value: 'Trung tâm thị trấn' },
      { label: 'Kết nối', value: 'Quốc lộ 5A, Vành đai 3.5, 4' },
      { label: 'Thời gian về Hà Nội', value: '20-25 phút' },
      { label: 'Tiếp giáp', value: '8 KCN lớn & 30 làng nghề' }
    ],
    imageUrl: '/img/Liên Kết Vùng.jpg',
    imageAlt: 'Vị trí chiến lược Economy City Văn Lâm'
  },
  {
    id: 2,
    categoryId: 'amenities',
    categoryName: 'TIỆN ÍCH ĐA DẠNG',
    title: 'Sống trọn vẹn mỗi ngày',
    description: 'Đô thị hiện đại 37ha với quảng trường trung tâm 5.6ha, hồ điều hòa 1.2ha, clubhouse 2.000m² và hệ thống 30 tiện ích đồng bộ đáp ứng mọi nhu cầu sinh hoạt.',
    benefits: [
      { label: 'Quảng trường', value: '5.6 ha' },
      { label: 'Hồ điều hòa', value: '1.2 ha' },
      { label: 'Clubhouse', value: '2.000m²' },
      { label: 'Số tiện ích', value: '30+ tiện ích đồng bộ' }
    ],
    imageUrl: '/img/Tiện ích.png',
    imageAlt: 'Tiện ích đa dạng tại Economy City Văn Lâm'
  },
  {
    id: 3,
    categoryId: 'investment',
    categoryName: 'GIÁ TRỊ ĐẦU TƯ',
    title: 'Đầu tư sinh lời bền vững',
    description: 'Với giá chỉ từ 107 triệu/m² (thấp hơn 35% so với dự án Vinhomes trong khu vực), pháp lý đầy đủ với sổ đỏ sở hữu lâu dài và tiềm năng tăng giá khi Văn Lâm lên thành phố năm 2030.',
    benefits: [
      { label: 'Giá bán', value: 'Từ 107 triệu/m²' },
      { label: 'So với khu vực', value: 'Thấp hơn 35%' },
      { label: 'Pháp lý', value: 'Sổ đỏ lâu dài' },
      { label: 'Tiềm năng', value: 'Văn Lâm lên TP năm 2030' }
    ],
    imageUrl: '/img/Giá trị.png',
    imageAlt: 'Giá trị đầu tư tại Economy City Văn Lâm'
  }
];

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(1);
  
  // Auto-rotate features every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(current => current === featureData.length ? 1 : current + 1);
    }, 5000);
    
    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.featuresSection}>
      <div className={styles.container}>
        <div className={styles.tagWrapper}>
          <span className={styles.tag}>TẠI SAO CHỌN ECONOMY CITY</span>
        </div>
        
        <h2 className={styles.heading}>Giá trị vượt trội tại Economy City Văn Lâm</h2>
        <p className={styles.subheading}>
          Tận hưởng cuộc sống đẳng cấp với vị trí đắc địa, tiện ích hoàn hảo và cơ hội đầu tư sinh lời
        </p>
        
        <div className={styles.featureContainer}>
          {/* Category Navigation */}
          <div className={styles.categoryNav}>
            {featureData.map((feature) => (
              <button 
                key={feature.id}
                onClick={() => setActiveFeature(feature.id)}
                className={`${styles.categoryButton} ${activeFeature === feature.id ? styles.categoryButtonActive : ''}`}
                aria-pressed={activeFeature === feature.id}
              >
                <div className={styles.categoryIcon}>
                  {feature.categoryId === 'location' && (
                    <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  )}
                  {feature.categoryId === 'amenities' && (
                    <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
                      <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" />
                    </svg>
                  )}
                  {feature.categoryId === 'investment' && (
                    <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
                      <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                    </svg>
                  )}
                </div>
                <div className={styles.categoryText}>
                  <span>{feature.categoryName}</span>
                </div>
                
                <div className={`${styles.categoryIndicator} ${activeFeature === feature.id ? styles.categoryIndicatorActive : ''}`}></div>
              </button>
            ))}
          </div>
          
          {/* Feature card */}
          <div className={styles.featureCard}>
            <div className={styles.featureContent}>
              <div className={styles.contentWrapper}>
                {featureData.map((feature) => (
                  <div 
                    key={feature.id} 
                    className={`${styles.featureDetails} ${
                      activeFeature === feature.id 
                        ? styles.active 
                        : ''
                    }`}
                  >
                    <div className={styles.featureTag}>
                      <span>{feature.categoryName}</span>
                    </div>
                    
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.featureDescription}>{feature.description}</p>
                    
                    <div className={styles.featureSpecs}>
                      {feature.benefits.map((benefit, index) => (
                        <div key={index} className={styles.specItem}>
                          <p className={styles.specLabel}>{benefit.label}</p>
                          <p className={styles.specValue}>{benefit.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                
                {/* Placeholder for layout structure */}
                <div className={styles.placeholderLayout}>
                  <div className={styles.featureTag}><span>Placeholder</span></div>
                  <h3 className={styles.featureTitle}>Placeholder</h3>
                  <p className={styles.featureDescription}>Placeholder description for layout purposes.</p>
                  <div className={styles.featureSpecs}>
                    <div className={styles.specItem}>
                      <p className={styles.specLabel}>Placeholder</p>
                      <p className={styles.specValue}>Placeholder</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <button className={styles.ctaButton}>
                <span>Tìm hiểu thêm</span>
              </button>
            </div>
            
            <div className={styles.featureImageWrapper}>
              {featureData.map((feature) => {
                // Determine image source - use actual path from data
                const imgSrc = feature.imageUrl || `/api/placeholder/800/600`;
                
                return (
                  <div 
                    key={feature.id}
                    className={`${styles.featureImage} ${
                      activeFeature === feature.id ? styles.featureImageActive : ''
                    }`}
                    aria-hidden={activeFeature !== feature.id}
                  >
                    <img 
                      src={imgSrc} 
                      alt={feature.imageAlt}
                      className={styles.image}
                    />
                    <div className={styles.imageOverlay}>
                      {/* <p className={styles.overlayTitle}>{feature.title}</p>
                      <p className={styles.overlayDetails}>{feature.categoryName}</p> */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;