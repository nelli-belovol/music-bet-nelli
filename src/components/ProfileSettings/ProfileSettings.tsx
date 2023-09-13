import { useEffect, useState } from 'react';

import { profileAPI } from '../../api/api';
import { ProfileLayout } from '../ProfileLayout/ProfileLayout';

import styled from './ProfileSettings.module.scss';

const initialProfile = {
  avatar: '',
  username: '',
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  notification_battles: 1,
  notification_message: 1,
  gender: 1,
};

const ProfileSettings = () => {
  const [profileData, setProfileData] = useState<any>(initialProfile);

  useEffect(() => {
    function ccc() {
      profileAPI
        .getProfile()
        .then((res) => {
          return res.data.customer;
        })
        .then((res) => {
          setProfileData({
            ...profileData,
            first_name: res.first_name,
            last_name: res.last_name,
            username: res.username,
            email: res.email,
            gender: res.gender,
            phone: res.phone,
          });
        });
    }
    ccc();
  }, []);

  function editProfile() {
    profileAPI.editProfile(
      profileData.avatar,
      // profileData.username,
      profileData.first_name,
      profileData.last_name,
      // profileData.email,
      // profileData.phone,
      profileData.notification_battles,
      profileData.notification_message,
      profileData.gender,
    );
  }

  function selectFile(e: any) {
    if (e.target.files.length) {
      let photo = e.target.files[0];
      setProfileData({ ...profileData, avatar: photo });
    }
  }

  return (
    <ProfileLayout>
      <div className={styled.container}>
        <div className={styled.dataWrapper}>
          <h2 className={styled.headTitle}>Personal</h2>
          <div className={styled.data}>
            <hr className={styled.line} />

            <div>
              <label htmlFor='avatar'>Avatar</label>
              <input onChange={(e) => selectFile(e)} type='file' name='avatar' />
            </div>

            <div className={styled.inputWrapper}>
              <label htmlFor='first_name'>First name</label>
              <input
                className={styled.input}
                value={profileData.first_name}
                onChange={(e) => setProfileData({ ...profileData, first_name: e.target.value })}
                type='text'
                name='first_name'
              />
            </div>
            <div className={styled.inputWrapper}>
              <label htmlFor='last_name'>Last name</label>
              <input
                className={styled.input}
                value={profileData.last_name}
                onChange={(e) => setProfileData({ ...profileData, last_name: e.target.value })}
                type='text'
                name='last_name'
              />
            </div>

            <div>
              <label htmlFor='gender'>Gender</label>
              <select
                name='gender'
                value={profileData.gender}
                onChange={(e) =>
                  setProfileData({ ...profileData, gender: Number(e.target.value) })
                }>
                <option value={1}>Male</option>
                <option value={0}>Female</option>
              </select>
            </div>
          </div>

          <h2 className={styled.headTitle}>General</h2>
          <div className={styled.data}>
            <hr className={styled.line} />
            <div>
              <label htmlFor='language'>Language</label>
              <select name='language'>
                English (US)
                <option value=''>English (US)</option>
              </select>
            </div>
            <div>
              <label htmlFor='timezone'>Time zone</label>
              <select name='timezone'>
                (GMT-05:00) Eastern Time - New York
                <option value=''>(GMT-05:00) Eastern Time - New York</option>
              </select>
            </div>
          </div>

          <h2 className={styled.headTitle}>Notification</h2>
          <div className={styled.data}>
            <hr className={styled.line} />

            <article>
              <div className={styled.notificationWrapper}>
                <h4>Battle results</h4>
                <div className={styled.checkboxWrapper}>
                  {profileData.notification_battles === 0 ? <p>Disable</p> : <p>Enabled</p>}
                  <div
                    className={styled.checkbox}
                    onClick={() =>
                      setProfileData({
                        ...profileData,
                        notification_battles: profileData.notification_battles ? 0 : 1,
                      })
                    }>
                    <div
                      className={
                        profileData.notification_battles ? styled.active : styled.notActive
                      }></div>
                  </div>
                </div>
              </div>

              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit numquam placeat
                iusto, neque veritatis laborum ea, ab, perspiciatis alias id doloribus saepe quos
                iure ex corporis voluptatem libero necessitatibus exercitationem.
              </p>
            </article>

            <article>
              <div className={styled.notificationWrapper}>
                <h4>Notification</h4>
                <div className={styled.checkboxWrapper}>
                  {profileData.notification_message === 0 ? <p>Disable</p> : <p>Enabled</p>}
                  <div
                    className={styled.checkbox}
                    onClick={() =>
                      setProfileData({
                        ...profileData,
                        notification_message: profileData.notification_message ? 0 : 1,
                      })
                    }>
                    <div
                      className={
                        profileData.notification_message ? styled.active : styled.notActive
                      }></div>
                  </div>
                </div>
              </div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit numquam placeat
                iusto, neque veritatis laborum ea, ab, perspiciatis alias id doloribus saepe quos
                iure ex corporis voluptatem libero necessitatibus exercitationem.
              </p>
            </article>
          </div>
        </div>

        <div className={styled.btnWrapper}>
          <button className={styled.save} onClick={editProfile}>
            SAVE
          </button>
          <button className={styled.cancel}>CANCEL</button>
        </div>
      </div>
    </ProfileLayout>
  );
};

export { ProfileSettings };
