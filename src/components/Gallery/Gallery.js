import React, { useState, useEffect, useMemo, useCallback } from 'react';
import styles from './Gallery.module.css';
import { galleryImages } from '../common/data';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // State cho mobile slider
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // 1. Tối ưu hóa ensureImages với useMemo - Phải khai báo trước useEffect sử dụng nó
  const displayImages = useMemo(() => {
    // Sao chép mảng gốc để không ảnh hưởng đến dữ liệu ban đầu
    let images = [...galleryImages];
    
    // Nếu mảng ảnh hiện tại ít hơn 8 ảnh, thêm ảnh mới
    if (images.length < 8) {
      // Thêm ảnh công viên nếu chưa có
      if (images.length <= 6) {
        images.push({
          id: 'park',
          src: images[0].src, // Tạm dùng lại ảnh có sẵn
          alt: 'Công viên xanh mát'
        });
      }
      
      // Thêm ảnh clubhouse nếu chưa có
      if (images.length <= 7) {
        images.push({
          id: 'clubhouse',
          src: images[1].src, // Tạm dùng lại ảnh có sẵn
          alt: 'Clubhouse đẳng cấp'
        });
      }
    }
    
    return images;
  }, [galleryImages]);

  // 2. Quản lý Side Effects với useEffect - Modal
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function để đảm bảo trạng thái ban đầu khi component unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedImage]);

  // Autoplay effect cho mobile slider
  useEffect(() => {
    // Chỉ chạy autoplay khi flag autoplay = true
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % displayImages.length);
    }, 3000);
    
    // Cleanup timer khi component unmount hoặc dependencies thay đổi
    return () => clearInterval(timer);
  }, [isAutoPlaying, displayImages.length]);

  // Các chức năng điều khiển cho slider mobile
  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
    // Dừng autoplay khi người dùng tương tác trực tiếp
    setIsAutoPlaying(false);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % displayImages.length);
    // Dừng autoplay khi người dùng tương tác trực tiếp
    setIsAutoPlaying(false);
  }, [displayImages?.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + displayImages.length) % displayImages.length);
    // Dừng autoplay khi người dùng tương tác trực tiếp
    setIsAutoPlaying(false);
  }, [displayImages?.length]);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(prev => !prev);
  }, []);

  const openModal = useCallback((image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  // 3. Cải thiện Logic Điều hướng với modulo
  const navigateImage = useCallback((direction) => {
    const newIndex = (currentIndex + direction + displayImages.length) % displayImages.length;
    setSelectedImage(displayImages[newIndex]);
    setCurrentIndex(newIndex);
  }, [currentIndex, displayImages]);

  // 4. Xử lý Sự kiện Bàn phím với mapping object
  const handleKeyDown = useCallback((e) => {
    const keyActions = {
      Escape: closeModal,
      ArrowLeft: () => navigateImage(-1),
      ArrowRight: () => navigateImage(1)
    };

    if (keyActions[e.key]) {
      keyActions[e.key]();
    }
  }, [closeModal, navigateImage]);

  // 5. Tối ưu CSS Class với mapping objects
  const layoutClasses = {
    0: styles.item1, // Ảnh tổng quan dự án (rộng)
    1: styles.item2, // Quảng trường trung tâm (rộng)
    2: styles.item3, // Nhà phố thương mại (cao)
    3: styles.item4, // Biệt thự
    4: styles.item5, // Căn hộ cao tầng
    5: styles.item6, // Tiện ích nội khu (rộng)
    6: styles.item7, // Công viên (mới thêm)
    7: styles.item8  // Clubhouse (mới thêm)
  };

  const positionClasses = {
    0: styles.positionCenter, // Ảnh tổng quan dự án (canh giữa)
    1: styles.positionTop,    // Quảng trường trung tâm (canh trên)
    2: styles.positionCenter, // Nhà phố thương mại (canh giữa)
    3: styles.positionCenter, // Biệt thự
    4: styles.positionTop,    // Căn hộ cao tầng
    5: styles.positionCenter, // Tiện ích nội khu
    6: styles.positionCenter, // Công viên
    7: styles.positionCenter  // Clubhouse
  };

  const getLayoutClass = useCallback((index) => layoutClasses[index] || '', [layoutClasses]);
  const getImagePosition = useCallback((index) => positionClasses[index] || styles.positionCenter, [positionClasses]);

  // 6. Tránh Inline Function trong Render với useCallback
  const handleImageClick = useCallback((image, index) => {
    openModal(image, index);
  }, [openModal]);

  const handleNavigationClick = useCallback((e, direction) => {
    e.stopPropagation();
    navigateImage(direction);
  }, [navigateImage]);
  
  // Mobile slider click handler
  const handleSlideClick = useCallback((image, index) => {
    openModal(image, index);
  }, [openModal]);

  return (
    <section id="thu-vien" className={styles.gallerySection}>
      {/* Phần header với định dạng mới */}
      <div className={styles.sectionHeader}>
        <div className={styles.badgeContainer}>
          <span className={styles.badge}>KHÔNG GIAN SỐNG ĐẲNG CẤP</span>
        </div>
        <h2 className={styles.sectionTitle}>Khám phá Economy City</h2>
        <p className={styles.sectionDescription}>
          Chiêm ngưỡng không gian sống đẳng cấp cùng tiện ích nội khu vượt trội
        </p>
      </div>
      
      <div className={styles.galleryContainer}>
        {/* Mobile Slider - Chỉ hiển thị trên màn hình nhỏ */}
        <div className={styles.mobileSlider}>
          <div 
            className={styles.slides}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {displayImages.map((image, index) => (
              <div 
                className={styles.slide} 
                key={image.id || index}
                onClick={() => handleSlideClick(image, index)}
              >
                <div className={styles.slideImageWrapper}>
                  <img 
                    src={`/img/${image.src}`} 
                    alt={image.alt} 
                    className={styles.slideImage}
                    loading="lazy" 
                  />
                  <div className={styles.slideCaption}>{image.alt}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Điều hướng mobile slider */}
          <button 
            className={`${styles.sliderNavigation} ${styles.sliderPrev}`}
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            aria-label="Ảnh trước"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <button 
            className={`${styles.sliderNavigation} ${styles.sliderNext}`}
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            aria-label="Ảnh tiếp theo"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
          
          {/* Nút tạm dừng/tiếp tục */}
          <button 
            className={styles.autoPlayToggle}
            onClick={(e) => {
              e.stopPropagation();
              toggleAutoPlay();
            }}
            aria-label={isAutoPlaying ? "Tạm dừng trình chiếu" : "Tiếp tục trình chiếu"}
          >
            {isAutoPlaying ? (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            )}
          </button>
          
          {/* Indicators */}
          <div className={styles.indicators}>
            {displayImages.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${currentSlide === index ? styles.activeIndicator : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(index);
                }}
                aria-label={`Chuyển đến ảnh ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Gallery Layout - Hiển thị trên tablet và desktop */}
        <div className={styles.galleryLayout}>
          {displayImages.map((image, index) => (
            <div 
              className={`${styles.galleryItem} ${getLayoutClass(index)}`} 
              key={image.id || index}
              onClick={() => handleImageClick(image, index)}
            >
              <div className={styles.imageWrapper}>
                <img 
                  src={`/img/${image.src}`} 
                  alt={image.alt} 
                  className={`${styles.galleryImage} ${getImagePosition(index)}`}
                  loading="lazy" // Lazy Loading Images
                />
                <div className={styles.galleryOverlay}>
                  <div className={styles.galleryCaption}>{image.alt}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedImage && (
        <div 
          className={styles.modalOverlay}
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex="0"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div 
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className={styles.modalClose} 
              onClick={closeModal}
              aria-label="Đóng hình ảnh"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <img 
              src={`/img/${selectedImage.src}`} 
              alt={selectedImage.alt} 
              className={styles.modalImage}
              id="modal-description"
            />
            
            <div className={styles.modalCaption} id="modal-title">
              {selectedImage.alt}
            </div>
            
            {currentIndex > 0 && (
              <button 
                className={`${styles.modalNavigation} ${styles.modalPrev}`}
                onClick={(e) => handleNavigationClick(e, -1)}
                aria-label="Hình ảnh trước"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
            )}
            
            {currentIndex < displayImages.length - 1 && (
              <button 
                className={`${styles.modalNavigation} ${styles.modalNext}`}
                onClick={(e) => handleNavigationClick(e, 1)}
                aria-label="Hình ảnh tiếp theo"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;