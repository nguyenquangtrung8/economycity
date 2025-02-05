---
sidebar_position: 3
title: Cài đặt tính năng tìm kiếm
---

:::success "Gợi ý"
Bạn có nhiều lựa chọn công cụ tìm kiếm cho website khác nhau từ sử dụng dịch vụ chuyên nghiệp như Algolio hay sử dụng 1 plugin tìm kiếm offline (tạo file index lưu trữ trực tiếp tại website để tìm kiếm). Dưới đây là hướng dẫn cơ bản khi cài công cụ tìm kiếm offline đơn giản cho trang web.
:::

## Khuyến nghị

Hướng dẫn này sử dụng plugin [docusaurus-lunr-search](https://github.com/praveenn77/docusaurus-lunr-search) làm công cụ tìm kiếm.

1. Chạy câu lệnh cài đặt trong Terminal:

```
npm i docusaurus-lunr-search  --save
```

2. Cài đặt cấu hình

Chèn đoạn mã được highlight dưới đây vào vị trí tương ứng trong file docusaurus.config.js (dự án này đã thực hiện, bạn không cần làm gì thêm)

```jsx
plugins: [
// highlight-start
[
    require.resolve('docusaurus-lunr-search'),
    {
    languages: ['vi'], // Specify languages here (e.g., 'en' for English)
    indexBaseUrl: true, // This indexes URLs with base URL in Docusaurus
    // Other optional settings, like excluding certain paths, can be added here
    },
],
// highlight-end
]
```

Lưu ý, công cụ tìm kiếm chỉ hiển thị và hoạt động khi website đã được chia sẻ (file index mới có thể truy cập được).

## Tham khảo

Tài liệu hướng dẫn chính thức: [tại đây](https://docusaurus.io/docs/search#using-local-search)