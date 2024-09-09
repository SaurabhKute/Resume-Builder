import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createResume, getResumeById, updateResume, deleteResume, getAllResumeById } from '../actions/formAction';

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

interface ResumeResponse {
  _id: string,
  userId: string,
  templateId: string,
  resumeTitle: string,
  updatedAt: string
}

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

interface ExperienceInfo {
  id: number;
  employer: string;
  jobTitle: string;
  startMonthYear: string;
  endMonthYear: string;
  location: string;
  description: string;
}

interface ProjectInfo {
  id: number;
  projectName: string;
  projectTechnology: string;
  projectLink: string;
  projectDescription: string;
  location: string;
  description: string;
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

interface Certificate {
  certificate: string;
}

interface Awards {
  award: string;
}

interface FormState {
  resumeResponse: ResumeResponse;
  personalInfo: PersonalInfo;
  socialLinks: SocialLinks[];
  educationInfo: EducationInfo[];
  experienceInfo: ExperienceInfo[];
  projectInfo: ProjectInfo[];
  progLanguages: string[];
  frameworks: Frameworks[];
  tools: Tools[];
  databases: Databases[];
  certificationInfo: Certificate[];
  additionalInfo: Awards[];
  allResumes: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: FormState = {
  resumeResponse: {
    _id: '',
    userId: '',
    resumeTitle: '',
    updatedAt: '',
    templateId: '',
  },
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    jobTitle: "",
  },
  socialLinks: [],
  educationInfo: [],
  experienceInfo: [],
  projectInfo: [],
  progLanguages: [],
  frameworks: [],
  tools: [],
  databases: [],
  certificationInfo: [],
  additionalInfo: [],
  allResumes: [],
  status: 'idle',
  error: null,
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    //for logout
    clearState(state) {
      console.log("Resetting state:");  
      state.progLanguages = [];
      state.frameworks = [];
      state.tools = [];
      state.databases = [];
    },
    // Personal Info Reducers
    setPersonalInfo(state, action: PayloadAction<Partial<PersonalInfo>>) {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    setInputFields(state, action: PayloadAction<SocialLinks[]>) {
      state.socialLinks = action.payload;
    },
    addInputField(state) {
      // Ensure socialLinks is an array before pushing
      if (!state.socialLinks) {
        state.socialLinks = []; // Initialize if undefined
      }
      state.socialLinks.push({ link: "", linkType: "" });
    },
    removeInputField(state, action) {
      state.socialLinks.splice(action.payload, 1);
    },
    updateInputField(state, action) {
      const { index, field } = action.payload;
      state.socialLinks[index] = field;  // Update the specific index
    },

    // Education Info Reducers
    setEducationInfo(state, action: PayloadAction<EducationInfo[]>) {
      state.educationInfo = action.payload;
    },
    addEducationEntry(state, action: PayloadAction<EducationInfo>) {
      state.educationInfo.push(action.payload);
    },
    updateEducationEntry(state, action: PayloadAction<{ id: number; updatedEntry: Partial<EducationInfo> }>) {
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
      state.educationInfo = state.educationInfo?.filter((entry) => entry.id !== action.payload);
    },

    // Experience Info Reducers
    setExperienceInfo(state, action: PayloadAction<ExperienceInfo[]>) {
      state.experienceInfo = action.payload;
    },
    addExperienceEntry(state, action: PayloadAction<ExperienceInfo>) {
      state.experienceInfo.push(action.payload);
    },
    updateExperienceEntry(state, action: PayloadAction<{ id: number; updatedEntry: Partial<ExperienceInfo> }>) {
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
      state.experienceInfo = state.experienceInfo.filter((entry) => entry.id !== action.payload);
    },

    // Project Info Reducers
    setProjectInfo(state, action: PayloadAction<ProjectInfo[]>) {
      state.projectInfo = action.payload;
    },
    addProjectEntry(state, action: PayloadAction<ProjectInfo>) {
      state.projectInfo.push(action.payload);
    },
    updateProjectEntry(state, action: PayloadAction<{ id: number; updatedEntry: Partial<ProjectInfo> }>) {
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
      state.projectInfo = state.projectInfo.filter((entry) => entry.id !== action.payload);
    },

    // Skillset Reducers
    setProgLanguages(state, action: PayloadAction<string[]>) {
      state.progLanguages = action.payload;
    },
    updateProgLanguages(state, action: PayloadAction<{ index: number; field: string }>) {
      state.progLanguages[action.payload.index] = action.payload.field;
    },
    addProgLanguage(state, action: PayloadAction<any>) {

      if (!state.progLanguages) {
        state.progLanguages = []; // Initialize if undefined
      }
      // console.log(action.payload, "@action payload ")
      state.progLanguages?.push(action.payload.language);


    },
    removeProgLanguage(state, action: PayloadAction<string>) {
      state.progLanguages = state.progLanguages?.filter((language) => language !== action.payload);
    },
    setFramework(state, action: PayloadAction<any[]>) {
      state.frameworks = action.payload;
    },
    updateFramework(state, action: PayloadAction<{ index: number; field: any }>) {
      state.frameworks[action.payload.index] = action.payload.field;
    },
    addFramework(state, action: PayloadAction<any>) {

      if (!state.frameworks) {
        state.frameworks = []; // Initialize if undefined
      }
      state.frameworks?.push(action.payload.framework);

    },
    removeFramework(state, action: PayloadAction<any>) {
      state.frameworks = state.frameworks.filter((framework) => framework !== action.payload);
    },
    addTool(state, action: PayloadAction<any>) {

      if (!state.tools) {
        state.tools = []; // Initialize if undefined
      }

      state.tools?.push(action.payload.tool);
    },
    removeTool(state, action: PayloadAction<any>) {
      state.tools = state.tools.filter((tool) => tool !== action.payload);
    },
    addDatabase(state, action: PayloadAction<any>) {
      if (!state.databases) {
        state.databases = []; // Initialize if undefined
      }
      state.databases?.push(action.payload.database);
    },
    removeDatabase(state, action: PayloadAction<any>) {
      state.databases = state.databases.filter((database) => database !== action.payload);
    },

    // Certificate Reducers
    setCertificateField(state, action: PayloadAction<Certificate[]>) {
      state.certificationInfo = action.payload;
    },
    updateCertificateField(state, action: PayloadAction<{ index: number; field: Certificate }>) {
      state.certificationInfo[action.payload.index] = action.payload.field;
    },
    addCertificateField(state) {
      if (!state.certificationInfo) {
        state.certificationInfo = []; // Initialize if undefined
      }
      state.certificationInfo?.push({ certificate: "" });
    },
    removeCertificateField(state, action: PayloadAction<number>) {
      state.certificationInfo.splice(action.payload, 1);
    },

    // Additional (Awards) Reducers
    setAwardField(state, action: PayloadAction<Awards[]>) {
      state.additionalInfo = action.payload;
    },
    updateAwardField(state, action: PayloadAction<{ index: number; field: Awards }>) {
      state.additionalInfo[action.payload.index] = action.payload.field;
    },
    addAwardField(state) {
      if (!state.additionalInfo) {
        state.additionalInfo = []; // Initialize if undefined
      }
      state.additionalInfo?.push({ award: "" });
    },
    removeAwardField(state, action: PayloadAction<number>) {
      state.additionalInfo.splice(action.payload, 1);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createResume.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createResume.fulfilled, (state, action: PayloadAction<any>) => {
        // Safeguard: ensure state.allResumes is an array
        if (!Array.isArray(state.allResumes)) {
          state.allResumes = []; // Reset to an empty array if it's not an array
        }

        // Safeguard: ensure payload is a valid resume object
        if (action.payload && typeof action.payload === 'object') {
          state.allResumes = [...state.allResumes, action.payload];
        } else {
          console.error("Invalid payload:", action.payload);
        }
      })
      .addCase(createResume.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to create resume';
      })
      .addCase(getResumeById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getResumeById.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';

        const {
          personalInfo,
          educationInfo,
          experienceInfo,
          projectInfo,
          skillsetInfo,
          certificationInfo,
          additionalInfo,
        } = action.payload;


        // Update state with the response data
        state.resumeResponse = action.payload;
        state.personalInfo = personalInfo;
        state.socialLinks = personalInfo?.links;
        state.educationInfo = educationInfo;
        state.experienceInfo = experienceInfo;
        state.projectInfo = projectInfo;
        // state.additionalInfo = additionalInfo;

        if (skillsetInfo) {
          state.progLanguages = skillsetInfo.progLanguages || [];
          state.frameworks = skillsetInfo.frameworks || [];
          state.tools = skillsetInfo.tools || [];
          state.databases = skillsetInfo.databases || [];
        }

        if (certificationInfo) {
          state.certificationInfo = certificationInfo || [];
        }

        if (additionalInfo) {
          state.additionalInfo = additionalInfo || [];
        }
      })
      .addCase(getResumeById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || null;
      })
      .addCase(updateResume.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateResume.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Assuming action.payload contains the updated resume object
        const {
          personalInfo,
          socialLinks,
          educationInfo,
          experienceInfo,
          projectInfo,
          progLanguages,
          frameworks,
          tools,
          databases,
          certificationInfo,
          additionalInfo,
        } = action.payload;
        state.personalInfo = personalInfo;
        state.socialLinks = socialLinks;
        state.educationInfo = educationInfo;
        state.experienceInfo = experienceInfo;
        state.projectInfo = projectInfo;
        state.progLanguages = progLanguages;
        state.frameworks = frameworks;
        state.tools = tools;
        state.databases = databases;
        state.certificationInfo = certificationInfo;
        state.additionalInfo = additionalInfo;
      })
      .addCase(updateResume.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || null;
      })
      .addCase(deleteResume.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteResume.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Remove the deleted resume from the allResumes array
        state.allResumes = state.allResumes.filter((resume) => resume.id !== action.payload);
      })
      .addCase(deleteResume.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || null;
      })
      .addCase(getAllResumeById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllResumeById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allResumes = action.payload;
      })
      .addCase(getAllResumeById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || null;
      });
  }
});

export const {
  clearState,
  setPersonalInfo,
  setInputFields,
  updateInputField,
  addInputField,
  removeInputField,
  setEducationInfo,
  addEducationEntry,
  updateEducationEntry,
  removeEducationEntry,
  setExperienceInfo,
  addExperienceEntry,
  updateExperienceEntry,
  removeExperienceEntry,
  setProjectInfo,
  addProjectEntry,
  updateProjectEntry,
  removeProjectEntry,
  setProgLanguages,
  updateProgLanguages,
  addProgLanguage,
  removeProgLanguage,
  setFramework,
  updateFramework,
  addFramework,
  removeFramework,
  addTool,
  removeTool,
  addDatabase,
  removeDatabase,
  setCertificateField,
  updateCertificateField,
  addCertificateField,
  removeCertificateField,
  setAwardField,
  updateAwardField,
  addAwardField,
  removeAwardField,
} = resumeSlice.actions;

export default resumeSlice.reducer;
