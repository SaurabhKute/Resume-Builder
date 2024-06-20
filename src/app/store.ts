import { configureStore } from '@reduxjs/toolkit';
import personalInfoReducer from '../features/form/slices/personalInfoSlice';
import certificateReducer from '../features/form/slices/certificationSlice';
import skillsetReducer from '../features/form/slices/skillSetSlice';
import additionalReducer from '../features/form/slices/additionalSlice';

const store = configureStore({
  reducer: {
    personalInfo : personalInfoReducer,
    certificate: certificateReducer,
    skillset: skillsetReducer,
    additional : additionalReducer

  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
