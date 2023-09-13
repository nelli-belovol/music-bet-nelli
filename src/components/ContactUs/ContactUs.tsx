import { useEffect, useState } from 'react';
import { contactAPI, profileAPI } from '../../api/api';
import { ProfileLayout } from '../ProfileLayout/ProfileLayout';
import { toast } from 'react-toastify';

import styled from './ContactUs.module.scss';

const ContactUs = () => {
  const [message, setMessage] = useState<string>("");
  const [userData, setUserData] = useState<any>({});
  
  useEffect(() => {
    if (Object.keys(userData).length === 0) {
      profileAPI.getProfile().then((res) => {
        setUserData(res.data.customer);
      });
    }
  }, [userData]);

  const onSend = () => {
    const userEmail = userData.email ? userData.email : "notloggedin@music.bet"
    const name = userData.first_name ? `${userData.first_name} ${userData.last_name}` : "Not logged in user";

    contactAPI
      .createContact(name, userEmail, "Profile contact us", message)
      .then((res) => {
        toast.success(res.success);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <ProfileLayout>
      <div className={styled.container}>
        <div className={styled.messageWrapper}>
          <h1 className={styled.title}>We are here to help you</h1>
          <p className={styled.info}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu egestas elit.
            Pellentesque aliquet blandit ligula, vel vehicula tellus.
          </p>
        </div>
        <div className={styled.textAreaWrapper}>
          <textarea className={styled.textAreaMessage} placeholder='Your message' value={message} onChange={(e) => setMessage(e.target.value)}/>
          <button onClick={onSend} className={styled.btn}>
            <span>Send</span>
          </button>
        </div>
      </div>
    </ProfileLayout>
  );
};

export { ContactUs };
