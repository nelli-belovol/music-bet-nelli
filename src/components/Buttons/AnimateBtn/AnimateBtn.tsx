import React from 'react';

import { ReactComponent as PathSvg } from '../../../assets/svg/Path.svg';

import styled from './AnimateBtn.module.scss';

interface IProps {
  title: string;
  additionalStyles?: any;
  handleClick?: () => void;
  type?: 'submit' | 'reset' | 'button';
}

const AnimateBtn: React.FC<IProps> = ({ title, handleClick, type, additionalStyles = {} }) => {
  return (
    <button className={styled.container} onClick={handleClick} type={type} style={additionalStyles}>
      <div className={styled.animatedArrow}>
        <PathSvg />
      </div>
      <span className={styled.title}>{title}</span>
    </button>
  );
};

export { AnimateBtn };
