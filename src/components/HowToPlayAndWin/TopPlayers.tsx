import styled from './TopPlayers.module.scss';
import testimonia from '../../assets/howtoplayandwin/testimonia.png';
import topplayers from '../../assets/howtoplayandwin/top-players.png';
import testimoniamobile from '../../assets/howtoplayandwin/testimonia-mobile.png';

const TopPlayers = () => {
  return (
    <div className={styled.container}>
      <div className={styled.wrapper}>
        <div className={styled.textWrapper}>
          <h2 className={styled.titleTransparent}>Become One of The Top Players</h2>
          <h2 className={styled.titleWhite}>And Make Money</h2>
          <p className={styled.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique odio eu
            pharetra ultricies.
          </p>
          <img
            className={styled.testimonia}
            src={testimonia}
            alt='testimonia'
          />
        </div>
        <img
          className={styled.topPlayerImg}
          src={topplayers}
          alt='top-players'
        />
        <img
          className={styled.testimoniaMobile}
          src={testimoniamobile}
          alt='testimonia-mobile'
        />
      </div>
    </div>
  );
};

export { TopPlayers };
