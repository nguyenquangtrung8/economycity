---
sidebar_position: 2
title: Cài đặt tính năng Diagram
description: Hướng dẫn cài đặt tính năng hiển thị lưu đồ (Diagram) với mermaid plugin
---

:::success "Gợi ý"
Khi sử dụng dự án `simple-docusaurus`, tính năng Diagram đã được cài đặt sẵn, ghi chú này thuật lại một số điểm đáng chú ý để cài đặt về sau khi bắt đầu dự án mới.
:::

## Cài đặt thư viện

```
npm install --save @docusaurus/theme-mermaid
```

**Lưu ý:** Phiên bản cài đặt của gói `theme-mermaid` phải khớp với phiên bản Docusaurus đang sử dụng. Ví dụ phiên bản Docusaurus hiện tại là 3.6.0 thì cần sử dụng phiên bản plugin tương ứng. 

Câu lệnh cài đặt trong trường hợp này như sau:

```
npm install --save @docusaurus/theme-mermaid@3.6.0
```

## Thiết lập cấu hình

Mở file `docusaurus.config.js` trong thư mục gốc và thêm vào đoạn code sau:

```jsx title="docusaurus.config.js"
const config = {
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
};
```

## Tham khảo

Hướng dẫn từ Docusaurus [tại đây](https://docusaurus.io/docs/markdown-features/diagrams). Hướng dẫn này không đầy đủ nhưng là nền tảng căn bản để bắt đầu.