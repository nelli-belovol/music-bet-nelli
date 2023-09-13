import cross from '../../../assets/svg/mobile-icons/Path.svg';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { closeLoginModalMenu } from '../../../store/loginModalSlice';
import { Registration } from '../Registration';
import { SignIn } from '../SignIn';
import { ReactComponent as Cross } from '../../../assets/svg/mobile-icons/Path.svg';
import { ReactComponent as CrossMobile } from '../../../assets/svg/mobile-icons/Pathtwo.svg';

import styled from './LoginModal.module.scss';
import { useMediaQuery } from 'react-responsive';

const LoginModal = () => {
  const dispatch = useAppDispatch();
  const loginScene = useAppSelector((state) => state.modalLogin.loginScene);

  const isMobile = useMediaQuery({
    query: '(max-width: 430px)',
  });
  
  function closeMobileMenu() {
    dispatch(closeLoginModalMenu(null));
  }

  return (
    <div className={styled.container}>
      {!isMobile &&
        <Cross className={styled.cross} onClick={() => closeMobileMenu()}  />
      }
      {isMobile &&
        <CrossMobile className={styled.cross} onClick={() => closeMobileMenu()}  />
      }
      {loginScene === 'register' && <Registration />}
      {loginScene === 'signIn' && <SignIn />}
    </div>
  );
};

export { LoginModal };
