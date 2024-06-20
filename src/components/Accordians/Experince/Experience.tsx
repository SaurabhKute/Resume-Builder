import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ExperienceProps {
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

const Experience: React.FC<ExperienceProps> = ({ expanded, onChange }) => {
  return(
    <Accordion
    //   expanded={expanded === "panel7"}
    //   onChange={handleChange("panel7")}
    expanded={expanded} onChange={onChange}
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
          Additional
        </Typography>
      </Box>
    </AccordionSummary>
    <AccordionDetails>
      <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
        Education
      </Typography>
  
    </AccordionDetails>
  </Accordion>
  )
};
export default Experience;
