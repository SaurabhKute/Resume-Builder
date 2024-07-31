import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import {
  addExperienceEntry,
  removeExperienceEntry,
  updateExperienceEntry,
} from "../../../features/Form/slices/experienceSlice";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import MarkdownCheatsheet from "../../MarkdownCheatsheet";
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';

interface ExperienceProps {
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

const Experience: React.FC<ExperienceProps> = () => {

  const dispatch = useDispatch();
  const experienceInfo = useSelector((state: RootState) => state.experience.experienceInfo);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'markdown-cheatsheet-popover' : undefined;

  const handleExperienceInfoChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
    id: number
  ) => {
    const { name, value } = event.target;
    if (name) {
      dispatch(updateExperienceEntry({ id, updatedEntry: { [name]: value } }));
    }
  };

  const handleAddExperience = () => {
    const newExperience = {
      id: Date.now(),
      employer: "",
      jobTitle: "",
      startMonYear: "",
      endMonYear: "",
      location: "",
      description: "",
    };
    dispatch(addExperienceEntry(newExperience));
  };

  const handleDeleteExperience = (id: number) => {
    dispatch(removeExperienceEntry(id));
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
            <WorkOutlineOutlinedIcon
              sx={{ fontSize: "20px", mr: 1, fontWeight: "light" }}
            />
            <Typography sx={{ fontWeight: "light", fontSize: "16px", p: 0.6 }}>
              Experience
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
            Experience Details
          </Typography>

          {experienceInfo.map((exp) => (
            <Accordion
              key={exp.id}
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
                    Company Name
                  </Typography>
                  <DeleteOutlineOutlinedIcon
                    onClick={() => handleDeleteExperience(exp.id)}
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
                  <Grid item xs={6} mt={1}>
                    <TextField
                      id={`employer-${exp.id}`}
                      name="employer"
                      type="text"
                      label="Employer"
                      placeholder="XYZ Company"
                      value={exp.employer}
                      onChange={(event) =>
                        handleExperienceInfoChange(event, exp.id)
                      }
                    />
                  </Grid>
                  <Grid item xs={6} mt={1}>
                    <TextField
                      id={`jobTitle-${exp.id}`}
                      name="jobTitle"
                      type="text"
                      label="Job Title"
                      placeholder="Full Stack Developer"
                      value={exp.jobTitle}
                      onChange={(event) =>
                        handleExperienceInfoChange(event, exp.id)
                      }
                    />
                  </Grid>
                  <Grid item xs={6} mt={1}>
                    <TextField
                      id={`startMonYear-${exp.id}`}
                      name="startMonYear"
                      type="text"
                      label="Start of Month / Year"
                      placeholder="July 2023"
                      value={exp.startMonYear}
                      onChange={(event) =>
                        handleExperienceInfoChange(event, exp.id)
                      }
                    />
                  </Grid>
                  <Grid item xs={6} mt={1}>
                    <TextField
                      id={`endMonYear-${exp.id}`}
                      name="endMonYear"
                      type="text"
                      label="End of Month / Year"
                      placeholder="July 2027"
                      value={exp.endMonYear}
                      onChange={(event) =>
                        handleExperienceInfoChange(event, exp.id)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} mt={1}>
                    <TextField
                      id={`location-${exp.id}`}
                      name="location"
                      type="text"
                      label="Location"
                      placeholder="Bengaluru, India"
                      value={exp.location}
                      onChange={(event) =>
                        handleExperienceInfoChange(event, exp.id)
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6} mt={1}>
                    <TextField
                      id={`description-${exp.id}`}
                      name="description"
                      label="Description"
                      placeholder="Description"
                      value={exp.description}
                      onChange={(event) => handleExperienceInfoChange(event, exp.id)}
                      multiline
                      rows={4}
                      style={{ minHeight: '100px', minWidth: '372px' }}// You can adjust the number of rows as needed
                    />
                    <Button variant="contained" onClick={handleClick} style={{ marginTop: '10px' }}>
              Markdown Cheatsheet
            </Button>
            <Popover
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
            </Popover>
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
            onClick={handleAddExperience}
          >
            + Add Experience
          </Button>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Experience;
