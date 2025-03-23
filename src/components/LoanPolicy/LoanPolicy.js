// LoanPolicy.js
import React, { useState, useMemo, useCallback, memo, useEffect, useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import styles from './LoanPolicy.module.css';
import { bankOptions, bankSupport, loanDocuments } from './LoanPolicyData';

// Constants để tránh magic strings
const TABS = {
  POLICY: 'policy',
  DOCUMENT: 'document'
};

/**
 * Render danh sách mục hỗ trợ
 * @param {Array} items - Các mục hỗ trợ cần hiển thị
 * @returns {JSX.Element} Danh sách các mục hỗ trợ
 */
const SupportItemList = memo(function SupportItemList({ items }) {
  return (
    <div className={styles.bank__support_grid}>
      {items.map((item, index) => (
        <div key={index} className={styles.bank__support_item}>
          <svg className={styles.checkIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <div>
            <p className={styles.bank__support_title}>{item.title || item.duration || item.period}</p>
            <p className={styles.bank__support_value}>{item.value || item.rate || item.fee}</p>
          </div>
        </div>
      ))}
    </div>
  );
});

/**
 * Render danh sách tài liệu
 * @param {Array} docs - Các tài liệu cần hiển thị
 * @returns {JSX.Element} Danh sách các tài liệu
 */
const DocumentList = memo(function DocumentList({ docs }) {
  return (
    <ul className={styles.document__list}>
      {docs.map((docItem, index) => (
        <li key={index}>{docItem}</li>
      ))}
    </ul>
  );
});

/**
 * Component TabsNav - Phần điều hướng tab ở trên cùng
 */
const TabsNav = memo(function TabsNav({ activeTab, isTransitioning, onTabChange, tabNames }) {
  const tabKeys = Object.keys(tabNames);
  
  return (
    <div className={styles.tabs__list} role="tablist">
      {tabKeys.map(tabKey => {
        const isActive = activeTab === tabKey;
        const buttonClasses = `${styles.tabs__button} ${isActive ? styles.tabs__button_active : ''}`;
        
        return (
          <button 
            key={tabKey}
            className={buttonClasses}
            onClick={() => onTabChange(tabKey)}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tab-panel-${tabKey}`}
            id={`tab-${tabKey}`}
            disabled={isTransitioning}
          >
            <span className={styles.tabs__button_text}>
              {isActive && '• '}{tabNames[tabKey]}
            </span>
          </button>
        );
      })}
    </div>
  );
});

/**
 * Component BankTab - Hiển thị tab hỗ trợ tài chính
 */
const BankTab = memo(function BankTab({ bankId }) {
  const currentBank = useMemo(() => 
    bankOptions.find(bank => bank.id === bankId),
    [bankId]
  );
  
  const renderSupportSection = useCallback((title, items) => (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <h3 className={styles.card__title}>
          <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
            <line x1="1" y1="10" x2="23" y2="10"></line>
          </svg>
          {title}
        </h3>
      </div>
      <div className={styles.card__content}>
        <SupportItemList items={items} />
      </div>
    </div>
  ), []);

  return (
    <div className={styles.bank}>
      {/* Chính sách hỗ trợ từ ngân hàng */}
      <div className={`${styles.card} ${styles.bank__support_card}`} style={{ borderLeft: `4px solid ${currentBank.color}` }}>
        <div className={styles.card__header}>
          <h3 className={styles.card__title} style={{ color: currentBank.color }}>
            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={currentBank.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
            Chính sách hỗ trợ từ {currentBank.name}
          </h3>
        </div>
        <div className={styles.card__content}>
          <SupportItemList items={bankSupport[bankId].mainSupport} />
        </div>
      </div>
      
      <div className={styles.bank__options_grid}>
        {/* Gói hỗ trợ lãi suất */}
        {renderSupportSection('Gói hỗ trợ lãi suất', bankSupport[bankId].interestSupport)}
        
        {/* Không tham gia gói HTLS */}
        <div className={styles.card}>
          <div className={styles.card__header}>
            <h3 className={styles.card__title}>Không tham gia gói HTLS</h3>
          </div>
          <div className={styles.card__content}>
            <p className={styles.bank__support_subtitle}>Lãi suất ưu đãi theo thời hạn:</p>
            <div className={styles.bank__rate_grid}>
              {bankSupport[bankId].nonParticipation.map((item, index) => (
                <div key={index} className={styles.bank__rate_item}>
                  <span className={styles.bank__rate_duration}>{item.duration}:</span>{' '}
                  <span className={styles.bank__rate_value}>{item.rate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Phí trả nợ trước hạn */}
      <div className={`${styles.card} ${styles.bank__prepayment_card}`}>
        <div className={styles.card__header}>
          <h3 className={styles.card__title}>Phí trả nợ trước hạn</h3>
        </div>
        <div className={styles.card__content}>
          <div className={styles.bank__fee_grid}>
            {bankSupport[bankId].prepaymentFees
              .filter(item => !item.period.includes('Đặc biệt'))
              .map((item, index) => (
                <div key={index} className={styles.bank__fee_item}>
                  <span className={styles.bank__fee_period}>{item.period}</span>
                  <span className={styles.bank__fee_value}>{item.fee}</span>
                </div>
              ))}
          </div>
          
          {/* Hiển thị nội dung đặc biệt dưới dạng note */}
          {bankSupport[bankId].prepaymentFees.some(item => item.period.includes('Đặc biệt')) && (
            <div className={styles.special_note}>
              <svg className={styles.infoIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <span>
                <strong>Đặc biệt:</strong> {bankSupport[bankId].prepaymentFees.find(item => item.period.includes('Đặc biệt')).fee}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

/**
 * Component DocumentTab - Hiển thị tab hồ sơ vay vốn
 */
const DocumentTab = memo(function DocumentTab() {
  const renderDocumentSection = useCallback((title, number, items) => (
    <div className={styles.document__section}>
      <h4 className={styles.document__section_title}>
        <span className={styles.document__section_number}>{number}</span>
        {title}
      </h4>
      <DocumentList docs={items} />
    </div>
  ), []);

  return (
    <div className={styles.document}>
      <div className={styles.card}>
        <div className={styles.card__header}>
          <h3 className={styles.card__title}>Hồ sơ vay vốn đơn giản</h3>
          <p className={styles.card__description}>Các loại giấy tờ cần chuẩn bị khi vay vốn ngân hàng</p>
        </div>
        <div className={styles.card__content}>
          {renderDocumentSection('Hồ sơ pháp lý', 1, loanDocuments.legalDocs)}
          {renderDocumentSection('Hồ sơ TSBĐ', 2, loanDocuments.collateralDocs)}
          
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
                    <DocumentList docs={item.docs} />
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
          <p className={styles.footer__text}>Cần tư vấn hỗ trợ vay vốn?</p>
          <p className={styles.footer__hotline}>Hotline: 0988.156.516</p>
        </div>
        <a href="#contact" className={styles.footer__button}>
          Nhận tư vấn miễn phí
        </a>
      </div>
    </div>
  );
});

/**
 * Hook quản lý chuyển đổi tab với animation sử dụng react-transition-group
 */
const useTabTransition = (initialTab = 'vietinbank', initialSubTab = TABS.POLICY) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeSubTab, setActiveSubTab] = useState(initialSubTab);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const handleTabChange = useCallback((tabKey) => {
    if (activeTab !== tabKey && !isTransitioning) {
      setIsTransitioning(true);
      setActiveTab(tabKey);
      
      // React-transition-group sẽ tự quản lý trạng thái này
      setTimeout(() => {
        setIsTransitioning(false);
      }, 200); // Sync với thời gian animation
    }
  }, [activeTab, isTransitioning]);
  
  const handleSubTabChange = useCallback((subTabKey) => {
    if (activeSubTab !== subTabKey && !isTransitioning) {
      setIsTransitioning(true);
      setActiveSubTab(subTabKey);
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 200);
    }
  }, [activeSubTab, isTransitioning]);
  
  return {
    activeTab,
    activeSubTab,
    isTransitioning,
    handleTabChange,
    handleSubTabChange
  };
};

/**
 * Component MobileBankSelector - Custom dropdown mobile
 */
const MobileBankSelector = memo(function MobileBankSelector({ activeTab, activeBank, handleTabChange }) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Toggle dropdown
  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);
  
  // Đóng dropdown khi click ra ngoài
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className={styles.mobile_bank_selector} ref={dropdownRef}>
      <button 
        className={styles.custom_dropdown_button}
        style={{ borderColor: activeBank.color }}
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Chọn ngân hàng"
      >
        <div className={styles.custom_dropdown_selected}>
          <span className={styles.custom_dropdown_bankname} style={{ color: activeBank.color }}>
            {activeBank.name}
          </span>
          <span className={styles.custom_dropdown_description}>
            {activeBank.description}
          </span>
        </div>
        <svg 
          className={`${styles.custom_dropdown_arrow} ${isOpen ? styles.custom_dropdown_arrow_open : ''}`} 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      
      {isOpen && (
        <ul className={styles.custom_dropdown_menu} role="listbox" aria-label="Chọn ngân hàng">
          {bankOptions.map(bank => (
            <li 
              key={bank.id} 
              role="option"
              aria-selected={activeTab === bank.id}
              className={`${styles.custom_dropdown_item} ${activeTab === bank.id ? styles.custom_dropdown_item_active : ''}`}
              onClick={() => {
                handleTabChange(bank.id);
                setIsOpen(false);
              }}
              style={activeTab === bank.id ? { borderLeftColor: bank.color } : {}}
            >
              <span className={styles.custom_dropdown_item_name}>
                {bank.name}
              </span>
              <span className={styles.custom_dropdown_item_desc}>
                {bank.description}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

/**
 * Component LoanPolicy chính
 */
function LoanPolicy() {
  // Tên hiển thị của các tab
  const SUB_TAB_NAMES = {
    [TABS.POLICY]: 'Chính sách cho vay',
    [TABS.DOCUMENT]: 'Hồ sơ vay vốn'
  };

  const { activeTab, activeSubTab, isTransitioning, handleTabChange, handleSubTabChange } = useTabTransition('vietinbank', TABS.POLICY);
  
  // Render tab content dựa vào activeSubTab
  const renderTabContent = useMemo(() => {
    switch (activeSubTab) {
      case TABS.POLICY:
        return <BankTab bankId={activeTab} />;
      case TABS.DOCUMENT:
        return <DocumentTab />;
      default:
        return <BankTab bankId={activeTab} />;
    }
  }, [activeTab, activeSubTab]);
  
  // Tìm thông tin ngân hàng đang active
  const activeBank = useMemo(() => 
    bankOptions.find(bank => bank.id === activeTab),
    [activeTab]
  );
  
  // Sắp xếp danh sách ngân hàng để ưu tiên hiển thị PVCombank đầu tiên
  const sortedBankOptions = useMemo(() => {
    // Clone mảng để không ảnh hưởng đến dữ liệu gốc
    return [...bankOptions].sort((a, b) => {
      // Đưa PVCombank lên đầu
      if (a.id === 'pvcombank') return -1;
      if (b.id === 'pvcombank') return 1;
      return 0;
    });
  }, []);
  
  return (
    <section id="loan-policy" className={styles.loan}>
      <div className={styles.loan__header}>
        <span className={styles.badge}>HỖ TRỢ TÀI CHÍNH ƯU ĐÃI</span>
        <h2 className={styles.loan__title}>Chính sách vay mua nhà Economy City Văn Lâm</h2>
        <p className={styles.loan__subtitle}>So sánh các gói vay từ ngân hàng uy tín và lựa chọn phương án phù hợp nhất</p>
      </div>
      
      <div className={styles.loan__container}>
        <div className={styles.tabs}>
          {/* Desktop Bank tabs navigation */}
          <div className={styles.desktop_bank_selector}>
            <div className={styles.bank_selector} role="tablist">
              {sortedBankOptions.map(bank => {
                const isActive = activeTab === bank.id;
                const buttonClasses = `${styles.bank_option} ${isActive ? styles.bank_option_active : ''}`;
                
                return (
                  <button
                    key={bank.id}
                    onClick={() => handleTabChange(bank.id)}
                    className={buttonClasses}
                    style={isActive ? { borderColor: bank.color } : {}}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`tab-panel-${bank.id}`}
                    id={`tab-${bank.id}`}
                    disabled={isTransitioning}
                  >
                    <div>
                      <div 
                        className={styles.bank_name}
                        style={isActive ? { color: bank.color } : {}}
                      >
                        {bank.name}
                      </div>
                      <div className={styles.bank_description}>{bank.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Mobile Bank Selector - Custom Dropdown */}
          <MobileBankSelector 
            activeTab={activeTab}
            activeBank={activeBank}
            bankOptions={sortedBankOptions}
            handleTabChange={handleTabChange}
          />
          
          {/* Sub-tab navigation */}
          <TabsNav 
            activeTab={activeSubTab} 
            isTransitioning={isTransitioning}
            onTabChange={handleSubTabChange}
            tabNames={SUB_TAB_NAMES}
          />
          
          {/* Tab content with transition */}
          <SwitchTransition mode="out-in">
            <CSSTransition
              key={`${activeTab}-${activeSubTab}`}
              timeout={200}
              classNames={{
                enter: styles.tab_enter,
                enterActive: styles.tab_enter_active,
                exit: styles.tab_exit,
                exitActive: styles.tab_exit_active
              }}
            >
              <div 
                className={styles.tabs__content}
                role="tabpanel"
                aria-labelledby={`tab-${activeSubTab}`}
                id={`tab-panel-${activeSubTab}`}
              >
                {renderTabContent}
              </div>
            </CSSTransition>
          </SwitchTransition>
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    </section>
  );
}

export default LoanPolicy;