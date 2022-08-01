import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] };

export const memoSlice = createSlice({
  name: "memo",
  initialState,
  reducers: {
    setMemo: (state, action) => {
      //状態に情報をセット(保存)しておく。
      state.value = action.payload;
    },
  },
});

export const { setMemo } = memoSlice.actions;
export default memoSlice.reducer;
