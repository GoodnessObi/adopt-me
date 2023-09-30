import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type searchState = {
  location: string;
  breed: string;
  animal: string;
};

type searchParamsState = {
  value: searchState;
};

const initialState: searchParamsState = {
  value: {
    location: "",
    breed: "",
    animal: "",
  },
};

const searchParamsSlice = createSlice({
  name: "searchParams",
  initialState,
  reducers: {
    all: (state, action: PayloadAction<searchState>) => {
      state.value = action.payload;
    },
  },
});

export const { all } = searchParamsSlice.actions;
export default searchParamsSlice.reducer;
