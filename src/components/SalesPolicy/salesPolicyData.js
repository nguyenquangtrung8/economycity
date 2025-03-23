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