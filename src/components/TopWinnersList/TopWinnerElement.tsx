import React, { useMemo, useRef, useState } from 'react';

import { ReactComponent as User } from '../../assets/favorites/user.svg';
import { ReactComponent as Cup } from '../../assets/favorites/cup.svg';
import { ReactComponent as Wallet } from '../../assets/favorites/wallet.svg';
import { ReactComponent as More } from '../../assets/battles/more.svg';
import { ExploreModal } from '../../pages/Explore/ExploreModal/ExploreModal';
import { useOutSideClick } from '../../hooks/useOutSideClick';
import play from '../../assets/explore/btn-play.svg';

import styled from './TopWinnerElement.module.scss';
import { BE_BASE_URL } from '../../api/api';
import { ModalPendingBattle } from '../Profile/Battles/ModalPendingBattle/ModalPendingBattle';
import { useMediaQuery } from 'react-responsive';
import { useDispatch } from 'react-redux';
import { setSongData } from '../../store/playerSlice';

interface INFT {
  cover: string;
  title: string;
  singer: string;
  owner: string;
  points: number;
  wallet: number;
}

interface IProps {
  // nft: INFT;
  tracks: any;
  nft: any;
  index: number;
}

const TopWinnerElement: React.FC<IProps> = ({ nft, index, tracks }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const modalRef = useRef(null);
  useOutSideClick(modalRef, closeLoginModalMenu, isOpenModal);
  const dispatch = useDispatch();

  function toggleModal() {
    setIsOpenModal((prev) => !prev);
  }

  function closeLoginModalMenu() {
    setIsOpenModal(false);
  }


  const hideRightSide = useMediaQuery({
    query: '(max-width: 430px)',
  });


  const [isOpenMore, setIsOpenMore] = useState(false);

  function toggleModalMore() {
    setIsOpenMore((prev) => !prev);
  }
  function closeModal() {
    setIsOpenMore(false);
  }

  const displayAvatar = useMemo(() => {
    return nft?.track?.image ? `${BE_BASE_URL}${nft.track.image}` : undefined;
  }, [nft]);

  const playSong = () => {
    const track = tracks.find((track: any) => nft.track_id === track.id);
    let lyrics = [];
    try {
      lyrics = JSON.parse(track.lyrics.replace(/[\r\n]/g, ''));
    } catch (e) {
      console.log("error lyrics: ", e);
    }
    
    dispatch(
      setSongData({
        id: track.id,
        url: `${BE_BASE_URL}${track.file}`,
        image: `${BE_BASE_URL}${track.image}`,
        title: track.name,
        singer: track.artists[0]?.name,
        lyrics: lyrics,
        genre:
          track.music_categories.length > 0 ? track.music_categories[0].name : 'Pop',
      }),
    );
  };

  if (!nft.track) {
    return null;
  }
  return (
    <li className={styled.container}>
      <div className={styled.index}>#{index + 1}</div>
      
      <div style={{ width: "60px", height: "60px", marginRight: "20px", position: "relative"}}>
        <img src={displayAvatar} className={styled.image} style={{ width: "60px", height: "60px", }} alt='cover' />
        <img className={styled.playerBtn} onClick={playSong} src={play} alt='play' />
      </div>
      {!hideRightSide && (
        <>


          <div className={styled.soundArtistWrapper}>
            <p className={styled.title}>{nft.track.label}</p>
            <p className={styled.singer}>{nft.track.name}</p>
          </div>

          <article className={styled.infoElementWrapper}>
            <User className={styled.icon} />
            <p className={styled.username}>{nft.winner_username}</p>
          </article>

          <article className={styled.infoElementWrapper}>
            <Cup className={styled.icon} />
            <p className={styled.points}>{nft.count_wins} points</p>
          </article>

          <article className={styled.infoElementWrapper}>
            <Wallet className={styled.icon} />
            <p className={styled.tokens}>{Math.floor(nft.sum_by_track)} TKN</p>
          </article>


        </>
      )}
      

      <div className={styled.contentContainer}>

        <div className={styled.soundArtistWrapper}>
          <p className={styled.title}>{nft.track.label}</p>
          <p className={styled.singer}>{nft.track.name}</p>
        </div>
        <div className={styled.userInfo}>

          <article className={styled.infoElementWrapper}>
            <User className={styled.icon} />
            <p className={styled.username}>{nft.winner_username}</p>
          </article>

          <article className={styled.infoElementWrapper}>
            <Cup className={styled.icon} />
            <p className={styled.points}>{nft.count_wins} points</p>
          </article>

        </div>
        <article className={styled.infoElementWrapper}>
          <Wallet className={styled.icon} />
          <p className={styled.tokens}>{Math.floor(nft.sum_by_track)} TKN</p>
        </article>


      </div>

      {isOpenMore && (
        <div style={{ position: 'relative' }} className={styled.modalPlay}>
          <ModalPendingBattle
            track={nft}
            isOpenMore={isOpenMore}
            closeModal={closeModal}
            setIsOpenMore={setIsOpenMore}
          />
        </div>
      )}
    </li>
  );
};

export { TopWinnerElement };
