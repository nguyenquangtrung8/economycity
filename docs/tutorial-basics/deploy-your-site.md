---
sidebar_position: 5
---

# Triển khai trang web của bạn

Docusaurus là một **trình tạo trang tĩnh** (cũng được gọi là **[Jamstack](https://jamstack.org/)**).

Nó xây dựng trang web của bạn thành các tệp **HTML, JavaScript và CSS tĩnh đơn giản**.

## Xây dựng trang web của bạn

Xây dựng trang web của bạn **cho môi trường sản xuất**:

```bash
npm run build
```

Các tệp tĩnh sẽ được tạo ra trong thư mục `build`.

## Triển khai trang web của bạn

Kiểm tra bản build cho môi trường sản xuất của bạn trên máy cục bộ:

```bash
npm run serve
```

Thư mục `build` hiện đang được phục vụ tại [http://localhost:3000/](http://localhost:3000/).

Bây giờ bạn có thể triển khai thư mục `build` **gần như ở bất cứ đâu** một cách dễ dàng, **miễn phí** hoặc với chi phí rất nhỏ (hãy đọc **[Hướng dẫn Triển khai](https://docusaurus.io/docs/deployment)**).