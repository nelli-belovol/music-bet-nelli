import { FC } from 'react';
import { ReactComponent as Border } from '../../assets/border.svg';

import styled from './AnimationBorder.module.scss';

interface IProps {
  children: React.ReactNode;
}

const AnimationBorder: FC<IProps> = ({ children }) => {
  return (
    <div className={styled.container}>
      <Border className={styled.border} />
      <div className={styled.children}>{children}</div>
    </div>
  );
};

export { AnimationBorder };
