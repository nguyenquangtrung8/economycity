// src/components/EconomyCityLanding/Footer/Footer.js

import React, { useState, useEffect } from 'react';
import styles from './Footer.module.css';
import { projectData } from '../common/data';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <div className={styles.logoWrapper}>
              <img 
                src="/img/logo.png" 
                alt="Economy City" 
                className={styles.logoImage}
              />
              <span className={styles.logoText}>Economy City</span>
            </div>
            <p className={styles.logoDescription}>
              Khu đô thị kiểu mẫu phía Đông Hà Nội - Không gian sống hiện đại, tiện nghi cho cộng đồng cư dân văn minh
            </p>
          </div>
          
          <div className={styles.footerLinks}>
            <h3 className={styles.linksTitle}>Liên kết nhanh</h3>
            <ul className={styles.linksList}>
              <li className={styles.linkItem}>
                <a href="#tong-quan" className={styles.footerLink}>Tổng quan</a>
              </li>
              <li className={styles.linkItem}>
                <a href="#vi-tri" className={styles.footerLink}>Vị trí</a>
              </li>
              <li className={styles.linkItem}>
                <a href="#tien-ich" className={styles.footerLink}>Tiện ích</a>
              </li>
              <li className={styles.linkItem}>
                <a href="#san-pham" className={styles.footerLink}>Sản phẩm</a>
              </li>
              <li className={styles.linkItem}>
                <a href="#thu-vien" className={styles.footerLink}>Thư viện</a>
              </li>
              <li className={styles.linkItem}>
                <a href="#lien-he" className={styles.footerLink}>Liên hệ</a>
              </li>
            </ul>
          </div>
          
          <div className={styles.footerContact}>
            <h3 className={styles.linksTitle}>Thông tin liên hệ</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <svg 
                  className={styles.contactIcon}
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <a 
                  href={`tel:${projectData.contactInfo.hotline}`} 
                  className={styles.contactLink}
                >
                  {projectData.contactInfo.hotline}
                </a>
              </li>
              <li className={styles.contactItem}>
                <svg 
                  className={styles.contactIcon}
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <a 
                  href={`mailto:${projectData.contactInfo.email}`} 
                  className={styles.contactLink}
                >
                  {projectData.contactInfo.email}
                </a>
              </li>
              <li className={styles.contactItem}>
                <svg 
                  className={styles.contactIcon}
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{projectData.contactInfo.address}</span>
              </li>
            </ul>
          </div>
          
          <div className={styles.footerSocial}>
            <h3 className={styles.linksTitle}>Kết nối với chúng tôi</h3>
            <p>
              Theo dõi chúng tôi trên các kênh mạng xã hội để cập nhật thông tin mới nhất về dự án
            </p>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialIcon} title="Facebook">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className={styles.socialIcon} title="Youtube">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
              <a href="#" className={styles.socialIcon} title="Instagram">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className={styles.socialIcon} title="Zalo">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <text x="8" y="16" fontSize="10" fontWeight="bold">Z</text>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            © {currentYear} {projectData.name}. All rights reserved.
          </div>
          <div className={styles.legalLinks}>
            <a href="#" className={styles.legalLink}>Chính sách bảo mật</a>
            <a href="#" className={styles.legalLink}>Điều khoản sử dụng</a>
            <a href="#" className={styles.legalLink}>Sitemap</a>
          </div>
        </div>
      </div>
      
      <div 
        className={`${styles.scrollTop} ${showScrollTop ? styles.scrollTopVisible : ''}`}
        onClick={scrollToTop}
        title="Lên đầu trang"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;