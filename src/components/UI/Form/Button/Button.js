import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  onClick,
  startIcon,
  endIcon,
  iconOnly = false,
  fullWidth = false,
  loading = false,
  href,
  target,
  rel,
  shadow = false, // Prop mới: Thêm shadow
  'aria-label': ariaLabel,
  ...rest
}) => {
  // Validate props
  const validVariants = ['primary', 'secondary', 'outline', 'ghost', 'text', 'cta'];
  const validSizes = ['sm', 'md', 'lg', 'xl'];

  if (!validVariants.includes(variant)) {
    console.warn(`Invalid variant "${variant}". Defaulting to "primary".`);
    variant = 'primary';
  }

  if (!validSizes.includes(size)) {
    console.warn(`Invalid size "${size}". Defaulting to "md".`);
    size = 'md';
  }

  // State for active feedback
  const [isActive, setIsActive] = useState(false);

  // Handle click with active state
  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }

    setIsActive(true);
    setTimeout(() => setIsActive(false), 200); // Reset active state after 200ms

    onClick?.(e);
  };

  // Build CSS classes
  const buttonClasses = [
    styles.button,
    styles[`button-${variant}`],
    styles[`button-${size}`],
    iconOnly && styles.iconOnly,
    fullWidth && styles.fullWidth,
    loading && styles.loading,
    (disabled || loading) && styles.disabled,
    isActive && styles.active, // Add active class
    shadow && styles.shadow, // Add shadow class
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Accessibility props
  const a11yProps = {
    'aria-disabled': disabled || loading,
    'aria-busy': loading,
    'aria-label': ariaLabel || (iconOnly ? 'Button' : undefined),
  };

  // Filter out unnecessary props
  const VALID_PROPS = [
    'id', 'title', 'role', 'tabIndex', 'onClick', 'onKeyDown', 'onFocus', 'onBlur',
    'aria-label', 'aria-hidden', 'aria-disabled', 'aria-busy', 'aria-expanded',
  ];

  const filteredRest = Object.fromEntries(
    Object.entries(rest).filter(([key]) => 
      VALID_PROPS.includes(key) || key.startsWith('data-') || key.startsWith('aria-')
    )
  );

  // Render spinner
  const renderSpinner = () => (
    <span className={styles.spinner} aria-hidden="true">
      <span className={styles.spinnerDot}></span>
      <span className={styles.spinnerDot}></span>
      <span className={styles.spinnerDot}></span>
    </span>
  );

  // Render content
  const renderContent = () => (
    <>
      {loading && renderSpinner()}
      {startIcon && !loading && (
        <span className={styles.startIcon} aria-hidden="true">
          {startIcon}
        </span>
      )}
      {!iconOnly && children && (
        <span className={styles.content}>{children}</span>
      )}
      {endIcon && !loading && (
        <span className={styles.endIcon} aria-hidden="true">
          {endIcon}
        </span>
      )}
    </>
  );

  // Render as <a> or <button>
  if (href && !disabled) {
    return (
      <a
        href={href}
        className={buttonClasses}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : rel}
        onClick={handleClick}
        {...a11yProps}
        {...filteredRest}
      >
        {renderContent()}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={handleClick}
      {...a11yProps}
      {...filteredRest}
    >
      {renderContent()}
    </button>
  );
};

// Prop types validation
Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'text', 'cta']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  iconOnly: PropTypes.bool,
  fullWidth: PropTypes.bool,
  loading: PropTypes.bool,
  href: PropTypes.string,
  target: PropTypes.string,
  rel: PropTypes.string,
  shadow: PropTypes.bool, // New prop
  'aria-label': PropTypes.string,
};

export default Button;