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
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import {
  addEducationEntry,
  removeEducationEntry,
  updateEducationEntry,
} from "../../../features/Form/slices/educationSlice";
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';

interface EducationProps {
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

const Education: React.FC<EducationProps> = () => {
  const dispatch = useDispatch();
  const educationInfo = useSelector(
    (state: RootState) => state.education.educationInfo
  );

  const handleEducationInfoChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
    id: number
  ) => {
    const { name, value } = event.target;
    if (name) {
      dispatch(updateEducationEntry({ id, updatedEntry: { [name]: value } }));
    }
  };

  const handleAddEducation = () => {
    const newEducation = {
      id: Date.now(),
      institute: "",
      location: "",
      degreeType: "",
      fieldOfStudy: "",
      startMonthYear: "",
      gradMonthYear: "",
      score: "",
      marks: "",
    };
    dispatch(addEducationEntry(newEducation));
  };

  const handleDeleteEducation = (id: number) => {
    dispatch(removeEducationEntry(id));
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
            <SchoolOutlinedIcon
              sx={{ fontSize: "20px", mr: 1, fontWeight: "light" }}
            />
            <Typography sx={{ fontWeight: "light", fontSize: "16px", p: 0.6 }}>
              Education
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
            Education Details
          </Typography>

          {educationInfo.map((edu) => (
            <Accordion
              key={edu.id}
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
                    Institute Name
                  </Typography>
                  <DeleteOutlineOutlinedIcon
                    onClick={() => handleDeleteEducation(edu.id)}
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
                      id={`institute-${edu.id}`}
                      name="institute"
                      type="text"
                      label="Institute"
                      placeholder="XYZ University"
                      value={edu.institute}
                      onChange={(event) => handleEducationInfoChange(event, edu.id)}
                    />
                  </Grid>
                  <Grid item xs={6} mt={1}>
                    <TextField
                      id={`location-${edu.id}`}
                      name="location"
                      type="text"
                      label="Location"
                      placeholder="New Delhi, India"
                      value={edu.location}
                      onChange={(event) => handleEducationInfoChange(event, edu.id)}
                    />
                  </Grid>
                  <Grid item xs={6} mt={1}>
                    <TextField
                      id={`degreeType-${edu.id}`}
                      name="degreeType"
                      type="text"
                      label="Degree Type"
                      placeholder="Bachelors/Masters/Diploma"
                      value={edu.degreeType}
                      onChange={(event) => handleEducationInfoChange(event, edu.id)}
                    />
                  </Grid>
                  <Grid item xs={6} mt={1}>
                    <TextField
                      id={`fieldOfStudy-${edu.id}`}
                      name="fieldOfStudy"
                      type="text"
                      label="Field of Study"
                      placeholder="Computer Science / Electrical / Mechanical / Civil"
                      value={edu.fieldOfStudy}
                      onChange={(event) => handleEducationInfoChange(event, edu.id)}
                    />
                  </Grid>
                  <Grid item xs={6} mt={1}>
                    <TextField
                      id={`startMonthYear-${edu.id}`}
                      name="startMonthYear"
                      type="text"
                      label="Start Month / Year"
                      placeholder="July 2023"
                      value={edu.startMonthYear}
                      onChange={(event) => handleEducationInfoChange(event, edu.id)}
                    />
                  </Grid>
                  <Grid item xs={6} mt={1}>
                    <TextField
                      id={`gradMonthYear-${edu.id}`}
                      name="gradMonthYear"
                      type="text"
                      label="Grad Month / Year"
                      placeholder="July 2027"
                      value={edu.gradMonthYear}
                      onChange={(event) => handleEducationInfoChange(event, edu.id)}
                    />
                  </Grid>
                  <Grid item xs={6} mt={1}>
                    <FormControl fullWidth>
                      <InputLabel id={`score-${edu.id}`}>Scores In</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id={`score-${edu.id}`}
                        name="score"
                        value={edu.score}
                        label="Scores In"
                        placeholder="Select Marking Scheme"
                        onChange={(event: any) => handleEducationInfoChange(event, edu.id)}
                      >
                        <MenuItem value={"SGPA"}>SGPA</MenuItem>
                        <MenuItem value={"CGPA"}>CGPA</MenuItem>
                        <MenuItem value={"Percentage"}>Percentage</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} mt={1}>
                    <TextField
                      id={`marks-${edu.id}`}
                      name="marks"
                      type="text"
                      label="Marks"
                      placeholder="9.1/10"
                      value={edu.marks}
                      onChange={(event) => handleEducationInfoChange(event, edu.id)}
                    />
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
            onClick={handleAddEducation}
          >
            + Add Education
          </Button>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Education;
