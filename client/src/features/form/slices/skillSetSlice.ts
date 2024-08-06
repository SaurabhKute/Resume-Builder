import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProgLanguages {
  language: string;
}
interface Frameworks {
  framework: string;
}
interface Tools {
  tool: string;
}
interface Databases {
  database: string;
}

interface FormState {
  progLanguages: ProgLanguages[];
  frameworks: Frameworks[];
  tools: Tools[];
  databases: Databases[];
}

const initialState: FormState = {
  progLanguages: [],
  frameworks: [],
  tools: [],
  databases: [],
};

const skillsetSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    setProgLanguages(state, action: PayloadAction<ProgLanguages[]>) {
      state.progLanguages = action.payload;
    },
    updateProgLanguages(
      state,
      action: PayloadAction<{ index: number; field: ProgLanguages }>
    ) {
      state.progLanguages[action.payload.index] = action.payload.field;
    },
    addProgLanguage(state, action: PayloadAction<ProgLanguages>) {
      state.progLanguages.push(action.payload);
    },
    removeProgLanguage(state, action: PayloadAction<string>) {
      state.progLanguages = state.progLanguages.filter(
        (language) => language.language !== action.payload
      );
    },
    setFramework(state, action: PayloadAction<Frameworks[]>) {
      state.frameworks = action.payload;
    },
    updateFramewrok(
      state,
      action: PayloadAction<{ index: number; field: Frameworks }>
    ) {
      state.frameworks[action.payload.index] = action.payload.field;
    },
    addFramework(state, action: PayloadAction<Frameworks>) {
      state.frameworks.push(action.payload);
    },
    removeFramework(state, action: PayloadAction<string>) {
      state.frameworks = state.frameworks.filter(
        (framework) => framework.framework !== action.payload
      );
    },
    addTool(state, action: PayloadAction<Tools>) {
      state.tools.push(action.payload);
    },
    removeTool(state, action: PayloadAction<string>) {
      state.tools = state.tools.filter((tool) => tool.tool !== action.payload);
    },
    addDatabase: (state, action: PayloadAction<Databases>) => {
      state.databases.push(action.payload);
    },
    removeDatabase: (state, action: PayloadAction<string>) => {
      state.databases = state.databases.filter(
        (database) => database.database !== action.payload
      );
    },
  },
});

export const {
  setProgLanguages,
  updateProgLanguages,
  addProgLanguage,
  removeProgLanguage,
  setFramework,
  addFramework,
  updateFramewrok,
  removeFramework,
  addTool,
  removeTool,
  addDatabase,
  removeDatabase,
} = skillsetSlice.actions;

export default skillsetSlice.reducer;
