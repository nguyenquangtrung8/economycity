/**
 * optimize-images.js - Tối ưu hóa hình ảnh cho dự án Economy City
 * Tự động chạy khi build hoặc start dự án
 * Nguồn: /static/imgbase -> Đích: /static/img
 * Chuyển đổi tên file thành không dấu, không dấu cách
 * Chỉ xuất ra định dạng WebP
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Đường dẫn thư mục
const INPUT_DIR = path.join(__dirname, '../static/imgbase');
const OUTPUT_DIR = path.join(__dirname, '../static/img');

// Hàm chuyển đổi tiếng Việt có dấu thành không dấu
function convertToNonAccentVietnamese(str) {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  
  // Xóa ký tự đặc biệt
  str = str.replace(/[^a-z0-9\s]/gi, "");
  
  // Thay thế dấu cách bằng dấu gạch ngang
  str = str.replace(/\s+/g, "_");
  
  // Xóa các dấu gạch ngang liên tiếp
  str = str.replace(/-+/g, "-");
  
  // Xóa dấu gạch ngang ở đầu và cuối
  str = str.replace(/^-+|-+$/g, "");
  
  return str;
}

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
  // Lấy đường dẫn tương đối so với thư mục input
  const relativePath = path.relative(INPUT_DIR, imagePath);
  const outputDirectory = path.dirname(path.join(OUTPUT_DIR, relativePath));
  
  // Chuyển đổi tên file thành không dấu, không dấu cách
  const originalFileName = path.parse(imagePath).name;
  const fileName = convertToNonAccentVietnamese(originalFileName);

  // Tạo thư mục đầu ra nếu chưa tồn tại
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  try {
    console.log(`🔄 Đang xử lý: ${relativePath}`);
    
    if (originalFileName !== fileName) {
      console.log(`✏️ Tên file cũ: "${originalFileName}" -> Tên file mới: "${fileName}"`);
    }

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

    // Tạo phiên bản WebP (nén tốt nhất cho web)
    const webpOutputPath = path.join(outputDirectory, `${fileName}.webp`);
    const webpFileExists = fs.existsSync(webpOutputPath);
    
    if (webpFileExists) {
      console.log(`ℹ️ Ghi đè file WebP hiện có: ${webpOutputPath}`);
    }
    
    await sharp(imagePath)
      // Resize nếu quá lớn (giữ nguyên tỷ lệ)
      .resize({
        width: shouldResize ? maxWidth : null,
        height: shouldResize ? maxHeight : null,
        withoutEnlargement: true,
        fit: 'inside' // Giữ nguyên tỷ lệ
      })
      // Chuyển sang WebP với chất lượng tốt
      .webp({
        quality: 85, // Chất lượng 85%
        effort: 6,
        smartSubsample: true,
        reductionEffort: 6
      })
      // Lưu file
      .toFile(webpOutputPath);

    console.log(`✅ Đã xử lý: ${relativePath}`);

    // Tính toán mức giảm kích thước
    const originalSize = fs.statSync(imagePath).size;
    const webpSize = fs.statSync(webpOutputPath).size;
    const compressionRatio = (1 - webpSize / originalSize) * 100;

    console.log(
      `📊 Giảm ${compressionRatio.toFixed(1)}% kích thước (WebP: ${formatFileSize(webpSize)} | Gốc: ${formatFileSize(originalSize)})`
    );
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

// Tạo bảng ánh xạ tên file
function createFilenameMap(imageFiles) {
  const filenameMap = {};
  
  for (const imagePath of imageFiles) {
    const originalName = path.parse(imagePath).name;
    const convertedName = convertToNonAccentVietnamese(originalName);
    
    if (originalName !== convertedName) {
      filenameMap[originalName] = convertedName;
    }
  }
  
  return filenameMap;
}

// Hàm chính
async function optimizeImages() {
  console.log('🎨 Bắt đầu tối ưu hóa hình ảnh...');
  console.log(`📂 Thư mục nguồn: ${INPUT_DIR}`);
  console.log(`📂 Thư mục đích: ${OUTPUT_DIR}`);
  console.log(`ℹ️ Định dạng đầu ra: chỉ WebP`);

  // Kiểm tra thư mục đầu vào
  if (!fs.existsSync(INPUT_DIR)) {
    console.warn(`⚠️ Thư mục nguồn ${INPUT_DIR} không tồn tại! Đang tạo...`);
    fs.mkdirSync(INPUT_DIR, { recursive: true });
    console.log(`✅ Đã tạo thư mục nguồn. Vui lòng thêm hình ảnh vào ${INPUT_DIR}`);
    return;
  }

  // Tạo thư mục output nếu chưa tồn tại
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`✅ Đã tạo thư mục đích ${OUTPUT_DIR}`);
  } else {
    console.log(`ℹ️ Thư mục đích ${OUTPUT_DIR} đã tồn tại, sẽ ghi đè các file khi cần thiết.`);
  }

  // Lấy tất cả file hình ảnh
  const imageFiles = getAllImageFiles(INPUT_DIR);

  if (imageFiles.length === 0) {
    console.log('ℹ️ Không tìm thấy hình ảnh nào để xử lý.');
    return;
  }

  console.log(`🖼️ Tìm thấy ${imageFiles.length} hình ảnh để xử lý...`);
  
  // Tạo bảng ánh xạ tên file và lưu vào file nếu có sự thay đổi tên
  const filenameMap = createFilenameMap(imageFiles);
  if (Object.keys(filenameMap).length > 0) {
    console.log('📝 Danh sách tên file được chuyển đổi:');
    for (const [original, converted] of Object.entries(filenameMap)) {
      console.log(`  • "${original}" -> "${converted}"`);
    }
    
    // Lưu bảng ánh xạ tên file vào JSON để tham khảo sau này
    const mapFilePath = path.join(OUTPUT_DIR, 'filename-map.json');
    
    if (fs.existsSync(mapFilePath)) {
      console.log(`ℹ️ Ghi đè file ánh xạ tên hiện có: ${mapFilePath}`);
    }
    
    fs.writeFileSync(
      mapFilePath, 
      JSON.stringify(filenameMap, null, 2),
      'utf8'
    );
  }

  // Xử lý từng hình ảnh
  for (const imagePath of imageFiles) {
    await processImage(imagePath);
  }

  console.log('✨ Quá trình tối ưu hóa hình ảnh hoàn tất!');
  console.log('🚀 Các hình ảnh đã được tối ưu hóa thành WebP, đổi tên và sao chép vào thư mục /static/img');
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
  } catch (error) {
    console.error('❌ Lỗi:', error);
    process.exit(1);
  }
})();