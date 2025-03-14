// SalesPolicy.js - Component đã tối ưu với tất cả các subcomponent trong cùng một file
import React, { useState, useEffect, useMemo, memo } from 'react';
import styles from './SalesPolicy.module.css';
import { discountPolicies, paymentSchedules, bankSupport, loanDocuments } from './salesPolicyData';

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

/**
 * Render danh sách mục hỗ trợ
 */
const renderSupportItems = (items) => {
  return items.map((item, index) => (
    <div key={index} className={styles.bank__support_item}>
      <svg className={styles.checkIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <div>
        <p className={styles.bank__support_title} style={{color: '#1a202c', fontWeight: 600}}>{item.title || item.duration}</p>
        <p className={styles.bank__support_value} style={{color: '#1a202c'}}>{item.value || item.rate || item.fee}</p>
      </div>
    </div>
  ));
};

/**
 * Render danh sách tài liệu
 */
const renderDocList = (docs) => {
  return docs.map((docItem, index) => (
    <li key={index}>{docItem}</li>
  ));
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
 */
const TabsNav = memo(function TabsNav({ activeTab, isTransitioning, onTabChange, tabNames }) {
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
      {Object.keys(tabNames).map(tabKey => (
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
          {activeTab === tabKey && '• '}{tabNames[tabKey]}
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
 * Component BankTab - Hiển thị tab hỗ trợ tài chính
 */
const BankTab = memo(function BankTab() {
  // Style thủ công cho tab bank
  const bankStyles = {
    container: {
      backgroundColor: '#ffffff',
      color: '#1a202c'
    },
    card: {
      backgroundColor: '#f7fafc',
      color: '#1a202c'
    },
    title: {
      color: '#1a202c',
      fontWeight: 600
    },
    text: {
      color: '#1a202c'
    },
    rateItem: {
      backgroundColor: '#f0f5fa',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      padding: '10px',
      color: '#1a202c'
    },
    rateValue: {
      color: '#2b6cb0',
      fontWeight: 700,
      backgroundColor: 'rgba(255,255,255,0.6)',
      padding: '2px 6px',
      borderRadius: '4px',
      display: 'inline-block'
    }
  };

  const renderSupportSection = (title, items) => (
    <div className={styles.card} style={bankStyles.card}>
      <div className={styles.card__header}>
        <h3 className={styles.card__title} style={bankStyles.title}>
          <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
            <line x1="1" y1="10" x2="23" y2="10"></line>
          </svg>
          {title}
        </h3>
      </div>
      <div className={styles.card__content}>
        <div className={styles.bank__support_grid}>
          {renderSupportItems(items)}
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.bank} style={bankStyles.container}>
      {/* Chính sách hỗ trợ từ VietinBank */}
      <div className={`${styles.card} ${styles.bank__support_card}`} style={bankStyles.card}>
        <div className={styles.card__header}>
          <h3 className={styles.card__title} style={bankStyles.title}>
            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
            Chính sách hỗ trợ từ VietinBank
          </h3>
        </div>
        <div className={styles.card__content}>
          <div className={styles.bank__support_grid}>
            {renderSupportItems(bankSupport.mainSupport)}
          </div>
        </div>
      </div>
      
      <div className={styles.bank__options_grid}>
        {/* Gói hỗ trợ lãi suất */}
        {renderSupportSection('Gói hỗ trợ lãi suất', bankSupport.interestSupport)}
        
        {/* Không tham gia gói HTLS */}
        <div className={styles.card} style={bankStyles.card}>
          <div className={styles.card__header}>
            <h3 className={styles.card__title} style={bankStyles.title}>Không tham gia gói HTLS</h3>
          </div>
          <div className={styles.card__content}>
            <p className={styles.bank__support_subtitle} style={bankStyles.title}>Lãi suất ưu đãi theo thời hạn:</p>
            <div className={styles.bank__rate_grid}>
              {bankSupport.nonParticipation.map((item, index) => (
                <div key={index} className={styles.bank__rate_item} style={bankStyles.rateItem}>
                  <span className={styles.bank__rate_duration} style={bankStyles.title}>{item.duration}:</span>{' '}
                  <span style={bankStyles.rateValue}>{item.rate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Phí trả nợ trước hạn */}
      <div className={`${styles.card} ${styles.bank__prepayment_card}`} style={bankStyles.card}>
        <div className={styles.card__header}>
          <h3 className={styles.card__title} style={bankStyles.title}>Phí trả nợ trước hạn</h3>
        </div>
        <div className={styles.card__content}>
          <div className={styles.bank__fee_grid}>
            {bankSupport.prepaymentFees.map((item, index) => (
              <div key={index} className={styles.bank__fee_item} style={bankStyles.rateItem}>
                <span className={styles.bank__fee_period} style={bankStyles.title}>{item.period}</span>
                <span className={styles.bank__fee_value} style={bankStyles.rateValue}>{item.fee}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

/**
 * Component DocumentTab - Hiển thị tab hồ sơ vay vốn
 */
const DocumentTab = memo(function DocumentTab() {
  return (
    <div className={styles.document}>
      <div className={styles.card}>
        <div className={styles.card__header}>
          <h3 className={styles.card__title}>Hồ sơ vay vốn đơn giản</h3>
          <p className={styles.card__description}>Các loại giấy tờ cần chuẩn bị khi vay vốn ngân hàng</p>
        </div>
        <div className={styles.card__content}>
          <div className={styles.document__section}>
            <h4 className={styles.document__section_title}>
              <span className={styles.document__section_number}>1</span>
              Hồ sơ pháp lý
            </h4>
            <ul className={styles.document__list}>
              {renderDocList(loanDocuments.legalDocs)}
            </ul>
          </div>
          
          <div className={styles.document__section}>
            <h4 className={styles.document__section_title}>
              <span className={styles.document__section_number}>2</span>
              Hồ sơ TSBĐ
            </h4>
            <ul className={styles.document__list}>
              {renderDocList(loanDocuments.collateralDocs)}
            </ul>
          </div>
          
          <div className={styles.document__section}>
            <h4 className={styles.document__section_title}>
              <span className={styles.document__section_number}>3</span>
              Hồ sơ chứng minh tài chính
            </h4>
            <div className={styles.document__financial_grid}>
              {loanDocuments.financialProof.map((item, index) => (
                <div key={index} className={styles.card}>
                  <div className={styles.card__header}>
                    <h5 className={styles.document__financial_title}>Thu nhập {item.type}</h5>
                  </div>
                  <div className={styles.card__content}>
                    <ul className={styles.document__list}>
                      {renderDocList(item.docs)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
    'payment': 'Phương thức thanh toán',
    'bank': 'Hỗ trợ tài chính',
    'document': 'Hồ sơ vay vốn'
  };

  const { activeTab, isTransitioning, handleTabChange } = useTabTransition('discount');
  
  // Render tab content dựa vào activeTab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'discount':
        return <DiscountTab />;
      case 'payment':
        return <PaymentTab />;
      case 'bank':
        return <BankTab />;
      case 'document':
        return <DocumentTab />;
      default:
        return <DiscountTab />;
    }
  };
  
  return (
    <section id="sales-policy" className={styles.sales}>
      <div className={styles.sales__header}>
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