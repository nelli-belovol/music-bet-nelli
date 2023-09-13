import { Link } from 'react-router-dom';
import { PlayerCard } from './PlayerCard';
import styled from './TopPlayers.module.scss';

const TopPlayers = ({ topPlayers = [] }) => {
  return (
    <div className={styled.container}>
      <div className={styled.textWrapper}>
        <h3 className={styled.title}>Top Players</h3>
        <Link to={'winners'} className={styled.seeMore}>
          See more
        </Link>
      </div>

      <div className={styled.topPlayers}>
        {topPlayers.map((topPlayer: any) => {
          return (
            <PlayerCard
              key={topPlayer.id}
              name={topPlayer.name}
              avatar={topPlayer.avatar}
              winCount={topPlayer.win_count}
              totalNfts={topPlayer.total_nfts}
              balance={topPlayer.account.balance}
            />
          );
        })}
      </div>
    </div>
  );
};

export { TopPlayers };
