import React from 'react';
import styled from './PlaylistElement.module.scss';
import defaultImg from '../../assets/default.png';

interface IProps {
  name: string;
}

const PlaylistElementt: React.FC<IProps> = ({ name }) => {
  return (
    <div className={styled.container}>
      <div className={styled.playlistNameWrapper}>
        <p className={styled.playlistName}>{name}</p>
      </div>
      <div className={styled.wrapper}>
        <div className={styled.block}>
          <div>
            <img className={styled.trek} src={defaultImg} alt='trek' />
          </div>
          <div>
            <img className={styled.trek} src={defaultImg} alt='trek' />
          </div>
        </div>

        <div className={styled.block}>
          <div>
            <img className={styled.trek} src={defaultImg} alt='trek' />
          </div>
          <div>
            <img className={styled.trek} src={defaultImg} alt='trek' />
          </div>
        </div>
      </div>
    </div>
  );
};

export { PlaylistElementt };
