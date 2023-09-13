import { useNavigate } from 'react-router-dom';
import { AnimateBtn } from '../../Buttons/AnimateBtn/AnimateBtn';
import { TransparentBtn } from '../../Buttons/TransparentBtn/TransparentBtn';
import { WhiteBtn } from '../../Buttons/WhiteBtn/WhiteBtn';
import styled from './MainContent.module.scss';

interface IProps {
  scroll: () => void;
  isDesktopOrLaptop: any;
  isAuth: any;
  openModal: any;
}

const MainContent: React.FC<IProps> = ({ scroll, isDesktopOrLaptop, isAuth, openModal }) => {
  const navigate = useNavigate();

  function startToPlayNavigate() {
    navigate('/battle/all-battles?status=0&category_id=1&step=1');
  }

  function buyTokenNavigate() {
    navigate('/buy-nft');
  }

  return (
    <div className={styled.mainContent}>
      <div className={styled.wrapper}>
        <h1 className={styled.title}>Listen to trending song VOTE and WIN</h1>

        {(!isDesktopOrLaptop && !isAuth) ? (
            <div style={{ marginTop: "20px" }}>
              <WhiteBtn handleClick={() => openModal()} title='Sign Up Free' />
            </div>
            ) : null
        }

        <p className={styled.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique odio
          eu pharetra ultricies.
        </p>

        <div className={styled.btnBlock}>
          <AnimateBtn 
          additionalStyles={{height: "62px", width: "255px"}}
          handleClick={() => startToPlayNavigate()} title='Start To Play' />
          <TransparentBtn handleClick={() => buyTokenNavigate()} title='Buy NFT' additionalStyles={{height: "62px", width: "255px"}} />
        </div>
        <img
          onClick={scroll}
          className={styled.arrowDown}
          src='image/howToPlayAndWin/arrow-down.svg'
          alt='arrow'
        />
      </div>
    </div>
  );
};

export { MainContent };
