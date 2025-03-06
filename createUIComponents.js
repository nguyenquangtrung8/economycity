// createUIComponents.js
const fs = require('fs');
const path = require('path');

// Thư mục gốc cho UI components
const baseDir = path.join('src', 'components', 'UI');

// Cấu trúc các components
const componentGroups = {
  Layout: [
    'Container',
    'Section',
    'Grid',
    'Flex',
    'Box',
    'Stack',
    'Divider',
    'AspectRatio'
  ],
  Typography: [
    'Title',
    'Subtitle',
    'Paragraph',
    'Text',
    'Badge',
    'HighlightedText',
    'Quote',
    'Label'
  ],
  Form: [
    'Button',
    'Input',
    'Textarea',
    'Select',
    'Checkbox',
    'Radio',
    'Switch',
    'FormGroup',
    'FileInput',
    'DatePicker',
    'FormLabel',
    'InputGroup'
  ],
  DataDisplay: [
    'Card',
    'List',
    'Table',
    'Stat',
    'PropertyList',
    'Timeline',
    'Avatar',
    'Tag',
    'Tooltip',
    'AvatarGroup'
  ],
  Feedback: [
    'Alert',
    'Modal',
    'Drawer',
    'Skeleton',
    'Spinner',
    'Toast',
    'Progress',
    'Popover'
  ],
  Navigation: [
    'Tabs',
    'Pagination',
    'Breadcrumbs',
    'Dropdown',
    'Menu',
    'NavLink',
    'Stepper'
  ],
  Interactive: [
    'Accordion',
    'Carousel',
    'Slider',
    'Rating',
    'Typing',
    'ScrollToTop',
    'ImageZoom',
    'Clipboard'
  ],
  Media: [
    'Image',
    'ImageWithOverlay',
    'Video',
    'Gallery',
    'Icon',
    'IconButton',
    'BackgroundImage'
  ]
};

// Template cho file component JS
const jsTemplate = (componentName) => `import React from 'react';
import styles from './${componentName}.module.css';

/**
 * ${componentName} component
 * @param {ReactNode} children - The content
 * @param {string} className - Additional CSS classes
 */
const ${componentName} = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <div 
      className={\`\${styles.${componentName.charAt(0).toLowerCase() + componentName.slice(1)}} \${className}\`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default ${componentName};
`;

// Template cho file CSS Module
const cssTemplate = (componentName) => `.${componentName.charAt(0).toLowerCase() + componentName.slice(1)} {
  /* Default styles for ${componentName} */
}
`;

// Tạo thư mục nếu chưa tồn tại
const createDirIfNotExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
};

// Tạo file nếu chưa tồn tại
const createFileIfNotExists = (filePath, content) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`Created file: ${filePath}`);
  } else {
    console.log(`File already exists: ${filePath}`);
  }
};

// Tạo cấu trúc thư mục và file
const createUIComponents = () => {
  // Tạo thư mục gốc
  createDirIfNotExists(baseDir);

  // Tạo các nhóm components
  Object.entries(componentGroups).forEach(([groupName, components]) => {
    const groupDir = path.join(baseDir, groupName);
    createDirIfNotExists(groupDir);

    // Tạo các components trong nhóm
    components.forEach(componentName => {
      const componentDir = path.join(groupDir, componentName);
      createDirIfNotExists(componentDir);

      // Tạo file JS
      const jsFilePath = path.join(componentDir, `${componentName}.js`);
      createFileIfNotExists(jsFilePath, jsTemplate(componentName));

      // Tạo file CSS Module
      const cssFilePath = path.join(componentDir, `${componentName}.module.css`);
      createFileIfNotExists(cssFilePath, cssTemplate(componentName));
    });
  });

  console.log('UI components structure created successfully!');
};

createUIComponents();