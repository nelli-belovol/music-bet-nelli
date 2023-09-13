import React from 'react';

import styled from './TextError.module.scss';

interface IProps {
  children: React.ReactNode;
}

const TextError: React.FC<IProps> = ({ children }) => {
  return <div className={styled.error}>{children}</div>;
};

export { TextError };
