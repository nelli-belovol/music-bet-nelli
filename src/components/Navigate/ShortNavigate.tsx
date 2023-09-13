import { useEffect, useRef, useState } from 'react';

import NavigateElement from './NavigateElement';
import { useAppSelector } from '../../hooks/reduxHooks';
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

import styled from './ShortNavigate.module.scss';

const ShortNavigate = () => {
  const ref = useRef(null);
  const [isAuth, setIsAuth] = useState(true);

  const isOpenModal = useAppSelector((state) => state.modalLogin.isOpen);

  useEffect(() => {
    if (localStorage.getItem('isAuth')) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  const menu = [
    { name: '', url: 'explore', svg: <Explore /> },
    { name: '', url: 'category-selection', svg: <NftBattle /> },
    { name: '', url: 'buy-nft', svg: <Note /> },
    { name: '', url: 'make-offer', svg: <Air /> },
    { name: '', url: 'winners', svg: <Trophy /> },
  ];

  const profile = [
    { name: '', url: 'customer-tracks', svg: <Album /> },
    { name: '', url: 'profile/playlists', svg: <Playlist /> },
  ];

  const help = [
    { name: '', url: 'support', svg: <Headphones /> },
    { name: '', url: 'contacts', svg: <Email /> },
    { name: '', url: 'how-to-play-and-win', svg: <Question /> },
  ];

  return (
    <>
      {isOpenModal ? null : (
        <nav ref={ref} className={styled.container}>
          <div className={styled.topWrapper}>
            <div className={styled.logoWrapper}>
              <svg
                width='45'
                height='64'
                viewBox='0 0 45 64'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M3 3C3 3 3 49.5198 3 50C3 50.4802 3.79411 56.2839 9.34447 59.3658C14.8948 62.4478 19.9515 60.3307 21.2257 59.7547C22.5 59.1786 35.0447 51.0169 36.5044 50C37.964 48.9832 42 45.8144 42 40.1094C42 34.4044 38.1834 31.0005 36.5044 29.7562C34.8253 28.512 16.0779 17.8006 16.0779 17.8006V11.0312L3 3Z'
                  stroke='url(#paint0_linear_0_37496)'
                  strokeWidth='4.73981'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M14 30V50L31 40.1254L14 30Z'
                  stroke='url(#paint1_linear_0_37496)'
                  strokeWidth='4.23446'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <defs>
                  <linearGradient
                    id='paint0_linear_0_37496'
                    x1='-15.7015'
                    y1='21.3968'
                    x2='26.2623'
                    y2='60.8428'
                    gradientUnits='userSpaceOnUse'>
                    <stop stopColor='#00E476' />
                    <stop offset='0.549658' stopColor='#00B2FD' />
                    <stop offset='1' stopColor='#0074F0' />
                  </linearGradient>
                  <linearGradient
                    id='paint1_linear_0_37496'
                    x1='4.66228'
                    y1='34.5771'
                    x2='18.1188'
                    y2='51.5731'
                    gradientUnits='userSpaceOnUse'>
                    <stop stopColor='#00E476' />
                    <stop offset='0.549128' stopColor='#00B2FD' />
                    <stop offset='1' stopColor='#0074F0' />
                  </linearGradient>
                </defs>
              </svg>
            </div>
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
            <div className={styled.iconsShape}>
              <img className={styled.webLink} src={shape} alt='shape' />
              <img className={styled.webLink} src={shape} alt='shape' />
              <img className={styled.webLink} src={shape} alt='shape' />
              <img className={styled.webLink} src={shape} alt='shape' />
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export { ShortNavigate };
