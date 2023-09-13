import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { number } from "yup";

type PlayerType = {
  songId: number | null;
  volume: number;
  prevVolume: number;
  currentTime: string;
  totalTime: string;
  songUrl: string;
  songTitle: string;
  songSinger: string;
  songSubs: Array<Object> | null;
  songImage: string | null;
  genre: string | null;
};

const initialState: PlayerType = {
  songId: null,
  volume: 0.5,
  prevVolume: 0,
  currentTime: "0",
  totalTime: "0",
  songUrl: "",
  songImage: "",
  songTitle: "",
  songSinger: "",
  genre: "",
  songSubs: [],
};

type SetSongData = {
  id: number;
  url: string;
  image: string;
  title: string;
  singer: string;
  genre: string;
  lyrics: Array<Object>;
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    },
    setPrevVolume(state, action: PayloadAction<number>) {
      state.prevVolume = action.payload;
    },

    setCurrentTime(state, action: PayloadAction<string>) {
      state.currentTime = action.payload;
    },

    setTotalTime(state, action: PayloadAction<string>) {
      state.totalTime = action.payload;
    },
    setSongId(state, action: PayloadAction<number>) {
      state.songId = action.payload;
    },
    setSongUrl(state, action: PayloadAction<string>) {
      state.songUrl = action.payload;
    },
    setSongTitle(state, action: PayloadAction<string>) {
      state.songTitle = action.payload;
    },
    setSongSinger(state, action: PayloadAction<string>) {
      state.songSinger = action.payload;
    },
    setSongSubs(state, action: PayloadAction<Array<Object>>) {
      state.songSubs = action.payload;
    },
    setSongImage(state, action: PayloadAction<string>) {
      state.songImage = action.payload;
    },

    setSongGenre(state, action: PayloadAction<string>) {
      state.genre = action.payload;
    },
    setSongData(state, action: PayloadAction<SetSongData>) {
      state.songId = action.payload.id;
      state.songUrl = action.payload.url;
      state.songImage = action.payload.image;
      state.songTitle = action.payload.title;
      state.songSinger = action.payload.singer;
      state.genre = action.payload.genre;
      state.songSubs = action.payload.lyrics;
    },
  },
});

export const {
  setVolume,
  setPrevVolume,
  setCurrentTime,
  setTotalTime,
  setSongId,
  setSongUrl,
  setSongTitle,
  setSongSinger,
  setSongSubs,
  setSongImage,
  setSongData,
  setSongGenre,
} = playerSlice.actions;

export default playerSlice.reducer;
