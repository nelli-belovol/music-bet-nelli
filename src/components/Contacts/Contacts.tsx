import { ProfileLayout } from '../ProfileLayout/ProfileLayout';

import styled from './Contacts.module.scss';

const Contacts = () => {
  return (
    <ProfileLayout>
      <div className={styled.container}>contacts</div>
    </ProfileLayout>
  );
};

export default Contacts;
