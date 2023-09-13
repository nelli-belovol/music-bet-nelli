import { useEffect, useState } from 'react';

import example from '../../../assets/example.png';
import { BE_BASE_URL, musicAPI, playListAPI } from '../../../api/api';
import { ProfileLayout } from '../../ProfileLayout/ProfileLayout';
import { ProfileNftButtons } from '../../ProfileNfrtButtons/ProfileNftButtons';
import { Song } from './Song/Song';

import styled from './Playlist.module.scss';

interface TTT {
    playlist: any;
    isNew: boolean;
}

const PlaylistItem : React.FC<TTT> = ({ playlist, isNew = false }) => {
  const [playLists, setPlayLists] = useState<any>(null);
  const [addToPlaylistNow, setAddToPlaylistNow] = useState(false);
  const [newPlaylistName, setNewPlayListName] = useState('');
  const [track, setTrack] = useState([]);
  const [tracksIdsInPlaylist, setTracksIdsInPlaylist] = useState<any>([]);

  const [images, setImages] = useState([]);

  useEffect(() => {
    playListAPI.getAllPlayLists().then((res) => {
      setPlayLists(res.data.playlists.data);
    });
  }, []);

  useEffect(() => {
    musicAPI
      .getCustomerMusic()
      .then((res) => setTrack(res.data.data))
      .catch((e) => console.log(e));
  }, []);

  function createPlayListPage() {
    // setAddToPlaylistNow(true);
    playListAPI
      .createPlaylist('string', {
        'tracks[]': 1,
      })
      .then((res) => console.log(res));
  }

  useEffect(() => {
    imageForPlaylist();
  }, [tracksIdsInPlaylist]);

  function imageForPlaylist() {
    let x: any = [];
    tracksIdsInPlaylist.forEach((el: any) => {
      track.forEach((item: any) => {
        if (item.id === el) {
          x.push(item.track.image);
        }
      });
    });
    setImages(x);
  }

  function addOrRemoveTrackIdsInPlaylist(id: number) {
    if (tracksIdsInPlaylist.length === 4) {
        return;
    }
    tracksIdsInPlaylist.includes(id)
      ? setTracksIdsInPlaylist(
          tracksIdsInPlaylist.filter((el: number) => {
            if (el !== id) {
              return el;
            }
          }),
        )
      : setTracksIdsInPlaylist((prev: any) => [...prev, id]);
  }

  return (
    <>
      {/* <div className={styled.btnWrapper}>
        <ProfileNftButtons handleClick={createPlayListPage} />
      </div> */}

      <div>
        <div className={styled.playlistContainer}>
          <div className={styled.newPlaylist}>
            <div className={styled.playlistName}>
              <span>New Playlist</span>
            </div>

            <div className={styled.newPlaylistWrapper}>
              {images[0] && <img className={styled.example} src={`${BE_BASE_URL}${images[0]}`} alt='cover' />}
              {images[1] && <img className={styled.example} src={`${BE_BASE_URL}${images[1]}`} alt='cover' />}
              {images[2] && <img className={styled.example} src={`${BE_BASE_URL}${images[2]}`} alt='cover' />}
              {images[3] && <img className={styled.example} src={`${BE_BASE_URL}${images[3]}`} alt='cover' />}
            </div>

            <ProfileNftButtons title='NEW PLAYLIST' handleClick={createPlayListPage} />
          </div>

          <div className={styled.infoWrapper}>
            <p className={styled.currentNumber}>Playlist #2356</p>

            <input
              onChange={(e) => setNewPlayListName(e.target.value)}
              className={styled.inputPlaylist}
              type='text'
              placeholder='Playlist Name Here'
            />
          </div>
        </div>
        <ul className={styled.songWrapper}>
          {track.map((el: any, index) => {
            return (
              <Song
                track={el}
                name={el.track.name}
                points={el.track.win_count}
                stars={el.track.win_count}
                title={el.track.label}
                url={el.track.image}
                id={el.id}
                key={index}
                tracksIdsInPlaylist={tracksIdsInPlaylist}
                addOrRemoveTrackIdsInPlaylist={addOrRemoveTrackIdsInPlaylist}
              />
            );
          })}
        </ul>
      </div>

      {/* <div className={styled.container}>
        {playLists?.map((el: any, index: any) => {
          return <PlaylistElement key={index} name={el.name} />;
        })}
      </div> */}
    </>
  );
};

export { PlaylistItem };
