// import { Container, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import "./Template2.css";

export default function Template1() {

  const personalInfo = useSelector((state: RootState) => state.resume.personalInfo || {});
  const socialLinks = useSelector((state: RootState) => state.resume.socialLinks || []);
  const progLanguages = useSelector((state: RootState) => state.resume.progLanguages || []);
  const frameWorks = useSelector((state: RootState) => state.resume.frameworks || []);
  const tools = useSelector((state: RootState) => state.resume.tools || []);
  const databases = useSelector((state: RootState) => state.resume.databases || []);
  const additionalInfo = useSelector((state: RootState) => state.resume.additionalInfo || []);
  const certificationInfo = useSelector((state: RootState) => state.resume.certificationInfo || []);
  const educationInfo = useSelector((state: RootState) => state.resume.educationInfo || []);
  const experience = useSelector((state: RootState) => state.resume.experienceInfo || []);
  const project = useSelector((state: RootState) => state.resume.projectInfo || []);

  const contactInfo = [personalInfo.email, personalInfo.phone, personalInfo.address].filter(Boolean);

  // console.log(progLanguages,frameWorks,tools,databases,'!@#');

  return (
    <>
      <div
        className="container custom-scrollbar">

        <div
          className="main "
        >
          <div style={{ minWidth: '680px' }} >
            <div className="header">
              <h1 className="name">
                {personalInfo?.firstName} {personalInfo?.lastName}
              </h1>
              <span className="jobTitle">{personalInfo?.jobTitle}</span>
              <p className="contact-info">
                {contactInfo.join(" | ")}
              </p>
              <div className="social-links">
                {socialLinks?.map((linkObj, index) => (
                  <span key={index}>
                    <a href={linkObj.link} target="_blank" rel="noopener noreferrer" style={{ color: 'black', fontWeight: 'normal' }}>{linkObj?.linkType}</a>
                    {index < socialLinks?.length - 1 && " | "}
                  </span>
                ))}
              </div>
            </div>
            {educationInfo.length > 0 && <hr className="divider" />}
            <div className="education-section">
              {educationInfo?.length > 0 && <h2>Education</h2>}
              {educationInfo?.map((edu) => (
                <>
                  <div className="location" key={edu.id}>{edu.location}</div>
                  <div className="institute">{edu.institute}</div>

                  <div className="date">{edu.startMonthYear ? `${edu.startMonthYear} - ${edu.gradMonthYear}` : ''}</div>
                  <div className="content">

                    <p>{edu.degreeType ? `${edu.degreeType} - ${edu.fieldOfStudy}` : ''}</p>
                  </div>
                  <div className="score">

                    <p>{edu.score ? `${edu.score} - ${edu.marks}` : ''}</p>
                  </div>
                </>
              ))}

            </div>


            {experience.length > 0 && <hr className="divider" />}
            <div className="experience-section">
              {experience.length > 0 && <h2>Experience</h2>}
              {experience.map((exp) => (
                <>
                  <div className="date" key={exp.id}>
                    {exp.location ? <span className="m-3" style={{ margin: '4px' }}>|</span> : ''}
                    {`${exp.startMonthYear} - ${exp.endMonthYear}`}</div>
                  <div className="location">{exp.location}</div>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="company">{exp.employer}</div>
                    <div className="designation">
                      {exp.jobTitle ? <span style={{ margin: '6px' }}>|</span> : ''}
                      {exp.jobTitle}
                    </div>
                  </div>
                  <div className="description">
                    <ul>
                      {exp.description.split('\n').map((desc, index) => (
                        desc.startsWith('*') && <li key={index}>{desc.slice(1).trim()}</li>
                      ))}
                    </ul>
                  </div>
                </>
              ))}



            </div>

            <div className="progLanguages-section">
              {(progLanguages.length > 0 || frameWorks.length > 0 || tools.length > 0 || databases.length > 0) && (
                <>
                  <hr className="divider" />
                  <h2>Skills</h2>
                  <div className="skill-group">
                    {progLanguages?.length > 0 && <h3>Programming Languages : </h3>}
                    {progLanguages?.map((lang: any, index) => (
                      <span key={index}>
                        {lang}
                        {index < progLanguages.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                  <div className="skill-group">
                    {frameWorks.length > 0 && <h3>Frameworks / Libraries : </h3>}
                    {frameWorks?.map((framework: any, index) => (
                      <span key={index}>
                        {framework}
                        {index < frameWorks.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                  <div className="skill-group">
                    {tools.length > 0 && <h3>Tools / Platforms : </h3>}
                    {tools?.map((tool: any, index) => (
                      <span key={index}>
                        {tool}
                        {index < tools.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                  <div className="skill-group">
                    {databases.length > 0 && <h3>Databases : </h3>}
                    {databases?.map((database: any, index) => (
                      <span key={index}>
                        {database}
                        {index < databases.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>


            {project.length > 0 && <hr className="divider" />}
            <div className="project-section">
              {project.length > 0 && <h2>Projects / Open-Source</h2>}
              {project.map((project) => (
                <>
                  <div className="" style={{ float: 'right' }}>{project.projectTechnology}</div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="project">{project.projectName}</div>

                    <div className="designation">
                      {project.projectLink ? <span style={{ margin: '6px' }}>|</span> : ''}
                    {project.projectLink ? <a href={project.projectLink} target="_blank" rel="noopener noreferrer" style={{ color: 'black', fontWeight: 'normal' }}>Link</a> : ''}  
                    </div>

                  </div>

                  <div className="description">
                    <ul>
                      {project.projectDescription.split('\n').map((desc, index) => (
                        desc.startsWith('*') && <li key={index}>{desc.slice(1).trim()}</li>
                      ))}
                    </ul>
                  </div>
                </>
              ))}


            </div>
            {certificationInfo.length > 0 &&
              <>
                <hr className="divider" />
                <div className="certification-section">
                  <h2>Certifications</h2>
                  <div className="description">
                    <ul>
                      {certificationInfo.map((certificate: any, index) => (
                        <li key={index}>{certificate.certificate}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            }
            {additionalInfo.length > 0 &&
              <>
                <hr className="divider" />
                <div className="honors-section">
                  <h2>Honors and Awards</h2>
                  <div className="description">
                    <ul>
                      {additionalInfo.map((award: any, index) => (
                        <li key={index}>{award.award}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            }
          </div>

        </div>

      </div>
    </>
  );
}
