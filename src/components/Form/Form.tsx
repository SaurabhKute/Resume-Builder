import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import LaptopOutlinedIcon from "@mui/icons-material/LaptopOutlined";
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import { SOCIAL_LINKS } from "../../utils/Constants";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

interface InputField {
  link: string;
  linkType: string;
}

const Form: React.FC = () => {
  const [value, setValue] = useState(0);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [linkCounter, setLinkCounter] = useState(0);
  const [inputFields, setInputFields] = useState<InputField[]>([]);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleAddNewLink = () => {
    if (linkCounter < 5) {
      setInputFields([...inputFields, { link: "", linkType: "" }]);
      setLinkCounter(linkCounter + 1);
    }
  };

  const handleRemoveField = (index: number) => {
    if (linkCounter > 0) {
      const newInputFields = inputFields.filter((_, i) => i !== index);
      setInputFields(newInputFields);
      setLinkCounter(linkCounter - 1);
    }
  };

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const newInputFields = [...inputFields];
    const { name, value } = event.target as HTMLInputElement;
    newInputFields[index] = {
      ...newInputFields[index],
      [name as keyof InputField]: value,
    };
    setInputFields(newInputFields);
  };

  return (
    <div
      style={{
        border: "0.1px solid gray",
        width: "500px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs
          value={value}
          onChange={handleChangeTab}
          centered
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Resume Details" value={0} />
          <Tab label="Resume Matcher" value={1} />
        </Tabs>
        {value === 0 ? (
          <div>
            <Accordion
              // expanded={}
              defaultExpanded
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
              
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "60%",
                    flexShrink: 0,
                  }}
                >
                  <PersonOutlineRoundedIcon
                    sx={{ fontSize: "20px", mr: 1, fontWeight: "light" }}
                  />
                  <Typography
                    sx={{ fontWeight: "light", fontSize: "16px", p: 0.1 }}
                  >
                    Personal Info
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                  Personal Info
                </Typography>

                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  mt={1}
                >
                  <Grid item xs={6} mt={1}>
                    <TextField
                      id="first-name"
                      type="text"
                      label="First Name"
                      placeholder="John"
                     
                    />
                  </Grid>
                  <Grid item xs={6} mt={1}>
                    <TextField
                      id="last-name"
                      type="text"
                      label="Last Name"
                      placeholder="Doe"
                    />
                  </Grid>
                  <Grid item xs={6} mt={1}>
                    <TextField
                      id="email"
                      type="email"
                      label="Email"
                      placeholder="john@example.com"
                    />
                  </Grid>
                  <Grid item xs={6} mt={1}>
                    <TextField
                      id="phone"
                      type="text"
                      label="Phone"
                      placeholder="+91 2354 6545 34"
                    />
                  </Grid>
                  <Grid item xs={6} mt={1}>
                    <TextField
                      id="address"
                      type="text"
                      label="Address"
                      placeholder="123 Main Street New York"
                    />
                  </Grid>
                  <Grid item xs={6} mt={1}>
                    <TextField
                      id="job-title"
                      type="text"
                      label="Job Title"
                      placeholder="Full Stack Developer"
                    />
                  </Grid>
                </Grid>
                <Typography sx={{ fontSize: "14px", fontWeight: "bold", mt: 2 }}>
                  Links {`(${linkCounter}/5)`}
                </Typography>

                {inputFields.map((inputField, index) => (
                  <Grid
                    key={index}
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={5} mt={1}>
                      <TextField
                        name="link"
                        type="text"
                        label="Link"
                        placeholder="Your link here"
                        value={inputField.link}
                        onChange={(event) => handleInputChange(index, event)}
                      />
                    </Grid>
                    <Grid item xs={5} mt={1}>
                      <FormControl fullWidth>
                        <InputLabel id={`link-type-label-${index}`}>Link Type</InputLabel>
                        <Select
                          labelId={`link-type-label-${index}`}
                          id={`link-type-${index}`}
                          name="linkType"
                          value={inputField.linkType}
                          label="Link Type"
                          onChange={(event:any) => handleInputChange(index, event)}
                        >
                          {SOCIAL_LINKS.map((name, idx) => (
                            <MenuItem key={idx} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={2} mt={3}>
                      <DeleteOutlineOutlinedIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleRemoveField(index)}
                      />
                    </Grid>
                  </Grid>
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
                  onClick={handleAddNewLink}
                  disabled={linkCounter === 5}
                >
                  {linkCounter < 5 ? "+ Add Link" : "Max number of links added"}
                </Button>
              </AccordionDetails>
            </Accordion>
            <Accordion
              defaultExpanded
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
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
                  <Typography
                    sx={{ fontWeight: "light", fontSize: "16px", p: 0.6 }}
                  >
                    Education
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Donec placerat, lectus sed mattis semper, neque lectus feugiat
                  lectus, varius pulvinar diam eros in elit. Pellentesque
                  convallis laoreet laoreet.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "60%",
                    flexShrink: 0,
                  }}
                >
                  <WorkHistoryOutlinedIcon
                    sx={{ fontSize: "20px", mr: 1, fontWeight: "light" }}
                  />
                  <Typography
                    sx={{ fontWeight: "light", fontSize: "16px", p: 0.6 }}
                  >
                    Work Experience
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.
                  Pellentesque habitant morbi tristique senectus et netus et
                  malesuada fames ac turpis egestas. Proin pharetra nonummy pede.
                  Mauris et orci.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "60%",
                    flexShrink: 0,
                  }}
                >
                  <LayersOutlinedIcon
                    sx={{ fontSize: "20px", mr: 1, fontWeight: "light" }}
                  />
                  <Typography
                    sx={{ fontWeight: "light", fontSize: "16px", p: 0.6 }}
                  >
                    Projects
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.
                  Pellentesque habitant morbi tristique senectus et netus et
                  malesuada fames ac turpis egestas. Proin pharetra nonummy pede.
                  Mauris et orci.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel5"}
              onChange={handleChange("panel5")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel5bh-content"
                id="panel5bh-header"
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "60%",
                    flexShrink: 0,
                  }}
                >
                  <LaptopOutlinedIcon
                    sx={{ fontSize: "20px", mr: 1, fontWeight: "light" }}
                  />
                  <Typography
                    sx={{ fontWeight: "light", fontSize: "16px", p: 0.6 }}
                  >
                    Skills
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.
                  Pellentesque habitant morbi tristique senectus et netus et
                  malesuada fames ac turpis egestas. Proin pharetra nonummy pede.
                  Mauris et orci.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel6"}
              onChange={handleChange("panel6")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel6bh-content"
                id="panel6bh-header"
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "60%",
                    flexShrink: 0,
                  }}
                >
                  <StarBorderPurple500OutlinedIcon
                    sx={{ fontSize: "20px", mr: 1, fontWeight: "light" }}
                  />
                  <Typography
                    sx={{ fontWeight: "light", fontSize: "16px", p: 0.6 }}
                  >
                    Awards
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.
                  Pellentesque habitant morbi tristique senectus et netus et
                  malesuada fames ac turpis egestas. Proin pharetra nonummy pede.
                  Mauris et orci.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel7"}
              onChange={handleChange("panel7")}
            >
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
                  <WorkspacePremiumOutlinedIcon
                    sx={{ fontSize: "20px", mr: 1, fontWeight: "light" }}
                  />
                  <Typography
                    sx={{ fontWeight: "light", fontSize: "16px", p: 0.6 }}
                  >
                    Certifications
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus.
                  Pellentesque habitant morbi tristique senectus et netus et
                  malesuada fames ac turpis egestas. Proin pharetra nonummy pede.
                  Mauris et orci.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        ) : (
          <div>Resume Matcher content goes here...</div>
        )}
      </Box>
    </div>
  );
};

export default Form;
