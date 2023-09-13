import React from 'react';
import { ToastContainer } from 'react-toastify';

export const NotificationT: React.FC = () => {
  return (
    <ToastContainer
      position='top-center'
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};
