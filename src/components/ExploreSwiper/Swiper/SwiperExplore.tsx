import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { CurrentCardElement } from '../CurrentCardElement/CurrentCardElement';
import 'swiper/css/navigation';
import prevTab from '../../../assets/explore/nav-scroll.svg';
import 'swiper/css';

import styled from './SwiperExplore.module.scss';
import { musicAPI } from '../../../api/api';
import { useNavigate } from 'react-router-dom';

interface Track {
  track: any;
};

const SwiperExplore = () => {
  const [numberOfSlides, setNumberOfSlides] = useState<number>(5);
  const navigate = useNavigate();
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const [tracks, setTracks] = useState<Track[]>([]);
  useEffect(() => {
    if (tracks.length === 0) {
      musicAPI.getMusic().then(({ data: { data } }) => {
        if (data.length > 5) {
          setTracks([ data[0], data[1], data[2], data[3], data[4], data[5],data[6] ])
        }
      });
    }
  }, []);
  const fiveSlides = useMediaQuery({
    query: '(min-width: 1101px)',
  });

  const fourSlides = useMediaQuery({
    query: '(max-width: 1100px)',
  });

  const threeSlides = useMediaQuery({
    query: '(max-width: 830px)',
  });

  const twoSlides = useMediaQuery({
    query: '(max-width: 620px)',
  });

  useEffect(() => {
    if (fourSlides) {
      setNumberOfSlides(4);
    }
    if (threeSlides) {
      setNumberOfSlides(3);
    }
    if (twoSlides) {
      setNumberOfSlides(2);
    }
    if (fiveSlides) {
      setNumberOfSlides(5);
    }
  }, [fourSlides, threeSlides, fiveSlides, twoSlides]);

  function navigateToBuyMore() {
    navigate('/buy-nft');
  }

  return (
    <div className={styled.container}>
      <div className={styled.textWrapper}>
        <div className={styled.offers}>Our offers</div>
        <div className={styled.seeMore} onClick={navigateToBuyMore}>See more</div>
      </div>

      <div className={styled.swiper}>
        {tracks.map(track => {
          return (
            <CurrentCardElement track={track}/>
          );
        })}
      </div>
    </div>
  );
};

export { SwiperExplore };
