import styled from "./PlayNow.module.scss";

import { ReactComponent as VolumeOnSvg } from "../../../assets/svg/volume-on.svg";
import { ReactComponent as NoSoundSvg } from "../../../assets/svg/no-sound.svg";
import { ReactComponent as CloseSubtitlesSvg } from "../../../assets/svg/closeSubtitles.svg";
import { ReactComponent as ClockSvg } from "../../../assets/svg/clock.svg";
import { ReactComponent as StarSvg } from "../../../assets/svg/star.svg";
import { ReactComponent as LikeSvg } from "../../../assets/svg/like.svg";
import { ReactComponent as LikedSvg } from "../../../assets/svg/liked.svg";
import { ReactComponent as ArrowUpSvg } from "../../../assets/svg/up-arrow.svg";
import { ReactComponent as NoteSvg } from "../../../assets/svg/note.svg";
import { ReactComponent as NoteWhiteSvg } from "../../../assets/svg/noteWhite.svg";
import { ReactComponent as MoreSvg } from "../../../assets/svg/more.svg";
import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { setVolume, setPrevVolume } from "../../../store/playerSlice";

import Progress from "../ProgressBar/ProgressBar";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { useMediaQuery } from "react-responsive";

const PlayNow = () => {
  const dispatch = useAppDispatch();

  const totalTimeRedux = Number(useAppSelector((state) => state.player.totalTime));
  const [currentTimeReduxFormatted, setCurrentTimeReduxFormatted] = useState("");
  const currentTimeRedux = Number(useAppSelector((state) => state.player.currentTime));
  const arrSub = useAppSelector((state) => state.player.songSubs) || [];
  const title = useAppSelector((state) => state.player.songTitle) || "";
  const image = useAppSelector((state) => state.player.songImage) || "";
  const genre = useAppSelector((state) => state.player.genre) || "";
  const artist = useAppSelector((state) => state.player.songSinger) || "";
  const arrSubKeys = Object.keys(arrSub);
  const arrSubValues = Object.values(arrSub);
  const volume: number = useAppSelector((state) => state.player.volume);
  const prevVolume: number = useAppSelector((state) => state.player.prevVolume);
  const [progress, setProgress] = useState<number>(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [leftTime, setLeftTime] = useState<number | string>();
  const isDesktop = useMediaQuery({
    query: "(min-width: 1201px)",
  });
  const pathname = window.location.hash

  const isPathInBattle = useMemo(() => {
    return pathname.indexOf('battle/all-battles') !== -1;
  }, [pathname]);
  const boxRef: any = useRef();
  let myRefs: any = [];

  const remainingTime = useMemo(() => {
    const remainingSeconds = totalTimeRedux - currentTimeRedux;
    const mins = ~~((remainingSeconds % 3600) / 60);
    const secs =
      ~~remainingSeconds % 60 < 10 ? `0${~~remainingSeconds % 60}` : ~~remainingSeconds % 60;

    const displayMins = mins < 10 ? `0${mins}` : mins;
    const displaySeconds = secs < 10 ? `0${secs}` : secs;
    return `${displayMins}:${displaySeconds}`;
  }, [totalTimeRedux, currentTimeRedux]);

  const displayTotalTIme = useMemo(() => {
    const mins = ~~((totalTimeRedux % 3600) / 60);
    const secs = ~~totalTimeRedux % 60 < 10 ? `0${~~totalTimeRedux % 60}` : ~~totalTimeRedux % 60;

    const displayMins = mins < 10 ? `0${mins}` : mins;
    const displaySeconds = secs < 10 ? `0${secs}` : secs;
    return `${displayMins}:${displaySeconds}`;
  }, [totalTimeRedux]);

  useEffect(() => {
    const time = totalTimeRedux - currentTimeRedux;
    const mins = ~~((time % 3600) / 60);
    const secs = ~~time % 60 < 10 ? `0${~~time % 60}` : ~~time % 60;
    const leftTime = `0${mins}:${secs}`;
    setLeftTime(leftTime);
  }, [currentTimeRedux, totalTimeRedux]);

  useEffect(() => {
    const progress = Number(((currentTimeRedux * 100) / totalTimeRedux).toFixed(0));
    const mins = ~~((currentTimeRedux % 3600) / 60);
    const secs =
      ~~currentTimeRedux % 60 < 10 ? `0${~~currentTimeRedux % 60}` : ~~currentTimeRedux % 60;
    const currentTimeRedux2 = `0${mins}:${secs}`;
    setCurrentTimeReduxFormatted(currentTimeRedux2);
    setProgress(progress);

    const index = arrSubKeys.findIndex((time) => {
      return time === currentTimeRedux2;
    });
    if (index !== -1 && isOpen) {
      myRefs.forEach((el: { style: { fontWeight: number; opacity: number; filter: string } }) => {
        el.style.fontWeight = 400;
        el.style.opacity = 0.5;
        el.style.filter = "blur(1.35914px)";
      });

      if (myRefs[index + 1]) {
        myRefs[index + 1].style.opacity = 0.5;
        myRefs[index + 1].style.filter = "none";
      }
      if (myRefs[index + 2]) {
        myRefs[index + 2].style.opacity = 0.5;
        myRefs[index + 2].style.filter = "none";
      }

      myRefs[index].style.fontWeight = 600;
      myRefs[index].style.opacity = 1;
      myRefs[index].style.filter = "none";

      boxRef.current.scrollTo({
        top: myRefs[index].offsetTop - 44,
        left: 0,
        behavior: "smooth",
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTimeRedux]);

  const handleChangeVolume = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    const { currentTarget } = e;
    if (currentTarget.id === "no-sound") {
      dispatch(setVolume(prevVolume));
    }
    if (currentTarget.id === "volume-on") {
      dispatch(setPrevVolume(volume));
      dispatch(setVolume(0.0001));
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleClickMore = () => {};

  const handleClose = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={styled.container}>
      <div className={styled.noteWrapper}>
        <NoteSvg />
        <h3 className={styled.playNow}>Now Playing</h3>
      </div>
      <div className={styled.wrapper}>
        {isDesktop && <Progress completed={progress} />}
        <div className={styled.song}>
          <img src={image} alt='song' width='74' height='74' />
          <div>
            <h3>{title}</h3>
            <p>{artist}</p>
          </div>
          {volume !== 0.0001 ? (
            <div
              id='volume-on'
              onClick={(e) => handleChangeVolume(e)}
              className={styled.controllers}
            >
              <VolumeOnSvg width='30' height='30' opacity='1' />
            </div>
          ) : (
            <div
              id='no-sound'
              onClick={(e) => handleChangeVolume(e)}
              className={styled.controllers}
            >
              <NoSoundSvg width='30' height='30' opacity='1' />
            </div>
          )}
          <p className={styled.currentTime}>-{remainingTime}</p>
          <button
            onClick={handleClose}
            id='close'
            className={isOpen ? styled.closeSubtitles : styled.openSubtitles}
          >
            <CloseSubtitlesSvg width='15' height='9' />
          </button>
        </div>
        {isOpen ? (
          <div className={styled.subtitlesWrapper}>
            {!isDesktop && <p className={styled.currentTime}>-{remainingTime}</p>}
            <div ref={boxRef} className={styled.scrollWrapper}>
              <ul className={styled.subtitleList}>
                <li style={{ height: "44px" }} className={styled.subtitleItem}></li>
                {arrSubValues.map((el, i) => {
                  const text = String(el);
                  return (
                    <li
                      ref={(ref) => (myRefs[i] = ref)}
                      key={arrSubKeys[i]}
                      className={styled.subtitleItem}
                    >
                      {text}
                    </li>
                  );
                })}
                <li style={{ height: "44px" }} className={styled.subtitleItem}></li>
                <li style={{ height: "44px" }} className={styled.subtitleItem}></li>
                <li style={{ height: "44px" }} className={styled.subtitleItem}></li>
                <li style={{ height: "44px" }} className={styled.subtitleItem}></li>
              </ul>
            </div>
          </div>
        ) : (
          <div style={{ display: "none" }}></div>
        )}

        <div className={styled.songInfo}>
          {isDesktop && (
            <div className={styled.songInfoBox}>
              <ClockSvg width='16' height='16' />
              <p>{displayTotalTIme}</p>
            </div>
          )}
          <div className={styled.songInfoBox}>
            {isDesktop && <StarSvg width='16' height='16' />}
            <p>{genre}</p>
          </div>
          <div id='like' className={styled.songInfoBox}>
            {isDesktop && isLiked ? (
              <LikeSvg width='17' height='15' />
            ) : (
              isDesktop && <LikedSvg width='17' height='15' />
            )}
            <p>16,237</p>
          </div>

        </div>
        {!isPathInBattle && (
          <div className={styled.songActions}>
            {
              <div onClick={handleLike} className={styled.songActionsBox}>
                {isLiked ? <LikeSvg width='24' height='21' /> : <LikedSvg width='24' height='21' />}
                <p>LIKE</p>
              </div>
            }
            <div className={`${styled.songActionsBox} ${styled.arrowUp}`}>
              <ArrowUpSvg width='28' height='29' />
              <p className={styled.songActionsDiscount}>Like and take 10% discount of NFT</p>
            </div>
            <div className={`${styled.songActionsBox} ${styled.note}`}>
              {isDesktop ? (
                <NoteSvg width='20' height='21' />
              ) : (
                <NoteWhiteSvg width='20' height='21' />
              )}
              <p>BUY NOW</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { PlayNow };
