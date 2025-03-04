// FAQ.js - Component câu hỏi thường gặp cho dự án Economy City Văn Lâm
import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import faqData from './FAQdata';
import styles from './FAQ.module.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Toggle câu hỏi đang mở
  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Lọc câu hỏi theo từ khóa tìm kiếm
  const filteredFaqs = faqData.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Chia danh sách câu hỏi thành 2 cột cho desktop
  const firstColumn = filteredFaqs.filter((_, index) => index % 2 === 0);
  const secondColumn = filteredFaqs.filter((_, index) => index % 2 === 1);

  // Reset tìm kiếm
  const resetSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className={styles.faqContainer}>
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
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <Search className={styles.searchIcon} size={20} />
        </div>
      </div>
      
      {/* FAQ List */}
      <div className={styles.faqList}>
        {filteredFaqs.length > 0 ? (
          <div className={styles.faqColumns}>
            {/* First Column */}
            <div className={styles.faqColumn}>
              {firstColumn.map((faq, index) => (
                <div key={`col1-${index}`} className={styles.faqItem}>
                  <button
                    onClick={() => toggleQuestion(`col1-${index}`)}
                    className={styles.questionButton}
                  >
                    <h3 className={styles.questionText}>{faq.question}</h3>
                    {activeIndex === `col1-${index}` ? (
                      <ChevronUp 
                        className={styles.iconExpanded} 
                        size={20} 
                      />
                    ) : (
                      <ChevronDown 
                        className={styles.iconCollapsed} 
                        size={20} 
                      />
                    )}
                  </button>
                  
                  {activeIndex === `col1-${index}` && (
                    <div className={styles.answerContainer}>
                      <p className={styles.answerText}>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Second Column */}
            <div className={styles.faqColumn}>
              {secondColumn.map((faq, index) => (
                <div key={`col2-${index}`} className={styles.faqItem}>
                  <button
                    onClick={() => toggleQuestion(`col2-${index}`)}
                    className={styles.questionButton}
                  >
                    <h3 className={styles.questionText}>{faq.question}</h3>
                    {activeIndex === `col2-${index}` ? (
                      <ChevronUp 
                        className={styles.iconExpanded} 
                        size={20} 
                      />
                    ) : (
                      <ChevronDown 
                        className={styles.iconCollapsed} 
                        size={20} 
                      />
                    )}
                  </button>
                  
                  {activeIndex === `col2-${index}` && (
                    <div className={styles.answerContainer}>
                      <p className={styles.answerText}>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.noResults}>
            <p className={styles.noResultsText}>
              Không tìm thấy câu hỏi phù hợp với từ khóa "{searchTerm}"
            </p>
            <button 
              onClick={resetSearch}
              className={styles.resetButton}
            >
              Xem tất cả câu hỏi
            </button>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className={styles.footer}>
        <p className={styles.footerText}>Chưa tìm thấy câu trả lời bạn cần?</p>
        <button className={styles.contactButton}>
          Liên hệ tư vấn ngay
        </button>
      </div>
    </div>
  );
};

export default FAQ;