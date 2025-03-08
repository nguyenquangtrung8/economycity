/**
 * optimize-images.js - Tối ưu hóa hình ảnh cho dự án Economy City
 * Sử dụng Sharp để nén và chuyển đổi hình ảnh
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const chokidar = require('chokidar');

// Đường dẫn thư mục
const INPUT_DIR = path.join(__dirname, '../static/img');
const OUTPUT_DIR = path.join(__dirname, '../static/img-optimized');

// Parse arguments
const args = process.argv.slice(2);
const WATCH_MODE = args.includes('--watch') || args.includes('-w');

// Hàm đọc tất cả các file hình ảnh
function getAllImageFiles(dir) {
  let results = [];

  if (!fs.existsSync(dir)) {
    console.error(`❌ Thư mục ${dir} không tồn tại!`);
    return results;
  }

  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      results = results.concat(getAllImageFiles(fullPath));
    } else if (/\.(jpg|jpeg|png|gif)$/i.test(item.name)) {
      results.push(fullPath);
    }
  }

  return results;
}

// Xử lý một hình ảnh
async function processImage(imagePath) {
  // Bỏ qua nếu là trong thư mục đã tối ưu
  if (imagePath.includes(OUTPUT_DIR)) {
    return;
  }

  // Lấy đường dẫn tương đối so với thư mục input
  const relativePath = path.relative(INPUT_DIR, imagePath);
  const outputDirectory = path.dirname(path.join(OUTPUT_DIR, relativePath));
  const fileName = path.parse(imagePath).name;
  const extension = path.parse(imagePath).ext.toLowerCase();

  // Tạo thư mục đầu ra nếu chưa tồn tại
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  try {
    console.log(`🔄 Đang xử lý: ${relativePath}`);

    // Lấy thông tin hình ảnh
    const metadata = await sharp(imagePath).metadata();
    const fileSize = fs.statSync(imagePath).size; // Lấy kích thước file gốc

    // Giới hạn kích thước file để không resize
    const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
    const shouldResizeBySize = fileSize > MAX_FILE_SIZE;

    // Giới hạn kích thước ảnh để không resize
    const maxWidth = 3840; // Giới hạn chiều rộng tối đa
    const maxHeight = 2560; // Giới hạn chiều cao tối đa
    const shouldResizeByDimensions = metadata.width > maxWidth || metadata.height > maxHeight;

    // Chỉ resize nếu vượt quá giới hạn kích thước file hoặc kích thước ảnh
    const shouldResize = shouldResizeBySize || shouldResizeByDimensions;

    // 1. Tạo phiên bản WebP (nén tốt nhất cho web)
    await sharp(imagePath)
      // Resize nếu quá lớn (giữ nguyên tỷ lệ)
      .resize({
        width: shouldResize ? maxWidth : null,
        height: shouldResize ? maxHeight : null,
        withoutEnlargement: true,
        fit: 'inside' // Giữ nguyên tỷ lệ
      })
      // Chuyển sang WebP với chất lượng tốt hơn
      .webp({
        quality: 85, // Tăng chất lượng lên 85
        effort: 6,
        smartSubsample: true,
        reductionEffort: 6
      })
      // Lưu file
      .toFile(path.join(outputDirectory, `${fileName}.webp`));

    // 2. Xử lý phiên bản nén của file gốc (dự phòng cho trình duyệt cũ)
    if (extension === '.jpg' || extension === '.jpeg') {
      // Nén JPEG
      await sharp(imagePath)
        .resize({
          width: shouldResize ? maxWidth : null,
          height: shouldResize ? maxHeight : null,
          withoutEnlargement: true,
          fit: 'inside'
        })
        .jpeg({
          quality: 90, // Tăng chất lượng lên 90
          progressive: true,
          chromaSubsampling: '4:2:0',
          trellisQuantisation: true,
          overshootDeringing: true,
          optimizeScans: true
        })
        .toFile(path.join(outputDirectory, `${fileName}.jpg`));

    } else if (extension === '.png') {
      // Nén PNG
      await sharp(imagePath)
        .resize({
          width: shouldResize ? maxWidth : null,
          height: shouldResize ? maxHeight : null,
          withoutEnlargement: true,
          fit: 'inside'
        })
        .png({
          progressive: true,
          compressionLevel: 9,
          adaptiveFiltering: true,
          palette: true
        })
        .toFile(path.join(outputDirectory, `${fileName}.png`));

    } else if (extension === '.gif') {
      // GIFs không được Sharp hỗ trợ tốt để tối ưu, nên chỉ copy
      fs.copyFileSync(imagePath, path.join(outputDirectory, path.basename(imagePath)));
    }

    // 3. Tạo placeholder cho lazy loading
    await sharp(imagePath)
      .resize(20)
      .blur(5)
      .toBuffer()
      .then(data => {
        const base64 = `data:image/jpeg;base64,${data.toString('base64')}`;
        fs.writeFileSync(path.join(outputDirectory, `${fileName}.placeholder.txt`), base64);
      });

    console.log(`✅ Đã xử lý: ${relativePath}`);

    // Tính toán mức giảm kích thước
    const originalSize = fs.statSync(imagePath).size;
    const webpPath = path.join(outputDirectory, `${fileName}.webp`);

    if (fs.existsSync(webpPath)) {
      const webpSize = fs.statSync(webpPath).size;
      const compressionRatio = (1 - webpSize / originalSize) * 100;

      console.log(
        `📊 Giảm ${compressionRatio.toFixed(1)}% kích thước (WebP: ${formatFileSize(webpSize)} | Gốc: ${formatFileSize(originalSize)})`
      );
    }
  } catch (error) {
    console.error(`❌ Lỗi khi xử lý ${relativePath}:`, error.message);
  }
}

// Định dạng kích thước file
function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// Hàm chính
async function optimizeImages() {
  console.log('🔍 Đang quét tất cả hình ảnh...');

  // Tạo thư mục output nếu chưa tồn tại
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Lấy tất cả file hình ảnh
  const imageFiles = getAllImageFiles(INPUT_DIR);

  console.log(`🖼️ Tìm thấy ${imageFiles.length} hình ảnh để xử lý...`);

  // Xử lý từng hình ảnh
  for (const imagePath of imageFiles) {
    await processImage(imagePath);
  }

  console.log('✨ Quá trình tối ưu hóa hình ảnh hoàn tất!');

  // Nếu ở chế độ theo dõi, bắt đầu chokidar
  if (WATCH_MODE) {
    startWatcher();
  }
}

// Khởi động chế độ theo dõi file
function startWatcher() {
  console.log('👀 Đang theo dõi thay đổi trong thư mục hình ảnh...');

  // Theo dõi tất cả hình ảnh trong thư mục input
  const watcher = chokidar.watch(['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.gif'], {
    cwd: INPUT_DIR,
    ignoreInitial: true
  });

  // Xử lý hình ảnh khi có thêm hoặc thay đổi
  watcher.on('add', filePath => {
    const fullPath = path.join(INPUT_DIR, filePath);
    console.log(`🆕 Phát hiện hình ảnh mới: ${filePath}`);
    processImage(fullPath);
  });

  watcher.on('change', filePath => {
    const fullPath = path.join(INPUT_DIR, filePath);
    console.log(`🔄 Phát hiện hình ảnh thay đổi: ${filePath}`);
    processImage(fullPath);
  });

  console.log('💡 Mẹo: Nhấn Ctrl+C để dừng chế độ theo dõi');
}

// Chạy script
(async () => {
  try {
    // Kiểm tra Sharp đã cài đặt
    try {
      require.resolve('sharp');
    } catch (error) {
      console.error('❌ Sharp chưa được cài đặt. Vui lòng chạy lệnh: npm install sharp --save-dev');
      process.exit(1);
    }

    // Bắt đầu quá trình tối ưu hóa
    await optimizeImages();

    // Thoát nếu không ở chế độ watch
    if (!WATCH_MODE) {
      process.exit(0);
    }
  } catch (error) {
    console.error('❌ Lỗi:', error);
    process.exit(1);
  }
})();