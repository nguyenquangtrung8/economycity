// src/components/UI/Navigation/Tabs/Tabs.js
import React, { useState, useEffect, useRef } from 'react';
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
  ...rest
}) => {
  const [currentTab, setCurrentTab] = useState(activeKey || (tabs[0] && tabs[0].key));
  const [animation, setAnimation] = useState(false);
  const tabsRef = useRef({});
  const indicatorRef = useRef(null);

  // Cập nhật indicator
  useEffect(() => {
    updateIndicator();
  }, [currentTab]);

  // Theo dõi activeKey từ props
  useEffect(() => {
    if (activeKey && activeKey !== currentTab) {
      setCurrentTab(activeKey);
    }
  }, [activeKey]);

  const updateIndicator = () => {
    if (!indicatorRef.current || !tabsRef.current[currentTab]) return;

    const isHorizontal = position === 'top' || position === 'bottom';
    const targetTab = tabsRef.current[currentTab];
    const rect = targetTab.getBoundingClientRect();
    const parentRect = targetTab.parentElement.getBoundingClientRect();

    if (isHorizontal) {
      indicatorRef.current.style.width = `${rect.width}px`;
      indicatorRef.current.style.height = '2px';
      indicatorRef.current.style.left = `${rect.left - parentRect.left}px`;
      indicatorRef.current.style.top = position === 'top' ? 'auto' : '0';
      indicatorRef.current.style.bottom = position === 'top' ? '0' : 'auto';
      indicatorRef.current.style.transform = 'none';
    } else {
      indicatorRef.current.style.width = '2px';
      indicatorRef.current.style.height = `${rect.height}px`;
      indicatorRef.current.style.top = `${rect.top - parentRect.top}px`;
      indicatorRef.current.style.left = position === 'left' ? 'auto' : '0';
      indicatorRef.current.style.right = position === 'left' ? '0' : 'auto';
      indicatorRef.current.style.transform = 'none';
    }
  };

  const handleTabClick = (key, disabled) => {
    if (disabled) return;

    // Trigger animation
    setAnimation(true);
    setTimeout(() => setAnimation(false), 300);

    setCurrentTab(key);
    if (onChange) {
      onChange(key);
    }
  };

  // Tìm nội dung của tab hiện tại
  const currentContent = tabs.find((tab) => tab.key === currentTab)?.content;

  // Xác định class cho container
  const containerClass = `
    ${styles.tabsContainer}
    ${styles[`position-${position}`]}
    ${styles[`variant-${variant}`]}
    ${className}
  `;

  // Xác định class cho tab list
  const tabListClass = `
    ${styles.tabList}
    ${styles[`tabList-${position}`]}
    ${tabListClassName}
  `;

  // Xác định class cho tab panel
  const tabPanelClass = `
    ${styles.tabPanel}
    ${animation ? styles.tabPanelAnimating : ''}
    ${tabPanelClassName}
  `;

  return (
    <div className={containerClass} {...rest}>
      <div className={tabListClass} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            ref={(el) => (tabsRef.current[tab.key] = el)}
            className={`
              ${styles.tab}
              ${currentTab === tab.key ? styles.activeTab : ''}
              ${tab.disabled ? styles.disabledTab : ''}
            `}
            role="tab"
            aria-selected={currentTab === tab.key}
            aria-controls={`panel-${tab.key}`}
            id={`tab-${tab.key}`}
            onClick={() => handleTabClick(tab.key, tab.disabled)}
            disabled={tab.disabled}
            tabIndex={tab.disabled ? -1 : 0}
          >
            {tab.icon && <span className={styles.tabIcon}>{tab.icon}</span>}
            <span className={styles.tabLabel}>{tab.label}</span>
          </button>
        ))}
        <div ref={indicatorRef} className={styles.tabIndicator} aria-hidden="true" />
      </div>

      <div
        className={tabPanelClass}
        role="tabpanel"
        aria-labelledby={`tab-${currentTab}`}
        id={`panel-${currentTab}`}
      >
        {currentContent}
      </div>
    </div>
  );
};

export default Tabs;