import React, { MouseEventHandler } from 'react';

import styled from './ModalNFTSong.module.scss';

// const ModalNFT = ({ onPlay = () => {} }) => {
interface IProps {
  track_id: number;
  is_mixed: number;
  onPlay: MouseEventHandler;
  addTrackToBattle(track_id: number, is_mixed: number): any;
}

const ModalNFT: React.FC<IProps> = ({ track_id, is_mixed = 0,  onPlay = () => {}, addTrackToBattle = () => {} }) => {
  return (
    <div className={styled.container}>
      <div onClick={onPlay}>Play</div>
      <div>Stop</div>
      <div>More info</div>
      <div>space</div>
      <div>Sell</div>
      <div>Add to Playlist</div>
      <div onClick={() => addTrackToBattle(track_id, is_mixed)}>Play in a battle</div>
      <div>Share Song</div>
    </div>
  );
};

export { ModalNFT };