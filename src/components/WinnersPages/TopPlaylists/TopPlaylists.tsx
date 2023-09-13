import { useEffect, useState } from 'react';

import { ReactComponent as User } from '../../../assets/favorites/user.svg';
import { ReactComponent as Cup } from '../../../assets/favorites/cup.svg';
import { ReactComponent as Wallet } from '../../../assets/favorites/wallet.svg';
import { ReactComponent as Arrow } from '../../../assets/favorites/arrow.svg';
import { ReactComponent as More } from '../../../assets/more.svg';
import { TrackList } from './TrackList/TrackList';

import styled from './TopPlaylists.module.scss';
import { BE_BASE_URL, musicAPI } from '../../../api/api';

const playlistTest = [
  {
    id: 1,
    cover: '',
    name: 'Playlist name',
    number: 2345,
    owner: 'Ivaylo Ivanov',
    points: 69,
    wallet: 2610,
    TKN: 2610,
  },
  {
    id: 2,
    cover: '',
    name: 'Playlist name',
    number: 2345,
    owner: 'Ivaylo Ivanov',
    points: 69,
    wallet: 2610,
    TKN: 2610,
  },
  {
    id: 3,
    cover: '',
    name: 'Playlist name',
    number: 2345,
    owner: 'Ivaylo Ivanov',
    points: 69,
    wallet: 2610,
    TKN: 2610,
  },
];

const TopPlaylists = ({ topPlaylists }: any) => {
  const [track, setTrack] = useState([]);

  useEffect(() => {
    musicAPI
      .getCustomerMusic()
      .then((res) => setTrack(res.data.data))
      .catch((e) => console.log(e));
  }, []);


  return (
    <ul className={styled.container}>
      {topPlaylists.map((el: any, index: number) => {
        return (
          <PlaylistSongs
            index={index}
            TKN={el.TKN}
            tracks={track}
            cover={el.cover}
            name={el.name}
            number={el.number}
            owner={el.owner}
            points={el.tracks_sum_win_count}
            wallet={el.wallet}
            key={el.id}
            id={el.id}
            playlist={el}
          />
        );
      })}
    </ul>
  );
};

interface IPlaylistSongs {
  cover: string;
  name: string;
  number: number;
  owner: string;
  points: number;
  wallet: number;
  TKN: number;
  index: number;
  id: number;
  playlist: {
    tracks: any;
    customer: {
      username: string;
    }
  };
  tracks?: any;
}

const PlaylistSongs: React.FC<IPlaylistSongs> = ({
  cover,
  name,
  playlist,
  number,
  owner,
  points,
  wallet,
  TKN,
  index,
  id,
  tracks,
}) => {
  const [isOpenPlaylist, setIsOpenPlaylist] = useState(false);

  function toggleOpenPlaylist() {
    setIsOpenPlaylist((prev) => !prev);
  }

  const [images, setImages] = useState<any>([]);
  // const [name, setName] = useState("");

  // useEffect(() => {
  //   setName(name);
  // }, [name]);

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

  console.log('images: ', images);
  return (
    <>
      <li onClick={toggleOpenPlaylist} className={styled.wrapper}>
        <div className={styled.number}>#{index + 1}</div>

        <div>
          <div className={styled.coverContainer}>
            {images && images.map((image: any) => {
              return (
                <img src={`${BE_BASE_URL}${image}`} width="24px" height="24px" style={{ borderRadius: "5px" }} />
              );
            })}
          </div>
        </div>

        <div className={styled.playlistNameWrapper}>
          <div className={styled.name}>{name}</div>
          <div className={styled.number}>{number}</div>
        </div>

        <div className={styled.iconWrapper}>
          <User className={styled.icon} />
          <p>{playlist.customer.username}</p>
        </div>

        <div className={styled.iconWrapper}>
          <Cup className={styled.icon} />
          <p>{points}</p>
        </div>

      </li>

      {isOpenPlaylist && <TrackList tracks={playlist.tracks} />}
    </>
  );
};

export { TopPlaylists };
