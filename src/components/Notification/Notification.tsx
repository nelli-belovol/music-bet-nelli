// import { GoogleLogin } from 'react-google-login';
import { authAPI, notificationsAPI } from '../../api/api';
import { GoogleLogin } from '@react-oauth/google';
import { ProfileLayout } from '../ProfileLayout/ProfileLayout';
import thropy from "../../assets/profile/trophy.svg";

import styled from './Notification.module.scss';
import { useEffect, useState } from 'react';

const Notification = () => {
  // console.log(1);
  // useEffect(() => {
  //   //@ts-ignore
  //   window.gapi.load('auth2', function () {
  //     //@ts-ignore
  //     window.gapi.auth2
  //       .init({
  //         client_id: '37485643144-tpnccvaefgdf50vguus0hlqp8rbi69jd.apps.googleusercontent.com',
  //         // client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  //       })
  //       .then(
  //         () => console.log('OK'),
  //         () => console.log('error'),
  //       );
  //   });
  // }, []);
  // const responseGoogle = (response: any) => {
  //   console.log(response);
  // };
  // function au() {
  //   authAPI.authWithGoogle().then((res) => {
  //     console.log(res);
  //   });
  // }
  // au();

  const [notifications, setNotifications] = useState<any>([]);

  useEffect(() => {
    notificationsAPI.getAllNotifycations().then(data => setNotifications(data));
  }, []);

  return (
    <ProfileLayout>
      <div className={styled.container}>
        {notifications && notifications.map((notification: any) => {
          return (
            <>
            <div className={styled.notificationContainer}>
              <div style={{ position: "relative" }}>
                <div className={styled.thropy}>
                </div>
                <img src={thropy}/>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "11px"}}>
                <div className={styled.notificationTitle}>Win in Battle !!!</div>
                <div>{notification.data}</div>
              </div>
              <div></div>
              <div className={styled.breaking}></div>
            </div>
            <div className={styled.breaking}></div>
            </>
          );
        })}

        {/* <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        /> */}
      </div>

      {/* <GoogleLogin
        clientId='37485643144-dbmqg5d6vmes6ag6gjr30g905i91881h.apps.googleusercontent.com'
        buttonText='Login'
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      /> */}
    </ProfileLayout>
  );
};

export { Notification };
