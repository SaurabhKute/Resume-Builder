// import { Container, Paper } from "@mui/material";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import "./Resume.css";

export default function Resume() {
  const personalInfo = useSelector((state: RootState) => state.personalInfo.personalInfo);
  const socialLinks = useSelector((state: RootState) => state.personalInfo.socialLinks);
  const progLanguages = useSelector((state: RootState) => state.skillset.progLanguages)
  const frameWorks = useSelector((state: RootState) => state.skillset.frameworks)
  const tools = useSelector((state: RootState) => state.skillset.tools)
  const databases = useSelector((state: RootState) => state.skillset.databases)
  const honorsAndAwards = useSelector((state: RootState) => state.additional.awards)
  const certificates = useSelector((state: RootState) => state.certificate.certificate)
  const education = useSelector((state: RootState) => state.education.educationInfo);
  const experience = useSelector((state: RootState) => state.experience.experienceInfo);
  const project = useSelector((state: RootState) => state.project.projectInfo);

  const contactInfo = [personalInfo.email, personalInfo.phone, personalInfo.address].filter(Boolean);

  return (
    <>
      <div
        style=
        {{
          width: '850px',
          padding: '20px',
          backgroundColor: '#f3f7f7',
          display: 'flex',
        }}>

        <div
          style={{
            width: '700px',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: "45px",
            backgroundColor: '#fff',
            overflow: 'scroll'
          }}

          className="main"
        >
          <div className="sk" style={{ minWidth: '680px' }} >
            <div className="header">
              <h1 className="name">
                {personalInfo.firstName} {personalInfo.lastName}
              </h1>
              <span className="jobTitle">{personalInfo.jobTitle}</span>
              <p className="contact-info">
                {contactInfo.join(" | ")}
              </p>
              <div className="social-links">
                {socialLinks?.map((linkObj, index) => (
                  <span key={index}>
                    <a href={linkObj.link} target="_blank" rel="noopener noreferrer" style={{ color: 'black', fontWeight: 'normal' }}>{linkObj.linkType}</a>
                    {index < socialLinks.length - 1 && " | "}
                  </span>
                ))}
              </div>
            </div>
            {education.length > 0 && <hr className="divider" />}
            <div className="education-section">
              {education.length > 0 && <h2>Education</h2>}
              {education.map((edu) => (
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
                    {`${exp.startMonYear} - ${exp.endMonYear}`}</div>
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
                    {progLanguages.length > 0 && <h3>Programming Languages : </h3>}
                    {progLanguages?.map((lang, index) => (
                      <span key={index}>
                        {lang.language}
                        {index < progLanguages.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                  <div className="skill-group">
                    {frameWorks.length > 0 && <h3>Frameworks / Libraries : </h3>}
                    {frameWorks?.map((framework, index) => (
                      <span key={index}>
                        {framework.framework}
                        {index < frameWorks.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                  <div className="skill-group">
                    {tools.length > 0 && <h3>Tools / Platforms : </h3>}
                    {tools?.map((tool, index) => (
                      <span key={index}>
                        {tool.tool}
                        {index < tools.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                  <div className="skill-group">
                    {databases.length > 0 && <h3>Databases : </h3>}
                    {databases?.map((database, index) => (
                      <span key={index}>
                        {database.database}
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
                  <div className="" style={{ float: 'right' }}>{project.projectTechnologies}</div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="project">{project.projectName}</div>

                    <div className="designation">
                      {project.projectLink ? <span style={{ margin: '6px' }}>|</span> : ''}
                      <a href={project.projectLink} target="_blank" rel="noopener noreferrer" style={{ color: 'black', fontWeight: 'normal' }}>Link</a>
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
            {certificates.length > 0 &&
              <>
                <hr className="divider" />
                <div className="section">
                  <h2>Certifications</h2>
                  <ul>
                    {certificates.map((certificate, index) => (
                      <li key={index}>{certificate.certificate}</li>
                    ))}
                  </ul>
                </div>
              </>
            }
            {honorsAndAwards.length > 0 &&
              <>
                <hr className="divider" />
                <div className="honors-section">
                  <h2>Honors and Awards</h2>
                  <ul>
                    {honorsAndAwards.map((award, index) => (
                      <li key={index}>{award.award}</li>
                    ))}
                  </ul>
                </div>
              </>
            }
          </div>

        </div>

      </div>
    </>
  );
}
