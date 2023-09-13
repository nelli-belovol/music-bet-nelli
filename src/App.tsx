import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import { toggleVisibleMenu, toggleVisibleMenuAll } from './store/mainMenuSlice';
import { Navigate } from './components/Navigate/Navigate';
import { Layout } from './components/Layout/Layout';
import { BuyNFT } from './pages/BuyNFT/BuyNFT';
import { Explore } from './pages/Explore/Explore';
import { NFTBattles } from './pages/NFTBattles/NFTBattles';
import { MakeOffer } from './pages/MakeOffer/MakeOffer';
import { Winners } from './pages/Winners/Winners';
import { Support } from './pages/Support/Support';
import { Contacts } from './pages/Contacts/Contacts';
import { HowToPlayAndWin } from './pages/HowToPlayAndWin/HowToPlayAndWin';
import { Loading } from './pages/Loading/Loading';
import { NFTSong } from './components/Profile/NFTSongs/NFTSong';
import { Playlist } from './components/Profile/Playlist/Playlist';
import { Battles } from './components/Profile/Battles/Battles';
import { BuyTkn } from './components/Profile/BuyTkn/BuyTkn';
import { Favorites } from './components/Profile/Favorites/Favorites';
import { ProfileInfoMenu } from './components/ProfileInfoMenu/ProfileInfoMenu';
import { ProfileSettings } from './components/ProfileSettings/ProfileSettings';
import { Notification } from './components/Notification/Notification';

import styled from './App.module.scss';
import { ContactUs } from './components/ContactUs/ContactUs';
import { ButtonsPage } from './pages/NFTBattles/buttonsPage/ButtonsPage';
import { Player } from './components/Player/Player';
import { PlayerMobile } from './components/Player/PLayerMobile';
import { ShortNavigate } from './components/Navigate/ShortNavigate';
import { SupportFAQ } from './components/SupportFAQ/SupportFAQ';

const Home = () => {
  const navigate = useNavigate();
  if (localStorage.getItem('isAuth')) {
    navigate('/explore');
  } else {
    navigate('/how-to-play-and-win');
  }

  return null;
};

const App = () => {
  const [isVisibleDesktopMenu, setIsVisibleDesktopMenu] = useState(true);
  const [isVisibleShortDesktopMenu, setIsVisibleShortDesktopMenu] = useState(false);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const idSong = useAppSelector((state) => state.player.songId);
  const { pathname } = location;

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 721px)',
  });

  const isMobile = useMediaQuery({
    query: '(max-width: 430px)',
  });
  const isDesktop = useMediaQuery({
    query: '(min-width: 1701px)',
  });

  const isShortDesktop = useMediaQuery({
    query: '(min-width: 1201px)',
  });

  useEffect(() => {
    dispatch(toggleVisibleMenuAll(isDesktopOrLaptop));
  }, [dispatch, isDesktopOrLaptop]);

  useEffect(() => {
    dispatch(toggleVisibleMenu(location.pathname));
  }, [dispatch, location]);

  useEffect(() => {
    window.scrollTo(0,0);
  }, [pathname]);

  useEffect(() => {
    if (!isDesktop) {
      setIsVisibleDesktopMenu(false);
    }
    if (location.pathname === '/how-to-play-and-win' || location.pathname === '/' || location.pathname === '/#' || location.pathname === '') {
      setIsVisibleDesktopMenu(false);
      setIsVisibleShortDesktopMenu(false);
      return;
    } else if (isShortDesktop && !isDesktop) {
      setIsVisibleShortDesktopMenu(true);
    } else if (!isDesktop) {
      setIsVisibleShortDesktopMenu(false);
      setIsVisibleDesktopMenu(false);
      return;
    } else {
      setIsVisibleShortDesktopMenu(false);
      setIsVisibleDesktopMenu(true);
    }
  }, [isDesktop, isShortDesktop, location.pathname]);
  const isOpenModalLogin = useAppSelector((state) => state.modalLogin.isOpen);

  
  return (
    <div className={styled.container} style={isOpenModalLogin ? { overflow: "hidden"} : {}}>
      {isVisibleDesktopMenu && <Navigate />}
      {isVisibleShortDesktopMenu && <ShortNavigate />}

      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='explore' element={<Explore />} />

          {/* <Route path='nft-battles' element={<NFTBattles />} /> */}

          {/* battles pages start */}
          <Route path='category-selection' element={<ButtonsPage />} />
          <Route path='battle/all-battles' element={<NFTBattles />} />
          {/* battles pages finish */}
          <Route path='buy-nft' element={<BuyNFT />} />
          <Route path='make-offer' element={<MakeOffer />} />
          <Route path='winners' element={<Winners />} />

          {/* profile */}
          {/* <Route path='profile' element={<NFTSong />} /> */}
          <Route path='customer-tracks' element={<NFTSong />} />
          <Route path='profile/playlists' element={<Playlist />} />
          <Route path='profile/battles' element={<Battles />} />
          <Route path='buy-tkn' element={<BuyTkn />} />
          <Route path='profile/favorites' element={<Favorites />} />
          <Route path='profile/settings' element={<ProfileSettings />} />
          <Route path='profile/notification' element={<Notification />} />
          <Route path='profile/contact-us' element={<ContactUs />} />
          {/* profile-end */}

          {/* WInners */}
          <Route path='winners/top-players' element={<Favorites />} />
          <Route path='winners/top-nfts' element={<Favorites />} />
          {/* WInners end */}
          {/* <Route path='your-playlist' element={<YourPlaylist />} /> */}
          <Route path='profile/playlists' element={<Playlist />} />
          <Route path='support' element={<Support />}>
            <Route path='/support/:idCategory/FAQ' element={<SupportFAQ />} />
          </Route>
          <Route path='contacts' element={<Contacts />} />
          <Route path='how-to-play-and-win' element={<HowToPlayAndWin />} />

          {/* preloader */}
          <Route path='loading' element={<Loading />} />
        </Routes>
      </Layout>
      {(isVisibleDesktopMenu || isShortDesktop) && <ProfileInfoMenu />}
      {location.pathname !== '/how-to-play-and-win' && isShortDesktop ? (
        idSong !== null && <Player />
      ) : location.pathname !== '/how-to-play-and-win' && (isDesktopOrLaptop || isMobile) ? (
        idSong !== null && <PlayerMobile />
      ) : (
        <></>
      )}
    </div>
  );
};

export default App;
