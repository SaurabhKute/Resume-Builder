import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProjectInfo {
  id: number;
  projectName: string,
  projectTechnology: string,
  projectLink: string,
  projectDescription: string,
  location: string,
  description: string,
}

interface FormState {
    projectInfo: ProjectInfo[];
}

const initialState: FormState = {
    projectInfo: [],
};

const ProjectInfoSlice = createSlice({
  name: "projectInfo",
  initialState,
  reducers: {
    setProjectInfo(state, action: PayloadAction<ProjectInfo[]>) {
      state.projectInfo = action.payload;
    },
    addProjectEntry(state, action: PayloadAction<ProjectInfo>) {
      state.projectInfo.push(action.payload);
    },
    updateProjectEntry(
      state,
      action: PayloadAction<{ id: number; updatedEntry: Partial<ProjectInfo> }>
    ) {
      const { id, updatedEntry } = action.payload;
      const index = state.projectInfo.findIndex((entry) => entry.id === id);
      if (index !== -1) {
        state.projectInfo[index] = {
          ...state.projectInfo[index],
          ...updatedEntry,
        };
      }
    },
    removeProjectEntry(state, action: PayloadAction<number>) {
      state.projectInfo = state.projectInfo.filter(
        (entry) => entry.id !== action.payload
      );
    },
  },
});

export const {
  setProjectInfo,
  addProjectEntry,
  updateProjectEntry,
  removeProjectEntry,
} = ProjectInfoSlice.actions;

export default ProjectInfoSlice.reducer;
