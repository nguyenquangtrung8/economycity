// FAQ.js - Component câu hỏi thường gặp cải tiến cho dự án Economy City Văn Lâm
// Phiên bản tối ưu cho mobile và UX người dùng
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, Building, MapPin, Home, Shield, CreditCard, ArrowUp, Menu } from 'lucide-react';
import { categorizedFaqData, allQuestions } from './FAQdata';
import styles from './FAQ.module.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedCategories, setExpandedCategories] = useState({});
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const faqRef = useRef(null);

  // Kiểm tra nếu thiết bị là mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Kiểm tra ban đầu
    checkIfMobile();
    
    // Lắng nghe sự kiện thay đổi kích thước màn hình
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Theo dõi scroll để hiển thị nút "Back to top"
  useEffect(() => {
    const handleScroll = () => {
      if (faqRef.current) {
        // Hiển thị nút khi scroll xuống 300px
        setShowScrollTop(window.scrollY > 300);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle câu hỏi đang mở
  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Toggle category trên mobile
  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Lọc câu hỏi theo danh mục và từ khóa tìm kiếm
  const filteredFaqs = useMemo(() => {
    // Trường hợp đang tìm kiếm
    if (searchTerm.trim() !== '') {
      const searchResults = allQuestions.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return searchResults;
    }
    
    // Trường hợp xem theo danh mục
    if (activeCategory !== 'all') {
      const category = categorizedFaqData.find(cat => cat.id === activeCategory);
      return category ? category.questions : [];
    }
    
    // Trường hợp xem tất cả
    return allQuestions;
  }, [searchTerm, activeCategory]);

  // Chia danh sách câu hỏi thành 2 cột cho desktop
  const firstColumn = filteredFaqs.filter((_, index) => index % 2 === 0);
  const secondColumn = filteredFaqs.filter((_, index) => index % 2 === 1);

  // Reset tìm kiếm
  const resetSearch = () => {
    setSearchTerm('');
  };

  // Cuộn lên đầu trang
  const scrollToTop = () => {
    if (faqRef.current) {
      window.scrollTo({
        top: faqRef.current.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  // Lấy icon cho danh mục
  const getCategoryIcon = (iconName) => {
    switch(iconName) {
      case 'building': return <Building size={isMobile ? 16 : 20} />;
      case 'map-pin': return <MapPin size={isMobile ? 16 : 20} />;
      case 'home': return <Home size={isMobile ? 16 : 20} />;
      case 'shield': return <Shield size={isMobile ? 16 : 20} />;
      case 'credit-card': return <CreditCard size={isMobile ? 16 : 20} />;
      default: return <Building size={isMobile ? 16 : 20} />;
    }
  };

  // Khi chuyển tab, reset active question và mở rộng category đó
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setActiveIndex(null);
    setSearchTerm('');
    
    // Mở rộng category được chọn và đóng các category khác
    const newExpandedState = {};
    if (categoryId !== 'all') {
      newExpandedState[categoryId] = true;
    }
    setExpandedCategories(newExpandedState);
  };

  // Khi tìm kiếm, auto chuyển về tab "Tất cả"
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim() !== '') {
      setActiveCategory('all');
    }
  };

  // Render danh sách câu hỏi theo chế độ mobile (accordion)
  const renderMobileFAQList = () => {
    // Nếu đang tìm kiếm, hiển thị tất cả kết quả tìm kiếm
    if (searchTerm.trim() !== '') {
      return (
        <div className={styles.mobileAccordion}>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <div key={faq.id} className={styles.faqItem}>
                <button
                  onClick={() => toggleQuestion(faq.id)}
                  className={styles.questionButton}
                >
                  <h3 className={styles.questionText}>{faq.question}</h3>
                  {activeIndex === faq.id ? (
                    <ChevronUp className={styles.iconExpanded} size={16} />
                  ) : (
                    <ChevronDown className={styles.iconCollapsed} size={16} />
                  )}
                </button>
                
                {activeIndex === faq.id && (
                  <div className={styles.answerContainer}>
                    <p className={styles.answerText}>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
              <p className={styles.noResultsText}>
                Không tìm thấy câu hỏi phù hợp với từ khóa "{searchTerm}"
              </p>
              <button onClick={resetSearch} className={styles.resetButton}>
                Xem tất cả câu hỏi
              </button>
            </div>
          )}
        </div>
      );
    }

    // Nếu không tìm kiếm, hiển thị theo danh mục
    return (
      <div className={styles.mobileAccordion}>
        {activeCategory === 'all' ? (
          // Hiển thị tất cả danh mục dạng accordion
          categorizedFaqData.map((category) => (
            <div key={category.id} className={styles.categoryAccordion}>
              <button 
                className={`${styles.categoryButton} ${expandedCategories[category.id] ? styles.categoryActive : ''}`}
                onClick={() => toggleCategory(category.id)}
              >
                <span className={styles.categoryIcon}>
                  {getCategoryIcon(category.icon)}
                </span>
                <span className={styles.categoryName}>{category.name}</span>
                <span className={styles.categoryCount}>
                  {category.questions.length}
                </span>
                {expandedCategories[category.id] ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
              
              {expandedCategories[category.id] && (
                <div className={styles.categoryQuestions}>
                  {category.questions.map((faq) => (
                    <div key={faq.id} className={styles.faqItem}>
                      <button
                        onClick={() => toggleQuestion(faq.id)}
                        className={styles.questionButton}
                      >
                        <h3 className={styles.questionText}>{faq.question}</h3>
                        {activeIndex === faq.id ? (
                          <ChevronUp className={styles.iconExpanded} size={16} />
                        ) : (
                          <ChevronDown className={styles.iconCollapsed} size={16} />
                        )}
                      </button>
                      
                      {activeIndex === faq.id && (
                        <div className={styles.answerContainer}>
                          <p className={styles.answerText}>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          // Hiển thị câu hỏi của danh mục đang active
          filteredFaqs.map((faq) => (
            <div key={faq.id} className={styles.faqItem}>
              <button
                onClick={() => toggleQuestion(faq.id)}
                className={styles.questionButton}
              >
                <h3 className={styles.questionText}>{faq.question}</h3>
                {activeIndex === faq.id ? (
                  <ChevronUp className={styles.iconExpanded} size={16} />
                ) : (
                  <ChevronDown className={styles.iconCollapsed} size={16} />
                )}
              </button>
              
              {activeIndex === faq.id && (
                <div className={styles.answerContainer}>
                  <p className={styles.answerText}>{faq.answer}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    );
  };

  // Render danh sách FAQ theo dạng 2 cột (desktop)
  const renderDesktopFAQList = () => {
    return (
      <div className={styles.faqColumns}>
        {/* First Column */}
        <div className={styles.faqColumn}>
          {firstColumn.map((faq) => (
            <div 
              key={faq.id} 
              className={`${styles.faqItem} ${faq.categoryId && styles[`category-${faq.categoryId}`]}`}
            >
              <button
                onClick={() => toggleQuestion(faq.id)}
                className={styles.questionButton}
              >
                <h3 className={styles.questionText}>{faq.question}</h3>
                {activeIndex === faq.id ? (
                  <ChevronUp className={styles.iconExpanded} size={20} />
                ) : (
                  <ChevronDown className={styles.iconCollapsed} size={20} />
                )}
              </button>
              
              {activeIndex === faq.id && (
                <div className={styles.answerContainer}>
                  <p className={styles.answerText}>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Second Column */}
        <div className={styles.faqColumn}>
          {secondColumn.map((faq) => (
            <div 
              key={faq.id} 
              className={`${styles.faqItem} ${faq.categoryId && styles[`category-${faq.categoryId}`]}`}
            >
              <button
                onClick={() => toggleQuestion(faq.id)}
                className={styles.questionButton}
              >
                <h3 className={styles.questionText}>{faq.question}</h3>
                {activeIndex === faq.id ? (
                  <ChevronUp className={styles.iconExpanded} size={20} />
                ) : (
                  <ChevronDown className={styles.iconCollapsed} size={20} />
                )}
              </button>
              
              {activeIndex === faq.id && (
                <div className={styles.answerContainer}>
                  <p className={styles.answerText}>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render số lượng kết quả tìm kiếm (nếu có)
  const renderSearchResultsCount = () => {
    if (searchTerm.trim() !== '' && filteredFaqs.length > 0) {
      return (
        <div className={styles.searchResultsCount}>
          Tìm thấy <strong>{filteredFaqs.length}</strong> kết quả cho "{searchTerm}"
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.faqContainer} id="FAQs" ref={faqRef}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Câu hỏi thường gặp</h2>
        <p className={styles.subtitle}>Tìm hiểu thêm về dự án Economy City Văn Lâm</p>
        
        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Tìm kiếm câu hỏi..."
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchInput}
          />
          <Search className={styles.searchIcon} size={isMobile ? 16 : 20} />
        </div>
        
        {/* Render số lượng kết quả tìm kiếm */}
        {renderSearchResultsCount()}
      </div>
      
      {/* Tab Navigation - Sticky trên mobile */}
      <div className={`${styles.tabsContainer} ${isMobile ? styles.stickyTabs : ''}`}>
        <button
          className={`${styles.tabButton} ${activeCategory === 'all' ? styles.activeTab : ''}`}
          onClick={() => handleCategoryChange('all')}
        >
          <Menu size={isMobile ? 16 : 20} className={styles.tabIcon} />
          <span className={styles.tabText}>Tất cả</span>
        </button>
        
        {categorizedFaqData.map((category) => (
          <button
            key={category.id}
            className={`${styles.tabButton} ${activeCategory === category.id ? styles.activeTab : ''}`}
            onClick={() => handleCategoryChange(category.id)}
          >
            <span className={styles.tabIcon}>{getCategoryIcon(category.icon)}</span>
            <span className={styles.tabText}>{category.name}</span>
          </button>
        ))}
      </div>
      
      {/* FAQ List - Khác nhau giữa Mobile và Desktop */}
      <div className={styles.faqList}>
        {filteredFaqs.length > 0 ? (
          isMobile ? renderMobileFAQList() : renderDesktopFAQList()
        ) : (
          <div className={styles.noResults}>
            <p className={styles.noResultsText}>
              Không tìm thấy câu hỏi phù hợp với từ khóa "{searchTerm}"
            </p>
            <button onClick={resetSearch} className={styles.resetButton}>
              Xem tất cả câu hỏi
            </button>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className={styles.footer}>
        <p className={styles.footerText}>Chưa tìm thấy câu trả lời bạn cần?</p>
        <div className={styles.ctaButtonContainer}>
          <a href="#contact" className={styles.ctaButton}>
            Liên hệ tư vấn ngay
          </a>
        </div>
      </div>
      
      {/* Back to Top Button - Hiển thị khi scroll xuống */}
      {showScrollTop && (
        <button 
          className={styles.backToTopButton} 
          onClick={scrollToTop}
          aria-label="Cuộn lên đầu trang"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default FAQ;