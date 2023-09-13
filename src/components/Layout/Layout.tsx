import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { ReactComponent as Notification } from '../../assets/svg/mobile-icons/notification.svg';
import { ReactComponent as Logo } from '../../assets/svg/mobile-icons/logo.svg';
import { ReactComponent as User } from '../../assets/svg/mobile-icons/user.svg';
import { openMobileMenu } from '../../store/mobileMenuSlice';
import { MobileMenu } from '../mobileMenu/MobileMenu';

import styled from './Layout.module.scss';
import { useEffect } from 'react';
import { WhiteBtn } from '../Buttons/WhiteBtn/WhiteBtn';
import { authAPI } from '../../api/api';
import { userLogOut } from '../../store/isAuthSlice';

interface IProps {
  children: JSX.Element;
}

const Layout: React.FC<IProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  function openProfile() {
    navigate('/customer-tracks');
  }

  const isVisibleMenu = useAppSelector((state) => state.mainMenu.isVisible);
  const dispatch = useAppDispatch();
  const isOpenMobileMenu = useAppSelector((state) => state.mobileMenu.isOpen);

  const isDesktop = useMediaQuery({
    query: '(min-width: 1201px)',
  });

  useEffect(() => {
    if (localStorage.getItem('isAuth')) setIsAuth(true);
    if (!localStorage.getItem('isAuth')) setIsAuth(false);
  }, []);

  async function logout() {
    authAPI
      .logOut()
      .then(() => {
        dispatch(userLogOut(null));
      })
      .then(() => setIsAuth(false));
  }

  return (
    <div className={!isVisibleMenu ? styled.activeContainer : styled.container}>
      <div>
        {!isDesktop && (
          <img
            className={styled.menuIconOpen}
            onClick={() => dispatch(openMobileMenu(null))}
            src='image/menu.svg'
            alt='menu'
          />
        )}
        {!isDesktop && <Logo className={styled.logo} />}
      </div>
      <div className={styled.notificationWrapper}>
        {!isDesktop && <Notification className={styled.notificationIcon} onClick={() => { navigate('/profile/notification')}} />}
        {!isDesktop && <User onClick={openProfile} className={styled.userIcon} />}
      </div>

      {!isDesktop && 
      <div className={styled.logoutWrapper}>
          {isAuth && <WhiteBtn additionalStyle={{ width: "100px" }} handleClick={() => logout()} title='logout' />}
      </div>      
      }
      {isOpenMobileMenu && <MobileMenu />}
      <div className={styled.wrapper}>
        <>{children}</>
      </div>
    </div>
  );
};

export { Layout };
