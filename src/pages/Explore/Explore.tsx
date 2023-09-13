import { useEffect, useMemo, useRef, useState } from 'react';

import { HeaderGeneral } from '../../components/HeaderGeneral/HeaderGeneral';
import { SwiperExplore } from '../../components/ExploreSwiper/Swiper/SwiperExplore';
import { AnimateBtn } from '../../components/Buttons/AnimateBtn/AnimateBtn';
import { TransparentBtn } from '../../components/Buttons/TransparentBtn/TransparentBtn';
import { BattleList } from '../../components/BattleList/BattleList';
import { battleAPI, statisticsAPI, userInfoAPI } from '../../api/api';
import { TopWinnersList } from '../../components/TopWinnersList/TopWinnersList';

import styled from './Explore.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { resetBattleData, setBattle } from '../../store/battleSlice';
import { MovingBackground } from '../../components/ProfileLayout/MovingBackground';
import { useMediaQuery } from 'react-responsive';
import { TopPlayers } from '../../components/WinnersPages/TopPlayers/TopPlayers';
import { ExpiresGenresContainerVertical } from '../../components/ExpiresGenresContainerVertical/ExpiresGenresContainerVertical';
import { ExpiresGenresContainer } from '../NFTBattles/ExpiresGenrersContainer/ExpiresGenresContainer';
import { NotificationT } from '../../components/ToastifyNot/NotificationToastify';

export type round = {
  name: string;
  isActive: boolean;
};

const roundsInitial: round[] = [
  { name: '1', isActive: true },
  { name: '2', isActive: false },
];

interface ITrack {
  id?: number;
  post?: string;
  title?: string;
  genre?: string;
  url?: string;
  duration?: number;
  date_end?: string; //new
  status?: number; //!new?
  votes?: any; //new
  winner?: any; //new
  winner_customer_id?: number; //new
}

const useGetBattle = () => {
  const [battle, setBattle] = useState<any>({});
  // const [chatMessages, setChatMessages] = useState([]);

  function toggleBattleRound(step: number): Promise<any> {
    return battleAPI
      .showBattleWithFilter(null, step)
      .catch((error) => console.log(error));
  }


  useEffect(() => {
    let delay = 1000;
    let timeout: string | number | NodeJS.Timeout | null | undefined = null;

    const getBattle = () => {
      toggleBattleRound(1).then((res) => {
        if (res.data.data.length !== 0) {
          setBattle(res.data.data[0]);
        }
        timeout = setTimeout(getBattle, delay);
      });
    };

    getBattle();

    return () => { timeout && clearTimeout(timeout) };
  }, []);

  return battle;
  // React.useEffect(() => {
    
  //   const updateChat = () => {
  //     getChatMessages(_id).then(fetchedChatMessages => {
  //       // you must also consider passing a timestamp to the API call
  //       // so you only fetch the latest messages, instead of all of them every time
  //       // your state update would look like this:
  //       // setChatMessages((messages) => [...messages, fetchedChatMessages]);
  //       setChatMessages(fetchedChatMessages);
  //       // reset the delay in case an error has happened and changed it.
  //       delay = 1000;
  //       // now call the API again after 1 second
  //       timeout = setTimeout(updateChat, delay);
  //     }).catch(error => {
  //       // exponential backoff here.
  //       // 1 - the first error will call the API after 2sec
  //       // 2 - the second error will call the API after 4 sec
  //       // 3 - the third error will call the API after 8 sec
  //       // and so on
  //       console.error("Could not update chat. waiting a bit...", error);
  //       delay = delay * 2;
  //       timeout = setTimeout(updateChat, delay);
  //     });
  //   }

  //   return () => timeout && clearTimeout(timeout)

  // }, [_id]);
};
const Explore = () => {
  const [currentSongIdx, setCurrentSongIdx] = useState(0);
  const [currentBattleIdx, setCurrentBattleIdx] = useState(0);
  const [battles, setBattles] = useState<ITrack[][]>([]);
  const [rounds, setRounds] = useState<round[]>(roundsInitial);
  const [battleTimes, setBattleTimes] = useState<string[]>([]);
  const [winnerCustomerId, setWinnerCustomerId] = useState([]);
  const [battleId, setBattleId] = useState([]);
  const [userName, setUserName] = useState([]);
  const [userStatistic, setUserStatistic] = useState([]);
  const battle = useAppSelector((state) => state.battle.battle);
  const defaultExpired = useAppSelector((state) => state.battle.timeLeft);
  const selectedCategoryName = useAppSelector((state) => state.musicCategories.selectedCategoryName);

  const bb = useGetBattle();

  useEffect(() => {
    dispatch(setBattle(bb));
  }, [bb]);

  useEffect(() => {
    console.log("resetting!");
    dispatch(resetBattleData());
  }, []);
  const isShortDesktop = useMediaQuery({
    query: '(min-width: 1201px)',
  });

  const isDesktop = useMediaQuery({
    query: '(min-width: 1701px)',
  });

  const genreBattleString = useMemo(() => {
    if (battle) {
      if (!battle.category) {
        return 'All vs All';
      }
      return `${battle.category.name} vs ${battle.category.name}`;
    }
  }, [battle]);

  const dispatch = useAppDispatch();
  const refContainer: any = useRef();
  const navigate = useNavigate();

  const roundIdx = rounds.findIndex((round) => round.isActive);

  useEffect(() => {
    getUserNames();
  }, []);

  useEffect(() => {
    getTopWinnersNFT();
  }, []);

  useEffect(() => {
    // const timer = setTime
    toggleBattleRound(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleBattleRound(step: number): void {
    battleAPI
      .showBattleWithFilter(null, step)
      .then((res) => {
        if (res.data.data.length !== 0) {
          dispatch(setBattle(res.data.data[0]));
        } else {
          dispatch(setBattle(null));
        }
        // navigate(`/battle/all-battles?status=0&category_id=${category_id}&step=${step}`);
      })
      .catch((error) => console.log(error));
  }


  function getTopWinnersNFT() {
    statisticsAPI.getTopPlayers().then((res) => {
      setUserStatistic(res);
    });
  }

  function vote(id: number): void {
    battleAPI
      .votesForCard(id)
      .then((res) => {
        return res.data;
      })
      .catch((error) => console.log(error));
  }

  function timeUntilTheEndOfBattle(endTime: string): number {
    let endTimee;

    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      endTimee = endTime.replace(" ", "T");
    } else {
      endTimee = endTime;
    }
    //@ts-ignore
    const asd = new Date(endTimee);
    //@ts-ignore
    let time = ((asd).valueOf()+2*60*60*1000) - Date.parse(new Date());
    time /= 1000;
    return time;
  }

  function getUserNames() {
    userInfoAPI.getUserName().then((res) => {
      const userInfo: any = [];
      res.data.map((el: any) => {
        userInfo.push({ id: el.id, username: el.username });
      });
      setUserName(userInfo);
    });
  }

  //Change the round depending on the button click - change
  const setNextRound = (round: round) => {
    toggleBattleRound(+round.name);
    const newArr = rounds.map((roundState) => {
      if (roundState.name === round.name) {
        roundState.isActive = true;
        return roundState;
      } else {
        roundState.isActive = false;
        return roundState;
      }
    });

    setRounds(newArr);
  };

  const currentRound = rounds[roundIdx];

  function redirectToHowToPlay() {
    navigate(`/how-to-play-and-win`);
  }

  function redirectToBattles() {
    navigate(`/category-selection`);
  }

  function redirectToWinners() {
    navigate(`/winners`);
  }

  const battleSongs = useMemo(() => {
    if (!battle) {
      return [];;
    }

    if (!battle.battle_customers) {
      return [];
    }
    return battle.battle_customers.map(bc => bc.track);
  }, [battle]);
  return (
    <>
      <HeaderGeneral title='Explore' />
      <NotificationT/>

      <div className={styled.container}>
        <div className={styled.headContent}>
          <MovingBackground customBackground={true}>
            <div className={styled.headInfo}>
              <div className={styled.infoContent}>
                <h2 className={styled.title}>Listen to trennding song VOTE and WIN</h2>
                <div className={styled.buttonsWrapper}>
                  <AnimateBtn handleClick={redirectToBattles} title='Battles' />
                  <TransparentBtn handleClick={redirectToHowToPlay} title='How To Play' />
                </div>
              </div>

              <div className={styled.border}></div>

            {battle &&
            
             <div className={styled.battles} style={{ paddingTop: "40px", overflow: "visible"}}>
              {!isDesktop &&
                  <>
                    <div className={styled.options}>
                      <div>
                        <div className={styled.optionsName}>Expires:</div>
                        <div className={styled.optionsValue}>{defaultExpired}</div>
                      </div>
                      <div>
                        <div className={styled.optionsName}>Genres Battle:</div>
                        <div style={{ marginLeft: '14px' }}>{genreBattleString}</div>
                      </div>
                    </div>
                    <hr/>
                  </>
                // <ExpiresGenresContainer
                  // currentRound={currentRound}
                  // songs={battleSongs}
                  // timeToFinish={90}
                // />
              }

              







                <BattleList
                  userName={""}
                  winnerCustomerId={winnerCustomerId}
                  vote={vote}
                  refContainer={refContainer}
                  currentSongIdx={currentSongIdx}
                  currentRound={currentRound}
                  battle={battle}
                  timeUntilTheEndOfBattle={timeUntilTheEndOfBattle}
                />
              </div>
            }
            </div>
          </MovingBackground>
        </div>

        <div className={styled.swiperWrapper}>
          <SwiperExplore />
        </div>

        <div className={styled.topNFTWinnersWrapper}>
          <div className={styled.topPlayerInfo}>
            <h3 className={styled.tableTitle}>Top NFT winners</h3>
            <p className={styled.seeMore} onClick={redirectToWinners}>See more</p>
          </div>
          <div>
            <TopPlayers topPlayers={userStatistic} />
          </div>
        </div>
      </div>
    </>
  );
};

export { Explore };
