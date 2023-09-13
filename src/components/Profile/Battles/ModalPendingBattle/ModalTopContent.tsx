import { BE_BASE_URL } from '../../../../api/api';
import arrowMore from '../../../../assets/icons-for-modal-battle/more.svg';
import { ReactComponent as Start } from '../../../../assets/icons-for-modal-battle/play.svg';
import { ReactComponent as Stop } from '../../../../assets/icons-for-modal-battle/stop.svg';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import { setSongData } from '../../../../store/playerSlice';

import styled from './ModalPendingBattle.module.scss';

interface IProps {
  isOpen: boolean;
  track?: any;
  toggleOpen: () => void;
  closeModal: () => void;
}

const ModalTopContent: React.FC<IProps> = ({ isOpen, toggleOpen, closeModal, track }) => {
  const dispatch = useAppDispatch();
  const onPlay = () => {
    closeModal();

    if (!track) {
      return;
    }

    let lyrics = [];
    try {
      lyrics = JSON.parse(track.lyrics.replace(/[\r\n]/g, ''));
    } catch (e) {}
    dispatch(
      setSongData({
        id: track.id,
        url: `${BE_BASE_URL}${track.file}`,
        image: `${BE_BASE_URL}${track.image}`,
        title: track.name,
        singer: track?.artists[0]?.name,
        lyrics: lyrics,
        genre:
          track.music_categories.length > 0 ? track.music_categories[0].name : 'Pop',
      }),
    );
  };
  return (
    <div className={styled.topContent}>
      <article onClick={onPlay}>
        <span>Play</span>
        <Start className={styled.icon} />
      </article>
      {/* <article onClick={closeModal}>
        <span>Stop</span>
        <Stop className={styled.icon} />
      </article> */}
      {/* <article onClick={toggleOpen} className={styled.more}>
        <span>More info</span>
        <img className={isOpen ? styled.open : styled.close} src={arrowMore} alt='more-icon' />
      </article> */}
    </div>
  );
};

export { ModalTopContent };
