import smallPhoto from '../../../assets/profile/small-photo.png';
import arrowDown from '../../../assets/profile/icon-arrow-down.svg';
import wallet from '../../../assets/profile/wallet-blue.png';

import styled from './MenuHeader.module.scss';
import { useEffect, useMemo, useState } from 'react';
import { BE_BASE_URL, profileAPI } from '../../../api/api';

const MenuHeader = () => {
  const [userInfo, setUserInfo] = useState<any>();


  const avatarSrc = useMemo(() => {
    if (userInfo?.customer?.avatar && userInfo?.customer?.avatar !== localStorage.getItem('user_avatar')) {
      localStorage.setItem('user_avatar_small', `${BE_BASE_URL}${userInfo?.customer?.avatar}`);
    }

    const avatar = localStorage.getItem('user_avatar_small') ? localStorage.getItem('user_avatar_small') : smallPhoto;

    if (avatar !== smallPhoto) {
      localStorage.setItem('user_avatar_small', avatar);
    }

    return avatar;
  }, [userInfo]);

  useEffect(() => {
    profileAPI
      .getProfile()
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        setUserInfo(res);
      });
  }, []);

  return (
    <div className={styled.userInfoWrapper}>
      <img src={avatarSrc} className={styled.userAvatarSmall} alt='' />

      <div className={styled.infoBlock}>
        <div className={styled.nameWrapper}>
          <h3 className={styled.name}>{userInfo?.customer.username}</h3>
        </div>

        <div className={styled.profileWrapper}>
          <p className={styled.userProfile}></p>
          <div className={styled.walletContainer}>
            <p className={styled.wallet}></p>
            <div className={styled.walletWrapper}>
              <img src={wallet} alt='wallet' />
              <p className={styled.tkn}>{userInfo?.account.balance} TKN</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MenuHeader };
