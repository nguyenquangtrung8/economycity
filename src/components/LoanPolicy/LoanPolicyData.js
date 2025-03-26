// LoanPolicyData.js
export const bankOptions = [
  {
    id: 'vietinbank',
    name: 'VietinBank',
    description: 'Ngân hàng TMCP Công Thương Việt Nam',
    color: '#1a4996'
  },
  {
    id: 'bidv',
    name: 'BIDV', 
    description: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam',
    color: '#00a79d'
  },
  {
    id: 'pvcombank',
    name: 'PVCombank',
    description: 'Ngân hàng TMCP Đại chúng Việt Nam',
    color: '#f0c141'
  },
  {
    id: 'vietcombank',
    name: 'Vietcombank',
    description: 'Ngân hàng TMCP Ngoại thương Việt Nam',
    color: '#1a873a'
  }
];

// Thông tin hỗ trợ cho từng ngân hàng
export const bankSupport = {
  vietinbank: {
    mainSupport: [
      {
        title: 'Thời gian vay tối đa',
        value: '35 năm (420 tháng)'
      },
      {
        title: 'Tỷ lệ cho vay/TSBĐ',
        value: '70% (thế chấp bằng tài sản hình thành từ vốn vay)'
      },
      {
        title: 'Thời gian phê duyệt',
        value: 'Tối đa 02 ngày làm việc'
      },
      {
        title: 'Thẩm quyền phê duyệt',
        value: 'Tối đa 25 tỷ/Khách hàng'
      }
    ],
    interestSupport: [
      {
        title: 'Trong thời gian HTLS',
        value: 'Lãi suất ưu đãi 0%/năm trong 18 tháng'
      },
      {
        title: 'Sau thời gian HTLS',
        value: 'LSCS kỳ hạn 12 tháng + 3.5%/năm'
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
      },
      {
        period: 'Đặc biệt',
        fee: 'Miễn phí khi KH mới tiếp tục vay'
      }
    ]
  },
  
  bidv: {
    mainSupport: [
      {
        title: 'Thời gian vay tối đa',
        value: '30 năm (360 tháng)'
      },
      {
        title: 'Tỷ lệ cho vay/TSBĐ',
        value: '70% (thế chấp bằng tài sản) hoặc 100% (thế chấp bằng BĐS đã GCN)'
      }
    ],
    interestSupport: [
      {
        title: 'Trong thời gian HTLS',
        value: 'Lãi suất ưu đãi 0%/năm trong 18 tháng'
      },
      {
        title: 'Sau thời gian HTLS',
        value: 'LS tiết kiệm 24 tháng + 3%/năm'
      }
    ],
    nonParticipation: [
      {
        duration: '12 tháng',
        rate: '6.0%/năm'
      },
      {
        duration: '18 tháng',
        rate: '6.3%/năm'
      },
      {
        duration: '24 tháng',
        rate: '6.5%/năm'
      }
    ],
    prepaymentFees: [
      {
        period: 'Năm thứ 1-2',
        fee: '1%'
      },
      {
        period: 'Năm thứ 3-5',
        fee: '0.5%'
      },
      {
        period: 'Từ năm 6',
        fee: '0.5%'
      }
    ]
  },
  
  pvcombank: {
    mainSupport: [
      {
        title: 'Thời gian vay tối đa',
        value: '30 năm (360 tháng)'
      },
      {
        title: 'Tỷ lệ cho vay/TSBĐ',
        value: '75% HĐMB (CĐT hỗ trợ lãi suất 18 tháng đầu), 80% HĐMB (không hỗ trợ LS)'
      },
      {
        title: 'Thời gian phê duyệt',
        value: 'Tối đa 24 tiếng kể từ khi nhận đủ hồ sơ'
      },
      {
        title: 'Thẩm quyền phê duyệt',
        value: 'Tối đa 5 tỷ/Khách hàng'
      }
    ],
    interestSupport: [
      {
        title: 'Trong thời gian HTLS',
        value: 'Lãi suất ưu đãi 0%/năm trong 18 tháng'
      },
      {
        title: 'Sau thời gian HTLS',
        value: 'LSCS + 3.0%/năm'
      },
      {
        title: 'Đặc điểm nổi bật',
        value: 'Phê duyệt chủ trương ngay khi KH đặt cọc, vay dưới 50% chỉ cần kê khai theo mẫu'
      },
      {
        title: 'Dịch vụ đặc biệt',
        value: 'Cung cấp được dịch vụ chứng thư bảo lãnh theo từng sản phẩm (phí 1%)'
      }
    ],
    nonParticipation: [
      {
        duration: '12 tháng',
        rate: '6.2%/năm'
      },
      {
        duration: '18 tháng',
        rate: '6.99%/năm'
      },
      {
        duration: '24 tháng',
        rate: '7.99%/năm'
      },
      {
        duration: '36 tháng',
        rate: '8.99%/năm'
      }
    ],
    prepaymentFees: [
      {
        period: 'Năm thứ 1-2',
        fee: '3% - 3.5%'
      },
      {
        period: 'Năm thứ 3-5',
        fee: '1.5% - 2.5%'
      },
      {
        period: 'Từ năm thứ 6',
        fee: 'Miễn phí'
      },
      {
        period: 'Đặc biệt',
        fee: 'Miễn phí khi KH mới tiếp tục vay trong thời gian HTLS'
      }
    ]
  },
  
  vietcombank: {
    mainSupport: [
      {
        title: 'Thời gian vay tối đa',
        value: '30 năm (360 tháng)'
      },
      {
        title: 'Tỷ lệ cho vay/TSBĐ',
        value: '70% (thế chấp bằng tài sản hình thành từ vốn vay), 80% (với tài sản khác)'
      },
      {
        title: 'Thời gian phê duyệt',
        value: 'Tối đa 24 tiếng kể từ khi nhận đủ hồ sơ'
      },
      {
        title: 'Thẩm quyền phê duyệt',
        value: 'Tối đa 25 tỷ/Khách hàng'
      }
    ],
    interestSupport: [
      {
        title: 'Trong thời gian HTLS',
        value: 'Lãi suất ưu đãi 0%/năm trong 18 tháng'
      },
      {
        title: 'Sau thời gian HTLS',
        value: 'Lãi suất tiết kiệm 24 tháng trả sau của VCB + 3.5%/năm'
      }
    ],
    nonParticipation: [
      {
        duration: '12 tháng',
        rate: '6.0%/năm'
      },
      {
        duration: '18 tháng',
        rate: '6.3%/năm'
      },
      {
        duration: '24 tháng',
        rate: '6.5%/năm'
      },
      {
        duration: '36 tháng',
        rate: '8.0%/năm'
      }
    ],
    prepaymentFees: [
      {
        period: 'Năm thứ 1-2',
        fee: '1%'
      },
      {
        period: 'Năm thứ 3-5',
        fee: '0.5%'
      },
      {
        period: 'Từ năm thứ 6',
        fee: 'Miễn phí'
      },
      {
        period: 'Đặc biệt',
        fee: 'Miễn phí khi khách hàng mới tiếp tục vay'
      }
    ]
  }
};

// Hồ sơ vay vốn - chung cho mọi ngân hàng
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