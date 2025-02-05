---
sidebar_position: 1
---

# Khởi động

Hãy khám phá **Docusaurus trong chưa đầy 5 phút**.

## Bắt đầu

Bắt đầu bằng cách **tạo một trang web mới**.

Hoặc **thử Docusaurus ngay lập tức** với **[docusaurus.new](https://docusaurus.new)**.

### Những gì bạn sẽ cần

- [Node.js](https://nodejs.org/en/download/) phiên bản 18.0 hoặc cao hơn:
  - Khi cài đặt Node.js, bạn nên đánh dấu vào tất cả các ô liên quan đến các phụ thuộc.

## Tạo một trang web mới

Tạo một trang Docusaurus mới bằng cách sử dụng **mẫu classic**. Trong câu lệnh dưới đây, `my-website` là tên thư mục website bạn muốn tạo ra còn `classic` là tên mẫu website bạn sử dụng.

Mẫu classic sẽ tự động được thêm vào dự án của bạn sau khi bạn chạy lệnh:

```bash
npm init docusaurus@latest my-website classic
```

Bạn có thể nhập lệnh này vào Command Prompt, Powershell, Terminal hoặc bất kỳ terminal tích hợp nào của trình soạn thảo mã của bạn.

Lệnh này cũng cài đặt tất cả các phụ thuộc cần thiết để bạn chạy Docusaurus.

## Khởi động trang web của bạn

Chạy máy chủ phát triển:

```bash
cd my-website
npm run start
```

Lệnh `cd` thay đổi thư mục mà bạn đang làm việc. Để làm việc với trang Docusaurus mới tạo, bạn cần điều hướng terminal đến đó.

Lệnh `npm run start` xây dựng trang web của bạn cục bộ và phục vụ nó thông qua một máy chủ phát triển, sẵn sàng cho bạn xem tại http://localhost:3000/.

Mở `docs/intro.md` (trang này) và chỉnh sửa một số dòng: trang web sẽ **tự động tải lại** và hiển thị các thay đổi của bạn.