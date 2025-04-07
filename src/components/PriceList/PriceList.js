import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
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
import { productsData, calculatePricePerM2 } from './priceListData';
import styles from './PriceList.module.css';

// Định dạng số với 2 chữ số thập phân
const formatPrice = (price) => {
  // Chuyển đổi chuỗi thành số
  const numPrice = parseFloat(price);
  // Định dạng số với đúng 2 chữ số thập phân
  return numPrice.toFixed(2);
};

// (Không đổi) Component PaymentOptions: hiển thị các phương án thanh toán
const PaymentOptions = ({ product, onClose }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const noLoanDiscount = 0.06; // 6%
  const discount70 = 0.065;    // 6.5%
  const discount95 = 0.07;     // 7%

  // Đảm bảo dữ liệu là số và được định dạng với 2 chữ số thập phân
  const originalPrice = parseFloat(product.contractPrice);
  const transferPrice = parseFloat(product.transferPrice);

  // 1. Có vay NH
  const loanPrice = originalPrice;
  const loanTransfer = transferPrice;
  const loanDiff = loanTransfer - loanPrice;
  const loanFirstPayment = (loanPrice * 0.1 + loanDiff).toFixed(2);

  // 2. Không vay NH
  const noLoanPrice = originalPrice * (1 - noLoanDiscount);
  const noLoanTransfer = transferPrice * (1 - noLoanDiscount);
  const noLoanDiff = noLoanTransfer - noLoanPrice;
  const noLoanFirstPayment = (noLoanPrice * 0.1 + noLoanDiff).toFixed(2);

  // 3. TT sớm 70%
  const price70 = originalPrice * (1 - discount70);
  const transfer70 = transferPrice * (1 - discount70);
  const diff70 = transfer70 - price70;
  const firstPayment70 = (price70 * 0.1 + diff70).toFixed(2);
  const secondPayment70 = (price70 * 0.6).toFixed(2);

  // 4. TT sớm 95%
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
          <div className={styles.priceInfoValue}>{formatPrice(product.contractPrice)} tỷ</div>
        </div>
        <div className={styles.priceInfoItem}>
          <div className={styles.priceInfoLabel}>Giá chuyển nhượng:</div>
          <div className={styles.priceInfoValue}>{formatPrice(product.transferPrice)} tỷ</div>
        </div>
        {!isMobile && (
          <div className={styles.priceInfoNote}>
            * Lưu ý: Giá chuyển nhượng bao gồm giá HĐMB + lợi nhuận nhà đầu tư sơ cấp...
          </div>
        )}
      </div>

      <div className={`${styles.paymentPlans} ${isMobile ? styles.mobilePaymentPlans : ''}`}>
        {/* Phương án 1 */}
        <div className={styles.paymentPlan}>
          <div className={styles.planHeader}>
            {isMobile ? "Vay NH" : "Tiêu chuẩn (Có vay NH)"}
          </div>
          <div className={styles.planContent}>
            <div className={styles.paymentGrid}>
              <div className={styles.paymentItem}>
                <div className={styles.paymentLabel}>Đặt cọc:</div>
                <div className={styles.paymentValue}>200 triệu</div>
              </div>
              <div className={styles.paymentItem}>
                <div className={styles.paymentLabel}>Đợt 1:</div>
                <div className={styles.paymentValue}>{loanFirstPayment} tỷ</div>
              </div>
              <div className={styles.paymentItem}>
                <div className={styles.paymentLabel}>Giá CN:</div>
                <div className={styles.paymentValue}>{loanTransfer.toFixed(2)} tỷ</div>
              </div>
              <div className={styles.paymentItem}>
                <div className={styles.paymentLabel}>Các đợt tiếp:</div>
                <div className={styles.paymentValue}>5 đợt x 10-20%</div>
              </div>
            </div>
            <div className={styles.paymentFooterRow}>
              <div className={styles.paymentNote}>* CK: 0%</div>
              <div className={styles.paymentBenefit}>
                <CheckCircle className={styles.benefitIcon} /> 0% lãi suất 18 tháng
              </div>
            </div>
          </div>
        </div>
        {/* Phương án 2 */}
        <div className={styles.paymentPlan}>
          <div className={styles.planHeader}>
            {isMobile ? "Không vay" : "Tiêu chuẩn (Không vay)"}
          </div>
          <div className={styles.planContent}>
            <div className={styles.paymentGrid}>
              <div className={styles.paymentItem}>
                <div className={styles.paymentLabel}>Đặt cọc:</div>
                <div className={styles.paymentValue}>200 triệu</div>
              </div>
              <div className={styles.paymentItem}>
                <div className={styles.paymentLabel}>Đợt 1:</div>
                <div className={styles.paymentValue}>{noLoanFirstPayment} tỷ</div>
              </div>
              <div className={styles.paymentItem}>
                <div className={styles.paymentLabel}>Giá CN:</div>
                <div className={styles.paymentValue}>{noLoanTransfer.toFixed(2)} tỷ</div>
              </div>
              <div className={styles.paymentItem}>
                <div className={styles.paymentLabel}>Các đợt tiếp:</div>
                <div className={styles.paymentValue}>5 đợt x 10-20%</div>
              </div>
            </div>
            <div className={styles.paymentFooterRow}>
              <div className={styles.paymentNote}>* CK: 6%</div>
              <div className={styles.paymentBenefit}>
                <CheckCircle className={styles.benefitIcon} /> Không vay NH
              </div>
            </div>
          </div>
        </div>
        {/* Phương án 3 */}
        <div className={styles.paymentPlan}>
          <div className={`${styles.planHeader} ${styles.planHeader70}`}>
            {isMobile ? "TT 70%" : "Thanh toán sớm 70%"}
          </div>
          <div className={styles.planContent}>
            <div className={styles.paymentGrid}>
              <div className={styles.paymentItem}>
                <div className={styles.paymentLabel}>Đặt cọc:</div>
                <div className={styles.paymentValue}>200 triệu</div>
              </div>
              <div className={styles.paymentItem}>
                <div className={styles.paymentLabel}>Đợt 1:</div>
                <div className={styles.paymentValue}>{firstPayment70} tỷ</div>
              </div>
              <div className={styles.paymentItem}>
                <div className={styles.paymentLabel}>Giá CN:</div>
                <div className={styles.paymentValue}>{transfer70.toFixed(2)} tỷ</div>
              </div>
              <div className={styles.paymentItem}>
                <div className={styles.paymentLabel}>Đợt 2 (30 ngày):</div>
                <div className={styles.paymentValue}>{secondPayment70} tỷ</div>
              </div>
            </div>
            <div className={styles.paymentFooterRow}>
              <div className={styles.paymentNote}>* CK: 6.5%</div>
              <div className={styles.paymentBenefit}>
                <CheckCircle className={styles.benefitIcon} /> TT sớm 70%
              </div>
            </div>
          </div>
        </div>
        {/* Phương án 4 */}
        <div className={`${styles.paymentPlan} ${styles.paymentPlanBest}`}>
          <div className={`${styles.planHeader} ${styles.planHeader95}`}>
            {isMobile ? "TT 95%" : "Thanh toán sớm 95%"}
          </div>
          <div className={styles.planContent}>
            <div className={styles.paymentGrid}>
              <div className={styles.paymentItem}>
                <div className={styles.paymentLabel}>Đặt cọc:</div>
                <div className={styles.paymentValue}>200 triệu</div>
              </div>
              <div className={styles.paymentItem}>
                <div className={styles.paymentLabel}>Đợt 1:</div>
                <div className={styles.paymentValue}>{firstPayment95} tỷ</div>
              </div>
              <div className={styles.paymentItem}>
                <div className={styles.paymentLabel}>Giá CN:</div>
                <div className={styles.paymentValue}>{transfer95.toFixed(2)} tỷ</div>
              </div>
              <div className={styles.paymentItem}>
                <div className={styles.paymentLabel}>Đợt 2 (30 ngày):</div>
                <div className={styles.paymentValue}>{secondPayment95} tỷ</div>
              </div>
            </div>
            <div className={styles.paymentFooterRow}>
              <div className={styles.paymentNote}>* CK: 7%</div>
              <div className={styles.paymentBenefit}>
                <CheckCircle className={styles.benefitIcon} /> TT sớm 95%
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

// (Chính) PriceList
const PriceList = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileProductDetails, setMobileProductDetails] = useState(null);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [password, setPassword] = useState('');
  const [showAllPrices, setShowAllPrices] = useState(false);

  // ref cho input mật khẩu
  const passwordInputRef = useRef(null);
  const modalRef = useRef(null);

  // Check mobile / desktop
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile && expandedRow !== null) {
        setExpandedRow(null);
      }
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, [expandedRow]);

  // Bảo đảm input focus khi modal hiển thị
  useEffect(() => {
    if (showPriceModal && passwordInputRef.current) {
      // Sử dụng setTimeout để đảm bảo DOM đã được cập nhật
      const focusTimeout = setTimeout(() => {
        passwordInputRef.current.focus();
      }, 100);
      return () => clearTimeout(focusTimeout);
    }
  }, [showPriceModal]);

  // Toggle row
  const toggleRow = (rowId, product = null) => {
    if (isMobile && product) {
      setMobileProductDetails(product);
    } else {
      setExpandedRow(rowId === expandedRow ? null : rowId);
    }
  };

  // Đóng modal mobile
  const closeMobileModal = () => {
    setMobileProductDetails(null);
  };

  // Xử lý nhập mật khẩu
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Kiểm tra mật khẩu
  const handleCheckPassword = () => {
    if (password === 'visionland') {
      setShowAllPrices(true);
      setShowPriceModal(false);
      setPassword('');
    } else {
      alert('Mật khẩu không đúng!');
      // Focus lại input sau thông báo
      setTimeout(() => {
        if (passwordInputRef.current) {
          passwordInputRef.current.focus();
        }
      }, 0);
    }
  };

  const handleShowPriceClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPriceModal(true);
  };

  // Xử lý keydown trong modal
  const handleModalKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowPriceModal(false);
    } else if (e.key === 'Enter') {
      handleCheckPassword();
    }
    e.stopPropagation();
  };

  // Xử lý click vào backdrop modal
  const handleBackdropClick = (e) => {
    // Chỉ đóng modal khi click vào backdrop, không phải vào nội dung modal
    if (e.target === e.currentTarget) {
      setShowPriceModal(false);
    }
  };

  // Tạo component modal độc lập để tránh các vấn đề về render và focus
  const PasswordModal = () => {
    if (!showPriceModal) return null;

    // Sử dụng useEffect để focus input mỗi khi modal hiển thị
    useEffect(() => {
      if (passwordInputRef.current) {
        passwordInputRef.current.focus();
      }
    }, []);

    return ReactDOM.createPortal(
      <div
        className={styles.passwordModal}
        onClick={handleBackdropClick}
        onKeyDown={handleModalKeyDown}
      >
        <div 
          className={styles.passwordModalContent}
          ref={modalRef}
          onClick={(e) => e.stopPropagation()} // Ngăn sự kiện click truyền lên backdrop
        >
          <div className={styles.passwordModalHeader}>
            <h3 className={styles.passwordModalTitle}>Nhập mật khẩu để xem giá</h3>
            <button 
              className={styles.modalClose} 
              onClick={() => setShowPriceModal(false)}
            >
              <X size={24} />
            </button>
          </div>
          <div className={styles.passwordModalBody}>
            <p className={styles.passwordModalText}>
              Vui lòng nhập mật khẩu để xem giá chi tiết tất cả các căn.
            </p>
            <div className={styles.passwordInputWrapper}>
              <input
                ref={passwordInputRef}
                type="password"
                className={styles.passwordInput}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Nhập mật khẩu"
                autoComplete="off"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleCheckPassword();
                  }
                }}
              />
            </div>
            <button 
              className={styles.btnSubmitPassword}
              onClick={handleCheckPassword}
            >
              Xác nhận
            </button>
          </div>
          <div className={styles.passwordModalFooter}>
            <p className={styles.passwordModalNote}>
              Hoặc liên hệ hotline&nbsp;
              <a href="tel:0988156516" className={styles.phoneLink}>0988.156.516</a>
              &nbsp;để được tư vấn chi tiết.
            </p>
          </div>
        </div>
      </div>,
      document.getElementById("modal-root") || document.body
    );
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
          <p className={styles.priceSubtitle}>
            Giá chỉ từ 107 triệu/m² - Thấp hơn 35% so với Ocean Park!
          </p>
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
                <th className={styles.colCategory}>Phân khúc</th>
                <th>Mã căn</th>
                <th className={styles.textCenter}>Loại căn</th>
                <th className={styles.textCenter}>Diện tích (m²)</th>
                <th className={styles.colConstruction}>Tổng DT XD (m²)</th>
                <th className={styles.textCenter}>Hướng</th>
                <th className={styles.colContractPrice}>Giá HĐMB (tỷ)</th>
                <th className={styles.textCenter}>Giá/m² (triệu)</th>
                <th className={styles.textCenter}>Giá CN (tỷ)</th>
                <th className={styles.textCenter}>{isMobile ? "Xem" : "Phương án"}</th>
              </tr>
            </thead>
            <tbody>
              {['Nhà phố thương mại', 'Nhà ở thấp tầng', 'Biệt thự', 'Căn hộ cao tầng'].map(category => (
                <React.Fragment key={category}>
                  <tr>
                    <td colSpan="10" className={styles.categoryCell}>
                      {category}
                    </td>
                  </tr>
                  {productsData
                    .filter(p => p.category === category)
                    .map(product => (
                      <React.Fragment key={product.id}>
                        <tr className={styles.productRow}>
                          <td className={styles.colCategory}>{product.code}</td>
                          <td className={styles.productType}>
                            <div className={styles.productName}>{product.type}</div>
                            {product.hot && <span className={styles.hotTag}>Hot</span>}
                          </td>
                          <td className={styles.textCenter}>{product.description}</td>
                          <td className={styles.textCenter}>{product.area}</td>
                          <td className={styles.colConstruction}>{product.totalArea}</td>
                          <td className={styles.textCenter}>{product.direction}</td>
                          <td className={`${styles.colContractPrice} ${styles.productPrice}`}>
                            {formatPrice(product.contractPrice)}
                          </td>
                          <td className={styles.textCenter}>
                            {calculatePricePerM2(product.transferPrice, product.area)}
                          </td>
                          <td className={`${styles.textCenter} ${styles.transferPrice}`}>
                            {(showAllPrices ||
                              productsData.filter(p => p.category === category).indexOf(product) < 2)
                              ? formatPrice(product.transferPrice)
                              : (
                                <button
                                  className={styles.btnShowPrice}
                                  onClick={handleShowPriceClick}
                                >
                                  Xem giá
                                </button>
                              )
                            }
                          </td>
                          <td className={styles.textCenter}>
                            <button
                              className={styles.btnView}
                              onClick={() => toggleRow(product.id, product)}
                            >
                              {expandedRow === product.id
                                ? <>Ẩn <ChevronUp className={styles.buttonIconSmall} /></>
                                : <>Xem <ChevronDown className={styles.buttonIconSmall} /></>
                              }
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

        {/* Render PasswordModal component */}
        <PasswordModal />

        {/* Modal chi tiết trên mobile */}
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