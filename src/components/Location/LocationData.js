// src/components/Location/LocationData.js
export const locationData = {
  badge: "Vị Trí Chiến Lược",
  title: "Trái Tim Thành Phố Tương Lai",
  description: "Economy City nằm tại trung tâm thị trấn Như Quỳnh, Văn Lâm, Hưng Yên, đối diện Huyện ủy và UBND, sở hữu lợi thế kết nối nổi bật và tiềm năng đầu tư cao. Cách Hà Nội 20km, dự án kết nối đồng bộ qua cao tốc Hà Nội - Hải Phòng, Vành đai 3.5, Vành đai 4, mang đến cơ hội phát triển bền vững cho cư dân và nhà đầu tư.",

  // Thêm nguồn video
  localVideoSrc: "/video/location_economy.mp4", // Đường dẫn tới video trong thư mục public

  mapImage: {
    src: "/img/Lienketvung.jpg", // Dùng làm poster cho video
    alt: "Bản đồ vị trí Economy City Văn Lâm và các kết nối giao thông"
  },

  mapLegend: [
    { color: "#E11D48", text: "Economy City" },
    { color: "#3B82F6", text: "Đường cao tốc" },
    { color: "#10B981", text: "Khu công nghiệp" },
    { color: "#F59E0B", text: "Trung tâm thương mại" },
    { color: "#8B5CF6", text: "Trường học, Bệnh viện" }
  ],

  connectionsTitle: "Kết nối đa chiều, thuận tiện di chuyển",

  connectionGroups: [
    {
      title: "Tiện ích nội khu",
      radius: "500m",
      tabIcon: "/img/building.png", // Icon đại diện cho tab
      items: [
        {
          icon: "/img/market.png", // Đường dẫn icon cục bộ
          text: "Chợ Ghênh & Chợ Như Quỳnh"
        },
        {
          icon: "/img/bank.png", // Đường dẫn icon cục bộ
          text: "Ngân Hàng"
        },
        {
          icon: "/img/shopping-center.png", // Đường dẫn icon cục bộ
          text: "Như Quỳnh Center"
        },
        {
          icon: "/img/police-station.png", // Đường dẫn icon cục bộ
          text: "Công An Huyện"
        },
        {
          icon: "/img/institution.png", // Đường dẫn icon cục bộ
          text: "UBND Huyện"
        },
        {
          icon: "/img/education.png", // Đường dẫn icon cục bộ
          text: "Trường ĐH Tài chính & Kinh Doanh",
        }
      ]
    },
    {
      title: "Tiện ích ngoại khu",
      radius: "1-5km",
      tabIcon: "/img/location.png", // Icon đại diện cho tab
      items: [
        {
          icon: "/img/school.png", // Đường dẫn icon cục bộ
          text: "THPT Văn Lâm"
        },
        {
          icon: "/img/hospital.png", // Đường dẫn icon cục bộ
          text: "Bệnh viện Văn Lâm"
        },
        {
          icon: "/img/architecture-city_1719666.png", // Đường dẫn icon cục bộ
          text: " Vinhome Ocean Park"
        },
        {
          icon: "/img/train-platform.png", // Đường dẫn icon cục bộ
          text: "Ga Lạc Đạo"
        },
        {
          icon: "/img/factory.png", // Đường dẫn icon cục bộ
          text: "CCN & Làng nghề"
        },
        {
          icon: "/img/factory_3256216.png", // Đường dẫn icon cục bộ
          text: "KCN Phố Nối & Tân Quang"
        }
      ]
    },
    {
      title: "Kết nối",
      radius: "",
      tabIcon: "/img/Giaothong.png", // Icon đại diện cho tab
      items: [
        {
          icon: "/img/road_ql.png", // Đường dẫn icon cục bộ
          text: "Quốc lộ 5A"
        },
        {
          icon: "/img/road.png", // Đường dẫn icon cục bộ
          text: "Cao tốc 5B"
        },
        {
          icon: "/img/road_ql.png", // Đường dẫn icon cục bộ
          text: "Vành đai 3.5"
        },
        {
          icon: "/img/road_ql.png", // Đường dẫn icon cục bộ
          text: "Vành đai 4"
        },
        {
          icon: "/img/train.png", // Đường dẫn icon cục bộ
          text: "Đường sắt đô thị số 1"
        },
        {
          icon: "/img/shinkansen.png", // Đường dẫn icon cục bộ
          text: "Đường sắt Bắc Nam"
        },

      ]
    },
    // Thêm tab thời gian di chuyển mới
    {
      title: "Thời gian",
      radius: "",
      tabIcon: "/img/travel_1584861.png", // Cần thêm icon đồng hồ vào thư mục public
      items: [
        {
          icon: "/img/sword-lake.png", // Đường dẫn icon cục bộ
          text: "Hồ Gươm: 20-25 phút"
        },
        {
          icon: "/img/factory_1217588.png", // Đường dẫn icon cục bộ
          text: "Các KCN lân cận: 10-15 phút"
        },
        {
          icon: "/img/supermaket_4926662.png", // Đường dẫn icon cục bộ
          text: "Aeon Long Biên: 15-20 phút"
        },
        {
          icon: "/img/airport.png", // Đường dẫn icon cục bộ
          text: "Sân bay Nội Bài: 40-45 phút"
        }
      ]
    }
  ],

  // Vẫn giữ lại travelTimes cho khả năng tương thích ngược
  travelTimes: {
    title: "Thời gian",
    items: [
      {
        icon: "/img/sword-lake.png", // Đường dẫn icon cục bộ
        destination: "Hồ Gươm",
        duration: "20-25 phút"
      },
      {
        icon: "/img/factory_1217588.png", // Đường dẫn icon cục bộ
        destination: "Các KCN lân cận",
        duration: "10-15 phút"
      },
      {
        icon: "/img/supermaket_4926662.png", // Đường dẫn icon cục bộ
        destination: "Aeon Long Biên",
        duration: "15-20 phút"
      },
      {
        icon: "/img/airport.png", // Đường dẫn icon cục bộ
        destination: "Sân bay Nội Bài",
        duration: "40-45 phút"
      }
    ]
  }
};