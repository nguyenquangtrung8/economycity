// src/components/Location/Location.js
import React from 'react';
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

/**
 * Location Component - Hiển thị thông tin vị trí của dự án Economy City
 */
const Location = () => {
  // Sử dụng default data nếu locationData không tồn tại hoặc thiếu thuộc tính
  const data = {...defaultData, ...locationData};
  
  return (
    <section id="location" className={styles.location}>
      {/* Header section */}
      <div className={styles.headerContainer}>
        <div className={styles.tagWrapper}>
          <span className={styles.tag}>VỊ TRÍ CHIẾN LƯỢC</span>
        </div>
        <h2 className={styles.heading}>Trái Tim Thành Phố Tương Lai</h2>
      </div>

      {/* Main content */}
      <div className={styles.mainContentWrapper}>
        {/* Cột bên trái: Phần mô tả (đã được chuyển từ phần header) */}
        <div className={styles.leftColumn}>
          {/* Phần mô tả thay thế cho tab content */}
          <div className={styles.descriptionContent}>
            <p className={styles.magazineStyle}>
              <span className={styles.dropCap}>E</span><span className={styles.brandTitle}>conomy City</span> nằm tại trung tâm Như Quỳnh, Văn Lâm, Hưng Yên, đối diện Huyện ủy và UBND, sở hữu lợi thế kết nối vượt trội. Cách Hà Nội 20km, dự án kết nối qua cao tốc Hà Nội - Hải Phòng, Vành đai 3.5, Vành đai 4.
            </p>
            <p className={styles.magazineStyle}>
              Vị trí đắc địa mang lại tiện ích sống tối ưu và tiềm năng phát triển bền vững. Dự án hứa hẹn gia tăng giá trị vượt bậc, trở thành tâm điểm đầu tư khu vực phía Đông Hà Nội.
            </p>
            
            {/* Thêm một số điểm nổi bật về vị trí */}
            <div className={styles.highlightPoints}>
              <div className={styles.highlightItem}>
                <img src="/img/building.png" alt="Vị trí" className={styles.highlightIcon} />
                <span>Trung tâm thị trấn Như Quỳnh</span>
              </div>
              <div className={styles.highlightItem}>
                <img src="/img/road_ql.png" alt="Giao thông" className={styles.highlightIcon} />
                <span>Kết nối 3 tuyến đường & % cây cầu chính</span>
              </div>
              <div className={styles.highlightItem}>
                <img src="/img/factory.png" alt="Tiện ích" className={styles.highlightIcon} />
                <span>Tiếp giáp 8 KCN lớn</span>
              </div>
              <div className={styles.highlightItem}>
                <img src="/img/travel_1584861.png" alt="Di chuyển" className={styles.highlightIcon} />
                <span>20-25 phút về trung tâm Hà Nội</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cột bên phải: Video vị trí */}
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