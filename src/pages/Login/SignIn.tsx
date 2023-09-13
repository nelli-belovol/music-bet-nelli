import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { NotificationT } from '../../components/ToastifyNot/NotificationToastify';
import { LogInSchema } from '../../utils/Validation';
import { AnimateBtnWhite } from '../../components/Buttons/AnimateBtnWhite/AnimateBtnWhite';
import { AnimateBtn } from '../../components/Buttons/AnimateBtn/AnimateBtn';
import { TextError } from './TextError';
import { Login } from './Login';
import { authAPI } from '../../api/api';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { closeLoginModalMenu, toggleLoginScene } from '../../store/loginModalSlice';
import { userLogIn } from '../../store/isAuthSlice';

import styled from './Login.module.scss';
import { useEffect } from 'react';

interface IInitial {
  email?: string;
  password?: string;
}

const initialValues = {
  email: '',
  password: '',
};

const onSubmit = (values: IInitial) => {};

const SignIn = () => {
  const [activeInput, setActiveInput] = useState(0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    switch (activeInput) {
      case 0:
        emailRef.current?.focus();
        break;
      case 1:
        passwordRef.current?.focus();
        break;
    }
  }, [activeInput]);

  function nextInput(errors: IInitial, values: IInitial) {
    if (activeInput === 0 && !errors.email && values.email) {
      setActiveInput((prev) => prev + 1);
    }
  }

  function navigateToCreateAccount() {
    dispatch(toggleLoginScene(null));
  }

  function logInData(values: IInitial) {
    authAPI
      .logIn(values.email, values.password)
      .then(() => {
        dispatch(userLogIn(null));
      })
      .then(() => {
        if (localStorage.getItem('isAuth')) {
          navigate('/explore');
        }
        dispatch(closeLoginModalMenu(null));
      })
      .catch((error) => {
        if (error.response) {
          toast.error('Wrong email or password, please try again');
        } else {
          toast.error('Something went wrong, please try again');
        }
      });
  }

  return (
    <>
      <NotificationT />
      <Login>
        <Formik
          initialValues={initialValues}
          validationSchema={LogInSchema}
          onSubmit={(values) => {
            onSubmit(values);
          }}>
          {({ errors, values, touched }) => (
            <Form>
              {errors.email && touched.email && activeInput === 0 ? (
                <TextError>{errors.email}</TextError>
              ) : null}
              <Field
                innerRef={emailRef}
                className={activeInput !== 0 ? styled.invisible : styled.inputData}
                type='text'
                id='email'
                name='email'
                placeholder='email'
              />

              {errors.password && touched.password && activeInput === 1 ? (
                <TextError>{errors.password}</TextError>
              ) : null}
              <Field
                innerRef={passwordRef}
                className={activeInput !== 1 ? styled.invisible : styled.inputData}
                type='password'
                id='password'
                name='password'
                placeholder='password'
              />

              <div className={styled.btn}>
                {activeInput <= 0 && (
                  <AnimateBtn
                    handleClick={() => nextInput(errors, values)}
                    type='button'
                    additionalStyles={{ width: "283px", height: "62px" }}
                    title='Continue'
                  />
                )}
                {activeInput === 1 && (
                  <AnimateBtn
                    handleClick={() => logInData(values)}
                    type='submit'
                    additionalStyles={{ width: "283px", height: "62px" }}
                    title='Send'
                  />
                )}
                <AnimateBtnWhite
                  handleClick={() => navigateToCreateAccount()}
                  type='button'
                  title='Create new Account'
                />
              </div>
            </Form>
          )}
        </Formik>
      </Login>
    </>
  );
};

export { SignIn };
