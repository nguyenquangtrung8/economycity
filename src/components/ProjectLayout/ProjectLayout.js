import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import styles from './ProjectLayout.module.css';
import { projectLayoutData, sellingLayoutData } from './ProjectLayoutData';
// Import tất cả icon từ thư viện lucide-react
import {
  Home, AreaChart, Building, Users,
  Box, DollarSign, MapPin, FileText, Layers,
  ArrowLeft, RefreshCw, Tag, ChevronRight, LayoutGrid,
  Maximize2, SquareStack, Buildings, Globe, ShoppingBag, 
  ZoomIn, ZoomOut, Eye, Calendar, Check, Phone
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
  // Assuming area is in m^2, convert to ha if >= 10000 m^2
  return area >= 10000 ? `${(area / 10000).toLocaleString('vi-VN')} ha` : `${area.toLocaleString('vi-VN')} m²`;
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
 * Lấy danh sách các loại sản phẩm unique (trimmed)
 * @param {Array} products - Danh sách sản phẩm
 * @returns {string} Chuỗi các loại sản phẩm unique, ngăn cách bởi dấu phẩy
 */
const getProductTypes = (products) => {
  if (!products || !Array.isArray(products) || products.length === 0) return 'Chưa có thông tin';
  
  // Trim whitespace, filter empty strings, then get unique types using Set
  const types = [...new Set(
    products
      .map(product => product.type?.trim()) // Trim whitespace
      .filter(Boolean) // Remove falsy values (null, undefined, empty strings)
  )];
  
  return types.length > 0 ? types.join(', ') : 'Chưa có thông tin';
};

/**
 * Component hiển thị thông tin dự án dạng card
 */
const ProjectInfoCard = ({ icon, title, value }) => {
  return (
    <div className={styles.infoCard}>
      {/* Icon is now optional or handled by CSS if needed */}
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
  
  // Tab hiện tại (entire/selling)
  const [activeTab, setActiveTab] = useState('entire');
  
  // State cho việc xem layout chi tiết
  const [showDetailLayout, setShowDetailLayout] = useState(false);
  const [detailLayoutTitle, setDetailLayoutTitle] = useState('');
  const [detailLayoutImage, setDetailLayoutImage] = useState('');

  // Zoom và pan
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [zoomCenter, setZoomCenter] = useState({ x: 0, y: 0 });

  // Hiển thị chỉ số zoom và thanh điều khiển
  const [showZoomIndicator, setShowZoomIndicator] = useState(false);
  const [showZoomControls, setShowZoomControls] = useState(false);
  const zoomIndicatorTimeout = useRef(null);
  const zoomControlsTimeout = useRef(null);

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

  // Lọc các phân khu đang mở bán
  const sellingZones = useMemo(() => {
    return projectLayoutData.zones
      .filter(zone => zone.status === 'selling')
      .map(zone => validateZoneData(zone));
  }, []);

  // Reset view và position khi chuyển đổi giữa overview và detail
  useEffect(() => {
    if (viewMode === 'overview' && selectedZoneId) {
      setSelectedZoneId(null);
    }
    resetView();
  }, [viewMode, selectedZoneId]);

  // Áp dụng class tương ứng theo viewMode
  useEffect(() => {
    const contentElement = document.querySelector(`.${styles.projectLayoutContent}`);
    if (contentElement) {
      contentElement.className = `${styles.projectLayoutContent} ${styles[`viewMode-${viewMode}`]}`;
    }
  }, [viewMode]);

  // Xử lý zoom với biên độ ±10% mỗi bước 
  const handleZoom = useCallback((increment, clientX, clientY) => {
    setZoomLevel(prevZoom => {
      const zoomStep = 0.1;
      const newZoom = Math.max(0.9, Math.min(6, prevZoom + (increment * zoomStep)));

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

      // Hiển thị thanh điều khiển zoom
      setShowZoomControls(true);
      clearTimeout(zoomControlsTimeout.current);
      zoomControlsTimeout.current = setTimeout(() => {
        if (newZoom === 1) {
          setShowZoomControls(false);
        }
      }, 3000);

      return newZoom;
    });
  }, [panPosition]);

  // Xử lý thanh trượt zoom
  const handleSliderChange = useCallback((e) => {
    const newZoom = parseFloat(e.target.value);
    setZoomLevel(newZoom);

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
    
    // Ẩn thanh điều khiển zoom sau khi reset
    clearTimeout(zoomControlsTimeout.current);
    zoomControlsTimeout.current = setTimeout(() => {
      setShowZoomControls(false);
    }, 1500);
  }, []);

  // Tính khoảng cách giữa 2 ngón tay
  const calculateTouchDistance = useCallback((touches) => {
    if (!touches || touches.length < 2) return 0;
    return Math.hypot(
      touches[0].clientX - touches[1].clientX,
      touches[0].clientY - touches[1].clientY
    );
  }, []);

  // Mouse event handlers
  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return;

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

    // Hiển thị thanh điều khiển zoom khi người dùng kéo ảnh
    if (zoomLevel !== 1) {
      setShowZoomControls(true);
      clearTimeout(zoomControlsTimeout.current);
      zoomControlsTimeout.current = setTimeout(() => {
        setShowZoomControls(false);
      }, 3000);
    }

    e.preventDefault();
  }, [isDragging, dragStart, zoomLevel]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Xử lý wheel event để zoom - sử dụng biên độ ±10% mỗi bước
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 1 : -1;
    handleZoom(delta, e.clientX, e.clientY);
  }, [handleZoom]);

  // Event Handlers
  const handleZoneClick = useCallback((zoneId) => {
    setSelectedZoneId(zoneId);
    setViewMode('detail');
  }, []);

  // Xử lý xem layout chi tiết
  const handleViewLayoutDetail = useCallback((e, zoneId) => {
    // Ngăn sự kiện nổi bọt để tránh kích hoạt ở container cha
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Viewing layout for zone:', zoneId);
    
    if (sellingLayoutData[zoneId] && sellingLayoutData[zoneId].detailLayoutImage) {
      // Lưu ảnh layout chi tiết vào state
      setDetailLayoutImage(sellingLayoutData[zoneId].detailLayoutImage);
      
      // Cập nhật tiêu đề cho layout chi tiết
      const zone = getSafeZoneData(projectLayoutData.zones, zoneId);
      setDetailLayoutTitle(`Mặt bằng chi tiết ${zone?.name || 'khu vực đang mở bán'}`);
      
      // Hiển thị layout chi tiết
      setShowDetailLayout(true);
      
      // Reset view để hiển thị đầy đủ layout chi tiết
      resetView();
    } else {
      console.error('Không tìm thấy ảnh layout chi tiết cho khu vực:', zoneId);
    }
  }, [resetView, projectLayoutData.zones, sellingLayoutData]);

  // Trở về chế độ xem bình thường (không phải layout chi tiết)
  const handleBackFromDetailLayout = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Tắt chế độ xem layout chi tiết
    setShowDetailLayout(false);
    
    // Reset view để quay về chế độ xem thông thường
    resetView();
  }, [resetView]);

  const handleBackToOverview = useCallback(() => {
    // Nếu đang xem layout chi tiết, trở về chế độ bình thường trước
    if (showDetailLayout) {
      setShowDetailLayout(false);
      return;
    }
    
    // Quay lại overview
    setViewMode('overview');
    setSelectedZoneId(null);
    
    // Reset view để hiển thị đúng
    resetView();
  }, [showDetailLayout, resetView]);

  // Chuyển tab
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setViewMode('overview');
    setSelectedZoneId(null);
    setShowDetailLayout(false);
    resetView();
  }, [resetView]);

  // Xử lý double tap
  const handleDoubleTap = useCallback((e, currentTime) => {
    if (!mapContainerRef.current) return;

    const rect = mapContainerRef.current.getBoundingClientRect();
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;

    if (Math.abs(zoomLevel - 1.0) < 0.1) {
      setZoomLevel(1.3);
      
      // Hiển thị thanh điều khiển zoom
      setShowZoomControls(true);
    } else {
      resetView();
    }

    e.preventDefault();
  }, [zoomLevel, resetView]);

  // Xử lý pinch gesture
  const handlePinchGesture = useCallback((e) => {
    const newDistance = calculateTouchDistance(e.touches);
    const MIN_TOUCH_DISTANCE = 50;

    if (touchDistance !== null && newDistance > MIN_TOUCH_DISTANCE) {
      const deltaScale = (newDistance - touchDistance) / 50;
      handleZoom(deltaScale);
    }

    setTouchDistance(newDistance);
    e.preventDefault();
  }, [calculateTouchDistance, touchDistance, handleZoom]);

  // Xử lý pan gesture
  const handlePanGesture = useCallback((e) => {
    if (!isDragging) return;

    setPanPosition({
      x: (e.touches[0].clientX - dragStart.x),
      y: (e.touches[0].clientY - dragStart.y)
    });

    // Hiển thị thanh điều khiển zoom khi người dùng kéo ảnh
    if (zoomLevel !== 1) {
      setShowZoomControls(true);
      clearTimeout(zoomControlsTimeout.current);
      zoomControlsTimeout.current = setTimeout(() => {
        setShowZoomControls(false);
      }, 3000);
    }

    e.preventDefault();
  }, [isDragging, dragStart, zoomLevel]);

  // Touch event handlers
  const handleTouchStart = useCallback((e) => {
    const currentTime = new Date().getTime();
    const tapDelay = currentTime - lastTap;

    if (e.touches.length === 2) {
      setTouchDistance(calculateTouchDistance(e.touches));
    } else if (e.touches.length === 1) {
      if (tapDelay < 300 && tapDelay > 0) {
        handleDoubleTap(e, currentTime);
      }
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
      handlePinchGesture(e);
    } else if (e.touches.length === 1) {
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
      if (zoomControlsTimeout.current) {
        clearTimeout(zoomControlsTimeout.current);
      }
    };
  }, []);

  // Add event listeners
  useEffect(() => {
    const mapElement = mapContainerRef.current;
    if (!mapElement) return;

    mapElement.addEventListener('wheel', handleWheel, { passive: false });
    mapElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    mapElement.addEventListener('touchstart', handleTouchStart);
    mapElement.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

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

  // Render project summary cards - Sử dụng dữ liệu từ file data
  const renderProjectSummary = () => {
    // Sử dụng giá trị trực tiếp từ projectLayoutData thay vì tính toán
    const totalArea = projectLayoutData.totalArea || 0;
    const totalUnits = projectLayoutData.totalBuildingDensity || 0; // Sử dụng totalBuildingDensity từ data
    const overallDensity = projectLayoutData.overallBuildingDensity || 0; // Mật độ xây dựng lấy từ data

    // Tổng hợp các loại sản phẩm duy nhất từ tất cả các phân khu
    const allProductTypes = projectLayoutData.zones?.flatMap(zone =>
        zone.products?.map(p => p.type?.trim()).filter(Boolean) || [] // Trim và lọc
    ) || [];
    
    // Sử dụng Set để lấy giá trị duy nhất và tránh trùng lặp
    const uniqueProductTypes = [...new Set(allProductTypes)];
    const productTypesString = uniqueProductTypes.length > 0 ? uniqueProductTypes.join(', ') : 'N/A';

    return (
      <div className={styles.infoCardsContainer}>
        <ProjectInfoCard
          title="Diện tích"
          value={formatArea(totalArea) || 'Đang cập nhật'}
        />
        <ProjectInfoCard
          title="Mật độ xây dựng"
          value={overallDensity ? `${overallDensity}%` : 'Đang cập nhật'}
        />
        <ProjectInfoCard
          title="Tổng số căn"
          value={totalUnits.toString()}
        />
        <ProjectInfoCard
          title="Loại sản phẩm"
          value={productTypesString}
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

  // Render zone cards for a given list of zones
  const renderZoneCards = (zones) => {
    if (!zones || zones.length === 0) {
      return <div className={styles.noData}>Không có dữ liệu phân khu</div>;
    }

    return (
      <div className={styles.zoneGrid}>
        {zones.map(zone => {
          const validZone = validateZoneData(zone);
          if (!validZone) return null;

          return (
            <div
              key={validZone.id}
              className={styles.zoneCard}
              onClick={() => handleZoneClick(validZone.id)}
              tabIndex={0}
              role="button"
              aria-label={`Xem chi tiết ${validZone.name}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleZoneClick(validZone.id);
                  e.preventDefault();
                }
              }}
            >
              <div className={styles.zoneCardHeader}>
                <h4 className={styles.zoneName}>{validZone.name}</h4>
                <StatusBadge status={validZone.status} />
              </div>
              <div className={styles.zoneCardBody}>
                <div className={styles.zoneInfo}>
                  <div className={styles.infoItem} data-type="product-type">
                    <span className={styles.infoLabel} data-type="product-type">
                      <Home size={16} className={styles.infoItemIcon} />
                      Loại sản phẩm:
                    </span>
                    <span className={styles.infoValue}>{getProductTypes(validZone.products)}</span>
                  </div>
                  <div className={styles.infoItem} data-type="product-count">
                    <span className={styles.infoLabel} data-type="product-count">
                      <Users size={16} className={styles.infoItemIcon} />
                      Tổng số căn:
                    </span>
                    <span className={styles.infoValue}>
                      {getProductCount(validZone.products)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Render tab "Toàn dự án"
  const renderEntireProjectTab = () => {
    const zones = projectLayoutData.zones || [];
    
    return (
      <div className={styles.tabContent}>
        <h3 className={styles.sectionTitle}>
          <LayoutGrid size={20} className={styles.titleIcon} />
          Các phân khu dự án
        </h3>

        {/* Render overall project summary cards */}
        {renderProjectSummary()}

        {/* Render zone cards */}
        {renderZoneCards(zones)}
      </div>
    );
  };

  // Render các dãy nhà đang bán trong phân khu
  const renderSellingAreas = (zoneId) => {
    const zoneDetails = sellingLayoutData[zoneId];
    if (!zoneDetails || !Array.isArray(zoneDetails.sellingAreas) || zoneDetails.sellingAreas.length === 0) {
      return <div className={styles.noData}>Không có thông tin về các dãy nhà đang bán trong phân khu này</div>;
    }

    return (
      <div className={styles.sellingAreasContainer}>
        {zoneDetails.sellingAreas.map((area, index) => (
          <div key={index} className={styles.sellingAreaCard}>
            <div className={styles.sellingAreaHeader}>
              <h4 className={styles.sellingAreaName}>{area.name}</h4>
              <div className={styles.availabilityTag}>
                <span className={styles.availabilityCount}>{area.availableCount}</span>
                <span className={styles.availabilityLabel}>/{area.totalCount} căn còn trống</span>
              </div>
            </div>
            <div className={styles.sellingAreaBody}>
              <p className={styles.sellingAreaDescription}>{area.description}</p>
              <div className={styles.sellingAreaInfo}>
                <div className={styles.sellingInfoItem}>
                  <span className={styles.sellingInfoLabel}>
                    <DollarSign size={16} className={styles.sellingInfoIcon} />
                    Giá bán
                  </span>
                  <span className={styles.sellingInfoValue}>
                    {area.priceRange 
                      ? `${formatCurrency(area.priceRange[0])} - ${formatCurrency(area.priceRange[1])}` 
                      : 'Đang cập nhật'}
                  </span>
                </div>
                <div className={styles.sellingInfoItem}>
                  <span className={styles.sellingInfoLabel}>
                    <Calendar size={16} className={styles.sellingInfoIcon} />
                    Thanh toán
                  </span>
                  <span className={styles.sellingInfoValue}>
                    Linh hoạt theo tiến độ
                  </span>
                </div>
                <div className={styles.sellingInfoItem}>
                  <span className={styles.sellingInfoLabel}>
                    <Check size={16} className={styles.sellingInfoIcon} />
                    Pháp lý
                  </span>
                  <span className={styles.sellingInfoValue}>
                    Sổ đỏ lâu dài
                  </span>
                </div>
                <div className={styles.sellingInfoItem}>
                  <span className={styles.sellingInfoLabel}>
                    <Building size={16} className={styles.sellingInfoIcon} />
                    Loại sản phẩm
                  </span>
                  <span className={styles.sellingInfoValue}>
                    {area.productType || 'Liền kề/Biệt thự'}
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.sellingAreaFooter}>
              <a href="#contact" className={styles.contactButton}>
                <Phone size={16} className={styles.contactIcon} /> 
                Nhận thông tin chi tiết
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render chi tiết phân khu đang bán
  const renderSellingZoneDetail = () => {
    if (!selectedZone) return null;
    const zoneDetails = sellingLayoutData[selectedZoneId];
    
    return (
      <div className={styles.sellingZoneDetailContainer}>
        <div className={styles.detailHeader}>
          <button
            className={styles.backButton}
            onClick={handleBackToOverview}
            aria-label="Quay lại danh sách phân khu đang bán"
          >
            <ArrowLeft size={20} strokeWidth={2} className={styles.backIcon} />
            <span>Quay lại</span>
          </button>
          <h3 className={styles.detailTitle}>{selectedZone.name}</h3>
          <StatusBadge status={selectedZone.status} />
        </div>

        <div className={styles.zoneDescription}>
          <FileText size={18} className={styles.descriptionIcon} />
          <p>{selectedZone.description}</p>
        </div>

        <div className={styles.infoGrid}>
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
              {getProductTypes(selectedZone.products)}
            </span>
          </div>
        </div>
        
        <h4 className={styles.sellingAreasTitle}>
          <LayoutGrid size={18} className={styles.titleIcon} />
          Các dãy nhà đang mở bán
        </h4>
        
        {renderSellingAreas(selectedZoneId)}
      </div>
    );
  };

  // Tính tổng số dãy nhà đang bán
  const getTotalSellingAreas = () => {
    return sellingZones.reduce((total, zone) => {
      const zoneDetails = sellingLayoutData[zone.id];
      if (zoneDetails && Array.isArray(zoneDetails.sellingAreas)) {
        return total + zoneDetails.sellingAreas.length;
      }
      return total;
    }, 0);
  };

  // Tính tổng số căn còn trống
  const getTotalAvailableUnits = () => {
    return sellingZones.reduce((total, zone) => {
      const zoneDetails = sellingLayoutData[zone.id];
      if (zoneDetails && Array.isArray(zoneDetails.sellingAreas)) {
        return total + zoneDetails.sellingAreas.reduce((sum, area) => sum + area.availableCount, 0);
      }
      return total;
    }, 0);
  };

  // Render tab "Đang mở bán"
  const renderSellingTab = () => {
    if (viewMode === 'detail' && selectedZoneId) {
      return renderSellingZoneDetail();
    }
    
    return (
      <div className={styles.tabContent}>
        <h3 className={styles.sectionTitle}>
          <ShoppingBag size={20} className={styles.titleIcon} />
          Các phân khu đang mở bán
        </h3>

        {/* Hiển thị số khu đang mở bán */}
        <div className={styles.sellingInfoBox}>
          <p>Hiện tại có <strong>{sellingZones.length}</strong> phân khu đang mở bán với <strong>{getTotalSellingAreas()}</strong> dãy nhà và tổng cộng <strong>{getTotalAvailableUnits()}</strong> căn còn trống</p>
        </div>

        {/* Render các phân khu đang mở bán */}
        {renderZoneCards(sellingZones)}
      </div>
    );
  };

  // Render detail mode
  const renderDetailMode = () => {
    if (!selectedZone) return null;
    
    // Nếu đang ở tab "Đang mở bán", sử dụng view chi tiết đặc biệt
    if (activeTab === 'selling') {
      return renderSellingZoneDetail();
    }

    return (
      <div className={styles.detailMode}>
        <div className={styles.detailHeader}>
          <button
            className={styles.backButton}
            onClick={handleBackToOverview}
            aria-label="Quay lại tổng quan dự án"
          >
            <ArrowLeft size={18} strokeWidth={2.5} className={styles.backIcon} />
            <span>Quay lại</span>
          </button>
          <h3 className={styles.detailTitle}>{selectedZone.name}</h3>
          <StatusBadge status={selectedZone.status} />
        </div>

        <div className={styles.zoneDescription}>
          <FileText size={18} className={styles.descriptionIcon} />
          <p>{selectedZone.description}</p>
        </div>

        <div className={styles.infoGrid}>
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
              {getProductTypes(selectedZone.products)}
            </span>
          </div>
        </div>

        {renderProductSummary(selectedZone.products)}
      </div>
    );
  };

  // Render Tab Interface
  const renderTabInterface = () => {
    return (
      <div className={styles.tabsContainer}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'entire' ? styles.activeTab : ''}`}
          onClick={() => handleTabChange('entire')}
          aria-selected={activeTab === 'entire'}
          aria-controls="entireTabPanel"
          id="entireTab"
          role="tab"
        >
          <Globe size={16} className={styles.tabIcon} />
          Toàn dự án
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'selling' ? styles.activeTab : ''}`}
          onClick={() => handleTabChange('selling')}
          aria-selected={activeTab === 'selling'}
          aria-controls="sellingTabPanel"
          id="sellingTab"
          role="tab"
        >
          <ShoppingBag size={16} className={styles.tabIcon} />
          Đang mở bán {getTotalSellingAreas() > 0 && <span className={styles.countBadge}>{getTotalSellingAreas()}</span>}
        </button>
      </div>
    );
  };

  // Render Map View
  const renderMapView = () => {
    // Mặc định transform style từ zoom/pan
    const transformStyle = {
      transform: `scale(${zoomLevel}) translate(${panPosition.x}px, ${panPosition.y}px)`,
      transformOrigin: `${zoomCenter.x}px ${zoomCenter.y}px` // Sử dụng zoomCenter
    };

    // Quyết định ảnh hiển thị
    let imageSrc, imageAlt;
    
    // Ưu tiên hiển thị layout chi tiết nếu đang ở chế độ này
    if (showDetailLayout) {
      // Nếu đang ở chế độ xem chi tiết layout, sử dụng ảnh layout chi tiết
      if (detailLayoutImage) {
        imageSrc = detailLayoutImage;
        imageAlt = detailLayoutTitle || 'Mặt bằng chi tiết khu vực đang mở bán';
      } 
      // Fallback nếu không có ảnh trong state
      else if (selectedZoneId && sellingLayoutData[selectedZoneId]?.detailLayoutImage) {
        imageSrc = sellingLayoutData[selectedZoneId].detailLayoutImage;
        imageAlt = `Mặt bằng chi tiết ${selectedZone?.name || ''}`;
      }
      // Fallback cuối cùng
      else {
        imageSrc = projectLayoutData.masterPlanImage;
        imageAlt = 'Mặt bằng tổng thể dự án';
      }
    }
    // Nếu đang ở chế độ xem chi tiết, hiển thị ảnh của phân khu
    else if (viewMode === 'detail' && selectedZone) {
      imageSrc = selectedZone.image || projectLayoutData.masterPlanImage;
      imageAlt = `Mặt bằng ${selectedZone.name}`;
    }
    // Mặc định: hiển thị bản đồ tổng thể
    else {
      imageSrc = projectLayoutData.masterPlanImage;
      imageAlt = 'Mặt bằng tổng thể dự án';
    }

    return (
      <div className={styles.svgMapContainer}>
        {/* Thanh công cụ khi xem layout chi tiết */}
        {showDetailLayout && (
          <div className={styles.detailLayoutToolbar}>
            <div className={styles.detailLayoutTitle}>{detailLayoutTitle}</div>
            <button 
              className={styles.backFromDetailButton}
              onClick={handleBackFromDetailLayout}
              aria-label="Quay lại chế độ xem bình thường"
            >
              <ArrowLeft size={16} />
              <span>Quay lại</span>
            </button>
          </div>
        )}
        
        <div
          className={styles.mapImage}
          style={transformStyle}
          ref={mapImageRef}
        >
           <img
              src={imageSrc}
              alt={imageAlt}
              className={`${styles.mapImageContent} ${showDetailLayout ? styles.detailLayoutMode : ''}`}
              loading="lazy"
            />
        </div>

        {showZoomControls && (
          <div className={styles.zoomSliderContainer}>
            <span className={styles.zoomValue}>{Math.round(zoomLevel * 100)}%</span>
            <input
              type="range"
              min="0.95"
              max="6"
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
        )}

        {showZoomIndicator && (
          <div className={styles.zoomIndicator} role="status" aria-live="polite">
            {Math.round(zoomLevel * 100)}%
          </div>
        )}
      </div>
    );
  };

  // Main component render
  return (
    <div className={styles.projectLayoutContainer}>
      <div className={styles.projectLayoutHeader}>
        <h2 className={styles.projectTitle}>
          <MapPin size={24} className={styles.titleIcon} />
          Mặt bằng tổng thể dự án
        </h2>
        <p className={styles.projectDescription}>
          {projectLayoutData.metaDescription || `Tổng diện tích ${formatArea(projectLayoutData.totalArea || 0)}, ${projectLayoutData.zones ? projectLayoutData.zones.length : 0} phân khu chức năng.`}
        </p>
      </div>

      {/* Tab Interface */}
      {renderTabInterface()}

      <div className={styles.projectLayoutContent}>
        <div className={styles.mapView} ref={mapContainerRef}>
          {renderMapView()}
        </div>

        <div className={styles.infoPanel}>
          {activeTab === 'entire' 
            ? (viewMode === 'overview' ? renderEntireProjectTab() : renderDetailMode())
            : (viewMode === 'overview' ? renderSellingTab() : renderDetailMode())
          }
        </div>
      </div>

      <div className={styles.ctaContainer}>
        <a href="#contact" className={styles.ctaButton}>
          <span>Đăng ký tư vấn & bảng giá</span>
        </a>
      </div>
    </div>
  );
});

export default ProjectLayout;