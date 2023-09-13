import { Search } from '../Search/Search';
import notification from '../../assets/notification.svg';
import styled from './HeaderGeneral.module.scss';
import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  title: string;
}

const HeaderGeneral: React.FC<IProps> = ({ title }) => {
  const isDesktop = useMediaQuery({
    query: '(min-width: 1201px)',
  });

  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  function onClickLoupe() {
    navigate(`/buy-nft?search=${searchValue}`)
  }

  return (
    <div className={styled.container}>
      <h1 className={styled.title}>{title}</h1>

      {isDesktop && (
        <div className={styled.controlWrapper}>
          {/* <Search placeholder='Artist, Songs, Lyrics, and More' onChange={(e: any) => {setSearchValue(e.target.value)}} value={searchValue} onClickLoupe={onClickLoupe} /> */}
          <img className={styled.notification} src={notification} alt='notification' style={{ cursor: "pointer" }} onClick={() => { navigate('/profile/notification')}}/>
          {/* <p className={styled.language}>EN</p> */}
        </div>
      )}
    </div>
  );
};

export { HeaderGeneral };
