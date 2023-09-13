import { useEffect, useState, useRef, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Joystick } from 'react-joystick-component';
import { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { AnimateBtn } from '../../components/Buttons/AnimateBtn/AnimateBtn';
import { AnimateBtnWhite } from '../../components/Buttons/AnimateBtnWhite/AnimateBtnWhite';
import { TransparentBtn } from '../../components/Buttons/TransparentBtn/TransparentBtn';
import { HeaderGeneral } from '../../components/HeaderGeneral/HeaderGeneral';
import { ReactComponent as Path1Svg } from './Path1.svg';
import { ReactComponent as Path2Svg } from './Path2.svg';
import { ReactComponent as Path3Svg } from './Path3.svg';
import { ReactComponent as Path4Svg } from './Path4.svg';
import arrow from '../../assets/scroll.svg';

import { BattleList } from '../../components/BattleList/BattleList';
import { battleAPI, userInfoAPI } from '../../api/api';

import styled from './NTFBattles.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { BattleCustomer, setBattle, setBattleStep } from '../../store/battleSlice';
import { string } from 'yup';
import { MovingBackground } from '../../components/ProfileLayout/MovingBackground';
import { NotificationT } from '../../components/ToastifyNot/NotificationToastify';

export type round = {
  name: string;
  isActive: boolean;
};

const roundsInitial: round[] = [
  { name: '1', isActive: true },
  { name: '2', isActive: false },
  { name: '3', isActive: false },
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

const useGetBattle = (step: any) => {
  const [battle, setBattle] = useState<any>(null);
  const [lastStep, setLastStep] = useState<any>(null);
  const [lastTimeout, setLastTimeout] = useState<any>(null);
  // const [chatMessages, setChatMessages] = useState([]);

  function toggleBattleRound(step: number): Promise<any> {
    return battleAPI
      .showBattleWithFilter(null, step)
      .catch((error) => console.log(error));
  }


  useEffect(() => {
    let delay = 1000;
    let timeout: string | number | NodeJS.Timeout | null | undefined = null;


    if (lastStep && lastStep === step && timeout) {
      // clearTimeout(lastTimeout);
      setLastStep(step);
      return;
    }

    const getBattle = () => {
      setLastStep(step);
      toggleBattleRound(step).then((res) => {
        if (res.data.data.length !== 0) {
          setBattle(res.data.data[0]);
        }
      });
    };

    console.log("step: ", step);
    console.log("lastStep: ", lastStep);
    console.log("STARTING TIMER WITH STEP: ", step);
    timeout = setInterval(getBattle, delay);
    // getBattle();
    

    return () => { timeout && clearInterval(timeout); console.log('cleared!') };
  }, [step, lastStep, setLastStep]);

  return battle;
};

const NFTBattles = () => {
  const [currentSongIdx, setCurrentSongIdx] = useState(0);
  const [rounds, setRounds] = useState<round[]>(roundsInitial);
  const [winnerCustomerId, setWinnerCustomerId] = useState([]);
  const refContainer: any = useRef();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [timeout, setTimeoutInternal] = useState<string | number | undefined | NodeJS.Timer>();
  const [currentTimeoutData, setCurrentTimeoutData] = useState<any>({});
  const playingSongId = useAppSelector((state) => state.player.songId);
  const battleStep = useAppSelector((state) => state.battle.step);
  const dispatch = useAppDispatch();
  const battle = useAppSelector((state) => state.battle.battle);
  const selectedCategoryName = useAppSelector((state) => state.musicCategories.selectedCategoryName) || "Mixed";
  const categoryId = useAppSelector((state) => state.musicCategories.selectedCategory);
  const defaultExpired = useAppSelector((state) => state.battle.timeLeft);

  const genreBattleString = useMemo(() => {

    if (battle) {
      const genres = battle.battle_customers.map((bc: BattleCustomer) => bc.track.music_categories[0].name);

      return `${genres[0]} vs ${genres[1]}`;
    }
  }, [battle]);

  const roundIdx = rounds.findIndex((round) => round.isActive);

  const bb = useGetBattle(battleStep);

  useEffect(() => {
    dispatch(setBattle(bb));
  }, [bb]);

  useEffect(() => {
    let interval = setInterval(() => {}, 20000);
    if (battle === null || battle.step !== step) {
      const queryStep = searchParams.get('step');
      let category_id = searchParams.get('category_id');
      // if (queryStep !== null && Number(queryStep) !== step) {
      //   setStep(Number(queryStep));
      // }

      // window.clearInterval(interval);
      // interval = setInterval(() => {
      //   // setCurrentTimeoutData({
      //   //   step,
      //   //   categoryId: category_id
      //   // });
      //   // toggleBattleRound(step, Number(category_id));
      // }, 5000);

      // setTimeoutInternal(interval);

      toggleBattleRound(step, Number(category_id));
    }
    

    // return () => window.clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [battle, step]);

  function reloadTillYouFindBattle(category_id: number | null, stepp: number) {
    const interval = setInterval(() => {
      battleAPI
        .showBattleWithFilter(category_id, stepp)
        .then((res) => {
          if (res.data.data.length !== 0) {
            dispatch(setBattle(res.data.data[0]));
            window.clearInterval(interval);
            setTimeoutInternal(undefined);
          } 
        })
        .catch((error) => console.log(error));
    }, 1000);

    setTimeoutInternal(interval);
  }

  function toggleBattleRound(step: number, category_id: number | null): void {
    battleAPI
      .showBattleWithFilter(category_id, step)
      .then((res) => {
        if (res.data.data.length !== 0) {
          dispatch(setBattle(res.data.data[0]));
        } else {

          // if (battle !== null) {
          //   reloadTillYouFindBattle(category_id, step);
          // }
          dispatch(setBattle(null));
        }
        // navigate(`/battle/all-battles?status=0&category_id=${category_id}&step=${step}`);
      })
      .catch((error) => console.log(error));
  }

  function vote(id: number): void {
    // battleAPI
    //   .votesForCard(id)
    //   .then((res) => {
    //     return res.data;
    //   })
    //   .catch((error) => console.log(error));
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

  //Change the round depending on the button click - change
  const setNextRound = (round: round) => {
    const nextStep = +round.name;
    const newArr = rounds.map((roundState) => {
      if (Number(roundState.name) === nextStep) {
        roundState.isActive = true;
        return roundState;
      } else {
        roundState.isActive = false;
        return roundState;
      }
    });

    window.clearInterval(timeout);
    setTimeoutInternal(undefined);
    setStep(nextStep);
    dispatch(setBattleStep(nextStep));
    setRounds(newArr);
    // toggleBattleRound(+round.name, categoryId);
    // const newArr = rounds.map((roundState) => {
    //   if (roundState.name === round.name) {
    //     roundState.isActive = true;
    //     return roundState;
    //   } else {
    //     roundState.isActive = false;
    //     return roundState;
    //   }
    // });

    // setRounds(newArr);
  };

  const currentRound = rounds[roundIdx];

  function queryBattles() {
    // let category_id = searchParams.get('category_id');
    // toggleBattleRound(step, Number(category_id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', paddingBottom: '200px' }}>
      <HeaderGeneral title='NFT Battles' />
      <NotificationT />
      <MovingBackground customBackground={true}>
        <div className={styled.bgMain}>
          <div className={styled.bg}>
            <div className={styled.flexMainContainer}>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <ul className={styled.roundList}>
                  {rounds.map((round) => (
                    <li
                      onClick={() => setNextRound(round)}
                      className={styled.roundItem}
                      key={round.name}
                      style={!round.isActive ? { opacity: 0.5 } : { opacity: 1 }}>
                      <div
                        className={styled.round}
                        style={
                          round.name === '1'
                            ? { backgroundColor: '#ffffff', color: '#001542' }
                            : round.name === '2'
                            ? { backgroundColor: '#0074f0' }
                            : { backgroundColor: '#000035' }
                        }>
                        <span>{round.name}</span>
                      </div>
                      <div className={styled.roundText}>Round</div>
                    </li>
                  ))}
                </ul>
                <div className={styled.info}>
                  <h2>{selectedCategoryName} battles</h2>
                  <div>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
                  <div>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque
                    maxime aliquid hic odio fugiat natus facilis sed ex deleniti.
                  </div>
                </div>
              </div>
              <div className={styled.currentOptions}>
                <div
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                  }}>
                  {/* <select className={styled.genresSelect}>
                    <option value='all'>All</option>
                    <option value='Mixed'>Mixed</option>
                    <option value='Popular'>Popular</option>
                  </select>
                  <div className={styled.genresSelectText}>Genres Battle</div> */}

                  <span className={styled.currentRoundNumber}>{currentRound.name}</span>
                </div>
                <span className={styled.currentRoundText}>Round</span>
              </div>
            </div>
            <div className={styled.animatedArrows}>
              <Path1Svg />
              <Path2Svg />
              <Path3Svg />
              <Path4Svg />
            </div>
            <div className={styled.navigate}>
              <div className={styled.buttonsContainer}>
                <AnimateBtn title='Buy NFT' handleClick={() => { navigate('/buy-nft') }} />
                <AnimateBtnWhite title='Buy TKN' notAnimated={true} hideBtn={true} handleClick={() => { navigate('/buy-tkn') }} />
                <TransparentBtn title='How to Play' handleClick={() => { navigate('/how-to-play-and-win') }}  />
              </div>

              <div className={styled.bottomContainer}>
                {/* <Joystick
                  size={60}
                  sticky={false}
                  baseColor='transparent'
                  stickImage={arrow}
                  throttle={500}
                  move={(e) => handleMove(e)}
                /> */}

                <div className={styled.options}>
                  <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <div className={styled.optionsName}>Expires:</div>
                    <div className={styled.optionsValue}>{defaultExpired}</div>
                  </div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      marginTop: '5px',
                    }}>
                    <div className={styled.optionsName}>Genres Battle:</div>
                    <div style={{ marginLeft: '14px' }}>{genreBattleString}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </MovingBackground>
      <div
            ref={refContainer}
            className={(styled.bg, styled.bgBattles)}
            style={currentRound.name !== '1' ? { height: 'auto' } : { height: '386px' }}>
              {battle &&
                <BattleList
                  key={battle.id}
                  onEnd={queryBattles}
                  userName={""}
                  winnerCustomerId={winnerCustomerId}
                  vote={vote}
                  refContainer={refContainer}
                  currentSongIdx={currentSongIdx}
                  currentRound={currentRound}
                  battle={battle}
                  timeUntilTheEndOfBattle={timeUntilTheEndOfBattle}
                />
              }
              {!battle && (
                <div className={styled.pulsate}>
                  Waiting for battle to begin
                </div>
              )}
            
          </div>
    </div>
  );
};

export { NFTBattles };





  // function handleMove(e: IJoystickUpdateEvent) {
  //   switch (e.direction) {
  //     case 'RIGHT':
  //       if (currentRound.name === '2') {
  //         setCurrentSongIdx((prev: number) => {
  //           if (prev + 1 <= 3) {
  //             return prev + 1;
  //           } else return 3;
  //         });
  //       }

  //       if (currentRound.name === '3') {
  //         setCurrentSongIdx((prev: number) => {
  //           if (prev + 1 <= 7) {
  //             return prev + 1;
  //           } else return 7;
  //         });
  //       }
  //       break;
  //     case 'LEFT':
  //       if (currentRound.name !== '1') {
  //         setCurrentSongIdx((prev: number) => {
  //           if (prev > 0) {
  //             return prev - 1;
  //           } else return 0;
  //         });
  //       }
  //       break;
  //     case 'FORWARD':
  //       setCurrentSongIdx(0);
  //       setCurrentBattleIdx((prev) => {
  //         if (currentBattleIdx > 0) {
  //           return prev - 1;
  //         } else return 0;
  //       });
  //       break;
  //     case 'BACKWARD':
  //       setCurrentSongIdx(0);
  //       setCurrentBattleIdx((prev) => {
  //         if (battles.length - 1 === prev) {
  //           return prev;
  //         } else {
  //           return prev + 1;
  //         }
  //       });
  //       break;
  //     default:
  //       break;
  //   }
  // }