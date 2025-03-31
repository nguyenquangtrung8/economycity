import React, { useState, useEffect, useRef, useCallback, useMemo, memo, useReducer } from 'react';
import { MapPin, Navigation, FileText, Users, Layout, Building } from 'lucide-react';
import { debounce } from 'lodash-es';
import styles from './SixFeatures.module.css';
import { featuresData } from './SixFeaturesData';

// Tách thành component nhỏ hơn để tối ưu việc render
const FeatureIcon = memo(({ iconName, size = 24 }) => {
  const icons = {
    MapPin: <MapPin size={size} aria-hidden="true" />,
    Navigation: <Navigation size={size} aria-hidden="true" />,
    FileText: <FileText size={size} aria-hidden="true" />,
    Users: <Users size={size} aria-hidden="true" />,
    Layout: <Layout size={size} aria-hidden="true" />,
    Building: <Building size={size} aria-hidden="true" />
  };
  
  return icons[iconName] || null;
});

// Component cho card mobile
const MobileCard = memo(({ feature, index, isActive }) => (
  <div
    className={`${styles.featureCard} ${styles.mobileCard} ${isActive ? styles.activeMobileCard : ''}`}
    role="group"
    aria-roledescription="slide"
    aria-label={`Slide ${index + 1} of ${featuresData.length}: ${feature.title}`}
    aria-hidden={!isActive}
    id={`mobile-slide-${index}`}
    data-index={index} // For IntersectionObserver
  >
    <div className={styles.cardContent}>
      <div className={styles.iconContainer} aria-hidden="true">
        <FeatureIcon iconName={feature.icon} />
      </div>
      <h3 className={styles.featureTitle}>{feature.title}</h3>
      <p className={styles.featureDescription}>{feature.description}</p>
    </div>
    {feature.image && (
      <div className={styles.featureImageContainer}>
        <img
          src={feature.image}
          alt=""
          className={styles.featureImage}
          loading="lazy"
          width="400"
          height="225"
        />
      </div>
    )}
  </div>
));

// Component card cho desktop/tablet - Đã sửa để tránh flicker khi hover
const DesktopCard = memo(({ item, isActive, onSelect }) => {
  const { data, index, position } = item;
  
  // Handler click cho non-active card để chọn
  const handleCardClick = useCallback(() => {
    if (!isActive) {
      onSelect(index);
    }
  }, [isActive, index, onSelect]);
  
  // Disable pointer events cho mọi phần tử con để tránh flicker
  // Các sự kiện mouse sẽ "xuyên qua" và được xử lý bởi thẻ cha
  return (
    <div
      className={`${styles.featureCard} ${isActive ? styles.activeCard : styles.nonActiveCard}`}
      style={{
        // Sử dụng transform dựa trên position để hiển thị đúng vị trí
        // position = -1 (bên trái), 0 (giữa), 1 (bên phải)
        transform: `translateX(${position * 150}%) scale(${isActive ? 1 : 0.85})`,
        opacity: isActive ? 1 : 0.8,
        zIndex: isActive ? 20 : 10 - Math.abs(position),
      }}
      role="group"
      aria-roledescription="slide"
      aria-hidden={!isActive}
      aria-label={`Slide ${index + 1} of ${featuresData.length}: ${data.title}`}
      id={`desktop-slide-${index}`}
      onClick={!isActive ? handleCardClick : undefined} // Chỉ xử lý click cho non-active card
    >
      {isActive ? (
        // Active card: Full content with description
        <>
          <div className={styles.cardContent}>
            <div className={styles.iconContainer} aria-hidden="true">
              <FeatureIcon iconName={data.icon} />
            </div>
            <h3 className={styles.featureTitle}>{data.title}</h3>
            <p className={styles.featureDescription}>{data.description}</p>
          </div>
          {data.image && (
            <div className={styles.featureImageContainer}>
              <img
                src={data.image}
                alt=""
                className={styles.featureImage}
                loading={isActive ? "eager" : "lazy"}
                fetchpriority={isActive ? "high" : "auto"}
                width="400"
                height="225"
              />
            </div>
          )}
        </>
      ) : (
        // Non-active card: Hiển thị mô tả với truncate
        <>
          <div className={styles.cardContent}>
            <div className={styles.iconContainer} aria-hidden="true">
              <FeatureIcon iconName={data.icon} />
            </div>
            <h3 className={styles.featureTitle}>{data.title}</h3>
            <p className={styles.featureDescription}>{data.description}</p>
          </div>
          {data.image && (
            <div className={styles.featureImageContainer}>
              <img
                src={data.image}
                alt=""
                className={styles.featureImage}
                loading="lazy"
                width="400"
                height="225"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
});

// Custom hook cho screen size
const useScreenSize = () => {
  const [screenData, setScreenData] = useState({
    size: 'desktop',
    visibleItems: 3 // Thay đổi từ 5 thành 3
  });
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenData({ size: 'mobile', visibleItems: 1 });
      } else if (width < 1024) {
        setScreenData({ size: 'tablet', visibleItems: 3 }); // Từ 5 thành 3
      } else {
        setScreenData({ size: 'desktop', visibleItems: 3 }); // Từ 5 thành 3
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return screenData;
};

// State reducer
const featuresReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SCREEN_SIZE':
      return { 
        ...state, 
        screenSize: action.payload, 
        visibleItems: action.payload === 'mobile' ? 1 : 3 // Từ 5 thành 3
      };
    case 'SET_ACTIVE_INDEX':
      return { ...state, activeIndex: action.payload };
    case 'SET_ACTIVE_MOBILE_CARD':
      return { ...state, activeMobileCard: action.payload };
    case 'START_INTERACTION':
      return { ...state, isInteracting: true, showMobileScrollIndicator: false };
    case 'END_INTERACTION':
      return { ...state, isInteracting: false };
    case 'PAUSE_AUTOPLAY':
      return { ...state, isPaused: true };
    case 'RESUME_AUTOPLAY':
      return { ...state, isPaused: false };
    case 'HIDE_SCROLL_INDICATOR':
      return { ...state, showMobileScrollIndicator: false };
    default:
      return state;
  }
};

const SixFeatures = () => {
  // Sử dụng custom hook cho screen size
  const { size: screenSize, visibleItems } = useScreenSize();

  // Sử dụng reducer thay vì nhiều states riêng lẻ
  const [state, dispatch] = useReducer(featuresReducer, {
    activeIndex: 0,
    activeMobileCard: 0,
    isPaused: false,
    isInteracting: false,
    showMobileScrollIndicator: true
  });

  // Destructure state
  const { 
    activeIndex, 
    activeMobileCard, 
    isPaused, 
    isInteracting, 
    showMobileScrollIndicator 
  } = state;
  
  // Refs
  const scrollContainerRef = useRef(null);
  const interactionTimeoutRef = useRef(null);
  const mobileScrollIndicatorTimeout = useRef(null);
  const autoPlayTimerRef = useRef(null);
  
  // Effect: Auto-play
  useEffect(() => {
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
    
    if (isPaused || (screenSize === 'mobile' && isInteracting)) {
      return;
    }
    
    autoPlayTimerRef.current = setTimeout(() => {
      if (screenSize === 'mobile') {
        if (!isInteracting) {
          dispatch({ type: 'SET_ACTIVE_MOBILE_CARD', payload: (activeMobileCard + 1) % featuresData.length });
        }
      } else {
        dispatch({ type: 'SET_ACTIVE_INDEX', payload: (activeIndex + 1) % featuresData.length });
      }
    }, 5000);
    
    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
    };
  }, [activeIndex, activeMobileCard, isPaused, screenSize, isInteracting]);
  
  // Effect: Mobile scroll indicator timeout
  useEffect(() => {
    if (screenSize !== 'mobile' || !showMobileScrollIndicator) return;
    
    if (mobileScrollIndicatorTimeout.current) {
      clearTimeout(mobileScrollIndicatorTimeout.current);
    }
    
    mobileScrollIndicatorTimeout.current = setTimeout(() => {
      dispatch({ type: 'HIDE_SCROLL_INDICATOR' });
    }, 3000);
    
    return () => {
      if (mobileScrollIndicatorTimeout.current) {
        clearTimeout(mobileScrollIndicatorTimeout.current);
      }
    };
  }, [screenSize, showMobileScrollIndicator]);

  // Effect: Scrolling activeMobileCard into view
  useEffect(() => {
    if (screenSize !== 'mobile' || !scrollContainerRef.current || isInteracting) return;

    const scrollContainer = scrollContainerRef.current;
    const cards = Array.from(scrollContainer.querySelectorAll(`.${styles.mobileCard}`));

    if (cards && cards[activeMobileCard]) {
      const cardElement = cards[activeMobileCard];
      const containerWidth = scrollContainer.offsetWidth;
      const cardWidth = cardElement.offsetWidth;
      const cardOffsetLeft = cardElement.offsetLeft;
      
      // Calculate scroll target to center the card
      const scrollTarget = cardOffsetLeft - (containerWidth - cardWidth) / 2;
      const maxScroll = scrollContainer.scrollWidth - containerWidth;
      const finalScrollTarget = Math.max(0, Math.min(scrollTarget, maxScroll));

      // Only scroll if significant difference exists
      if (Math.abs(scrollContainer.scrollLeft - finalScrollTarget) > 1) {
        scrollContainer.scrollTo({
          left: finalScrollTarget,
          behavior: 'smooth'
        });
      }
    }
  }, [activeMobileCard, screenSize, isInteracting]);
  
  // Interaction handlers
  const handleInteractionStart = useCallback(() => {
    if (screenSize !== 'mobile') return;
    
    dispatch({ type: 'START_INTERACTION' });
    
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
      interactionTimeoutRef.current = null;
    }
    
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
  }, [screenSize]);
  
  const handleInteractionEnd = useCallback(() => {
    if (screenSize !== 'mobile') return;
    
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
    
    interactionTimeoutRef.current = setTimeout(() => {
      dispatch({ type: 'END_INTERACTION' });
    }, 1000);
  }, [screenSize]);
  
  // Hợp nhất xử lý navigation
  // Sử dụng useCallback và debounce để tránh gọi quá nhiều lần
  const handleNavigation = useCallback((action, index = null) => {
    const totalItems = featuresData.length;
    let nextIndex;
    
    dispatch({ type: 'RESUME_AUTOPLAY' });
    dispatch({ type: 'START_INTERACTION' });
    
    if (action === 'next') {
      if (screenSize === 'mobile') {
        nextIndex = (activeMobileCard + 1) % totalItems;
        dispatch({ type: 'SET_ACTIVE_MOBILE_CARD', payload: nextIndex });
      } else {
        nextIndex = (activeIndex + 1) % totalItems;
        dispatch({ type: 'SET_ACTIVE_INDEX', payload: nextIndex });
      }
    } else if (action === 'prev') {
      if (screenSize === 'mobile') {
        nextIndex = (activeMobileCard - 1 + totalItems) % totalItems;
        dispatch({ type: 'SET_ACTIVE_MOBILE_CARD', payload: nextIndex });
      } else {
        nextIndex = (activeIndex - 1 + totalItems) % totalItems;
        dispatch({ type: 'SET_ACTIVE_INDEX', payload: nextIndex });
      }
    } else if (action === 'goto' && index !== null) {
      if (screenSize === 'mobile') {
        dispatch({ type: 'SET_ACTIVE_MOBILE_CARD', payload: index });
      } else {
        dispatch({ type: 'SET_ACTIVE_INDEX', payload: index });
      }
    }
    
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(() => {
      dispatch({ type: 'END_INTERACTION' });
    }, 500);
  }, [screenSize, activeIndex, activeMobileCard]);
  
  // Tối ưu debounced scroll handler với useMemo
  const debouncedScrollHandler = useMemo(() => 
    debounce(() => {
      if (!scrollContainerRef.current || screenSize !== 'mobile') return;
      
      const scrollContainer = scrollContainerRef.current;
      const containerWidth = scrollContainer.offsetWidth;
      const scrollLeft = scrollContainer.scrollLeft;
      const cards = Array.from(scrollContainer.querySelectorAll(`.${styles.mobileCard}`));
      
      let centeredCardIndex = -1;
      let minDistance = Infinity;
      
      cards.forEach((card, index) => {
        const cardWidth = card.offsetWidth;
        const cardOffsetLeft = card.offsetLeft;
        const cardCenter = cardOffsetLeft + cardWidth / 2;
        const viewportCenter = scrollLeft + containerWidth / 2;
        const distance = Math.abs(cardCenter - viewportCenter);
        
        if (distance < minDistance) {
          minDistance = distance;
          centeredCardIndex = index;
        }
      });
      
      if (centeredCardIndex !== -1 && centeredCardIndex !== activeMobileCard) {
        dispatch({ type: 'SET_ACTIVE_MOBILE_CARD', payload: centeredCardIndex });
      }
      
      handleInteractionEnd();
    }, 150),
  [screenSize, activeMobileCard, handleInteractionEnd]
  );
  
  // Effect: Attach scroll listeners
  useEffect(() => {
    const scrollElement = scrollContainerRef.current;
    if (screenSize === 'mobile' && scrollElement) {
      scrollElement.addEventListener('touchstart', handleInteractionStart, { passive: true });
      scrollElement.addEventListener('scroll', debouncedScrollHandler, { passive: true });
      
      return () => {
        scrollElement.removeEventListener('touchstart', handleInteractionStart);
        scrollElement.removeEventListener('scroll', debouncedScrollHandler);
        if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
        if (mobileScrollIndicatorTimeout.current) clearTimeout(mobileScrollIndicatorTimeout.current);
        debouncedScrollHandler.cancel();
      };
    }
    
    // Cleanup for non-mobile screens or unmount
    return () => {
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
      if (mobileScrollIndicatorTimeout.current) clearTimeout(mobileScrollIndicatorTimeout.current);
      debouncedScrollHandler.cancel();
    };
  }, [screenSize, handleInteractionStart, debouncedScrollHandler]);
  
  // Memoize getVisibleItemsDesktop function
  const getVisibleItemsDesktop = useCallback(() => {
    const items = [];
    const totalItems = featuresData.length;
    
    const centerIndex = activeIndex;
    const position1Left = (activeIndex - 1 + totalItems) % totalItems;
    const position1Right = (activeIndex + 1) % totalItems;
    
    // Luôn hiển thị 3 card: 1 active ở giữa và 2 non-active ở hai bên
    items.push({ data: featuresData[position1Left], index: position1Left, position: -1 });
    items.push({ data: featuresData[centerIndex], index: centerIndex, position: 0 });
    items.push({ data: featuresData[position1Right], index: position1Right, position: 1 });
    
    return items;
  }, [activeIndex]);
  
  // Memoize desktop card items
  const memoizedDesktopCards = useMemo(() => 
    getVisibleItemsDesktop().map((item) => (
      <DesktopCard 
        key={item.data.id || `desktop-feature-${item.index}`}
        item={item}
        isActive={activeIndex === item.index}
        onSelect={(index) => handleNavigation('goto', index)}
      />
    )), 
    [activeIndex, getVisibleItemsDesktop, handleNavigation]
  );
  
  // Memoize mobile card items
  const memoizedMobileCards = useMemo(() => 
    featuresData.map((feature, index) => (
      <MobileCard 
        key={`mobile-feature-${index}`}
        feature={feature}
        index={index}
        isActive={activeMobileCard === index}
      />
    )),
    [activeMobileCard]
  );
  
  // Xử lý pause/resume autoplay - Sử dụng memoized handlers để tránh re-render
  const handleMouseEnter = useCallback(() => {
    dispatch({ type: 'PAUSE_AUTOPLAY' });
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    dispatch({ type: 'RESUME_AUTOPLAY' });
  }, []);
  
  return (
    <section id="features" className={styles.featuresSection} aria-labelledby="features-title">
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <div className={styles.sectionHeader}>
            <span className={styles.badge}>LỢI THẾ ĐỘC ĐÁO</span>
            <h2 id="features-title" className={styles.sectionTitle}>
              6 Lý Do Để Sở Hữu Sản Phẩm Tại Economy City
            </h2>
            <p className={styles.sectionSubtitle}>
              Tận hưởng cuộc sống đẳng cấp với vị trí đắc địa, tiện ích hoàn hảo và cơ hội đầu tư sinh lời
            </p>
            <div className={styles.titleDivider}></div>
          </div>
        </div>

        {/* === Mobile View === */}
        {screenSize === 'mobile' && (
          <div className={styles.mobileViewContainer}>
            {/* Scroll Indicator - Only show if needed and not interacting */}
            {showMobileScrollIndicator && !isInteracting && (
              <div className={styles.mobileScrollIndicator} aria-hidden="true">
                <div className={styles.swipeIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
                <span>Kéo sang để xem</span>
              </div>
            )}

            <div
              className={styles.mobileScrollView}
              ref={scrollContainerRef}
              role="region"
              aria-label="Danh sách tính năng (dạng cuộn)"
              aria-roledescription="carousel"
            >
              <div className={styles.mobileCardsContainer}>
                {memoizedMobileCards}
              </div>
            </div>

            {/* Mobile Pagination Counter */}
            <div className={styles.mobilePaginationCounter}>
              <button
                onClick={() => handleNavigation('prev')}
                className={styles.counterNavButton}
                aria-label="Slide trước"
                aria-controls={styles.mobileCardsContainer}
                disabled={isInteracting}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <div className={styles.slideCounter} aria-live="polite" aria-atomic="true">
                {String(activeMobileCard + 1).padStart(2, '0')}
              </div>
              <button
                onClick={() => handleNavigation('next')}
                className={styles.counterNavButton}
                aria-label="Slide tiếp theo"
                aria-controls={styles.mobileCardsContainer}
                disabled={isInteracting}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>

            {/* Mobile Dots Indicator */}
            <div className={styles.mobileDotsContainer} role="tablist" aria-label="Điều hướng slide bằng dấu chấm">
              {featuresData.map((_, index) => (
                <button
                  key={`mobile-dot-${index}`}
                  onClick={() => handleNavigation('goto', index)}
                  className={`${styles.mobileDot} ${
                    activeMobileCard === index ? styles.activeMobileDot : ''
                  }`}
                  role="tab"
                  aria-selected={activeMobileCard === index}
                  aria-controls={`mobile-slide-${index}`}
                  aria-label={`Chuyển đến slide ${index + 1}`}
                  tabIndex={0}
                />
              ))}
            </div>
          </div>
        )}

        {/* === Tablet/Desktop Carousel === */}
        {screenSize !== 'mobile' && (
          <div
            className={styles.carouselContainer}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role="region"
            aria-roledescription="carousel"
            aria-label="Các lý do nổi bật để sở hữu Economy City"
          >
            <div
              className={styles.cardsWrapper}
              aria-live="off"
            >
              {memoizedDesktopCards}
            </div>

            {/* Desktop/Tablet Pagination Counter */}
            <div className={styles.paginationCounter}>
              <button
                onClick={() => handleNavigation('prev')}
                className={styles.counterNavButton}
                aria-label="Slide trước"
                aria-controls={styles.cardsWrapper}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <div className={styles.slideCounter} aria-live="polite" aria-atomic="true">
                {String(activeIndex + 1).padStart(2, '0')}
              </div>
              <button
                onClick={() => handleNavigation('next')}
                className={styles.counterNavButton}
                aria-label="Slide tiếp theo"
                aria-controls={styles.cardsWrapper}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>

            {/* Desktop/Tablet Dots Indicator */}
            <div className={styles.dotsContainer} role="tablist" aria-label="Điều hướng slide bằng dấu chấm">
              {featuresData.map((_, index) => (
                <button
                  key={`desktop-dot-${index}`}
                  onClick={() => handleNavigation('goto', index)}
                  className={`${styles.dot} ${
                    activeIndex === index ? styles.activeDot : ''
                  }`}
                  role="tab"
                  aria-selected={activeIndex === index}
                  aria-controls={`desktop-slide-${index}`}
                  aria-label={`Chuyển đến slide ${index + 1}`}
                  tabIndex={0}
                />
              ))}
            </div>

            {/* Autoplay Indicator - Purely visual */}
            <div className={styles.autoPlayIndicator} aria-hidden="true">
              <div
                key={`progress-${activeIndex}`}
                className={styles.autoPlayProgress}
                style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
              ></div>
            </div>
            {/* Không cần thêm style JSX nếu đã định nghĩa trong CSS */}
          </div>
        )}

        <div className={styles.ctaContainer}>
          <a href="#contact" className={styles.ctaButton}>
            Liên hệ tư vấn ngay
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.ctaArrow} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default memo(SixFeatures);