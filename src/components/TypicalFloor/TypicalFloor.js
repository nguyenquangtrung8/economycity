// src/components/EconomyCityLanding/TypicalFloor/TypicalFloor.js
import React, { useState, useMemo, memo, useCallback } from 'react';
import styles from './TypicalFloor.module.css';
import { ChevronLeft, ChevronRight, MapPin, Home, Maximize, Layers, Grid, Activity } from 'lucide-react';
import { typicalApartments } from './TypicalFloorData';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// Memoized ApartmentTabs component
const ApartmentTabs = memo(({ apartments, activeApartmentId, onSelectApartment }) => {
  return (
    <div className={styles.apartmentTabs}>
      {apartments.map(apartment => (
        <button
          key={apartment.id}
          className={`${styles.apartmentTab} ${apartment.id === activeApartmentId ? styles.activeTab : ''}`}
          onClick={() => onSelectApartment(apartment.id)}
          aria-label={`Chọn loại căn hộ ${apartment.name}`}
        >
          {apartment.name}
        </button>
      ))}
    </div>
  );
});

// Memoized PropertyDetails component
const PropertyDetails = memo(({ details }) => {
  // Map icon string to actual component
  const getIcon = (iconName) => {
    const icons = {
      MapPin: <MapPin size={18} />,
      Home: <Home size={18} />,
      Maximize: <Maximize size={18} />,
      Layers: <Layers size={18} />,
      Grid: <Grid size={18} />,
      Activity: <Activity size={18} />
    };
    return icons[iconName] || null;
  };

  return (
    <div className={styles.propertyDetails}>
      {details.map((detail, index) => (
        <div key={index} className={styles.detailItem}>
          <div className={styles.detailIcon}>{getIcon(detail.icon)}</div>
          <div className={styles.detailContent}>
            <div className={styles.detailLabel}>{detail.label}</div>
            <div className={styles.detailValue}>{detail.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
});

// Memoized FloorSelector component với một số cải tiến
const FloorSelector = memo(({ floors, selectedFloorIndex, onSelectFloor }) => {
  return (
    <div className={styles.floorSelector}>
      <div className={styles.floorSelectorTitle}>Chọn loại mặt bằng:</div>
      <div className={styles.floorButtonRow}>
        {floors.map((floor, index) => (
          <button 
            key={floor.id}
            className={`${styles.floorButton} ${selectedFloorIndex === index ? styles.activeFloor : ''}`}
            onClick={() => onSelectFloor(index)}
            aria-label={`Chọn ${floor.name}`}
          >
            <span className={styles.floorButtonText}>{floor.name}</span>
            <span className={styles.floorButtonShortText}>T{floor.name.split(' ')[1]}</span>
          </button>
        ))}
      </div>
    </div>
  );
});

// Memoized FloorPlan component with Zoom capability
const FloorPlan = memo(({ activeFloor, activeApartment, selectedFloorIndex, totalFloors, onPrev, onNext }) => {
  return (
    <div className={styles.rightColumn}>
      <div className={styles.floorPlanLabel}>MẶT BẰNG TẦNG {activeFloor.name.split(' ')[1]}</div>
      
      <div className={styles.floorPlanWrapper}>
        <TransformWrapper
          initialScale={1}
          initialPositionX={0}
          initialPositionY={0}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <div className={styles.zoomControls}>
                <button onClick={() => zoomIn()} className={styles.zoomButton} aria-label="Phóng to">+</button>
                <button onClick={() => zoomOut()} className={styles.zoomButton} aria-label="Thu nhỏ">-</button>
                <button onClick={() => resetTransform()} className={styles.zoomButton} aria-label="Khôi phục">↺</button>
              </div>
              <TransformComponent>
                <img 
                  src={activeFloor.image} 
                  alt={`${activeApartment.name} - ${activeFloor.name}`} 
                  className={styles.floorPlanImage}
                  loading="lazy"
                />
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>
      
      <div className={styles.floorPlanNavigation}>
        <button 
          className={`${styles.navButton} ${selectedFloorIndex === 0 ? styles.disabled : ''}`}
          onClick={onPrev}
          disabled={selectedFloorIndex === 0}
          aria-label="Xem tầng trước đó"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className={styles.navLabel}>
          {activeFloor.name} ({selectedFloorIndex + 1}/{totalFloors})
        </div>
        
        <button 
          className={`${styles.navButton} ${selectedFloorIndex === totalFloors - 1 ? styles.disabled : ''}`}
          onClick={onNext}
          disabled={selectedFloorIndex === totalFloors - 1}
          aria-label="Xem tầng tiếp theo"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
});

// Main component
const TypicalFloor = () => {
  // Optimize state to only track necessary values
  const [activeApartmentId, setActiveApartmentId] = useState(2); // Default to second item (Shophouse Góc)
  const [selectedFloorIndex, setSelectedFloorIndex] = useState(0);
  
  // Memoize the active apartment to prevent unnecessary calculations
  const activeApartment = useMemo(() => {
    return typicalApartments.find(apartment => apartment.id === activeApartmentId) || typicalApartments[0];
  }, [activeApartmentId]);
  
  // Handle error cases
  if (!activeApartment) {
    return (
      <div className={styles.error}>
        <p>Không tìm thấy thông tin căn hộ. Vui lòng thử lại sau.</p>
      </div>
    );
  }
  
  const activeFloor = activeApartment.floors[selectedFloorIndex];
  if (!activeFloor) {
    return (
      <div className={styles.error}>
        <p>Không tìm thấy thông tin mặt bằng. Vui lòng thử lại sau.</p>
      </div>
    );
  }
  
  // Event handlers with useCallback
  const handleSelectApartment = useCallback((id) => {
    setActiveApartmentId(id);
    setSelectedFloorIndex(0); // Reset to first floor when changing apartment type
  }, []);
  
  const goToNextFloor = useCallback(() => {
    if (selectedFloorIndex < activeApartment.floors.length - 1) {
      setSelectedFloorIndex(prev => prev + 1);
    }
  }, [selectedFloorIndex, activeApartment.floors.length]);
  
  const goToPrevFloor = useCallback(() => {
    if (selectedFloorIndex > 0) {
      setSelectedFloorIndex(prev => prev - 1);
    }
  }, [selectedFloorIndex]);
  
  // Function to scroll to contact form
  const scrollToContactForm = () => {
    const contactForm = document.getElementById('contact');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="mat-bang" className={styles.typicalFloor}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>MẶT BẰNG ĐA DẠNG CHO MỌI NHU CẦU</span>
          <h2 className={styles.sectionTitle}>Mặt bằng điển hình</h2>
          <p className={styles.sectionSubtitle}>Khám phá các mẫu thiết kế hiện đại của Economy City Văn Lâm</p>
        </div>
        
        {/* Tab chọn loại căn hộ - Memoized component */}
        <ApartmentTabs 
          apartments={typicalApartments} 
          activeApartmentId={activeApartmentId} 
          onSelectApartment={handleSelectApartment} 
        />
        
        {/* Container chính */}
        <div className={styles.mainContainer}>
          {/* Phần bên trái - Thông tin */}
          <div className={styles.leftColumn}>
            {/* Thêm phần đối tượng phù hợp & thông tin chung */}
            <div className={styles.overviewSection}>
              <h3 className={styles.overviewTitle}>Đối tượng phù hợp</h3>
              <ul className={styles.overviewList}>
                <li>Nhà đầu tư muốn kinh doanh kết hợp cho thuê</li>
                <li>Doanh nhân địa phương mở văn phòng đại diện</li>
                <li>Gia đình có nhu cầu ở thực gần khu công nghiệp</li>
              </ul>
            </div>
            
            {/* Floor selector - Memoized component */}
            <FloorSelector 
              floors={activeApartment.floors}
              selectedFloorIndex={selectedFloorIndex}
              onSelectFloor={setSelectedFloorIndex}
            />
            
            {/* Property details - Memoized component */}
            <PropertyDetails details={activeApartment.details} />
          </div>
          
          {/* Floor plan - Memoized component with zoom capabilities */}
          <FloorPlan 
            activeFloor={activeFloor}
            activeApartment={activeApartment}
            selectedFloorIndex={selectedFloorIndex}
            totalFloors={activeApartment.floors.length}
            onPrev={goToPrevFloor}
            onNext={goToNextFloor}
          />
        </div>
        
        {/* Nút đăng ký tư vấn với chức năng cuộn đến form */}
        <button 
          className={styles.registerButtonFull}
          aria-label="Đăng ký tư vấn ngay"
          onClick={scrollToContactForm}
        >
          Đăng ký tư vấn ngay
        </button>
      </div>
    </section>
  );
};

export default TypicalFloor;