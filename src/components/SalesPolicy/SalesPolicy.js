// SalesPolicy.js - Component với navigation grid 2x2 trên mobile
import React, { useState, useEffect, useMemo, memo } from 'react';
import styles from './SalesPolicy.module.css';
import { discountPolicies, paymentSchedules } from './salesPolicyData';

// ==================== UTILITY FUNCTIONS ====================

/**
 * Kiểm tra mục thanh toán có cần highlight hay không
 */
const shouldHighlightItem = (payment, activeMethod, paymentMethods) => {
  const method = paymentMethods.find(m => m.id === activeMethod);
  
  if (!method || !method.highlightStage || !method.highlightAmount) {
    return false;
  }
  
  return (
    payment.stage === method.highlightStage &&
    payment.amount.includes(method.highlightAmount)
  );
};

/**
 * Tạo thông tin tóm tắt cho phương thức thanh toán
 */
const createSummaryInfo = (activeMethod) => {
  const baseInfo = {
    timeline: '180 ngày (6 tháng)',
    discount: 'Không',
    suitableFor: 'Khách hàng muốn giãn tiến độ thanh toán, tận dụng gói vay 0% lãi suất 18 tháng'
  };
  
  if (activeMethod === 'early70') {
    return {
      timeline: `${baseInfo.timeline} - thanh toán tập trung vào đợt 2`,
      discount: '0.5% khi thanh toán sớm 70%',
      suitableFor: 'Khách hàng có nguồn tiền sẵn có nhưng không quá dồi dào'
    };
  } else if (activeMethod === 'early95') {
    return {
      timeline: `${baseInfo.timeline} - thanh toán tập trung vào đợt 2`,
      discount: '1.0% khi thanh toán sớm 95%',
      suitableFor: 'Khách hàng có nguồn tiền dồi dào, muốn tối ưu hóa lợi nhuận đầu tư'
    };
  }
  
  return baseInfo;
};

// ==================== CUSTOM HOOK ====================

/**
 * Hook quản lý chuyển đổi tab với hiệu ứng
 */
const useTabTransition = (initialTab = 'discount') => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const handleTabChange = (tabKey) => {
    if (activeTab !== tabKey && !isTransitioning) {
      setIsTransitioning(true);
      
      // Sử dụng setTimeout thay vì DOM manipulation
      setTimeout(() => {
        setActiveTab(tabKey);
        
        // Cho phép React cập nhật DOM trước khi kết thúc transition
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 150);
    }
  };
  
  return {
    activeTab,
    isTransitioning,
    handleTabChange
  };
};

// ==================== COMPONENT CON ====================

/**
 * Component TabsNav - Phần điều hướng tab ở trên cùng
 * Đã tối ưu cho mobile với bố cục 2x2
 */
const TabsNav = memo(function TabsNav({ activeTab, isTransitioning, onTabChange, tabNames }) {
  // Mảng các key của tabs để dễ dàng xử lý layout
  const tabKeys = Object.keys(tabNames);
  
  // Inline style cho tab active để đảm bảo hiển thị đúng
  const activeTabStyle = {
    color: '#2563eb',
    fontWeight: 700,
    backgroundColor: '#ffffff',
    borderBottom: '3px solid #2563eb',
    boxShadow: '0 -2px 6px rgba(0, 0, 0, 0.1)'
  };

  return (
    <div className={styles.tabs__list} role="tablist">
      {tabKeys.map(tabKey => (
        <button 
          key={tabKey}
          className={styles.tabs__button}
          style={activeTab === tabKey ? activeTabStyle : {}}
          onClick={() => onTabChange(tabKey)}
          role="tab"
          aria-selected={activeTab === tabKey}
          aria-controls={`tab-panel-${tabKey}`}
          id={`tab-${tabKey}`}
          disabled={isTransitioning}
        >
          <span className={styles.tabs__button_text}>
            {activeTab === tabKey && '• '}{tabNames[tabKey]}
          </span>
        </button>
      ))}
    </div>
  );
});

/**
 * Component DiscountTab - Hiển thị tab ưu đãi
 */
const DiscountTab = memo(function DiscountTab() {
  // Fallback UI nếu không có dữ liệu
  if (!discountPolicies || discountPolicies.length === 0) {
    return (
      <div className={styles.discountTab}>
        <p>Không có chính sách ưu đãi nào</p>
      </div>
    );
  }

  return (
    <div className={styles.discountTab}>
      <div className={styles.discountGrid}>
        {discountPolicies.map((policy) => (
          <div 
            key={policy.id} 
            className={`${styles.discountCard} ${policy.type === 'special' ? styles.discountCardSpecial : ''}`}
          >
            {/* Card Header */}
            <div className={styles.discountCardHeader}>
              <span className={`${styles.discountBadge} ${policy.type === 'special' ? styles.discountBadgeSpecial : ''}`}>
                {policy.type === 'special' ? 'ĐẶC BIỆT' : policy.id.toUpperCase()}
              </span>
              <h3 className={styles.discountTitle}>{policy.title}</h3>
              <p className={styles.discountDescription}>{policy.description}</p>
            </div>
            
            {/* Card Content - Discount Value */}
            <div className={styles.discountCardContent}>
              <div className={styles.discountValueWrapper}>
                <div className={`${styles.discountIconWrapper} ${policy.type === 'special' ? styles.discountIconWrapperSpecial : ''}`}>
                  <svg className={styles.discountIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                </div>
                <div className={styles.discountInfo}>
                  <span className={styles.discountLabel}>Chiết khấu</span>
                  <span className={`${styles.discountValue} ${policy.type === 'special' ? styles.discountValueSpecial : ''}`}>
                    {policy.discount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

/**
 * Component PaymentTab - Hiển thị tab phương thức thanh toán
 */
const PaymentTab = memo(function PaymentTab() {
  const [activeMethod, setActiveMethod] = useState('standard');

  // Các phương thức thanh toán
  const PAYMENT_METHODS = [
    { 
      id: 'standard', 
      name: 'Tiêu chuẩn', 
      description: 'Phân bổ thanh toán trong 7 đợt',
      color: '#4299e1'
    },
    { 
      id: 'early70', 
      name: 'Thanh toán sớm 70%', 
      description: 'Thanh toán nhanh, hưởng chiết khấu 0.5%',
      color: '#38a169',
      highlightStage: 'Đợt 2',
      highlightAmount: '60%',
      discountRate: '0.5%'
    },
    { 
      id: 'early95', 
      name: 'Thanh toán sớm 95%', 
      description: 'Thanh toán nhanh, hưởng chiết khấu 1.0%',
      color: '#805ad5',
      highlightStage: 'Đợt 2',
      highlightAmount: '85%',
      discountRate: '1.0%'
    }
  ];
  
  // Tìm phương thức thanh toán hiện tại
  const currentMethod = useMemo(() => 
    PAYMENT_METHODS.find(method => method.id === activeMethod),
    [activeMethod]
  );

  // Styles cho phương thức thanh toán active
  const getPaymentMethodStyles = (method) => {
    if (activeMethod === method.id) {
      return {
        backgroundColor: `${method.color}10`,
        borderColor: method.color,
        borderWidth: '2px',
        borderStyle: 'solid',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)'
      };
    }
    return {};
  };

  // Tính toán các timeline items
  const timelineItems = useMemo(() => {
    if (!paymentSchedules[activeMethod]) {
      return [];
    }
    
    return paymentSchedules[activeMethod].map((payment, index) => {
      const isHighlighted = shouldHighlightItem(payment, activeMethod, PAYMENT_METHODS);
      
      return (
        <div 
          key={`${activeMethod}-${index}`}
          className={`${styles.timeline__item} ${isHighlighted ? styles.timeline__item__highlighted : ''}`}
        >
          <div className={styles.timeline__icon}>
            <div 
              className={styles.timeline__circle} 
              style={{ 
                backgroundColor: currentMethod.color,
                boxShadow: `0 0 0 4px white, 0 0 0 5px ${currentMethod.color}30`
              }}
            >
              {index + 1}
            </div>
          </div>
          
          <div className={styles.timeline__content}>
            <div className={styles.timeline__header}>
              <div>
                <div className={styles.timeline__stage}>{payment.stage}</div>
                <div className={styles.timeline__period}>{payment.time}</div>
              </div>
              <div 
                className={styles.timeline__amount} 
                style={{ 
                  backgroundColor: `${currentMethod.color}20`,
                  color: currentMethod.color
                }}
              >
                {payment.amount}
              </div>
            </div>
            
            {isHighlighted && (
              <div 
                className={styles.timeline__highlight}
                style={{ backgroundColor: `${currentMethod.color}15` }}
              >
                <span className={styles.timeline__highlight_text} style={{ color: currentMethod.color }}>
                  ✓ Thanh toán sớm:
                </span> 
                Hưởng chiết khấu {currentMethod.discountRate} giá trị HĐMB
              </div>
            )}
          </div>
        </div>
      );
    });
  }, [activeMethod, currentMethod]);

  // Tính toán thông tin tóm tắt
  const summaryInfo = useMemo(() => 
    createSummaryInfo(activeMethod),
    [activeMethod]
  );

  return (
    <div className={styles.payment}>
      {/* Thanh lựa chọn phương thức */}
      <div className={styles.payment__selector}>
        {PAYMENT_METHODS.map(method => (
          <button
            key={method.id}
            onClick={() => setActiveMethod(method.id)}
            className={styles.payment__method}
            style={getPaymentMethodStyles(method)}
          >
            <div>
              <div 
                className={styles.payment__method_name} 
                style={{ 
                  color: activeMethod === method.id ? method.color : '',
                  fontWeight: activeMethod === method.id ? 700 : 600
                }}
              >
                {method.name}
              </div>
              <div className={styles.payment__method_description}>{method.description}</div>
            </div>
          </button>
        ))}
      </div>
      
      {/* Timeline */}
      <div className={styles.timeline}>
        <div 
          className={styles.timeline__line} 
          style={{ 
            backgroundColor: currentMethod.color,
            height: `calc(100% - 60px)`
          }}
        ></div>
        
        {timelineItems}
      </div>
      
      {/* Tóm tắt */}
      <div 
        className={styles.payment__summary}
        style={{ 
          backgroundColor: `${currentMethod.color}10`,
          borderLeft: `4px solid ${currentMethod.color}`
        }}
      >
        <div className={styles.payment__summary_title} style={{ color: currentMethod.color }}>
          Lưu ý quan trọng:
        </div>
        <ul className={styles.payment__summary_list}>
          <li>Tổng thời gian thanh toán: {summaryInfo.timeline}</li>
          <li>Chiết khấu: {summaryInfo.discount}</li>
          <li>Phù hợp với: {summaryInfo.suitableFor}</li>
        </ul>
      </div>
    </div>
  );
});

/**
 * Component Footer - Hiển thị phần footer chung
 */
const Footer = memo(function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__content}>
        <div>
          <p className={styles.footer__text}>Cần tư vấn chi tiết?</p>
          <p className={styles.footer__hotline}>Hotline: 0988.156.516</p>
        </div>
        <a href="#contact" className={styles.footer__button}>
          Nhận thông tin chi tiết
        </a>
      </div>
    </div>
  );
});

// ==================== COMPONENT CHÍNH ====================

/**
 * Component SalesPolicy chính
 */
function SalesPolicy() {
  // Tên hiển thị của các tab
  const TAB_NAMES = {
    'discount': 'Ưu đãi',
    'payment': 'Phương thức thanh toán'
  };

  const { activeTab, isTransitioning, handleTabChange } = useTabTransition('discount');
  
  // Render tab content dựa vào activeTab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'discount':
        return <DiscountTab />;
      case 'payment':
        return <PaymentTab />;
      default:
        return <DiscountTab />;
    }
  };
  
  return (
    <section id="sales-policy" className={styles.sales}>
      <div className={styles.sales__header}>
        <span className={styles.badge}>CHÍNH SÁCH BÁN HÀNG LINH HOẠT</span>
        <h2 className={styles.sales__title}>Chính sách bán hàng Economy City Văn Lâm</h2>
        <p className={styles.sales__subtitle}>Lựa chọn phương án thanh toán phù hợp với nhu cầu của bạn</p>
      </div>
      
      <div className={styles.sales__container}>
        <div className={styles.tabs}>
          {/* Tab navigation - sử dụng component TabsNav */}
          <TabsNav 
            activeTab={activeTab} 
            isTransitioning={isTransitioning}
            onTabChange={handleTabChange}
            tabNames={TAB_NAMES}
          />
          
          {/* Tab content */}
          <div 
            className={styles.tabs__content}
            style={{ opacity: isTransitioning ? 0.4 : 1 }}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            id={`tab-panel-${activeTab}`}
          >
            {renderTabContent()}
          </div>
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    </section>
  );
}

export default SalesPolicy;