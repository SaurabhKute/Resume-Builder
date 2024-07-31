import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Auth/slices/authSlice';
import personalInfoReducer from '../features/Form/slices/personalInfoSlice';
import certificateReducer from '../features/Form/slices/certificationSlice';
import skillsetReducer from '../features/Form/slices/skillSetSlice';
import additionalReducer from '../features/Form/slices/additionalSlice';
import educationReducer from '../features/Form/slices/educationSlice';
import experienceReducer from '../features/Form/slices/experienceSlice';
import projectReducer from '../features/Form/slices/projectSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    personalInfo : personalInfoReducer,
    certificate: certificateReducer,
    skillset: skillsetReducer,
    additional : additionalReducer,
    education: educationReducer,
    experience : experienceReducer,
    project: projectReducer,

  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
