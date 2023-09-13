import React from 'react';

import styled from './BuyTkn.module.scss';

interface IProps {
  title: string;
  children: any;
}

const CardWrapper: React.FC<IProps> = ({ title, children }) => {
  return (
    <div className={styled.cardWrapper}>
      <h3 className={styled.title}>{title}</h3>
      <hr className={styled.line} />
      {children}
    </div>
  );
};

export { CardWrapper };
