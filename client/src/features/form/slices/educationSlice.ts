import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EducationInfo {
  id: number;
  institute: string;
  location: string;
  degreeType: string;
  fieldOfStudy: string;
  startMonthYear: string;
  gradMonthYear: string;
  score: string;
  marks: string;
}

interface FormState {
  educationInfo: EducationInfo[];
}

const initialState: FormState = {
  educationInfo: [],
};

const educationInfoSlice = createSlice({
  name: "educationInfo",
  initialState,
  reducers: {
    setEducationInfo(state, action: PayloadAction<EducationInfo[]>) {
      state.educationInfo = action.payload;
    },
    addEducationEntry(state, action: PayloadAction<EducationInfo>) {
      state.educationInfo.push(action.payload);
    },
    updateEducationEntry(
      state,
      action: PayloadAction<{ id: number; updatedEntry: Partial<EducationInfo> }>
    ) {
      const { id, updatedEntry } = action.payload;
      const index = state.educationInfo.findIndex((entry) => entry.id === id);
      if (index !== -1) {
        state.educationInfo[index] = {
          ...state.educationInfo[index],
          ...updatedEntry,
        };
      }
    },
    removeEducationEntry(state, action: PayloadAction<number>) {
      state.educationInfo = state.educationInfo.filter(
        (entry) => entry.id !== action.payload
      );
    },
  },
});

export const {
  setEducationInfo,
  addEducationEntry,
  updateEducationEntry,
  removeEducationEntry,
} = educationInfoSlice.actions;

export default educationInfoSlice.reducer;
