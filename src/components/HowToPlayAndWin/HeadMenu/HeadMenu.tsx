import React from 'react';
import { Link } from 'react-router-dom';
import styled from './HeadMenu.module.scss';

const HeadMenu = () => {
  const menu = [
    { title: 'Explore', imgUrl: 'image/menu/explore.svg', link: '/explore' },
    {
      title: 'NFT Battles',
      imgUrl: 'image/menu/NFT-Battles.svg',
      link: '/battle/all-battles?status=0&category_id=1&step=1',
    },
    { title: 'Buy NFT', imgUrl: 'image/menu/Buy-NFT.svg', link: '/buy-nft' },
  ];

  return (
    <>
      <ul className={styled.container}>
        {menu.map((el, index) => {
          return (
            <li className={styled.listElement} key={index}>
              <Link to={el.link}>
                <img src={el.imgUrl} alt='icon' />
                <span className={styled.text}>{el.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export { HeadMenu };
