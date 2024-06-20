import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  jobTitle: string;
}

interface SocialLinks {
  link: string;
  linkType: string;
}
interface ProgLanguages {
  language:string;
}
interface Frameworks {
  framework :string;
}
interface Tools {
  tool :string;
}
interface Databases {
  database:string;
}

interface Awards {
  award:string;
}

interface Certificate {
  certificate:string;
}

interface FormState {
  personalInfo: PersonalInfo;
  socialLinks: SocialLinks[];
  progLanguages: ProgLanguages[];
  frameworks: Frameworks[];
  tools: Tools[];
  databases: Databases[];
  awards: Awards[];
  certificate:Certificate[];
}

const initialState: FormState = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    jobTitle: '',
  },
  socialLinks: [],
  progLanguages:[],
  frameworks:[],
  tools:[],
  databases:[],
  awards:[],
  certificate:[],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setPersonalInfo(state, action: PayloadAction<Partial<PersonalInfo>>) {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    setInputFields(state, action: PayloadAction<SocialLinks[]>) {
      state.socialLinks = action.payload;
    },
    updateInputField(state, action: PayloadAction<{ index: number; field: SocialLinks }>) {
      state.socialLinks[action.payload.index] = action.payload.field;
    },
    addInputField(state) {
      state.socialLinks.push({ link: '', linkType: '' });
    },
    removeInputField(state, action: PayloadAction<number>) {
      state.socialLinks.splice(action.payload, 1);
    },
    setProgLanguages(state, action: PayloadAction<ProgLanguages[]>) {
      state.progLanguages = action.payload;
    },
    updateProgLanguages(state, action: PayloadAction<{ index: number; field: ProgLanguages }>) {
      state.progLanguages[action.payload.index] = action.payload.field;
    },
    addProgLanguage(state, action: PayloadAction<ProgLanguages>) {
      state.progLanguages.push(action.payload);
    },
    removeProgLanguage(state, action: PayloadAction<string>) {
      state.progLanguages = state.progLanguages.filter(language => language.language !== action.payload);
    },
    setFramework(state, action: PayloadAction<Frameworks[]>) {
      state.frameworks = action.payload;
    },
    updateFramewrok(state, action: PayloadAction<{ index: number; field: Frameworks }>) {
      state.frameworks[action.payload.index] = action.payload.field;
    },
    addFramework(state, action: PayloadAction<Frameworks>) {
      state.frameworks.push(action.payload);
    },
    removeFramework(state, action: PayloadAction<string>) {
      state.frameworks = state.frameworks.filter(framework => framework.framework !== action.payload);
    },
    addTool(state, action: PayloadAction<Tools>) {
      state.tools.push(action.payload);
    },
    removeTool(state, action: PayloadAction<string>) {
      state.tools = state.tools.filter(tool => tool.tool !== action.payload);
    },
    addDatabase: (state, action: PayloadAction<Databases>) => {
      state.databases.push(action.payload);
    },
    removeDatabase: (state, action: PayloadAction<string>) => {
      state.databases = state.databases.filter(database => database.database !== action.payload);
    },

    setAwardField(state, action: PayloadAction<Awards[]>) {
      state.awards = action.payload;
    },
    updateAwardField(state, action: PayloadAction<{ index: number; field: Awards }>) {
      state.awards[action.payload.index] = action.payload.field;
    },
    addAwardField(state) {
      state.awards.push({ award: '' });
    },
    removeAwardField(state, action: PayloadAction<number>) {
      state.awards.splice(action.payload, 1);
     
    },

    setCertificateField(state, action: PayloadAction<Certificate[]>) {
      state.certificate = action.payload;
    },
    updateCertificateField(state, action: PayloadAction<{ index: number; field: Certificate }>) {
      state.certificate[action.payload.index] = action.payload.field;
    },
    addCertificateField(state) {
      state.certificate.push({ certificate: '' });
    },
    removeCertificateField(state, action: PayloadAction<number>) {
      state.certificate.splice(action.payload, 1);
     
    },
  },
});

export const { setPersonalInfo, setInputFields, updateInputField, addInputField, removeInputField, setProgLanguages, updateProgLanguages, addProgLanguage, removeProgLanguage, setFramework, addFramework, updateFramewrok, removeFramework, addTool, removeTool , addDatabase, removeDatabase, addAwardField, setAwardField, updateAwardField, removeAwardField,addCertificateField,updateCertificateField,removeCertificateField,setCertificateField} = formSlice.actions;

export default formSlice.reducer;
