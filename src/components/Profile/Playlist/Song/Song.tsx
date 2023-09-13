import React, { useMemo } from 'react';

import { ReactComponent as Cup } from '../../../../assets/favorites/cup.svg';
import { ReactComponent as Star } from '../../../../assets/favorites/star.svg';
import { ReactComponent as More } from '../../../../assets/more.svg';
import { ReactComponent as Play } from '../../../../assets/icons-for-modal-battle/play.svg';
import { ReactComponent as Stop } from '../../../../assets/icons-for-modal-battle/stop.svg';

import styled from './Song.module.scss';
import { BE_BASE_URL } from '../../../../api/api';

interface ISong {
  url: string;
  title: string;
  name: string;
  points: number;
  stars: number;
  id: number;
  track: any;
  tracksIdsInPlaylist: any;
  addOrRemoveTrackIdsInPlaylist: (id: number) => void;
}

const Song: React.FC<ISong> = ({
  url,
  track,
  title,
  name,
  points,
  stars,
  id,
  tracksIdsInPlaylist,
  addOrRemoveTrackIdsInPlaylist,
}) => {

  const songUrl = useMemo(() => {
    return `${BE_BASE_URL}${url}`;
  }, [url]);
  function isAddedTrack(id: number) {
    return tracksIdsInPlaylist.includes(id);
  }

  return (
    <li className={styled.container}>

        <div>
          <Play className={styled.player} />
        </div>

        {/* <Stop className={styled.player} /> */}

        <img className={styled.cover} src={songUrl} alt='cover' />

      <div className={styled.actorWrapper}>
        <p className={styled.title}>{title}</p>
        <p className={styled.name}>{name}</p>
      </div>

      <div className={styled.iconWrapper}>
        <div>
          <Cup />
        </div>
        <p>{points} points</p>
      </div>

      {!isAddedTrack(track.track.id) && (
        <button className={styled.btn} onClick={() => addOrRemoveTrackIdsInPlaylist(track.track.id)}>
          <span className={styled.sign}>+</span>
          <span className={styled.word}>ADD</span>
        </button>
      )}

      {isAddedTrack(track.track.id) && (
        <button className={styled.btn} onClick={() => addOrRemoveTrackIdsInPlaylist(track.track.id)}>
          <span className={styled.sign}>-</span>
          <span className={styled.word}>REMOVE</span>
        </button>
      )}
    </li>
  );
};

export { Song };
