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

interface FormState {
  personalInfo: PersonalInfo;
  socialLinks: SocialLinks[];
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
  },
});

export const { setPersonalInfo, setInputFields, updateInputField, addInputField, removeInputField } = formSlice.actions;

export default formSlice.reducer;
