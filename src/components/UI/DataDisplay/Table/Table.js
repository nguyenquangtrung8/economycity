// src/components/UI/DataDisplay/Table/Table.js
import React, { useMemo } from 'react';
import styles from './Table.module.css';

/**
 * Table component - Hiển thị dữ liệu dạng bảng
 * @param {Array} columns - Cấu trúc các cột
 * @param {Array} data - Dữ liệu cần hiển thị
 * @param {string} className - Class bổ sung
 * @param {boolean} striped - Có sọc ngang xen kẽ
 * @param {boolean} bordered - Có đường viền
 * @param {boolean} responsive - Bảng responsive
 * @param {boolean} hover - Hiệu ứng hover cho mỗi hàng
 * @param {string} size - Kích thước (sm, md, lg)
 * @param {ReactNode} caption - Caption của bảng
 * @param {ReactNode} footer - Footer của bảng
 * @param {ReactNode} emptyState - Nội dung hiển thị khi không có dữ liệu
 */
const Table = ({
  columns = [],
  data = [],
  className = '',
  striped = true,
  bordered = true,
  responsive = true,
  hover = true,
  size = 'md',
  caption,
  footer,
  emptyState,
  ...rest
}) => {
  // Kiểm tra xem có dữ liệu hay không
  const hasData = data.length > 0;
  
  // Tạo headers
  const tableHeaders = useMemo(() => {
    return (
      <tr>
        {columns.map((column, index) => (
          <th 
            key={column.key || index} 
            className={column.className || ''}
            style={{
              width: column.width || 'auto',
              textAlign: column.align || 'left',
              ...column.style
            }}
          >
            {column.title}
          </th>
        ))}
      </tr>
    );
  }, [columns]);
  
  // Tạo nội dung bảng
  const tableBody = useMemo(() => {
    if (!hasData) {
      return (
        <tr>
          <td colSpan={columns.length} className={styles.emptyState}>
            {emptyState || 'Không có dữ liệu'}
          </td>
        </tr>
      );
    }
    
    return data.map((row, rowIndex) => (
      <tr key={row.key || rowIndex}>
        {columns.map((column, colIndex) => {
          // Xác định nội dung của ô
          const content = column.render 
            ? column.render(row[column.dataIndex], row, rowIndex) 
            : row[column.dataIndex];
          
          return (
            <td 
              key={column.key || colIndex}
              className={column.className || ''}
              style={{
                textAlign: column.align || 'left',
                ...column.style
              }}
            >
              {content}
            </td>
          );
        })}
      </tr>
    ));
  }, [data, columns, hasData, emptyState]);
  
  // Tạo footer
  const tableFooter = useMemo(() => {
    if (!footer) return null;
    
    return (
      <tfoot>
        {typeof footer === 'function' 
          ? footer(data, columns)
          : (
            <tr>
              <td colSpan={columns.length}>{footer}</td>
            </tr>
          )}
      </tfoot>
    );
  }, [footer, data, columns]);
  
  // Tạo bảng
  const tableElement = (
    <table 
      className={`
        ${styles.table}
        ${styles[`size-${size}`]}
        ${striped ? styles.striped : ''}
        ${bordered ? styles.bordered : ''}
        ${hover ? styles.hover : ''}
        ${className}
      `}
      {...rest}
    >
      {caption && <caption className={styles.caption}>{caption}</caption>}
      
      <thead>
        {tableHeaders}
      </thead>
      
      <tbody>
        {tableBody}
      </tbody>
      
      {tableFooter}
    </table>
  );
  
  // Wrap bảng trong container nếu là responsive
  return responsive ? (
    <div className={styles.responsiveWrapper}>
      {tableElement}
    </div>
  ) : tableElement;
};

export default Table;