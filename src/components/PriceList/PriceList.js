import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp,
  Clock, 
  Phone, 
  Filter, 
  Download,
  CheckCircle,
  X
} from 'lucide-react';
import { productsData, bankPartners, calculatePaymentAmount } from './priceListData';
import styles from './PriceList.module.css';

// Component chi tiết phương án thanh toán
const PaymentOptions = ({ product, onClose }) => {
  return (
    <div className={styles.paymentOptions}>
      <div className={styles.paymentModalHeader}>
        <h4 className={styles.paymentTitle}>Phương án thanh toán cho {product.type}</h4>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={20} />
        </button>
      </div>
      
      <div className={styles.paymentPlans}>
        {/* Phương án 1 */}
        <div className={styles.paymentPlan}>
          <div className={styles.planHeader}>Tiêu chuẩn (7 đợt)</div>
          <div className={styles.planContent}>
            <div className={styles.paymentItem}>
              <div className={styles.paymentLabel}>Đặt cọc:</div>
              <div className={styles.paymentValue}>200 triệu</div>
            </div>
            <div className={styles.paymentItem}>
              <div className={styles.paymentLabel}>Đợt 1 (Ký HĐMB):</div>
              <div className={styles.paymentValue}>{calculatePaymentAmount(product.price, 0.1)} tỷ</div>
            </div>
            <div className={styles.paymentItem}>
              <div className={styles.paymentLabel}>Các đợt tiếp theo:</div>
              <div className={styles.paymentValue}>5 đợt x 10-20%</div>
            </div>
            <div className={styles.paymentBenefit}>
              <CheckCircle className={styles.benefitIcon} /> 
              Hỗ trợ vay 0% lãi suất trong 18 tháng
            </div>
          </div>
        </div>
        
        {/* Phương án 2 */}
        <div className={styles.paymentPlan}>
          <div className={`${styles.planHeader} ${styles.planHeader70}`}>Thanh toán sớm 70%</div>
          <div className={styles.planContent}>
            <div className={styles.paymentItem}>
              <div className={styles.paymentLabel}>Đặt cọc:</div>
              <div className={styles.paymentValue}>200 triệu</div>
            </div>
            <div className={styles.paymentItem}>
              <div className={styles.paymentLabel}>Đợt 1 (Ký HĐMB):</div>
              <div className={styles.paymentValue}>{calculatePaymentAmount(product.price, 0.1)} tỷ</div>
            </div>
            <div className={styles.paymentItem}>
              <div className={styles.paymentLabel}>Đợt 2 (30 ngày):</div>
              <div className={styles.paymentValue}>{calculatePaymentAmount(product.price, 0.6)} tỷ</div>
            </div>
            <div className={styles.paymentBenefit}>
              <CheckCircle className={styles.benefitIcon} /> 
              Chiết khấu 0.5% giá trị HĐMB
            </div>
          </div>
        </div>
        
        {/* Phương án 3 */}
        <div className={`${styles.paymentPlan} ${styles.paymentPlanBest}`}>
          <div className={`${styles.planHeader} ${styles.planHeader95}`}>Thanh toán sớm 95% (Ưu đãi tốt nhất)</div>
          <div className={styles.planContent}>
            <div className={styles.paymentItem}>
              <div className={styles.paymentLabel}>Đặt cọc:</div>
              <div className={styles.paymentValue}>200 triệu</div>
            </div>
            <div className={styles.paymentItem}>
              <div className={styles.paymentLabel}>Đợt 1 (Ký HĐMB):</div>
              <div className={styles.paymentValue}>{calculatePaymentAmount(product.price, 0.1)} tỷ</div>
            </div>
            <div className={styles.paymentItem}>
              <div className={styles.paymentLabel}>Đợt 2 (30 ngày):</div>
              <div className={styles.paymentValue}>{calculatePaymentAmount(product.price, 0.85)} tỷ</div>
            </div>
            <div className={styles.paymentBenefit}>
              <CheckCircle className={styles.benefitIcon} /> 
              Chiết khấu 1.0% giá trị HĐMB
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.paymentCta}>
        <button className={styles.btnContact} onClick={() => document.getElementById('contact-form').scrollIntoView({behavior: 'smooth'})}>
          LIÊN HỆ NHẬN BÁO GIÁ CHI TIẾT
        </button>
      </div>
    </div>
  );
};

// Component chính
const PriceList = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Xử lý toggle row
  const toggleRow = (rowId) => {
    if (expandedRow === rowId) {
      setExpandedRow(null);
    } else {
      setExpandedRow(rowId);
    }
  };
  
  // Xử lý form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Xử lý form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Xử lý gửi form (có thể gọi API hoặc xử lý local)
    console.log('Form submitted:', formData);
    
    // Reset form và hiển thị thông báo
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', phone: '' });
    }, 3000);
  };
  
  return (
    <div className={styles.priceTableContainer}>
      {/* Header */}
      <div className={styles.priceHeader}>
        <div className={styles.badgeContainer}>
          <span className={styles.badge}>SẢN PHẨM ĐANG BÁN</span>
        </div>
        <h2 className={styles.priceTitle}>BẢNG GIÁ ƯU ĐÃI ĐỢT MỞ BÁN THÁNG 3/2025</h2>
        <p className={styles.priceSubtitle}>Giá chỉ từ 107 triệu/m² - Thấp hơn 35% so với Ocean Park!</p>
        
        <div className={styles.limitedOffer}>
          <Clock className={styles.clockIcon} /> CHỈ CÒN 27 CĂN TRONG ĐỢT MỞ BÁN NÀY
        </div>
      </div>
      
      <div className={styles.actionButtons}>
        <div className={styles.buttonRow}>
          <button className={styles.btnFilter}>
            <Filter className={styles.buttonIcon} /> Bộ lọc
          </button>
          
          <button className={styles.btnDownload} onClick={() => document.getElementById('contact-form').scrollIntoView({behavior: 'smooth'})}>
            <Download className={styles.buttonIcon} /> Tải bảng giá
          </button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.priceTable}>
          <thead>
            <tr>
              {/* Cột Phân khúc sẽ bị ẩn trên mobile */}
              <th className={styles.colCategory}>Phân khúc</th>
              <th>Loại sản phẩm</th>
              <th className={styles.textCenter}>Diện tích (m²)</th>
              <th className={styles.textCenter}>Mặt tiền (m)</th>
              <th className={styles.textCenter}>Số tầng</th>
              <th className={styles.textCenter}>Giá từ (tỷ)</th>
              <th className={styles.textCenter}>Giá/m² (triệu)</th>
              <th className={styles.textCenter}>Phương án</th>
            </tr>
          </thead>
          <tbody>
            {/* Nhà phố thương mại */}
            <tr>
              <td colSpan="8" className={styles.categoryCell}>
                Nhà phố thương mại
              </td>
            </tr>
            
            {productsData.filter(p => p.category === 'Nhà phố thương mại').map(product => (
              <React.Fragment key={product.id}>
                <tr className={styles.productRow}>
                  {/* Cột Phân khúc sẽ bị ẩn trên mobile */}
                  <td className={styles.colCategory}></td>
                  <td className={styles.productType}>
                    <div className={styles.productName}>{product.type}</div>
                    {product.hot && <span className={styles.hotTag}>Hot</span>}
                  </td>
                  <td className={styles.textCenter}>{product.area}</td>
                  <td className={styles.textCenter}>{product.width}</td>
                  <td className={styles.textCenter}>{product.floors}</td>
                  <td className={`${styles.textCenter} ${styles.productPrice}`}>{product.price}</td>
                  <td className={styles.textCenter}>{product.pricePerM2}</td>
                  <td className={styles.textCenter}>
                    <button 
                      className={styles.btnView}
                      onClick={() => toggleRow(product.id)}
                    >
                      {expandedRow === product.id ? (
                        <>Ẩn <ChevronUp className={styles.buttonIconSmall} /></>
                      ) : (
                        <>Xem <ChevronDown className={styles.buttonIconSmall} /></>
                      )}
                    </button>
                  </td>
                </tr>
                
                {expandedRow === product.id && (
                  <tr className={styles.expandedRow}>
                    <td colSpan="8" className={styles.expandedContent}>
                      <PaymentOptions 
                        product={product}
                        onClose={() => setExpandedRow(null)}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            
            {/* Biệt thự */}
            <tr>
              <td colSpan="8" className={styles.categoryCell}>
                Biệt thự
              </td>
            </tr>
            
            {productsData.filter(p => p.category === 'Biệt thự').map(product => (
              <React.Fragment key={product.id}>
                <tr className={styles.productRow}>
                  {/* Cột Phân khúc sẽ bị ẩn trên mobile */}
                  <td className={styles.colCategory}></td>
                  <td className={styles.productType}>
                    <div className={styles.productName}>{product.type}</div>
                    {product.hot && <span className={styles.hotTag}>Hot</span>}
                  </td>
                  <td className={styles.textCenter}>{product.area}</td>
                  <td className={styles.textCenter}>{product.width}</td>
                  <td className={styles.textCenter}>{product.floors}</td>
                  <td className={`${styles.textCenter} ${styles.productPrice}`}>{product.price}</td>
                  <td className={styles.textCenter}>{product.pricePerM2}</td>
                  <td className={styles.textCenter}>
                    <button 
                      className={styles.btnView}
                      onClick={() => toggleRow(product.id)}
                    >
                      {expandedRow === product.id ? (
                        <>Ẩn <ChevronUp className={styles.buttonIconSmall} /></>
                      ) : (
                        <>Xem <ChevronDown className={styles.buttonIconSmall} /></>
                      )}
                    </button>
                  </td>
                </tr>
                
                {expandedRow === product.id && (
                  <tr className={styles.expandedRow}>
                    <td colSpan="8" className={styles.expandedContent}>
                      <PaymentOptions 
                        product={product}
                        onClose={() => setExpandedRow(null)}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            
            {/* Căn hộ cao tầng */}
            <tr>
              <td colSpan="8" className={styles.categoryCell}>
                Căn hộ cao tầng
              </td>
            </tr>
            
            {productsData.filter(p => p.category === 'Căn hộ cao tầng').map(product => (
              <React.Fragment key={product.id}>
                <tr className={styles.productRow}>
                  {/* Cột Phân khúc sẽ bị ẩn trên mobile */}
                  <td className={styles.colCategory}></td>
                  <td className={styles.productType}>
                    <div className={styles.productName}>{product.type}</div>
                    {product.hot && <span className={styles.hotTag}>Hot</span>}
                  </td>
                  <td className={styles.textCenter}>{product.area}</td>
                  <td className={styles.textCenter}>{product.width}</td>
                  <td className={styles.textCenter}>{product.floors}</td>
                  <td className={`${styles.textCenter} ${styles.productPrice}`}>{product.price}</td>
                  <td className={styles.textCenter}>{product.pricePerM2}</td>
                  <td className={styles.textCenter}>
                    <button 
                      className={styles.btnView}
                      onClick={() => toggleRow(product.id)}
                    >
                      {expandedRow === product.id ? (
                        <>Ẩn <ChevronUp className={styles.buttonIconSmall} /></>
                      ) : (
                        <>Xem <ChevronDown className={styles.buttonIconSmall} /></>
                      )}
                    </button>
                  </td>
                </tr>
                
                {expandedRow === product.id && (
                  <tr className={styles.expandedRow}>
                    <td colSpan="8" className={styles.expandedContent}>
                      <PaymentOptions 
                        product={product}
                        onClose={() => setExpandedRow(null)}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* CTA Section */}
      <div className={styles.ctaSection} id="contact-form">
        <h3 className={styles.ctaTitle}>Liên hệ ngay để nhận bảng giá chi tiết và tư vấn miễn phí</h3>
        <div className={styles.contactFormContainer}>
          <form className={styles.contactForm} onSubmit={handleFormSubmit}>
            <input 
              type="text" 
              name="name" 
              placeholder="Họ và tên" 
              className={styles.formInput}
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input 
              type="tel" 
              name="phone" 
              placeholder="Số điện thoại" 
              className={styles.formInput}
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            
            <button type="submit" className={styles.btnSubmit}>
              <Phone className={styles.buttonIcon} /> NHẬN TƯ VẤN NGAY
            </button>
            
            {formSubmitted && (
              <div className={styles.formSuccess}>Đã gửi thông tin thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.</div>
            )}
          </form>
        </div>
        
        <p className={styles.formNotice}>
          Thông tin chi tiết về quỹ căn và giá chính xác sẽ được tư vấn trực tiếp
        </p>
        
        <div className={styles.bankLogosContainer}>
          <div className={styles.bankLogos}>
            {bankPartners.map((bank, index) => (
              <div key={index} className={styles.bankLogo}>{bank}</div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className={styles.priceFooter}>
        <div className={styles.hotline}>HOTLINE: 0988.156.516</div>
        <div className={styles.address}>Dự án Economy City Văn Lâm - Thị trấn Như Quỳnh, Văn Lâm, Hưng Yên</div>
      </div>
    </div>
  );
};

export default PriceList;