import { ReactComponent as Cup } from '../../../assets/svg/icon-top-players/cup.svg';
import { ReactComponent as Note } from '../../../assets/svg/icon-top-players/note.svg';
import { ReactComponent as Wallet } from '../../../assets/svg/icon-top-players/wallet.svg';
import photo from '../../../assets/profile/small-photo.png';

import styled from './TopPlayers.module.scss';
import { useMemo } from 'react';
import { BE_BASE_URL } from '../../../api/api';

interface IProps {
  avatar: string | null;
  name: string;
  winCount: number | string;
  totalNfts: number | string;
  balance: number;
}

const PlayerCard : React.FC<IProps> = ({ avatar, name, winCount, totalNfts, balance }) => {

  const userAvatar = useMemo(() => {
    if (!avatar) {
      return photo;
    }

    return `${BE_BASE_URL}${avatar}`;
  }, [avatar])

  return (
    <div className={styled.playerCard}>
      <img className={styled.avatar} src={userAvatar} alt='avatar' />
      <div className={styled.infoWrapper}>
        <h3 className={styled.name}>{name}</h3>
        <div className={styled.iconInfoWrapper}>
          <div className={styled.iconWrapper}>
            <Cup className={styled.icon} />
            <p>{winCount} points</p>
          </div>
          <div className={styled.iconWrapper}>
            <Note className={styled.icon} />
            <p>{totalNfts} NFT</p>
          </div>
          <div className={styled.iconWrapper}>
            <Wallet className={styled.icon} />
            <p>{balance} TKN</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PlayerCard };
