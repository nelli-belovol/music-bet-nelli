import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TopPlayers = {
    topPlayers: Array<Object> | null;
};

const initialState: TopPlayers = {
  topPlayers: [],
};

const topPlayersSlicer = createSlice({
  name: "topPlayers",
  initialState,
  reducers: {
    setTopPlayers(state, action: PayloadAction<Array<Object>>) {
      state.topPlayers = action.payload;
    },
  },
});

export const {
  setTopPlayers,
} = topPlayersSlicer.actions;

export default topPlayersSlicer.reducer;
