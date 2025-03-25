/**
 * Dữ liệu mặt bằng dự án Economy City Văn Lâm
 * @typedef {Object} ProjectZone
 * @property {string} id - ID định danh phân khu
 * @property {string} name - Tên phân khu
 * @property {number} area - Diện tích (m²)
 * @property {number} buildingDensity - Mật độ xây dựng (%)
 * @property {'selling'|'coming-soon'|'sold-out'} status - Trạng thái phân khu
 * @property {string} description - Mô tả phân khu
 * @property {Array<{type: string, count: number, areaRange: number[], priceRange: number[]}>} products - Sản phẩm
 * @property {string} image - Đường dẫn hình ảnh phân khu
 */

/**
 * Dữ liệu mặt bằng tổng thể dự án
 * @type {Object}
 */
export const projectLayoutData = {
  id: "economy-city",
  name: "Economy City Văn Lâm",
  totalArea: 37,
  // Metadata cho SEO
  metaTitle: "Economy City Văn Lâm - Mặt bằng tổng thể dự án",
  metaDescription: "Khám phá mặt bằng tổng thể dự án Economy City Văn Lâm với tổng diện tích 37ha, bao gồm 4 phân khu chức năng với mật độ xây dựng thấp và nhiều không gian xanh.",
  // Hình ảnh bản đồ tổng thể - đã tối ưu hóa
  masterPlanImage: "/img/mat-bang-economy-city.png",
  // Các phân khu
  zones: [
    {
      id: "zone-a",
      name: "Phân khu Phú Quý",
      area: 95000,
      buildingDensity: 226,
      status: "selling", // đang mở bán
      description: "Phân khu phía Đông với không gian sống hiện đại, nhiều tiện ích và không gian xanh. Gần trục đường chính và dễ dàng kết nối với khu vực trung tâm.",
      products: [
        {
          type: "Biệt thự",
          count: 68,
          areaRange: [250, 300],
          priceRange: [25000000000, 35000000000]
        },
        {
          type: "Liền kề",
          count: 158,
          areaRange: [170, 210],
          priceRange: [15000000000, 21000000000]
        }
      ],
      image: "/img/phu-quy-economy-city.jpeg"
    },
    {
      id: "zone-b",
      name: "Phân khu Cát Tường",
      area: 85000,
      buildingDensity: 296,
      status: "coming-soon", // sắp mở bán
      description: "Phân khu trung tâm với nhiều tiện ích cao cấp, bao gồm shophouse và nhà phố thương mại. Vị trí đắc địa, phù hợp cho cả ở và kinh doanh.",
      products: [
        {
          type: "Nhà phố thương mại",
          count: 296,
          areaRange: [85, 120],
          priceRange: [9000000000, 15000000000]
        },
      ],
      image: "/img/cat-tuong-economy-city.jpeg"
    },
    {
      id: "zone-c",
      name: "Phân khu Hưng Thịnh",
      area: 75000,
      buildingDensity: 256,
      status: "sold-out", // đã bán hết
      description: "Phân khu đầu tiên của dự án đã bán hết, bao gồm nhà phố và liền kề. Môi trường sống đã hình thành, nhiều cư dân đã chuyển đến sinh sống.",
      products: [
        {
          type: "Biêt thự",
          count: 32,
          areaRange: [80, 110],
          priceRange: [8500000000, 12000000000]
        },
        {
          type: "Liền kề",
          count: 224,
          areaRange: [150, 180],
          priceRange: [13000000000, 18000000000]
        }
      ],
      image: "/img/hung-thinh-economy-city.jpeg"
    },
    {
      id: "zone-d",
      name: "Phân khu Thịnh Vượng",
      area: 115000,
      buildingDensity: 237,
      status: "coming-soon", // sắp mở bán
      description: "Phân khu cao cấp nhất với mật độ xây dựng thấp, nhiều không gian xanh và biệt thự sang trọng. Phù hợp cho những khách hàng tìm kiếm không gian riêng tư.",
      products: [
        {
          type: "Biệt thự",
          count: 131,
          areaRange: [280, 350],
          priceRange: [30000000000, 45000000000]
        },
        {
          type: "Liền kề",
          count: 106,
          areaRange: [220, 260],
          priceRange: [22000000000, 29000000000]
        },
      ],
      image: "/img/thinh-vuong-economy-city.jpeg"
    }
  ],
  
  // Các tiện ích chính - đã loại bỏ polygon không cần thiết
  amenities: {
    centralPlaza: {
      name: "Quảng trường trung tâm",
      area: 5.6
    },
    lake: {
      name: "Hồ điều hòa",
      area: 1.2
    },
    clubhouse: {
      name: "Clubhouse",
      area: 2000
    }
  }
};

// Cũng xuất ra mặc định để linh hoạt hơn
export default projectLayoutData;