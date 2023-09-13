import { useNavigate } from 'react-router-dom';

import { ReactComponent as Plus } from '../../assets/svg/plus.svg';
import { ReactComponent as Buy } from '../../assets/svg/buy.svg';

import styled from './ProfileNftButtons.module.scss';

interface IProps {
  handleClick?: () => void;
  title?: string;
}

const ProfileNftButtons: React.FC<IProps> = ({ handleClick, title }) => {
  const navigate = useNavigate();

  function redirect() {
    navigate('/buy-tkn');
  }

  return (
    <div className={styled.container}>
      <div onClick={handleClick} className={styled.btnWrapper}>
        <Plus className={styled.plus} />
        <p className={styled.text}>{title}</p>
      </div>
      {/* <div className={styled.btnWrapper} onClick={redirect}>
        <Buy />
        <p className={styled.text}>BUY NFT</p>
      </div> */}
    </div>
  );
};

export { ProfileNftButtons };
