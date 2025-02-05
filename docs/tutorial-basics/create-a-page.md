---
sidebar_position: 1
---

# Tạo Trang

Thêm các tệp **Markdown hoặc React** vào `src/pages` để tạo một **trang độc lập**:

- `src/pages/index.js` → `localhost:3000/`
- `src/pages/foo.md` → `localhost:3000/foo`
- `src/pages/foo/bar.js` → `localhost:3000/foo/bar`

## Tạo Trang React Đầu Tiên Của Bạn

Tạo một tệp tại `src/pages/my-react-page.js`:

```jsx title="src/pages/my-react-page.js"
import React from 'react';
import Layout from '@theme/Layout';

export default function MyReactPage() {
  return (
    <Layout>
      <h1>Trang React của tôi</h1>
      <p>Đây là một trang React</p>
    </Layout>
  );
}
```

Một trang mới giờ đã sẵn sàng tại [http://localhost:3000/my-react-page](http://localhost:3000/my-react-page).

## Tạo Trang Markdown Đầu Tiên Của Bạn

Tạo một tệp tại `src/pages/my-markdown-page.md`:

```mdx title="src/pages/my-markdown-page.md"
# Trang Markdown của tôi

Đây là một trang Markdown
```

Một trang mới giờ đã sẵn sàng tại [http://localhost:3000/my-markdown-page](http://localhost:3000/my-markdown-page).