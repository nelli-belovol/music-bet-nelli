import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import styled from './Navigate.module.scss';

interface ILinkElement {
  name: string | null;
  svg: JSX.Element;
  url: string;
}

interface IProps {
  menuElement: ILinkElement[];
}

const NavigateElement: React.FC<IProps> = ({ menuElement }) => {
  const location = useLocation();

  return (
    <div>
      {menuElement.map((item: ILinkElement, index: number) => {
        return (
          <Link
            className={
              location.pathname.includes(item.url) ? styled.activeLinkElement : styled.linkElement
            }
            key={index}
            to={item.url}>
            <div
              className={
                location.pathname.includes(item.url) ? styled.activeBlockLink : styled.blockLink
              }></div>
            <div
              className={location.pathname.includes(item.url) ? styled.activeIcon : styled.icon}>
              {item.svg}
            </div>
            <span
              className={
                location.pathname.includes(item.url)
                  ? styled.ActiveElementMenu
                  : styled.elementMenu
              }>
              {item.name && item.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default NavigateElement;
