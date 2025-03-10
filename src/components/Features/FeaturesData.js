/**
 * src/components/Features/FeaturesData.js
 * Dữ liệu cho component Features của dự án Economy City Văn Lâm
 */

const featureData = [
  {
    id: 1,
    categoryId: 'location',
    categoryName: 'VỊ TRÍ CHIẾN LƯỢC',
    title: 'Trung tâm kết nối',
    description: 'Tọa lạc tại trung tâm thị trấn Như Quỳnh, huyện Văn Lâm, cách trung tâm Hà Nội 18km, cách Ocean Park 5km với kết nối trực tiếp đến Quốc lộ 5A, Vành đai 3.5 và Vành đai 4.',
    benefits: [
      { label: 'Vị trí', value: 'Trung tâm thị trấn' },
      { label: 'Kết nối', value: 'Quốc lộ 5A, Vành đai 3.5, 4' },
      { label: 'Thời gian về Hà Nội', value: '20-25 phút' },
      { label: 'Tiếp giáp', value: '8 KCN lớn & 30 làng nghề' }
    ],
    imageUrl: '/img/Lienketvung.jpg',
    imageAlt: 'Vị trí chiến lược Economy City Văn Lâm - Kết nối giao thông thuận tiện với các trục đường lớn',
    imageWidth: 800,
    imageHeight: 600
  },
  {
    id: 2,
    categoryId: 'amenities',
    categoryName: 'TIỆN ÍCH ĐA DẠNG',
    title: 'Sống trọn vẹn mỗi ngày',
    description: 'Đô thị hiện đại 37ha với quảng trường trung tâm 5.6ha, hồ điều hòa 1.2ha, clubhouse 2.000m² và hệ thống 30 tiện ích đồng bộ đáp ứng mọi nhu cầu sinh hoạt.',
    benefits: [
      { label: 'Quảng trường', value: '5.6 ha' },
      { label: 'Hồ điều hòa', value: '1.2 ha' },
      { label: 'Clubhouse', value: '2.000m²' },
      { label: 'Số tiện ích', value: '30+ tiện ích đồng bộ' }
    ],
    imageUrl: '/img/Tienich.png',
    imageAlt: 'Tiện ích đa dạng tại Economy City Văn Lâm - Không gian sống chất lượng và đồng bộ',
    imageWidth: 800,
    imageHeight: 600
  },
  {
    id: 3,
    categoryId: 'investment',
    categoryName: 'GIÁ TRỊ ĐẦU TƯ',
    title: 'Đầu tư sinh lời bền vững',
    description: 'Với giá chỉ từ 107 triệu/m² (thấp hơn 35% so với dự án Vinhomes trong khu vực), pháp lý đầy đủ với sổ đỏ sở hữu lâu dài và tiềm năng tăng giá khi Văn Lâm lên thành phố năm 2030.',
    benefits: [
      { label: 'Giá bán', value: 'Từ 107 triệu/m²' },
      { label: 'So với khu vực', value: 'Thấp hơn 35%' },
      { label: 'Pháp lý', value: 'Sổ đỏ lâu dài' },
      { label: 'Tiềm năng', value: 'Văn Lâm lên TP năm 2030' }
    ],
    imageUrl: '/img/Giatri.png',
    imageAlt: 'Cơ hội đầu tư sinh lời tại Economy City Văn Lâm - Tiềm năng tăng giá khi Văn Lâm lên thành phố',
    imageWidth: 800,
    imageHeight: 600
  }
];

export default featureData;