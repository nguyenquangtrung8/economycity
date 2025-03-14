// src/hooks/useTabTransition.js
import { useState, useEffect, useRef } from 'react';

/**
 * Hook xử lý hiệu ứng chuyển tab mượt mà
 * @param {Array} tabs - Mảng các tab
 * @param {number} initialTab - Index của tab được chọn mặc định
 * @param {number} transitionDuration - Thời gian chuyển tab (ms)
 * @returns {Object} - Các giá trị và phương thức để điều khiển tab
 */
export const useTabTransition = (tabs = [], initialTab = 0, transitionDuration = 300) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [prevActiveTab, setPrevActiveTab] = useState(initialTab);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState('next'); // 'next' hoặc 'prev'
  const timeoutRef = useRef(null);
  
  // Kiểm tra xem có đang chạy trong browser hay không
  const isBrowser = typeof window !== 'undefined';

  // Xử lý chuyển tab
  const changeTab = (index) => {
    // Nếu không phải browser, hoặc tab không đổi, hoặc đang trong transition, không làm gì cả
    if (!isBrowser || index === activeTab || isTransitioning) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    setPrevActiveTab(activeTab);
    setDirection(index > activeTab ? 'next' : 'prev');
    setIsTransitioning(true);
    setActiveTab(index);
    
    // Đặt timeout để kết thúc hiệu ứng - chỉ trong browser
    timeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, transitionDuration);
  };

  // Cleanup timeout khi unmount
  useEffect(() => {
    return () => {
      if (isBrowser && timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isBrowser]);

  return {
    activeTab,
    prevActiveTab,
    changeTab,
    isTransitioning: isBrowser ? isTransitioning : false,
    direction,
    transitionDuration
  };
};

export default useTabTransition;