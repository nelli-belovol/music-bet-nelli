import { Joystick } from 'react-joystick-component';
import { useEffect, useState } from 'react';

import arrow from '../../assets/scroll.svg';

import styled from './ExpiresGenresContainerVertical.module.scss';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { setTimeLeft } from '../../store/battleSlice';

interface IProps {
  currentRound: { name: string; isActive: boolean };
  songs: any;
  timeToFinish: number;
}

const ExpiresGenresContainerVertical: React.FC<IProps> = ({
  currentRound,
  songs,
  timeToFinish,
}) => {
  const dispatch = useAppDispatch();
  const [time, setTime] = useState(99);

  const duration = songs.reduce(
    (result: any, currentSong: { duration: any }) => result + currentSong.duration,
    0,
  );

  const min = Math.floor(duration / 60);
  const sec = duration % 60;

  const genres = songs.map((song: { music_categories: any }) => song.music_categories[0].name);

  function handleMove() {
    // console.log('move');
  }

  function handleStop() {
    // console.log('stop');
  }

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
      const time = `${displayMinutes}:${seconds}`;
      return time;
    }
    dispatch(setTimeLeft(`${formattingTime(timeToFinish)} MIN`));
    setTime(formattingTime(timeToFinish));
  }, [timeToFinish]);

  return (
    <div
      className={
        currentRound.name === '1'
          ? styled.verticalContainer
          : styled.verticalContainerLeft
      }>
      <div className={styled.arrow}>
        <Joystick
          size={60}
          sticky={false}
          baseColor='transparent'
          stickImage={arrow}
          move={handleMove}
          stop={handleStop}
        />
      </div>
      <div className={styled.options}>
        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
          <div className={styled.optionsName}>Expires:</div>
          <div className={styled.optionsValue}>{time}min</div>
        </div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            marginTop: '5px',
          }}>
          <div className={styled.optionsName}>Genres Battle:</div>
          <div style={{ marginLeft: '14px' }}>
            {genres[0]} vs {genres[1]}
          </div>
        </div>
      </div>
    </div>
  );
};

export { ExpiresGenresContainerVertical };
