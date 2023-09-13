import { useEffect, useState } from 'react';

import { statisticsAPI } from '../../api/api';
import { HeaderGeneral } from '../../components/HeaderGeneral/HeaderGeneral';
import { TopWinnersList } from '../../components/TopWinnersList/TopWinnersList';
import { TopPlayers } from '../../components/WinnersPages/TopPlayers/TopPlayers';
import { TopPlaylists } from '../../components/WinnersPages/TopPlaylists/TopPlaylists';

import styled from './Winners.module.scss';

const tops = [
  { title: 'Top NFT Songs' },
  { title: 'Top Playlists' },
  { title: 'Top Players' },
];

const Winners = () => {
  const [activeBtn, setActiveBtn] = useState(0);
  const [userStatistic, setUserStatistic] = useState([]);
  const [topPlaylists, setTopPlaylists] = useState([]);
  const [topPlayers, setTopPlayers] = useState([]);

  function toggleTop(index: number): void {
    setActiveBtn(index);
  }

  useEffect(() => {
    if (topPlayers.length === 0) {
      statisticsAPI.getTopPlayers().then((res) => {
        setTopPlayers(res);
      });
    }
  }, [topPlayers]);

  useEffect(() => {
    (() => {
      statisticsAPI.getTopNFTStatistic().then((res) => {
        setUserStatistic(res.data);
      });
    })();
  }, []);

  useEffect(() => {
    (() => {
      statisticsAPI.getTopPlaylists().then((res) => {
        setTopPlaylists(res.data);
      });
    })();
  }, []);

  return (
    <>
      <HeaderGeneral title='Winners' />
      <div className={styled.container}>
        <div className={styled.btnsWrapper}>
          {tops.map((el, index) => {
            return (
              <button
                onClick={() => toggleTop(index)}
                key={el.title}
                className={activeBtn === index ? styled.activeBtn : styled.notActiveBtn}>
                {el.title}
              </button>
            );
          })}
        </div>
        {activeBtn === 0 && <TopWinnersList userStatistic={userStatistic} />}
        {activeBtn === 1 && <TopPlaylists topPlaylists={topPlaylists} />}
        {activeBtn === 2 && <TopPlayers topPlayers={topPlayers} />}
      </div>
    </>
  );
};

export { Winners };
