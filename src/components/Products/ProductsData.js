/**
 * src/components/Products/ProductsData.js
 * Dữ liệu cho component Products của dự án Economy City Văn Lâm
 */

const productData = [
    {
      id: 1,
      categoryId: 'shophouse',
      categoryName: 'NHÀ PHỐ THƯƠNG MẠI',
      title: 'Nhà phố thương mại',
      description: 'Không gian kinh doanh kết hợp sinh sống tiện nghi, vị trí đắc địa tại trung tâm thị trấn Như Quỳnh, thiết kế hiện đại 4-5 tầng, phù hợp kinh doanh đa ngành nghề.',
      specs: [
        { label: 'Diện tích', value: '64 - 308m²' },
        { label: 'Mặt tiền', value: '5-7m' },
        { label: 'Thiết kế', value: '4-5 tầng' },
        { label: 'Giá bán', value: 'Từ 8 tỷ đồng' }
      ],
      imageUrl: '/img/lien_ke.webp',
      imageAlt: 'Nhà phố thương mại Economy City Văn Lâm - Mặt tiền rộng rãi với thiết kế hiện đại',
      imageWidth: 800,
      imageHeight: 600,
      statusTag: {
        type: 'New',
        text: 'Mở bán'
      }
    },
    {
      id: 2,
      categoryId: 'villa',
      categoryName: 'BIỆT THỰ',
      title: 'Biệt thự sang trọng',
      description: 'Không gian sống riêng tư đẳng cấp, thiết kế hiện đại với diện tích lớn, khuôn viên rộng rãi, phù hợp cho gia đình nhiều thế hệ, đảm bảo an ninh và sự riêng tư tuyệt đối.',
      specs: [
        { label: 'Diện tích', value: '112-284m²' },
        { label: 'Thiết kế', value: 'Hiện đại, sang trọng' },
        { label: 'Không gian', value: 'Riêng tư, an ninh' },
        { label: 'Giá bán', value: 'Từ 15 tỷ đồng' }
      ],
      imageUrl: '/img/Biet_thu_economy.webp',
      imageAlt: 'Biệt thự sang trọng Economy City Văn Lâm - Không gian sống đẳng cấp',
      imageWidth: 800,
      imageHeight: 600,
      statusTag: {
        type: 'Sale',
        text: 'Ưu đãi'
      }
    },
    {
      id: 3,
      categoryId: 'apartment',
      categoryName: 'CĂN HỘ CAO TẦNG',
      title: 'Căn hộ cao tầng',
      description: 'Không gian sống hiện đại với tầm nhìn toàn cảnh khu đô thị, thiết kế tối ưu công năng, tích hợp đầy đủ tiện ích phù hợp cho gia đình trẻ và nhà đầu tư.',
      specs: [
        { label: 'Diện tích', value: '45-120m²' },
        { label: 'Tầm nhìn', value: 'Toàn cảnh khu đô thị' },
        { label: 'Thiết kế', value: 'Tối ưu công năng' },
        { label: 'Giá bán', value: 'Từ 1.5 tỷ đồng' }
      ],
      imageUrl: '/img/chung_cu_economy.webp',
      imageAlt: 'Căn hộ cao tầng Economy City Văn Lâm - Tầm nhìn toàn cảnh đô thị',
      imageWidth: 800,
      imageHeight: 600,
      statusTag: {
        type: 'New',
        text: 'Sắp mở bán'
      }
    }
  ];
  
  export default productData;