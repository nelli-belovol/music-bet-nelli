import { ReactComponent as SoundWaveSvg } from '../../../assets/svg/SOUNDWAVE.svg';
import { ReactComponent as SoundWaveNoneSvg } from '../../../assets/svg/SOUNDWAVENONE.svg';
import { ReactComponent as PointsSvg } from '../../../assets/svg/points.svg';
import { ReactComponent as UserSvg } from '../../../assets/svg/user.svg';
import { ReactComponent as GenreSvg } from '../../../assets/svg/genre.svg';
import { ReactComponent as PlaySvg } from '../../../assets/svg/playWhite.svg';
import styled from '../SongCard.module.scss';
import { useMediaQuery } from 'react-responsive';
import { useMemo } from 'react';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { BE_BASE_URL } from '../../../api/api';
interface IProps {
  isPlaying: boolean;
  genre: string;
  handlePlay: () => void;
  currentRound: any;
  songData: any;
  getOwner: any;
}
const SongPoster: React.FC<IProps> = ({
  isPlaying,
  genre,
  handlePlay,
  currentRound,
  songData,
  getOwner,
}) => {
  const currentlyPlayingSongDuration = useAppSelector((state) => state.battle.currentlyPlayingSongDuration);
  const currentlyPlayingSong = useAppSelector((state) => state.player.songId);

  const duration = useMemo(() => {
    if (songData.id === currentlyPlayingSong) {
      return currentlyPlayingSongDuration
    } 

    return 0;
  }, [currentlyPlayingSongDuration, currentlyPlayingSong, songData]);
	function formattingTime(data: number): any {
    let minutes = 0;
    for (let i = data; i >= 60; i = i - 60) {
      minutes += 1;
    }
    const seconds = data - minutes * 60;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    const time = `${displayMinutes}:${displaySeconds}`;
    return time;
  }

  const bgImage = useMemo(() => {
    return `${BE_BASE_URL}${songData.image}`;
  }, [songData]);
  return (
    <div
      style={{ backgroundImage: `url("${bgImage}")`}}
      className={styled.songContainer}
      
      // style={
      //   isMobile && currentRound.name !== "1" && !isPlaying
      //     ? { opacity: "0.65" }
      //     : { opacity: "1" }
      // }
    >
      <div className={styled.songContainerFlex}>
        <div className={styled.songPostPoints}>
          <PointsSvg className={styled.songPostSvg} />
          <p>{songData.win_count} points</p>
        </div>
        <div className={styled.centerBox} onClick={handlePlay}>
          {isPlaying ? (
            <div className={styled.songPostTotalTime}>
              {/* <p>2:30</p> */}

              {formattingTime(duration)}
            </div>
          ) : (
            <div className={styled.songPostPlay}>
              <PlaySvg />
            </div>
          )}

          <div className={styled.songPostUser}>
            <UserSvg className={styled.songPostSvg} />
            <p>{songData.customer.username}</p>
          </div>
        </div>
        <div className={styled.songPostGenre}>
          <GenreSvg className={styled.songPostSvg} />
          <p>{genre ? genre : 'others'}</p>
        </div>
      </div>
      {isPlaying ? <SoundWaveSvg /> : <SoundWaveNoneSvg />}
    </div>
  );
};
export { SongPoster };
