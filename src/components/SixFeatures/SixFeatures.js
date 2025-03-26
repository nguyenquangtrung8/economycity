import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin, Navigation, FileText, Users, Layout, Building } from 'lucide-react';
import styles from './SixFeatures.module.css'; // Đảm bảo đường dẫn này đúng
import { featuresData } from './SixFeaturesData'; // Đảm bảo đường dẫn này đúng và file tồn tại

const SixFeatures = () => {
  // --- States ---
  const [activeIndex, setActiveIndex] = useState(0); // For Desktop/Tablet Carousel
  const [activeMobileCard, setActiveMobileCard] = useState(0); // For Mobile Carousel
  const [isPaused, setIsPaused] = useState(false); // Pause state for both carousels
  const [screenSize, setScreenSize] = useState('desktop');
  const [visibleItems, setVisibleItems] = useState(3); // For Desktop/Tablet rendering logic
  const [showMobileScrollIndicator, setShowMobileScrollIndicator] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false); // Track user interaction on mobile scroll

  // --- Refs ---
  const scrollContainerRef = useRef(null);
  const mobileScrollIndicatorTimeout = useRef(null);
  const mobileAutoScrollTimer = useRef(null); // Ref for mobile timer ID
  const interactionTimer = useRef(null); // Timer to resume auto-scroll after interaction

  // --- Effect: Screen Size Detection ---
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // Sử dụng breakpoint 768px để khớp với CSS media query (max-width: 767px)
      if (width < 768) {
        setScreenSize('mobile');
        setVisibleItems(1); // Mobile hiển thị 1 card chính tại một thời điểm khi cuộn
      } else if (width < 1024) {
        setScreenSize('tablet');
        setVisibleItems(2); // Ví dụ: Tablet hiển thị 2 hoặc 3 card
         setActiveMobileCard(0); // Reset mobile index khi chuyển sang tablet/desktop
      } else {
        setScreenSize('desktop');
        setVisibleItems(3); // Desktop hiển thị 3 card
        setActiveMobileCard(0); // Reset mobile index khi chuyển sang tablet/desktop
      }
      // Reset pause state on resize
      setIsPaused(false);
      setIsInteracting(false); // Reset interaction state
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Effect: Auto-play for Desktop/Tablet ---
  useEffect(() => {
    // Chỉ chạy trên desktop/tablet và khi không pause
    if (screenSize === 'mobile' || isPaused) return;

    const timer = setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % featuresData.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeIndex, isPaused, screenSize, featuresData.length]);

  // --- Effect: Auto-play for Mobile ---
  useEffect(() => {
    // Clear existing timer first
    if (mobileAutoScrollTimer.current) {
      clearInterval(mobileAutoScrollTimer.current);
    }

    // Chỉ chạy trên mobile, khi không pause và không có tương tác gần đây
    if (screenSize !== 'mobile' || isPaused || isInteracting) {
       return;
    }

    mobileAutoScrollTimer.current = setInterval(() => {
      // Cập nhật state activeMobileCard thay vì gọi scroll trực tiếp
      setActiveMobileCard(prevIndex => (prevIndex + 1) % featuresData.length);
    }, 5000); // 5 seconds interval

    // Cleanup function
    return () => {
      if (mobileAutoScrollTimer.current) {
        clearInterval(mobileAutoScrollTimer.current);
      }
    };
  }, [screenSize, isPaused, isInteracting, featuresData.length]);

   // --- Effect: Handle Scrolling when activeMobileCard changes ---
   useEffect(() => {
    if (screenSize !== 'mobile' || !scrollContainerRef.current) return;

    const scrollContainer = scrollContainerRef.current;
    const cards = scrollContainer.querySelectorAll(`.${styles.mobileCard}`);

    if (cards && cards[activeMobileCard]) {
      const cardElement = cards[activeMobileCard];
      const containerWidth = scrollContainer.offsetWidth;
      const cardWidth = cardElement.offsetWidth;
      const cardOffsetLeft = cardElement.offsetLeft;
      // Vị trí scroll để đưa card vào giữa = vị trí card - (chiều rộng container - chiều rộng card) / 2
      const scrollTarget = cardOffsetLeft - (containerWidth - cardWidth) / 2;
      const maxScroll = scrollContainer.scrollWidth - containerWidth;
      const finalScrollTarget = Math.max(0, Math.min(scrollTarget, maxScroll));

      scrollContainer.scrollTo({
        left: finalScrollTarget,
        behavior: 'smooth'
      });
    }
  }, [activeMobileCard, screenSize]);

  // --- Effect: Hide Mobile Scroll Indicator ---
  useEffect(() => {
    if (screenSize !== 'mobile' || !showMobileScrollIndicator) return;
    if (mobileScrollIndicatorTimeout.current) {
      clearTimeout(mobileScrollIndicatorTimeout.current);
    }
    mobileScrollIndicatorTimeout.current = setTimeout(() => {
      setShowMobileScrollIndicator(false);
    }, 3000);
    return () => {
      if (mobileScrollIndicatorTimeout.current) {
        clearTimeout(mobileScrollIndicatorTimeout.current);
      }
    };
  }, [screenSize, showMobileScrollIndicator]);

  // --- Effect: Update activeMobileCard on Manual Scroll (Mobile) ---
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current || screenSize !== 'mobile') return;

    setIsInteracting(true);
    clearTimeout(interactionTimer.current);
    interactionTimer.current = setTimeout(() => setIsInteracting(false), 1500);

    const scrollContainer = scrollContainerRef.current;
    const containerWidth = scrollContainer.offsetWidth;
    const scrollLeft = scrollContainer.scrollLeft;
    const cards = scrollContainer.querySelectorAll(`.${styles.mobileCard}`);

    let centeredCardIndex = 0;
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

    if (centeredCardIndex !== activeMobileCard) {
       setActiveMobileCard(centeredCardIndex);
    }
  }, [screenSize, activeMobileCard]);

  // Gắn và gỡ bỏ scroll listener
  useEffect(() => {
    const scrollElement = scrollContainerRef.current;
    if (screenSize === 'mobile' && scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        scrollElement.removeEventListener('scroll', handleScroll);
        clearTimeout(interactionTimer.current);
      };
    }
     clearTimeout(interactionTimer.current);
     return () => {
       clearTimeout(interactionTimer.current);
     };
  }, [screenSize, handleScroll]);

  // --- Handlers ---
  const goToMobileCard = (index) => {
    if (screenSize !== 'mobile') return;
    setIsInteracting(true);
    clearTimeout(interactionTimer.current);
    interactionTimer.current = setTimeout(() => setIsInteracting(false), 5000);
    setActiveMobileCard(index);
    setShowMobileScrollIndicator(false);
  };

  const handleMobileTouchStart = () => {
    if (screenSize !== 'mobile') return;
    setIsInteracting(true);
    setShowMobileScrollIndicator(false);
    clearTimeout(interactionTimer.current);
     if (mobileAutoScrollTimer.current) {
       clearInterval(mobileAutoScrollTimer.current);
     }
  };

  // Desktop/Tablet navigation
  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % featuresData.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? featuresData.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  // --- Helper: Get Icon ---
  const getIconComponent = (iconName) => {
    switch(iconName) {
      case 'MapPin': return <MapPin size={24} aria-hidden="true" />;
      case 'Navigation': return <Navigation size={24} aria-hidden="true" />;
      case 'FileText': return <FileText size={24} aria-hidden="true" />;
      case 'Users': return <Users size={24} aria-hidden="true" />;
      case 'Layout': return <Layout size={24} aria-hidden="true" />;
      case 'Building': return <Building size={24} aria-hidden="true" />;
      default: return null;
    }
  };

  // --- Helper: Get Visible Items for Desktop/Tablet ---
  const getVisibleItems = () => {
    const items = [];
    const halfVisible = Math.floor(visibleItems / 2);

    for (let i = -halfVisible; i <= halfVisible; i++) {
      if (visibleItems % 2 === 0 && i === halfVisible) continue;

      let index = (activeIndex + i + featuresData.length) % featuresData.length;
      items.push({
        data: featuresData[index],
        index: index,
        position: i
      });
    }
    items.sort((a, b) => a.position - b.position);
    return items;
  };

  // --- Render ---
  return (
    <section id="features" className={styles.featuresSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>LỢI THẾ ĐỘC ĐÁO</span>
          <h2 className={styles.sectionTitle}>
            6 Lý Do Để Sở Hữu Sản Phẩm Tại Economy City
          </h2>
          <p className={styles.sectionSubtitle}>
            Đầu tư thông minh - Vị trí đắc địa - Tiện ích đẳng cấp - Lợi nhuận bền vững
          </p>
          <div className={styles.titleDivider}></div>
        </div>

        {/* === Mobile View === */}
        {screenSize === 'mobile' && (
          <div className={styles.mobileViewContainer}>
            {/* Mobile Scroll Indicator */}
            {showMobileScrollIndicator && (
              <div className={styles.mobileScrollIndicator}>
                 <div className={styles.swipeIcon}>
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                 </div>
                <span>Kéo sang để xem</span>
              </div>
            )}

            {/* Mobile Scrollable View */}
            <div
              className={styles.mobileScrollView}
              ref={scrollContainerRef}
              onTouchStart={handleMobileTouchStart}
            >
              <div className={styles.mobileCardsContainer}>
                {featuresData.map((feature, index) => (
                  <div
                    key={feature.id || index}
                    className={`${styles.featureCard} ${styles.mobileCard} ${activeMobileCard === index ? styles.activeMobileCard : ''}`}
                    onClick={() => goToMobileCard(index)}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`Slide ${index + 1} of ${featuresData.length}: ${feature.title}`}
                  >
                    <div className={styles.cardContent}>
                      <div className={styles.iconContainer}>
                        {getIconComponent(feature.icon)}
                      </div>
                      <h3 className={styles.featureTitle}>{feature.title}</h3>
                      <p className={styles.featureDescription}>{feature.description}</p>
                       {/* <button className={styles.readMore}>Đọc thêm</button> */}
                    </div>
                    <div className={styles.featureImageContainer}>
                      <img
                        src={feature.image || "/api/placeholder/400/225"}
                        alt={feature.title}
                        className={styles.featureImage}
                        loading="lazy"
                        width="400"
                        height="225"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Dots Indicator */}
            <div className={styles.mobileDotsContainer}>
              {featuresData.map((_, index) => (
                <button
                  key={`dot-${index}`}
                  onClick={() => goToMobileCard(index)}
                  className={`${styles.mobileDot} ${
                    activeMobileCard === index ? styles.activeMobileDot : ''
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={activeMobileCard === index ? "true" : "false"}
                />
              ))}
            </div>
          </div>
        )}

        {/* === Tablet/Desktop Carousel === */}
        {screenSize !== 'mobile' && (
          <div
            className={styles.carouselContainer}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            role="region"
            aria-roledescription="carousel"
            aria-label="Lý do nên đầu tư vào Economy City"
          >
            <div
              className={styles.cardsWrapper}
              aria-live="polite"
            >
              {getVisibleItems().map((item) => (
                 <div
                  key={item.data.id || item.index}
                  className={`${styles.featureCard} ${activeIndex === item.index ? styles.activeCard : ''}`}
                  style={{
                    transform: `translateX(${item.position * 105}%) scale(${activeIndex === item.index ? 1 : 0.9})`,
                    opacity: activeIndex === item.index ? 1 : 0.7,
                    zIndex: activeIndex === item.index ? 20 : 10 - Math.abs(item.position),
                    transition: 'transform 0.5s ease, opacity 0.5s ease, z-index 0.5s ease'
                  }}
                  role="group"
                  aria-roledescription="slide"
                  aria-hidden={activeIndex !== item.index}
                  aria-label={`Slide ${item.index + 1} of ${featuresData.length}: ${item.data.title}`}
                >
                   <div className={styles.iconContainer}>
                    {getIconComponent(item.data.icon)}
                  </div>
                  <h3 className={styles.featureTitle}>{item.data.title}</h3>
                  <p className={styles.featureDescription}>{item.data.description}</p>
                  <div className={styles.featureImageContainer}>
                    <img
                      src={item.data.image || "/api/placeholder/400/225"}
                      alt={item.data.title}
                      className={styles.featureImage}
                      loading="lazy"
                      width="400"
                      height="225"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className={`${styles.navButton} ${styles.prevButton}`}
              aria-label="Previous slide"
              aria-controls={styles.cardsWrapper}
            >
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button
              onClick={nextSlide}
              className={`${styles.navButton} ${styles.nextButton}`}
              aria-label="Next slide"
              aria-controls={styles.cardsWrapper}
            >
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>

            {/* Dots Indicator */}
            <div className={styles.dotsContainer}>
              {featuresData.map((_, index) => (
                <button
                  key={`desktop-dot-${index}`}
                  onClick={() => goToSlide(index)}
                  className={`${styles.dot} ${
                    activeIndex === index ? styles.activeDot : ''
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-controls={styles.cardsWrapper}
                  aria-current={activeIndex === index ? "true" : "false"}
                />
              ))}
            </div>

            {/* Auto Play Indicator */}
            <div className={styles.autoPlayIndicator} aria-hidden="true">
              <div
                key={activeIndex} // Reset animation by changing key
                className={styles.autoPlayProgress}
                style={{ animation: isPaused ? 'none' : `autoPlayProgress 5s linear forwards` }}
              ></div>
            </div>
             {/* CSS for autoPlayProgress animation - Inline style for simplicity here */}
             <style jsx>{`
               @keyframes autoPlayProgress {
                 from { width: 0%; }
                 to { width: 100%; }
               }
             `}</style>
          </div>
        )}

        {/* CTA Button */}
        <div className={styles.ctaContainer}>
           <a href="#contact" className={styles.ctaButton}>
            Liên hệ tư vấn ngay
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.ctaArrow} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
          </a>
          {/* Promo badge đã được xóa */}
        </div>
      </div>
    </section>
  );
};

export default SixFeatures;