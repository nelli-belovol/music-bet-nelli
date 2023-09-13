import React, { useEffect, useState } from 'react';
import { musicAPI } from '../../api/api';

import { TopWinnerElement } from './TopWinnerElement';

import styled from './TopWinnersList.module.scss';

interface IProps {
  userStatistic: any;
}

interface Track {
  track: any;
};

const TopWinnersList: React.FC<IProps> = ({ userStatistic }) => {

  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (tracks.length === 0) {
      setLoading(true);
      musicAPI.getMusic().then(({ data: { data } }) => {
        setLoading(false);
        setTracks(data);
      });
    }
  }, []);

  return (
    <ul className={styled.container}>
      {(loading || userStatistic.length === 0) &&
        <p>Loading...</p>
      }
      {userStatistic.map((el: any, index: number) => {
        return <TopWinnerElement key={index} nft={el} index={index} tracks={tracks} />;
      })}
    </ul>
  );
};

export { TopWinnersList };
