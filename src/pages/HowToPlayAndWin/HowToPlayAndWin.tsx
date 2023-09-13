import { useMediaQuery } from 'react-responsive';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

import { Cards } from '../../components/HowToPlayAndWin/Cards/Cards';
import { WhiteBtn } from '../../components/Buttons/WhiteBtn/WhiteBtn';
import { Footer } from '../../components/HowToPlayAndWin/Footer/Footer';
import { HeadMenu } from '../../components/HowToPlayAndWin/HeadMenu/HeadMenu';
import { MainContent } from '../../components/HowToPlayAndWin/MainContent/MainContent';
import { TopPlayers } from '../../components/HowToPlayAndWin/TopPlayers';
import { MobileMenu } from '../../components/mobileMenu/MobileMenu';
import { openMobileMenu } from '../../store/mobileMenuSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import phone from '../../assets/phone.svg';
import mobileLogo from '../../assets/mobileLogo.svg';
import { LoginModal } from '../Login/LoginModal/LoginModal';
import { openLoginModalMenu } from '../../store/loginModalSlice';
import { AnimationBorder } from '../../components/AnimationBorder/AnimationBorder';
import { ReactComponent as ActiveCard } from '../../assets/active-card.svg';
import { authAPI } from '../../api/api';
import { userLogOut } from '../../store/isAuthSlice';

import styled from './HowToPlayAndWin.module.scss';

const HowToPlayAndWin = () => {
  const dispatch = useAppDispatch();
  const [isAuth, setIsAuth] = useState(false);
  const isOpenModalLogin = useAppSelector((state) => state.modalLogin.isOpen);

  useEffect(() => {
    if (localStorage.getItem('isAuth')) setIsAuth(true);
    if (!localStorage.getItem('isAuth')) setIsAuth(false);
  }, []);

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 620px)',
  });

  function scroll() {
    window.scrollTo(0, 900);
  }

  function openModal() {
    dispatch(openLoginModalMenu(null));
  }

  async function logout() {
    authAPI
      .logOut()
      .then(() => {
        dispatch(userLogOut(null));
      })
      .then(() => setIsAuth(false))
      .catch(() => {
        toast.error('the server is not responding, try again');
      });
  }

  useEffect(() => {
    if (isOpenModalLogin) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpenModalLogin]);

  return (
    <div className={styled.containerWrapper}>
      {!isDesktopOrLaptop && (
        <img className={styled.logoPosition} src={mobileLogo} alt='logo' />
      )}

      {!isDesktopOrLaptop && (
        <img
          className={styled.menuIconOpen}
          onClick={() => dispatch(openMobileMenu(null))}
          src='image/menu.svg'
          alt='menu'
        />
      )}

      {isOpenModalLogin && <LoginModal />}

      <div className={styled.bgWrapper}>
        <div className={styled.bgTop}></div>
        <div className={styled.imagesBg}></div>
        <img className={styled.ph} src={phone} alt='phone' />
      </div>
      <div className={styled.container}>
        <MobileMenu />

        <div className={styled.menu}>
          <img className={styled.logo} src='image/logo.svg' alt='logo' />
          <HeadMenu />
          {!isAuth && <WhiteBtn handleClick={() => openModal()} title='Sign Up Free' />}
          {isAuth && <WhiteBtn handleClick={() => logout()} title='logout' />}
        </div>

        <MainContent isDesktopOrLaptop={isDesktopOrLaptop} isAuth={isAuth} openModal={openModal} scroll={scroll} />
        <div className={styled.afterMainWrapper}>
          <img className={styled.tv} src='image/howToPlayAndWin/tv.png' alt='tv' />

          <h2 className={styled.headerSecondAsphalt}>We Give Everyone the</h2>

          <h2 className={styled.headerSecondWhite}>Chance to Play and Win</h2>

          <p className={styled.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique odio
            eu pharetra ultricies.
          </p>

          <div className={styled.cardWrapper}>
            <div className={styled.relativeBlock}>
              <div className={styled.textWrapper}>
                <div>
                  <p className={styled.exp}>Expires:</p>
                  <p className={styled.battle}>Genres Battle:</p>
                </div>

                <div>
                  <p className={styled.time}>13:25 min</p>
                  <p className={styled.mus}>Pop vs Rock</p>
                </div>
              </div>
            </div>

            <div className={styled.firstCard}>
              <AnimationBorder>
                <ActiveCard className={styled.activeCard} />
              </AnimationBorder>
            </div>

            <img
              className={styled.pathIcon}
              src='image/howToPlayAndWin/Path.png'
              alt='path'
            />
            <img
              className={styled.secondCard}
              src='image/howToPlayAndWin/cards/card2.png'
              alt='card3'
            />
          </div>

          <div className={styled.arrowTopWrapper}>
            <img
              className={styled.arrowTop}
              src='image/howToPlayAndWin/arrow-t.svg'
              alt=''
            />
            <h4 className={styled.arrowText}>Like and Play for Wining TKN</h4>
          </div>

          <div className={styled.middleCardWrapper}>
            <img
              className={styled.cardSize}
              src='image/howToPlayAndWin/cards/card3.png'
              alt='card'
            />
            <img
              className={styled.cardSize}
              src='image/howToPlayAndWin/cards/card4.png'
              alt='card'
            />
            <img
              className={styled.visibleCard}
              src='image/howToPlayAndWin/cards/card5.png'
              alt='card'
            />
            <img
              className={styled.visibleCard}
              src='image/howToPlayAndWin/cards/card6.png'
              alt='card'
            />
          </div>

          <div className={styled.arrowBtnWrapper}>
            <img
              className={styled.arrowTop}
              src='image/howToPlayAndWin/arrow-bm.svg'
              alt='arrow'
            />
            <h4 className={styled.arrowText}>Buy Your NFT and Take Part in a Battle</h4>
            <img
              className={styled.arrowTop}
              src='image/howToPlayAndWin/arrow-tp.svg'
              alt='arrow'
            />
          </div>

          <Cards />

          <TopPlayers />

          <img
            className={styled.logoSymbol}
            src='image/howToPlayAndWin/logo-symbol.svg'
            alt=''
          />

          <h3 className={styled.logoDescription}>
            The Best Music Platform for betting and winning money!
          </h3>

          <div className={styled.preFooter}>
            <h3 className={styled.preFooterTitle}>
              Listen to trending song VOTE and WIN
            </h3>
            {!isAuth && <WhiteBtn handleClick={() => openModal()} title='Sign Up Free' />}
            {isAuth && <WhiteBtn handleClick={() => logout()} title='logout' />}
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export { HowToPlayAndWin };
