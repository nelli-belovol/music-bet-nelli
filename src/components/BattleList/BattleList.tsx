import { useEffect, useRef } from 'react';
import { BattleItem } from './BattleItem.tsx/BattleItem';
import styled from './BattleList.module.scss';

interface IProps {
  currentRound?: { name: string; isActive: boolean };
  battle: any;
  currentSongIdx?: number;
  currentBattleIdx?: number;
  refContainer?: any;
  vote: (id: number) => void;
  onEnd?: any;
  timeUntilTheEndOfBattle: (endTime: string) => number;
  winnerCustomerId: number[];
  userName: any;
}

interface BattleLoop {
  id: number;
  date_end: string;
  play_time: number;
}

const BattleList: React.FC<IProps> = ({
  currentRound,
  battle,
  currentSongIdx,
  currentBattleIdx,
  refContainer,
  onEnd,
  vote,
  timeUntilTheEndOfBattle,
  winnerCustomerId,
  userName,
}) => {
  let battleRefs: any = [];

  // useEffect(() => {
  //   if (battles !== undefined) {
  //     const index = battles.findIndex((battle: any, index: number) => {
  //       return index === currentBattleIdx;
  //     });

  //     if (index !== -1) {
  //       refContainer.current.scrollTo({
  //         top: battleRefs[index].offsetTop,
  //         left: 0,
  //         behavior: 'smooth',
  //       });
  //     }
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentBattleIdx]);

  return (
    battle && (
      <ul
        className={
          currentRound?.name === '1'
            ? styled.songBattleListFirst
            : currentRound?.name === '2'
            ? styled.songBattleListSecond
            : styled.songBattleListThird
        }>
        <BattleItem
          onEnd={onEnd}
          userName={userName}
          battleId={battle.id}
          playTimer={battle.play_time}
          winnerCustomerId={winnerCustomerId[0]}
          battleEndTime={battle.date_end}
          timeUntilTheEndOfBattle={timeUntilTheEndOfBattle}
          vote={vote}
          refContainer={refContainer}
          battleRef={(ref: any) => (battleRefs[0] = ref)}
          key={battle.id}
          currentRound={currentRound}
          battle={battle}
          idxBattle={0}
          currentSongIdx={currentSongIdx}
          currentBattleIdx={currentBattleIdx}
        />
      </ul>
    )
  );
};

export { BattleList };
