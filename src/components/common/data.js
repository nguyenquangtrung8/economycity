// src/components/EconomyCityLanding/common/data.js

export const projectData = {
  name: "Economy City Văn Lâm",
  developer: "Hoàng Vương",
  location: "Thị trấn Như Quỳnh, huyện Văn Lâm, tỉnh Hưng Yên",
  totalArea: "37 ha",
  contactInfo: {
    hotline: "0988.156.516",
    website: "www.economycity.vn",
    email: "sales@economycity.vn",
    address: "Thị trấn Như Quỳnh, Văn Lâm, Hưng Yên",
    workingHours: "8:00 - 17:30 (Thứ 2 - Chủ nhật)"
  }
};

export const overviewData = {
  scale: {
    lowRise: "1.044 căn",
    highRise: "8 tòa chung cư (khoảng 4.000 căn hộ)",
    buildingDensity: "Đảm bảo không gian sống thoáng đãng"
  },
  vision: "Trở thành khu đô thị kiểu mẫu phía Đông Hà Nội",
  standard: "Không gian sống hiện đại, tiện nghi cho cộng đồng cư dân văn minh",
  strategy: "Kết hợp không gian sống và làm việc, đáp ứng nhu cầu của cư dân đô thị hiện đại"
};

export const locationData = {
  geographicLocation: {
    description: "Tọa lạc tại trung tâm thị trấn Như Quỳnh, huyện Văn Lâm, tỉnh Hưng Yên",
    distanceToHanoi: "18km",
    distanceToOceanPark: "5km"
  },
  transportation: {
    roads: "Kết nối trực tiếp với Quốc lộ 5A, Vành đai 3.5, Vành đai 4",
    railways: "Gần tuyến đường sắt đô thị số 1, đường sắt Bắc Nam",
    travelTime: {
      toHanoi: "20-25 phút",
      toIndustrialZones: "10-15 phút",
      toNoiBaiAirport: "40-45 phút"
    }
  },
  regionalConnections: {
    industrialZones: "Tiếp giáp 8 khu công nghiệp lớn và 30 làng nghề",
    publicFacilities: "Gần trung tâm hành chính huyện, trung tâm thương mại, trường học, bệnh viện"
  },
  developmentPotential: {
    satelliteTown: "Nằm trong quy hoạch phát triển đô thị vệ tinh của Hà Nội",
    cityStatusPlanned: "Văn Lâm dự kiến lên thành phố vào năm 2030",
    infrastructureInvestment: "Hưởng lợi từ làn sóng đầu tư hạ tầng: Vành đai 4, cao tốc Hà Nội - Hải Phòng mở rộng"
  }
};

export const amenitiesData = {
  masterPlan: {
    area: "37 ha chia thành 4 phân khu chức năng",
    buildingDensity: "Đảm bảo cảnh quan thoáng đãng",
    planning: "Theo mô hình đô thị hiện đại, đồng bộ"
  },
  internalAmenities: {
    centralSquare: "5.6 ha",
    lake: "1.2 ha",
    clubhouse: "2.000m² với đầy đủ tiện ích cao cấp",
    amenities: [
      "Khu thể thao ngoài trời",
      "Không gian xanh",
      "Khu vui chơi trẻ em",
      "Đường dạo bộ",
      "Khu BBQ ngoài trời"
    ]
  },
  publicFacilities: {
    education: "Trường mầm non, tiểu học, THCS trong khu đô thị",
    healthcare: "Trung tâm y tế, phòng khám",
    commercial: "Trung tâm thương mại, cửa hàng tiện lợi, siêu thị",
    services: "Ngân hàng, bưu điện, công trình hành chính"
  },
  security: {
    surveillance: "Hệ thống camera giám sát 24/7, đội ngũ bảo vệ chuyên nghiệp",
    management: "Dịch vụ quản lý chuyên nghiệp, đảm bảo môi trường sống văn minh"
  }
};

// Dữ liệu sản phẩm cho component Products
export const productData = [
  {
    id: 1,
    type: "Biệt thự",
    tag: "Sang trọng",
    description: "Không gian riêng tư sang trọng, thiết kế hiện đại, mang đến cuộc sống đẳng cấp cho gia đình.",
    area: "200-300m²",
    frontage: "10-15m",
    floors: "3 tầng",
    price: "Từ 15 tỷ đồng",
    imageRatio: "3/2",
    imageUrl: "/img/Bietthu.jpg",
    imageAlt: "Biệt thự sang trọng tại Economy City Văn Lâm"
  },
  {
    id: 2,
    type: "Nhà phố thương mại",
    tag: "Đa công năng",
    description: "Đa dạng sản phẩm đáp ứng mọi nhu cầu: từ ở thực đến kinh doanh và đầu tư sinh lời.",
    area: "75-120m²",
    frontage: "5-7m",
    floors: "4-5 tầng",
    price: "Từ 10 tỷ đồng",
    imageRatio: "4/3",
    imageUrl: "/img/Lienke.png",
    imageAlt: "Nhà phố thương mại Economy City Văn Lâm"
  },
  {
    id: 3,
    type: "Căn hộ cao tầng",
    tag: "Hiện đại",
    description: "Tầm nhìn toàn cảnh khu đô thị, thiết kế tối ưu công năng, phù hợp nhu cầu ở và đầu tư.",
    area: "45-120m²",
    frontage: "N/A",
    floors: "Đa dạng",
    price: "Từ 2.5 tỷ đồng",
    imageRatio: "16/9",
    imageUrl: "/img/Chungcu.jpg",
    imageAlt: "Căn hộ cao tầng tại Economy City Văn Lâm"
  }
];

export const productsData = {
  products: [
    {
      type: "Nhà phố thương mại",
      area: "75-120m²",
      frontage: "5-7m",
      design: "4-5 tầng",
      function: "Kết hợp ở và kinh doanh",
      image: "product-1.jpg"
    },
    {
      type: "Biệt thự",
      area: "200-300m²",
      design: "Hiện đại, sang trọng",
      space: "Riêng tư, an ninh",
      image: "product-2.jpg"
    },
    {
      type: "Căn hộ cao tầng",
      area: "45-120m²",
      view: "Toàn cảnh khu đô thị",
      design: "Tối ưu công năng",
      image: "product-3.jpg"
    }
  ],
  designFeatures: {
    architecture: "Hiện đại, thông minh",
    function: "Tối ưu không gian sử dụng",
    quality: "Vật liệu cao cấp, bền vững",
    amenities: "Hệ thống kỹ thuật đồng bộ"
  },
  investmentValue: {
    price: "Từ 107 triệu/m² (thấp hơn 35% so với dự án của Vinhomes trong khu vực)",
    liquidity: "Cao nhờ vị trí trung tâm thị trấn",
    growthPotential: "Lớn khi Văn Lâm lên thành phố năm 2030",
    rentalOpportunity: "Hấp dẫn với đối tượng chuyên gia, kỹ sư làm việc tại các KCN lân cận"
  }
};

export const legalData = {
  projectLegal: {
    decision125: "UBND tỉnh Hưng Yên chấp thuận chủ trương đầu tư",
    decision2079: "Điều chỉnh quy hoạch 1/500 được phê duyệt",
    document119: "Xác nhận đủ điều kiện bán hàng",
    redBook: "Sở hữu lâu dài"
  },
  bankGuarantee: {
    bank: "PVCOMBANK - Ngân hàng TMCP Đại chúng Việt Nam",
    scope: "Toàn bộ dự án Economy City Văn Lâm",
    meaning: "Đảm bảo hoàn trả 100% số tiền khách hàng đã thanh toán trong trường hợp chủ đầu tư không thực hiện đúng cam kết"
  },
  financialInstitutions: {
    banks: ["Vietcombank", "Vietinbank", "BIDV", "PVCOMBANK"],
    significance: [
      "Dự án đã vượt qua quy trình thẩm định nghiêm ngặt",
      "Minh chứng cho tính minh bạch của dự án",
      "Xác nhận tính khả thi từ các chuyên gia tài chính độc lập"
    ]
  }
};

export const salesPolicyData = {
  promotions: [
    {
      code: "CS1",
      description: "Thanh toán sớm 70% giá trị HĐMB trong vòng 40 ngày kể từ ngày ký kết HĐĐC",
      discount: "Chiết khấu 0.5%"
    },
    {
      code: "CS2",
      description: "Thanh toán sớm 95% giá trị HĐMB trong vòng 40 ngày kể từ ngày ký kết HĐĐC",
      discount: "Chiết khấu 1.0%"
    },
    {
      code: "Ưu đãi đặc biệt",
      description: "Khách hàng không vay vốn và không nhận gói hỗ trợ 0%",
      discount: "Chiết khấu 6% giá trị HĐMB"
    }
  ],
  paymentMethods: {
    standard: [
      { phase: "Đặt cọc", time: "Ký kết thỏa thuận đặt cọc", payment: "200.000.000đ" },
      { phase: "Đợt 1", time: "10 ngày kể từ ngày ký kết TTĐC", payment: "Ký kết HĐCN + 10% giá trị HĐMB" },
      { phase: "Đợt 2", time: "30 ngày kể từ ngày ký kết HĐCN", payment: "20% giá trị HĐMB" },
      { phase: "Đợt 3", time: "60 ngày kể từ ngày ký kết HĐCN", payment: "10% giá trị HĐMB" },
      { phase: "Đợt 4", time: "90 ngày kể từ ngày ký kết HĐCN", payment: "10% giá trị HĐMB" },
      { phase: "Đợt 5", time: "120 ngày kể từ ngày ký kết HĐCN", payment: "10% giá trị HĐMB" },
      { phase: "Đợt 6", time: "150 ngày kể từ ngày ký kết HĐCN", payment: "10% giá trị HĐMB" },
      { phase: "Đợt 7", time: "180 ngày kể từ ngày ký kết HĐCN", payment: "25% giá trị HĐMB + ký quỹ 5% làm GCNQSDĐ khi có TBBGN" }
    ],
    early70: [
      { phase: "Đặt cọc", time: "Ký kết thỏa thuận đặt cọc", payment: "200.000.000đ" },
      { phase: "Đợt 1", time: "10 ngày kể từ ngày ký kết TTĐC", payment: "Ký kết HĐCN + 10% giá trị HĐMB" },
      { phase: "Đợt 2", time: "30 ngày kể từ ngày ký kết HĐCN", payment: "60% giá trị HĐMB" },
      { phase: "Đợt 3", time: "180 ngày kể từ ngày ký kết HĐCN", payment: "25% giá trị HĐMB + ký quỹ 5% làm GCNQSDĐ khi có TBBGN" }
    ],
    early95: [
      { phase: "Đặt cọc", time: "Ký kết thỏa thuận đặt cọc", payment: "200.000.000đ" },
      { phase: "Đợt 1", time: "10 ngày kể từ ngày ký kết TTĐC", payment: "Ký kết HĐCN + 10% giá trị HĐMB" },
      { phase: "Đợt 2", time: "30 ngày kể từ ngày ký kết HĐCN", payment: "85% giá trị HĐMB" },
      { phase: "Đợt 3", time: "180 ngày kể từ ngày ký kết HĐCN", payment: "Ký quỹ 5% làm GCNQSDĐ khi có TBBGN" }
    ]
  }
};

export const featuresData = [
  {
    title: "VỊ TRÍ CHIẾN LƯỢC",
    description: "Tọa lạc tại trung tâm thị trấn Như Quỳnh, cách Hà Nội 18km. Kết nối trực tiếp với Quốc lộ 5A, Vành đai 3.5, Vành đai 4, và gần tuyến đường sắt đô thị.",
    highlights: [
      "Tiếp giáp 8 khu công nghiệp lớn và 30 làng nghề",
      "Gần trung tâm hành chính huyện",
      "Di chuyển về Hà Nội chỉ 20-25 phút"
    ]
  },
  {
    title: "TIỆN ÍCH ĐẲNG CẤP",
    description: "37 ha quy hoạch theo mô hình đô thị hiện đại với hệ thống 30 tiện ích đồng bộ, đáp ứng mọi nhu cầu của cư dân.",
    highlights: [
      "Quảng trường trung tâm 5.6 ha",
      "Hồ điều hòa 1.2 ha",
      "Clubhouse 2.000m² với đầy đủ tiện ích cao cấp"
    ]
  },
  {
    title: "GIÁ TRỊ ĐẦU TƯ BỀN VỮNG",
    description: "Mức giá chỉ từ 107 triệu/m², thấp hơn 35% so với các dự án cạnh tranh cùng khu vực, cùng tiềm năng tăng giá khi Văn Lâm lên thành phố năm 2030.",
    highlights: [
      "Pháp lý hoàn chỉnh, sổ đỏ lâu dài",
      "Bảo lãnh bởi PVCOMBANK",
      "Các ngân hàng lớn tham gia cấp tín dụng"
    ]
  }
];

export const galleryImages = [
  { 
    id: 'overview', 
    src: "tam_diem_giao_thuong_economy.webp", 
    alt: "Phối cảnh dự án Economy City Văn Lâm" 
  },
  { 
    id: 'square', 
    src: "45.webp", 
    alt: "Phối cảnh quảng trường trung tâm" 
  },
  { 
    id: 'shophouse', 
    src: "lien_ke.webp", 
    alt: "Phối cảnh nhà phố thương mại" 
  },
  { 
    id: 'villa', 
    src: "03.webp", 
    alt: "Phối cảnh biệt thự" 
  },
  { 
    id: 'apartment', 
    src: "Chungcu.jpg", 
    alt: "Phối cảnh căn hộ cao tầng" 
  },
  { 
    id: 'facilities', 
    src: "tien_ich_noi_khu.webp", 
    alt: "Phối cảnh tiện ích nội khu" 
  },
  { 
    id: 'park', 
    src: "17.webp", 
    alt: "Công viên xanh mát" 
  },
  { 
    id: 'clubhouse', 
    src: "5.webp", 
    alt: "Clubhouse đẳng cấp" 
  }
];

export const targetCustomers = [
  {
    type: "Nhà đầu tư",
    characteristics: [
      "Ngân sách đầu tư: 10-30 tỷ đồng",
      "Tìm kiếm sản phẩm có tiềm năng tăng giá tốt",
      "Mục tiêu đầu tư trung và dài hạn"
    ],
    needs: "Sinh lời kép từ tăng giá và cho thuê"
  },
  {
    type: "Doanh nhân địa phương",
    characteristics: [
      "Nhu cầu không gian sống đẳng cấp và kinh doanh",
      "Cần không gian làm việc kết hợp nhà ở",
      "Ngân sách: 8-15 tỷ đồng"
    ],
    needs: "Không gian sống chất lượng gần nơi làm việc"
  },
  {
    type: "Người mua để ở",
    characteristics: [
      "Công chức, nhân viên văn phòng tại khu vực",
      "Chuyên gia, kỹ sư làm việc tại các KCN lân cận",
      "Ngân sách: 4-8 tỷ đồng"
    ],
    needs: "Không gian sống tiện nghi, môi trường sống văn minh"
  }
];