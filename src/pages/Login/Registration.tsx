import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { NotificationT } from '../../components/ToastifyNot/NotificationToastify';
import { AnimateBtnWhite } from '../../components/Buttons/AnimateBtnWhite/AnimateBtnWhite';
import { AnimateBtn } from '../../components/Buttons/AnimateBtn/AnimateBtn';
import { SignUpSchema } from '../../utils/Validation';
import { authAPI } from '../../api/api';
import { TextError } from './TextError';
import { Login } from './Login';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { closeLoginModalMenu, toggleLoginScene } from '../../store/loginModalSlice';
import { userLogIn } from '../../store/isAuthSlice';

import styled from './Login.module.scss';

interface IInitial {
  username?: string;
  email?: string;
  password?: string;
  c_password?: string;
  phone?: string;
}

const initialValues = {
  username: '',
  email: '',
  password: '',
  c_password: '',
  // phone: '',
};

const Registration = () => {
  const [activeInput, setActiveInput] = useState(0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const c_passwordRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    switch (activeInput) {
      case 0:
        usernameRef.current?.focus();
        break;
      case 1:
        emailRef.current?.focus();
        break;
      case 2:
        passwordRef.current?.focus();
        break;
      case 3:
        c_passwordRef.current?.focus();
        break;
      case 4:
        phoneRef.current?.focus();
        break;
    }
  }, [activeInput]);

  function sendDataReg(values: IInitial) {
    authAPI
      .authMe(
        values.username,
        values.email,
        values.password,
        values.c_password,
        values.phone,
      )
      .then((res) => {
        const token = res.data.customer.token;
        localStorage.setItem('token', token);
        dispatch(userLogIn(null));
        navigate('/explore');
        dispatch(closeLoginModalMenu(null));
      })
      .catch((error) => {
        if (error.response.data.errors.username) {
          toast.error(error.response.data.errors.username[0]);
        } else if (error.response.data.errors.email) {
          toast.error(error.response.data.errors.email[0]);
        } else if (error.response.data.errors.phone) {
          toast.error(error.response.data.errors.phone[0]);
        } else {
          toast.error('Something went wrong, please try again');
        }
      });
  }

  function navigateToSignIn() {
    dispatch(toggleLoginScene(null));
  }

  function nextInput(errors: IInitial, values: IInitial) {
    if (activeInput === 0 && !errors.username && values.username) {
      setActiveInput((prev) => prev + 1);
    }
    if (activeInput === 1 && !errors.email && values.email) {
      setActiveInput((prev) => prev + 1);
    }
    if (activeInput === 2 && !errors.password && values.password) {
      setActiveInput((prev) => prev + 1);
    }
    if (activeInput === 3 && !errors.c_password && values.c_password) {
      setActiveInput((prev) => prev + 1);
    }
  }

  return (
    <>
      <NotificationT />
      <Login>
        <Formik
          initialValues={initialValues}
          validationSchema={SignUpSchema}
          onSubmit={(values) => {}}>
          {({ errors, values, touched }) => { console.log("values: ", values); return (
            <Form>
              {errors.username && touched.username && activeInput === 0 ? (
                <TextError>{errors.username}</TextError>
              ) : null}
              <Field
                ref={usernameRef}
                className={activeInput !== 0 ? styled.invisible : styled.inputData}
                type='text'
                id='username'
                name='username'
                placeholder='username'
                value={values.username}
              />

              {errors.email && touched.email && activeInput === 1 ? (
                <TextError>{errors.email}</TextError>
              ) : null}
              <Field
                ref={emailRef}
                className={activeInput !== 1 ? styled.invisible : styled.inputData}
                type='text'
                id='email'
                name='email'
                placeholder='email'
              />
              {errors.password && touched.password && activeInput === 2 ? (
                <TextError>{errors.password}</TextError>
              ) : null}

              <Field
                ref={passwordRef}
                className={activeInput !== 2 ? styled.invisible : styled.inputData}
                type='password'
                id='password'
                name='password'
                placeholder='password'
              />
              {errors.c_password && touched.c_password && activeInput === 3 ? (
                <TextError>{errors.c_password}</TextError>
              ) : null}

              <Field
                ref={c_passwordRef}
                className={activeInput !== 3 ? styled.invisible : styled.inputData}
                type='password'
                id='c_password'
                name='c_password'
                placeholder='confirm password'
              />
              <div className={styled.btn}>
                {activeInput <= 2 && (
                  <AnimateBtn
                    additionalStyles={{height: "62px", width: "283px"}}
                    handleClick={() => nextInput(errors, values)}
                    type='button'
                    title='Continue'
                  />
                )}
                {activeInput === 3 && (
                  <AnimateBtn
                    additionalStyles={{height: "62px", width: "283px"}}
                    handleClick={() => sendDataReg(values)}
                    type='submit'
                    title='Send'
                  />
                )}
                <AnimateBtnWhite
                  notAnimated={true}
                  handleClick={() => navigateToSignIn()}
                  type='button'
                  title='Have an Account? Sign in'
                />
              </div>
            </Form>
          )}}
        </Formik>
      </Login>
    </>
  );
};

export { Registration };
