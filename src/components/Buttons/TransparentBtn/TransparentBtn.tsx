import React from 'react';
import styled from './TransparentBtn.module.scss';

interface IProps {
  title: string;
  additionalStyles?: any;
  handleClick?: () => void;
}

const TransparentBtn: React.FC<IProps> = ({ title, handleClick, additionalStyles = {} }) => {
  return (
    <button onClick={handleClick} className={styled.container} style={additionalStyles}>
      <span className={styled.title}>{title}</span>
    </button>
  );
};

export { TransparentBtn };
