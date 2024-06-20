import React, { useState } from "react";
import {
  Box,
  Tab,
  Tabs,
} from "@mui/material";
import Additional from "../Additional/Additional";
import Skillsets from "../Skillsets/Skillsets";
import PersonalInfo from "../PersonalInfo/PersonalInfo";
import Certification from "../Certifications/Certification";

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
            <PersonalInfo expanded={expanded === "panel1"} onChange={handleChange("panel1")} />
            <Skillsets expanded={expanded === "panel2"} onChange={handleChange("panel2")} />
            <Additional expanded={expanded === "panel3"} onChange={handleChange("panel3")} />
            <Certification expanded={expanded === "panel4"} onChange={handleChange("panel4")} />

          </div>
        ) : (
          <div>Resume Matcher content goes here...</div>
        )}
      </Box>
    </div>
  );
};

export default Form;
