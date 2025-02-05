---
sidebar_position: 2
---

# Tạo Tài Liệu

Tài liệu là **nhóm các trang** được kết nối qua:

- **sidebar** (thanh điều hướng bên trái)
- **điều hướng trước/sau** xuất hiện khi bạn đọc xong một trang tài liệu bất kỳ.
- **phiên bản**: lưu trữ các phiên bản khác nhau, phù hợp với dự án phần mềm hoặc các tài liệu sản phẩm có tính chất thay đổi thường xuyên.

## Tạo Tài Liệu Đầu Tiên Của Bạn

Tạo một tệp Markdown tại `docs/hello.md`:

```md title="docs/hello.md"
# Xin chào

Đây là **tài liệu Docusaurus đầu tiên** của tôi!
```

Một tài liệu mới giờ đã sẵn sàng tại [http://localhost:3000/docs/hello](http://localhost:3000/docs/hello).

## Cấu Hình Sidebar

Docusaurus sẽ tự động **tạo sidebar** từ thư mục `docs`.

Thêm metadata để tùy chỉnh nhãn và vị trí của sidebar:

```md title="docs/hello.md" {1-4}
---
sidebar_label: 'Xin chào!'
sidebar_position: 3
---

# Xin chào

Đây là **tài liệu Docusaurus đầu tiên** của tôi!
```

Bạn cũng có thể tạo sidebar một cách rõ ràng trong `sidebars.js`:

```js title="sidebars.js"
export default {
  tutorialSidebar: [
    'intro',
    // highlight-next-line
    'hello',
    {
      type: 'category',
      label: 'Hướng Dẫn',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
};
```