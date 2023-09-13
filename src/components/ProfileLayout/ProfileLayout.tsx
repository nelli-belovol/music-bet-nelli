import { useContext, useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { HeaderGeneral } from '../HeaderGeneral/HeaderGeneral';
import { ProfileMenu } from '../ProfileMenu/ProfileMenu';
import { ProfileTabs } from '../ProfileTabs/ProfileTabs';
import cover from '../../assets/profile/cover.png';
import downArrow from '../../assets/profile/arrow-down.png';
import upArrow from '../../assets/profile/arrow-top.png';
import logo from '../../assets/profile/logo.svg';
import { BE_BASE_URL, profileAPI } from '../../api/api';

import styled from './ProfileLayout.module.scss';
import { MovingBackground } from './MovingBackground';
// import { AuthContext } from '../../providers/AuthProvider';

interface IProps {
  children?: any;
}

const ProfileLayout: React.FC<IProps> = ({ children }) => {
  const [userData, setUserData] = useState<any>({});
  const [transactionSum, setTransactionSum] = useState<any>({});
  const [balance, setBalance] = useState<any>(0);
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('isAuth')) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuth) {
      navigate('/how-to-play-and-win');
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    if (Object.keys(userData).length === 0) {
      profileAPI.getProfile().then((res) => {
        setBalance(res.data.account.balance);
        setTransactionSum(res.data.transactions_sum);
        setUserData(res.data.customer);
      });
    }
  }, [userData]);

  const avatarSrc = useMemo(() => {
    if (userData?.avatar && userData?.avatar !== localStorage.getItem('user_avatar')) {
      localStorage.setItem(
        'user_avatar',
        `${BE_BASE_URL}${userData.avatar}`,
      );
    }

    const avatar = localStorage.getItem('user_avatar')
      ? localStorage.getItem('user_avatar')
      : cover;

    if (avatar !== cover) {
      localStorage.setItem('user_avatar', avatar);
    }

    return avatar;
  }, [userData]);

  return (
    <>
      <HeaderGeneral title='' />
      <div className={styled.container}>
        <h1 className={styled.title}>Profile page</h1>
        <MovingBackground>
          <div className={styled.bgHeader}>
            <img className={styled.avatar} src={avatarSrc} alt='avatar' />
            <div className={styled.infoWrapper}>
              <h2 className={styled.name}>{userData.username}</h2>
              <p className={styled.userInfo}>Lorem ipsum dolor sit amet</p>

              <div className={styled.rightHeaderInfoWrapper}>
                <img className={styled.logo} src={logo} alt='logo' />
                <div className={styled.tknInfoWrapper}>
                  <div className={styled.tknWrapper}>
                    <p className={styled.tknTitle}>EXPENSE</p>
                    <div className={styled.iconWrapper}>
                      <img src={downArrow} alt='arrBot' />
                      <p>{(transactionSum.refill_transactions_sum * -1)} TKN</p>
                    </div>
                  </div>
                  <div className={styled.tknWrapper}>
                    <p className={styled.income}>INCOME</p>
                    <div className={styled.iconWrapper}>
                      <img src={upArrow} alt='arrBot' />
                      <p>{transactionSum.win_transactions_sum} TKN</p>
                    </div>
                  </div>
                  <div className={styled.accountWrapper}>
                    <p className={styled.account}>ACCOUNT</p>
                    <p>{balance} TKN</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MovingBackground>
        <ProfileTabs />
        <div className={styled.menuWrapper}>
          <ProfileMenu />
        </div>
        <div className={styled.children}>
          {/*!================           pages           ===============!*/}
          {children}
        </div>
      </div>
    </>
  );
};

export { ProfileLayout };
