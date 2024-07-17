import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, TextField, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import LaptopMacOutlinedIcon from '@mui/icons-material/LaptopMacOutlined';
import { addProjectEntry, removeProjectEntry, updateProjectEntry } from "../../../features/form/slices/projectSlice";




interface ProjectProps {
    expanded: boolean;
    onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  }
  
  const Project: React.FC<ProjectProps> = () => {

    const dispatch = useDispatch();
  const projectInfo = useSelector((state: RootState) => state.project.projectInfo);



  const handleProjetInfoChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
    id: number
  ) => {
    const { name, value } = event.target;
    if (name) {
      dispatch(updateProjectEntry({ id, updatedEntry: { [name]: value } }));
    }
  };


  const handleAddProject = () => {
    const newProject = {
      id: Date.now(),
      projectName: "",
      projectTechnologies: "",
      projectLink: "",
      projectDescription: "",
      location: "",
      description: "",
    };
    dispatch(addProjectEntry(newProject));
  };

  const handleDeleteProject = (id: number) => {
    dispatch(removeProjectEntry(id));
  };
  
    return (
      <>
       <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel7bh-content"
          id="panel7bh-header"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "60%",
              flexShrink: 0,
            }}
          >
            <LaptopMacOutlinedIcon
              sx={{ fontSize: "20px", mr: 1, fontWeight: "light" }}
            />
            <Typography sx={{ fontWeight: "light", fontSize: "16px", p: 0.6 }}>
             Projects
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
            Project Details
          </Typography>

          {projectInfo.map((project) => (
            <Accordion
              key={project.id}
              sx={{ mt: 2, backgroundColor: "#fff" }}
              elevation={0}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    gap: "90px",
                  }}
                >
                  <BlurOnIcon />
                  <Typography sx={{ fontWeight: "light" }}>
                    Project Name
                  </Typography>
                  <DeleteOutlineOutlinedIcon
                    onClick={() => handleDeleteProject(project.id)}
                  />
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  mt={1}
                >
                  <Grid item xs={12} mt={1}>
                    <TextField
                      id={`projectName-${project.id}`}
                      name="projectName"
                      type="text"
                      label="Project Name"
                      placeholder="E-Commerce"
                      fullWidth
                      value={project.projectName}
                      onChange={(event) =>
                        handleProjetInfoChange(event, project.id)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} mt={1}>
                    <TextField
                      id={`projectTechnologies-${project.id}`}
                      name="projectTechnologies"
                      type="text"
                      label="Project Technologies"
                      placeholder="JavaScript, Python, Flutter"
                      value={project.projectTechnologies}
                      fullWidth
                      onChange={(event) =>
                        handleProjetInfoChange(event, project.id)
                      }
                    />
                  </Grid>
             
                  <Grid item xs={12} mt={1}>
                    <TextField
                      id={`projectLink-${project.id}`}
                      name="projectLink"
                      type="text"
                      label="Project Link"
                      placeholder="https://github.com/topics/sample-project"
                      value={project.projectLink}
                      onChange={(event) =>
                        handleProjetInfoChange(event, project.id)
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6} mt={1}>
                    <TextField
                      id={`projectDescription-${project.id}`}
                      name="projectDescription"
                      label="Project Description"
                      placeholder="ProjectDescription"
                      value={project.projectDescription}
                      onChange={(event) =>
                        handleProjetInfoChange(event, project.id)
                      }
                      multiline
                      rows={4}
                      style={{ minHeight: '100px', minWidth: '372px' }}// You can adjust the number of rows as needed
                    />
                    {/* <Button variant="contained" style={{ marginTop: '10px' }}>
              Markdown Cheatsheet
            </Button> */}
            {/* <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <MarkdownCheatsheet />
            </Popover> */}
                  </Grid> 
           </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
          <Button
            size="medium"
            variant="outlined"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "80%",
              fontStyle: "none",
              borderColor: "black",
              color: "black",
              m: 3,
            }}
            onClick={handleAddProject}
          >
            + Add Project
          </Button>
        </AccordionDetails>
      </Accordion>
      </>
  
    )
  }
  export default Project;