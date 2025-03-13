// src/components/Location/LocationData.js

/**
 * Dữ liệu cho component Location
 * Chứa thông tin về vị trí chiến lược của dự án Economy City Văn Lâm
 */
export const locationData = {
    badge: "VỊ TRÍ",
    title: "VỊ TRÍ CHIẾN LƯỢC",
    description: "Economy City Văn Lâm sở hữu vị trí đắc địa với khả năng kết nối vượt trội và tiềm năng phát triển dài hạn.",
    sections: [
      {
        id: "geo-location",
        title: "Vị trí địa lý",
        description: "Tọa lạc tại trung tâm thị trấn Như Quỳnh, huyện Văn Lâm, tỉnh Hưng Yên",
        iconSrc: "/img/Vitri.png",
        iconAlt: "Icon vị trí địa lý",
        image: {
          src: '/img/Lienketvung.jpg',
          alt: "Vị trí địa lý Economy City Văn Lâm"
        },
        highlights: [
          "Cách trung tâm Hà Nội 18km",
          "Cách Ocean Park (OCP 1) 5km",
          "Nằm trong quy hoạch phát triển đô thị vệ tinh của Hà Nội"
        ]
      },
      {
        id: "transportation",
        title: "Kết nối giao thông",
        description: "Hệ thống giao thông đa dạng, kết nối nhanh chóng với các trục đường chính",
        iconSrc: "/img/Giaothong.png",
        iconAlt: "Icon kết nối giao thông",
        image: {
          src: '/img/Lienketvung.jpg',
          alt: "Kết nối giao thông Economy City Văn Lâm"
        },
        highlights: [
          "Kết nối trực tiếp với Quốc lộ 5A, Vành đai 3.5, Vành đai 4",
          "Gần tuyến đường sắt đô thị số 1, đường sắt Bắc Nam",
          "Di chuyển về Hà Nội chỉ 20-25 phút, đến Sân bay Nội Bài 40-45 phút"
        ]
      },
      {
        id: "regional-connections",
        title: "Liên kết vùng",
        description: "Tiếp giáp nhiều khu công nghiệp lớn và làng nghề truyền thống",
        iconSrc: "/img/Lienket.png",
        iconAlt: "Icon liên kết vùng",
        image: {
          src: '/img/Lienketvung.jpg',
          alt: "Liên kết vùng Economy City Văn Lâm"
        },
        highlights: [
          "Tiếp giáp 8 khu công nghiệp lớn và 30 làng nghề",
          "Gần trung tâm hành chính huyện, TTTM, trường học, bệnh viện",
          "Đến các KCN lân cận chỉ 10-15 phút di chuyển"
        ],
        details: [
          { label: "KCN gần nhất", value: "Thăng Long II, Phố Nối A & B, Như Quỳnh" },
          { label: "Bán kính tiếp cận", value: "10km" }
        ]
      }
    ],
    ctaText: "Tìm hiểu thêm",
    ctaUrl: "#contact"
  };