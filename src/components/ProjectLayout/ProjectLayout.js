import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import styles from './ProjectLayout.module.css';
import { projectLayoutData } from './ProjectLayoutData';
// Import tất cả icon từ thư viện lucide-react
import { 
  Home, AreaChart, Building, Users, 
  Box, DollarSign, MapPin, FileText, Layers,
  ArrowLeft, RefreshCw, Tag, ChevronRight, LayoutGrid,
  Maximize2, SquareStack, Buildings, Globe
} from 'lucide-react';

/**
 * Kiểm tra và chuẩn hóa dữ liệu phân khu
 * @param {Object} zone - Dữ liệu phân khu
 * @returns {Object} Dữ liệu phân khu đã chuẩn hóa hoặc null
 */
const validateZoneData = (zone) => {
  if (!zone) return null;
  return {
    ...zone,
    products: Array.isArray(zone.products) ? zone.products : [],
    area: zone.area || 0,
    buildingDensity: zone.buildingDensity || 0,
    status: ['selling', 'coming-soon', 'sold-out'].includes(zone.status) 
      ? zone.status : 'unknown',
    name: zone.name || 'Phân khu không xác định',
    description: zone.description || 'Chưa có mô tả chi tiết cho phân khu này.'
  };
};

// Utilities
/**
 * Format số thành định dạng tiền Việt Nam (đơn vị tỷ)
 * @param {number} value - Giá trị cần format
 * @returns {string} Chuỗi đã được format
 */
const formatCurrency = (value) => {
  if (!value && value !== 0) return 'Đang cập nhật';
  
  // Chuyển đổi sang đơn vị tỷ (1 tỷ = 1,000,000,000)
  const billion = 1000000000;
  const valueInBillion = value / billion;
  
  // Format với 1 số thập phân và thêm đơn vị "Tỷ"
  return valueInBillion.toLocaleString('vi-VN', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }) + ' Tỷ';
};

/**
 * Format diện tích
 * @param {number} area - Diện tích (m²)
 * @returns {string} Chuỗi đã được format
 */
const formatArea = (area) => {
  if (!area && area !== 0) return 'Đang cập nhật';
  return area < 10000 ? `${area} m²` : `${area / 10000} ha`;
};

/**
 * Kiểm tra dữ liệu và trả về giá trị mặc định nếu cần
 * @param {Array} zones - Danh sách phân khu
 * @param {string} zoneId - ID phân khu cần tìm
 * @returns {Object} Phân khu đã được kiểm tra hoặc null
 */
const getSafeZoneData = (zones, zoneId) => {
  if (!zones || !Array.isArray(zones) || zones.length === 0) return null;
  const zone = zones.find(zone => zone.id === zoneId);
  return validateZoneData(zone);
};

/**
 * Tính tổng số sản phẩm
 * @param {Array} products - Danh sách sản phẩm
 * @returns {number} Tổng số sản phẩm
 */
const getProductCount = (products) => {
  if (!products || !Array.isArray(products) || products.length === 0) return 0;
  return products.reduce((total, product) => total + (product.count || 0), 0);
};

/**
 * Lấy danh sách các loại sản phẩm
 * @param {Array} products - Danh sách sản phẩm
 * @returns {string} Chuỗi các loại sản phẩm ngăn cách bởi dấu phẩy
 */
const getProductTypes = (products) => {
  if (!products || !Array.isArray(products) || products.length === 0) return 'Chưa có thông tin';
  return products.map(product => product.type).join(', ');
};

/**
 * Component hiển thị thông tin dự án dạng card
 * Đã cập nhật - bỏ secondaryIcon
 */
const ProjectInfoCard = ({ icon, title, value }) => {
  return (
    <div className={styles.infoCard}>
      <div className={styles.infoCardIcon}>
        {icon}
      </div>
      <div className={styles.infoCardContent}>
        <h4 className={styles.infoCardTitle}>{title}</h4>
        <p className={styles.infoCardValue}>{value}</p>
      </div>
    </div>
  );
};

/**
 * Component hiển thị thẻ trạng thái với icon
 */
const StatusBadge = ({ status }) => {
  if (!status) return null;
  
  let statusText = '';
  let statusClass = '';
  
  switch (status) {
    case 'selling':
      statusText = 'Đang mở bán';
      statusClass = styles.statusSelling;
      break;
    case 'coming-soon':
      statusText = 'Sắp mở bán';
      statusClass = styles.statusComingSoon;
      break;
    case 'sold-out':
      statusText = 'Đã bán hết';
      statusClass = styles.statusSoldOut;
      break;
    default:
      statusText = 'Chưa xác định';
      statusClass = styles.statusUnknown;
  }
  
  return (
    <span className={`${styles.statusBadge} ${statusClass}`} role="status">
      <Tag size={12} strokeWidth={2} className={styles.statusIcon} />
      {statusText}
    </span>
  );
};

// Component chính - sử dụng React.memo để tối ưu render
const ProjectLayout = React.memo(() => {
  // State cho phân khu được chọn
  const [selectedZoneId, setSelectedZoneId] = useState(null);
  
  // Chế độ xem (overview/detail)
  const [viewMode, setViewMode] = useState('overview');
  
  // Zoom và pan
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomCenter, setZoomCenter] = useState({ x: 0, y: 0 });
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Hiển thị chỉ số zoom
  const [showZoomIndicator, setShowZoomIndicator] = useState(false);
  const zoomIndicatorTimeout = useRef(null);
  
  // Touch states
  const [touchDistance, setTouchDistance] = useState(null);
  const [lastTap, setLastTap] = useState(0);
  
  // Refs
  const mapContainerRef = useRef(null);
  const mapImageRef = useRef(null);
  
  // Lấy phân khu đang được chọn với validation
  const selectedZone = useMemo(() => {
    return getSafeZoneData(projectLayoutData.zones, selectedZoneId);
  }, [selectedZoneId]);
  
  // Reset view và position khi chuyển đổi giữa overview và detail
  useEffect(() => {
    resetView();
  }, [viewMode, selectedZoneId]);
  
  // Áp dụng class tương ứng theo viewMode
  useEffect(() => {
    const contentElement = document.querySelector(`.${styles.projectLayoutContent}`);
    if (contentElement) {
      contentElement.className = `${styles.projectLayoutContent} ${styles[`viewMode-${viewMode}`]}`;
    }
  }, [viewMode]);
  
  // Xử lý zoom với biên độ ±10% mỗi bước và giới hạn ±50%
  const handleZoom = useCallback((increment, clientX, clientY) => {
    setZoomLevel(prevZoom => {
      // Tính biên độ zoom 10%
      const zoomStep = 0.1;
      // Giới hạn zoom trong khoảng 0.5 đến 1.5 (±50%)
      const newZoom = Math.max(0.5, Math.min(1.5, prevZoom + (increment * zoomStep)));
      
      // Cập nhật trung tâm zoom nếu có tọa độ chuột
      if (clientX !== undefined && clientY !== undefined && mapContainerRef.current) {
        const rect = mapContainerRef.current.getBoundingClientRect();
        setZoomCenter({
          x: (clientX - rect.left) / prevZoom - panPosition.x,
          y: (clientY - rect.top) / prevZoom - panPosition.y
        });
      }
      
      // Hiển thị chỉ số zoom
      setShowZoomIndicator(true);
      clearTimeout(zoomIndicatorTimeout.current);
      zoomIndicatorTimeout.current = setTimeout(() => {
        setShowZoomIndicator(false);
      }, 1500);
      
      return newZoom;
    });
  }, [panPosition]);

  // Xử lý thanh trượt zoom
  const handleSliderChange = useCallback((e) => {
    const newZoom = parseFloat(e.target.value);
    setZoomLevel(newZoom);
    
    // Hiển thị chỉ số zoom
    setShowZoomIndicator(true);
    clearTimeout(zoomIndicatorTimeout.current);
    zoomIndicatorTimeout.current = setTimeout(() => {
      setShowZoomIndicator(false);
    }, 1500);
  }, []);
  
  // Reset về trạng thái mặc định
  const resetView = useCallback(() => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setZoomCenter({ x: 0, y: 0 });
  }, []);
  
  // Tính khoảng cách giữa 2 ngón tay
  const calculateTouchDistance = useCallback((touches) => {
    if (!touches || touches.length < 2) return 0;
    return Math.hypot(
      touches[0].clientX - touches[1].clientX,
      touches[0].clientY - touches[1].clientY
    );
  }, []);

  // Lấy tọa độ trung tâm của touch
  const getTouchCenter = useCallback((touches) => {
    if (!touches || touches.length < 2 || !mapContainerRef.current) return null;
    
    const rect = mapContainerRef.current.getBoundingClientRect();
    const centerX = (touches[0].clientX + touches[1].clientX) / 2;
    const centerY = (touches[0].clientY + touches[1].clientY) / 2;
    
    return {
      x: (centerX - rect.left) / zoomLevel - panPosition.x,
      y: (centerY - rect.top) / zoomLevel - panPosition.y
    };
  }, [zoomLevel, panPosition]);
  
  // Mouse event handlers
  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return; // Chỉ xử lý chuột trái
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - panPosition.x,
      y: e.clientY - panPosition.y
    });
    
    e.preventDefault();
  }, [panPosition]);
  
  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    setPanPosition({
      x: (e.clientX - dragStart.x),
      y: (e.clientY - dragStart.y)
    });
    
    e.preventDefault();
  }, [isDragging, dragStart]);
  
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  // Xử lý wheel event để zoom - sử dụng biên độ ±10% mỗi bước
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    // Đảm bảo bước zoom là ±1 (sẽ nhân với 0.1 trong handleZoom)
    const delta = e.deltaY < 0 ? 1 : -1;
    handleZoom(delta, e.clientX, e.clientY);
  }, [handleZoom]);
  
  // Event Handlers
  const handleZoneClick = useCallback((zoneId) => {
    setSelectedZoneId(zoneId);
    setViewMode('detail');
  }, []);
  
  const handleBackToOverview = useCallback(() => {
    setViewMode('overview');
  }, []);
  
  // Xử lý double tap
  const handleDoubleTap = useCallback((e, currentTime) => {
    if (!mapContainerRef.current) return;
    
    const rect = mapContainerRef.current.getBoundingClientRect();
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    
    // Toggle giữa zoom 1.0 và 1.3
    if (Math.abs(zoomLevel - 1.0) < 0.1) {
      setZoomCenter({
        x: (touchX - rect.left) / zoomLevel - panPosition.x,
        y: (touchY - rect.top) / zoomLevel - panPosition.y
      });
      setZoomLevel(1.3);
    } else {
      resetView();
    }
    
    e.preventDefault();
  }, [zoomLevel, panPosition, resetView]);
  
  // Xử lý pinch gesture
  const handlePinchGesture = useCallback((e) => {
    const newDistance = calculateTouchDistance(e.touches);
    const MIN_TOUCH_DISTANCE = 50;
    
    if (touchDistance !== null && newDistance > MIN_TOUCH_DISTANCE) {
      // Tính toán biên độ zoom - tăng/giảm 10% mỗi 50px thay đổi
      const deltaScale = (newDistance - touchDistance) / 50;
      // Cập nhật tọa độ trung tâm cho zoom
      const center = getTouchCenter(e.touches);
      if (center) {
        setZoomCenter(center);
      }
      handleZoom(deltaScale);
    }
    
    setTouchDistance(newDistance);
    e.preventDefault();
  }, [calculateTouchDistance, touchDistance, handleZoom, getTouchCenter]);
  
  // Xử lý pan gesture
  const handlePanGesture = useCallback((e) => {
    if (!isDragging) return;
    
    setPanPosition({
      x: (e.touches[0].clientX - dragStart.x),
      y: (e.touches[0].clientY - dragStart.y)
    });
    
    e.preventDefault();
  }, [isDragging, dragStart]);
  
  // Touch event handlers
  const handleTouchStart = useCallback((e) => {
    const currentTime = new Date().getTime();
    const tapDelay = currentTime - lastTap;
    
    if (e.touches.length === 2) {
      // Pinch gesture
      setTouchDistance(calculateTouchDistance(e.touches));
    } else if (e.touches.length === 1) {
      // Check for double-tap
      if (tapDelay < 300 && tapDelay > 0) {
        handleDoubleTap(e, currentTime);
      }
      
      // Set up for pan
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - panPosition.x,
        y: e.touches[0].clientY - panPosition.y
      });
      
      setLastTap(currentTime);
    }
  }, [calculateTouchDistance, lastTap, panPosition, handleDoubleTap]);
  
  const handleTouchMove = useCallback((e) => {
    if (e.touches.length === 2) {
      // Pinch gesture - zoom
      handlePinchGesture(e);
    } else if (e.touches.length === 1) {
      // Pan gesture
      handlePanGesture(e);
    }
  }, [handlePinchGesture, handlePanGesture]);
  
  const handleTouchEnd = useCallback((e) => {
    if (e.touches.length < 2) {
      setTouchDistance(null);
    }
    if (e.touches.length === 0) {
      setIsDragging(false);
    }
  }, []);
  
  // Cleanup
  useEffect(() => {
    return () => {
      if (zoomIndicatorTimeout.current) {
        clearTimeout(zoomIndicatorTimeout.current);
      }
    };
  }, []);
  
  // Add event listeners
  useEffect(() => {
    const mapElement = mapContainerRef.current;
    if (!mapElement) return;
    
    // Add event listeners
    mapElement.addEventListener('wheel', handleWheel, { passive: false });
    mapElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    mapElement.addEventListener('touchstart', handleTouchStart);
    mapElement.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    
    // Cleanup
    return () => {
      mapElement.removeEventListener('wheel', handleWheel);
      mapElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      mapElement.removeEventListener('touchstart', handleTouchStart);
      mapElement.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [
    handleWheel, handleMouseDown, handleMouseMove, handleMouseUp,
    handleTouchStart, handleTouchMove, handleTouchEnd
  ]);
  
  // Render project summary cards
  const renderProjectSummary = () => {
    return (
      <div className={styles.infoCardsContainer}>
        <ProjectInfoCard 
          icon={<Maximize2 size={22} className={styles.infoIcon} />}
          title="Diện tích"
          value="9.5 ha"
        />
        <ProjectInfoCard 
          icon={<Building size={22} className={styles.infoIcon} />}
          title="Mật độ xây dựng"
          value="226%"
        />
        <ProjectInfoCard 
          icon={<Users size={22} className={styles.infoIcon} />}
          title="Tổng số căn"
          value="226"
        />
        <ProjectInfoCard 
          icon={<Home size={22} className={styles.infoIcon} />}
          title="Loại sản phẩm"
          value="Biệt thự, Liền kề"
        />
      </div>
    );
  };
  
  // Render product summary list
  const renderProductSummary = (products) => {
    if (!products || !Array.isArray(products) || products.length === 0) {
      return <p className={styles.noProducts}>Chưa có thông tin sản phẩm</p>;
    }
    
    return (
      <div className={styles.thongTinSanPham}>
        <div className={styles.productSectionHeader}>
          <Box size={24} strokeWidth={2} className={styles.sectionHeaderIcon} />
          <h4 className={styles.sectionTitle}>Thông tin sản phẩm</h4>
        </div>
        <ul className={styles.productsList}>
          {products.map((product, index) => (
            <li key={index} className={styles.productItem}>
              <div className={styles.productTypeHeader}>
                <Home size={24} strokeWidth={2} className={styles.productTypeIcon} />
                <span className={styles.productTypeName}>{product.type || 'Sản phẩm'}</span>
              </div>
              
              <div className={styles.productDetailsGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>
                    <Users size={16} strokeWidth={2} className={styles.detailIcon} />
                    Số lượng:
                  </span>
                  <span className={styles.detailValue}>
                    {product.count || 0} căn
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>
                    <AreaChart size={16} strokeWidth={2} className={styles.detailIcon} />
                    Diện tích xây dựng:
                  </span>
                  <span className={styles.detailValue}>
                    {product.buildingAreaRange ? `${product.buildingAreaRange[0]} - ${product.buildingAreaRange[1]}%` : '85 - 90%'}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>
                    <Layers size={16} strokeWidth={2} className={styles.detailIcon} />
                    Diện tích:
                  </span>
                  <span className={styles.detailValue}>
                    {product.areaRange && Array.isArray(product.areaRange) && product.areaRange.length >= 2 
                      ? `${product.areaRange[0]} - ${product.areaRange[1]} m²`
                      : 'Đang cập nhật'}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>
                    <DollarSign size={16} strokeWidth={2} className={styles.detailIcon} />
                    Giá bán:
                  </span>
                  <span className={styles.detailValue}>
                    {product.priceRange && Array.isArray(product.priceRange) && product.priceRange.length >= 2
                      ? `${formatCurrency(product.priceRange[0])} - ${formatCurrency(product.priceRange[1])}`
                      : 'Đang cập nhật'}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  // Render overview mode
  const renderOverviewMode = () => {
    const zones = projectLayoutData.zones || [];
    if (zones.length === 0) {
      return <div className={styles.noData}>Không có dữ liệu phân khu</div>;
    }
    
    return (
      <div className={styles.overviewMode}>
        <h3 className={styles.sectionTitle}>
          <LayoutGrid size={20} className={styles.titleIcon} />
          Các phân khu dự án
        </h3>
        
        {/* Thêm phần summary cards */}
        {renderProjectSummary()}
        
        <div className={styles.zoneGrid}>
          {zones.map(zone => (
            <div 
              key={zone.id} 
              className={styles.zoneCard}
              onClick={() => handleZoneClick(zone.id)}
              tabIndex={0}
              role="button"
              aria-label={`Xem chi tiết ${zone.name || 'phân khu'}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleZoneClick(zone.id);
                  e.preventDefault();
                }
              }}
            >
              <div className={styles.zoneCardHeader}>
                <h4 className={styles.zoneName}>{zone.name || 'Phân khu'}</h4>
                <StatusBadge status={zone.status} />
              </div>
              <div className={styles.zoneCardBody}>
                <div className={styles.zoneInfo}>
                  <div className={styles.infoItem} data-type="product-type">
                    <span className={styles.infoLabel} data-type="product-type">
                      <Home size={16} className={styles.infoItemIcon} />
                      Loại sản phẩm:
                    </span>
                    <span className={styles.infoValue}>{getProductTypes(zone.products)}</span>
                  </div>
                  <div className={styles.infoItem} data-type="product-count">
                    <span className={styles.infoLabel} data-type="product-count">
                      <Users size={16} className={styles.infoItemIcon} />
                      Tổng số căn:
                    </span>
                    <span className={styles.infoValue}>
                      {getProductCount(zone.products)}
                    </span>
                  </div>
                  <div className={styles.infoItem} data-type="area" data-mobile-hide="true">
                    <span className={styles.infoLabel} data-type="area">
                      <Maximize2 size={16} className={styles.infoItemIcon} />
                      Diện tích:
                    </span>
                    <span className={styles.infoValue}>{zone.area ? formatArea(zone.area) : 'Đang cập nhật'}</span>
                  </div>
                  <div className={styles.infoItem} data-type="density" data-mobile-hide="true">
                    <span className={styles.infoLabel} data-type="density">
                      <Building size={16} className={styles.infoItemIcon} />
                      Mật độ xây dựng:
                    </span>
                    <span className={styles.infoValue}>{zone.buildingDensity ? `${zone.buildingDensity}%` : 'Đang cập nhật'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Render detail mode
  const renderDetailMode = () => {
    if (!selectedZone) return null;
    
    return (
      <div className={styles.detailMode}>
        <div className={styles.detailHeader}>
          <button 
            className={styles.backButton}
            onClick={handleBackToOverview}
            aria-label="Quay lại tổng quan dự án"
          >
            <ArrowLeft size={20} strokeWidth={2} />
            <span>Quay lại</span>
          </button>
          <h3 className={styles.detailTitle}>{selectedZone.name || 'Chi tiết phân khu'}</h3>
          <StatusBadge status={selectedZone.status} />
        </div>
        
        <div className={styles.zoneDescription}>
          <FileText size={18} className={styles.descriptionIcon} />
          <p>{selectedZone.description || 'Chưa có mô tả chi tiết cho phân khu này.'}</p>
        </div>
        
        <div className={styles.infoGrid}>
          <div className={styles.infoBlock}>
            <span className={styles.infoLabel} data-type="area">
              <AreaChart size={16} className={styles.infoBlockIcon} />
              Diện tích
            </span>
            <span className={styles.infoValue}>{selectedZone.area ? formatArea(selectedZone.area) : 'Đang cập nhật'}</span>
          </div>
          <div className={styles.infoBlock}>
            <span className={styles.infoLabel} data-type="density">
              <Building size={16} className={styles.infoBlockIcon} />
              Mật độ xây dựng
            </span>
            <span className={styles.infoValue}>{selectedZone.buildingDensity ? `${selectedZone.buildingDensity}%` : 'Đang cập nhật'}</span>
          </div>
          <div className={styles.infoBlock}>
            <span className={styles.infoLabel} data-type="product-count">
              <Users size={16} className={styles.infoBlockIcon} />
              Tổng số căn
            </span>
            <span className={styles.infoValue}>
              {getProductCount(selectedZone.products)}
            </span>
          </div>
          <div className={styles.infoBlock}>
            <span className={styles.infoLabel} data-type="product-type">
              <Home size={16} className={styles.infoBlockIcon} />
              Loại sản phẩm
            </span>
            <span className={styles.infoValue}>
              {selectedZone.products && Array.isArray(selectedZone.products) && selectedZone.products.length > 0
                ? selectedZone.products.map(product => product.type).join(', ')
                : 'Chưa có thông tin'}
            </span>
          </div>
        </div>
        
        {renderProductSummary(selectedZone.products)}
      </div>
    );
  };
  
  // Render Map View
  const renderMapView = () => {
    // Tính toán transform
    const transformStyle = {
      transform: `scale(${zoomLevel}) translate(${panPosition.x}px, ${panPosition.y}px)`,
      transformOrigin: 'center center'
    };
    
    return (
      <div className={styles.svgMapContainer}>
        <div 
          className={styles.mapImage} 
          style={transformStyle}
          ref={mapImageRef}
        >
          {/* Khi ở chế độ chi tiết, hiển thị ảnh phân khu được chọn */}
          {viewMode === 'detail' && selectedZone ? (
            <img 
              src={selectedZone.image} 
              alt={`Mặt bằng ${selectedZone.name || 'phân khu'}`} 
              className={styles.mapImageContent}
              loading="lazy"
            />
          ) : (
            /* Khi ở chế độ tổng quan, hiển thị bản đồ tổng thể */
            <img 
              src={projectLayoutData.masterPlanImage} 
              alt="Mặt bằng tổng thể dự án" 
              className={styles.mapImageContent}
              loading="lazy"
            />
          )}
        </div>
        
        {/* Zoom slider tích hợp với nút reset */}
        <div className={styles.zoomSliderContainer}>
          <span className={styles.zoomValue}>{Math.round(zoomLevel * 100)}%</span>
          <input
            type="range"
            min="0.5"
            max="1.5"
            step="0.1"
            value={zoomLevel}
            onChange={handleSliderChange}
            className={styles.zoomSlider}
            aria-label="Điều chỉnh tỷ lệ zoom"
          />
          <button 
            className={styles.resetButton}
            onClick={resetView}
            aria-label="Đặt lại góc nhìn bản đồ"
          >
            <RefreshCw size={16} className={styles.resetIcon} />
          </button>
        </div>
        
        {/* Zoom indicator */}
        {showZoomIndicator && (
          <div className={styles.zoomIndicator} role="status" aria-live="polite">
            {Math.round(zoomLevel * 100)}%
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className={styles.projectLayoutContainer}>
      <div className={styles.projectLayoutHeader}>
        <h2 className={styles.projectTitle}>
          <MapPin size={24} className={styles.titleIcon} />
          Mặt bằng tổng thể dự án
        </h2>
        <p className={styles.projectDescription}>
          {projectLayoutData.metaDescription || `Tổng diện tích ${projectLayoutData.totalArea || 0} ha với ${projectLayoutData.zones ? projectLayoutData.zones.length : 0} phân khu chức năng, mật độ xây dựng thấp và không gian xanh đa dạng`}
        </p>
      </div>
      
      <div className={styles.viewModeToggle}>
        <button 
          className={`${styles.viewModeButton} ${viewMode === 'overview' ? styles.activeMode : ''}`}
          onClick={() => setViewMode('overview')}
          aria-label="Xem tổng quan dự án"
        >
          <LayoutGrid size={16} className={styles.buttonIcon} />
          Tổng quan
        </button>
        <button 
          className={`${styles.viewModeButton} ${viewMode === 'detail' ? styles.activeMode : ''}`}
          onClick={() => setViewMode('detail')}
          disabled={!selectedZoneId}
          aria-label="Xem chi tiết phân khu"
        >
          <Layers size={16} className={styles.buttonIcon} />
          Chi tiết
        </button>
      </div>
      
      <div className={styles.projectLayoutContent}>
        <div className={styles.mapView} ref={mapContainerRef}>
          {/* Render Map */}
          {renderMapView()}
        </div>
        
        <div className={styles.infoPanel}>
          {viewMode === 'overview' ? renderOverviewMode() : renderDetailMode()}
        </div>
      </div>
      
      {/* Nút CTA liên kết đến phần contact */}
      <div className={styles.ctaContainer}>
        <a href="#contact" className={styles.ctaButton}>
          <DollarSign size={20} className={styles.ctaIcon} />
          <span>Đăng ký tư vấn & bảng giá</span>
        </a>
      </div>
    </div>
  );
});

export default ProjectLayout;