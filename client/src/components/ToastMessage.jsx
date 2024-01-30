import PropTypes from 'prop-types';
import './component.css';
import { useEffect } from 'react';

const ToastMessage = ({ isSuccess, message, autoCloseTimeout, onClose }) => {
  useEffect(() => {
    const handleClickOutside = () => {
      onClose();
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, autoCloseTimeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [autoCloseTimeout, onClose]);

  return (  
    <div className='toast-box'>
      <div className='toast'>
        <span className='toast-msg'>{`${isSuccess ? '✅' : '❌'} ${message}`}</span>
      </div>
    </div>
  );
};

ToastMessage.propTypes = {
  isSuccess: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  autoCloseTimeout: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ToastMessage;
