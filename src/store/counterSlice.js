import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
  isDisabled: false,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    clear: (state) => {
      state.count = 0;
    },
    toggleDisable: (state) => {
      state.isDisabled = !state.isDisabled;
    },
  },
});

export const { increment, clear, toggleDisable } = counterSlice.actions;
export default counterSlice.reducer; 