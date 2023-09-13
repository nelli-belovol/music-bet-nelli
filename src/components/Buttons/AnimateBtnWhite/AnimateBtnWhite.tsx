import React from 'react';
import styled from './AnimateBtnWhite.module.scss';
import { ReactComponent as PathSvg } from '../../../assets/svg/Path.svg';

interface IProps {
  title: string;
  handleClick?: () => void;
  notAnimated?: boolean;
  hideBtn?: boolean;
  type?: 'submit' | 'reset' | 'button';
}

const AnimateBtnWhite: React.FC<IProps> = ({ title, handleClick, notAnimated = false, hideBtn = false }) => {
  const animatedbtnclass = notAnimated ? styled.notAnimated : styled.animatedArrow;
  return (
    <button onClick={handleClick} className={styled.container}>
      {!hideBtn && (
        <div className={animatedbtnclass}>
          <PathSvg />
        </div>
      )}
      
      <span className={styled.title}>{title}</span>
    </button>
  );
};

export { AnimateBtnWhite };
