import { useEffect, useRef, useState } from 'react';

import NavigateElement from './NavigateElement';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { toggleOpenMenu } from '../../store/mainMenuSlice';
import { ReactComponent as Explore } from '../../assets/svg/mainMenu/home.svg';
import { ReactComponent as NftBattle } from '../../assets/svg/mainMenu/path.svg';
import { ReactComponent as Note } from '../../assets/svg/mainMenu/note.svg';
import { ReactComponent as Air } from '../../assets/svg/mainMenu/air.svg';
import { ReactComponent as Trophy } from '../../assets/svg/mainMenu/trophy.svg';
import { ReactComponent as Album } from '../../assets/svg/mainMenu/music-album.svg';
import { ReactComponent as Playlist } from '../../assets/svg/mainMenu/playlist.svg';
import { ReactComponent as Headphones } from '../../assets/svg/mainMenu/headphones.svg';
import { ReactComponent as Email } from '../../assets/svg/mainMenu/email.svg';
import { ReactComponent as Question } from '../../assets/svg/mainMenu/question.svg';
import shape from '../../assets/shape.svg';

import styled from './Navigate.module.scss';

const Navigate = () => {
  const ref = useRef(null);
  const dispatch = useAppDispatch();
  const [isAuth, setIsAuth] = useState(true);

  const isOpenModal = useAppSelector((state) => state.modalLogin.isOpen);

  useEffect(() => {
    if (localStorage.getItem('isAuth')) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  function toggleMenu() {
    dispatch(toggleOpenMenu(null));
  }

  const menu = [
    { name: 'Explore', url: 'explore', svg: <Explore /> },
    { name: 'NFT Battles', url: 'category-selection', svg: <NftBattle /> },
    { name: 'Buy NFT', url: 'buy-nft', svg: <Note /> },
    { name: 'Make offer', url: 'make-offer', svg: <Air /> },
    { name: 'Winners', url: 'winners', svg: <Trophy /> },
  ];

  const profile = [
    { name: 'Your NFT', url: 'customer-tracks', svg: <Album /> },
    { name: 'Your Playlist', url: 'profile/playlists', svg: <Playlist /> },
  ];

  const help = [
    { name: 'Support', url: 'support', svg: <Headphones /> },
    { name: 'Contacts', url: 'contacts', svg: <Email /> },
    { name: 'How to play and win', url: 'how-to-play-and-win', svg: <Question /> },
  ];

  return (
    <>
      {isOpenModal ? null : (
        <nav ref={ref} className={styled.container}>
          <div className={styled.topWrapper}>
            <img
              className={styled.logo}
              onClick={toggleMenu}
              src='image/logo-3.svg'
              alt=''
            />
            <div className={styled.menuWrapper}>
              <h3 className={styled.title}>Menu</h3>
              <NavigateElement menuElement={menu} />
            </div>

            {isAuth && (
              <div className={styled.menuWrapper}>
                <h3 className={styled.title}>Profile</h3>
                <NavigateElement menuElement={profile} />
              </div>
            )}
            <div className={styled.menuWrapper}>
              <h3 className={styled.title}>Help</h3>
              <NavigateElement menuElement={help} />
            </div>
          </div>

          <div className={styled.rightsWrapper}>
            <div className={styled.textWrapper}>
              <p className={styled.text}>Terms & Conditions</p>
              <p className={styled.text}>Privacy Policy</p>
            </div>
            <div className={styled.iconsShape}>
              <img className={styled.webLink} src={shape} alt='shape' />
              <img className={styled.webLink} src={shape} alt='shape' />
              <img className={styled.webLink} src={shape} alt='shape' />
              <img className={styled.webLink} src={shape} alt='shape' />
            </div>
            <p className={styled.text}>© 2022 All rights reserved MUSIC.BET</p>
          </div>
        </nav>
      )}
    </>
  );
};

export { Navigate };
