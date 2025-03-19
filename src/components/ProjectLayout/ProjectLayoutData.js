// ProjectLayoutData.js
export const projectLayoutData = {
    id: "economy-city",
    name: "Economy City Văn Lâm",
    totalArea: 37,
    // SVG viewBox cho bản đồ tổng thể
    svgViewBox: "0 0 1000 800",
    // Hình ảnh bản đồ tổng thể
    masterPlanImage: "/img/master-plan.webp",
    // Các phân khu
    zones: [
      {
        id: "zone-a",
        name: "Phân khu A",
        area: 95000,
        buildingDensity: 65,
        status: "selling", // đang mở bán
        // Tọa độ vẽ đa giác cho phân khu
        coordinates: {
          // Các điểm tạo thành hình đa giác - format: "x1,y1 x2,y2 x3,y3..."
          polygon: "120,150 320,180 380,300 300,350 180,320 120,150",
          // Vị trí hiển thị tên phân khu
          labelPosition: {x: 220, y: 250}
        },
        description: "Phân khu phía Đông với không gian sống hiện đại, nhiều tiện ích và không gian xanh. Gần trục đường chính và dễ dàng kết nối với khu vực trung tâm.",
        products: [
          {
            type: "Biệt thự",
            count: 32,
            areaRange: [250, 300],
            priceRange: [25000000000, 35000000000]
          },
          {
            type: "Liền kề",
            count: 124,
            areaRange: [170, 210],
            priceRange: [15000000000, 21000000000]
          }
        ],
        image: "/img/zone-a.webp"
      },
      {
        id: "zone-b",
        name: "Phân khu B",
        area: 85000,
        buildingDensity: 70,
        status: "coming-soon", // sắp mở bán
        coordinates: {
          polygon: "450,180 650,200 700,350 600,380 450,180",
          labelPosition: {x: 550, y: 280}
        },
        description: "Phân khu trung tâm với nhiều tiện ích cao cấp, bao gồm shophouse và nhà phố thương mại. Vị trí đắc địa, phù hợp cho cả ở và kinh doanh.",
        products: [
          {
            type: "Nhà phố thương mại",
            count: 80,
            areaRange: [85, 120],
            priceRange: [9000000000, 15000000000]
          },
          {
            type: "Căn hộ cao tầng",
            count: 800,
            areaRange: [45, 120],
            priceRange: [1800000000, 5500000000]
          }
        ],
        image: "/img/zone-b.webp"
      },
      {
        id: "zone-c",
        name: "Phân khu C",
        area: 75000,
        buildingDensity: 60,
        status: "sold-out", // đã bán hết
        coordinates: {
          polygon: "250,420 470,400 450,580 230,550 250,420",
          labelPosition: {x: 350, y: 500}
        },
        description: "Phân khu đầu tiên của dự án đã bán hết, bao gồm nhà phố và liền kề. Môi trường sống đã hình thành, nhiều cư dân đã chuyển đến sinh sống.",
        products: [
          {
            type: "Nhà phố",
            count: 96,
            areaRange: [80, 110],
            priceRange: [8500000000, 12000000000]
          },
          {
            type: "Liền kề",
            count: 68,
            areaRange: [150, 180],
            priceRange: [13000000000, 18000000000]
          }
        ],
        image: "/img/zone-c.webp"
      },
      {
        id: "zone-d",
        name: "Phân khu D",
        area: 115000,
        buildingDensity: 55,
        status: "coming-soon", // sắp mở bán
        coordinates: {
          polygon: "550,420 780,450 750,600 520,580 550,420",
          labelPosition: {x: 650, y: 520}
        },
        description: "Phân khu cao cấp nhất với mật độ xây dựng thấp, nhiều không gian xanh và biệt thự sang trọng. Phù hợp cho những khách hàng tìm kiếm không gian riêng tư.",
        products: [
          {
            type: "Biệt thự đơn lập",
            count: 28,
            areaRange: [280, 350],
            priceRange: [30000000000, 45000000000]
          },
          {
            type: "Biệt thự song lập",
            count: 42,
            areaRange: [220, 260],
            priceRange: [22000000000, 29000000000]
          },
          {
            type: "Biệt thự phố",
            count: 56,
            areaRange: [200, 240],
            priceRange: [18000000000, 24000000000]
          }
        ],
        image: "/img/zone-d.webp"
      }
    ],
    
    // Các tiện ích chính
    amenities: {
      centralPlaza: {
        area: 5.6, 
        coordinates: {
          polygon: "400,300 600,320 580,400 380,380 400,300",
          labelPosition: {x: 490, y: 350}
        }
      },
      lake: {
        area: 1.2, 
        coordinates: {
          polygon: "450,500 600,520 580,640 430,620 450,500",
          labelPosition: {x: 520, y: 570}
        }
      },
      clubhouse: {
        area: 2000, 
        coordinates: {
          polygon: "350,400 430,410 420,470 340,460 350,400",
          labelPosition: {x: 385, y: 435}
        }
      }
    }
  };