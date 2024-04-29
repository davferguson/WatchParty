import { createSlice } from '@reduxjs/toolkit';

export const groupSlice = createSlice({
  name: 'group',
  initialState: {
    group: null,
  },
  reducers: {
    updateGroup: (state, action) => {
        state.group = action.payload;
    },
  },
});

export const { updateGroup } = groupSlice.actions;

export const selectGroup = (state) => state.group.group;

export default groupSlice.reducer;