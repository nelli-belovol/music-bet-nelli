import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type BattleCustomer = {
  track: {
    music_categories: {
      name: string;
    }[]
  };
};

type Battle = {
  id: number | undefined;
  step: number;
  winner?: any;
  date_start: string;
  battle_customers: BattleCustomer[],
  category: {
    name: string;
  };
};

type BattleType = {
  songId: number | null;
  isWin: boolean | null;
  timeLeft: string | null;
  step: number;
  battle: Battle | null;
  isLastChange: boolean;
  currentlyPlayingSongDuration: number;
};

const initialState: BattleType = {
  songId: null,
  step: 1,
  isWin: null,
  timeLeft: "30:00 MIN",
  isLastChange: false,
  battle: null,
  currentlyPlayingSongDuration: 0,
};

const battleSlice = createSlice({
  name: "battle",
  initialState,
  reducers: {
    setBattle(state, action: PayloadAction<Battle | null>){
      if (state.battle === null || (state.battle && state.battle.id !== action?.payload?.id)) {
        if (action.payload) {
          const dateStart = new Date(action.payload.date_start);
          const now = new Date();

          dateStart.setHours(dateStart.getHours() + Math.abs(dateStart.getTimezoneOffset() / 60));
          console.log('dateStart:', dateStart);
          console.log('now:', now);
          console.log('state.isWin:', state.isWin);
          if ((now < dateStart || state.isWin == true) ) { //&& state.battle !== null) {
            if (state.battle?.winner) {
              state.isWin = false;
            }
            console.log("WHAAAT");
            return;
          }

          if (action.payload.step !== state.step) {
            console.log("payload.step: ", action.payload.step);
            console.log("state.step: ", state.step);
        console.log("damn3");
            return;
          }
          state.isWin = false;
          state.battle = action.payload;
          state.isLastChange = false;
        } else {
        console.log("damn2");

        }
      } else {
        console.log("damn");
      }
    },
    setCurrentlyPlayingSongDuration(state, action: PayloadAction<number | undefined>) {
      if (!action.payload) {
        if (state.currentlyPlayingSongDuration - 1 === 0) {
          state.currentlyPlayingSongDuration = 0;
        } else {
          state.currentlyPlayingSongDuration = state.currentlyPlayingSongDuration - 1;
          if (state.currentlyPlayingSongDuration === -1) {
            state.currentlyPlayingSongDuration = 0;
          }
        }
      } else {
        state.currentlyPlayingSongDuration = action.payload;
      }
    },
    setSongId(state, action: PayloadAction<number>) {
      state.songId = action.payload;
    },
    setIsWin(state, action: PayloadAction<boolean>) {
      state.isWin = action.payload;
    },
    setBattleStep(state, action: PayloadAction<number>) {
      if (state.step !== action.payload) {
        state.isWin = null;
        state.isLastChange = false;
        state.battle = null;
        state.step = action.payload;
      }
    },
    setTimeLeft(state, action: PayloadAction<string>) {
      state.timeLeft = action.payload;
    },
    setLastChance(state, action: PayloadAction<boolean>) {
      state.isLastChange = action.payload;
    },
    resetTimeLeft(state) {
      state.timeLeft = initialState.timeLeft;
    },
    clearBattle(state) {
      if (state.battle && state.battle.winner !== null) {
        state.battle = null;
      }
    },
    clearBattleIfNotNull(state) {
      console.log("STATE.isWin: ", state.isWin);
      console.log("STATE.battle: ", state.battle);
      if (state.isWin === true) {
        state.isWin = false;
        state.battle = null;
      }
    },
    resetBattleData(state) {
      state.step = 1;
      state.isWin = null;
      state.isLastChange = false;
      state.battle = null;
    }
  },
});

export const { resetBattleData, clearBattle, clearBattleIfNotNull, setLastChance, setSongId, setIsWin, setTimeLeft, resetTimeLeft, setCurrentlyPlayingSongDuration, setBattle, setBattleStep } = battleSlice.actions;

export default battleSlice.reducer;
