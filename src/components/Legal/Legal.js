import React, { useState, useEffect, useRef } from 'react';
import styles from './Legal.module.css';
import { legalDocuments } from './LegalData';

const Legal = () => {
  // State management
  const [selectedDoc, setSelectedDoc] = useState(legalDocuments[0] || null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOverlayClosing, setIsOverlayClosing] = useState(false);
  const sidebarRef = useRef(null);

  // Check for mobile viewport
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Handle clicks outside sidebar to close it on mobile
  useEffect(() => {
    if (!isMobile || !sidebarOpen) return;
    
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest('.toggleSidebar')
      ) {
        handleCloseSidebar();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, sidebarOpen]);

  // Handle closing sidebar with animation
  const handleCloseSidebar = () => {
    if (isMobile) {
      setIsOverlayClosing(true);
      setTimeout(() => {
        setSidebarOpen(false);
        setIsOverlayClosing(false);
      }, 300);
    } else {
      setSidebarOpen(false);
    }
  };

  // Document selection handler
  const handleDocumentSelect = (doc) => {
    setSelectedDoc(doc);
    if (isMobile) handleCloseSidebar();
  };

  // Keyboard event handler for document items
  const handleKeyDown = (e, doc) => {
    if (['Enter', ' '].includes(e.key)) {
      e.preventDefault();
      handleDocumentSelect(doc);
    }
  };

  return (
    <section className={styles.legalSection} id="legal">
      <div className="container">
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.badge}>PHÁP LÝ DỰ ÁN</span>
          <h2 className={styles.title}>Đảm bảo an toàn pháp lý</h2>
          <p className={styles.description}>
            Dự án Economy City Văn Lâm có đầy đủ pháp lý theo quy định, đảm bảo an toàn cho nhà đầu tư
          </p>
        </div>

        {/* Document Viewer Area */}
        <div className={styles.content}>
          {/* Mobile Overlay */}
          {isMobile && sidebarOpen && (
            <div 
              className={`${styles.overlay} ${isOverlayClosing ? styles.closing : ''}`}
              onClick={handleCloseSidebar}
              aria-hidden="true"
            />
          )}

          {/* Document Sidebar */}
          <aside 
            ref={sidebarRef}
            className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}
            aria-label="Danh sách tài liệu pháp lý"
          >
            <div className={styles.sidebarHeader}>
              <h3 className={styles.sidebarTitle}>Danh sách tài liệu</h3>
              {isMobile && (
                <button 
                  className={styles.closeButton}
                  onClick={handleCloseSidebar}
                  aria-label="Đóng danh sách"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>
            
            <ul className={styles.documentList} role="list">
              {legalDocuments.map((doc, index) => (
                <li
                  key={index}
                  className={`${styles.documentItem} ${selectedDoc === doc ? styles.documentItemActive : ''}`}
                  onClick={() => handleDocumentSelect(doc)}
                  role="button"
                  tabIndex={0}
                  aria-selected={selectedDoc === doc}
                  onKeyDown={(e) => handleKeyDown(e, doc)}
                >
                  <div className={styles.documentIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                  <div className={styles.documentInfo}>
                    <div className={styles.documentTitle}>{doc.title}</div>
                    <div className={styles.documentDescription}>{doc.description}</div>
                  </div>
                </li>
              ))}
            </ul>
          </aside>

          {/* PDF Viewer */}
          <main className={styles.pdfViewer}>
            {selectedDoc ? (
              <>
                <header className={styles.pdfHeader}>
                  <div className={styles.pdfTitleSection}>
                    {isMobile && (
                      <button 
                        className={`${styles.menuButton} toggleSidebar`}
                        onClick={() => setSidebarOpen(prev => !prev)}
                        aria-label="Mở danh sách tài liệu"
                        aria-expanded={sidebarOpen}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="3" y1="12" x2="21" y2="12"></line>
                          <line x1="3" y1="6" x2="21" y2="6"></line>
                          <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                      </button>
                    )}
                    {/* Hiển thị title và description, đều có thể xuất hiện tùy CSS */}
                    <div className={styles.pdfTitleWrapper}>
                      <h3 className={styles.pdfTitle}>{selectedDoc.title}</h3>
                      <div className={styles.pdfDescription}>{selectedDoc.description}</div>
                    </div>
                  </div>
                </header>
                
                <div className={styles.pdfContent}>
                  {selectedDoc.file ? (
                    <div className={styles.iframeContainer}>
                      <div className={styles.loadingOverlay}>
                        <div className={styles.spinner}></div>
                      </div>
                      <iframe
                        src={selectedDoc.file}
                        className={styles.pdfIframe}
                        title={selectedDoc.title}
                        width="100%"
                        height="100%"
                        loading="lazy"
                        allow="autoplay"
                        onLoad={(e) => {
                          e.target.classList.add(styles.loaded);
                          e.target.parentNode.querySelector(`.${styles.loadingOverlay}`).style.display = 'none';
                        }}
                      />
                    </div>
                  ) : (
                    <div className={styles.pdfPlaceholder}>
                      <div className={styles.pdfPlaceholderIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                      </div>
                      <div className={styles.pdfPlaceholderText}>
                        {selectedDoc.title}
                      </div>
                      <div className={styles.pdfPlaceholderSubtext}>
                        {selectedDoc.description}
                      </div>
                      <div className={styles.pdfPlaceholderStatus}>
                        Tài liệu đang được cập nhật
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className={styles.pdfPlaceholder}>
                <div className={styles.pdfPlaceholderIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <div className={styles.pdfPlaceholderText}>
                  Chọn một tài liệu từ danh sách để xem
                </div>
                <div className={styles.pdfPlaceholderSubtext}>
                  Các tài liệu pháp lý đã được cơ quan chức năng phê duyệt
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
};

export default Legal;