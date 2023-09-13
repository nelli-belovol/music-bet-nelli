import { useEffect, useState } from 'react';

import example from '../../../assets/example.png';
import { BE_BASE_URL, musicAPI, playListAPI } from '../../../api/api';
import { ProfileLayout } from '../../ProfileLayout/ProfileLayout';
import { ProfileNftButtons } from '../../ProfileNfrtButtons/ProfileNftButtons';
import { Song } from './Song/Song';

import styled from './Playlist.module.scss';

interface TTT {
    playlist: any;
    tracks: any;
    onSelectForEdit?: any;
}

const PlaylistHover : React.FC<TTT> = ({ playlist, tracks, onSelectForEdit = () => {} }) => {
  const [images, setImages] = useState<any>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    setName(playlist.name);
  }, [playlist]);

  useEffect(() => {
    if (!tracks || !playlist) {
        return;
    }

    const imagesArray: any[] = [];
    playlist.tracks.map((track: any) => {
        imagesArray.push(track.image);
    });
    setImages(imagesArray);

  }, [tracks, playlist]);

  return (
    <>
      <div onClick={() => onSelectForEdit(playlist)}>
        <div className={styled.playlistContainer} style={{ cursor: "pointer" }}>
          <div className={styled.newPlaylist}>
            <div className={styled.playlistName}>
              <span>{name}</span>
            </div>

            <div className={styled.newPlaylistWrapper}>
              {images[0] && (
                <div style={{ position: "relative" }}>
                    <img className={styled.example} src={`${BE_BASE_URL}${images[0]}`} alt='cover' />
                    <div className={styled.songTitle}>
                        {playlist.tracks[0].name}
                    </div>
                </div>
              )}
              {images[1] && (
                <div style={{ position: "relative" }}>
                    <img className={styled.example} src={`${BE_BASE_URL}${images[1]}`} alt='cover' />
                    <div className={styled.songTitle}>
                        {playlist.tracks[1].name}
                    </div>
                </div>
              )}
              {images[2] && (
                <div style={{ position: "relative" }}>
                    <img className={styled.example} src={`${BE_BASE_URL}${images[2]}`} alt='cover' />
                    <div className={styled.songTitle}>
                        {playlist.tracks[2].name}
                    </div>
                </div>
              )}
              {images[3] && (
                <div style={{ position: "relative" }}>
                    <img className={styled.example} src={`${BE_BASE_URL}${images[3]}`} alt='cover' />
                    <div className={styled.songTitle}>
                        {playlist.tracks[3].name}
                    </div>
                </div>
              )}
            </div>

          </div>
        </div>
       
      </div>
    </>
  );
};

export { PlaylistHover };
