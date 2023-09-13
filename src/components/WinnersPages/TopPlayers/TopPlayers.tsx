import { ReactComponent as Cup } from '../../../assets/favorites/cup.svg';
import { ReactComponent as Wallet } from '../../../assets/favorites/wallet.svg';
import { ReactComponent as NFTImage } from '../../../assets/favorites/nft.svg';
import userExample from '../../../assets/profile/cover.png';

import styled from './TopPlayers.module.scss';
import { useMemo } from 'react';
import { BE_BASE_URL } from '../../../api/api';

interface IProps {
  index: number;
  name: string;
  balance: number;
  avatar: string | null;
  total_nfts: number;
  win_count: number;
}

const TopPlayers = ({ topPlayers }: any) => {
  return (
    <ul className={styled.container}>
      {topPlayers.map((el: any, index: number) => {
        return (
          <Player
            key={el.id}
            index={index}
            name={el.name}
            balance={el.account.balance}
            avatar={el.avatar}
            total_nfts={el.total_nfts}
            win_count={el.win_count}
          />
        );
      })}
    </ul>
  );
};

const Player: React.FC<IProps> = ({
  index,
  name,
  balance,
  avatar,
  total_nfts,
  win_count,
}) => {
  const displayAvatar = useMemo(() => {
    return avatar ? `${BE_BASE_URL}${avatar}` : userExample;
  }, [avatar]);
  return (
    <li className={styled.wrapper}>
      <div className={styled.coverWrapper}>
        <img className={styled.cover} src={displayAvatar} alt='cover' />

        <div className={styled.nameWrapper}>
          <div className={styled.place}>{index + 1}</div>
          <p className={styled.name}>{name}</p>
        </div>
      </div>

      <div className={styled.pointsWrapper}>
        <Cup />
        <div className={styled.points}>{win_count}</div>
      </div>

      <div className={styled.HFTWrapper}>
        <NFTImage />
        <div className={styled.NFT}>{total_nfts}</div>
      </div>

      <div className={styled.TKNWrapper}>
        <Wallet />
        <div className={styled.TKN}>{balance}</div>
      </div>
    </li>
  );
};

export { TopPlayers };
