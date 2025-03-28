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
  url: 'https://economycity-hy.com',
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

  // Thêm headTags để tối ưu SEO
  headTags: [
    // Meta description
    {
      tagName: 'meta',
      attributes: {
        name: 'description',
        content: 'Economy City Văn Lâm - Khu đô thị kiểu mẫu phía Đông Hà Nội. Cơ hội đầu tư sinh lời bền vững với vị trí đắc địa, tiện ích đầy đủ. Giá chỉ từ 107 triệu/m².',
      },
    },
    // Meta keywords
    {
      tagName: 'meta',
      attributes: {
        name: 'keywords',
        content: 'Economy City Văn Lâm, nhà phố thương mại, biệt thự, căn hộ cao tầng, Như Quỳnh, Hưng Yên, đầu tư bất động sản, thị trấn Như Quỳnh',
      },
    },
    // Canonical
    {
      tagName: 'link',
      attributes: {
        rel: 'canonical',
        href: 'https://economycity-hy.com',
      },
    },
    // OG tags
    {
      tagName: 'meta',
      attributes: {
        property: 'og:title',
        content: 'Economy City Văn Lâm | Không gian sống đẳng cấp - Cơ hội đầu tư vượt trội',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:description',
        content: 'Đô thị hiện đại 37ha tại trung tâm Như Quỳnh, Văn Lâm, Hưng Yên. Giá chỉ từ 107 triệu/m², tiềm năng tăng giá khi Văn Lâm lên thành phố năm 2030.',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:type',
        content: 'website',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:url',
        content: 'https://economycity-hy.com',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:image',
        content: 'https://economycity-hy.com/img/economy-city-social-card.jpg',
      },
    },
    // Twitter Card
    {
      tagName: 'meta',
      attributes: {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'twitter:title',
        content: 'Economy City Văn Lâm | Không gian sống đẳng cấp - Cơ hội đầu tư vượt trội',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'twitter:description',
        content: 'Đô thị hiện đại 37ha tại trung tâm Như Quỳnh, Văn Lâm, Hưng Yên. Giá chỉ từ 107 triệu/m², tiềm năng tăng giá khi Văn Lâm lên thành phố năm 2030.',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'twitter:image',
        content: 'https://economycity-hy.com/img/economy-city-social-card.jpg',
      },
    },
    // Mobile Optimization
    {
      tagName: 'meta',
      attributes: {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0',
      },
    },
    // Resource Hints
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
    // Structured Data - LocalBusiness
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'RealEstateAgent',
        'name': 'Economy City Văn Lâm',
        'description': 'Khu đô thị kiểu mẫu phía Đông Hà Nội',
        'url': 'https://economycity-hy.com',
        'logo': 'https://economycity-hy.com/img/logo.jpg',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Thị trấn Như Quỳnh',
          'addressLocality': 'Văn Lâm',
          'addressRegion': 'Hưng Yên',
          'postalCode': '100000',
          'addressCountry': 'VN'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 20.9405, // Cần cập nhật tọa độ chính xác
          'longitude': 105.9812 // Cần cập nhật tọa độ chính xác
        },
        'telephone': '0988.156.516',
        'email': 'sales@economycity-hy.com',
        'openingHoursSpecification': {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
          ],
          'opens': '08:00',
          'closes': '17:30'
        },
        'priceRange': '$$'
      }),
    },
    // Structured Data - Product
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': 'Economy City Văn Lâm',
        'description': 'Khu đô thị kiểu mẫu phía Đông Hà Nội với vị trí đắc địa cách Hà Nội 18km',
        'image': 'https://economycity-hy.com/img/economy-city-social-card.jpg',
        'brand': {
          '@type': 'Brand',
          'name': 'Hoàng Vương'
        },
        'offers': {
          '@type': 'Offer',
          'priceCurrency': 'VND',
          'price': '107000000',
          'priceValidUntil': '2025-12-31',
          'availability': 'https://schema.org/InStock'
        }
      }),
    }
  ],

  // Giữ lại tính năng Mermaid để vẽ sơ đồ nếu cần
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  // Plugins: chỉ giữ lại tính năng tìm kiếm và Google Analytics
  plugins: [
    require.resolve('docusaurus-lunr-search'),
    // [
    //   '@docusaurus/plugin-google-gtag',
    //   {
    //     trackingID: 'G-XXXXXXXXXX', // Thay bằng ID Google Analytics thực tế
    //     anonymizeIP: true,
    //   },
    // ],
  ],
  
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
        blog: {
          showReadingTime: true,
          blogSidebarTitle: 'Bài viết gần đây',
          blogSidebarCount: 6,
          postsPerPage: 9,
          blogTitle: 'Blog Bất Động Sản',
          blogDescription: 'Cập nhật thông tin thị trường, phân tích đầu tư và tin tức mới nhất về dự án Economy City Văn Lâm',
          feedOptions: {
            type: 'all',
            title: 'Blog Economy City Văn Lâm',
            description: 'Cập nhật thông tin thị trường, phân tích đầu tư và tin tức mới nhất về dự án Economy City Văn Lâm',
            copyright: `Copyright © ${new Date().getFullYear()} Economy City Văn Lâm. Tất cả quyền được bảo lưu.`,
            language: 'vi',
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        // Thêm cấu hình sitemap ở đây để tránh trùng lặp plugin
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
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

      // Hình ảnh mặc định cho social sharing
      image: 'img/economy-city-social-card.jpg',
      
      // Cấu hình cho Mermaid
      mermaid: {
        theme: {light: 'neutral', dark: 'forest'},
      },

      // Cấu hình metadata
      metadata: [
        {name: 'robots', content: 'index, follow'},
        {name: 'author', content: 'Economy City Văn Lâm'},
        {name: 'language', content: 'Vietnamese'},
        {name: 'revisit-after', content: '7 days'},
        {name: 'geo.region', content: 'VN-HY'},
        {name: 'geo.placename', content: 'Văn Lâm, Hưng Yên'},
      ],

      // Cấu hình docs
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },

      // Cấu hình navbar
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
            to: '/layout',
            label: 'Mặt bằng',
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
            label: 'Chính sách',
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
            to: '/blog',
            label: 'Blog',
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
                href: '/#hero',
              },
              {
                label: 'Vị trí chiến lược',
                href: '/#location',
              },
              {
                label: 'Tiện ích đa dạng',
                href: '/#typicalFloor',
              },
              {
                label: 'Pháp lý & Cam kết',
                href: '/#legal',
              },
            ],
          },
          {
            title: 'Sản phẩm đầu tư',
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
              {
                label: 'Bảng giá chi tiết',
                href: '/#priceList',
              },
            ],
          },
          {
            title: 'Chính sách & Hỗ trợ',
            items: [
              {
                label: 'Chính sách bán hàng',
                href: '/#salesPolicy',
              },
              {
                label: 'Phương thức thanh toán',
                href: '/#salesPolicy',
              },
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'Câu hỏi thường gặp',
                href: '/#FAQs',
              },
            ],
          },
          {
            // title: 'Liên hệ',
            items: [
              {
                html: `
                  <div class="footer-contact-box">
                    <a href="/#contact" class="footer-contact-button">
                      Đăng ký tư vấn ngay
                    </a>
                    <div class="footer-social-icons">
                      <a href="https://facebook.com/economycityhy" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/></svg>
                      </a>
                      <a href="https://youtube.com/economycityhy" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M10 15L15.19 12L10 9V15M21.56 7.17C21.69 7.64 21.78 8.27 21.84 9.07C21.91 9.87 21.94 10.56 21.94 11.16L22 12C22 14.19 21.84 15.8 21.56 16.83C21.31 17.73 20.73 18.31 19.83 18.56C19.36 18.69 18.5 18.78 17.18 18.84C15.88 18.91 14.69 18.94 13.59 18.94L12 19C7.81 19 5.2 18.84 4.17 18.56C3.27 18.31 2.69 17.73 2.44 16.83C2.31 16.36 2.22 15.73 2.16 14.93C2.09 14.13 2.06 13.44 2.06 12.84L2 12C2 9.81 2.16 8.2 2.44 7.17C2.69 6.27 3.27 5.69 4.17 5.44C4.64 5.31 5.5 5.22 6.82 5.16C8.12 5.09 9.31 5.06 10.41 5.06L12 5C16.19 5 18.8 5.16 19.83 5.44C20.73 5.69 21.31 6.27 21.56 7.17Z"/></svg>
                      </a>
                      <a href="https://zalo.me/0988156516" target="_blank" rel="noopener noreferrer" aria-label="Zalo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.49 10.272v-.45h1.347v6.322h-1.347v-.453h-3.53v.453H7.61V9.822h1.347v.45zm0 1.314v3.094h-3.53v-3.094zm-2.344.732a.868.868 0 0 0-.642-.246.892.892 0 0 0-.656.25.888.888 0 0 0-.264.66c0 .62.335.914.95.862a.858.858 0 0 0 .862-.872.877.877 0 0 0-.25-.654M7.554 7.755a4.53 4.53 0 0 1 1.88-1.371 6.008 6.008 0 0 1 2.513-.536c.517 0 1.007.062 1.466.173.458.11.861.267 1.2.453.342.19.634.394.876.608.245.214.432.439.567.665l-1.104.781a2.776 2.776 0 0 0-.452-.475 3.204 3.204 0 0 0-.674-.453 4.14 4.14 0 0 0-.896-.342 4.47 4.47 0 0 0-1.129-.135c-.44 0-.864.07-1.274.206a3.416 3.416 0 0 0-1.074.572 3.3 3.3 0 0 0-.813.905 3.907 3.907 0 0 0-.497 1.226H7.554zm10.205 2.7a.839.839 0 0 0-.258-.625.817.817 0 0 0-.616-.26.839.839 0 0 0-.626.26.817.817 0 0 0-.258.625c0 .237.086.45.258.626a.835.835 0 0 0 .626.26.82.82 0 0 0 .616-.26.83.83 0 0 0 .258-.626m2.344 0a2.333 2.333 0 0 1-.339 1.226 2.44 2.44 0 0 1-.887.875 2.397 2.397 0 0 1-1.21.316c-.484 0-.922-.105-1.307-.316a2.378 2.378 0 0 1-.913-.875 2.32 2.32 0 0 1-.336-1.226c0-.466.112-.89.336-1.275a2.38 2.38 0 0 1 .913-.904 2.383 2.383 0 0 1 1.307-.329c.453 0 .874.11 1.21.329.337.214.623.518.887.904.232.386.339.809.339 1.275M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2"/></svg>
                      </a>
                    </div>
                  </div>
                `,
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Economy City Văn Lâm. Tất cả quyền được bảo lưu.`,
      },      
      // Prism highlighting
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      
      // Cấu hình tốc độ tải trang
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true, // Tắt dark mode để tối ưu trải nghiệm và tăng tốc
      },
    }),
};

export default config;