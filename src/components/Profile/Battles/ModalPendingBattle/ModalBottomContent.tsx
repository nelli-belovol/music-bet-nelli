import { FC } from 'react';

import { ReactComponent as Offer } from '../../../../assets/icons-for-modal-battle/offer.svg';
import { ReactComponent as Share } from '../../../../assets/icons-for-modal-battle/share.svg';

import styled from './ModalPendingBattle.module.scss';

interface IProps {
  closeModal: () => void;
}

const ModalBottomContent: FC<IProps> = ({ closeModal }) => {
  return (
    <div className={styled.wrapper}>
      <div className={styled.transparent}></div>

      <article onClick={closeModal}>
        <span>Make Offer</span>
        <Offer className={styled.icon} />
      </article>

      <article onClick={closeModal}>
        <span>Share Song</span>
        <Share className={styled.icon} />
      </article>
    </div>
  );
};

export { ModalBottomContent };
