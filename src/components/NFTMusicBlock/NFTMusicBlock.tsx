import React from 'react';
import styled from './NFTMusicBlock.module.scss';

interface IProps {
  children: JSX.Element;
}

const NFTMusicBlock: React.FC<IProps> = ({ children }) => {
  return <div className={styled.container}>{children}</div>;
};

export { NFTMusicBlock };
