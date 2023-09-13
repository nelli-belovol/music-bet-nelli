import { useEffect, useState } from 'react';

import example from '../../../assets/example.png';
import { BE_BASE_URL, musicAPI, playListAPI } from '../../../api/api';
import { ProfileLayout } from '../../ProfileLayout/ProfileLayout';
import { ProfileNftButtons } from '../../ProfileNfrtButtons/ProfileNftButtons';
import { Song } from './Song/Song';

import styled from './Playlist.module.scss';
import { PlaylistItem } from './PlaylistItem';
import { PlaylistItemNew } from './PlaylistItemNew';
import { PlaylistHover } from './PlaylistHover';
import { PlaylistItemEdit } from './PlaylistItemEdit';

const Playlist = () => {
  const [playLists, setPlayLists] = useState<any>([]);
  const [track, setTrack] = useState([]);
  const [tracksIdsInPlaylist, setTracksIdsInPlaylist] = useState<any>([]);
  const [forEditPlaylist, setForEditPlaylist] = useState<any>(null);

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

  const addNewPlaylist = () => {
    const newPlalists = playLists.filter((pl: any) => !pl.isNew);
    setPlayLists([ ... newPlalists, { isNew: true }]);
  };

  const onSaveNewPlaylist = () => {
    playListAPI.getAllPlayLists().then((res) => {
      setPlayLists(res.data.playlists.data);
      setForEditPlaylist(null);
    });
  };

  const onSelectForEdit = (playlist: any) => {
    setForEditPlaylist(playlist);
  };

  return (
    <ProfileLayout>
      <div>
        <div className={styled.playlistContainer}>
            <ProfileNftButtons title='NEW PLAYLIST' handleClick={addNewPlaylist} />
        </div>

        {!forEditPlaylist &&
          <>
            {playLists && playLists.filter((pl: any) => pl.isNew).map((playlist: any) => {
              return (
                <div style={{ paddingBottom: "20px" }}>
                  <PlaylistItemNew
                    key={333}
                    track={track}
                    isNew={true}
                    onSave={onSaveNewPlaylist}
                    playlist={playlist} />
                </div>

              );
            })}
            <div className={styled.playlistsHoversContainer}>
              {playLists && playLists.filter((pl: any) => !pl.isNew).map((playlist: any) => {
                return (
                  <div style={{ paddingBottom: "20px" }} key={playlist.is}>
                    <PlaylistHover
                      onSelectForEdit={onSelectForEdit}
                      key={playlist.id}
                      tracks={track}
                      playlist={playlist} />
                  </div>
                );
              })}
            </div> 
          </> 
        }

        {forEditPlaylist &&
          <>
            <PlaylistItemEdit 
              playlist={forEditPlaylist} 
              track={track} 
              onSave={onSaveNewPlaylist}  
            />
          </>        
        }
      </div>

      {/* <div className={styled.container}>
        {playLists?.map((el: any, index: any) => {
          return <PlaylistElement key={index} name={el.name} />;
        })}
      </div> */}
    </ProfileLayout>
  );
};

export { Playlist };
