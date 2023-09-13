import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { Search } from '../../components/Search/Search';
import { closeMobileMenu } from '../../store/mobileMenuSlice';
import { ReactComponent as Logo } from '../../assets/svg/mobile-icons/logo.svg';
import { ReactComponent as Cross } from '../../assets/svg/mobile-icons/cross.svg';
import { ReactComponent as Notification } from '../../assets/svg/mobile-icons/notification.svg';
import { ReactComponent as User } from '../../assets/svg/mobile-icons/user.svg';
import { ReactComponent as Explore } from '../../assets/svg/mainMenu/home.svg';
import { ReactComponent as NftBattle } from '../../assets/svg/mainMenu/path.svg';
import { ReactComponent as Note } from '../../assets/svg/mainMenu/note.svg';
import { ReactComponent as Air } from '../../assets/svg/mainMenu/air.svg';
import { ReactComponent as Trophy } from '../../assets/svg/mainMenu/trophy.svg';
import { ReactComponent as Album } from '../../assets/svg/mainMenu/music-album.svg';
import { ReactComponent as Playlist } from '../../assets/svg/mainMenu/playlist.svg';
import iconLink from '../../assets/svg/mobile-icons/iconLink.png';

import styled from './MobileMenu.module.scss';
import { useState } from 'react';
import { useEffect } from 'react';

const MobileMenu = () => {
  const isOpen = useAppSelector((state) => state.mobileMenu.isOpen);
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('isAuth')) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  function openProfile() {
    dispatch(closeMobileMenu(null));
    navigate('/customer-tracks');
  }

  function openNotifications() {
    dispatch(closeMobileMenu(null));
    navigate('/profile/notification');
  }

  const [searchValue, setSearchValue] = useState("");
  function onClickLoupe() {
    dispatch(closeMobileMenu(null));
    navigate(`/buy-nft?search=${searchValue}`)
  }
  const dispatch = useAppDispatch();

  useEffect(() => {
    // document.body.style.overflow = 'hidden';

    return () => {
      // document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className={styled.mobileMenu}>
      {isOpen && (
        <nav className={styled.mobileNavigationWrapper}>
          <div className={styled.iconsWrapper}>
            <Cross
              className={styled.navIcons}
              onClick={() => dispatch(closeMobileMenu(null))}
            />
            <Logo className={styled.logo} />
            <div className={styled.userInfoIconsWrapper}>
              <Notification onClick={openNotifications} className={styled.navIcons} />
              <User onClick={openProfile} className={styled.navIcons} />
            </div>
          </div>

          {/* main */}
          <div className={styled.mainNavigation}>
            <Link
              onClick={() => dispatch(closeMobileMenu(null))}
              to='/explore'
              className={styled.link}>
              <Explore className={styled.icon} />
              <span>Explore</span>
            </Link>
            <Link
              onClick={() => dispatch(closeMobileMenu(null))}
              className={styled.link}
              to='/category-selection'>
              <NftBattle className={styled.icon} />
              <span>NFT Battles</span>
            </Link>
            <Link
              onClick={() => dispatch(closeMobileMenu(null))}
              className={styled.link}
              to='/buy-nft'>
              <Note className={styled.icon} />
              <span>Buy NFT</span>
            </Link>
            <Link
              onClick={() => dispatch(closeMobileMenu(null))}
              className={styled.link}
              to='/make-offer'>
              <Air className={styled.icon} />
              <span>Make offer</span>
            </Link>
            <Link
              onClick={() => dispatch(closeMobileMenu(null))}
              className={styled.link}
              to='/winners'>
              <Trophy className={styled.icon} />
              <span>Winners</span>
            </Link>
          </div>

          {/* profile */}
          {isAuth && (
            <div className={styled.profileNavigation}>
              <Link
                onClick={() => dispatch(closeMobileMenu(null))}
                className={styled.link}
                to='/customer-tracks'>
                <Album className={styled.icon} />
                <span>You NFT</span>
              </Link>
              <Link
                onClick={() => dispatch(closeMobileMenu(null))}
                className={styled.link}
                to='/your-playlist'>
                <Playlist className={styled.icon} />
                <span>Your Playlists</span>
              </Link>
            </div>
          )}

          {/* info */}
          <div className={styled.supportWrapper}>
            <Link
              onClick={() => dispatch(closeMobileMenu(null))}
              to='/support'
              className={styled.linkSupport}>
              <span>Support</span>
            </Link>
            <Link
              onClick={() => dispatch(closeMobileMenu(null))}
              to='contacts'
              className={styled.linkSupport}>
              <span>Contacts</span>
            </Link>
            <Link
              onClick={() => dispatch(closeMobileMenu(null))}
              to='how-to-play-and-win'
              className={styled.linkSupport}>
              <span>How to play and win</span>
            </Link>
          </div>

          <div className={styled.iconsLinkWrapper}>
            <img src={iconLink} alt='icon' />
            <img src={iconLink} alt='icon' />
            <img src={iconLink} alt='icon' />
            <img src={iconLink} alt='icon' />
          </div>
        </nav>
      )}
    </div>
  );
};

export { MobileMenu };
