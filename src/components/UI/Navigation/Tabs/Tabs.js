// src/components/UI/Navigation/Tabs/Tabs.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import clsx from 'clsx'; // Thư viện quản lý class name
import styles from './Tabs.module.css';

/**
 * Tabs Component - Tab content với animation
 * @param {Array} tabs - Mảng các tab (mỗi tab có các thuộc tính: key, label, content, icon, disabled)
 * @param {string} activeKey - Key của tab đang active
 * @param {Function} onChange - Handler khi chuyển tab
 * @param {string} position - Vị trí của tabs (top, left, bottom, right)
 * @param {string} variant - Biến thể (default, card, line)
 * @param {string} className - Class bổ sung từ bên ngoài
 * @param {string} tabListClassName - Class bổ sung cho tab list
 * @param {string} tabPanelClassName - Class bổ sung cho tab panel
 * @param {boolean} lazyLoad - Chỉ load nội dung khi tab được active
 */
const Tabs = ({
  tabs = [],
  activeKey,
  onChange,
  position = 'top',
  variant = 'default',
  className = '',
  tabListClassName = '',
  tabPanelClassName = '',
  lazyLoad = false,
  ...rest
}) => {
  // State và refs
  const [currentTab, setCurrentTab] = useState(() => activeKey || (tabs[0] && tabs[0].key));
  const [previousTab, setPreviousTab] = useState(null);
  const [loadedTabs, setLoadedTabs] = useState(() => new Set(lazyLoad ? [currentTab] : tabs.map(tab => tab.key)));
  const [transitionDirection, setTransitionDirection] = useState('next');
  const tabsRef = useRef({});
  const listRef = useRef(null);
  const indicatorRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const panelRefs = useRef({});

  // Kiểm tra nếu không có tab nào
  if (!tabs || tabs.length === 0) {
    return <div className={styles.emptyTabs}>No tabs available</div>;
  }

  // Xác định hướng chuyển tab (trái/phải hoặc lên/xuống)
  const determineTransitionDirection = useCallback((newTab, oldTab) => {
    if (!oldTab) return 'next';
    const newIndex = tabs.findIndex(tab => tab.key === newTab);
    const oldIndex = tabs.findIndex(tab => tab.key === oldTab);
    return newIndex > oldIndex ? 'next' : 'prev';
  }, [tabs]);

  // Hàm cập nhật indicator
  const updateIndicator = useCallback(() => {
    if (!indicatorRef.current || !tabsRef.current[currentTab] || !listRef.current) return;

    const isHorizontal = position === 'top' || position === 'bottom';
    const targetTab = tabsRef.current[currentTab];
    const rect = targetTab.getBoundingClientRect();
    const parentRect = listRef.current.getBoundingClientRect();

    if (isHorizontal) {
      indicatorRef.current.style.width = `${rect.width}px`;
      indicatorRef.current.style.height = '2px';
      indicatorRef.current.style.left = `${rect.left - parentRect.left}px`;
      indicatorRef.current.style.top = position === 'top' ? 'auto' : '0';
      indicatorRef.current.style.bottom = position === 'top' ? '0' : 'auto';
    } else {
      indicatorRef.current.style.width = '2px';
      indicatorRef.current.style.height = `${rect.height}px`;
      indicatorRef.current.style.top = `${rect.top - parentRect.top}px`;
      indicatorRef.current.style.left = position === 'left' ? 'auto' : '0';
      indicatorRef.current.style.right = position === 'left' ? '0' : 'auto';
    }
  }, [currentTab, position]);

  // Handler cho việc click vào tab
  const handleTabClick = useCallback(
    (key, disabled) => {
      if (disabled) return;

      setPreviousTab(currentTab);
      setCurrentTab(key);

      if (lazyLoad && !loadedTabs.has(key)) {
        setLoadedTabs(prev => new Set([...prev, key]));
      }

      if (onChange) {
        onChange(key);
      }

      setTransitionDirection(determineTransitionDirection(key, currentTab));
    },
    [currentTab, onChange, lazyLoad, loadedTabs, determineTransitionDirection]
  );

  // Xử lý keyboard navigation
  const handleKeyDown = useCallback(
    (e, key, disabled, index) => {
      if (disabled) return;

      const isHorizontal = position === 'top' || position === 'bottom';
      const tabCount = tabs.length;
      const currentIndex = tabs.findIndex(tab => tab.key === currentTab);
      let nextIndex;

      switch (e.key) {
        case 'ArrowRight':
          if (isHorizontal) {
            nextIndex = findNextEnabledTab(currentIndex, 1);
            if (nextIndex !== null) handleTabClick(tabs[nextIndex].key, false);
          }
          break;
        case 'ArrowLeft':
          if (isHorizontal) {
            nextIndex = findNextEnabledTab(currentIndex, -1);
            if (nextIndex !== null) handleTabClick(tabs[nextIndex].key, false);
          }
          break;
        case 'ArrowDown':
          if (!isHorizontal) {
            nextIndex = findNextEnabledTab(currentIndex, 1);
            if (nextIndex !== null) handleTabClick(tabs[nextIndex].key, false);
          }
          break;
        case 'ArrowUp':
          if (!isHorizontal) {
            nextIndex = findNextEnabledTab(currentIndex, -1);
            if (nextIndex !== null) handleTabClick(tabs[nextIndex].key, false);
          }
          break;
        case 'Home':
          e.preventDefault();
          nextIndex = findFirstEnabledTab();
          if (nextIndex !== null) handleTabClick(tabs[nextIndex].key, false);
          break;
        case 'End':
          e.preventDefault();
          nextIndex = findLastEnabledTab();
          if (nextIndex !== null) handleTabClick(tabs[nextIndex].key, false);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          handleTabClick(key, false);
          break;
        default:
          break;
      }
    },
    [position, tabs, currentTab, handleTabClick]
  );

  // Tìm tab không bị disabled tiếp theo
  const findNextEnabledTab = (currentIndex, direction) => {
    const totalTabs = tabs.length;
    let nextIndex = currentIndex;
    do {
      nextIndex = (nextIndex + direction + totalTabs) % totalTabs;
    } while (tabs[nextIndex].disabled && nextIndex !== currentIndex);
    return tabs[nextIndex].disabled ? null : nextIndex;
  };

  // Tìm tab đầu tiên không bị disabled
  const findFirstEnabledTab = () => {
    for (let i = 0; i < tabs.length; i++) {
      if (!tabs[i].disabled) return i;
    }
    return null;
  };

  // Tìm tab cuối cùng không bị disabled
  const findLastEnabledTab = () => {
    for (let i = tabs.length - 1; i >= 0; i--) {
      if (!tabs[i].disabled) return i;
    }
    return null;
  };

  // Theo dõi activeKey từ props
  useEffect(() => {
    if (activeKey !== undefined && activeKey !== currentTab) {
      setPreviousTab(currentTab);
      setCurrentTab(activeKey);

      if (lazyLoad && !loadedTabs.has(activeKey)) {
        setLoadedTabs(prev => new Set([...prev, activeKey]));
      }

      setTransitionDirection(determineTransitionDirection(activeKey, currentTab));
    }
  }, [activeKey, currentTab, lazyLoad, loadedTabs, determineTransitionDirection]);

  // Cập nhật indicator khi tab thay đổi hoặc window resize
  useEffect(() => {
    const handleResize = () => updateIndicator();

    resizeObserverRef.current = new ResizeObserver(handleResize);
    if (listRef.current) {
      resizeObserverRef.current.observe(listRef.current);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [updateIndicator]);

  // Lấy thông tin tab cần render
  const getTabsToRender = () => {
    if (!lazyLoad) {
      return tabs.map(tab => ({ key: tab.key, content: tab.content }));
    }
    return tabs
      .filter(tab => loadedTabs.has(tab.key))
      .map(tab => ({ key: tab.key, content: tab.content }));
  };

  const tabsToRender = getTabsToRender();

  // Focus tự động vào tab panel mới
  useEffect(() => {
    if (panelRefs.current[currentTab]) {
      panelRefs.current[currentTab].focus();
    }
  }, [currentTab]);

  // Xác định class cho container
  const containerClass = clsx(
    styles.tabsContainer,
    styles[`position-${position}`],
    styles[`variant-${variant}`],
    className
  );

  // Xác định class cho tab list
  const tabListClass = clsx(
    styles.tabList,
    styles[`tabList-${position}`],
    tabListClassName
  );

  // Xác định class cho tab panel container
  const panelContainerClass = clsx(
    styles.tabPanelContainer,
    styles[`panelContainer-${position}`]
  );

  // Xác định direction class dựa trên position và transition direction
  const getDirectionClass = () => {
    if (position === 'top' || position === 'bottom') {
      return transitionDirection === 'next'
        ? styles.slideHorizontalNext
        : styles.slideHorizontalPrev;
    } else {
      return transitionDirection === 'next'
        ? styles.slideVerticalNext
        : styles.slideVerticalPrev;
    }
  };

  return (
    <div className={containerClass} {...rest}>
      <div
        className={tabListClass}
        role="tablist"
        ref={listRef}
        aria-orientation={position === 'left' || position === 'right' ? 'vertical' : 'horizontal'}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.key}
            ref={(el) => (tabsRef.current[tab.key] = el)}
            className={clsx(
              styles.tab,
              currentTab === tab.key && styles.activeTab,
              tab.disabled && styles.disabledTab
            )}
            role="tab"
            aria-selected={currentTab === tab.key}
            aria-controls={`panel-${tab.key}`}
            aria-disabled={tab.disabled}
            id={`tab-${tab.key}`}
            onClick={() => handleTabClick(tab.key, tab.disabled)}
            onKeyDown={(e) => handleKeyDown(e, tab.key, tab.disabled, index)}
            disabled={tab.disabled}
            tabIndex={currentTab === tab.key ? 0 : -1}
          >
            {tab.icon && <span className={styles.tabIcon}>{tab.icon}</span>}
            <span className={styles.tabLabel}>{tab.label}</span>
          </button>
        ))}
        {variant !== 'line' && (
          <div ref={indicatorRef} className={styles.tabIndicator} aria-hidden="true" />
        )}
      </div>

      <div className={panelContainerClass}>
        {tabsToRender.map(({ key, content }) => (
          <div
            key={key}
            ref={(el) => (panelRefs.current[key] = el)}
            className={clsx(
              styles.tabPanel,
              currentTab === key && styles.tabPanelActive,
              currentTab !== key && styles.tabPanelInactive,
              currentTab === key && getDirectionClass(),
              tabPanelClassName
            )}
            role="tabpanel"
            aria-labelledby={`tab-${key}`}
            id={`panel-${key}`}
            tabIndex={0}
            aria-hidden={currentTab !== key}
          >
            {content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Tabs);