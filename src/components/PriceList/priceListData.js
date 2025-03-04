// Data cho bảng giá sản phẩm Economy City Văn Lâm

export const productsData = [
    {
      id: 1,
      category: 'Nhà phố thương mại',
      type: 'Nhà phố 1 mặt tiền',
      area: '75-90',
      width: '5-5.5',
      floors: '4',
      price: '8.5-10.2',
      pricePerM2: '107-110',
      hot: true
    },
    {
      id: 2,
      category: 'Nhà phố thương mại',
      type: 'Nhà phố 2 mặt tiền',
      area: '90-110',
      width: '6-7',
      floors: '4',
      price: '11.5-14.5',
      pricePerM2: '117-120',
      hot: false
    },
    {
      id: 3,
      category: 'Biệt thự',
      type: 'Biệt thự đơn lập',
      area: '200-250',
      width: '10-12',
      floors: '3',
      price: '21.5-26.5',
      pricePerM2: '107-110',
      hot: true
    },
    {
      id: 4,
      category: 'Biệt thự',
      type: 'Biệt thự song lập',
      area: '150-180',
      width: '8-10',
      floors: '3',
      price: '16.5-19.5',
      pricePerM2: '107-110',
      hot: true
    },
    {
      id: 5,
      category: 'Căn hộ cao tầng',
      type: 'Căn hộ 2 phòng ngủ',
      area: '55-65',
      width: '-',
      floors: '1',
      price: '1.9-2.3',
      pricePerM2: '33-35',
      hot: false
    },
    {
      id: 6,
      category: 'Căn hộ cao tầng',
      type: 'Căn hộ 3 phòng ngủ',
      area: '75-90',
      width: '-',
      floors: '1',
      price: '2.5-3.5',
      pricePerM2: '33-37',
      hot: true
    }
  ];
  
  // Hàm tính toán giá trị thanh toán
  export const calculatePaymentAmount = (price, percentage) => {
    return (parseFloat(price.split('-')[0]) * percentage).toFixed(1);
  };
  
  // Dữ liệu các ngân hàng đối tác
  export const bankPartners = [
    'PVCOMBANK',
    'Vietcombank',
    'BIDV',
    'Vietinbank'
  ];