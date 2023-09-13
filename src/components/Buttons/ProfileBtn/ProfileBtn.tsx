import React from 'react';
import { Link } from 'react-router-dom';
import styled from './ProfileBtn.module.scss';

interface IProps {
  title: string;
  isActive: number;
  setIsActive: (index: number) => void;
  index: number;
  svg: JSX.Element;
  url: string;
}

const ProfileBtn: React.FC<IProps> = ({ url, title, svg, isActive, setIsActive, index }) => {
  return (
    <Link
      to={url}
      onClick={() => setIsActive(index)}
      className={isActive === index ? styled.activeContainer : styled.container}>
      <div className={isActive === index ? styled.activeIcon : styled.icon}>{svg}</div>
      <span className={isActive === index ? styled.activeText : styled.text}>{title}</span>
    </Link>
  );
};

export { ProfileBtn };
