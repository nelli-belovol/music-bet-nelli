import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type MobileMenuSlice = {
  isOpen: boolean;
};

const initialState: MobileMenuSlice = {
  isOpen: false,
};

const mobileMenuSlice = createSlice({
  name: 'mobileMenu',
  initialState,
  reducers: {
    openMobileMenu(state, action: PayloadAction<null>) {
      state.isOpen = true;
    },
    closeMobileMenu(state, action: PayloadAction<null>) {
      state.isOpen = false;
    },
  },
});

export const { openMobileMenu, closeMobileMenu } = mobileMenuSlice.actions;

export default mobileMenuSlice.reducer;
