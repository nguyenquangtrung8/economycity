// src/components/UI/Layout/Container/Container.js
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Container.module.css';

const cx = classNames.bind(styles);

const defaultBreakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px'
};

/**
 * Container Component
 * 
 * Cung cấp container có chiều rộng cố định và responsive, với nhiều tùy chọn
 * 
 * @param {ReactNode} children - Nội dung bên trong container
 * @param {string|array} className - CSS class bổ sung
 * @param {boolean} fluid - Nếu true, container sẽ có width 100%
 * @param {ElementType} as - Element type để render (div, section, article, etc.)
 * @param {boolean} center - Nếu true, nội dung sẽ được căn giữa theo chiều dọc
 * @param {boolean} narrow - Nếu true, container sẽ có chiều rộng hẹp (800px)
 * @param {boolean} padded - Nếu true, thêm padding dọc 1.5rem
 * @param {Object} breakpoints - Cấu hình custom breakpoints
 */
const Container = ({ 
  children, 
  className,
  fluid = false,
  as: Component = 'div',
  center = false,
  narrow = false,
  padded = false,
  breakpoints,
  ...rest 
}) => {
  const mergedBreakpoints = { ...defaultBreakpoints, ...breakpoints };
  
  const style = {
    '--breakpoint-sm': mergedBreakpoints.sm,
    '--breakpoint-md': mergedBreakpoints.md,
    '--breakpoint-lg': mergedBreakpoints.lg,
    '--breakpoint-xl': mergedBreakpoints.xl
  };
  
  return (
    <Component 
      className={cx(
        'container',
        {
          containerFluid: fluid,
          containerCenter: center,
          containerNarrow: narrow,
          containerPadded: padded
        },
        typeof className === 'string' ? className.split(' ') : className
      )}
      style={style}
      {...rest}
    >
      {children}
    </Component>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  fluid: PropTypes.bool,
  as: PropTypes.elementType,
  center: PropTypes.bool,
  narrow: PropTypes.bool,
  padded: PropTypes.bool,
  breakpoints: PropTypes.shape({
    sm: PropTypes.string,
    md: PropTypes.string,
    lg: PropTypes.string,
    xl: PropTypes.string
  })
};

Container.displayName = 'Container';

export default React.memo(Container);