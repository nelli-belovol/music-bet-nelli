import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type IsAuthSlice = {
  isAuth: boolean;
};

const initialState: IsAuthSlice = {
  isAuth: false,
};

const isAuthSlice = createSlice({
  name: 'isAuth',
  initialState,
  reducers: {
    userLogIn(state, action: PayloadAction<null>) {
      state.isAuth = true;
    },
    userLogOut(state, action: PayloadAction<null>) {
      state.isAuth = false;
    },
  },
});

export const { userLogIn, userLogOut } = isAuthSlice.actions;

export default isAuthSlice.reducer;
