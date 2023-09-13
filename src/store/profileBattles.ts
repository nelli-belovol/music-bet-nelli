import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type MusicCategoriesSlice = {
  categoires: MusicCategory[];
  selectedCategory: number | null;
  selectedCategoryName: String | null;
};

type MusicCategory = {
    category_id: number;
    id: number;
    name: string;
};

type SelectCategory = {
    name: string;
    id: number | null;
};

const initialState: MusicCategoriesSlice = {
  categoires: [],
  selectedCategory: null,
  selectedCategoryName: null,
};

const musicCategoriesSlice = createSlice({
  name: 'musicCategories',
  initialState,
  reducers: {
    loadMusicCategories(state, action: PayloadAction<MusicCategory[]>) {
        state.categoires = action.payload;
    },
    selectCategory(state, action: PayloadAction<SelectCategory>) {
        state.selectedCategory = action.payload.id;
        state.selectedCategoryName = action.payload.name;
    }
  },
});

export const { loadMusicCategories, selectCategory } = musicCategoriesSlice.actions;

export default musicCategoriesSlice.reducer;
