import { configureStore } from '@reduxjs/toolkit';
import mainMenuSlice from './mainMenuSlice';
import mobileMenuSlice from './mobileMenuSlice';
import playerSlice from './playerSlice';
import battleSlice from './battleSlice';
import loginMenuModal from './loginModalSlice';
import isAuthSlice from './isAuthSlice';
import musicCategoriesSlice from './musicCategoriesSlice';

const store = configureStore({
  reducer: {
    mobileMenu: mobileMenuSlice,
    mainMenu: mainMenuSlice,
    player: playerSlice,
    modalLogin: loginMenuModal,
    battle: battleSlice,
    musicCategories: musicCategoriesSlice,
    isAuth: isAuthSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
