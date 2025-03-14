// src/hooks/useTabTransition.js
import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook xử lý hiệu ứng chuyển tab mượt mà với chức năng autoplay tích hợp
 * @param {Array} tabs - Mảng các tab
 * @param {number} initialTab - Index của tab được chọn mặc định
 * @param {number} transitionDuration - Thời gian chuyển tab (ms)
 * @param {boolean} autoplayEnabled - Bật/tắt autoplay
 * @param {number} autoplayInterval - Khoảng thời gian giữa các lần chuyển tab tự động (ms)
 * @returns {Object} - Các giá trị và phương thức để điều khiển tab
 */
export const useTabTransition = (
  tabs = [], 
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
  
  // Refs để quản lý timeouts và intervals
  const timeoutRef = useRef(null);
  const autoplayRef = useRef(null);
  
  // Đánh dấu component đã mount
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
      // Đảm bảo cleanup khi unmount
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, []);

  // Xử lý chuyển tab - sử dụng useCallback để tối ưu
  const changeTab = useCallback((index) => {
    if (!isMounted || index === activeTab || isTransitioning || index >= tabs.length) return;
    
    // Clear timeout cũ nếu có
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    setPrevActiveTab(activeTab);
    setDirection(index > activeTab ? 'next' : 'prev');
    setIsTransitioning(true);
    setActiveTab(index);
    
    // Đặt timeout để kết thúc hiệu ứng
    timeoutRef.current = setTimeout(() => {
      if (isMounted) { // Chỉ update state nếu component vẫn mounted
        setIsTransitioning(false);
      }
    }, transitionDuration);
    
    // Reset autoplay nếu đang bật
    resetAutoplay();
  }, [activeTab, isTransitioning, isMounted, tabs.length, transitionDuration]);

  // Hàm chuyển đến tab tiếp theo
  const nextTab = useCallback(() => {
    const next = activeTab >= tabs.length - 1 ? 0 : activeTab + 1;
    changeTab(next);
  }, [activeTab, tabs.length, changeTab]);

  // Hàm chuyển đến tab trước đó
  const prevTab = useCallback(() => {
    const prev = activeTab <= 0 ? tabs.length - 1 : activeTab - 1;
    changeTab(prev);
  }, [activeTab, tabs.length, changeTab]);

  // Thiết lập lại autoplay
  const resetAutoplay = useCallback(() => {
    if (!autoplayEnabled || !isMounted || tabs.length <= 1) return;
    
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    
    autoplayRef.current = setInterval(() => {
      if (isMounted && !isTransitioning) {
        nextTab();
      }
    }, autoplayInterval);
  }, [autoplayEnabled, autoplayInterval, isMounted, isTransitioning, nextTab, tabs.length]);

  // Bắt đầu/dừng autoplay
  const startAutoplay = useCallback(() => {
    resetAutoplay();
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [resetAutoplay]);
  
  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  // Setup autoplay khi component mount nếu được bật
  useEffect(() => {
    if (isMounted && autoplayEnabled && tabs.length > 1) {
      resetAutoplay();
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isMounted, autoplayEnabled, tabs.length, resetAutoplay]);

  return {
    activeTab,
    prevActiveTab,
    changeTab,
    nextTab,
    prevTab,
    isTransitioning,
    direction,
    transitionDuration,
    startAutoplay,
    stopAutoplay,
    isMounted
  };
};

export default useTabTransition;