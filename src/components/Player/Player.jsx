import { useEffect, useInsertionEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import styled from './Player.module.scss';
import { ReactComponent as PlaySvg } from '../../assets/svg/play.svg';
import { ReactComponent as PauseSvg } from '../../assets/svg/pause.svg';
import { ReactComponent as VolumeOnSvg } from '../../assets/svg/volume-on.svg';
import { ReactComponent as NoSoundSvg } from '../../assets/svg/no-sound.svg';
import { ReactComponent as WalletSvg } from '../../assets/svg/wallet.svg';
import { ReactComponent as MoreSvg } from '../../assets/svg/more.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  setVolume,
  setPrevVolume,
  setCurrentTime,
  setTotalTime,
} from '../../store/playerSlice';
import { useLocation } from 'react-router-dom';
import { profileAPI } from '../../api/api';
const linGrad = document
  .createElement('canvas')
  .getContext('2d')
  .createLinearGradient(0, 0, 1000, 128);
linGrad.addColorStop(0.0029, '#00E476');
linGrad.addColorStop(0.48, '#00B2FD');
linGrad.addColorStop(1, ' #0074F0');

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: '#eee',
  progressColor: linGrad,
  cursorColor: '$blue',
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

const Player = () => {
  const dispatch = useAppDispatch();
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [countStartTries, setCountStartTries] = useState(0);
  const volume = useAppSelector((state) => state.player.volume);
  const prevVolume = useAppSelector((state) => state.player.prevVolume);
  const [totalSec, setTotalSec] = useState();
  const [totalMin, setTotalMin] = useState();
  const [currentSec, setCurrentSec] = useState();
  const [currentMin, setCurrentMin] = useState();
  const url = useAppSelector((state) => state.player.songUrl);
  const image = useAppSelector((state) => state.player.songImage);
  const title = useAppSelector((state) => state.player.songTitle);
  const singer = useAppSelector((state) => state.player.songSinger);
  const id = useAppSelector((state) => state.player.songId);
  const playerMargin = useAppSelector((state) => state.player.playerMargin);
  const [margin, setMargin] = useState(0);
  const [isVisiblePlayer, setIsVisiblePlayer] = useState(true);
  const [balance, setBalance] = useState(0);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (Object.keys(userData).length === 0) {
      profileAPI.getProfile().then((res) => {
        setBalance(res.data.account.balance);
        setUserData(res.data.customer);
      });
    }
  }, [userData]);

  const route = useLocation();

  useEffect(() => {
    if (route.pathname.includes('how-to-play-and-win')) {
      setIsVisiblePlayer(false);
    } else {
      setIsVisiblePlayer(true);
    }
  }, [route.pathname]);

  useEffect(() => {
    setMargin(playerMargin);
  }, [playerMargin]);

  useEffect(() => {
    setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
    if (url !== '') {
      wavesurfer.current.load(url);
    }

    wavesurfer.current.on('ready', function () {
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
  }, [url, waveformRef]);

  useEffect(() => {
    wavesurfer.current.setVolume(volume);
  }, [volume]);

  function pad(value) {
    return String(value).padStart(2, '0');
  }

  useEffect(() => {
    if (playing && window.WaveSurferAudioContext.state !== 'running') {
      setTimeout(() => {
        wavesurfer.current.playPause();
        setCountStartTries(countStartTries + 1);
      }, 100);
    }
  }, [playing, wavesurfer, countStartTries]);

  useEffect(() => {
    if (playing) {
      const totalTime = wavesurfer.current.getDuration().toFixed(0);
      dispatch(setTotalTime(totalTime));
      const totalMin = pad(Math.floor(totalTime / 60));
      setTotalMin(totalMin);
      const totalSec = pad(Math.floor(totalTime % 60));
      setTotalSec(totalSec);

      const id = setInterval(() => {
        const currentTime = wavesurfer.current.getCurrentTime().toFixed(0);
        dispatch(setCurrentTime(currentTime));
        const currentMin = pad(Math.floor(currentTime / 60));
        setCurrentMin(currentMin);
        const currentSec = pad(Math.floor(currentTime % 60));
        setCurrentSec(currentSec);
      }, 1000);
      return () => clearInterval(id);
    }
  }, [dispatch, playing]);

  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
  };

  const onVolumeChange = (e) => {
    const { target, currentTarget } = e;
    const newVolume = +target.value;

    if (newVolume) {
      dispatch(setVolume(newVolume));
      wavesurfer.current.setVolume(newVolume || 1);
    }
    if (currentTarget.id === 'no-sound') {
      dispatch(setVolume(prevVolume));
      wavesurfer.current.setVolume(prevVolume || 1);
    }
    if (currentTarget.id === 'volume-on') {
      dispatch(setPrevVolume(volume));
      dispatch(setVolume(0.0001));
      wavesurfer.current.setVolume(0.0001);
    }
  };

  return !isVisiblePlayer ? null : (
    <div
      className={styled.container}
      style={{ left: `${margin}px`}}>
      <div className={styled.song}>
        <img src={image} alt='' width='60' height='60' />
        <div>
          <h3>{title}</h3>
          <p>{singer}</p>
        </div>
      </div>

      {!playing ? (
        <div
          width='20px'
          height='21px'
          onClick={handlePlayPause}
          className={styled.controllers}>
          <PlaySvg width='20' height='21' />
        </div>
      ) : (
        <div
          width='20px'
          height='21px'
          onClick={handlePlayPause}
          className={styled.controllers}>
          <PauseSvg width='20' height='21' />
        </div>
      )}
      <div className={styled.time}>
        {playing && (
          <p>
            {currentMin}:{currentSec}
          </p>
        )}
      </div>

      <div className={styled.waveform}>
        <div id='waveform' ref={waveformRef} />
      </div>
      <div className={styled.timeSummary}>
        {playing && (
          <p>
            {totalMin}:{totalSec}
          </p>
        )}
      </div>
      {volume !== 0.0001 ? (
        <div
          id='volume-on'
          width='18px'
          height='18px'
          onClick={(e) => onVolumeChange(e)}
          className={styled.controllersSound}>
          <VolumeOnSvg width='18' height='18' opacity='0.5' />
        </div>
      ) : (
        <div
          id='no-sound'
          width='18px'
          height='18px'
          onClick={(e) => onVolumeChange(e)}
          className={styled.controllersSound}>
          <NoSoundSvg width='18' height='18' opacity='0.3' />
        </div>
      )}
      <input
        className={styled.volume}
        type='range'
        id='volume'
        name='volume'
        // waveSurfer recognize value of `0` same as `1`
        //  so we need to set some zero-ish value for silence
        min='0.0001'
        max='1'
        step='.025'
        onChange={onVolumeChange}
        value={volume}
      />
      <div width='14px' height='21px' className={styled.wallet}>
        <WalletSvg width='14' height='21' />
      </div>
      <div className={styled.price}>
        <p>
          {balance} <span>TKN</span>
        </p>
      </div>
      <div width='14px' height='21px' className={styled.more}>
        <MoreSvg />
      </div>
    </div>
  );
};

export { Player };
