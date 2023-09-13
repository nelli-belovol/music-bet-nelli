import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { ProfileBtn } from '../Buttons/ProfileBtn/ProfileBtn';
import { ReactComponent as User } from '../../assets/svg/profile-main-btn-svg/user.svg';
import { ReactComponent as Setting } from '../../assets/svg/profile-main-btn-svg/setting.svg';
import { ReactComponent as Bell } from '../../assets/svg/profile-main-btn-svg/bell.svg';
import { ReactComponent as Mail } from '../../assets/svg/profile-main-btn-svg/mail.svg';

import styled from './ProfileMenu.module.scss';

const ProfileMenu = () => {
  const [activeBtn, setActiveBtn] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('nft-songs')) setActiveBtn(0);
    if (location.pathname.includes('settings')) setActiveBtn(1);
    if (location.pathname.includes('notification')) setActiveBtn(2);
    if (location.pathname.includes('contact-us')) setActiveBtn(3);
  }, [location.pathname]);

  const buttons = [
    { title: 'Profile Page', url: '/customer-tracks', svg: <User /> },
    { title: 'Profile Settings', url: '/profile/settings', svg: <Setting /> },
    { title: 'Notification', url: '/profile/notification', svg: <Bell /> },
    { title: 'Contact us', url: '/profile/contact-us', svg: <Mail /> },
  ];

  return (
    <div className={styled.container}>
      {buttons.map((el, index) => {
        return (
          <ProfileBtn
            url={el.url}
            key={index}
            index={index}
            setIsActive={setActiveBtn}
            isActive={activeBtn}
            title={el.title}
            svg={el.svg}
          />
        );
      })}
    </div>
  );
};

export { ProfileMenu };
