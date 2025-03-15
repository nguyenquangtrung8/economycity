// src/hooks/useTabTransition.js
import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook xử lý hiệu ứng chuyển tab mượt mà với chức năng autoplay tích hợp
 * @param {Array} items - Mảng các tab/item
 * @param {number} initialTab - Index của tab được chọn mặc định
 * @param {number} transitionDuration - Thời gian chuyển tab (ms)
 * @param {boolean} autoplayEnabled - Bật/tắt autoplay
 * @param {number} autoplayInterval - Khoảng thời gian giữa các lần chuyển tab tự động (ms)
 * @returns {Object} - Các giá trị và phương thức để điều khiển tab
 */
export const useTabTransition = (
  items = [], 
  initialTab = 0, 
  transitionDuration = 300,
  autoplayEnabled = false,
  autoplayInterval = 5000
) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [prevActiveTab, setPrevActiveTab] = useState(initialTab);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState('next'); // 'next' hoặc 'prev'
  const [isMounted, setIsMounted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // Refs để quản lý timeouts và intervals
  const timeoutRef = useRef(null);
  const autoplayRef = useRef(null);
  const mountedRef = useRef(false); // Sử dụng ref để theo dõi mount state
  
  // Đánh dấu component đã mount
  useEffect(() => {
    setIsMounted(true);
    mountedRef.current = true;
    
    return () => {
      // Cleanup tất cả khi unmount
      setIsMounted(false);
      mountedRef.current = false;
      clearAllTimers();
    };
  }, []);
  
  // Hàm helper để clear tất cả timers
  const clearAllTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  // Xử lý chuyển tab - sử dụng useCallback để tối ưu
  const changeTab = useCallback((index) => {
    // Kiểm tra cả lower bound và upper bound
    if (index < 0 || index >= items.length || index === activeTab || isTransitioning) return;
    
    // Clear timeout cũ nếu có
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    setPrevActiveTab(activeTab);
    setDirection(index > activeTab ? 'next' : 'prev');
    setIsTransitioning(true);
    setActiveTab(index);
    
    // Đặt timeout để kết thúc hiệu ứng
    timeoutRef.current = setTimeout(() => {
      if (mountedRef.current) { // Sử dụng ref thay vì state để kiểm tra mounted
        setIsTransitioning(false);
      }
    }, transitionDuration);
    
    // Reset autoplay nếu đang bật
    resetAutoplay();
  }, [activeTab, isTransitioning, items.length, transitionDuration]);

  // Hàm chuyển đến tab tiếp theo
  const nextTab = useCallback(() => {
    const next = activeTab >= items.length - 1 ? 0 : activeTab + 1;
    changeTab(next);
  }, [activeTab, items.length, changeTab]);

  // Hàm chuyển đến tab trước đó
  const prevTab = useCallback(() => {
    const prev = activeTab <= 0 ? items.length - 1 : activeTab - 1;
    changeTab(prev);
  }, [activeTab, items.length, changeTab]);

  // Thiết lập lại autoplay - tránh sử dụng isMounted trong dependencies
  const resetAutoplay = useCallback(() => {
    if (!autoplayEnabled || isPaused || items.length <= 1) return;
    
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    
    autoplayRef.current = setInterval(() => {
      if (mountedRef.current && !isTransitioning) {
        nextTab();
      }
    }, autoplayInterval);
  }, [autoplayEnabled, autoplayInterval, isTransitioning, items.length, nextTab, isPaused]);

  // Bắt đầu/tạm dừng autoplay
  const pauseAutoPlay = useCallback(() => {
    setIsPaused(true);
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);
  
  const resumeAutoPlay = useCallback(() => {
    setIsPaused(false);
    if (autoplayEnabled) {
      resetAutoplay();
    }
  }, [autoplayEnabled, resetAutoplay]);

  // Setup autoplay khi component mount hoặc khi các dependencies thay đổi
  useEffect(() => {
    if (mountedRef.current && autoplayEnabled && !isPaused && items.length > 1) {
      resetAutoplay();
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [autoplayEnabled, isPaused, items.length, resetAutoplay]);

  return {
    activeTab,
    prevActiveTab,
    changeTab,
    nextTab,
    prevTab,
    isTransitioning,
    direction,
    transitionDuration,
    pauseAutoPlay,
    resumeAutoPlay,
    isPaused,
    isMounted
  };
};

export default useTabTransition;