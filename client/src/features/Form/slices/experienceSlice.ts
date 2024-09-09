import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExperienceInfo {
  id: number;
  employer: string;
  jobTitle: string;
  startMonthYear: string;
  endMonthYear: string;
  location: string;
  description: string
}

interface FormState {
    experienceInfo: ExperienceInfo[];
}

const initialState: FormState = {
    experienceInfo: [],
};

const ExperienceInfoSlice = createSlice({
  name: "experienceInfo",
  initialState,
  reducers: {
    setExperienceInfo(state, action: PayloadAction<ExperienceInfo[]>) {
      state.experienceInfo = action.payload;
    },
    addExperienceEntry(state, action: PayloadAction<ExperienceInfo>) {
      state.experienceInfo.push(action.payload);
    },
    updateExperienceEntry(
      state,
      action: PayloadAction<{ id: number; updatedEntry: Partial<ExperienceInfo> }>
    ) {
      const { id, updatedEntry } = action.payload;
      const index = state.experienceInfo.findIndex((entry) => entry.id === id);
      if (index !== -1) {
        state.experienceInfo[index] = {
          ...state.experienceInfo[index],
          ...updatedEntry,
        };
      }
    },
    removeExperienceEntry(state, action: PayloadAction<number>) {
      state.experienceInfo = state.experienceInfo.filter(
        (entry) => entry.id !== action.payload
      );
    },
  },
});

export const {
  setExperienceInfo,
  addExperienceEntry,
  updateExperienceEntry,
  removeExperienceEntry,
} = ExperienceInfoSlice.actions;

export default ExperienceInfoSlice.reducer;
