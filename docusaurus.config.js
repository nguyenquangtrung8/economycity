// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Economy City Văn Lâm',
  tagline: 'Không gian sống đẳng cấp - Cơ hội đầu tư vượt trội',
  favicon: 'img/favicon.ico',

  // Cập nhật URL thực tế của website sau khi triển khai
  url: 'https://economycity.vn',
  baseUrl: '/',

  // Cập nhật thông tin tổ chức/dự án của bạn
  organizationName: 'economycity', 
  projectName: 'economycity-website',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'vi',
    locales: ['vi'],
  },

  // Giữ lại tính năng Mermaid để vẽ sơ đồ nếu cần
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  // Giữ lại tính năng tìm kiếm
  plugins: [require.resolve('docusaurus-lunr-search')],
  
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          // Xóa editUrl vì không cần chức năng chỉnh sửa từ người dùng
          editUrl: undefined,
        },
        blog: false, // Tắt tính năng blog vì không cần thiết cho website bất động sản
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Banner quảng cáo (có thể sử dụng để hiển thị khuyến mãi hoặc tin tức quan trọng)
      announcementBar: {
        id: 'promo_banner',
        content:
          '🔥 Ưu đãi đặc biệt: Chiết khấu lên đến 6% khi thanh toán sớm - <a href="/register">Đăng ký ngay!</a>',
        backgroundColor: '#1e40af',
        textColor: '#ffffff',
        isCloseable: true,
      },

      image: 'img/economy-city-social-card.jpg',
      
      mermaid: {
        theme: {light: 'neutral', dark: 'forest'},
      },

      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },

      navbar: {
        title: 'Economy City',
        logo: {
          alt: 'Economy City Logo',
          src: 'img/logo.jpg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tổng quan',
          },
          {to: '/docs/location', label: 'Vị trí', position: 'left'},
          {to: '/docs/products', label: 'Sản phẩm', position: 'left'},
          {to: '/docs/payment', label: 'Thanh toán', position: 'left'},
          {to: '/docs/gallery', label: 'Thư viện', position: 'left'},
          {to: '/contact', label: 'Liên hệ', position: 'left'},
          {
            to: '/register',
            label: 'Đăng ký tư vấn',
            position: 'right',
            className: 'navbar-register-button',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Thông tin dự án',
            items: [
              {
                label: 'Tổng quan',
                to: '/docs/intro',
              },
              {
                label: 'Vị trí',
                to: '/docs/location',
              },
              {
                label: 'Tiện ích',
                to: '/docs/amenities',
              },
            ],
          },
          {
            title: 'Sản phẩm',
            items: [
              {
                label: 'Nhà phố thương mại',
                to: '/docs/products',
              },
              {
                label: 'Biệt thự',
                to: '/docs/products#villas',
              },
              {
                label: 'Căn hộ cao tầng',
                to: '/docs/products#apartments',
              },
            ],
          },
          {
            title: 'Liên hệ',
            items: [
              {
                label: 'Hotline: 0988.156.516',
                href: 'tel:0123456789',
              },
              {
                label: 'Email: sales@economycity.vn',
                href: 'mailto:sales@economycity.vn',
              },
              {
                label: 'Văn phòng giao dịch',
                to: '/contact',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Economy City Văn Lâm. Tất cả quyền được bảo lưu.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;