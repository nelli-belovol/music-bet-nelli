import { Link, useNavigate } from 'react-router-dom';

import { AnimateBtn } from '../../Buttons/AnimateBtn/AnimateBtn';
import shape from '../../../assets/shape.svg';

import styled from './Footer.module.scss';
import { useMediaQuery } from 'react-responsive';

const Footer = () => {
  const navigate = useNavigate();

  function startToPlayNavigate() {
    navigate('/battle/all-battles?status=0&category_id=1&step=1');
  }

  const isMobile = useMediaQuery({
    query: '(max-width: 430px)',
  });
  const additionalStyles= isMobile ? {height: "45px", width: "255px"} : {};
  return (
    <div>
      {/* top-content */}
      <div className={styled.btnWrapper}>
        <img className={styled.logo} src='image/howToPlayAndWin/logo-symbol.svg' alt='' />
        <div className={styled.btn}>
          <AnimateBtn additionalStyles={additionalStyles} handleClick={() => startToPlayNavigate()} title='Start To Play' />
        </div>
      </div>
      <hr className={styled.line} />
      {/* bottom-content */}
      <div className={styled.footerContainer}>
        <div className={styled.menuWrapper}>
          <div className={styled.linkWrapper}>
            <Link className={styled.link} to='/explore'>
              Explore
            </Link>
            <Link className={styled.link} to='/make-offer'>
              Make Offer
            </Link>
            <Link className={styled.link} to='/support'>
              Support
            </Link>
          </div>
          <div className={styled.linkWrapper}>
            <Link
              className={styled.link}
              to='/battle/all-battles?status=0&category_id=1&step=1'>
              NFT Battles
            </Link>
            <Link className={styled.link} to='/winners'>
              Winners
            </Link>
            <Link className={styled.link} to='/contacts'>
              Contacts
            </Link>
          </div>
          <div className={styled.linkWrapper}>
            <Link className={styled.link} to='/buy-nft'>
              Buy NFT
            </Link>
          </div>
        </div>
        <div className={styled.rightsWrapper}>
          <div className={styled.rights}>
            <div>
              <span className={styled.linkRight}>Terms & Conditions</span>
              <span className={styled.linkRight}>Privacy Policy</span>
            </div>
            <div>
              <span className={styled.linkRight}>
                © 2022 All rights reserved MUSIC.BET
              </span>
            </div>
          </div>
        </div>
        <div className={styled.iconsShape}>
          <img src={shape} alt='shape' />
          <img src={shape} alt='shape' />
          <img src={shape} alt='shape' />
          <img src={shape} alt='shape' />
        </div>
      </div>
    </div>
  );
};

export { Footer };
