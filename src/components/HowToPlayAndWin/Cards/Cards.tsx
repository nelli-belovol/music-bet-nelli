import styled from './Cards.module.scss';

const Cards = () => {
  return (
    <div className={styled.cardWrapper}>
      <div className={styled.cardElement}>
        <img src='image/howToPlayAndWin/cards/top.png' alt='top' />
        <img src='image/howToPlayAndWin/cards/card6.png' alt='card' />
        <img src='image/howToPlayAndWin/cards/bottom.png' alt='bottom' />
      </div>
      <img className={styled.pathIcon} src='image/howToPlayAndWin/path.svg' alt='path' />
      <div className={styled.cardElement}>
        <img src='image/howToPlayAndWin/cards/top.png' alt='top' />
        <img src='image/howToPlayAndWin/cards/card6.png' alt='card' />
        <img src='image/howToPlayAndWin/cards/bottom.png' alt='bottom' />
      </div>
      <img
        className={styled.visiblePath}
        src='image/howToPlayAndWin/path.svg'
        alt='path'
      />
      <div className={styled.visible}>
        <img src='image/howToPlayAndWin/cards/top.png' alt='top' />
        <img src='image/howToPlayAndWin/cards/card6.png' alt='card' />
        <img src='image/howToPlayAndWin/cards/bottom.png' alt='bottom' />
      </div>
      <img
        className={styled.visiblePath}
        src='image/howToPlayAndWin/path.svg'
        alt='path'
      />
      <div className={styled.visible}>
        <img src='image/howToPlayAndWin/cards/top.png' alt='top' />
        <img src='image/howToPlayAndWin/cards/card6.png' alt='card' />
        <img src='image/howToPlayAndWin/cards/bottom.png' alt='bottom' />
      </div>
    </div>
  );
};

export { Cards };
