import React, { useState } from 'react';
import styles from './Legal.module.css';
import { legalDocuments } from './data';

const Legal = () => {
  // State để theo dõi văn bản đang được chọn
  const [selectedDoc, setSelectedDoc] = useState(0);
  const [pdfScale, setPdfScale] = useState(1.0);

  // Xử lý khi chọn một văn bản pháp lý
  const handleSelectDocument = (index) => {
    setSelectedDoc(index);
  };

  // Kiểm tra nếu văn bản hiện tại không có file PDF
  const hasCurrentFile = () => {
    return legalDocuments[selectedDoc] && legalDocuments[selectedDoc].file;
  };

  // Xử lý zoom PDF
  const handleZoomIn = () => {
    setPdfScale(prevScale => Math.min(prevScale + 0.1, 2.0));
  };

  const handleZoomOut = () => {
    setPdfScale(prevScale => Math.max(prevScale - 0.1, 0.5));
  };

  const handleResetZoom = () => {
    setPdfScale(1.0);
  };

  return (
    <section className={styles.legalSection}>
      {/* Phần tiêu đề ở trên cùng */}
      <div className={styles.sectionHeader}>
        <div className={styles.badgeContainer}>
          <span className={styles.badge}>PHÁP LÝ DỰ ÁN</span>
        </div>
        <h2 className={styles.sectionTitle}>Đảm bảo an toàn pháp lý</h2>
        <p className={styles.sectionDescription}>
          Dự án Economy City Văn Lâm có đầy đủ pháp lý theo quy định, đảm bảo an toàn cho nhà đầu tư
        </p>
      </div>
      
      {/* Phần nội dung hai cột */}
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <ul className={styles.documentList}>
            {legalDocuments.map((doc, index) => (
              <li 
                key={index} 
                className={`${styles.documentItem} ${selectedDoc === index ? styles.selected : ''}`}
                onClick={() => handleSelectDocument(index)}
              >
                <span className={styles.checkMark}>✓</span>
                <div className={styles.documentContent}>
                  <h3 className={styles.documentTitle}>{doc.title}</h3>
                  <p className={styles.documentDescription}>{doc.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className={styles.rightColumn}>
          {hasCurrentFile() ? (
            <div className={styles.pdfViewer}>
              <div className={styles.pdfHeader}>
                <h3>{legalDocuments[selectedDoc].title}</h3>
                <div className={styles.pdfControls}>
                  <button className={styles.zoomButton} onClick={handleZoomOut} title="Thu nhỏ">
                    -
                  </button>
                  <button className={styles.zoomButton} onClick={handleResetZoom} title="Khôi phục">
                    100%
                  </button>
                  <button className={styles.zoomButton} onClick={handleZoomIn} title="Phóng to">
                    +
                  </button>
                  <a 
                    href={legalDocuments[selectedDoc].file} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.downloadButton}
                  >
                    Tải xuống
                  </a>
                </div>
              </div>
              <div className={styles.pdfContainer}>
                <iframe 
                  src={legalDocuments[selectedDoc].file} 
                  title={legalDocuments[selectedDoc].title}
                  className={styles.pdfFrame}
                  style={{ transform: `scale(${pdfScale})`, width: `${100/pdfScale}%`, height: `${100/pdfScale}%` }}
                />
              </div>
            </div>
          ) : (
            <div className={styles.pdfPlaceholder}>
              <p>Tài liệu đang được cập nhật</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Legal;