import { toast } from 'react-toastify';
import { Formik, Form, Field } from 'formik';

import { AnimateBtn } from '../../components/Buttons/AnimateBtn/AnimateBtn';
import { HeaderGeneral } from '../../components/HeaderGeneral/HeaderGeneral';
import { NotificationT } from '../../components/ToastifyNot/NotificationToastify';
import 'react-toastify/dist/ReactToastify.css';
import { contactAPI } from '../../api/api';
import * as validation from '../../utils/Validation';
import { TextError } from './TextError/TextError';

import styled from './Contacts.module.scss';
import { useMediaQuery } from 'react-responsive';

interface IValue {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const Contacts = () => {
  function sendMessage(value: IValue) {
    contactAPI
      .createContact(value.name, value.email, value.subject, value.message)
      .then((res) => {
        toast.success(res.success);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }

  const isMobile = useMediaQuery({
    query: '(max-width: 430px)',
  });
  const additionalStyles= isMobile ? {height: "45px", width: "255px"} : {};
  return (
    <>
      <HeaderGeneral title='Contacts' />
      <NotificationT />
      <div className={styled.container}>
        <div className={styled.boxContainer}>
          <div>
            <h1 className={styled.title}>We are here to help you</h1>
            <p className={styled.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu
              egestas elit. Pellentesque aliquet blandit ligula, vel vehicula tellus.
            </p>
            <div className={styled.inputs}>
              <Formik
                initialValues={initialValues}
                validationSchema={validation.ContactsSchema}
                onSubmit={(values) => {
                  sendMessage(values);
                }}>
                {({ errors, values, touched }) => (
                  <Form>
                    <div className={styled.groupInput}>
                      <div className={styled.position}>
                        {errors.name && touched.name ? (
                          <TextError>{errors.name}</TextError>
                        ) : null}
                        <Field
                          type='text'
                          id='name'
                          name='name'
                          placeholder='Your Name'
                          className={styled.inputField}
                        />
                      </div>
                      <div className={styled.position}>
                        {errors.email && touched.email ? (
                          <TextError>{errors.email}</TextError>
                        ) : null}
                        <Field
                          type='text'
                          id='email'
                          name='email'
                          placeholder='Your Email'
                          className={styled.inputField}
                        />
                      </div>

                    </div>

                    <div className={styled.groupInput} style={{ width: "100%"}}>
                     
                      <div className={styled.position} style={{ width: "100%"}}>
                        {errors.subject && touched.subject ? (
                          <TextError>{errors.subject}</TextError>
                        ) : null}
                        <Field
                          type='text'
                          id='subject'
                          name='subject'
                          placeholder='About'
                          className={styled.aboutInputField}
                        />
                      </div>
                    </div>

                    <div className={styled.textAreaWrapper}>
                      {errors.message && touched.message ? (
                        <TextError>{errors.message}</TextError>
                      ) : null}
                      <Field
                        as='textarea'
                        type='text'
                        id='message'
                        name='message'
                        placeholder='You message'
                        className={styled.textAreaField}
                      />
                    </div>

                    {/* <button type='submit'>click</button> */}
                    <div className={styled.btnWrapper}>
                      <AnimateBtn additionalStyles={additionalStyles} title='Send' type='submit' />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Contacts };
