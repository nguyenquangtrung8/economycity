// src/components/UI/Feedback/index.js
// File này export tất cả các Feedback components để dễ dàng import

import Alert from './Alert/Alert';
import Modal from './Modal/Modal';
import Spinner from './Spinner/Spinner';
import Toast from './Toast/Toast';
import Skeleton from './Skeleton/Skeleton';
import Popover from './Popover/Popover';

// Export tất cả components
export {
  Alert,
  Modal,
  Spinner,
  Toast,
  Skeleton,
  Popover
};

// Export mặc định là object chứa tất cả components
export default {
  Alert,
  Modal,
  Spinner,
  Toast,
  Skeleton,
  Popover
};