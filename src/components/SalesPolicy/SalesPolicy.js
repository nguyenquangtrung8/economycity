// SalesPolicy.js - Tất cả logic trong một file với phần DiscountTab đã cập nhật
import React, { useState, useEffect, memo, useMemo } from 'react';
import clsx from 'clsx';
import styles from './SalesPolicy.module.css';
import { 
  discountPolicies, 
  paymentSchedules, 
  bankSupport, 
  loanDocuments 
} from './salesPolicyData';

/**
 * Helper function để quản lý BEM className dễ dàng hơn
 */
const createBEM = (block) => {
  return {
    block: styles[block],
    element: (element) => styles[`${block}__${element}`] || '',
    modifier: (element, modifier) => styles[`${block}__${element}--${modifier}`] || '',
    blockModifier: (modifier) => styles[`${block}--${modifier}`] || ''
  };
};

/**
 * Component hiển thị tab ưu đãi với thiết kế mới
 */
const DiscountTab = memo(function DiscountTab() {
  return (
    <div className={styles.discountTab}>
      <div className={styles.discountGrid}>
        {discountPolicies.map((policy) => (
          <div 
            key={policy.id} 
            className={clsx(
              styles.discountCard,
              policy.type === 'special' && styles.discountCardSpecial
            )}
          >
            {/* Card Header */}
            <div className={styles.discountCardHeader}>
              <span className={clsx(
                styles.discountBadge,
                policy.type === 'special' && styles.discountBadgeSpecial
              )}>
                {policy.type === 'special' ? 'ĐẶC BIỆT' : policy.id.toUpperCase()}
              </span>
              <h3 className={styles.discountTitle}>{policy.title}</h3>
              <p className={styles.discountDescription}>{policy.description}</p>
            </div>
            
            {/* Card Content - Discount Value */}
            <div className={styles.discountCardContent}>
              <div className={styles.discountValueWrapper}>
                <div className={clsx(
                  styles.discountIconWrapper,
                  policy.type === 'special' && styles.discountIconWrapperSpecial
                )}>
                  <svg className={styles.discountIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                </div>
                <div className={styles.discountInfo}>
                  <span className={styles.discountLabel}>Chiết khấu</span>
                  <span className={clsx(
                    styles.discountValue,
                    policy.type === 'special' && styles.discountValueSpecial
                  )}>
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

// Thông tin các phương pháp thanh toán - Tách ra khỏi component
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

/**
 * Xác định nếu item cần được highlight
 */
const shouldHighlightItem = (payment, activeMethod) => {
  const method = PAYMENT_METHODS.find(m => m.id === activeMethod);
  
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
 * Component hiển thị tab phương thức thanh toán với timeline
 */
const PaymentTab = memo(function PaymentTab() {
  const [activeMethod, setActiveMethod] = useState('standard');
  
  // Sử dụng BEM helpers
  const timeline = createBEM('timeline');
  const payment = createBEM('payment');
  
  // Tìm phương thức thanh toán hiện tại bằng useMemo
  const currentMethod = useMemo(() => 
    PAYMENT_METHODS.find(method => method.id === activeMethod),
    [activeMethod]
  );

  // Tính toán các timeline items một lần duy nhất khi activeMethod thay đổi
  const timelineItems = useMemo(() => {
    return paymentSchedules[activeMethod].map((payment, index) => {
      // Xác định highlight - Tách logic khỏi JSX
      const isHighlighted = shouldHighlightItem(payment, activeMethod);
      
      return (
        <div 
          key={`${activeMethod}-${index}`}
          className={clsx(
            timeline.element('item'),
            isHighlighted && timeline.modifier('item', 'highlighted')
          )}
          role="listitem"
        >
          {/* Icon và số thứ tự */}
          <div className={timeline.element('icon')}>
            <div 
              className={timeline.element('circle')} 
              style={{ 
                backgroundColor: currentMethod.color,
                boxShadow: `0 0 0 4px white, 0 0 0 5px ${currentMethod.color}30`
              }}
              aria-hidden="true"
            >
              {index + 1}
            </div>
          </div>
          
          {/* Nội dung */}
          <div className={timeline.element('content')}>
            <div className={timeline.element('header')}>
              <div>
                <div className={timeline.element('stage')}>{payment.stage}</div>
                <div className={timeline.element('period')}>{payment.time}</div>
              </div>
              <div 
                className={timeline.element('amount')} 
                style={{ 
                  backgroundColor: `${currentMethod.color}20`,
                  color: currentMethod.color
                }}
              >
                {payment.amount}
              </div>
            </div>
            
            {/* Highlight cho điểm quan trọng - Sử dụng logic riêng biệt */}
            {isHighlighted && (
              <div 
                className={timeline.element('highlight')}
                style={{ backgroundColor: `${currentMethod.color}15` }}
              >
                <span className={timeline.element('highlight-text')} style={{ color: currentMethod.color }}>
                  ✓ Thanh toán sớm:
                </span> 
                Hưởng chiết khấu {currentMethod.discountRate} giá trị HĐMB
              </div>
            )}
          </div>
        </div>
      );
    });
  }, [activeMethod, currentMethod, timeline]);

  // Tính toán thông tin tóm tắt - Tách logic khỏi JSX
  const summaryInfo = useMemo(() => 
    createSummaryInfo(activeMethod),
    [activeMethod]
  );

  return (
    <div className={payment.block}>
      {/* Thanh lựa chọn phương thức */}
      <div className={payment.element('selector')} role="tablist">
        {PAYMENT_METHODS.map(method => (
          <button
            key={method.id}
            onClick={() => setActiveMethod(method.id)}
            className={clsx(
              payment.element('method'),
              activeMethod === method.id && payment.modifier('method', 'active'),
              activeMethod === method.id && payment.modifier('method', method.id)
            )}
            role="tab"
            aria-selected={activeMethod === method.id}
            aria-controls={`timeline-${method.id}`}
            id={`tab-${method.id}`}
          >
            <div>
              <div className={clsx(
                payment.element('method-name'),
                activeMethod === method.id && payment.modifier('method-name', method.id)
              )}>
                {method.name}
              </div>
              <div className={payment.element('method-description')}>{method.description}</div>
            </div>
          </button>
        ))}
      </div>
      
      {/* Timeline */}
      <div 
        className={timeline.block}
        role="list"
        aria-labelledby={`tab-${activeMethod}`}
        id={`timeline-${activeMethod}`}
      >
        {/* Đường timeline */}
        <div 
          className={timeline.element('line')} 
          style={{ 
            backgroundColor: currentMethod.color,
            height: `calc(100% - 60px)`
          }}
          aria-hidden="true"
        ></div>
        
        {/* Các điểm trên timeline */}
        {timelineItems}
      </div>
      
      {/* Tóm tắt */}
      <div 
        className={payment.element('summary')}
        style={{ 
          backgroundColor: `${currentMethod.color}10`,
          borderLeft: `4px solid ${currentMethod.color}`
        }}
      >
        <div className={payment.element('summary-title')} style={{ color: currentMethod.color }}>
          Lưu ý quan trọng:
        </div>
        <ul className={payment.element('summary-list')}>
          <li>Tổng thời gian thanh toán: {summaryInfo.timeline}</li>
          <li>Chiết khấu: {summaryInfo.discount}</li>
          <li>Phù hợp với: {summaryInfo.suitableFor}</li>
        </ul>
      </div>
    </div>
  );
});

/**
 * Helper để render các mục support
 */
const renderSupportItems = (items, bank) => {
  return items.map((item, index) => (
    <div key={index} className={bank.element('support-item')}>
      <svg className={styles.checkIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <div>
        <p className={bank.element('support-title')}>{item.title}</p>
        <p className={bank.element('support-value')}>{item.value}</p>
      </div>
    </div>
  ));
};

/**
 * Component hiển thị tab hỗ trợ tài chính từ ngân hàng
 */
const BankTab = memo(function BankTab() {
  const bank = createBEM('bank');
  const card = createBEM('card');

  return (
    <div className={bank.block}>
      <div className={clsx(card.block, bank.element('support-card'))}>
        <div className={card.element('header')}>
          <h3 className={card.element('title')}>
            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
            Chính sách hỗ trợ từ VietinBank
          </h3>
        </div>
        <div className={card.element('content')}>
          <div className={bank.element('support-grid')}>
            {renderSupportItems(bankSupport.mainSupport, bank)}
          </div>
        </div>
      </div>
      
      <div className={bank.element('options-grid')}>
        <div className={card.block}>
          <div className={card.element('header')}>
            <h3 className={card.element('title')}>Gói hỗ trợ lãi suất</h3>
          </div>
          <div className={card.element('content')}>
            <div className={bank.element('support-list')}>
              {renderSupportItems(bankSupport.interestSupport, bank)}
            </div>
          </div>
        </div>
        
        <div className={card.block}>
          <div className={card.element('header')}>
            <h3 className={card.element('title')}>Không tham gia gói HTLS</h3>
          </div>
          <div className={card.element('content')}>
            <p className={bank.element('support-subtitle')}>Lãi suất ưu đãi theo thời hạn:</p>
            <div className={bank.element('rate-grid')}>
              {bankSupport.nonParticipation.map((item, index) => (
                <div key={index} className={bank.element('rate-item')}>
                  <span className={bank.element('rate-duration')}>{item.duration}:</span> {item.rate}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className={bank.element('prepayment-card')}>
        <div className={card.element('header')}>
          <h3 className={card.element('title')}>Phí trả nợ trước hạn</h3>
        </div>
        <div className={card.element('content')}>
          <div className={bank.element('fee-grid')}>
            {bankSupport.prepaymentFees.map((item, index) => (
              <div key={index} className={bank.element('fee-item')}>
                <span className={bank.element('fee-period')}>{item.period}</span>
                <span className={bank.element('fee-value')}>{item.fee}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

/**
 * Helper để render danh sách tài liệu
 */
const renderDocList = (docs) => {
  return docs.map((docItem, index) => (
    <li key={index}>{docItem}</li>
  ));
};

/**
 * Component hiển thị tab hồ sơ vay vốn
 */
const DocumentTab = memo(function DocumentTab() {
  const doc = createBEM('document');
  const card = createBEM('card');

  return (
    <div className={doc.block}>
      <div className={card.block}>
        <div className={card.element('header')}>
          <h3 className={card.element('title')}>Hồ sơ vay vốn đơn giản</h3>
          <p className={card.element('description')}>Các loại giấy tờ cần chuẩn bị khi vay vốn ngân hàng</p>
        </div>
        <div className={card.element('content')}>
          <div className={doc.element('section')}>
            <h4 className={doc.element('section-title')}>
              <span className={doc.element('section-number')}>1</span>
              Hồ sơ pháp lý
            </h4>
            <ul className={doc.element('list')}>
              {renderDocList(loanDocuments.legalDocs)}
            </ul>
          </div>
          
          <div className={doc.element('section')}>
            <h4 className={doc.element('section-title')}>
              <span className={doc.element('section-number')}>2</span>
              Hồ sơ TSBĐ
            </h4>
            <ul className={doc.element('list')}>
              {renderDocList(loanDocuments.collateralDocs)}
            </ul>
          </div>
          
          <div className={doc.element('section')}>
            <h4 className={doc.element('section-title')}>
              <span className={doc.element('section-number')}>3</span>
              Hồ sơ chứng minh tài chính
            </h4>
            <div className={doc.element('financial-grid')}>
              {loanDocuments.financialProof.map((item, index) => (
                <div key={index} className={card.block}>
                  <div className={card.element('header')}>
                    <h5 className={doc.element('financial-title')}>Thu nhập {item.type}</h5>
                  </div>
                  <div className={card.element('content')}>
                    <ul className={doc.element('list')}>
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
 * Component footer chung
 */
const Footer = memo(function Footer() {
  const footer = createBEM('footer');
  
  return (
    <div className={footer.block}>
      <div className={footer.element('content')}>
        <div>
          <p className={footer.element('text')}>Cần tư vấn chi tiết?</p>
          <p className={footer.element('hotline')}>Hotline: 0123.456.789</p>
        </div>
        <button className={footer.element('button')}>
          Liên hệ tư vấn
        </button>
      </div>
    </div>
  );
});

/**
 * Component TabNav - Hiển thị các tab
 */
const TabsNav = memo(function TabsNav({ activeTab, isTransitioning, onTabChange, tabNames }) {
  const tabs = createBEM('tabs');
  
  return (
    <div className={tabs.element('list')} role="tablist">
      {Object.keys(tabNames).map(tabKey => (
        <button 
          key={tabKey}
          className={clsx(
            tabs.element('button'),
            activeTab === tabKey && tabs.modifier('button', 'active')
          )}
          onClick={() => onTabChange(tabKey)}
          role="tab"
          aria-selected={activeTab === tabKey}
          aria-controls={`tab-panel-${tabKey}`}
          id={`tab-${tabKey}`}
          disabled={isTransitioning}
        >
          {tabNames[tabKey]}
        </button>
      ))}
    </div>
  );
});

// Map các tab đến component tương ứng
const TAB_COMPONENTS = {
  'discount': DiscountTab,
  'payment': PaymentTab,
  'bank': BankTab,
  'document': DocumentTab
};

// Tên hiển thị của các tab
const TAB_NAMES = {
  'discount': 'Ưu đãi',
  'payment': 'Phương thức thanh toán',
  'bank': 'Hỗ trợ tài chính',
  'document': 'Hồ sơ vay vốn'
};

/**
 * Hook quản lý chuyển đổi tab
 */
const useTabTransition = (initialTab = 'payment') => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const handleTabChange = (tabKey) => {
    if (activeTab !== tabKey && !isTransitioning) {
      setIsTransitioning(true);
      
      // Giúp DOM cập nhật và tạo hiệu ứng fade out
      requestAnimationFrame(() => {
        const tabContent = document.querySelector(`.${styles.tabs__content}`);
        if (tabContent) {
          tabContent.style.opacity = '0.4';
          
          // Sau khi fade out, chuyển tab và fade in
          setTimeout(() => {
            setActiveTab(tabKey);
            
            // Cho phép React cập nhật DOM trước khi fade in
            requestAnimationFrame(() => {
              setTimeout(() => {
                if (tabContent) {
                  tabContent.style.opacity = '1';
                }
                setIsTransitioning(false);
              }, 50);
            });
          }, 150);
        }
      });
    }
  };
  
  // Theo dõi kích thước của tab content khi chuyển tab
  useEffect(() => {
    // Hàm cập nhật height cho tab content dựa trên nội dung thực
    const updateTabContentHeight = () => {
      const tabContent = document.querySelector(`.${styles.tabs__content}`);
      if (tabContent) {
        const height = tabContent.scrollHeight;
        tabContent.style.transition = 'opacity 0.2s ease, height 0.3s ease';
        tabContent.style.minHeight = `${height}px`;
      }
    };

    // Update height sau khi React render xong
    const timerId = setTimeout(() => {
      updateTabContentHeight();
    }, 50);

    return () => clearTimeout(timerId);
  }, [activeTab]);

  return {
    activeTab,
    isTransitioning,
    handleTabChange
  };
};

/**
 * Component SalesPolicy chính
 */
function SalesPolicy() {
  const { activeTab, isTransitioning, handleTabChange } = useTabTransition('discount');
  const sales = createBEM('sales');
  const tabs = createBEM('tabs');
  
  // Render component tab hiện tại
  const ActiveTabComponent = TAB_COMPONENTS[activeTab];

  return (
    <section className={sales.block}>
      <div className={sales.element('header')}>
        <h2 className={sales.element('title')}>Chính sách bán hàng Economy City Văn Lâm</h2>
        <p className={sales.element('subtitle')}>Lựa chọn phương án thanh toán phù hợp với nhu cầu của bạn</p>
      </div>
      
      <div className={sales.element('container')}>
        <div className={tabs.block}>
          {/* Tab navigation */}
          <TabsNav 
            activeTab={activeTab} 
            isTransitioning={isTransitioning}
            onTabChange={handleTabChange}
            tabNames={TAB_NAMES}
          />
          
          {/* Tab content */}
          <div 
            className={tabs.element('content')}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            id={`tab-panel-${activeTab}`}
          >
            <ActiveTabComponent />
          </div>
        </div>
        
        <Footer />
      </div>
    </section>
  );
}

export default SalesPolicy;