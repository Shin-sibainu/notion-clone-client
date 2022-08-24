import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] };

export const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavoriteList: (state, action) => {
      //状態に情報をセット(保存)しておく。
      state.value = action.payload;
    },
  },
});

export const { setFavoriteList } = favoriteSlice.actions;
export default favoriteSlice.reducer;
