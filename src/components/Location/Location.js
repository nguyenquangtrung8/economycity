// src/components/Location/Location.js
import React, { useState, useEffect } from 'react';
import styles from './Location.module.css';
import { locationData } from './LocationData';

// Dữ liệu mặc định để tránh lỗi nếu locationData không được import đúng
const defaultData = {
  badge: "VỊ TRÍ",
  title: "VỊ TRÍ DỰ ÁN",
  description: "Mô tả vị trí dự án",
  mapImage: { src: "", alt: "Bản đồ vị trí" },
  mapLegend: [],
  connectionsTitle: "Kết nối",
  connectionGroups: [],
  travelTimes: { title: "Thời gian di chuyển", items: [] }
};

// Mapping giữa tiêu đề gốc và tiêu đề hiển thị trên tab
const tabMapping = {
  'Tiện ích nội khu': 'under1km',
  'Tiện ích ngoại khu': 'under5km',
  'Kết nối giao thông': 'transport',
  'Thời gian di chuyển': 'traveltime'
};

// Mapping ngược lại để hiển thị tab
const tabNameMapping = {
  'under1km': 'Dưới 1Km',
  'under5km': 'Dưới 5Km',
  'transport': 'Kết nối giao thông',
  'traveltime': 'Thời gian di chuyển'
};

// Hàm lấy icon từ dữ liệu item
const getIconByType = (item) => {
  if (item && item.icon) {
    return <img src={item.icon} alt={item.text || 'Icon'} />;
  }
  
  // Fallback icon nếu không có icon trong data
  return <img src="/img/icons/default.svg" alt="Default icon" />;
};

// Hàm lấy icon cho tab
const getTabIcon = (group) => {
  // Sử dụng tabIcon nếu có
  if (group.tabIcon) {
    return <img src={group.tabIcon} alt={group.title || 'Tab'} />;
  }
  
  // Fallback: Sử dụng icon của item đầu tiên nếu có
  const firstItem = group.items && group.items.length > 0 ? group.items[0] : null;
  if (firstItem && firstItem.icon) {
    return <img src={firstItem.icon} alt={group.title || 'Tab'} />;
  }
  
  // Fallback nếu không có icon nào
  return <img src="/img/icons/default.svg" alt={group.title || 'Tab'} />;
};

/**
 * Location Component - Hiển thị thông tin vị trí của dự án Economy City
 */
const Location = () => {
  // Sử dụng default data nếu locationData không tồn tại hoặc thiếu thuộc tính
  const data = {...defaultData, ...locationData};
  
  // State để quản lý tab đang được chọn
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  
  // Tự động chuyển tab sau mỗi 5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTabIndex((prevIndex) => (prevIndex + 1) % data.connectionGroups.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [data.connectionGroups.length]);
  
  // Lấy nội dung của tab hiện tại
  const currentTabGroup = data.connectionGroups[activeTabIndex] || { items: [] };
  const currentTabType = tabMapping[currentTabGroup.title] || 'under1km';
  
  return (
    <section id="location" className={styles.location}>
      {/* Header section */}
      <div className={styles.headerContainer}>
        <div className={styles.tagWrapper}>
          <span className={styles.tag}>VỊ TRÍ CHIẾN LƯỢC</span>
        </div>
        <h2 className={styles.heading}>Trái Tim Thành Phố Tương Lai</h2>
        <div className={styles.seoDescription}>
          <p className={styles.seoParagraph}>
            Economy City nằm tại trung tâm Như Quỳnh, Văn Lâm, Hưng Yên, đối diện Huyện ủy và UBND, sở hữu lợi thế kết nối vượt trội. Cách Hà Nội 20km, dự án kết nối qua cao tốc Hà Nội - Hải Phòng, Vành đai 3.5, Vành đai 4. Vị trí đắc địa mang lại tiện ích sống tối ưu và tiềm năng phát triển bền vững. Dự án hứa hẹn gia tăng giá trị vượt bậc, trở thành tâm điểm đầu tư khu vực phía Đông Hà Nội
          </p>
        </div>
      </div>

      {/* Main content - Không còn container bọc nữa */}
      <div className={styles.mainContentWrapper}>
        {/* Cột bên trái: Danh sách kết nối */}
        <div className={styles.leftColumn}>
          <div className={styles.sectionTitleContainer}>
            <h2 className={styles.sectionTitleUnderline}>Kết nối đa chiều, thuận tiện di chuyển</h2>
            <div className={styles.underline}></div>
          </div>
          
          {/* Tab Navigation */}
          <div className={styles.tabContainer}>
            <div className={styles.tabHeader}>
              {data.connectionGroups.map((group, index) => (
                <button 
                  key={index}
                  className={`${styles.tabButton} ${activeTabIndex === index ? styles.active : ''}`}
                  onClick={() => setActiveTabIndex(index)}
                >
                  <span className={styles.tabIcon}>
                    {getTabIcon(group)}
                  </span>
                  <span className={styles.tabText}>
                    {tabNameMapping[tabMapping[group.title]] || group.title}
                  </span>
                </button>
              ))}
            </div>
            
            {/* Tab Content */}
            <div className={styles.tabContent}>
              {currentTabGroup.items && currentTabGroup.items.slice(0, 6).map((item, idx) => (
                <div key={idx} className={styles.tabItem}>
                  <div className={styles.tabItemIcon}>
                    {getIconByType(item)}
                  </div>
                  {/* Kiểm tra xem item có thuộc tính subtitle không (cho tab thời gian) */}
                  {item.subtitle ? (
                    <>
                      <h3 className={styles.tabItemTitle}>{item.text}</h3>
                      <p className={styles.tabItemSubtitle}>{item.subtitle}</p>
                    </>
                  ) : item.text.includes(" ") ? (
                    <>
                      <h3 className={styles.tabItemTitle}>
                        {item.text.split(" ")[0]}
                        {item.text.includes("KCN") && item.text.split(" ")[1] ? " " + item.text.split(" ")[1] : ""}
                      </h3>
                      <p className={styles.tabItemSubtitle}>
                        {item.text.includes("KCN") 
                          ? item.text.split(" ").slice(2).join(" ")
                          : item.text.split(" ").slice(1).join(" ")
                        }
                      </p>
                    </>
                  ) : (
                    <h3 className={styles.tabItemTitle}>{item.text}</h3>
                  )}
                </div>
              ))}
            </div>
            
            {/* Indicator dots */}
            <div className={styles.indicator}>
              {data.connectionGroups.map((_, index) => (
                <div 
                  key={index}
                  className={`${styles.indicatorDot} ${activeTabIndex === index ? styles.active : ''}`}
                  onClick={() => setActiveTabIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Cột bên phải: Video vị trí (giờ sẽ chiếm toàn bộ không gian) */}
        <div className={styles.rightColumn}>
          <div className={styles.mapContainer}>
            {data.localVideoSrc ? (
              <video 
                className={styles.mapVideo}
                src={data.localVideoSrc}
                poster={data.mapImage?.src}
                controls
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={data.localVideoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : data.mapImage && data.mapImage.src ? (
              <img 
                src={data.mapImage.src} 
                alt={data.mapImage.alt || 'Bản đồ vị trí'} 
                className={styles.mapImage}
              />
            ) : (
              <p>Video giới thiệu vị trí sẽ được hiển thị ở đây</p>
            )}
          </div>
        </div>
      </div>

      {/* Nút CTA ở cuối component */}
      <div className={styles.footerCtaContainer}>
        <a href="#contact" className={styles.footerButton}>Tìm hiểu thêm</a>
      </div>
    </section>
  );
};

export default Location;