import { MouseEvent, useEffect, useMemo, useState } from 'react';
import { ReactComponent as LikeSvg } from '../../../assets/svg/likeWhite.svg';
import { ReactComponent as LikeActiveSvg } from '../../../assets/svg/likeWhiteActive.svg';
import { ReactComponent as WinSvg } from '../../../assets/svg/win.svg';
import { ReactComponent as UserSvg } from '../../../assets/svg/user.svg';

import { useAppSelector } from '../../../hooks/reduxHooks';

import styled from '../TimerBattle.module.scss';
import { useMediaQuery } from 'react-responsive';
import { battleAPI } from '../../../api/api';
import { toast } from 'react-toastify';

//create general types
interface Song {
  id: number;
  post: string;
  battleId: number;
  title: string;
  singer: string;
  url: string;
  genre: string;
}

interface IProps {
  song: Song;
  isOver: boolean;
  idx: number;
  idxBattle: number;
  currentBattleIdx?: number;
  currentSongIdx?: number;
  songRef: any;
  vote: (id: number) => void;
  winnerCustomerId: number;
  sumVotes: any;
  mobileClickedSongId: number;
  setMobileClickedSongId: any;
  getOwner: any;
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const BattleCard: React.FC<IProps> = ({
  song,
  isOver,
  mobileClickedSongId,
  setMobileClickedSongId,
  idxBattle,
  currentBattleIdx,
  idx,
  currentSongIdx,
  songRef,
  vote,
  winnerCustomerId,
  sumVotes,
  getOwner,
}) => {
  const idSong = useAppSelector((state) => state.battle.songId);
  const step = useAppSelector((state) => state.battle.step);
  const [isWin, setIsWin] = useState(false);
  const [isLiked, setIsLiked] = useState((mobileClickedSongId > 0 ? mobileClickedSongId === song.id : idSong === song.id));
  const [isActive, setIsActive] = useState(false);

  const isLastChance = useAppSelector(state => state.battle.isLastChange);
  const playingSong = useAppSelector(state => state.battle.songId);

  const [currentSongIndex, setCurrentSongIdx] = useState(1);

  useEffect(() => {
    if (mobileClickedSongId > 0 && mobileClickedSongId === song.id) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [mobileClickedSongId]);
  
  useEffect(() => {
    if (currentSongIdx) {
      setCurrentSongIdx(currentSongIdx);
    }
  }, [currentSongIdx]);

  useEffect(() => {
    if (isLiked) {
      setTimeout(() => {
        setIsLiked(false);
      }, 1000);
    }
  }, [isLiked]);

  useEffect(() => {
    findOutTheWinner();
  }, [isOver, winnerCustomerId]);

  function findOutTheWinner() {
    //@ts-ignore
    if (song.customer.id === winnerCustomerId) {
      setIsWin(true);
    }
  }

  // useEffect(() => {
  //   if (isOver) {
  //     const n = getRandomInt(1, 4);
  //     if (n === 1) {
  //       setIsWin(true);
  //     } else setIsWin(false);
  //   }
  // }, [isOver]);


  const isMobile = useMediaQuery({
    query: '(max-width: 430px)',
  });
  const [zIndex, setZIndex] = useState(5);

  const handleClickOnCard = () => {
    if (isMobile) {
      setMobileClickedSongId(song.id);
    }
  };

  const pulsateLike = useMemo(() => {
    return playingSong === song.id || isLastChance;
  }, [playingSong, isLastChance]);
  function votee(id: number): void {
    battleAPI
      .votesForCard(id)
      .then((res) => {
        return res.data;
      })
      .catch((error) =>         { toast.error(error.response.data.message); console.log("ERROR: ", error.response.data.message)}      );
  }

  const handleLike = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    e.stopPropagation();
    if (song.id === playingSong || isLastChance) {
      setIsLiked(!isLiked);
      setIsLiked(!isLiked);
      votee(song.battleId);
    }
  };
  return !isOver ? (
    <li
      onClick={handleClickOnCard}
      ref={songRef}
      className={
        idxBattle === currentBattleIdx && currentSongIndex > idx
          ? styled.timerSongItemBefore
          : (isActive ? styled.timerSongItemActive : styled.timerSongItem)
      }
      key={song.id}>
      {/* @ts-ignore */}
      <h3>{song.label ? song.label : 'Unknown'}</h3>
      {/* @ts-ignore */}
      <p>{song.name ? song.name : 'Unknown'}</p>
      <div className={styled.songInfoControllers}>
        <p className={styled.songInfoLike}>Like for 1 tkn</p>
        

        {(step !== 3) ? (
          <>
            {(step === 2) ? (
              <>
                {isLiked ? (
                  <div className={styled.songInfoSvgStepTwo} onClick={(e) => handleLike(e)}>
                    <LikeActiveSvg />
                  </div>
                ) : (
                  <div className={styled.songInfoSvgStepTwo} onClick={(e) => handleLike(e)}>
                    <LikeSvg />
                  </div>
                )}
              </>
            ) : (
              <>
                {isLiked ? (
                  <div className={styled.songInfoSvg} onClick={(e) => handleLike(e)}>
                    <LikeActiveSvg />
                  </div>
                ) : (
                  <div className={styled.songInfoSvg} onClick={(e) => handleLike(e)}>
                    <LikeSvg />
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <>
            {isLiked ? (
              <div className={styled.songInfoSvgStepThree} onClick={(e) => handleLike(e)}>
                <LikeActiveSvg />
              </div>
            ) : (
              <div className={styled.songInfoSvgStepThree} onClick={(e) => handleLike(e)}>
                <LikeSvg />
              </div>
            )}
          </>
        )}

        <p className={styled.songInfoWin}>win more tkn</p>
      </div>
    </li>
  ) : (
    <li
      ref={songRef}
      className={
        idxBattle === currentBattleIdx && currentSongIndex > idx
          ? styled.timerSongItemWinBefore
          : styled.timerSongItemWin
      }
      style={
        !isWin
          ? { background: '#FFFFFF', color: '#2B3134' }
          : {
              background: 'linear-gradient(135.17deg, #002068 0.29%, #000035 100%)',
              color: '#ffffff',
            }
      }
      key={song.id}>
      {/* @ts-ignore */}
      <h3>{song.label ? song.label : 'Unknown'}</h3>
      {/* @ts-ignore */}
      <p>{song.name ? song.name : 'Unknown'}</p>
      <div className={styled.user}>
        <div
          className={styled.userSvg}
          style={isWin ? { fill: '#ffffff' } : { fill: '#2B3134' }}>
          <UserSvg />
        </div>
        {/* @ts-ignore */}
        <p>{song.customer.username}</p>
      </div>
      {isWin ? (
        <div className={styled.songInfoControllers} style={{ margin: '0px' }}>
          <p className={styled.songInfoLike} style={{ marginRight: 0 }}>
            Liked <br/>{sumVotes?.votes}
          </p>
          <div className={styled.songWinSvg}>
            <WinSvg />
          </div>
          <p className={styled.songInfoWin}>won <br/>{sumVotes?.votes}</p>
        </div>
      ) : (
        <div
          className={styled.songInfoControllers}
          style={{ justifyContent: 'center', marginTop: '22px' }}>
          <p className={styled.songInfoLike} style={{ marginRight: '23px' }}>
            {/* Liked 9,000 */}
            Liked
            <br/>
            {sumVotes?.votes}
          </p>
          <p className={styled.songInfoWin}>Lost <br/> 1TKN</p>
        </div>
      )}
    </li>
  );
};

export { BattleCard };
