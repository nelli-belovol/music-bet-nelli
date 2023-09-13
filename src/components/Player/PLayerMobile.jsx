import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import styled from "./PlayerMobile.module.scss";
import { ReactComponent as PlaySvg } from "../../assets/svg/play.svg";
import { ReactComponent as PauseSvg } from "../../assets/svg/pause.svg";
import { ReactComponent as MoreSvg } from "../../assets/svg/moreSvgWhite.svg";
import { ReactComponent as MenuFight } from "../../assets/svg/menuFight.svg";
import { ReactComponent as MenuWinners } from "../../assets/svg/menuWinners.svg";
import { ReactComponent as MenuHome } from "../../assets/svg/menuHome.svg";
import { ReactComponent as MenuNFT } from "../../assets/svg/menuNFT.svg";
import { ReactComponent as MenuProfile } from "../../assets/svg/menuProfile.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setVolume, setPrevVolume, setCurrentTime, setTotalTime } from "../../store/playerSlice";
import { PlayNow } from "../ProfileInfoMenu/PlayNow/PlayNow";
import Progress from "../ProfileInfoMenu/ProgressBar/ProgressBar";
import { useNavigate } from "react-router-dom";
const linGrad = document
  .createElement("canvas")
  .getContext("2d")
  .createLinearGradient(0, 0, 1000, 128);
linGrad.addColorStop(0.0029, "#00E476");
linGrad.addColorStop(0.48, "#00B2FD");
linGrad.addColorStop(1, " #0074F0");

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "#eee",
  progressColor: linGrad,
  cursorColor: "$blue",
  barWidth: 2,
  barHeight: 10,
  barRadius: 3,
  cursorWidth: 0,
  responsive: true,
  fillParent: true,
  minPxPerSec: 100,
  height: 40,
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true,
  hideScrollbar: true,
});

const PlayerMobile = () => {
  const dispatch = useAppDispatch();
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const volume = useAppSelector((state) => state.player.volume);
  const [isOpen, setIsOpen] = useState(false);
  const url = useAppSelector((state) => state.player.songUrl);
  const image = useAppSelector((state) => state.player.songImage);
  const title = useAppSelector((state) => state.player.songTitle);
  const singer = useAppSelector((state) => state.player.songSinger);
  const id = useAppSelector((state) => state.player.songId);
  const currentTimeRedux = Number(useAppSelector((state) => state.player.currentTime));
  const totalTimeRedux = Number(useAppSelector((state) => state.player.totalTime));
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
    if (url !== "") {
      wavesurfer.current.load(url);
    }

    wavesurfer.current.on("ready", function () {
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        if (id !== null) {
          setPlay(true);
          wavesurfer.current.playPause();
        }
      }
    });
    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  useEffect(() => {
    if (playing) {
      const totalTime = wavesurfer.current.getDuration().toFixed(0);
      dispatch(setTotalTime(totalTime));

      const id = setInterval(() => {
        const currentTime = wavesurfer.current.getCurrentTime().toFixed(0);
        dispatch(setCurrentTime(currentTime));
      }, 1000);
      return () => clearInterval(id);
    }
  }, [dispatch, playing]);

  useEffect(() => {
    const progress = Number(((currentTimeRedux * 100) / totalTimeRedux).toFixed(0));
    setProgress(progress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTimeRedux]);

  const handlePlayPause = (e) => {
    e.stopPropagation();
    setPlay(!playing);
    wavesurfer.current.playPause();
  };

  return (
    <div className={styled.section}>
      {isOpen && <Progress completed={progress} />}
      <div className={styled.container}>
        <div
          className={styled.info}
          style={
            isOpen
              ? {
                  position: "absolute",
                  top: "20px",
                  left: "0px",
                  width: "100%",
                }
              : {}
          }
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={styled.song}>
            <img src={image} alt='' width='60' height='60' />
            <div>
              <h3>{title}</h3>
              <p>{singer ? singer : "Unknown"}</p>
            </div>
          </div>
          {!playing ? (
            <div
              width='14px'
              height='21px'
              onClick={(e) => handlePlayPause(e)}
              className={styled.controllers}
            >
              <PlaySvg width='20' height='21' />
            </div>
          ) : (
            <div
              width='14px'
              height='21px'
              onClick={(e) => handlePlayPause(e)}
              className={styled.controllers}
            >
              <PauseSvg width='20' height='21' />
            </div>
          )}
          <div className={styled.waveform}>
            <div id='waveform' ref={waveformRef} />
          </div>
          <div width='3px' height='17px' className={styled.more}>
            <MoreSvg />
          </div>
        </div>
        {isOpen ? <PlayNow /> : <></>}

        <div className={styled.menu}>
          <div width='19px' height='20px' onClick={() => { navigate("/buy-nft"); }} className={styled.menuIcons}>
            <MenuNFT width='19px' height='20px' />
          </div>
          <div width='16px' height='23px' onClick={() => { navigate("/category-selection"); }} className={styled.menuIcons}>
            <MenuFight width='16px' height='23px' />
          </div>
          <div width='20px' height='20px' onClick={() => { navigate("/explore"); }} className={styled.menuIcons}>
            <MenuHome width='20px' height='20px' />
          </div>
          <div width='20px' height='20px' onClick={() => { navigate("/winners"); }} className={styled.menuIcons}>
            <MenuWinners width='20px' height='20px' />
          </div>
          <div width='17px' height='20px' onClick={() => { navigate('/customer-tracks'); }} className={styled.menuIcons}>
            <MenuProfile width='17px' height='20px' />
          </div>
        </div>
      </div>
    </div>
  );
};

export { PlayerMobile };
