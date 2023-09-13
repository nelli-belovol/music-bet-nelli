import { MouseEvent, useEffect, useMemo, useState } from 'react';
import { battleAPI } from '../../../api/api';
import { ReactComponent as LikeSvg } from '../../../assets/svg/likeWhite.svg';
import { ReactComponent as LikeActiveSvg } from '../../../assets/svg/likeWhiteActive.svg';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { setSongId } from '../../../store/battleSlice';
import { toast } from 'react-toastify';

import styled from '../SongCard.module.scss';

interface IProps {
  title: string;
  singer: string;
  song: {
    id: number;
  };
  setISVoted: (v: boolean) => void;
  id: number;
  vote: (id: number) => void;
}

const SongInfo: React.FC<IProps> = ({ title, singer, setISVoted, id, song, vote }) => {
  const dispatch = useAppDispatch();
  const isLastChance = useAppSelector(state => state.battle.isLastChange);
  const playingSong = useAppSelector(state => state.battle.songId);
  const [isLiked, setIsLiked] = useState(false);

  function votee(id: number): void {
    battleAPI
      .votesForCard(id)
      .then((res) => {
        return res.data;
      })
      .catch((error) =>         { toast.error(error.response.data.message); console.log("ERROR: ", error.response.data.message)}      );
  }

  const pulsateLike = useMemo(() => {
    return playingSong === song.id || isLastChance;
  }, [playingSong, isLastChance]);
  useEffect(() => {
    if (isLiked) {
      setTimeout(() => {
        setIsLiked(false);
      }, 1000);
    }
  }, [isLiked]);

  const handleLike = () => {
    if (song.id === playingSong || isLastChance) {
      setIsLiked(!isLiked);
      setISVoted(true);
      votee(id);
    }
  };
  return (
    <div className={styled.songInfo}>
      <h3 className={styled.songInfoTitle}>{title ? title : 'Unknown'}</h3>
      <p className={styled.songInfoSinger}>{singer ? singer : 'Unknown'}</p>
      <div className={styled.SongInfoControllers}>
        <p className={styled.songInfoLike}>Like for 1 tkn</p>

        {pulsateLike ? (isLiked ? (
          <div className={styled.songInfoSvg} onClick={handleLike}>
            <LikeActiveSvg />
          </div>
        ) : (
          <div className={styled.songInfoSvg} onClick={handleLike}>
            <LikeSvg />
          </div>
        )) : (isLiked ? (
          <div className={styled.inactiveSongInfo} onClick={handleLike}>
            <LikeActiveSvg />
          </div>
        ) : (
          <div className={styled.inactiveSongInfo} onClick={handleLike}>
            <LikeSvg />
          </div>
        ))}

        <p className={styled.songInfoWin}>win more tkn</p>
      </div>
    </div>
  );
};

export { SongInfo };
