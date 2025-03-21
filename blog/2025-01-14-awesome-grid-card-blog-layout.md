---
title: Cấu hình tính năng Blog dạng lưới chuyên nghiệp
description: "Grid Cards là bố cục trình bày chuyên nghiệp và đẹp mắt cho phép thu hút mọi ánh nhìn từ người xem đồng thời lọc bài viết dễ dàng."
slug: huong-den-su-hoan-thien-hon-hoan-hao
date: 2025-01-14
category: 'hướng dẫn'
image: /images/awesome-docusaurus-sample-cover.jpg
tags:
  - Trải nghiệm
authors:
  - thinh-vu
domain: learn-anything.vn
---

## Grid Cards là gì?

:::info "Thông tin"
Grid Cards hay bố cục lưới là một cách hiển thị nội dung dễ nhìn và gọn gàng giúp người đọc nhanh chóng tìm ra nội dung đáng chú ý trong màn hình đầu tiên. Bố cục hiển thị này do Thịnh phát triển riêng cho định dạng website Docusaurus, sử dụng khả năng Swizzling của Docusarusu để ghi đè bố cục trình bày nội dung chuyên nghiệp và thanh lịch.
:::

## Swizzling là gì?

[Swizzling](https://docusaurus.io/docs/swizzling) là việc ghi đè các tuỳ biến của bạn để thay thế các cài đặt mặc định của trang Docusaurus. Các cấu trúc ghi đè này sẽ được quản lý tại thư mục `src/theme` của dự án, tạo mới các cấu trúc cần ghi đè theo hướng dẫn. Để dễ hình dung, bạn có thể xem đầy đủ 100 thành phần có thể ghi đè thông qua Swizzling do Docusaurus hỗ trợ [tại đây](https://github.com/facebook/docusaurus/tree/main/packages/docusaurus-theme-classic/src/theme).

Trong hướng dẫn này, bạn cần tạo thư mục `theme` tại thư mục `src` của dự án để tiếp tục các thiết lập và chèn các file theo hướng dẫn dưới đây.

## Swizzling bố cục Blog dạng lưới

Để thực hiện việc ghi đè giao diện Blog mặc định của Docusaurus sang dạng lưới, bạn cần copy/paste các thư mục dưới đây và thực hiện thay đổi tiêu đề, màu sắc cho phù hợp với dự án của mình.

- `src/theme/BlogListPage`: Bố cục & kiểu trình bày trang hiển thị blog tổng quan, tại địa chỉ `/blog` của website bạn áp dụng.
- `src/theme/BlogHeader`: Cấu hình hiển thị phần tiêu đề trang Blog, bạn cần thay đổi tên Blog cho đúng với Blog của mình tại file `index.js` trong thư mục này.
- `src/theme/BlogListPage`: Cấu hình cách thức hiển thị từng thẻ một trong bố cục lưới.
- `src/theme/TOC`: Cấu hình cách thức hiển thị phần mục lục (TOC - Table of Content) của Blog là phần hiển thị các tiêu đề phía thanh bên phải.
- `src/theme/BlogPostItem`: Cấu hình cách thức hiển thị nội dung chi tiết của từng bài viết.

Ngoài ra, để ẩn thanh sidebar bên trái khi đọc bài viết chi tiết, bạn có thể cấu hình sidebar theo hướng dẫn của Docusaurus [tại đây](https://docusaurus.io/docs/blog#blog-sidebar).

## Viết nội dung bài Blog như thế nào?

### Cấu hình YAML frontmatter

:::info "Thông tin"
YAML frontmatter là phần nội dung ở đầu trang của file markdown được bắt đầu và kết thúc bởi cặp dấu `---`. Lưu ý dấu `---` phải xuất hiện ngay đầu trang, không có khoảng trắng phía trước. Đây là phần nội dung cung cấp các thông tin metadata (siêu dữ liệu - mô tả bài viết) với các trường thông tin được khuyên dùng như dưới đây.
:::

Dưới đây là phần thông tin mô tả bài viết mẫu bạn nên sử dụng cho tất cả bài viết Blog trên trang để tối ưu cho SEO và hiển thị đúng thông tin cần thiết cho giao diện lưới của blog.

```
---
title: Tiêu đề bài viết tối ưu cho SEO hoặc không
description: "Mô tả bài viết sẽ xuất hiện trong phần hiển thị bố cục dạng lưới của Blog đồng thời trong kết quả tìm kiếm Google."
slug: đường-dẫn-của-trang-blog-không-dấu
date: 2025-01-14
category: 'hướng dẫn' <!-- Tên danh mục phân loại -->
image: http://learn-anything.vn/images/hoan-thien-hon-hoan-hao_lean-anything.jpg <!-- Ảnh hiển thị đại diện cho bài viết trong phần bố cục dạng lưới và là ảnh xem trước khi chia sẻ bài viết lên mạng xã hội. Ảnh này phải là full path bao gồm cả domain để các mạng xã hội đọc được thay vì relative path đến thư mục /images/ như ví dụ này -->
tags:
  - Trải nghiệm <!-- Thẻ đánh dấu nội dung -->
authors:
  - thinh-vu <!-- Tác giả: cấu hình trong file /blog/authors.yml-->
domain: learn-anything.vn <!-- Tên miền của bạn, áp dụng cho cơ chế chấm điểm SEO với công cụ SEO Analyzer do Thịnh cung cấp -->
publish: True <!--Quyết định hiển thị bài này trong giao diện lứoi hay không. True để hiển thị, False để ẩn đi nhưng vẫn hiển thị khi tìm kiếm Google -->
---
```

### Viết bài

Không có gì thay đổi, bạn viết như các bài viết dạng markdown thông thường.