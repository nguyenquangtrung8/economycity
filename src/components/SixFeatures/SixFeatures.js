import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin, Navigation, FileText, Users, Layout, Building } from 'lucide-react';
import { debounce } from 'lodash-es'; // Import debounce nếu bạn quyết định dùng nó cho handleScroll
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
      if (width < 768) {
        setScreenSize('mobile');
        setVisibleItems(1);
        setActiveMobileCard(0); // Reset mobile index khi chuyển sang mobile
      } else if (width < 1024) {
        setScreenSize('tablet');
        setVisibleItems(3); // Giả sử tablet cũng dùng layout 3 item như desktop
        setActiveMobileCard(0); // Reset mobile index khi chuyển sang tablet/desktop
      } else {
        setScreenSize('desktop');
        setVisibleItems(3);
        setActiveMobileCard(0); // Reset mobile index khi chuyển sang tablet/desktop
      }
      setIsPaused(false);
      setIsInteracting(false);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Effect: Auto-play for Desktop/Tablet ---
  useEffect(() => {
    if (screenSize === 'mobile' || isPaused || isInteracting) { // Thêm isInteracting để dừng cả desktop khi mobile tương tác (nếu resize nhanh)
        if (mobileAutoScrollTimer.current) { // Dừng timer mobile nếu đang chạy
           clearInterval(mobileAutoScrollTimer.current);
           mobileAutoScrollTimer.current = null;
        }
        return; // Không chạy auto-play desktop/tablet
    };

    const timer = setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % featuresData.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeIndex, isPaused, screenSize, isInteracting, featuresData.length]); // Thêm isInteracting vào dependencies

  // --- Effect: Auto-play for Mobile ---
   useEffect(() => {
    const startMobileAutoScroll = () => {
        if (mobileAutoScrollTimer.current) {
            clearInterval(mobileAutoScrollTimer.current);
        }
        mobileAutoScrollTimer.current = setInterval(() => {
             setActiveMobileCard(prevIndex => (prevIndex + 1) % featuresData.length);
        }, 5000);
    };

    if (screenSize === 'mobile' && !isPaused && !isInteracting) {
        startMobileAutoScroll();
    } else {
        if (mobileAutoScrollTimer.current) {
            clearInterval(mobileAutoScrollTimer.current);
            mobileAutoScrollTimer.current = null;
        }
    }

    return () => {
        if (mobileAutoScrollTimer.current) {
            clearInterval(mobileAutoScrollTimer.current);
            mobileAutoScrollTimer.current = null;
        }
         if (interactionTimer.current) {
            clearTimeout(interactionTimer.current);
         }
    };
  }, [screenSize, isPaused, isInteracting, featuresData.length, setActiveMobileCard]);

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
      // Tính toán để scroll card vào giữa
      const scrollTarget = cardOffsetLeft - (containerWidth - cardWidth) / 2;
      const maxScroll = scrollContainer.scrollWidth - containerWidth;
      const finalScrollTarget = Math.max(0, Math.min(scrollTarget, maxScroll));

      // Chỉ scroll nếu vị trí hiện tại khác đáng kể so với đích (tránh trigger scroll liên tục)
      if (Math.abs(scrollContainer.scrollLeft - finalScrollTarget) > 1) {
         scrollContainer.scrollTo({
           left: finalScrollTarget,
           behavior: 'smooth'
         });
      }
    }
  }, [activeMobileCard, screenSize]); // Chỉ phụ thuộc activeMobileCard và screenSize

  // --- Effect: Hide Mobile Scroll Indicator ---
  useEffect(() => {
    if (screenSize !== 'mobile' || !showMobileScrollIndicator) return;
    if (mobileScrollIndicatorTimeout.current) {
      clearTimeout(mobileScrollIndicatorTimeout.current);
    }
    mobileScrollIndicatorTimeout.current = setTimeout(() => {
      setShowMobileScrollIndicator(false);
    }, 3000); // Thời gian hiển thị chỉ báo
    return () => {
      if (mobileScrollIndicatorTimeout.current) {
        clearTimeout(mobileScrollIndicatorTimeout.current);
      }
    };
  }, [screenSize, showMobileScrollIndicator]);


  // --- Interaction Handlers ---
  const interactionTimeoutRef = useRef(null);

  const handleInteractionStart = useCallback(() => {
     if (screenSize !== 'mobile') return;
     setIsInteracting(true);
     setShowMobileScrollIndicator(false); // Hide indicator on interaction
     if (mobileAutoScrollTimer.current) {
         clearInterval(mobileAutoScrollTimer.current);
         mobileAutoScrollTimer.current = null;
     }
     if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
     }
  }, [screenSize]);

  const handleInteractionEnd = useCallback(() => {
    if (screenSize !== 'mobile') return;
     // Đặt timeout để reset isInteracting, cho phép auto-scroll chạy lại
     interactionTimeoutRef.current = setTimeout(() => {
        setIsInteracting(false);
     }, 2500); // Delay trước khi resume auto-scroll (điều chỉnh nếu cần)
  }, [screenSize]);

  // --- Effect: Update activeMobileCard on Manual Scroll (Mobile) using Debounce ---
  const debouncedScrollHandler = useCallback(debounce(() => {
    if (!scrollContainerRef.current || screenSize !== 'mobile') return;

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

    // Cập nhật state chỉ khi index thay đổi và người dùng đang tương tác
    // (Tránh việc auto-scroll trigger cập nhật state không cần thiết)
    if (centeredCardIndex !== activeMobileCard) {
       setActiveMobileCard(centeredCardIndex);
    }

    // Đặt lại Interaction End Timeout sau mỗi lần scroll thành công (được debounce)
    handleInteractionEnd();

  }, 150), [screenSize, activeMobileCard, handleInteractionEnd]); // Thêm dependencies

  // Gắn và gỡ bỏ scroll listener (và touch listeners)
  useEffect(() => {
    const scrollElement = scrollContainerRef.current;
    if (screenSize === 'mobile' && scrollElement) {
      scrollElement.addEventListener('scroll', debouncedScrollHandler, { passive: true });
      scrollElement.addEventListener('touchstart', handleInteractionStart, { passive: true });
      // Có thể thêm touchend nếu muốn xử lý phức tạp hơn, nhưng debounce trên scroll thường đủ
      // scrollElement.addEventListener('touchend', handleInteractionEnd, { passive: true });
      return () => {
        scrollElement.removeEventListener('scroll', debouncedScrollHandler);
        scrollElement.removeEventListener('touchstart', handleInteractionStart);
        // scrollElement.removeEventListener('touchend', handleInteractionEnd);
        if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
        debouncedScrollHandler.cancel(); // Hủy debounce
      };
    }
     // Cleanup cho màn hình không phải mobile
     if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
     return () => {
       if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
       debouncedScrollHandler.cancel();
     };
  }, [screenSize, handleInteractionStart, handleInteractionEnd, debouncedScrollHandler]); // Cập nhật dependencies

  // --- Go To Handlers ---
  const goToMobileCard = (index) => {
    if (screenSize !== 'mobile') return;
    handleInteractionStart(); // Coi như bắt đầu tương tác
    setActiveMobileCard(index);
    // handleInteractionEnd sẽ được gọi bởi scroll handler khi scroll kết thúc hoặc timeout
  };

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
  const getVisibleItemsDesktop = () => {
    const items = [];
    const totalItems = featuresData.length;
    // Hiển thị 3 items: center, left, right
    const centerIndex = activeIndex;
    const leftIndex = (activeIndex - 1 + totalItems) % totalItems;
    const rightIndex = (activeIndex + 1) % totalItems;

    // Xác định vị trí tương đối (-1, 0, 1)
    items.push({ data: featuresData[leftIndex], index: leftIndex, position: -1 });
    items.push({ data: featuresData[centerIndex], index: centerIndex, position: 0 });
    items.push({ data: featuresData[rightIndex], index: rightIndex, position: 1 });

    return items;
  };


  // --- Render ---
  return (
    <section id="features" className={styles.featuresSection}>
      {/* Container chính bao toàn bộ section content */}
      <div className={styles.container}>

        {/* === Container phụ CHỈ cho phần text header === */}
        <div className={styles.textContainer}>
          <div className={styles.sectionHeader}>
            <span className={styles.badge}>LỢI THẾ ĐỘC ĐÁO</span>
            <h2 className={styles.sectionTitle}>
              6 Lý Do Để Sở Hữu Sản Phẩm Tại Economy City
            </h2>
            <p className={styles.sectionSubtitle}>
             Tận hưởng cuộc sống đẳng cấp với vị trí đắc địa, tiện ích hoàn hảo và cơ hội đầu tư sinh lời
            </p>
            <div className={styles.titleDivider}></div>
          </div>
        </div>
        {/* === Hết container phụ === */}


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
              // Touch listeners được thêm trong useEffect
            >
              <div className={styles.mobileCardsContainer}>
                {featuresData.map((feature, index) => (
                  <div
                    key={feature.id || index}
                    className={`${styles.featureCard} ${styles.mobileCard} ${activeMobileCard === index ? styles.activeMobileCard : ''}`}
                    // onClick={() => goToMobileCard(index)} // Xem xét bỏ nếu không cần thiết, dots đã xử lý
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`Slide ${index + 1} of ${featuresData.length}: ${feature.title}`}
                    aria-hidden={activeMobileCard !== index} // Thêm aria-hidden cho card không active
                  >
                    <div className={styles.cardContent}>
                      <div className={styles.iconContainer}>
                        {getIconComponent(feature.icon)}
                      </div>
                      <h3 className={styles.featureTitle}>{feature.title}</h3>
                      <p className={styles.featureDescription}>{feature.description}</p>
                    </div>
                    <div className={styles.featureImageContainer}>
                      <img
                        src={feature.image || "/api/placeholder/400/225"}
                        alt={feature.title}
                        className={styles.featureImage}
                        loading="lazy"
                        width="400" // Nên khớp với CSS hoặc bỏ nếu CSS xử lý
                        height="225"// Nên khớp với CSS hoặc bỏ nếu CSS xử lý
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
                  key={`mobile-dot-${index}`}
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
              aria-live="off" // Thay đổi thành off vì các card được quản lý bằng aria-hidden
            >
              {/* Luôn render đủ số lượng card cần thiết (ví dụ 3 cho desktop) */}
              {getVisibleItemsDesktop().map((item) => (
                 <div
                  key={item.data.id || item.index}
                  className={`${styles.featureCard} ${activeIndex === item.index ? styles.activeCard : ''}`}
                  style={{
                    // Đơn giản hóa transform cho 3 card cố định
                    transform: `translateX(${item.position * 105}%) scale(${activeIndex === item.index ? 1 : 0.9})`,
                    opacity: activeIndex === item.index ? 1 : 0.7, // Giữ nguyên opacity
                    zIndex: activeIndex === item.index ? 20 : 10 - Math.abs(item.position),
                    transition: 'transform 0.5s ease, opacity 0.5s ease, box-shadow 0.3s ease', // Bỏ z-index khỏi transition
                  }}
                  role="group"
                  aria-roledescription="slide"
                  aria-hidden={activeIndex !== item.index} // Quan trọng cho accessibility
                  aria-label={`Slide ${item.index + 1} of ${featuresData.length}: ${item.data.title}`}
                >
                    {/* ---- Sửa cấu trúc card Desktop để giống Mobile hơn ---- */}
                   <div className={styles.cardContent}>
                      <div className={styles.iconContainer}>
                        {getIconComponent(item.data.icon)}
                      </div>
                      <h3 className={styles.featureTitle}>{item.data.title}</h3>
                      <p className={styles.featureDescription}>{item.data.description}</p>
                   </div>
                   <div className={styles.featureImageContainer}>
                    <img
                      src={item.data.image || "/api/placeholder/400/225"}
                      alt={item.data.title}
                      className={styles.featureImage}
                      loading="lazy"
                       width="400" // Nên khớp với CSS hoặc bỏ nếu CSS xử lý
                       height="225"// Nên khớp với CSS hoặc bỏ nếu CSS xử lý
                    />
                  </div>
                   {/* ---- Hết sửa cấu trúc ---- */}
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className={`${styles.navButton} ${styles.prevButton}`}
              aria-label="Previous slide"
              aria-controls={styles.cardsWrapper} // Nên trỏ đến ID của cardsWrapper nếu có
            >
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button
              onClick={nextSlide}
              className={`${styles.navButton} ${styles.nextButton}`}
              aria-label="Next slide"
              aria-controls={styles.cardsWrapper} // Nên trỏ đến ID của cardsWrapper nếu có
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
                  aria-controls={styles.cardsWrapper} // Nên trỏ đến ID của cardsWrapper nếu có
                  aria-current={activeIndex === index ? "true" : "false"}
                />
              ))}
            </div>

            {/* Auto Play Indicator */}
            <div className={styles.autoPlayIndicator} aria-hidden="true">
              <div
                key={activeIndex} // Reset animation khi activeIndex thay đổi
                className={styles.autoPlayProgress}
                style={{ animation: isPaused ? 'none' : `autoPlayProgress 5s linear forwards` }}
              ></div>
            </div>
             {/* CSS for autoPlayProgress animation */}
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
        </div>
      </div> {/* Đóng container chính */}
    </section>
  );
};

export default SixFeatures;