import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Auth/slices/authSlice';
import resumeReducer from '../features/Form/slices/formSlice';
// import { 
//     personalInfoReducer, 
//     certificateReducer, 
//     skillsetReducer, 
//     additionalReducer, 
//     educationReducer, 
//     experienceReducer, 
//     projectReducer 
// } from '../features/Form/slices';


const store = configureStore({
  reducer: {
    auth: authReducer,
    resume: resumeReducer, 
    // personalInfo : personalInfoReducer,
    // certificate: certificateReducer,
    // skillset: skillsetReducer,
    // additional : additionalReducer,
    // education: educationReducer,
    // experience : experienceReducer,
    // project: projectReducer,

  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
