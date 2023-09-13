import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { battleAPI, BE_BASE_URL } from '../../../api/api';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { resetTimeLeft, setCurrentlyPlayingSongDuration, setLastChance, setTimeLeft, setSongId as setBattleSongId } from '../../../store/battleSlice';
import { setSongData, setSongGenre, setSongId, setSongImage, setSongSinger, setSongSubs, setSongTitle, setSongUrl } from '../../../store/playerSlice';
import { ExpiresGenresContainerVertical } from '../../ExpiresGenresContainerVertical/ExpiresGenresContainerVertical';
import { SongCard } from '../../SongCard/SongCard';
import { Song, TimerBattle } from '../../TimerBattle/TimerBattle';
import styled from '../BattleList.module.scss';

interface IProps {
  currentRound?: { name: string; isActive: boolean };
  battle: any;
  idxBattle: number;
  battleRef: any;
  currentSongIdx?: number;
  playTimer?: number;
  currentBattleIdx?: number;
  refContainer: any;
  onEnd?: any;
  vote: (id: number) => void;
  battleEndTime: string;
  timeUntilTheEndOfBattle: (endTime: string) => number;
  winnerCustomerId: number;
  battleId: number;
  userName: any;
}


const useBattleInfo = (battleId: number, timeToFinish: number) => {
  const [battleInfo, setBattleInfo] = useState<any>(null);
  const [tries, setTries] = useState<number>(0);

  useEffect(() => {
    if (timeToFinish > 0 || battleInfo !== null) {
      return;
    }
      battleAPI.getBattleInfo(battleId).then(data => {
        if (data.data.battle.winner_customer_id === 0) {
          setTimeout(() => {
            battleAPI.endAllBattles(battleId);
            setTries((prev) => prev + 1);
          }, 1000);
        } else {
          setBattleInfo(data.data);
        } 
      });
  }, [tries, timeToFinish]);

  return battleInfo;
};

//@ts-ignore
const useTimeLeft = (battleId) => {
  const [timeLeft, setTImeLeft] = useState(99);

  useEffect(() => {
    //@ts-ignore
    if (!battleId) {
      debugger;
      
      return;
    }
    let delay = 500;
    //@ts-ignore
    let timeout = null;
    const updateTimeLeft = () => {
      battleAPI.timeLeft(battleId).then(data => {
        // you must also consider passing a timestamp to the API call
        // so you only fetch the latest messages, instead of all of them every time
        // your state update would look like this:
        // setChatMessages((messages) => [...messages, fetchedChatMessages]);
        setTImeLeft(data);
        // reset the delay in case an error has happened and changed it.
      }).catch(error => {
        // exponential backoff here.
        // 1 - the first error will call the API after 2sec
        // 2 - the second error will call the API after 4 sec
        // 3 - the third error will call the API after 8 sec
        // and so on
    });
  };

  const timer = setInterval(() => {
    updateTimeLeft();
  }, 500);

  return () => clearTimeout(timer);
  //@ts-ignore
  }, [battleId]);
  console.log("data: ", timeLeft);

  return [timeLeft]
};

const BattleItem: React.FC<IProps> = ({
  currentRound,
  battle,
  playTimer,
  idxBattle,
  battleRef,
  onEnd,
  currentSongIdx,
  currentBattleIdx,
  refContainer,
  vote,
  battleEndTime,
  timeUntilTheEndOfBattle,
  winnerCustomerId,
  battleId,
  userName,
}) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isVoted, setISVoted] = useState(false);
  const [currentlyPlayingSong, setCurrentlyPlayingSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeToFinish] = useTimeLeft(battleId);//useState(99);
  const setTimeToFinish = () => {};
  const [playingSongDuration, setPlayingSongDuration] = useState(30);
  const [displayingWinner, setDisplayingWinner] = useState(5000);
  const [isTimeForLastChance, setIsTimeForLastChance] = useState(false);
  const [votes, setVotes] = useState([]);
  const [mobileClickedSongId, setMobileClickedSongId] = useState(0);
  const dispatch = useAppDispatch();
  const currentlyPlayingSongDuration = useAppSelector((state) => state.battle.currentlyPlayingSongDuration);
  const battleInfo = useBattleInfo(battleId, timeToFinish);

  useEffect(() => {
    if (battleInfo !== null) {
      setTimeout(() => {
        onEnd && onEnd();
      }, displayingWinner);
    }
  }, [battleInfo]);

  useEffect(() => {
    if (battle && battle.battle_customers) {
      const battleSongs = battle.battle_customers.map((bc: { track: any[], id: number, customer: any[] } ) => {
        const a = { ...bc.track, battleId: bc.id, customer: { ...bc.customer}};
        return a;
      });
      setSongs(battleSongs);
    }
  }, [battle]);

  useEffect(() => {
    if (timeToFinish < 15) { //60) {
      dispatch(setLastChance(true));
      setIsTimeForLastChance(true);
    }
  }, [timeToFinish]);

  useEffect(() => {
    // setTimeToFinish(timeUntilTheEndOfBattle(battleEndTime));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('timeToFinish: ', timeToFinish);
  useEffect(() => {
    const timer = setInterval(() => {
      if (timeToFinish === 0 || timeToFinish < 0) {
        return;
    } else {
      
        // const a = timeUntilTheEndOfBattle(battleEndTime);
        // console.log("111: ", a);
        // console.log("1111: ", battleEndTime);
        // console.log("11111: ", (new Date()));
        // setTimeToFinish(a);  
      }
    }, 700);
    if (timeToFinish === 0 || timeToFinish < 0) {
      return () =>  {
        clearInterval(timer);
        dispatch(resetTimeLeft());
      };
    }
    return () => { 
      dispatch(resetTimeLeft());
      clearInterval(timer); 
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
 // setTime();
      function formattingTime(data: number): any {
        let minutes = 0;
        data = Math.floor(data);
        for (let i = data; i >= 60; i = i - 60) {
          minutes += 1;
        }
        const seconds = data - minutes * 60;
        const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
        const time = `${displayMinutes}:${displaySeconds}`;
        return time;
      }

      let newTimeToFinish = timeToFinish;
      if (timeToFinish < 0) {
        newTimeToFinish = 0;
      }
      dispatch(setTimeLeft(`${formattingTime(newTimeToFinish)} MIN`));
  }, [timeToFinish, dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(setCurrentlyPlayingSongDuration());
    }, 1000);
    if (currentlyPlayingSongDuration === 0) {
      return () =>  {
        clearInterval(timer);
        dispatch(setCurrentlyPlayingSongDuration(0));
      };
    }
    return () => { 
      clearInterval(timer); 
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentlyPlayingSongDuration]);

  useEffect(() => {
    if (songs.length === 0) {
      return;
    }
    const { play_time } = battle;
    const totalSongs = songs.length;

    let statement = true;
    let songIndex = 0;
    
    while (statement) {
      if (isNaN(timeToFinish)) {
        statement = false;
        continue;
      }
      if (timeToFinish - 15 < 0) {
        statement = false;
        continue;
      }
      const dd = ((songIndex + 1) * play_time) - (timeToFinish - 15);
      if (dd < 0) {
        songIndex++;
      } else if (dd >= 0) {
        statement = false;
        setIsPlaying(true);
        const leftTimeOfCurrentSong = play_time - dd;
        const inx = (songs.length - 1) - songIndex;
        if (!songs[inx]) {
          continue;
        }
        setPlayingSongDuration(leftTimeOfCurrentSong);
        setCurrentlyPlayingSong(inx);

        let lyrics = [];
        try {
          lyrics = JSON.parse(songs[inx].lyrics.replace(/[\r\n]/g, ''));
        } catch (e) {}
        
        dispatch(
          setSongData({
            id: songs[inx].id,
            url: `${BE_BASE_URL}${songs[inx].file}`,
            image: `${BE_BASE_URL}${songs[inx].image}`,
            title: songs[inx].name,
            singer: songs[inx]?.artists[0]?.name,
            lyrics: lyrics,
            genre:
            songs[inx].music_categories.length > 0 ? songs[inx].music_categories[0].name : 'Pop',
          }),
        );
        dispatch(setCurrentlyPlayingSongDuration(leftTimeOfCurrentSong));
        // dispatch(setSongId(songs[inx].id));
        dispatch(setBattleSongId(songs[inx].id));
        // dispatch(setSongGenre((songs[inx].music_categories.length > 0) ? songs[inx].music_categories[0].name : "Pop"));
        // dispatch(setSongUrl(`https://musicbet-admin.devapollo.com/${songs[inx].file}`));
        // dispatch(setSongImage(`https://musicbet-admin.devapollo.com/${songs[inx].image}`));
        // dispatch(setSongTitle(songs[inx].name));
        // dispatch(setSongSinger(songs[inx]?.artists[0]?.name));
      }

    }
  }, [timeToFinish, battle, currentlyPlayingSong, songs, songs.length, isPlaying, dispatch]);

  let songRefs: any = [];

  useEffect(() => {
    if (timeToFinish === 0) {
      determinationOfTheWinner(battleId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeToFinish]);

  const isDesktop = useMediaQuery({
    query: '(min-width: 720px)',
  });

  function determinationOfTheWinner(battleId: number): void {
    battleAPI.getVotes(battleId).then((res) => setVotes(res.data.trackVotes));
  }

  function getOwner(userId: number): string {
    return '';
    // const username = userName.filter((el: any) => {
    //   if (userId === el.id) {
    //     return el.username;
    //   }
    // });
    // return username[0]?.username;
  }

  return !isTimeForLastChance ? (
    <li className={styled.battle} key={idxBattle} ref={battleRef}>
      {currentRound?.name === '1' && isDesktop && (
        <ExpiresGenresContainerVertical
          currentRound={currentRound}
          songs={songs}
          timeToFinish={timeToFinish}
        />
      )}
      <ul
        className={
          currentRound?.name === '1'
            ? styled.songListFirst
            : currentRound?.name === '2'
            ? styled.songListSecond
            : styled.songListThird
        }>
        {songs.map((song: any, idx: number) => (
          <SongCard
            getOwner={getOwner}
            vote={vote}
            songRef={(ref: any) => (songRefs[idx] = ref)}
            idxBattle={idxBattle}
            currentBattleIdx={currentBattleIdx}
            currentSongIdx={currentSongIdx}
            song={song}
            key={song.id}
            setISVoted={setISVoted}
            idx={idx}
            currentRound={currentRound}
          />
        ))}
      </ul>
    </li>
  ) : (
    <li className={styled.battle} key={idxBattle} ref={battleRef}>
      <TimerBattle
        getOwner={getOwner}
        votes={votes}
        winnerCustomerId={winnerCustomerId}
        mobileClickedSongId={mobileClickedSongId}
        setMobileClickedSongId={setMobileClickedSongId}
        vote={vote}
        songRefs={songRefs}
        songs={songs}
        currentRound={currentRound}
        idxBattle={idxBattle}
        currentBattleIdx={currentBattleIdx}
        currentSongIdx={currentSongIdx}
        battleInfo={battleInfo}
				timeToFinish={timeToFinish}
      />
    </li>
  );
};

export { BattleItem };
