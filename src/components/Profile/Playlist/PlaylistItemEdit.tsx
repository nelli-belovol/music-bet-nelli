import { useEffect, useState } from 'react';

import example from '../../../assets/example.png';
import { BE_BASE_URL, musicAPI, playListAPI } from '../../../api/api';
import { ProfileLayout } from '../../ProfileLayout/ProfileLayout';
import { ProfileNftButtons } from '../../ProfileNfrtButtons/ProfileNftButtons';
import { Song } from './Song/Song';

import styled from './PlaylistItemNew.module.scss';
import { WhiteBtn } from '../../Buttons/WhiteBtn/WhiteBtn';

interface TTT {
    playlist: any;
    track: Array<any>;
    onSave?: any;
}

const PlaylistItemEdit : React.FC<TTT> = ({ playlist, track, onSave = () => {} }) => {
  const [newPlaylistName, setNewPlayListName] = useState('');
  const [tracksIdsInPlaylist, setTracksIdsInPlaylist] = useState<any>([]);

  const [images, setImages] = useState([]);


  useEffect(() => {
    const trackIds = playlist.tracks.map((track: any) => track.id);
    setTracksIdsInPlaylist(trackIds);
    setNewPlayListName(playlist.name);
  }, [playlist]);

  useEffect(() => {
    imageForPlaylist();
  }, [tracksIdsInPlaylist]);

  function imageForPlaylist() {
    let x: any = [];
    tracksIdsInPlaylist.forEach((el: any) => {
      track.forEach((item: any) => {
        if (item.track.id === el) {
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

  const savePlaylist = () => {
    if (tracksIdsInPlaylist.length === 0) {
        return;
    }

    playListAPI.editPlaylist({ id: playlist.id, name: newPlaylistName, tracks: tracksIdsInPlaylist}).then(() => {
       onSave && onSave(); 
    });
  };

  return (
    <>
      <div>
        <div className={styled.playlistContainer} style={{}}>
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
          </div>

          <div className={styled.infoWrapper}>
            <p className={styled.currentNumber}>Playlist: {newPlaylistName}</p>

            <div>

                <input
                onChange={(e) => setNewPlayListName(e.target.value)}
                style={{ marginRight: "20px" }}
                value={newPlaylistName}
                className={styled.inputPlaylist}
                type='text'
                placeholder='Playlist Name Here'
                />
                <WhiteBtn handleClick={savePlaylist} title='Save' />
            </div>

          </div>
        </div>
        <div className={styled.noticeHeading}>
            <p>Chose 4 songs to add in playlist</p>
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
    </>
  );
};

export { PlaylistItemEdit };
