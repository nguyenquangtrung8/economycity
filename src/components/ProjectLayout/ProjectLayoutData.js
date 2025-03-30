// ProjectLayoutData.js
// Dữ liệu cấu hình cho layout dự án Economy City Văn Lâm

export const projectLayoutData = {
  // Thông tin cơ bản của dự án
  totalArea: 370000, // 37 ha = 370,000 m²
  totalBuildingDensity: 1044, // Tổng số căn thấp tầng
  overallBuildingDensity: 38, // Mật độ xây dựng chung (%)
  metaDescription: "Tổng diện tích 37 ha, gồm 1.044 căn thấp tầng và 8 tòa chung cư cao cấp, phân bố trong 4 phân khu chính.",
  masterPlanImage: "/img/layout/economy-city-master-plan.jpg", // Hình ảnh tổng thể dự án

  // Danh sách các phân khu
  zones: [
    {
      id: "cat-tuong-1",
      name: "Phân khu Cát Tường",
      status: "selling", // selling, coming-soon, sold-out
      area: 85000, // 8.5 ha
      buildingDensity: 35, // Mật độ xây dựng (%)
      description: "Phân khu Cát Tường nằm tại vị trí đắc địa của dự án, bao gồm các biệt thự đơn lập, biệt thự song lập và nhà phố liền kề với thiết kế hiện đại, không gian sống sang trọng và đẳng cấp.",
      image: "/img/layout/cat-tuong-layout.jpg",
      products: [
        {
          type: "Biệt thự đơn lập",
          count: 32,
          buildingAreaRange: [65, 70],
          areaRange: [200, 300],
          priceRange: [8500000000, 12000000000]
        },
        {
          type: "Biệt thự song lập",
          count: 48,
          buildingAreaRange: [70, 75],
          areaRange: [180, 250],
          priceRange: [7500000000, 10000000000]
        },
        {
          type: "Nhà phố liền kề",
          count: 102,
          buildingAreaRange: [80, 85],
          areaRange: [75, 120],
          priceRange: [5000000000, 7000000000]
        }
      ]
    },
    {
      id: "hung-thinh-1",
      name: "Phân khu Hưng Thịnh",
      status: "selling",
      area: 76000, // 7.6 ha
      buildingDensity: 40,
      description: "Phân khu Hưng Thịnh bao gồm các sản phẩm nhà phố thương mại (shophouse) cao cấp, là nơi lý tưởng cho cả nhu cầu ở và kinh doanh, đặc biệt là các hoạt động thương mại dịch vụ.",
      image: "/img/layout/hung-thinh-layout.jpg",
      products: [
        {
          type: "Shophouse",
          count: 86,
          buildingAreaRange: [85, 90],
          areaRange: [100, 150],
          priceRange: [9000000000, 15000000000]
        },
        {
          type: "Nhà phố liền kề",
          count: 120,
          buildingAreaRange: [80, 85],
          areaRange: [75, 120],
          priceRange: [5500000000, 7500000000]
        }
      ]
    },
    {
      id: "phu-quy-1",
      name: "Phân khu Phú Quý",
      status: "coming-soon",
      area: 62000, // 6.2 ha
      buildingDensity: 42,
      description: "Phân khu Phú Quý sẽ mở bán trong đợt tiếp theo, bao gồm các sản phẩm nhà phố cao cấp với vị trí đắc địa, gần các tiện ích công cộng và công viên trung tâm của dự án.",
      image: "/img/layout/phu-quy-layout.jpg",
      products: [
        {
          type: "Biệt thự đơn lập",
          count: 24,
          buildingAreaRange: [65, 70],
          areaRange: [220, 320],
          priceRange: [9000000000, 13000000000]
        },
        {
          type: "Nhà phố liền kề",
          count: 96,
          buildingAreaRange: [80, 85],
          areaRange: [90, 130],
          priceRange: [6000000000, 8000000000]
        }
      ]
    },
    {
      id: "an-khang-1",
      name: "Phân khu An Khang",
      status: "coming-soon",
      area: 58000, // 5.8 ha
      buildingDensity: 38,
      description: "Phân khu An Khang là khu vực với không gian sống yên tĩnh, gần gũi thiên nhiên với nhiều mảng xanh và tiện ích nội khu cao cấp, phù hợp cho các gia đình trẻ tìm kiếm môi trường sống lý tưởng.",
      image: "/img/layout/an-khang-layout.jpg",
      products: [
        {
          type: "Biệt thự song lập",
          count: 36,
          buildingAreaRange: [70, 75],
          areaRange: [180, 250],
          priceRange: [7800000000, 10500000000]
        },
        {
          type: "Nhà phố liền kề",
          count: 86,
          buildingAreaRange: [80, 85],
          areaRange: [85, 125],
          priceRange: [5500000000, 7500000000]
        }
      ]
    },
    {
      id: "cao-tang-1",
      name: "Khu Chung cư Cao tầng",
      status: "coming-soon",
      area: 89000, // 8.9 ha
      buildingDensity: 45,
      description: "Khu Chung cư Cao tầng sẽ phát triển 8 tòa chung cư hiện đại, với khoảng 4.000 căn hộ đa dạng diện tích, đáp ứng nhu cầu của nhiều đối tượng khách hàng khác nhau.",
      image: "/img/layout/chung-cu-layout.jpg",
      products: [
        {
          type: "Căn hộ 1 phòng ngủ",
          count: 1200,
          buildingAreaRange: [100, 100],
          areaRange: [45, 55],
          priceRange: [1800000000, 2200000000]
        },
        {
          type: "Căn hộ 2 phòng ngủ",
          count: 1800,
          buildingAreaRange: [100, 100],
          areaRange: [65, 80],
          priceRange: [2500000000, 3200000000]
        },
        {
          type: "Căn hộ 3 phòng ngủ",
          count: 1000,
          buildingAreaRange: [100, 100],
          areaRange: [90, 120],
          priceRange: [3500000000, 4500000000]
        }
      ]
    }
  ]
};

// Thông tin chi tiết về các khu vực đang bán
export const sellingLayoutData = {
  "cat-tuong-1": {
    detailLayoutImage: "/img/layout/cat-tuong-detail.jpg",
    sellingAreas: [
      {
        name: "Cát Tường 1 - 17.5M",
        totalCount: 36,
        availableCount: 14,
        description: "Dãy biệt thự đơn lập và song lập với vị trí đắc địa nhất khu Cát Tường, view công viên và hồ điều hòa.",
        priceRange: [8500000000, 12000000000],
      },
      {
        name: "Cát Tường 2 - 15.5M",
        totalCount: 42,
        availableCount: 18,
        description: "Dãy biệt thự song lập và nhà phố với thiết kế hiện đại, không gian sống tiện nghi và đẳng cấp.",
        priceRange: [7000000000, 10000000000],
      },
      {
        name: "Cát Tường 3 - 15.5M",
        totalCount: 48,
        availableCount: 12,
        description: "Dãy nhà phố liền kề với thiết kế tối ưu, phù hợp cho cả nhu cầu ở và đầu tư cho thuê.",
        priceRange: [5000000000, 7000000000],
      },
      {
        name: "Cát Tường 4 - 15.5M",
        totalCount: 56,
        availableCount: 12,
        description: "Khu nhà phố thương mại kết hợp, vị trí đẹp gần trục đường chính, phù hợp kinh doanh.",
        priceRange: [6000000000, 8000000000],
      }
    ],
    // Thêm thông tin chi tiết về loại sản phẩm cho phân khu Cát Tường
    productStats: {
      totalLots: 182,
      availableLots: 56,
      productTypes: [
        { 
          type: "Biệt thự đơn lập", 
          total: 32, 
          available: 12, 
          icon: "HomeIcon",
          areaRange: [200, 300], // Diện tích từ 200-300m²
          priceRange: [8500000000, 12000000000] // Giá từ 8.5-12 tỷ
        },
        { 
          type: "Biệt thự song lập", 
          total: 48, 
          available: 16, 
          icon: "BuildingIcon",
          areaRange: [180, 250], // Diện tích từ 180-250m² 
          priceRange: [7500000000, 10000000000] // Giá từ 7.5-10 tỷ
        },
        { 
          type: "Nhà phố liền kề", 
          total: 102, 
          available: 28, 
          icon: "StoreIcon",
          areaRange: [75, 120], // Diện tích từ 75-120m²
          priceRange: [5000000000, 7000000000] // Giá từ 5-7 tỷ 
        }
      ]
    }
  },
  "hung-thinh-1": {
    detailLayoutImage: "/img/layout/hung-thinh-detail.jpg",
    sellingAreas: [
      {
        name: "Hưng Thịnh A",
        totalCount: 40,
        availableCount: 22,
        description: "Dãy shophouse vị trí đắc địa nhất dự án, mặt tiền đường lớn, phù hợp kinh doanh đa ngành nghề.",
        priceRange: [9000000000, 15000000000],
      },
      {
        name: "Hưng Thịnh B",
        totalCount: 46,
        availableCount: 18,
        description: "Shophouse và nhà phố thương mại tích hợp, có mặt tiền rộng và không gian kinh doanh linh hoạt.",
        priceRange: [8500000000, 12000000000],
      },
      {
        name: "Hưng Thịnh C",
        totalCount: 62,
        availableCount: 24,
        description: "Nhà phố liền kề với thiết kế phù hợp cho cả kinh doanh và sinh sống, vị trí gần tiện ích nội khu.",
        priceRange: [5500000000, 7500000000],
      },
      {
        name: "Hưng Thịnh D",
        totalCount: 58,
        availableCount: 16,
        description: "Nhà phố liền kề thiết kế hiện đại, không gian tối ưu cho gia đình nhiều thế hệ.",
        priceRange: [5800000000, 7200000000],
      }
    ],
    productStats: {
      totalLots: 206,
      availableLots: 80,
      productTypes: [
        { 
          type: "Shophouse", 
          total: 86, 
          available: 40, 
          icon: "StoreIcon",
          areaRange: [100, 150], // Diện tích từ 100-150m²
          priceRange: [9000000000, 15000000000] // Giá từ 9-15 tỷ
        },
        { 
          type: "Nhà phố liền kề", 
          total: 120, 
          available: 40, 
          icon: "BuildingIcon",
          areaRange: [75, 120], // Diện tích từ 75-120m²
          priceRange: [5500000000, 7500000000] // Giá từ 5.5-7.5 tỷ
        }
      ]
    }
  }
};