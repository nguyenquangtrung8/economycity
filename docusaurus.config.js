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
          '🔥 Ưu đãi đặc biệt: Chiết khấu lên đến 6% khi thanh toán sớm - <a href="#contact">Đăng ký ngay!</a>',
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
            href: '/#hero',
            label: 'Tổng quan',
            position: 'left',
            className: 'navbar-center-item',
          },
          {
            href: '/#location',
            label: 'Vị trí',
            position: 'left',
            className: 'navbar-center-item',
          },
          {
            href: '/#features',
            label: 'Lợi thế cạnh tranh',
            position: 'left',
            className: 'navbar-center-item',
          },
          {
            href: '/#products',
            label: 'Sản phẩm',
            position: 'left',
            className: 'navbar-center-item',
          },
          {
            href: '/#priceList',
            label: 'Bảng giá',
            position: 'left',
            className: 'navbar-center-item',
          },
          {
            href: '/#typicalFloor',
            label: 'Tiện ích',
            position: 'left',
            className: 'navbar-center-item',
          },
          {
            href: '/#legal',
            label: 'Pháp lý',
            position: 'left',
            className: 'navbar-center-item',
          },
          {
            href: '/#salesPolicy',
            label: 'Chính sách bán hàng',
            position: 'left',
            className: 'navbar-center-item',
          },
          {
            href: '/#gallery',
            label: 'Gallery',
            position: 'left',
            className: 'navbar-center-item',
          },
          {
            href: '/#progress',
            label: 'Tiến độ',
            position: 'left',
            className: 'navbar-center-item',
          },
          {
            href: '/#FAQs',
            label: 'FAQs',
            position: 'left',
            className: 'navbar-center-item',
          },
          {
            href: '/#FAQs',
            label: 'Đối tác',
            position: 'left',
            className: 'navbar-center-item',
          },
          {
            href: '/#contact',
            label: 'Tham quan & Tư vấn',
            position: 'right',
            className: 'navbar-register-button',
          },
          {
            href: '/#blog',
            label: 'Tin tức',
            position: 'left',
            className: 'navbar-center-item',
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
                label: 'Hero',
                href: '/#hero',
              },
              {
                label: 'Features',
                href: '/#features',
              },
              {
                label: 'Products',
                href: '/#products',
              },
            ],
          },
          {
            title: 'Sản phẩm',
            items: [
              {
                label: 'Nhà phố thương mại',
                href: '/#products',
              },
              {
                label: 'Biệt thự',
                href: '/#products',
              },
              {
                label: 'Căn hộ cao tầng',
                href: '/#products',
              },
            ],
          },
          {
            title: 'Liên hệ',
            items: [
              {
                label: 'Hotline: 0123.456.789',
                href: 'tel:0123.456.789',
              },
              {
                label: 'Email: sales@economycity.vn',
                href: 'mailto:sales@economycity.vn',
              },
              {
                label: 'Văn phòng giao dịch',
                href: '/#contact',
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