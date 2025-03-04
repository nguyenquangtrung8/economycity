// salesPolicyData.js - Dữ liệu cho component

// Chính sách chiết khấu
export const discountPolicies = [
    {
      id: 'cs1',
      type: 'standard',
      title: 'Thanh toán sớm 70%',
      description: 'Thanh toán trong vòng 40 ngày kể từ ngày ký HĐĐC',
      discount: '0.5%',
      info: 'Áp dụng cho tất cả các loại sản phẩm'
    },
    {
      id: 'cs2',
      type: 'standard',
      title: 'Thanh toán sớm 95%',
      description: 'Thanh toán trong vòng 40 ngày kể từ ngày ký HĐĐC',
      discount: '1.0%',
      info: 'Áp dụng cho tất cả các loại sản phẩm'
    },
    {
      id: 'special',
      type: 'special',
      title: 'Không vay vốn',
      description: 'Không vay vốn và không nhận gói hỗ trợ 0%',
      discount: '6.0%',
      info: 'Ưu đãi có thời hạn đến 30/04/2025'
    }
  ];
  
  // Tiến độ thanh toán
  export const paymentSchedules = {
    standard: [
      { stage: 'Đặt cọc', time: 'Ký kết thỏa thuận đặt cọc', amount: '200.000.000đ' },
      { stage: 'Đợt 1', time: '10 ngày kể từ ngày ký kết TTĐC', amount: 'Ký kết HĐCN + 10% giá trị HĐMB' },
      { stage: 'Đợt 2', time: '30 ngày kể từ ngày ký kết HĐCN', amount: '20% giá trị HĐMB' },
      { stage: 'Đợt 3', time: '60 ngày kể từ ngày ký kết HĐCN', amount: '10% giá trị HĐMB' },
      { stage: 'Đợt 4', time: '90 ngày kể từ ngày ký kết HĐCN', amount: '10% giá trị HĐMB' },
      { stage: 'Đợt 5', time: '120 ngày kể từ ngày ký kết HĐCN', amount: '10% giá trị HĐMB' },
      { stage: 'Đợt 6', time: '150 ngày kể từ ngày ký kết HĐCN', amount: '10% giá trị HĐMB' },
      { stage: 'Đợt 7', time: '180 ngày kể từ ngày ký kết HĐCN', amount: '25% giá trị HĐMB + ký quỹ 5%' }
    ],
    early70: [
      { stage: 'Đặt cọc', time: 'Ký kết thỏa thuận đặt cọc', amount: '200.000.000đ' },
      { stage: 'Đợt 1', time: '10 ngày kể từ ngày ký kết TTĐC', amount: 'Ký kết HĐCN + 10% giá trị HĐMB' },
      { stage: 'Đợt 2', time: '30 ngày kể từ ngày ký kết HĐCN', amount: '60% giá trị HĐMB' },
      { stage: 'Đợt 3', time: '180 ngày kể từ ngày ký kết HĐCN', amount: '25% giá trị HĐMB + ký quỹ 5%' }
    ],
    early95: [
      { stage: 'Đặt cọc', time: 'Ký kết thỏa thuận đặt cọc', amount: '200.000.000đ' },
      { stage: 'Đợt 1', time: '10 ngày kể từ ngày ký kết TTĐC', amount: 'Ký kết HĐCN + 10% giá trị HĐMB' },
      { stage: 'Đợt 2', time: '30 ngày kể từ ngày ký kết HĐCN', amount: '85% giá trị HĐMB' },
      { stage: 'Đợt 3', time: '180 ngày kể từ ngày ký kết HĐCN', amount: 'Ký quỹ 5%' }
    ]
  };
  
  // Hỗ trợ tài chính
  export const bankSupport = {
    mainSupport: [
      {
        title: 'Thời gian vay tối đa',
        value: '35 năm'
      },
      {
        title: 'Tỷ lệ cho vay/TSBD',
        value: '70% (lên đến 80% với TSBD khác)'
      },
      {
        title: 'Thời gian phê duyệt',
        value: 'Chỉ 02 ngày kể từ ngày nhận đủ hồ sơ'
      },
      {
        title: 'Thời gian ân hạn gốc',
        value: '18 tháng'
      }
    ],
    interestSupport: [
      {
        title: 'Trong thời gian HTLS',
        value: 'Lãi suất ưu đãi 0%/năm trong 18 tháng'
      },
      {
        title: 'Sau thời gian HTLS',
        value: 'Áp dụng lãi suất thương mại theo quy định của ngân hàng (không thấp hơn 3.5%/năm)'
      }
    ],
    nonParticipation: [
      {
        duration: '12 tháng',
        rate: '6.0%/năm'
      },
      {
        duration: '18 tháng',
        rate: '6.5%/năm'
      },
      {
        duration: '24 tháng',
        rate: '6.7%/năm'
      },
      {
        duration: '36 tháng',
        rate: '8.2%/năm'
      }
    ],
    prepaymentFees: [
      {
        period: 'Năm thứ 1-2',
        fee: '1%'
      },
      {
        period: 'Năm thứ 3',
        fee: '0.75%'
      },
      {
        period: 'Năm thứ 4-5',
        fee: '0.5%'
      },
      {
        period: 'Năm thứ 6 trở đi',
        fee: 'Miễn phí'
      }
    ]
  };
  
  // Hồ sơ vay vốn
  export const loanDocuments = {
    legalDocs: [
      'CMND/CCCD',
      'Hộ khẩu',
      'GCNĐKKH'
    ],
    collateralDocs: [
      'Hợp đồng mua bán',
      'Hóa đơn, biên lai, chứng từ nộp tiền'
    ],
    financialProof: [
      {
        type: 'từ lương',
        docs: [
          'Hợp đồng lao động',
          'Sao kê tài khoản lương',
          'Xác nhận lương'
        ]
      },
      {
        type: 'từ kinh doanh',
        docs: [
          'Đăng ký kinh doanh',
          'Hóa đơn bán hàng',
          'Sổ sách kế toán',
          'Biên lai thuế'
        ]
      },
      {
        type: 'từ cho thuê tài sản',
        docs: [
          'Hợp đồng cho thuê nhà',
          'Hợp đồng cho thuê xe ô tô',
          'Biên lai thu tiền'
        ]
      }
    ]
  };