import React from 'react';

import { ReactComponent as User } from '../../../../assets/favorites/user.svg';
import { ReactComponent as Wallet } from '../../../../assets/favorites/wallet.svg';
import { ReactComponent as Arrow } from '../../../../assets/favorites/arrow.svg';
import { ReactComponent as Menu } from '../../../../assets/more.svg';
import { ReactComponent as Cup } from '../../../../assets/favorites/cup.svg';

import styled from './TrackList.module.scss';
import { BE_BASE_URL } from '../../../../api/api';

const testData = [
  {
    id: 0,
    url: '',
    title: 'Oh my God',
    name: 'Adel',
    points: 69,
    wallet: 2610,
    TKN: 2610,
  },
  {
    id: 1,
    url: '',
    title: 'Oh my God',
    name: 'Adel',
    points: 69,
    wallet: 2610,
    TKN: 2610,
  },
  {
    id: 2,
    url: '',
    title: 'Oh my God',
    name: 'Adel',
    points: 69,
    wallet: 2610,
    TKN: 2610,
  },
  {
    id: 3,
    url: '',
    title: 'Oh my God',
    name: 'Adel',
    points: 69,
    wallet: 2610,
    TKN: 2610,
  },
];
interface IPlaylistSongs {
  tracks: Array<any>;
}

const TrackList: React.FC<IPlaylistSongs> = ({ tracks }) => {
  return (
    <ul className={styled.container}>
      {tracks.map((el: any, index: number) => {
        return (
          <Track
            TKN={el.TKN}
            id={el.id}
            index={index}
            name={el.name}
            points={el.win_count}
            title={el.title}
            url={el.image}
            wallet={el.wallet}
            key={el.id}
          />
        );
      })}
    </ul>
  );
};

interface ITrack {
  id: number;
  url: string;
  title: string;
  name: string;
  points: number;
  wallet: number;
  TKN: number;
  index: number;
}

const Track: React.FC<ITrack> = ({
  TKN,
  id,
  name,
  points,
  title,
  url,
  wallet,
  index,
}) => {
  return (
    <li className={styled.wrapper}>
      <div className={styled.number}>{index + 1}</div>

      <img src={`${BE_BASE_URL}${url}`} width="60px" height="60px" alt='cover' style={{ marginRight: "10px", borderRadius: "16px" }}/>

      <div className={styled.artistWrapper}>
        <div>{title}</div>
        <p>{name}</p>
      </div>

      <div className={styled.iconWrapper}>
        <Cup className={styled.icon} />
        <div>{points}</div>
      </div>
    </li>
  );
};

export { TrackList };
