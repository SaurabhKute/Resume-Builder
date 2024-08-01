import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Awards {
  award: string;
}

interface FormState {
  awards: Awards[];
}

const initialState: FormState = {
  awards: [],
};

const additionalSlice = createSlice({
  name: "additional",
  initialState,
  reducers: {
    setAwardField(state, action: PayloadAction<Awards[]>) {
      state.awards = action.payload;
    },
    updateAwardField(
      state,
      action: PayloadAction<{ index: number; field: Awards }>
    ) {
      state.awards[action.payload.index] = action.payload.field;
    },
    addAwardField(state) {
      state.awards.push({ award: "" });
    },
    removeAwardField(state, action: PayloadAction<number>) {
      state.awards.splice(action.payload, 1);
    },
  },
});

export const {
  addAwardField,
  setAwardField,
  updateAwardField,
  removeAwardField,
} = additionalSlice.actions;

export default additionalSlice.reducer;
