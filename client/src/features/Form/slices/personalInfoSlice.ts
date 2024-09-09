// // personalInfoSlice.ts
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { createResume, getResumeById, updateResume, deleteResume, getAllResumeById } from '../actions/formAction';

// interface PersonalInfo {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   address: string;
//   jobTitle: string;
// }

// interface SocialLinks {
//   link: string;
//   linkType: string;
// }

// interface FormState {
//   personalInfo: PersonalInfo;
//   socialLinks: SocialLinks[];
//   allResumes:[],
//   status: 'idle' | 'loading' | 'succeeded' | 'failed';
//   error: string | null;
// }

// const initialState: FormState = {
//   personalInfo: {
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     address: "",
//     jobTitle: "",
//   },
//   socialLinks: [],
//   allResumes:[],
//   status: 'idle',
//   error: null,
// };

// const personalInfoSlice = createSlice({
//   name: "personalInfo",
//   initialState,
//   reducers: {
//     setPersonalInfo(state, action: PayloadAction<Partial<PersonalInfo>>) {
//       state.personalInfo = { ...state.personalInfo, ...action.payload };
//     },
//     setInputFields(state, action: PayloadAction<SocialLinks[]>) {
//       state.socialLinks = action.payload;
//     },
//     updateInputField(
//       state,
//       action: PayloadAction<{ index: number; field: SocialLinks }>
//     ) {
//       state.socialLinks[action.payload.index] = action.payload.field;
//     },
//     addInputField(state) {
//       state.socialLinks.push({ link: "", linkType: "" });
//     },
//     removeInputField(state, action: PayloadAction<number>) {
//       state.socialLinks.splice(action.payload, 1);
//     },
//   },

// });

// export const {
//   setPersonalInfo,
//   addInputField,
//   removeInputField,
//   setInputFields,
//   updateInputField,
// } = personalInfoSlice.actions;

// export default personalInfoSlice.reducer;
