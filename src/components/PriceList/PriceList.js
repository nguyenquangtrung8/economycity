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
import { productsData, calculatePaymentAmount, calculatePricePerM2 } from './priceListData';
import styles from './PriceList.module.css';

// Component chi tiết phương án thanh toán
const PaymentOptions = ({ product, onClose }) => {
  // Kiểm tra nếu đang trên mobile
  const [isMobile, setIsMobile] = useState(false);
  
  React.useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Kiểm tra ban đầu
    checkIfMobile();
    
    // Thêm event listener để cập nhật khi resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup event listener
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  // Tính toán các giá trị sau ưu đãi
  const noLoanDiscount = 0.06; // 6%
  const discount70 = 0.065; // 6.5%
  const discount95 = 0.07; // 7%
  
  // Giá gốc và chuyển nhượng gốc (không ưu đãi)
  const originalPrice = parseFloat(product.contractPrice);
  const transferPrice = parseFloat(product.transferPrice);
  
  // Giá và chênh lệch cho từng phương án
  // 1. Có vay ngân hàng (không giảm giá)
  const loanPrice = originalPrice;
  const loanTransfer = transferPrice;
  const loanDiff = loanTransfer - loanPrice;
  const loanFirstPayment = (loanPrice * 0.1 + loanDiff).toFixed(2);
  
  // 2. Không vay ngân hàng (giảm 6%)
  const noLoanPrice = originalPrice * (1 - noLoanDiscount);
  const noLoanTransfer = transferPrice * (1 - noLoanDiscount);
  const noLoanDiff = noLoanTransfer - noLoanPrice;
  const noLoanFirstPayment = (noLoanPrice * 0.1 + noLoanDiff).toFixed(2);
  
  // 3. Thanh toán sớm 70% (giảm 6.5%)
  const price70 = originalPrice * (1 - discount70);
  const transfer70 = transferPrice * (1 - discount70);
  const diff70 = transfer70 - price70;
  const firstPayment70 = (price70 * 0.1 + diff70).toFixed(2);
  const secondPayment70 = (price70 * 0.6).toFixed(2);
  
  // 4. Thanh toán sớm 95% (giảm 7%)
  const price95 = originalPrice * (1 - discount95);
  const transfer95 = transferPrice * (1 - discount95);
  const diff95 = transfer95 - price95;
  const firstPayment95 = (price95 * 0.1 + diff95).toFixed(2);
  const secondPayment95 = (price95 * 0.85).toFixed(2);
  
  return (
    <div className={styles.paymentOptions}>
      <div className={styles.paymentModalHeader}>
        <h4 className={styles.paymentTitle}>
          {isMobile 
            ? `${product.type} - ${product.description}`
            : `Phương án thanh toán cho ${product.type} - ${product.description}`
          }
        </h4>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={20} />
        </button>
      </div>
      
      <div className={styles.priceInfoSection}>
        <div className={styles.priceInfoItem}>
          <div className={styles.priceInfoLabel}>Giá HĐMB:</div>
          <div className={styles.priceInfoValue}>{product.contractPrice} tỷ</div>
        </div>
        <div className={styles.priceInfoItem}>
          <div className={styles.priceInfoLabel}>Giá chuyển nhượng:</div>
          <div className={styles.priceInfoValue}>{product.transferPrice} tỷ</div>
        </div>
        {!isMobile && (
          <div className={styles.priceInfoNote}>
            * Lưu ý: Giá chuyển nhượng bao gồm giá HĐMB + lợi nhuận nhà đầu tư sơ cấp, thanh toán trong vòng 10 ngày kể từ ngày ký hợp đồng
          </div>
        )}
      </div>
      
      <div className={`${styles.paymentPlans} ${isMobile ? styles.mobilePaymentPlans : ''}`}>
        {/* Phương án 1: Tiêu chuẩn có vay ngân hàng */}
        <div className={styles.paymentPlan}>
          <div className={styles.planHeader}>{isMobile ? "Vay NH" : "Tiêu chuẩn (Có vay NH)"}</div>
          <div className={styles.planContent}>
            <div className={styles.paymentGrid}>
              <div className={styles.paymentItem}>
                <div className={styles.paymentLabel}>Đặt cọc:</div>
                <div className={styles.paymentValue}>200 triệu</div>
              </div>
              <div className={styles.paymentItem}>
                <div className={styles.paymentLabel}>Đợt 1 (Ký HĐMB):</div>
                <div className={styles.paymentValue}>{loanFirstPayment} tỷ</div>
              </div>
              <div className={styles.paymentItem}>
                <div className={styles.paymentLabel}>Giá gốc sau CK:</div>
                <div className={styles.paymentValue}>{loanPrice.toFixed(3)} tỷ</div>
              </div>
              <div className={styles.paymentItem}>
                <div className={styles.paymentLabel}>Các đợt tiếp theo:</div>
                <div className={styles.paymentValue}>5 đợt x 10-20%</div>
              </div>
            </div>
            <div className={styles.paymentFooterRow}>
              <div className={styles.paymentNote}>
                * Chiết khấu: 0%
              </div>
              <div className={styles.paymentBenefit}>
                <CheckCircle className={styles.benefitIcon} /> 
                Hỗ trợ 0% lãi suất 18 tháng
              </div>
            </div>
          </div>
        </div>
        
        {/* Phương án 2: Tiêu chuẩn không vay ngân hàng */}
        <div className={styles.paymentPlan}>
          <div className={styles.planHeader}>{isMobile ? "Không vay" : "Tiêu chuẩn (Không vay)"}</div>
          <div className={styles.planContent}>
            <div className={styles.paymentGrid}>
              <div className={styles.paymentItem}>
                <div className={styles.paymentLabel}>Đặt cọc:</div>
                <div className={styles.paymentValue}>200 triệu</div>
              </div>
              <div className={styles.paymentItem}>
                <div className={styles.paymentLabel}>Đợt 1 (Ký HĐMB):</div>
                <div className={styles.paymentValue}>{noLoanFirstPayment} tỷ</div>
              </div>
              <div className={styles.paymentItem}>
                <div className={styles.paymentLabel}>Giá gốc sau CK:</div>
                <div className={styles.paymentValue}>{noLoanPrice.toFixed(3)} tỷ</div>
              </div>
              <div className={styles.paymentItem}>
                <div className={styles.paymentLabel}>Các đợt tiếp theo:</div>
                <div className={styles.paymentValue}>5 đợt x 10-20%</div>
              </div>
            </div>
            <div className={styles.paymentFooterRow}>
              <div className={styles.paymentNote}>
                * Chiết khấu: 6%
              </div>
              <div className={styles.paymentBenefit}>
                <CheckCircle className={styles.benefitIcon} /> 
                Không vay ngân hàng
              </div>
            </div>
          </div>
        </div>
        
        {/* Phương án 3: Thanh toán sớm 70% */}
        <div className={styles.paymentPlan}>
          <div className={`${styles.planHeader} ${styles.planHeader70}`}>{isMobile ? "TT 70%" : "Thanh toán sớm 70%"}</div>
          <div className={styles.planContent}>
            <div className={styles.paymentGrid}>
              <div className={styles.paymentItem}>
                <div className={styles.paymentLabel}>Đặt cọc:</div>
                <div className={styles.paymentValue}>200 triệu</div>
              </div>
              <div className={styles.paymentItem}>
                <div className={styles.paymentLabel}>Đợt 1 (Ký HĐMB):</div>
                <div className={styles.paymentValue}>{firstPayment70} tỷ</div>
              </div>
              <div className={styles.paymentItem}>
                <div className={styles.paymentLabel}>Giá gốc sau CK:</div>
                <div className={styles.paymentValue}>{price70.toFixed(3)} tỷ</div>
              </div>
              <div className={styles.paymentItem}>
                <div className={styles.paymentLabel}>Đợt 2 (30 ngày):</div>
                <div className={styles.paymentValue}>{secondPayment70} tỷ</div>
              </div>
            </div>
            <div className={styles.paymentFooterRow}>
              <div className={styles.paymentNote}>
                * Chiết khấu: 6.5%
              </div>
              <div className={styles.paymentBenefit}>
                <CheckCircle className={styles.benefitIcon} /> 
                Thanh toán sớm 70%
              </div>
            </div>
          </div>
        </div>
        
        {/* Phương án 4: Thanh toán sớm 95% */}
        <div className={`${styles.paymentPlan} ${styles.paymentPlanBest}`}>
          <div className={`${styles.planHeader} ${styles.planHeader95}`}>{isMobile ? "TT 95%" : "Thanh toán sớm 95%"}</div>
          <div className={styles.planContent}>
            <div className={styles.paymentGrid}>
              <div className={styles.paymentItem}>
                <div className={styles.paymentLabel}>Đặt cọc:</div>
                <div className={styles.paymentValue}>200 triệu</div>
              </div>
              <div className={styles.paymentItem}>
                <div className={styles.paymentLabel}>Đợt 1 (Ký HĐMB):</div>
                <div className={styles.paymentValue}>{firstPayment95} tỷ</div>
              </div>
              <div className={styles.paymentItem}>
                <div className={styles.paymentLabel}>Giá gốc sau CK:</div>
                <div className={styles.paymentValue}>{price95.toFixed(3)} tỷ</div>
              </div>
              <div className={styles.paymentItem}>
                <div className={styles.paymentLabel}>Đợt 2 (30 ngày):</div>
                <div className={styles.paymentValue}>{secondPayment95} tỷ</div>
              </div>
            </div>
            <div className={styles.paymentFooterRow}>
              <div className={styles.paymentNote}>
                * Chiết khấu: 7%
              </div>
              <div className={styles.paymentBenefit}>
                <CheckCircle className={styles.benefitIcon} /> 
                Thanh toán sớm 95%
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.paymentCta}>
        <a href="#contact" className={styles.btnContact}>
          {isMobile ? "LIÊN HỆ BÁO GIÁ CHI TIẾT" : "LIÊN HỆ NHẬN BÁO GIÁ CHI TIẾT"}
        </a>
      </div>
    </div>
  );
};

// Component chính
const PriceList = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileProductDetails, setMobileProductDetails] = useState(null);
  
  // Kiểm tra thiết bị là mobile hay desktop
  React.useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Nếu chuyển từ desktop sang mobile, đóng các dòng mở rộng
      if (mobile && expandedRow !== null) {
        setExpandedRow(null);
      }
    };
    
    // Kiểm tra ban đầu
    checkIfMobile();
    
    // Thêm event listener để cập nhật khi resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup event listener
    return () => window.removeEventListener('resize', checkIfMobile);
  }, [expandedRow]);
  
  // Xử lý toggle row
  const toggleRow = (rowId, product = null) => {
    if (isMobile && product) {
      // Trên mobile, mở modal thay vì mở rộng row
      setMobileProductDetails(product);
    } else {
      // Trên desktop, mở rộng row như cũ
      if (expandedRow === rowId) {
        setExpandedRow(null);
      } else {
        setExpandedRow(rowId);
      }
    }
  };
  
  // Đóng modal trên mobile
  const closeMobileModal = () => {
    setMobileProductDetails(null);
  };
  
  return (
    <div className={styles.priceTableSection}>
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
            
            <a href="#contact" className={styles.btnDownload}>
              <Download className={styles.buttonIcon} /> {isMobile ? "Tải giá" : "Tải bảng giá"}
            </a>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.priceTable}>
            <thead>
              <tr>
                {/* Cột Phân khúc sẽ bị ẩn trên mobile */}
                <th className={styles.colCategory}>Phân khúc</th>
                <th>Mã căn</th>
                <th className={styles.textCenter}>Loại căn</th>
                <th className={styles.textCenter}>Diện tích (m²)</th>
                {/* Cột sẽ bị ẩn trên mobile */}
                <th className={styles.colConstruction}>Tổng DT XD (m²)</th>
                <th className={styles.textCenter}>Hướng</th>
                {/* Cột sẽ bị ẩn trên mobile */}
                <th className={styles.colContractPrice}>Giá HĐMB (tỷ)</th>
                <th className={styles.textCenter}>Giá/m² (triệu)</th>
                <th className={styles.textCenter}>Giá CN (tỷ)</th>
                <th className={styles.textCenter}>{isMobile ? "Xem" : "Phương án"}</th>
              </tr>
            </thead>
            <tbody>
              {/* Lặp qua các phân khúc sản phẩm */}
              {['Nhà phố thương mại', 'Nhà ở thấp tầng', 'Biệt thự', 'Căn hộ cao tầng'].map(category => (
                <React.Fragment key={category}>
                  <tr>
                    <td colSpan="10" className={styles.categoryCell}>
                      {category}
                    </td>
                  </tr>
                  
                  {productsData.filter(p => p.category === category).map(product => (
                    <React.Fragment key={product.id}>
                      <tr className={styles.productRow}>
                        {/* Cột Phân khúc sẽ bị ẩn trên mobile */}
                        <td className={styles.colCategory}>{product.code}</td>
                        <td className={styles.productType}>
                          <div className={styles.productName}>{product.type}</div>
                          {product.hot && <span className={styles.hotTag}>Hot</span>}
                        </td>
                        <td className={styles.textCenter}>{product.description}</td>
                        <td className={styles.textCenter}>{product.area}</td>
                        {/* Cột sẽ bị ẩn trên mobile */}
                        <td className={styles.colConstruction}>{product.totalArea}</td>
                        <td className={styles.textCenter}>{product.direction}</td>
                        {/* Cột sẽ bị ẩn trên mobile */}
                        <td className={`${styles.colContractPrice} ${styles.productPrice}`}>{product.contractPrice}</td>
                        <td className={styles.textCenter}>{calculatePricePerM2(product.transferPrice, product.area)}</td>
                        <td className={`${styles.textCenter} ${styles.transferPrice}`}>{product.transferPrice}</td>
                        <td className={styles.textCenter}>
                          <button 
                            className={styles.btnView}
                            onClick={() => toggleRow(product.id, product)}
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
                          <td colSpan="10" className={styles.expandedContent}>
                            <PaymentOptions 
                              product={product}
                              onClose={() => setExpandedRow(null)}
                            />
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Rút gọn CTA Section */}
        <div className={styles.simplifiedCta}>
          <p className={styles.ctaDescription}>
            Nhận ngay bảng giá chi tiết và tư vấn miễn phí từ đội ngũ chuyên viên
          </p>
          <div className={styles.ctaButtonContainer}>
            <a href="#contact" className={styles.ctaButton}>
              <Phone className={styles.buttonIcon} /> Nhận thông tin chi tiết
            </a>
          </div>
        </div>
        
        {/* Modal hiển thị chi tiết trên mobile */}
        {isMobile && mobileProductDetails && (
          <div className={styles.mobilePaymentModal}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                {mobileProductDetails.type} - {mobileProductDetails.description}
              </h3>
              <button className={styles.modalClose} onClick={closeMobileModal}>
                <X size={24} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <PaymentOptions 
                product={mobileProductDetails}
                onClose={closeMobileModal}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceList;