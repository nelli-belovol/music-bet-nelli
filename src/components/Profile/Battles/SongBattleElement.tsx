import { useMemo, useState } from 'react';

import cover from '../../../assets/battles/cover.png';
import { ReactComponent as User } from '../../../assets/battles/user.svg';
import { ReactComponent as Trendy } from '../../../assets/battles/trendy.svg';
import { ReactComponent as Duration } from '../../../assets/battles/duration.svg';
import { ReactComponent as More } from '../../../assets/battles/more.svg';
import { ModalPendingBattle } from './ModalPendingBattle/ModalPendingBattle';

import styled from './Battles.module.scss';
import { BE_BASE_URL } from '../../../api/api';


interface IProps {
  track?: any;
  customer?: any;
  isPlayed?: boolean;
  isWon?: boolean;
  isOwned?: boolean;
  votesCount?: number;
}

const SongBattleElement: React.FC<IProps> = ({
  track,
  customer,
  isWon,
  votesCount,
  isOwned,
  isPlayed,
}) => {
  const [isOpenMore, setIsOpenMore] = useState(false);

  function toggleModalMore() {
    setIsOpenMore((prev) => !prev);
  }

  function closeModal() {
    setIsOpenMore(false);
  }

  const trackDuration = useMemo(() => {
    if (!track) {
      return `3:44`;
    }
    const duration = track?.duration;
    if (duration <= 0) {
      return `3:44`;
    }

    const time = track.duration;
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${displaySeconds}`;
  }, [track]);

  const coverPhoto = useMemo(() => {
    if (!track) {
      return cover;
    }
    if (!track.image) {
      return cover;
    }

    return `${BE_BASE_URL}${track.image}`;
  }, [track])

  return (
    <div className={styled.trek}>
      <img className={styled.cover} src={coverPhoto} alt='cover' />
      {/* owner-wrapper */}
      <div className={styled.infoWrapper}>
        <div className={styled.left}>
          <div className={styled.ownerWrapper}>
            <User />
            <div style={{ position: 'relative' }}>
              {isOpenMore && (
                <ModalPendingBattle
                  track={track}
                  isOpenMore={isOpenMore}
                  closeModal={closeModal}
                  setIsOpenMore={setIsOpenMore}
                />
              )}
            </div>
            <p className={styled.owner}>{customer?.username ?? "Elina Kirilova"}</p>
          </div>
          <h2 className={styled.songTitle}>{track?.name ?? "Oh my God"}</h2>
          <p className={styled.singer}>{track?.artists[0].name ?? "Adel"}</p>
        </div>
        {/* trek-info */}
        <div className={styled.txtContainer}>
          <div className={styled.txtWrap}>
            {(isOwned && isPlayed) &&
              <div className={styled.resultText}>
                {isWon ? "WON" : "LOST"}
              </div>
            }
            {(!isOwned || !isPlayed) &&
              <>
                <Trendy />
                <p className={styled.txt}>{track?.music_categories[0].name ?? "POP"}</p>
              </>
            }
          </div>
          <div className={styled.txtWrap}>
            {(isOwned && isPlayed) &&
              <>
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.48263 13.3878C7.64307 13.5247 7.84895 13.6001 8.0625 13.6001C8.27593 13.6001 8.48193 13.5247 8.64226 13.3881C9.2496 12.8707 9.83473 12.3848 10.3511 11.9563L10.3513 11.9561C11.8622 10.7018 13.167 9.61862 14.0749 8.55135C15.0899 7.3584 15.5625 6.2272 15.5625 4.99144C15.5625 3.79079 15.14 2.68312 14.3727 1.87232C13.5962 1.05193 12.5306 0.600098 11.3722 0.600098C10.5064 0.600098 9.71342 0.86676 9.01545 1.39261C8.66309 1.65805 8.34391 1.98291 8.0625 2.36183C7.7812 1.98291 7.46191 1.65805 7.10966 1.39261C6.41169 0.86676 5.61873 0.600098 4.75287 0.600098C3.59438 0.600098 2.52894 1.05193 1.75246 1.87232C0.98513 2.68312 0.5625 3.79079 0.5625 4.99144C0.5625 6.2272 1.03526 7.3584 2.05023 8.55147C2.95821 9.61867 4.26318 10.702 5.77437 11.9565L5.777 11.9588C6.29244 12.3866 6.87666 12.8717 7.48263 13.3878ZM2.39836 2.45246C3.00661 1.80989 3.84272 1.45605 4.75287 1.45605C5.41949 1.45605 6.03163 1.66251 6.57214 2.06964C7.05393 2.43262 7.38947 2.89147 7.58608 3.21254C7.68725 3.37764 7.86532 3.47619 8.0625 3.47619C8.25968 3.47619 8.43775 3.37764 8.53892 3.21254C8.73564 2.89147 9.07118 2.43262 9.55286 2.06964C10.0934 1.66251 10.7055 1.45605 11.3722 1.45605C12.2823 1.45605 13.1185 1.80989 13.7266 2.45246C14.3439 3.10474 14.6839 4.00639 14.6839 4.99144C14.6839 6.03077 14.2874 6.9603 13.3984 8.00532C12.5399 9.01454 11.2633 10.0744 9.78519 11.3016L9.78117 11.3049C9.26276 11.7351 8.67533 12.2229 8.06124 12.7438C7.45081 12.2239 6.8643 11.7369 6.34692 11.3074L6.34417 11.3052L6.34329 11.3044C4.86372 10.0761 3.58586 9.01525 2.72669 8.00532C1.8376 6.9603 1.44106 6.03077 1.44106 4.99144C1.44106 4.00639 1.78107 3.10474 2.39836 2.45246Z" fill="#2B3134"/>
                </svg>
                <p>{votesCount}</p>
              </>
            }
            {(!isOwned || !isPlayed) &&
              <>
                <Duration />
                <p className={styled.txt}>{trackDuration}</p>
              </>
            }
          </div>
        </div>
      </div>

      <More onClick={toggleModalMore} className={styled.more} />
    </div>
  );
};

export { SongBattleElement };
