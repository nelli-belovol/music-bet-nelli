import { useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  setSongId,
  setSongSinger,
  setSongTitle,
  setSongUrl,
} from '../../store/playerSlice';
import { SongInfo } from './SongInfo/SongInfo';
import { SongPoster } from './SongPoster/SongPoster';
import styled from './SongCard.module.scss';
import { useMediaQuery } from 'react-responsive';

interface Song {
  id: number;
  post: string;
  title: string;
  singer: string;
  url: string;
  genre: string;
}

interface IProps {
  // song: Song;
  song: any;
  setISVoted: (v: boolean) => void;
  currentRound: any;
  idx: number;
  idxBattle: number;
  currentBattleIdx?: number;
  currentSongIdx?: number;
  songRef: any;
  vote: (id: number) => void;
  getOwner: any;
}

const SongCard: React.FC<IProps> = ({
  song,
  setISVoted,
  currentRound,
  idxBattle,
  currentBattleIdx,
  idx,
  currentSongIdx,
  songRef,
  vote,
  getOwner,
}) => {
  const dispatch = useAppDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const id = useAppSelector((state) => state.player.songId);
  const selectedCategoryId = useAppSelector((state) => state.musicCategories.selectedCategory);
  const [initialZindex, setInitialZindex] = useState(null);
  const containerRef = useRef<any>(null);

  useEffect(() => {
    if (containerRef.current && initialZindex === null) {
      setInitialZindex(containerRef.current.style.zIndex);
    }
  }, [containerRef, initialZindex]);

  const [currentSongIndex, setCurrentSongIdx] = useState(1);

  const songGenre = useMemo(() => {
    if (selectedCategoryId === null) {
      const category = song.music_categories[0]
      return category ? category.name : "Others";
    }
    const category = song.music_categories.find((category: any) => category.id === selectedCategoryId);
    return category ? category.name : "Others";
  }, [selectedCategoryId, song.music_categories]);
  
  useEffect(() => {
    if (currentSongIdx) {
      setCurrentSongIdx(currentSongIdx);
    }
  }, [currentSongIdx]);

  const isMobile = useMediaQuery({
    query: '(max-width: 720px)',
  });
  const isDesktop = useMediaQuery({
    query: '(min-width: 1200px)',
  });

  const urlTrack =
    'https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3';

  useEffect(() => {
    if (id === song.id) {
      if (containerRef.current) {
        containerRef.current.style.zIndex = 9;
        containerRef.current.style.opacity = 1;
      }
      setIsPlaying(true);
    } else {
      containerRef.current.style.zIndex = initialZindex;
      containerRef.current.style.opacity = 0.6;
      setIsPlaying(false);
    }
  }, [id, song.id]);

  const handlePlay = () => {
    dispatch(setSongId(song.track_id));
    dispatch(setSongUrl(urlTrack));
    dispatch(setSongTitle(song.name));
    dispatch(setSongSinger(song.label));
  };

  const handleActive = () => {

  };

  return (
    <li
      ref={containerRef}
      className={
        idxBattle === currentBattleIdx && currentSongIndex > idx && isMobile
          ? styled.songCardItemBefore
          : styled.songCardItem
      }>
      <div
        style={
          {}
        }
        className={isPlaying ? styled.containerActive : styled.container}>
        <SongPoster
          getOwner={getOwner}
          isPlaying={isPlaying}
          genre={songGenre}
          handlePlay={handleActive}
          currentRound={currentRound}
          songData={song}
        />
        <SongInfo
          vote={vote}
          song={song}
          title={song.label}
          singer={song.name}
          setISVoted={setISVoted}
          id={song.battleId}
        />
      </div>
    </li>
  );
};

export { SongCard };
