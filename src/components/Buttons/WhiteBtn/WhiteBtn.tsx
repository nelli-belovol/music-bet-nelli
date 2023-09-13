import React from 'react';
import styled from './WhiteBtn.module.scss';

interface IProps {
  title: string;
  additionalStyle?: any;
  handleClick?: () => void;
}

const WhiteBtn: React.FC<IProps> = ({ title, handleClick, additionalStyle = {} }) => {
  return (
    <button onClick={handleClick} className={styled.container} style={additionalStyle}>
      <span className={styled.title}>{title}</span>
    </button>
  );
};

export { WhiteBtn };
