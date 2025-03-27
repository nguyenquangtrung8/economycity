// src/components/Location/LocationData.js
import React from 'react';

export const locationData = {
  badge: "Vị Trí Chiến Lược",
  title: "Trái Tim Thành Phố Tương Lai",
  description: "Economy City nằm tại trung tâm thị trấn Như Quỳnh, Văn Lâm, Hưng Yên, đối diện Huyện ủy và UBND, sở hữu lợi thế kết nối nổi bật và tiềm năng đầu tư cao. Cách Hà Nội 20km, dự án kết nối đồng bộ qua cao tốc Hà Nội - Hải Phòng, Vành đai 3.5, Vành đai 4, mang đến cơ hội phát triển bền vững cho cư dân và nhà đầu tư.",

  mapImage: {
    src: "/img/Lienketvung.jpg",
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
      items: [
        {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path><path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path><path d="M12 3v6"></path></svg>,
          text: "Clubhouse 2.000m²"
        },
        {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 0 1 12 0Z"></path><circle cx="12" cy="8" r="2"></circle></svg>,
          text: "Quảng trường 5.6 ha"
        },
        {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>,
          text: "Trường mầm non"
        },
        {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.3 12c.5-1.3.7-2.7.7-4A8 8 0 0 0 4.4 4.8a8 8 0 0 0 1.7 8.7c2 2.5 2 5 .6 6.3 2.5.4 4-.8 4-2.3 0-1.2-.7-2.5-1-3.2a2 2 0 0 1 1-2.8 10 10 0 0 0 4.5-5.3"></path><path d="M20 5c.7 1.1 1 2.3 1 3.5a13 13 0 0 1-5.5 10"></path></svg>,
          text: "Công viên cây xanh"
        },
        {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 5h2a6 6 0 0 1 6 6v3a6 6 0 0 1-6 6h-2"></path><path d="M18 11a6 6 0 0 0-6-6H4v12h8a6 6 0 0 0 6-6"></path></svg>,
          text: "Hồ điều hòa 1.2 ha"
        },
        {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 5 5 8 8 5"></path><path d="M2 12 5 15 8 12"></path><path d="M9 8h9"></path><path d="M9 15h9"></path><path d="M19 5 16 8l3 3"></path><path d="m19 12-3 3 3 3"></path></svg>,
          text: "Khu thể thao ngoài trời"
        }
      ]
    },
    {
      title: "Tiện ích ngoại khu",
      radius: "1-5km",
      items: [
        {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 5 2 12.5 9 13 4 21 16 14.5 13 12.5"></path></svg>,
          text: "UBND huyện Văn Lâm"
        },
        {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path><path d="M2 7h20"></path><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"></path></svg>,
          text: "TTTM Như Quỳnh"
        },
        {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><path d="M7 8h.01"></path><path d="M12 8h.01"></path><path d="M17 8h.01"></path><path d="M12 12h.01"></path><path d="M7 12h.01"></path><path d="M12 16h.01"></path><path d="M17 12h.01"></path><path d="M7 16h.01"></path><path d="M17 16h.01"></path></svg>,
          text: "KCN Như Quỳnh"
        },
        {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5v14h11"></path><path d="M9 15v2"></path><path d="M9 11v2"></path><path d="M9 7V3"></path><path d="M17 3v4"></path><path d="M12 3v4"></path><path d="M14 21l-2-2"></path><path d="M18 16l-6 6"></path></svg>,
          text: "KCN Thăng Long II"
        },
        {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>,
          text: "Bệnh viện Văn Lâm"
        },
        {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>,
          text: "KCN Phố Nối A & B"
        }
      ]
    },
    {
      title: "Kết nối giao thông",
      radius: "",
      items: [
        {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 9V11.385C21 12.76 21 13.447 20.81 14.235C20.599 15.1 20.209 15.909 19.673 16.615C19.195 17.243 18.583 17.738 17.364 18.726C16.367 19.558 15.868 19.973 15.293 20.205C14.793 20.409 14.257 20.517 13.714 20.523C13.103 20.53 12.486 20.364 11.253 20.031L4.5 18L3 17.571C2.386 17.33 2.079 17.21 1.833 17.043C1.615 16.893 1.425 16.703 1.275 16.485C1.108 16.238 1 15.936 1 15.326V3.509C1 3.227 1 3.086 1.033 2.969C1.095 2.766 1.226 2.591 1.401 2.476C1.511 2.401 1.646 2.36 1.918 2.279L2.5 2.116"></path><path d="M18 2V9"></path><path d="M18 2 8 5"></path><path d="M18 5 8 8"></path></svg>,
          text: "Quốc lộ 5A"
        },
        {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 9H4L2 7V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v3l-2 2h-6"></path><path d="M7 9v2a5 5 0 0 0 10 0V9"></path><path d="M2 12h20"></path></svg>,
          text: "Vành đai 3.5"
        },
        {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a8 8 0 0 0-8 8c0 5.4 7 12 8 12s8-6.6 8-12a8 8 0 0 0-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path></svg>,
          text: "Vành đai 4 (sắp hoàn thành)"
        },
        {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"></path><path d="M15 3h6v6"></path><path d="m10 14 11-11"></path></svg>,
          text: "Đường sắt đô thị số 1"
        },
        {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 18H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"></path><path d="m15 16 3-2 3 2"></path><path d="M18 17V14"></path><circle cx="18" cy="20" r="2"></circle><circle cx="18" cy="8" r="2"></circle><path d="M18 12V10"></path></svg>,
          text: "Đường sắt Bắc Nam"
        },
        {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5.636 19.364a9 9 0 1 1 12.728 0"></path><path d="M16 16v-5a4 4 0 0 0-8 0v5"></path><path d="M9 9h6"></path><path d="M13 21h-2"></path></svg>,
          text: "Cao tốc Hà Nội - Hải Phòng"
        }
      ]
    }
  ],

  travelTimes: {
    title: "Thời gian di chuyển",
    items: [
      {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
        destination: "Hà Nội",
        duration: "20-25 phút"
      },
      {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
        destination: "Các KCN lân cận",
        duration: "10-15 phút"
      },
      {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21 7.5 12 12 3l4.5 9z"></path><path d="M20 21 15.5 12 20 3"></path><path d="M4 21 8.5 12 4 3"></path></svg>,
        destination: "Sân bay Nội Bài",
        duration: "40-45 phút"
      },
      {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 9V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v5"></path><path d="M8 11V9"></path><path d="M16 11V9"></path><path d="M12 11V9"></path><path d="M3 11h18"></path><path d="M4 9v11a1 1 0 0 0 1 1h5V9"></path><path d="M20 9v11a1 1 0 0 1-1 1h-5V9"></path></svg>,
        destination: "Ocean Park",
        duration: "10-15 phút"
      }
    ]
  }
};