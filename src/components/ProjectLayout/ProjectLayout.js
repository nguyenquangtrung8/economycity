import React, { useState, useCallback, useRef, useEffect } from 'react';
import styles from './ProjectLayout.module.css';
import { projectLayoutData } from './ProjectLayoutData';

// Hàm định dạng tiền tệ
const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

// Hàm định dạng diện tích
const formatArea = (area) => {
  return area < 10000 ? `${area} m²` : `${area / 10000} ha`;
};

const ProjectLayout = () => {
  // State cho phân khu được chọn
  const [selectedZoneId, setSelectedZoneId] = useState(null);
  
  // Chế độ xem (overview/detail)
  const [viewMode, setViewMode] = useState('overview');
  
  // Zoom và pan
  const [zoomLevel, setZoomLevel] = useState(1);
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
  
  // Lấy phân khu đang được chọn
  const selectedZone = selectedZoneId 
    ? projectLayoutData.zones.find(zone => zone.id === selectedZoneId) 
    : null;
  
  // Handlers
  const handleZoneClick = useCallback((zoneId) => {
    setSelectedZoneId(zoneId);
    setViewMode('detail');
  }, []);
  
  const handleBackToOverview = useCallback(() => {
    setViewMode('overview');
  }, []);
  
  // Xử lý zoom
  const handleZoom = useCallback((increment) => {
    setZoomLevel(prevZoom => {
      const newZoom = prevZoom + increment;
      const clampedZoom = Math.max(0.8, Math.min(2.5, newZoom));
      
      // Hiển thị chỉ số zoom
      setShowZoomIndicator(true);
      clearTimeout(zoomIndicatorTimeout.current);
      zoomIndicatorTimeout.current = setTimeout(() => {
        setShowZoomIndicator(false);
      }, 1500);
      
      return clampedZoom;
    });
  }, []);
  
  const resetView = useCallback(() => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  }, []);
  
  // Tính khoảng cách giữa 2 ngón tay
  const calculateTouchDistance = useCallback((touches) => {
    return Math.hypot(
      touches[0].clientX - touches[1].clientX,
      touches[0].clientY - touches[1].clientY
    );
  }, []);
  
  // Mouse event handlers
  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return; // Only handle left mouse button
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - panPosition.x * zoomLevel,
      y: e.clientY - panPosition.y * zoomLevel
    });
    
    e.preventDefault();
  }, [panPosition, zoomLevel]);
  
  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    setPanPosition({
      x: (e.clientX - dragStart.x) / zoomLevel,
      y: (e.clientY - dragStart.y) / zoomLevel
    });
    
    e.preventDefault();
  }, [isDragging, dragStart, zoomLevel]);
  
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY * -0.01;
    handleZoom(delta);
  }, [handleZoom]);
  
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
        const rect = mapContainerRef.current.getBoundingClientRect();
        const x = (e.touches[0].clientX - rect.left) / zoomLevel;
        const y = (e.touches[0].clientY - rect.top) / zoomLevel;
        
        if (Math.abs(zoomLevel - 1) < 0.1) {
          setZoomLevel(1.8);
          setPanPosition({
            x: -x + (rect.width / 2 / 1.8),
            y: -y + (rect.height / 2 / 1.8)
          });
        } else {
          resetView();
        }
        
        e.preventDefault();
      }
      
      // Set up for pan
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - panPosition.x * zoomLevel,
        y: e.touches[0].clientY - panPosition.y * zoomLevel
      });
      
      setLastTap(currentTime);
    }
  }, [calculateTouchDistance, lastTap, zoomLevel, panPosition, resetView]);
  
  const handleTouchMove = useCallback((e) => {
    if (e.touches.length === 2 && touchDistance !== null) {
      // Pinch gesture - zoom
      const newDistance = calculateTouchDistance(e.touches);
      const deltaScale = (newDistance - touchDistance) * 0.01;
      setTouchDistance(newDistance);
      handleZoom(deltaScale);
      e.preventDefault();
    } else if (isDragging && e.touches.length === 1) {
      // Pan gesture
      setPanPosition({
        x: (e.touches[0].clientX - dragStart.x) / zoomLevel,
        y: (e.touches[0].clientY - dragStart.y) / zoomLevel
      });
      e.preventDefault();
    }
  }, [calculateTouchDistance, isDragging, dragStart, zoomLevel, touchDistance, handleZoom]);
  
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
  
  // Render zone status badge
  const renderZoneStatus = (status) => {
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
      <span className={`${styles.statusBadge} ${statusClass}`}>
        {statusText}
      </span>
    );
  };
  
  // Render product summary list
  const renderProductSummary = (products) => {
    if (!products || products.length === 0) {
      return <p className={styles.noProducts}>Chưa có thông tin sản phẩm</p>;
    }
    
    return (
      <div className={styles.productsSummary}>
        <h4 className={styles.sectionTitle}>Thông tin sản phẩm</h4>
        <ul className={styles.productsList}>
          {products.map((product, index) => (
            <li key={index} className={styles.productItem}>
              <div className={styles.productType}>{product.type}</div>
              <div className={styles.productDetails}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Số lượng:</span>
                  <span className={styles.detailValue}>{product.count} căn</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Diện tích:</span>
                  <span className={styles.detailValue}>
                    {product.areaRange[0]} - {product.areaRange[1]} m²
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Giá bán:</span>
                  <span className={styles.detailValue}>
                    {formatCurrency(product.priceRange[0])} - {formatCurrency(product.priceRange[1])}
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
    return (
      <div className={styles.overviewMode}>
        <h3 className={styles.sectionTitle}>Các phân khu dự án</h3>
        <div className={styles.zoneGrid}>
          {projectLayoutData.zones.map(zone => (
            <div 
              key={zone.id} 
              className={styles.zoneCard}
              onClick={() => handleZoneClick(zone.id)}
            >
              <div className={styles.zoneCardHeader}>
                <h4 className={styles.zoneName}>{zone.name}</h4>
                {renderZoneStatus(zone.status)}
              </div>
              <div className={styles.zoneCardBody}>
                <div className={styles.zoneInfo}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Diện tích:</span>
                    <span className={styles.infoValue}>{formatArea(zone.area)}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Mật độ xây dựng:</span>
                    <span className={styles.infoValue}>{zone.buildingDensity}%</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Số loại sản phẩm:</span>
                    <span className={styles.infoValue}>{zone.products.length}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Tổng số căn:</span>
                    <span className={styles.infoValue}>
                      {zone.products.reduce((total, product) => total + product.count, 0)}
                    </span>
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
            aria-label="Quay lại tổng quan"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Quay lại</span>
          </button>
          <h3 className={styles.detailTitle}>{selectedZone.name}</h3>
          {renderZoneStatus(selectedZone.status)}
        </div>
        
        <div className={styles.zoneImage}>
          <img 
            src={selectedZone.image} 
            alt={`Mặt bằng ${selectedZone.name}`} 
            loading="lazy"
          />
        </div>
        
        <div className={styles.zoneDescription}>
          <p>{selectedZone.description}</p>
        </div>
        
        <div className={styles.zoneInfo}>
          <div className={styles.infoGrid}>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Diện tích</span>
              <span className={styles.infoValue}>{formatArea(selectedZone.area)}</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Mật độ xây dựng</span>
              <span className={styles.infoValue}>{selectedZone.buildingDensity}%</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Tổng số căn</span>
              <span className={styles.infoValue}>
                {selectedZone.products.reduce((total, product) => total + product.count, 0)}
              </span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Loại sản phẩm</span>
              <span className={styles.infoValue}>{selectedZone.products.length} loại</span>
            </div>
          </div>
        </div>
        
        {renderProductSummary(selectedZone.products)}
      </div>
    );
  };
  
  // Render SVG Map
  const renderSvgMap = () => {
    // Get zone color based on status
    const getZoneColor = (status) => {
      switch (status) {
        case 'selling': return 'rgba(82, 183, 136, 0.7)'; // Green
        case 'coming-soon': return 'rgba(249, 199, 79, 0.7)'; // Yellow
        case 'sold-out': return 'rgba(108, 117, 125, 0.7)'; // Gray
        default: return 'rgba(173, 181, 189, 0.7)'; // Light gray
      }
    };
    
    // Calculate transform for zoom and pan
    const svgTransform = `scale(${zoomLevel}) translate(${panPosition.x}px, ${panPosition.y}px)`;
    
    return (
      <div className={styles.svgMapContainer}>
        <svg 
          viewBox={projectLayoutData.svgViewBox} 
          className={styles.projectMap}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background image */}
          <image 
            href={projectLayoutData.masterPlanImage} 
            width="100%" 
            height="100%" 
            preserveAspectRatio="xMidYMid meet"
          />
          
          <g transform={svgTransform}>
            {/* Render zones */}
            {projectLayoutData.zones.map((zone) => (
              <g key={zone.id}>
                <polygon
                  points={zone.coordinates.polygon}
                  fill={getZoneColor(zone.status)}
                  stroke={selectedZoneId === zone.id ? '#ffffff' : 'rgba(255,255,255,0.8)'}
                  strokeWidth={selectedZoneId === zone.id ? '3' : '1.5'}
                  className={styles.zonePolygon}
                  onClick={() => handleZoneClick(zone.id)}
                />
                
                {/* Zone label */}
                <text
                  x={zone.coordinates.labelPosition.x}
                  y={zone.coordinates.labelPosition.y}
                  className={styles.zoneLabel}
                  fill="#ffffff"
                  textAnchor="middle"
                >
                  {zone.name}
                </text>
              </g>
            ))}
            
            {/* Render amenities */}
            {Object.entries(projectLayoutData.amenities).map(([key, amenity]) => (
              <g key={key}>
                <polygon
                  points={amenity.coordinates.polygon}
                  className={styles.amenityPolygon}
                  fill={key === 'centralPlaza' ? 'rgba(144, 238, 144, 0.5)' : 
                       key === 'lake' ? 'rgba(173, 216, 230, 0.5)' : 'rgba(255, 222, 173, 0.5)'}
                  stroke="rgba(255,255,255,0.8)"
                  strokeWidth="1.5"
                  strokeDasharray="5,5"
                />
                
                {/* Amenity label */}
                <text
                  x={amenity.coordinates.labelPosition.x}
                  y={amenity.coordinates.labelPosition.y}
                  className={styles.amenityLabel}
                  fill="#ffffff"
                  textAnchor="middle"
                >
                  {key === 'centralPlaza' ? 'Quảng trường trung tâm' : 
                   key === 'lake' ? 'Hồ điều hòa' : key}
                </text>
              </g>
            ))}
          </g>
        </svg>
        
        {/* Zoom indicator */}
        {showZoomIndicator && (
          <div className={styles.zoomIndicator}>
            {Math.round(zoomLevel * 100)}%
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className={styles.projectLayoutContainer}>
      <div className={styles.projectLayoutHeader}>
        <h2 className={styles.projectTitle}>Mặt bằng tổng thể dự án</h2>
        <p className={styles.projectDescription}>
          Tổng diện tích {projectLayoutData.totalArea} ha với 4 phân khu chức năng, mật độ xây dựng thấp 
          và không gian xanh đa dạng
        </p>
      </div>
      
      <div className={styles.viewModeToggle}>
        <button 
          className={`${styles.viewModeButton} ${viewMode === 'overview' ? styles.activeMode : ''}`}
          onClick={() => setViewMode('overview')}
        >
          Tổng quan
        </button>
        <button 
          className={`${styles.viewModeButton} ${viewMode === 'detail' ? styles.activeMode : ''}`}
          onClick={() => setViewMode('detail')}
          disabled={!selectedZoneId}
        >
          Chi tiết
        </button>
      </div>
      
      <div className={styles.projectLayoutContent}>
        <div className={styles.mapView} ref={mapContainerRef}>
          {/* Map controls */}
          <div className={styles.mapControls}>
            <button 
              className={styles.zoomButton}
              onClick={() => handleZoom(0.1)}
              aria-label="Phóng to"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              className={styles.zoomButton}
              onClick={() => handleZoom(-0.1)}
              aria-label="Thu nhỏ"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              className={styles.resetButton}
              onClick={resetView}
              aria-label="Đặt lại kích thước"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 15L19 19M5 19L19 5M5 5L9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          {/* SVG Map */}
          {renderSvgMap()}
          
          {/* Map Legend */}
          <div className={styles.mapLegend}>
            <div className={styles.legendItem}>
              <span className={`${styles.legendColor} ${styles.colorSelling}`}></span>
              <span className={styles.legendText}>Đang mở bán</span>
            </div>
            <div className={styles.legendItem}>
              <span className={`${styles.legendColor} ${styles.colorComingSoon}`}></span>
              <span className={styles.legendText}>Sắp mở bán</span>
            </div>
            <div className={styles.legendItem}>
              <span className={`${styles.legendColor} ${styles.colorSoldOut}`}></span>
              <span className={styles.legendText}>Đã bán hết</span>
            </div>
          </div>
        </div>
        
        <div className={styles.infoPanel}>
          {viewMode === 'overview' ? renderOverviewMode() : renderDetailMode()}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProjectLayout);