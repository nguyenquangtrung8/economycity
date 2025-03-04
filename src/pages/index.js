// src/pages/index.js

import React from 'react';
import Layout from '@theme/Layout';
import EconomyCityLanding from '../components/EconomyCityLanding/EconomyCityLanding';

export default function Home() {
  return (
    <Layout
      title="Economy City Văn Lâm | Khu đô thị kiểu mẫu phía Đông Hà Nội"
      description="Economy City Văn Lâm - Dự án khu đô thị kiểu mẫu tại thị trấn Như Quỳnh, huyện Văn Lâm, tỉnh Hưng Yên. Không gian sống hiện đại, tiện nghi cho cộng đồng cư dân văn minh."
    >
      <main>
        <EconomyCityLanding />
      </main>
    </Layout>
  );
}