import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type MainMenuSlice = {
  isOpen: boolean;
  isVisible: boolean;
};

const initialState: MainMenuSlice = {
  isOpen: true,
  isVisible: true,
};

const mainMenuSlice = createSlice({
  name: 'mainMenu',
  initialState,
  reducers: {
    toggleOpenMenu(state, action: PayloadAction<null>) {
      state.isOpen = !state.isOpen;
    },
    toggleVisibleMenu(state, action: PayloadAction<string>) {
      if (action.payload.includes('how-to-play-and-win')) {
        state.isVisible = false;
      } else {
        state.isVisible = true;
      }
    },
    toggleVisibleMenuAll(state, action: PayloadAction<boolean>) {
      if (!action.payload) {
        state.isVisible = false;
      }
      if (action.payload) {
        state.isVisible = true;
      }
    },
  },
});

export const { toggleOpenMenu, toggleVisibleMenu, toggleVisibleMenuAll } = mainMenuSlice.actions;

export default mainMenuSlice.reducer;
