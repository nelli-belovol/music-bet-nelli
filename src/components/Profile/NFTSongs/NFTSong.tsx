import { useEffect, useState } from 'react';

import { musicAPI, trackAPI } from '../../../api/api';
import { NFTMusicBlock } from '../../NFTMusicBlock/NFTMusicBlock';
import { NFTSongs } from '../../NFTSongs/NFTSongs';
import { ProfileLayout } from '../../ProfileLayout/ProfileLayout';
import { ProfileNftButtons } from '../../ProfileNfrtButtons/ProfileNftButtons';
import preview from './preview.svg';
import check from './check.svg';

import styled from './NFTSong.module.scss';
import { NotificationT } from '../../ToastifyNot/NotificationToastify';
import { toast } from 'react-toastify';

interface customSong {
  in_battle?: number;
  artists: any;
  music_categories: any;
  win_count: number;
  id: number;
  name: string;
  title: string;
  image: string;
  label: string;
  file: string;
  lyrics: string;
}

export interface ISong {
  id: number;
  track_id: number;
  track: customSong;
}

const NFTSong = () => {
  const [songs, setSongs] = useState<ISong[]>([
    {
      id: 0,
      track_id: 0,
      track: {
        artists: null,
        music_categories: null,
        name: '',
        image: '',
        label: '',
        id: 0,
        title: '',
        in_battle: 0,
        file: '',
        lyrics: '',
        win_count: 0,
      },
    },
    // const [songs, setSongs] = useState<ISong[]>([
    // { id: 0, track_id: 0, track: { name: '', image: '', label: '' } },
  ]);
  const [trackHash, setTrackHash] = useState<string>("");
  const [registerOpen, setRegisterOpen] = useState(false);

  useEffect(() => {
    musicAPI
      .getCustomerMusic()
      .then((res) => {
        setSongs(res.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  function toggleRegisterMenu() {
    setRegisterOpen((prev) => !prev);
  }

  function handleRegisterTrack() {
    trackAPI.registerTrack(trackHash).then((res) => {
      musicAPI
        .getCustomerMusic()
        .then((res) => {
          setSongs(res.data.data);
        })
        .catch((error) => {
          console.log("error:", error);
        });
    }).catch((error) => {
      toast.error(error.response.data.message);
    });
  }

  return (
    <ProfileLayout>
      <NotificationT/>
      <div className={styled.container}>
        <div className={styled.btnWrapper}>
          <ProfileNftButtons handleClick={toggleRegisterMenu} title="Register NFT"/>
        </div>
        {registerOpen && (
          <div>
            <div className={styled.regInfo}>
              <p>
                Enter NFT ID here and <span>register</span>
              </p>
              <input value={trackHash} onChange={(e: any) => { setTrackHash(e.target.value); }} type='text' placeholder='Register number *' />
              <button onClick={handleRegisterTrack}>REGISTER</button>
            </div>
{/* 
            <div className={styled.regNft}>
              <div className={styled.topBlock}>
                <div className={styled.nftWrapper}>
                  <img src='' alt='preview' />
                  <div className={styled.preview}>
                    <img src={preview} alt='' />
                    <p>Preview</p>
                  </div>
                </div>

                <div className={styled.rightBlock}>
                  <div className={styled.inputWrapper}>
                    <input type='text' placeholder='Author' />
                    <input type='text' placeholder='NFT song name' />
                  </div>

                  <div className={styled.selectWrapper}>
                    <select name='' id='' placeholder='Pick a Genre *'>
                      <option value=''></option>
                    </select>
                    <select name='' id='' placeholder='Pick a Year *'>
                      <option value=''></option>
                    </select>
                  </div>

                  <div className={styled.newTagWrapper}>
                    <button>
                      <span>NEW TAG +</span>
                    </button>
                  </div>

                  <textarea placeholder=' Description' />
                </div>
              </div>
              <div className={styled.bottomBlock}>
                <div className={styled.informationWrapper}>
                  <img src={check} alt='check' />
                  <p>Information about registration or something else</p>
                </div>
                <button>REGISTER</button>
              </div>
            </div> */}
          </div>
        )}

        {songs?.map((song, index: number) => {
          return (
            <NFTMusicBlock key={song.id}>
              <NFTSongs index={index} {...song} />
            </NFTMusicBlock>
          );
        })}
      </div>
    </ProfileLayout>
  );
};

export { NFTSong };
