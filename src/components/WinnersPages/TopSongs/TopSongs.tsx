import { ReactComponent as User } from '../../../assets/favorites/user.svg';
import { ReactComponent as Cup } from '../../../assets/favorites/cup.svg';
import { ReactComponent as Wallet } from '../../../assets/favorites/wallet.svg';
import { ReactComponent as Arrow } from '../../../assets/favorites/arrow.svg';
import { ReactComponent as Menu } from '../../../assets/more.svg';
import { ReactComponent as More } from '../../../assets/battles/more.svg';

import styled from './TopSongs.module.scss';
import { useMemo, useState } from 'react';
import { BE_BASE_URL } from '../../../api/api';
import { ModalPendingBattle } from '../../Profile/Battles/ModalPendingBattle/ModalPendingBattle';

const testData = [
  {
    title: 'Oh my God',
    artist: 'Adel',
    owner: 'Ivaylo Ivanov',
    points: 69,
    wallet: 2610,
    TKNNow: 2610,
    url: '#',
  },
  {
    title: 'Oh my God',
    artist: 'Adel',
    owner: 'Ivaylo Ivanov',
    points: 69,
    wallet: 2610,
    TKNNow: 2610,
    url: '#',
  },
  {
    title: 'Oh my God',
    artist: 'Adel',
    owner: 'Ivaylo Ivanov',
    points: 69,
    wallet: 2610,
    TKNNow: 2610,
    url: '#',
  },
  {
    title: 'Oh my God',
    artist: 'Adel',
    owner: 'Ivaylo Ivanov',
    points: 69,
    wallet: 2610,
    TKNNow: 2610,
    url: '#',
  },
];

const TopSongs = () => {
  return (
    <ul className={styled.container}>
      {testData.map((el, index) => {
        return (
          <SongElement
            key={index}
            title={el.title}
            artist={el.artist}
            owner={el.owner}
            points={el.points}
            wallet={el.wallet}
            TKNNow={el.TKNNow}
            index={index}
            url={el.url}
          />
        );
      })}
    </ul>
  );
};

interface IProps {
  title: string;
  artist: string;
  owner: string;
  points: number;
  wallet: number;
  TKNNow: number;
  index: number;
  url: string;
}

const SongElement: React.FC<IProps> = ({
  index,
  artist,
  owner,
  points,
  wallet,
  TKNNow,
  url,
  title,
}) => {
  const displayAvatar = useMemo(() => {
    return url ? `${BE_BASE_URL}${url}` : undefined;
  }, [url]);
  return (
    <li className={styled.wrapper}>
      <div>#{index + 1}</div>

      <img src={displayAvatar} alt='cover' />

      <div className={styled.artistWrapper}>
        <p className={styled.title}>{title}</p>
        <p className={styled.artist}>{artist}</p>
      </div>

      <div className={styled.ownerWrapper}>
        <User className={styled.icon} />
        <p>{owner}</p>
      </div>

      <div className={styled.pointsWrapper}>
        <Cup className={styled.icon} />
        <p>{points} points</p>
      </div>

      <div className={styled.walletWrapper}>
        <Wallet className={styled.icon} />
        <p>{wallet} TKN</p>
      </div>

      <div className={styled.currentTKNWrapper}>
        <Arrow className={styled.icon} />
        <p>{TKNNow} TKN</p>
      </div>

      <Menu className={styled.menu} />
    </li>
  );
};

export { TopSongs };
