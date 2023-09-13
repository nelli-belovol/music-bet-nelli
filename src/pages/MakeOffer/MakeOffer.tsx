import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { contactAPI, profileAPI } from '../../api/api';

import { AnimateBtn } from '../../components/Buttons/AnimateBtn/AnimateBtn';
import { HeaderGeneral } from '../../components/HeaderGeneral/HeaderGeneral';
import { NotificationT } from '../../components/ToastifyNot/NotificationToastify';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { openLoginModalMenu } from '../../store/loginModalSlice';
import { LoginModal } from '../Login/LoginModal/LoginModal';

import styled from './MakeOffer.module.scss';

const MakeOffer = () => {
  const [songName, setSongName] = useState('');
  const [artist, setArtist] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState<any>({});
  
  useEffect(() => {
    if (Object.keys(userData).length === 0) {
      profileAPI.getProfile().then((res) => {
        setUserData(res.data.customer);
      });
    }
  }, [userData]);

  const dispatch = useAppDispatch();
  const isOpenModalLogin = useAppSelector((state) => state.modalLogin.isOpen);

  useEffect(() => {
    setIsAuth(JSON.parse(localStorage.getItem('isAuth')!));
  }, []);

  function handleAuth() {
    dispatch(openLoginModalMenu(null));
  }

  function handleSubmit() {
    const userEmail = userData.email ? userData.email : "notloggedin@music.bet"
    const name = userData.first_name ? `${userData.first_name} ${userData.last_name}` : "Not logged in user";

    contactAPI
    .createContact(name, userEmail, "Make offer form submitting", `song: ${songName} | artist: ${artist}`)
    .then((res) => {
      toast.success(res.success);
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
  }

  return (
    <>
      {isOpenModalLogin && <LoginModal />}
      <HeaderGeneral title='Make offer' />
      <NotificationT />
      <div className={styled.container}>
        <div className={styled.bgMain}>
          <div className={styled.wrapperLeft}>
            <h2>Can’t find the song you want?</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu
              egestas elit. Pellentesque aliquet blandit ligula, vel vehicula tellus.{' '}
              <br />
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu
              egestas elit.
            </p>
            {!isAuth && (
              <button type='submit' onClick={handleAuth}>
                Sign in / Log in
              </button>
            )}
          </div>
          <div className={styled.wrapperRight}>
            <h2>Tell us who it is and we will add it to the list ot NFT</h2>
            <div className={styled.wrapperQuery}>
              <input
                type='text'
                placeholder='Name of the Song'
                value={songName}
                onChange={(e) => setSongName(e.target.value)}
              />
              <input
                type='text'
                placeholder='Artist'
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                style={{ marginBottom: 0 }}
              />
              <AnimateBtn title='Send' handleClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { MakeOffer };
