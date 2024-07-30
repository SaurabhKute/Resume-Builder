import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { Additional, Certification, Education, Experience, PersonalInfo, Project, Skillset } from "../Accordions";
import './Form.css';


const Form: React.FC = () => {
  // Accordians
  const [value, setValue] = useState<number>(0);
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div

      className="custom-scrollbar"
      style={{
        border: "0.1px solid gray",
        width: "450px",
        display: "flex",
        justifyContent: "center",
        overflow:'auto'
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
            <PersonalInfo
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            />
            <Education
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            />
            <Experience
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            />
            <Skillset
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            />
            <Project
              expanded={expanded === "panel5"}
              onChange={handleChange("panel5")}
            />
            <Certification
              expanded={expanded === "panel6"}
              onChange={handleChange("panel6")}
            />
            <Additional
              expanded={expanded === "panel7"}
              onChange={handleChange("panel7")}
            />
          </div>
        ) : (
          <div style={{display:'flex',justifyContent:'center', padding:'20px'}}>Resume Matcher content goes here...</div>
        )}
      </Box>
    </div>
  );
};

export default Form;
