import { Container, Paper } from "@mui/material";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import "./Resume.css";

export default function Resume() {
  const personalInfo = useSelector((state: RootState) => state.form.personalInfo);
  const socialLinks = useSelector((state: RootState) => state.form.socialLinks);
  const progLanguages = useSelector((state: RootState) => state.form.progLanguages)
  const frameWorks = useSelector((state: RootState) => state.form.frameworks)
  const tools = useSelector((state: RootState) => state.form.tools)
  const databases = useSelector((state: RootState) => state.form.databases)

  const contactInfo = [personalInfo.email, personalInfo.phone, personalInfo.address].filter(Boolean);

  return (
    <div
      style={{
        // border: '1px solid green', 
        display: "flex",
        width: "1000px",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "100px",
        backgroundColor: "#f3f7f7",
        height: '80%',

      }}
    >
      <Container
        className="custom-scrollbar"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: '90vh', // Ensure it takes full height
          overflowY: 'auto',

          marginTop: '2px',

        }}
      >
        <Paper
          elevation={3}
          sx={{
            bgcolor: 'white',
            width: '670px', // Fixed width
            height: '1200px', // Define height for scrollable area
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '200px'
            // overflowY: 'auto', // Enable vertical scroll

          }}
          className="main"
        >
          <div >
            <div className="header">
              <h1 className="name">
                {personalInfo.firstName} {personalInfo.lastName}
                {/* Saurabh Kute */}
              </h1>
              <p className="contact-info">
                {contactInfo.join(" | ")}
              </p>
              <div className="social-links">
                {/* <a href="#">LinkedIn</a> | <a href="#">GitHub</a> |{" "}
                <a href="#">Twitter</a> */}
                {/* {socialLinkInfo.join(" | ")} */}
                {socialLinks?.map((linkObj, index) => (
                  <span key={index}>
                    <a href={linkObj.link} target="_blank" rel="noopener noreferrer" style={{ color: 'black', fontWeight: 'normal' }}>{linkObj.linkType}</a>
                    {index < socialLinks.length - 1 && " | "}
                  </span>
                ))}
              </div>
            </div>
            <hr className="divider" />
            <div className="section">
              <h2>Education:</h2>
              <div className="date">2010 - 2014</div>
              <div className="location">University of Example, Cityville</div>
              <div className="content">
                <p>Bachelor of Science in Computer Science</p>
              </div>
              {/* Add more education entries as needed */}
            </div>
            <hr className="divider" />
            <div className="section">
              <h2>Experience</h2>
              <div className="date">2014 - Present</div>
              <div className="location">ABC Company, Cityville</div>
              <div className="content">
                <p>
                  <strong>Software Engineer</strong>
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  vitae ligula eu mi commodo interdum.
                </p>
                <p>
                  Sed auctor ligula et est fermentum, nec fermentum libero
                  fermentum. Phasellus nec justo id magna dapibus ultricies.
                </p>
              </div>
              {/* Add more experience entries as needed */}
            </div>
            <hr className="divider" />
            <div className="section">
      {(progLanguages.length > 0 || frameWorks.length > 0 || tools.length > 0 || databases.length > 0 ) && (
        <>
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
            <hr className="divider" />
            <div className="section">
              <h2>Projects</h2>
              <div className="project">
                <div className="date">2020 - 2021</div>
                <div className="content">
                  <p>
                    <strong>Project X</strong> -{" "}
                    <span className="location">Cityville</span>
                  </p>
                  <ul>
                    <li>
                      Description: Developed a web application for managing
                      tasks.
                    </li>
                    <li>Technology: HTML, CSS, JavaScript, React</li>
                  </ul>
                  <a href="#">Link to Project</a>
                </div>
              </div>
              {/* Add more project entries as needed */}
            </div>
            <hr className="divider" />
            <div className="section">
              <h2>Honors and Awards</h2>
              <ul>
                <li>Employee of the Month, ABC Company</li>
                <li>First Place in Hackathon, University of Example</li>
              </ul>
            </div>
          </div>
        </Paper>
      </Container>
    </div>
  );
}
