import { MenuHeader } from './MenuHeader/MenuHeader';
import { PlayNow } from './PlayNow/PlayNow';
import { TopPlayers } from './TopPlayers/TopPlayers';

import { useAppDispatch } from '../../hooks/reduxHooks';
import {
  setSongData,
  setSongId,
  setSongImage,
  setSongSinger,
  setSongSubs,
  setSongTitle,
  setSongUrl,
} from '../../store/playerSlice';

import styled from './ProfileInfoMenu.module.scss';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useEffect, useState } from 'react';
import { BE_BASE_URL, musicAPI, statisticsAPI } from '../../api/api';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const ProfileInfoMenu = () => {
  const dispatch = useAppDispatch();
  const idSong = useAppSelector((state) => state.player.songId);
  const [topPlayers, setTopPlayers] = useState([]);
  const [initialSong, setInitialSong] = useState<boolean | null>(null);
  const [isVisibleMenu, setIsVisibleMenu] = useState(true);

  const route = useLocation();

  const hideRightSide = useMediaQuery({
    query: '(max-width: 1600px)',
  });

  useEffect(() => {
    if (route.pathname.includes('how-to-play-and-win')) {
      setIsVisibleMenu(false);
    } else {
      setIsVisibleMenu(true);
    }
  }, [route.pathname]);

  useEffect(() => {
    if (topPlayers.length === 0) {
      statisticsAPI.getTopPlayers().then((res) => {
        setTopPlayers(res);
      });
    }
  }, [topPlayers]);

  useEffect(() => {
    if (initialSong === null) {
      musicAPI.getMusic().then((res) => {
        const random = Math.floor(Math.random() * res.data.data.length);
        const track = res.data.data[random];
        let lyrics = [];
        try {
          lyrics = JSON.parse(track.lyrics.replace(/[\r\n]/g, ''));
        } catch (e) {}

        dispatch(
          setSongData({
            id: track.id,
            url: `${BE_BASE_URL}${track.file}`,
            image: `${BE_BASE_URL}${track.image}`,
            title: track.name,
            singer: track?.artists[0]?.name,
            lyrics: lyrics,
            genre:
              track.music_categories.length > 0 ? track.music_categories[0].name : 'Pop',
          }),
        );

        setInitialSong(true);
      });
    }
  }, [initialSong]);

  if (hideRightSide) {
    return null;
  }
  return !isVisibleMenu ? null : (
    <div className={styled.container}>
      <div className={styled.bgWhite}>
        <MenuHeader />
        <hr className={styled.line} />
        {idSong !== null && <PlayNow />}
        <TopPlayers topPlayers={topPlayers} />
      </div>
    </div>
  );
};

export { ProfileInfoMenu };
