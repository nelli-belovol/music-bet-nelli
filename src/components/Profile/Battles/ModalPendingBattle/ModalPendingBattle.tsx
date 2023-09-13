import { FC, useState, useRef, useEffect } from 'react';

import { ModalBottomContent } from './ModalBottomContent';
import { ModalTopContent } from './ModalTopContent';
import { useOutSideClick } from '../../../../hooks/useOutSideClick';

import styled from './ModalPendingBattle.module.scss';

interface IProps {
  closeModal: () => void;
  isOpenMore: boolean;
  track?: any;
  setIsOpenMore: any;
}

const useOutsideAlerter = (ref: any, toggleOpen: any) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        toggleOpen();
        // alert("You clicked outside of me!");
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

const ModalPendingBattle: FC<IProps> = ({ closeModal, isOpenMore, setIsOpenMore, track }) => {
  const [isOpenSubModal, setIsOpenSubModal] = useState(false);
  const modalRef = useRef(null);
  const wrapperRef = useRef(null);
  useOutsideAlerter(modalRef, closeModal);

  function toggleOpen() {
    setIsOpenSubModal((prevState) => !prevState);
  }

  function close() {
    console.log(isOpenMore);
  }

  useOutSideClick(modalRef, close, isOpenMore);
  return (
    <div ref={modalRef} className={styled.container}>
      <div className={styled.upContainer}>
        <ModalTopContent track={track} isOpen={isOpenSubModal} toggleOpen={toggleOpen} closeModal={closeModal} />
      </div>

      {isOpenSubModal && (
        <div className={styled.bottomContainer}>
          <ModalBottomContent closeModal={closeModal} />
        </div>
      )}
    </div>
  );
};

export { ModalPendingBattle };
