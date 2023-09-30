import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Pet } from "../types/APIResponsesTypes";

type adoptedPetState = {
  value: Pet | null;
};

const initialState: adoptedPetState = {
  value: null,
};

export const adoptedPetSlice = createSlice({
  name: "adoptedPet",
  initialState,
  reducers: {
    adopt: (state, action: PayloadAction<Pet>) => {
      state.value = action.payload;
    },
  },
});

export const { adopt } = adoptedPetSlice.actions;
export default adoptedPetSlice.reducer;
