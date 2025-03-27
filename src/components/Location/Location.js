import React, { useState, useEffect } from 'react';
import styles from './Location.module.css';
import { locationData } from './LocationData';

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

// Custom icon mapping for better UI
const getIconByType = (type, text) => {
  // Nội khu
  if (type === 'under1km') {
    if (text.includes('Clubhouse')) {
      return <img src="https://cdn-icons-png.flaticon.com/512/1998/1998621.png" alt="Clubhouse" />;
    } else if (text.includes('Quảng trường')) {
      return <img src="https://cdn-icons-png.flaticon.com/512/2947/2947808.png" alt="Quảng trường" />;
    } else if (text.includes('Trường') || text.includes('mầm non')) {
      return <img src="https://cdn-icons-png.flaticon.com/512/1998/1998621.png" alt="Trường học" />;
    } else if (text.includes('Công viên') || text.includes('cây xanh')) {
      return <img src="https://cdn-icons-png.flaticon.com/512/3069/3069033.png" alt="Công viên" />;
    } else if (text.includes('Hồ') || text.includes('điều hòa')) {
      return <img src="https://cdn-icons-png.flaticon.com/512/1135/1135560.png" alt="Hồ điều hòa" />;
    } else if (text.includes('thể thao')) {
      return <img src="https://cdn-icons-png.flaticon.com/512/2947/2947808.png" alt="Khu thể thao" />;
    }
  }
  // Ngoại khu
  else if (type === 'under5km') {
    if (text.includes('UBND') || text.includes('Ủy ban')) {
      return <img src="https://cdn-icons-png.flaticon.com/512/1998/1998621.png" alt="UBND" />;
    } else if (text.includes('TTTM') || text.includes('thương mại')) {
      return <img src="https://cdn-icons-png.flaticon.com/512/2947/2947808.png" alt="TTTM" />;
    } else if (text.includes('KCN') || text.includes('công nghiệp')) {
      return <img src="https://cdn-icons-png.flaticon.com/512/3069/3069033.png" alt="KCN" />;
    } else if (text.includes('Bệnh viện') || text.includes('Y tế')) {
      return <img src="https://cdn-icons-png.flaticon.com/512/1998/1998621.png" alt="Bệnh viện" />;
    }
  }
  // Giao thông
  else if (type === 'transport') {
    if (text.includes('Quốc lộ')) {
      return <img src="https://cdn-icons-png.flaticon.com/512/1998/1998621.png" alt="Quốc lộ" />;
    } else if (text.includes('Vành đai')) {
      return <img src="https://cdn-icons-png.flaticon.com/512/2947/2947808.png" alt="Vành đai" />;
    } else if (text.includes('Đường sắt')) {
      return <img src="https://cdn-icons-png.flaticon.com/512/1135/1135560.png" alt="Đường sắt" />;
    } else if (text.includes('Cao tốc')) {
      return <img src="https://cdn-icons-png.flaticon.com/512/2947/2947808.png" alt="Cao tốc" />;
    }
  }
  
  // Default icon nếu không có icon phù hợp
  return <img src="https://cdn-icons-png.flaticon.com/512/1946/1946488.png" alt="Location" />;
};

// Travel time icons
const getTravelTimeIcon = (destination) => {
  if (destination.includes("Hà Nội")) {
    return <div className={styles.donutIcon}>🏙️</div>;
  } else if (destination.includes("KCN") || destination.includes("công nghiệp")) {
    return <div className={styles.donutIcon}>🏭</div>;
  } else if (destination.includes("Sân bay")) {
    return <div className={styles.donutIcon}>✈️</div>;
  } else if (destination.includes("Park") || destination.includes("thương mại")) {
    return <div className={styles.donutIcon}>🌊</div>;
  }
  
  // Default icon
  return <div className={styles.donutIcon}>🕒</div>;
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
          <h2 className={styles.sectionTitleWithLine}>Kết nối đa chiều, thuận tiện di chuyển</h2>
          
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
                    {getIconByType(tabMapping[group.title], group.title === 'Tiện ích nội khu' ? 'Clubhouse' : 
                                  group.title === 'Tiện ích ngoại khu' ? 'UBND' : 'Quốc lộ')}
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
                    {getIconByType(currentTabType, item.text)}
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
              
              return (
                <div key={index} className={styles.donutChart}>
                  <div 
                    className={styles.donutChartContainer}
                    style={{
                      '--progress': `${degrees}deg`
                    }}
                  >
                    <div className={styles.donutHole}>
                      {getTravelTimeIcon(item.destination)}
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

      {/* Nút CTA ở cuối component, thay thế đường gạch ngang */}
      <div className={styles.footerCtaContainer}>
        <a href="#contact" className={styles.footerButton}>Tìm hiểu thêm</a>
      </div>
    </section>
  );
};

export default Location;