import styled from './Login.module.scss';

interface IProps {
  children: JSX.Element;
}

const Login: React.FC<IProps> = ({ children }) => {
  return (
    <div className={styled.container} style={{ overflow: "hidden"}}>
      <div className={styled.loginWrapper}>
        <img className={styled.logo} src='image/logo.svg' alt='logo' />
        <h3 className={styled.title}>Sign Up For MUSIC.BET</h3>
        <p className={styled.text}>Stream the music you love and win tokens</p>

        {children}
      </div>

      {/* decoration */}
      <div className={styled.info}>
        <div className={styled.absolutePosition}>
          <div className={styled.txtWrapper}>
            <img className={styled.icon} src='image/login/musical.svg' alt='music' />
            <p>Buy or register your NFT</p>
          </div>
          <div className={styled.txtWrapper}>
            <img className={styled.icon} src='image/login/playlist.svg' alt='play' />
            <p>Create playlist and get bonus</p>
          </div>
          <div className={styled.txtWrapper}>
            <img className={styled.icon} src='image/login/money-bag.svg' alt='wallet' />
            <p>Win TKNs by playing</p>
          </div>
          <div className={styled.txtWrapper}>
            <img className={styled.icon} src='image/login/star.svg' alt='star' />
            <p>… and much more!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Login };
