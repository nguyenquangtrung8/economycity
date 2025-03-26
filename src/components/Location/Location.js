import React, { useState, useEffect } from 'react';
import styles from './Location.module.css';
import { locationData } from './LocationData';
import { FaMapMarkerAlt, FaBuilding, FaRoad, FaClock, FaMapPin, FaPlane, FaStore } from 'react-icons/fa';

// Fallback data để tránh lỗi nếu locationData không được import đúng
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
  'Kết nối giao thông': 'transport'
};

// Mapping ngược lại để hiển thị tab
const tabNameMapping = {
  'under1km': 'Dưới 1Km',
  'under5km': 'Dưới 5Km',
  'transport': 'Kết nối giao thông'
};

// Icon mapping for tabs
const tabIconMapping = {
  'under1km': <FaBuilding />,
  'under5km': <FaMapMarkerAlt />,
  'transport': <FaRoad />
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
  
  return (
    <section id="location" className={styles.location}>
      <div className={styles.container}>
        {/* Header section */}
        <div className={styles.headerContainer}>
          <div className={styles.tagWrapper}>
            <span className={styles.tag}>VỊ TRÍ CHIẾN LƯỢC</span>
          </div>
          <h2 className={styles.heading}>Trái Tim Thành Phố Tương Lai</h2>
          <div className={styles.seoDescription}>
            <p className={styles.seoParagraph}>
              Tọa lạc tại <strong>vị trí đắc địa</strong> trung tâm thị trấn Như Quỳnh, huyện Văn Lâm, tỉnh Hưng Yên, <strong>Economy City</strong> sở hữu lợi thế kết nối vượt trội khi đối diện trực tiếp với Huyện ủy và UBND huyện. Với vai trò là <strong>trung tâm hành chính, kinh tế, văn hóa, xã hội</strong> của khu vực, vị trí này không chỉ mang đến sự thuận tiện tối ưu cho cư dân khi tiếp cận các cơ quan công quyền mà còn nâng tầm giá trị đầu tư và tiềm năng phát triển dài hạn của dự án.
            </p>
            <p className={styles.seoParagraph}>
              Với <strong>khoảng cách chỉ 20km từ Hà Nội</strong>, <strong>Economy City</strong> thiết lập hệ thống kết nối giao thông đồng bộ và hiện đại đến các trung tâm kinh tế quan trọng khu vực phía Bắc. Dự án được hưởng lợi từ hệ thống hạ tầng giao thông hoàn thiện bao gồm các tuyến đường huyết mạch như <strong>cao tốc Hà Nội - Hải Phòng, Vành đai 3.5, Vành đai 4</strong> , mở ra cơ hội phát triển không giới hạn cho cư dân và nhà đầu tư.
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className={styles.mainContentWrapper}>
          {/* Cột bên trái: Danh sách kết nối */}
          <div className={styles.leftColumn}>
            <h2 className={styles.sectionTitle}>Kết nối đa chiều, thuận tiện di chuyển</h2>
            
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
                      {tabIconMapping[tabMapping[group.title]] || <FaMapPin />}
                    </span>
                    <span className={styles.tabText}>
                      {tabNameMapping[tabMapping[group.title]] || group.title}
                    </span>
                  </button>
                ))}
              </div>
              
              {/* Tab Content */}
              <div className={styles.tabContent}>
                {currentTabGroup.items && currentTabGroup.items.map((item, idx) => (
                  <div key={idx} className={styles.tabItem}>
                    <div className={styles.tabItemIcon}>
                      {item.icon}
                    </div>
                    {item.text.includes(" ") ? (
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

          {/* Cột bên phải: Bản đồ và thời gian di chuyển */}
          <div className={styles.rightColumn}>
            <div className={styles.mapContainer}>
              {data.mapImage && data.mapImage.src ? (
                <img 
                  src={data.mapImage.src} 
                  alt={data.mapImage.alt || 'Bản đồ vị trí'} 
                  className={styles.mapImage}
                />
              ) : (
                <p>Ảnh bản đồ vị trí sẽ được hiển thị ở đây</p>
              )}
            </div>
            
            {/* Phần thời gian di chuyển */}
            <div className={styles.footerCharts}>
              {data.travelTimes?.items && data.travelTimes.items.map((item, index) => {
                // Tính phần trăm cho biểu đồ hình tròn dựa trên thời gian
                const timeStr = item.duration.split('-')[1] || item.duration;
                const minutes = parseInt(timeStr.match(/\d+/)[0], 10);
                // Chuyển đổi phút thành độ (360 độ = vòng tròn đầy đủ)
                const degrees = Math.min(360, (minutes / 45) * 360);
                
                // Default icons for common destinations
                let iconComponent = <FaClock />;
                if (item.destination.includes("Hà Nội")) {
                  iconComponent = <FaBuilding />;
                } else if (item.destination.includes("KCN")) {
                  iconComponent = <FaBuilding />;
                } else if (item.destination.includes("Sân bay")) {
                  iconComponent = <FaPlane />;
                } else if (item.destination.includes("Park") || item.destination.includes("thương mại")) {
                  iconComponent = <FaStore />;
                }
                
                return (
                  <div key={index} className={styles.donutChart}>
                    <div 
                      className={styles.donutChartContainer}
                      style={{
                        '--progress': `${degrees}deg`
                      }}
                    >
                      <div className={styles.donutHole}>
                        <div className={styles.donutIcon}>
                          {item.icon || iconComponent}
                        </div>
                      </div>
                    </div>
                    <div className={styles.chartLabel}>{item.destination}</div>
                    <div className={styles.chartTime}>{item.duration}</div>
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

export default Location;