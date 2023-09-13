import React, { useEffect, useState } from 'react';
import { AnimateBtn } from '../../components/Buttons/AnimateBtn/AnimateBtn';

import { HeaderGeneral } from '../../components/HeaderGeneral/HeaderGeneral';
import { HelpCard } from '../../components/HelpCard/HelpCard';
import { WhatsNew } from '../../components/WhatsNew/WhatsNew';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import styled from './Support.module.scss';
import { initialCards } from '../../utils/initialCards';
import { SupportFAQ } from '../../components/SupportFAQ/SupportFAQ';
import { supportAPI } from '../../api/api';

const articles = [
  {
    id: 1,
    title: 'How to make more TKNs?',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu egestas elit.Pellentesque aliquet blandit ligula, vel vehicula tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu egestas elit',
    image: '../IMAGE1.jpg',
  },
  {
    id: 2,
    title: 'Playlists and more',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu egestas elit.Pellentesque aliquet blandit ligula, vel vehicula tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu egestas elit',
    image: '../IMAGE2.jpg',
  },
  {
    id: 3,
    title: 'How to make more TKNs?',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu egestas elit.Pellentesque aliquet blandit ligula, vel vehicula tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu egestas elit',
    image: '../IMAGE3.jpg',
  },
  {
    id: 4,
    title: 'Playlists and more',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu egestas elit.Pellentesque aliquet blandit ligula, vel vehicula tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu egestas elit',
    image: '../IMAGE4.jpg',
  },
  {
    id: 5,
    title: 'How to make more TKNs?',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu egestas elit.Pellentesque aliquet blandit ligula, vel vehicula tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu egestas elit',
    image: "'../IMAGE5.jpg'",
  },
  {
    id: 6,
    title: 'How to make more TKNs?',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu egestas elit.Pellentesque aliquet blandit ligula, vel vehicula tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu egestas elit',
    image: '../IMAGE6.jpg',
  },
];

const Support = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [queryString, setQueryString] = useState('');
  const [cards, setCards] = useState([]);
  const [checkedCard, setCheckedCard] = useState<any[]>([]);

  const handleNavigate = (id: number) => {
    navigate(`/support/${id}/FAQ`);
  };

  useEffect(() => {
    supportAPI.getFaq().then((res) => {
      setCards(res);
    });
  }, []);

  useEffect(() => {
    supportAPI.getFaq(queryString).then((res) => {
      setCards(res);
    });
  }, [queryString]);

  return (
    <>
      <HeaderGeneral title='Support' />
      <div className={styled.container}>
        <div className={styled.bgMain}>
          <div>
            <h2>How can we HELP you today?</h2>
            <div className={styled.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu
              egestas elit. Pellentesque aliquet blandit ligula, vel vehicula tellus.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu
              egestas elit.
            </div>
            <div className={styled.searchContainer}>
              <input
                className={styled.search}
                type='text'
                placeholder='Write here …'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <AnimateBtn title='Search' handleClick={() => { setQueryString(query); }}/>
            </div>
          </div>
        </div>
        <SupportFAQ questions={cards} />
      </div>
    </>
  );
};

export { Support };
