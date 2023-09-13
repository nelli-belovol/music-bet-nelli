import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LoginModalSlice = {
  isOpen: boolean;
  loginScene: string;
};

const initialState: LoginModalSlice = {
  isOpen: false,
  loginScene: 'register',
};

const loginMenuModal = createSlice({
  name: 'loginModal',
  initialState,
  reducers: {
    openLoginModalMenu(state, action: PayloadAction<null>) {
      state.isOpen = true;
    },
    closeLoginModalMenu(state, action: PayloadAction<null>) {
      state.isOpen = false;
    },
    toggleLoginScene(state, action: PayloadAction<null>) {
      if (state.loginScene === 'register') {
        state.loginScene = 'signIn';
      } else {
        state.loginScene = 'register';
      }
    },
  },
});

export const { openLoginModalMenu, closeLoginModalMenu, toggleLoginScene } =
  loginMenuModal.actions;

export default loginMenuModal.reducer;
