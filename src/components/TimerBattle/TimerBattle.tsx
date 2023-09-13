import { useMemo, useState } from 'react';
import { BattleCard } from './BattleCard/BattleCard';
import { differenceInSeconds } from 'date-fns';
import { Timer } from '../Timer';

import styled from './TimerBattle.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { clearBattle, clearBattleIfNotNull, setBattle } from '../../store/battleSlice';
//create general types
export interface Song {
  id: number;
  post: string;
  title: string;
  singer: string;
  url: string;
  music_categories: any[];
  artists: any[];
  file: string;
  battleId: number;
  image: string;
  lyrics: string;
  name: string;
  genre: string;
  duration: number;
}

export interface BattleInfo {
  battle?: {
    winner_customer_id: number;
  };
  battleCustomers: any[];
}

interface IProps {
  songs: Song[];
  currentRound?: { name: string; isActive: boolean };
  idxBattle: number;
  currentBattleIdx?: number;
  currentSongIdx?: number;
  songRefs: any;
  vote: (id: number) => void;
  winnerCustomerId: number;
  mobileClickedSongId: number;
  votes: any;
  setMobileClickedSongId: any;
  battleInfo: BattleInfo;
  getOwner: any;
  timeToFinish: number;
}

const TimerBattle: React.FC<IProps> = ({
  songs,
  currentRound,
  idxBattle,
  mobileClickedSongId,
  setMobileClickedSongId,
  battleInfo,
  currentBattleIdx,
  currentSongIdx,
  songRefs,
  vote,
  votes,
  getOwner,
  timeToFinish,
}) => {
  const [isOver, setTimeIsOver] = useState(false);
  const selectedCategoryName = useAppSelector((state) => state.musicCategories.selectedCategoryName);
  const battle = useAppSelector((state) => state.battle.battle);

  const dispatch = useAppDispatch();
  const winnerCustomerId = useMemo(() => {
    if (battleInfo === null || typeof battleInfo === 'undefined') {
      return 0;
    }

    if (battleInfo.battle) {
      setTimeout(() => {
        dispatch(clearBattle());
      }, 5000);
      return battleInfo.battle.winner_customer_id;
    }

    return 0;
  }, [battleInfo]);

  const votess = useMemo(() => {
    if (battleInfo === null || typeof battleInfo === 'undefined') {
      return [];
    }

    if (battleInfo.battle) {
      const votesss: any[] = [];

      battleInfo.battleCustomers.map(bc => {
        const anyVotes = votes.find((aa: any) => aa.track_id === bc.track.id);
        const votesData = {
          id: bc.track.id,
          votes: anyVotes ? anyVotes.votes : 0
        };
        votesss.push(votesData);
      });
      return votesss;
    }
  }, [battleInfo]);

  function votesForSong(songId: number) {
    if (votess) {
      return votess.find((votee: {id: number}) => votee.id === songId);
    } else {
      return 0;
    }
  }

  const genreBattleString = useMemo(() => {
    if (battle) {
      if (!battle.category) {
        return 'All vs All';
      }
      return `${battle.category.name} vs ${battle.category.name}`;
    }
  }, [battle]);

  // const totalDuration = songs.reduce(
  //   (result, currentSong) => result + currentSong.duration,
  //   0,
  // );

  //!  TIME FOR THE LAST 60 SECONDS NEED TO TEST
  const testTime = differenceInSeconds(Date.now() + 60000 * timeToFinish, Date.now());
  const time = new Date();

  var t = new Date();
  const dd = t.setSeconds(t.getSeconds() + timeToFinish);

  time.setSeconds(time.getSeconds() + testTime);

  const classSongCardList =
    currentRound?.name === '1'
      ? styled.songCardListFirst
      : currentRound?.name === '2'
      ? styled.songCardListSecond
      : styled.songCardListThird;

  const classSongCardIsOver = classSongCardList + ' ' + styled.songCardListOver;

  return (
    <>
      <div className={styled.timerContainer}>
        <p className={styled.genre}>{genreBattleString}</p>
        <div className={styled.timerTitleContainer}>
          {!isOver ? <p>Last chance to win</p> : <p>WINNER</p>}
        </div>
        <p className={styled.timer}>
          <Timer expiryTimestamp={dd} setTimeIsOver={setTimeIsOver} />
        </p>
        <div className={styled.listWrapper}>
          <ul className={!isOver ? classSongCardList : classSongCardIsOver}>
            {songs.map((song, idx) => (
              <BattleCard
                getOwner={getOwner}
                mobileClickedSongId={mobileClickedSongId}
                setMobileClickedSongId={setMobileClickedSongId}
                sumVotes={votesForSong(song.id)}
                winnerCustomerId={winnerCustomerId}
                vote={vote}
                songRef={(ref: any) => (songRefs[idx] = ref)}
                idxBattle={idxBattle}
                currentBattleIdx={currentBattleIdx}
                idx={idx}
                currentSongIdx={currentSongIdx}
                song={song}
                key={song.id}
                isOver={isOver}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export { TimerBattle };
