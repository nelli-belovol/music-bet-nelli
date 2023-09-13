import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useOutSideClick } from '../../hooks/useOutSideClick';
import arrowDown from '../../assets/profile/icon-arrow-down.svg';
import { ReactComponent as Note } from '../../assets/svg/tabs/note.svg';
import { ReactComponent as Heart } from '../../assets/svg/tabs/heart.svg';
import { ReactComponent as Path } from '../../assets/svg/tabs/path.svg';
import { ReactComponent as Playlist } from '../../assets/svg/tabs/playlist.svg';
import { ReactComponent as Wallet } from '../../assets/svg/tabs/wallet.svg';

import styled from './ProfileTabs.module.scss';

interface IProps {
  title: string;
  svg: JSX.Element;
  setIsActive: (index: number) => void;
  index: number;
  isActive: number;
  url: string;
}

const sortBy = [{ title: 'Sort By Recent' }, { title: 'Sort By Data' }];

const TabElement: React.FC<IProps> = ({
  title,
  svg,
  index,
  setIsActive,
  isActive,
  url,
}) => {
  return (
    <Link
      to={url}
      onClick={() => setIsActive(index)}
      className={
        isActive === index ? styled.isActiveMenuElementWrapper : styled.menuElementWrapper
      }>
      <div className={isActive === index ? styled.isActiveLogo : styled.logo}>{svg}</div>
      <p className={isActive === index ? styled.isActiveText : styled.text}>{title}</p>
    </Link>
  );
};

const ProfileTabs = () => {
  const [isActiveTab, setIsActiveTab] = useState(0);
  const [isVisiblePopup, setIsVisiblePopup] = useState(false);
  const [currenFilter, setCurrentFilter] = useState('Sort By Recent');
  const popupRef = useRef(null);
  useOutSideClick(popupRef, setIsVisiblePopup, isVisiblePopup);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('playlists')) setIsActiveTab(1);
    if (location.pathname.includes('battles')) setIsActiveTab(2);
    if (location.pathname.includes('buy-tkn')) setIsActiveTab(3);
    if (location.pathname.includes('favorites')) setIsActiveTab(4);
  }, [location]);

  const routes = [
    { title: 'NFT songs', svg: <Note />, url: '/customer-tracks' },
    { title: 'Playlists', svg: <Playlist />, url: '/profile/playlists' },
    { title: 'Battles', svg: <Path />, url: '/profile/battles' },
    { title: 'BUY TKN', svg: <Wallet />, url: '/buy-tkn' },
    // { title: 'Favorite', svg: <Heart />, url: '/profile/favorites' },
  ];

  function choseFilter(index: number) {
    if (index === 0) setCurrentFilter('Sort By Recent');
    if (index === 1) setCurrentFilter('Sort By Data');
  }

  return (
    <>
      <div className={styled.mobWrapper}>
        <div className={styled.mobContainer}>
          <Link
            className={`${styled.link} ${isActiveTab === 0 ? styled.act : null}`}
            to='/customer-tracks'>
            <Note className={styled.icon} />
            <p>NFT songs</p>
          </Link>
          <Link
            className={`${styled.link} ${isActiveTab === 1 ? styled.act : null}`}
            to='/profile/playlists'>
            <Playlist className={styled.icon} />
            <p>Playlists</p>
          </Link>
        </div>

        <div className={styled.mobContainer}>
          <Link
            className={`${styled.link} ${isActiveTab === 2 ? styled.act : null}`}
            to='/profile/battles'>
            <Path className={styled.icon} />
            <p>Battles</p>
          </Link>
          <Link
            className={`${styled.link} ${isActiveTab === 3 ? styled.act : null}`}
            to='/buy-tkn'>
            <Wallet className={styled.icon} />
            <p>BUY TKN</p>
          </Link>
        </div>
{/* 
        <div className={styled.mobContainer}>
          <Link
            className={`${styled.link} ${isActiveTab === 4 ? styled.act : null}`}
            to='/profile/favorites'>
            <Heart className={styled.icon} />
            <p>Favorite</p>
          </Link>
        </div> */}
      </div>

      <div className={styled.container}>
        <div className={styled.wrapper}>
          {routes.map((el, index) => {
            return (
              <TabElement
                url={el.url}
                key={index}
                title={el.title}
                svg={el.svg}
                setIsActive={setIsActiveTab}
                index={index}
                isActive={isActiveTab}
              />
            );
          })}
        </div>
        <div
          ref={popupRef}
          className={styled.popupLink}
          onClick={() => setIsVisiblePopup((prev) => !prev)}>
          {/* {isVisiblePopup && (
            <ul className={styled.ul}>
              {sortBy.map((el, index) => {
                return (
                  <li
                    className={styled.popupLinkElement}
                    key={index}
                    onClick={() => choseFilter(index)}>
                    {el.title}
                  </li>
                );
              })}
            </ul>
          )} */}
          {/* <div className={styled.chosen}>{currenFilter}</div> */}
          {/* <img src={arrowDown} alt='' /> */}
        </div>
      </div>
    </>
  );
};

export { ProfileTabs };
