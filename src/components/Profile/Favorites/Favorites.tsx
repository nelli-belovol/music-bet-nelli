import { ProfileLayout } from '../../ProfileLayout/ProfileLayout';

import styled from './Favorites.module.scss';
import { FavoritesCard } from './FavoritesCard';

const Favorites = () => {
  return (
    <ProfileLayout>
      <div className={styled.container}>
        <FavoritesCard />
        <FavoritesCard />
        <FavoritesCard />
        <FavoritesCard />
        <FavoritesCard />
      </div>
    </ProfileLayout>
  );
};

export { Favorites };
