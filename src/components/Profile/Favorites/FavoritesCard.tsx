import { NFTMusicBlock } from '../../NFTMusicBlock/NFTMusicBlock';
import { ReactComponent as User } from '../../../assets/favorites/user.svg';
import { ReactComponent as Wallet } from '../../../assets/favorites/wallet.svg';
import { ReactComponent as Cup } from '../../../assets/favorites/cup.svg';
import { ReactComponent as More } from '../../../assets/more.svg';
import cover from '../../../assets/favorites/cover.png';

import styled from './Favorites.module.scss';

const FavoritesCard = () => {
  return (
    <NFTMusicBlock>
      <div className={styled.wrapperInfo}>
        <div className={styled.trekInfo}>
          <h3 className={styled.order}>#1</h3>
          <img className={styled.cover} src={cover} alt='cover' />
          <div className={styled.artistWrapper}>
            <p className={styled.trekName}>Oh my God</p>
            <p className={styled.artistName}>Adel</p>
          </div>
        </div>

        <div className={styled.infoTrekWrapper}>
          <div className={styled.blockWrapper}>
            <User />
            <p className={styled.text}>Ivaylo Ivanov</p>
          </div>
          <div className={styled.blockWrapper}>
            <Cup />
            <p className={styled.text}>69 points</p>
          </div>
          <div className={styled.blockWrapper}>
            <Wallet />
            <p className={styled.text}>2 610 TKN</p>
          </div>
        </div>
        <More  className={styled.more}/>
      </div>
    </NFTMusicBlock>
  );
};

export { FavoritesCard };
