// src/components/Location/Location.js
import React, { useEffect, useRef, useState, useCallback, memo } from 'react';
import styles from './Location.module.css';
import { locationData } from './LocationData';

/**
 * Location Component - Hiển thị vị trí chiến lược của dự án
 * Desktop: 2 cột xen kẽ
 * Mobile: Full view từng section
 */
const Location = () => {
  // Refs
  const locationSectionRef = useRef(null);
  const mobileContentRef = useRef(null);
  const sectionRefs = useRef([]);
  
  // State management - phân chia rõ ràng theo mục đích
  const [activeSection, setActiveSection] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // Khởi tạo refs cho sections - chỉ chạy 1 lần
  useEffect(() => {
    sectionRefs.current = Array(locationData.sections.length)
      .fill()
      .map((_, i) => sectionRefs.current[i] || React.createRef());
  }, []);

  // Media query handler với throttling
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Thêm event listener với throttle để tối ưu hiệu suất
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkMobile, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup event listeners
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Thiết lập active section đầu tiên mặc định
  useEffect(() => {
    if (locationData.sections.length > 0) {
      setActiveSection(locationData.sections[0].id);
    }
  }, []);

  // Scroll handler với debounce để tối ưu hiệu suất
  useEffect(() => {
    if (!isMobile || !mobileContentRef.current) return;

    // Debounce scroll handler
    let scrollTimeout;
    let lastScrollTop = 0;
    
    const handleScroll = () => {
      const container = mobileContentRef.current;
      if (!container) return;
      
      const scrollTop = container.scrollTop;
      
      // Tối ưu xử lý - chỉ khi scroll đủ xa
      if (Math.abs(scrollTop - lastScrollTop) < 10) return;
      lastScrollTop = scrollTop;
      
      // Clear timeout trước đó
      clearTimeout(scrollTimeout);
      
      // Đặt timeout mới
      scrollTimeout = setTimeout(() => {
        updateActiveSection(scrollTop);
      }, 50);
    };
    
    // Logic xác định section active
    const updateActiveSection = (scrollTop) => {
      const container = mobileContentRef.current;
      if (!container) return;
      
      const viewportHeight = container.clientHeight;
      
      // Biến theo dõi section hiển thị
      let currentSectionIndex = -1;
      let maxVisibility = 0;
      
      // Duyệt qua từng section để xác định
      sectionRefs.current.forEach((ref, index) => {
        if (!ref.current) return;
        
        const section = ref.current;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;
        
        // Section top nằm trong viewport - ưu tiên này
        if (scrollTop <= sectionTop && sectionTop < scrollTop + viewportHeight / 2) {
          currentSectionIndex = index;
          return; // Exit early
        }
        
        // Tính % hiển thị của section
        const visibleTop = Math.max(sectionTop, scrollTop);
        const visibleBottom = Math.min(sectionBottom, scrollTop + viewportHeight);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const visibilityPercentage = visibleHeight / viewportHeight;
        
        if (visibilityPercentage > maxVisibility) {
          maxVisibility = visibilityPercentage;
          
          // Nếu chưa có section priority
          if (currentSectionIndex === -1) {
            currentSectionIndex = index;
          }
        }
      });
      
      // Cập nhật active section nếu thay đổi
      if (currentSectionIndex !== -1) {
        const sectionId = locationData.sections[currentSectionIndex].id;
        if (activeSection !== sectionId) {
          setActiveSection(sectionId);
        }
      }
    };
    
    const container = mobileContentRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    
    // Cleanup
    return () => {
      clearTimeout(scrollTimeout);
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isMobile, activeSection]);

  // Memoized scroll handler để tối ưu re-renders
  const scrollToSection = useCallback((index) => {
    if (!isMobile || !mobileContentRef.current) return;
    
    const sectionRef = sectionRefs.current[index];
    if (!sectionRef.current) return;
    
    mobileContentRef.current.scrollTo({
      top: sectionRef.current.offsetTop,
      behavior: 'smooth'
    });
    
    // Set active section mới
    setActiveSection(locationData.sections[index].id);
  }, [isMobile]);

  // Render component con - sử dụng memo để tránh re-render không cần thiết
  const MobileNavIcons = memo(({ sections }) => (
    <div className={styles.mobileNavContainer}>
      {sections.map((section, index) => (
        <div 
          key={section.id}
          className={`${styles.navIcon} ${activeSection === section.id ? styles.active : ''}`}
          onClick={() => scrollToSection(index)}
          aria-label={`Đến phần ${section.title}`}
        >
          <img src={section.iconSrc} alt={section.iconAlt} className={styles.navIconImage} />
        </div>
      ))}
    </div>
  ));
  
  MobileNavIcons.displayName = 'MobileNavIcons';

  // Render header - sử dụng memo để tối ưu
  const SectionHeader = memo(({ title, description, badge }) => (
    <div className={styles.sectionHeader}>
      {badge && <div className={styles.badgeContainer}>
        <span className={styles.badge}>{badge}</span>
      </div>}
      <h2 className={styles.sectionTitle}>{title}</h2>
      {description && <p className={styles.sectionDescription}>{description}</p>}
    </div>
  ));
  
  SectionHeader.displayName = 'SectionHeader';

  // Render Mobile View
  if (isMobile) {
    return (
      <section id="location" className={styles.locationSectionMobile} ref={locationSectionRef}>
        {/* Header */}
        <div className={styles.mobileHeader}>
          <SectionHeader 
            title={locationData.title} 
            description={locationData.description}
            badge={locationData.badge}
          />
          
          {/* Nav Icons - Sticky */}
          <MobileNavIcons sections={locationData.sections} />
        </div>
        
        {/* Scrollable content container */}
        <div className={styles.mobileContentContainer} ref={mobileContentRef}>
          {locationData.sections.map((section, index) => (
            <div
              key={section.id}
              id={`mobile-section-${index}`}
              ref={sectionRefs.current[index]}
              className={`${styles.mobileSection} ${
                activeSection === section.id ? styles.active : ''
              }`}
            >
              <h3 className={styles.locationItemTitle}>
                {section.title}
              </h3>
              
              <div className={styles.locationItemImageContainer}>
                <img 
                  src={section.image.src} 
                  alt={section.image.alt} 
                  className={styles.locationItemImage}
                  loading="lazy"
                />
              </div>
              
              <div className={styles.locationItemContent}>
                <p className={styles.locationItemDescription}>
                  {section.description}
                </p>
                
                {section.highlights && section.highlights.length > 0 && (
                  <ul className={styles.highlightsList}>
                    {section.highlights.map((highlight, idx) => (
                      <li key={idx} className={styles.highlightItem}>
                        <span className={styles.highlightIcon} aria-hidden="true">✓</span>
                        <span className={styles.highlightText}>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                {section.details && section.details.length > 0 && (
                  <div className={styles.detailsList}>
                    {section.details.map((detail, idx) => (
                      <div key={idx} className={styles.detailItem}>
                        <span className={styles.detailLabel}>{detail.label}:</span>
                        <span className={styles.detailValue}>{detail.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* CTA Button */}
          <div className={styles.ctaContainer}>
            <a 
              href={locationData.ctaUrl} 
              className={styles.ctaButton}
              aria-label={`${locationData.ctaText} về vị trí dự án`}
            >
              {locationData.ctaText}
            </a>
          </div>
        </div>
      </section>
    );
  }

  // Desktop View - 2 cột xen kẽ
  return (
    <section id="location" className={styles.locationSectionDesktop}>
      <div className="container">
        {/* Header */}
        <SectionHeader 
          title={locationData.title} 
          description={locationData.description}
          badge={locationData.badge}
        />

        {/* Location Items - Desktop layout với layout xen kẽ */}
        {locationData.sections.map((section, index) => (
          <div
            key={section.id}
            id={section.id}
            className={styles.desktopLocationItem}
          >
            <div className={styles.desktopLocationItemContent}>
              {/* Layout xen kẽ: chẵn = ảnh trái, lẻ = ảnh phải */}
              {index % 2 === 0 ? (
                <>
                  <div className={styles.desktopImageContainer}>
                    <img 
                      src={section.image.src} 
                      alt={section.image.alt} 
                      className={styles.locationItemImage}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.desktopTextContainer}>
                    <h3 className={styles.locationItemTitle}>
                      {section.title}
                    </h3>
                    <p className={styles.locationItemDescription}>
                      {section.description}
                    </p>
                    
                    {section.highlights && section.highlights.length > 0 && (
                      <ul className={styles.highlightsList}>
                        {section.highlights.map((highlight, idx) => (
                          <li key={idx} className={styles.highlightItem}>
                            <span className={styles.highlightIcon} aria-hidden="true">✓</span>
                            <span className={styles.highlightText}>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {section.details && section.details.length > 0 && (
                      <div className={styles.detailsList}>
                        {section.details.map((detail, idx) => (
                          <div key={idx} className={styles.detailItem}>
                            <span className={styles.detailLabel}>{detail.label}:</span>
                            <span className={styles.detailValue}>{detail.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.desktopTextContainer}>
                    <h3 className={styles.locationItemTitle}>
                      {section.title}
                    </h3>
                    <p className={styles.locationItemDescription}>
                      {section.description}
                    </p>
                    
                    {section.highlights && section.highlights.length > 0 && (
                      <ul className={styles.highlightsList}>
                        {section.highlights.map((highlight, idx) => (
                          <li key={idx} className={styles.highlightItem}>
                            <span className={styles.highlightIcon} aria-hidden="true">✓</span>
                            <span className={styles.highlightText}>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {section.details && section.details.length > 0 && (
                      <div className={styles.detailsList}>
                        {section.details.map((detail, idx) => (
                          <div key={idx} className={styles.detailItem}>
                            <span className={styles.detailLabel}>{detail.label}:</span>
                            <span className={styles.detailValue}>{detail.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className={styles.desktopImageContainer}>
                    <img 
                      src={section.image.src} 
                      alt={section.image.alt} 
                      className={styles.locationItemImage}
                      loading="lazy"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
        
        {/* CTA Button */}
        <div className={styles.ctaContainer}>
          <a 
            href={locationData.ctaUrl} 
            className={styles.ctaButton}
            aria-label={`${locationData.ctaText} về vị trí dự án`}
          >
            {locationData.ctaText}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Location;