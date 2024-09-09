// Define interfaces for nested objects and arrays
export interface Link {
    link: string;
    linkType: string;
}

export interface PersonalInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    jobTitle: string;
    links: Link[];
}

export interface EducationInfo {
    institute: string;
    location: string;
    degreeType: string;
    fieldOfStudy: string;
    startMonthYear: string;
    gradMonthYear: string;
    score: string;
    marks: string;
}

export interface ExperienceInfo {
    employer: string;
    jobTitle: string;
    startMonthYear: string;
    endMonthYear: string;
    location: string;
    description: string;
}

export interface SkillsetInfo {
    progLanguages: string[];
    frameworks: string[];
    tools: string[];
    databases: string[];
}

export interface ProjectInfo {
    projectName: string;
    projectTechnology: string;
    projectLink: string;
    projectDescription: string;
    location: string;
    description: string;
}

export interface CertificationInfo {
    certificates: string[];
}

export interface AdditionalInfo {
    awards: string[];
}

// Define the main Resume interface
export interface Resume {
    userId: string;
    templateId: number;
    resumeTitle: string;
    personalInfo?: PersonalInfo;
    educationInfo?: EducationInfo[];
    experienceInfo?: ExperienceInfo[];
    skillsetInfo?: SkillsetInfo;
    projectInfo?: ProjectInfo[];
    certificationInfo?: CertificationInfo;
    additionalInfo?: AdditionalInfo;
}

// Define the main API response interface
export interface ResumeResponse {
    resumeId: string;
    resume: Resume;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    allResume:[string],
}
