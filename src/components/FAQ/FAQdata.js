// FAQdata.js - Dữ liệu câu hỏi thường gặp dự án Economy City Văn Lâm

// Dữ liệu FAQ phân theo 5 danh mục
const categorizedData = [
  {
    id: 'general',
    name: 'Thông tin dự án',
    icon: 'building',
    questions: [
      {
        id: 1,
        categoryId: 'general',
        question: 'Chủ đầu tư dự án Economy City Văn Lâm là ai?',
        answer: 'Dự án do Công ty Cổ phần Hoàng Vương Hưng Yên làm chủ đầu tư, với đơn vị phát triển dự án là Công ty Cổ phần BĐS Hoàng Vương.'
      },
      {
        id: 2,
        categoryId: 'general',
        question: 'Dự án Economy City Văn Lâm nằm ở đâu?',
        answer: 'Dự án tọa lạc tại trung tâm thị trấn Như Quỳnh, huyện Văn Lâm, tỉnh Hưng Yên.'
      },
      {
        id: 3,
        categoryId: 'general',
        question: 'Quy mô tổng thể của dự án như thế nào?',
        answer: 'Dự án có tổng diện tích 36.185 ha, bao gồm 1.044 căn thấp tầng và 8 tòa chung cư (khoảng 4.000 căn hộ), với các phân khu: Cát Tường, Thịnh Vượng, Hưng Thịnh, Phú Quý và khu BT8, BT9.'
      },
      {
        id: 4,
        categoryId: 'general',
        question: 'Các tiện ích nổi bật của dự án là gì?',
        answer: 'Dự án có Công viên thời đại với hồ điều hòa rộng 14.292,57m², Công viên ngân hà rộng 5.402,22m², bể bơi ngoài trời khoảng 350-400m², 01 cổng chính và 08 cổng phụ, cùng nhiều tiện ích khác.'
      },
      {
        id: 5,
        categoryId: 'general',
        question: 'Các đơn vị tư vấn thiết kế dự án là những ai?',
        answer: 'Dự án được thiết kế bởi các đơn vị uy tín: Công ty CP Tư vấn quản lý Thiết kế xây dựng số 18 (QH 1/500), Công ty CP Tư vấn thiết kế DMT (HTKT), Công ty CP HTCOM (nhà ở thấp tầng) và Công ty CP Đầu tư và Tư vấn xây dựng ICU (nhà ở cao tầng).'
      }
    ]
  },
  {
    id: 'location',
    name: 'Vị trí & Tiện ích',
    icon: 'map-pin',
    questions: [
      {
        id: 6,
        categoryId: 'location',
        question: 'Vị trí dự án có những lợi thế gì về kết nối giao thông?',
        answer: 'Dự án kết nối trực tiếp với Quốc lộ 5A, Vành đai 3.5, Vành đai 4, di chuyển về Hà Nội chỉ mất 20-25 phút và đến Sân bay Nội Bài 40-45 phút.'
      },
      {
        id: 7,
        categoryId: 'location',
        question: 'Dự án có gần khu công nghiệp nào không?',
        answer: 'Dự án tiếp giáp với 8 khu công nghiệp lớn và 30 làng nghề trong bán kính 10km, bao gồm KCN Thăng Long II, KCN Phố Nối A & B, KCN Như Quỳnh và các KCN khác.'
      },
      {
        id: 8,
        categoryId: 'location',
        question: 'Lòng đường và vỉa hè nội khu rộng bao nhiêu?',
        answer: 'Tuyến chính dự án rộng 25m (đường 15m + vỉa hè 5m mỗi bên) và 21,25m (đường 11,25m + vỉa hè 5m mỗi bên). Tuyến nội khu từ 12m tới 17,5m (đường 6m tới 7,5m + vỉa hè 3m tới 5m mỗi bên).'
      },
      {
        id: 9,
        categoryId: 'location',
        question: 'Cáp điện trong khu vực dự án được lắp đặt như thế nào?',
        answer: 'Theo thiết kế, cáp điện sẽ được hạ ngầm toàn bộ, kể cả dọc trục đường Thịnh Vượng.'
      },
      {
        id: 10,
        categoryId: 'location',
        question: 'Tiềm năng tăng giá và cho thuê của dự án như thế nào?',
        answer: 'Tiềm năng tăng giá lớn khi Văn Lâm dự kiến lên thành phố năm 2030. Cơ hội cho thuê hấp dẫn với đối tượng chuyên gia, kỹ sư làm việc tại 8 KCN lân cận.'
      },
      {
        id: 11,
        categoryId: 'location',
        question: 'So với dự án của Vinhomes (Ocean Park), Economy City có lợi thế gì về vị trí?',
        answer: 'Economy City có vị trí trung tâm thị trấn thuận lợi cho kinh doanh, gần khu hành chính và các KCN, thu hút khách vãng lai thường xuyên.'
      }
    ]
  },
  {
    id: 'products',
    name: 'Sản phẩm & Thiết kế',
    icon: 'home',
    questions: [
      {
        id: 12,
        categoryId: 'products',
        question: 'Dự án cung cấp những loại hình sản phẩm nào?',
        answer: 'Dự án có biệt thự (Shopvilla) 4 tầng và nhà phố thương mại (Shophouse) 5 tầng, phân bố tại các khu Cát Tường, Thịnh Vượng, Hưng Thịnh và Phú Quý.'
      },
      {
        id: 13,
        categoryId: 'products',
        question: 'Độ cao các tầng của nhà ở như thế nào?',
        answer: 'Shopvilla (Biệt thự): Tầng 1 cao 3,9m; tầng 2-3 cao 3,6m; tầng 4 cao 3,25m. Shophouse (Nhà phố): Tầng 1 cao 3,9m; tầng 2-4 cao 3,3m; tầng 5 cao 3,0m.'
      },
      {
        id: 14,
        categoryId: 'products',
        question: 'Phân bố công năng từng tầng như thế nào?',
        answer: 'Tầng 1: Kinh doanh; Tầng 2: Phòng khách, bếp - phòng ăn; Tầng 3-4: Phòng ngủ; Tầng 5 (đối với shophouse): Phòng thờ, khu vực giặt phơi.'
      },
      {
        id: 15,
        categoryId: 'products',
        question: 'Nhà ở được bàn giao cho khách hàng như thế nào?',
        answer: 'Nhà được bàn giao thô, hoàn thiện mặt ngoài theo thiết kế - điểm đặc biệt là sử dụng mặt tiền ốp đá cao cấp. Khách hàng tự thiết kế và hoàn thiện nội thất theo ý thích.'
      },
      {
        id: 16,
        categoryId: 'products',
        question: 'Vật liệu hoàn thiện mặt ngoài công trình là gì?',
        answer: 'Tường sơn Dulux (hoặc tương đương), mặt tiền tầng 1 ốp đá, cửa cuốn màu ghi sáng, cửa đi/cửa sổ sử dụng khung nhôm hệ Xingfa hoặc Việt Pháp, mái bê tông cốt thép lợp/dán ngói.'
      },
      {
        id: 17,
        categoryId: 'products',
        question: 'Chủ sở hữu có thể thay đổi màu sơn mặt ngoài không?',
        answer: 'Không, kiến trúc mặt ngoài không được thay đổi để đảm bảo mỹ quan đồng bộ chung của dự án.'
      },
      {
        id: 18,
        categoryId: 'products',
        question: 'Tôi có thể thay đổi thiết kế bên trong căn nhà không?',
        answer: 'Có thể, tuy nhiên chủ nhà phải thông qua và được sự phê duyệt và giám sát của Chủ đầu tư trong quá trình thi công để đảm bảo các thay đổi không ảnh hưởng đến kết cấu công trình.'
      },
      {
        id: 19,
        categoryId: 'products',
        question: 'Mua hai căn nhà liền nhau có được đập thông căn không?',
        answer: 'Có thể, nhưng phải được sự phê duyệt và giám sát của CĐT để đảm bảo không ảnh hưởng đến kết cấu công trình.'
      },
      {
        id: 20,
        categoryId: 'products',
        question: 'Nhà ở có được trang bị điện 3 pha không?',
        answer: 'Theo thiết kế, nhà ở được bố trí sử dụng điện 2 pha. Khi có nhu cầu sử dụng điện 3 pha (ví dụ cho thang máy), khách hàng có thể ký hợp đồng với đơn vị cung cấp điện.'
      },
      {
        id: 21,
        categoryId: 'products',
        question: 'Các điểm kết nối mạng, cáp, điện nước được bố trí như thế nào?',
        answer: 'CĐT cung cấp các đầu chờ kết nối hệ thống điện, nước, thông tin liên lạc từ HTKT đến ranh giới lô đất. Vị trí cụ thể được thể hiện trong bản vẽ thiết kế.'
      },
      {
        id: 22,
        categoryId: 'products',
        question: 'Công ty có thể giới thiệu đơn vị làm thiết kế và trang trí nội thất không?',
        answer: 'CĐT không cung cấp dịch vụ nội thất, nhưng trong trường hợp khách hàng có nhu cầu, sẽ giới thiệu các đơn vị thiết kế nội thất lớn và uy tín.'
      },
      {
        id: 23,
        categoryId: 'products',
        question: 'Dự án có phù hợp để vừa ở vừa kinh doanh không?',
        answer: 'Rất phù hợp, đặc biệt với nhà phố thương mại được thiết kế đa công năng, nằm ở vị trí trung tâm thị trấn, gần khu hành chính, ngân hàng và KCN, thu hút khách vãng lai thường xuyên.'
      }
    ]
  },
  {
    id: 'legal',
    name: 'Pháp lý & Sở hữu',
    icon: 'shield',
    questions: [
      {
        id: 24,
        categoryId: 'legal',
        question: 'Ai có thể mua nhà tại dự án Economy City Văn Lâm?',
        answer: 'Cả cá nhân và tổ chức đều được mua nhà ở thấp tầng và cao tầng tại dự án theo quy định của Pháp luật Việt Nam.'
      },
      {
        id: 25,
        categoryId: 'legal',
        question: 'Thủ tục mua nhà đối với cá nhân cần những giấy tờ gì?',
        answer: 'Cá nhân cần chuẩn bị CCCD và Giấy chứng nhận đăng ký kết hôn (nếu là vợ chồng, photo công chứng) khi ký hợp đồng.'
      },
      {
        id: 26,
        categoryId: 'legal',
        question: 'Doanh nghiệp muốn mua nhà cần chuẩn bị những giấy tờ gì?',
        answer: 'Doanh nghiệp cần chuẩn bị Giấy ĐKKD, biên bản họp HĐTV/ĐHĐCĐ về việc mua nhà ở và văn bản ủy quyền cho người ký hợp đồng.'
      },
      {
        id: 27,
        categoryId: 'legal',
        question: 'Quyền sử dụng đất là bao lâu?',
        answer: 'Đối với người Việt Nam, quyền sử dụng đất ở là lâu dài. Đối với người nước ngoài, thời hạn sở hữu là 50 năm.'
      },
      {
        id: 28,
        categoryId: 'legal',
        question: 'Thời gian bàn giao nhà dự kiến là khi nào?',
        answer: 'Dự kiến khoảng 180 ngày kể từ ngày ký hợp đồng, Chủ đầu tư sẽ bàn giao nhà cho khách hàng.'
      },
      {
        id: 29,
        categoryId: 'legal',
        question: 'Khi nào người mua nhà được cấp Giấy chứng nhận?',
        answer: 'Sau khi khách hàng thanh toán đầy đủ và CĐT hoàn thành việc xây dựng, Giấy chứng nhận sẽ được cấp trong khoảng 30 ngày kể từ ngày nộp hồ sơ đầy đủ.'
      },
      {
        id: 30,
        categoryId: 'legal',
        question: 'Thủ tục cấp Giấy chứng nhận cần những giấy tờ gì?',
        answer: 'Cần HĐMB, Hóa đơn GTGT, Biên bản bàn giao nhà, Đăng ký kê khai thuế, Đơn đề nghị cấp GCN, CCCD (photo công chứng) và Đăng ký kết hôn (nếu vào tên cả 2 vợ chồng).'
      },
      {
        id: 31,
        categoryId: 'legal',
        question: 'Có thể chuyển nhượng nhà cho người khác không?',
        answer: 'Có, trước khi cấp GCN có thể chuyển nhượng HĐMB, sau khi cấp GCN có thể chuyển nhượng GCN. Phí chuyển nhượng theo quy định của pháp luật.'
      },
      {
        id: 32,
        categoryId: 'legal',
        question: 'Dự án có được bảo lãnh bởi ngân hàng không?',
        answer: 'Có, dự án được bảo lãnh bởi PVCOMBANK, đảm bảo hoàn trả 100% số tiền khách hàng đã thanh toán nếu chủ đầu tư không thực hiện đúng cam kết.'
      },
      {
        id: 33,
        categoryId: 'legal',
        question: 'Dự án có bị cầm cố thế chấp tại ngân hàng không?',
        answer: 'Khi ký HĐMB nhà hình thành trong tương lai, lô đất đó không bị cầm cố hay thế chấp tại bất cứ tổ chức tín dụng nào.'
      }
    ]
  },
  {
    id: 'payment',
    name: 'Thanh toán & Chính sách',
    icon: 'credit-card',
    questions: [
      {
        id: 34,
        categoryId: 'payment',
        question: 'Khách hàng có thể vay vốn tại những ngân hàng nào?',
        answer: 'Dự án không áp dụng ngân hàng cho vay độc quyền. Khách hàng có thể vay tại bất kỳ ngân hàng nào phù hợp với nhu cầu.'
      },
      {
        id: 35,
        categoryId: 'payment',
        question: 'Có những phương thức thanh toán nào?',
        answer: 'Có 3 phương thức: thanh toán tiêu chuẩn (7 đợt), thanh toán sớm 70% (chiết khấu 0.5%), và thanh toán sớm 95% (chiết khấu 1%).'
      },
      {
        id: 36,
        categoryId: 'payment',
        question: 'Chính sách ưu đãi cho khách hàng thanh toán như thế nào?',
        answer: 'Khách hàng không vay vốn và không nhận gói hỗ trợ 0% được chiết khấu 6% giá trị HĐMB. Có thể có thêm ưu đãi theo từng giai đoạn bán hàng.'
      },
      {
        id: 37,
        categoryId: 'payment',
        question: 'Chính sách hỗ trợ lãi suất của ngân hàng như thế nào?',
        answer: 'Hỗ trợ lãi suất 0%/năm trong 18 tháng, thời gian ân hạn gốc 18 tháng. Sau đó áp dụng lãi suất thương mại (không thấp hơn 3.5%/năm).'
      },
      {
        id: 38,
        categoryId: 'payment',
        question: 'Giá bán các sản phẩm tại dự án ra sao?',
        answer: 'Giá bán nhà phố thương mại và biệt thự từ 107 triệu/m² (thấp hơn 35% so với dự án của Vinhomes trong khu vực), phụ thuộc vào vị trí, địa điểm, hướng và thời điểm mua.'
      },
      {
        id: 39,
        categoryId: 'payment',
        question: 'Có thể mua nhiều nhà ở trong dự án không?',
        answer: 'Đối với cá nhân/tổ chức Việt Nam, không hạn chế số lượng sở hữu nhà tại dự án. Người nước ngoài cũng được mua nhưng thời hạn sở hữu là 50 năm.'
      },
      {
        id: 40,
        categoryId: 'payment',
        question: 'Dự án có nhà mẫu để khách hàng tham quan không?',
        answer: 'CĐT sẽ xây dựng Block Mẫu (E3), dự kiến khởi công năm 2025 và hoàn thành năm 2026.'
      },
      {
        id: 41,
        categoryId: 'payment',
        question: 'Có chương trình khuyến mãi nào khi mua sản phẩm không?',
        answer: 'Có, tùy thuộc vào từng giai đoạn bán hàng và chính sách từng thời điểm.'
      },
      {
        id: 42,
        categoryId: 'payment',
        question: 'CĐT có tổ chức đưa đón khách tham quan dự án không?',
        answer: 'Có, tùy theo từng giai đoạn triển khai dự án.'
      }
    ]
  }
];

// Tạo mảng chứa tất cả câu hỏi (flat)
const allQuestions = [];
categorizedData.forEach(category => {
  category.questions.forEach(question => {
    allQuestions.push(question);
  });
});

// Export các biến cần thiết
export const categorizedFaqData = categorizedData;
export { allQuestions };