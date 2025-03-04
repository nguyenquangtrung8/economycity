// src/components/EconomyCityLanding/Contact/Contact.js

import React, { useState } from 'react';
import styles from './Contact.module.css';
import { projectData, targetCustomers } from '../common/data';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    customerType: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý gửi form ở đây
    console.log('Form submitted:', formData);
    alert('Cảm ơn bạn đã gửi thông tin. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất!');
    
    // Reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
      customerType: '',
      message: ''
    });
  };

  return (
    <section id="lien-he" className={styles.contact}>
      <div className={styles.wave}></div>
      <div className={styles.backgroundElement}></div>
      
      <div className={`container ${styles.container}`}>
        <div className={styles.contactCard}>
          <div className={styles.contactContent}>
            <div className={styles.contactForm}>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>Đăng ký nhận thông tin ưu đãi</h2>
                <p className={styles.formSubtitle}>
                  Điền thông tin để nhận tư vấn chi tiết và bảng giá mới nhất từ chuyên viên tư vấn
                </p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="name">Họ và tên</label>
                  <input 
                    className={styles.formInput}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nhập họ và tên của bạn"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="phone">Số điện thoại</label>
                  <input 
                    className={styles.formInput}
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Nhập số điện thoại của bạn"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="email">Email</label>
                  <input 
                    className={styles.formInput}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Nhập email của bạn"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="customerType">Bạn quan tâm đến:</label>
                <div className={styles.selectWrapper}>
                  <select 
                    className={styles.formSelect}
                    id="customerType"
                    name="customerType"
                    value={formData.customerType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Nhà phố thương mại</option>
                    <option value="Nhà phố thương mại">Nhà phố thương mại</option>
                    <option value="Biệt thự">Biệt thự</option>
                    <option value="Chung cư">Chung cư</option>
                  </select>
                </div>
              </div>
                
                <button type="submit" className={styles.formButton}>
                  Đăng ký ngay
                </button>
              </form>
            </div>
            
            <div className={styles.contactInfo}>
              <h3 className={styles.infoTitle}>Liên hệ ngay để được tư vấn:</h3>
              
              <ul className={styles.infoList}>
                <li className={styles.infoItem}>
                  <div className={styles.infoIconWrapper}>
                    <svg 
                      className={styles.infoIcon}
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <div className={styles.infoLabel}>Hotline:</div>
                    <div className={styles.infoValue}>
                      <a href={`tel:${projectData.contactInfo.hotline}`} className={styles.infoLink}>
                        {projectData.contactInfo.hotline}
                      </a>
                    </div>
                  </div>
                </li>
                
                <li className={styles.infoItem}>
                  <div className={styles.infoIconWrapper}>
                    <svg 
                      className={styles.infoIcon}
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <div className={styles.infoLabel}>Văn phòng giao dịch:</div>
                    <div className={styles.infoValue}>
                      {projectData.contactInfo.address}
                    </div>
                  </div>
                </li>
                
                <li className={styles.infoItem}>
                  <div className={styles.infoIconWrapper}>
                    <svg 
                      className={styles.infoIcon}
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <div className={styles.infoLabel}>Thời gian làm việc:</div>
                    <div className={styles.infoValue}>
                      {projectData.contactInfo.workingHours}
                    </div>
                  </div>
                </li>
              </ul>
              
              <div className={styles.quoteContainer}>
                <div className={styles.quote}>
                  "Economy City Văn Lâm là cơ hội đầu tư hiếm có với vị trí trung tâm thị trấn, pháp lý hoàn chỉnh, giá chỉ từ 107 triệu/m² - thấp hơn 35% so với các dự án cạnh tranh."
                </div>
                <div className={styles.quoteAuthor}>Chuyên gia BĐS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;